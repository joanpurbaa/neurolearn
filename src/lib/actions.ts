"use server";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export async function handleSignIn({
	email,
	password,
}: {
	email: string;
	password: string;
}) {
	try {
		await signIn("credentials", {
			email,
			password,
			redirectTo: "/",
		});
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return {
						message: "Password salah!",
					};
				default:
					return {
						message: "Terdapat kesalahan.",
					};
			}
		}
		throw error;
	}
}

export async function handleSignOut(){
  await signOut();
}