import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function POST(
  req: Request,
  { params }: { params: { id: string } },
) {
  const body: { name: string; username: string } = await req.json();
  const id = params.id;
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ session: "not authenticated" });
  }
  const data = await prisma.user.update({
    where: {
      email: session.user?.email!,
    },
    data: {
      name: body.name,
    },
  });
  await prisma.userPreferences.update({
    where: {
      userId: id,
    },
    data: {
      userName: body.username,
    },
  });
  return NextResponse.json({ user: session.user, data });
}
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ session: "not authenticated" });
  }

  const data = await prisma.user.findFirst({
    where: {
      email: session.user?.email!,
    },
    include: {
      UserPreferences: true,
    },
  });

  return NextResponse.json({ ...data });
}
