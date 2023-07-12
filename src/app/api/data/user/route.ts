import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function POST(req: Request) {
  const body: { firstName: string; lastName: string; username: string } = await req.json();
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ session: "not authenticated" });
  }
  const data = await prisma.user.update({
    where: {
      email: session.user?.email!,
    },
    data: {
      name: body.firstName + " " + body.lastName,
      userName: body.username,
    },
  });
  return NextResponse.json({ user: session.user, data });
}
