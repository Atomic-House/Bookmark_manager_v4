import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Not authenticated");
  const workspace = await prisma.workspace.findMany({
    where: {
      email: session.user?.email,
    },
  });
  return NextResponse.json({
    ...workspace,
  });
}
