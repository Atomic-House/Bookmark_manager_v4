import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { and, eq } from "drizzle-orm";
import { view } from "@/schema/view";
export async function GET(
  request: Request,
  { params }: { params: { data: string[] } },
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized", status: 401 });
  }
  const views = await db.query.view.findMany({
    where: and(
      eq(view.isDeleted, true),
      eq(view.createdBy, session.user?.email!),
    ),
  });
  return NextResponse.json(views);
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
  const views = await db
    .update(view)
    .set({ isDeleted: body.isDeleting })
    .where(eq(view.id, body.id))
    .returning();
  return NextResponse.json(views[0]);
}
