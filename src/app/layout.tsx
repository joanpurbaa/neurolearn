import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const PlusJakartaSans = Plus_Jakarta_Sans({
	weight: ["200", "300", "400", "500", "600", "700", "800"],
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "NeuroLearn",
	description:
		"Gak cuma nonton, tapi juga paham! AI bantu ringkas, kamu tinggal gas quiznya!",
	icons: {
		icon: "/favicon.ico",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${PlusJakartaSans.className} antialiased`}>
				{children}
			</body>
		</html>
	);
}
