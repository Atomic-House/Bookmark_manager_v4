import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { workspace } from "@/schema/workspace";
import { db } from "@/server/db";
import { eq } from "drizzle-orm";
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
  const body: {
    name: string;
    icon: string;
  } = await request.json();
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, session.user?.email!),
    columns: { id: true },
  });
  const ws = await db
    .insert(workspace)
    .values({
      name: body!.name!,
      userId: user?.id!,
      icon: body.icon,
    })
    .returning();
  return NextResponse.json(ws[0].id);
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
    name: string;
    icon: string;
    id: string;
  } = await request.json();
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, session.user?.email!),
    columns: { id: true },
  });
  const ws = await db
    .update(workspace)
    .set({ name: body.name, icon: body.icon })
    .where(eq(workspace.id, body.id));
  return NextResponse.json(ws);
}
export async function DELETE(
  request: Request,
  { params }: { params: { data: string[] } },
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }
  const body: {
    name: string;
    icon: string;
    id: string;
  } = await request.json();

  const ws = await db.delete(workspace).where(eq(workspace.id, body.id));
  return NextResponse.json(ws);
}
