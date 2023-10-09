import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { and, eq } from "drizzle-orm";
import { board } from "@/schema/board";
export async function GET(
  request: Request,
  { params }: { params: { data: string[] } },
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized", status: 401 });
  }
  const boards = await db.query.board.findMany({
    where: and(
      eq(board.isDeleted, true),
      eq(board.createdBy, session.user?.email!),
    ),
  });
  return NextResponse.json(boards);
}
export async function PATCH(
  request: Request,
  { params }: { params: { data: string[] } },
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized", status: 401 });
  }

  const body: {
    id: string;
    isDeleting: boolean;
  } = await request.json();
  const boards = await db
    .update(board)
    .set({ isDeleted: body.isDeleting })
    .where(eq(board.id, body.id))
    .returning();
  return NextResponse.json(boards[0]);
}
