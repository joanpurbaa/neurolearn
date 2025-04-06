import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function POST(request: NextRequest) {
	try {
		const prisma = new PrismaClient();
		const formData = await request.formData();

		const checkTheEmail = await prisma.user.findFirst({
			where: {
				email: formData.get("email") as string,
			},
		});

		if (checkTheEmail) return NextResponse.json({ validation: true });

		return NextResponse.json({ validation: false });
	} catch {
		return NextResponse.json({ status: false });
	}
}
