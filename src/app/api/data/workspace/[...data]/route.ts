import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { users } from "@/schema/auth";
import { workspace } from "@/schema/workspace";
import { db } from "@/server/db";
import { uuid } from "drizzle-orm/pg-core";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { data: string[] } },
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized", status: 401 });
  }
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, session.user?.email!),
    columns: { id: true },
  });
  const workspaces = await db.query.workspace.findMany({
    where: (workspaces, { eq }) => eq(workspaces.userId, user?.id!),
  });
  return NextResponse.json(workspaces);
}
export async function POST(
  request: Request,
  { params }: { params: { data: string[] } },
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized", status: 401 });
  }

  return NextResponse.json("authenticated");
}
