import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function POST(req: Request) {
  const body: { firstName: string; lastName: string; userName: string } = await req.json();
  const session = await getServerSession(authOptions);
  if (session) {
    const data = await prisma.user.update({
      where: {
        email: session.user?.email!,
      },
      data: {
        name: body.firstName + body.lastName,
        userName: body.userName,
      },
    });
    return NextResponse.json({ user: session.user, data });
  }
  return NextResponse.json({ session: "not authenticated" });
}

