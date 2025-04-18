"use client";
// import { auth } from "@/auth";
// import { handleSignOut } from "@/lib/actions";
import dynamic from "next/dynamic";

export default function Home() {
	// const session = await auth();

	const Map = dynamic(
		() => import("@/_components/Map").then((component) => component.Map),
		{ ssr: false }
	);

	const locations = [
		{
			id: "550e8400-e29b-41d4-a716-446655440000",
			lat: -6.970410831563379,
			lng: 107.62840769677395,
		},
	];

	return (
		<>
			{/* <h1>this is homepage {session?.user?.name}</h1>
			<form action={handleSignOut}>
				<button type="submit">Sign Out</button>
			</form> */}
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					flexDirection: "column",
					height: "100vh",
				}}>
				<Map
					center={{ lat: -6.970410831563379, lng: 107.62840769677395 }}
					locations={locations}
				/>
			</div>
		</>
	);
}
