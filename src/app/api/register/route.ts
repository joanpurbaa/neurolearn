import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const formData = await request.formData();

		console.log(formData);

		return NextResponse.json({ result: true });
	} catch {
		return NextResponse.json({ status: false });
	}
}
