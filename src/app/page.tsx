import { auth } from "@/auth";
import { handleSignOut } from "@/lib/actions";

export default async function Home() {
	const session = await auth();

	return (
		<>
			<h1>this is homepage {session?.user?.name}</h1>
			<form action={handleSignOut}>
				<button type="submit">Sign Out</button>
			</form>
		</>
	);
}
