import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  return NextResponse.json("teams");
}
export async function POST(req: Request) {
  const body: { name: string } = await req.json();

  return NextResponse.json("created teams");
}
