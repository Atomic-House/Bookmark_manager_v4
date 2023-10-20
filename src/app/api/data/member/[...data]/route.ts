import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { board } from "@/schema/board";
import { db } from "@/server/db";
import { and, eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import _ from "lodash";
export async function GET(
  request: NextRequest,
  { params }: { params: { data: string[] } },
) {
  return NextResponse.json("Hello");
}

export async function POST(
  req: NextRequest,
  { params }: { params: { data: string[] } },
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json("Unauthorized");
  }
  const body: { members: string[]; boardId: string } = await req.json();
  const access = await db
    .update(board)
    .set({
      hasAccess: _.uniq(body.members),
    })
    .where(
      and(
        eq(board.id, body.boardId),
        eq(board.createdBy, session.user?.email!),
      ),
    )
    .returning({ id: board.id });

  return NextResponse.json(access[0]);
}

export async function PUT(
  request: Request,
  { params }: { params: { data: string[] } },
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json("Unauthorized");
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { data: string[] } },
) {}

export async function DELETE(
  request: Request,
  { params }: { params: { data: string[] } },
) {}
