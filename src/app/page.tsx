"use client"
import { handleSignOut } from "@/lib/actions";

export default function Home() {
	return (
		<>
			<h1>this is homepage</h1>
			<button onClick={() => handleSignOut()}>log out</button>
		</>
	);
}
