import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
	try {
		const prisma = new PrismaClient();
		const formData = await request.formData();

		const hashedPassword = await bcrypt.hash(
			formData.get("password") as string,
			10
		);

		await prisma.user.create({
			data: {
				name: formData.get("namaLengkap") as string,
				email: formData.get("email") as string,
				password: hashedPassword as string,
			},
		});

		return NextResponse.json({ status: 200 });
	} catch {
		return NextResponse.json({ status: 400 });
	}
}
