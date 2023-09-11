import { db } from "@/server/db";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { data: string[] } }) {
	const query = await db.query.users.findMany()
	return NextResponse.json(query)
}
