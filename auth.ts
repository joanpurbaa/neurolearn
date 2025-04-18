import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: "jwt",
	},
	pages: {
		signIn: "/validation",
	},
	providers: [
		Credentials({
			credentials: {
				email: {},
				password: {},
			},
			authorize: async (credentials) => {
				let user = null;

				user = await prisma.user.findUnique({
					where: {
						email: credentials?.email as string,
					},
				});

				if (!user) return null;

				const comparePassword = await bcrypt.compare(
					credentials.password as string,
					user.password as string
				);

				if (!comparePassword) return null;

				return user;
			},
		}),
	],
	callbacks: {
		authorized({ request: { nextUrl }, auth }) {
			const isLoggedIn = !!auth?.user;
			const { pathname } = nextUrl;

			if (pathname.startsWith("/validation") && isLoggedIn) {
				return Response.redirect(new URL("/", nextUrl));
			}

			if (!isLoggedIn && !pathname.startsWith("/validation")) {
				return Response.redirect(new URL("/validation", nextUrl));
			}

			return true;
		},
	},
});
