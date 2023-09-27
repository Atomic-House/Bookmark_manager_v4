import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { board } from "@/schema/board";
import { LayoutEnum, LinkTypeEnum, SortOrderEnum } from "@/schema/enums";
import { layout } from "@/schema/layout";
import { view } from "@/schema/view";
import { db } from "@/server/db";
import { and, eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
export async function GET(
  request: Request,
  { params }: { params: { data: string[] } },
) {
  const [boardId, isDeleted] = params.data;

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized", status: 401 });
  }
  const views = await db
    .select()
    .from(view)
    .where(
      and(eq(view.boardId, boardId), eq(view.isDeleted, isDeleted == "true")),
    );

  return NextResponse.json(views);
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
    boardId: string;
  } = await request.json();
  const views = await db
    .insert(view)
    .values({
      name: body!.name!,
      boardId: body.boardId,
    })
    .returning({ id: view.id });
  return NextResponse.json(views[0].id);
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
    isDeleted: boolean;
    view: LayoutEnum;
    sort: SortOrderEnum;
    linkType: LinkTypeEnum;
  } = await request.json();
  const vw = await db
    .update(view)
    .set({ name: body.name, isDeleted: body.isDeleted })
    .where(eq(view.id, body.id));
  const viewLayout = await db
    .update(layout)
    .set({
      viewType: body.view,
      linkType: body.linkType,
      sortOrder: body.sort,
    })
    .where(eq(layout.viewId, body.id));
  return NextResponse.json({ status: 200 });
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
  const vw = await db.delete(view).where(eq(view.id, body.id));
  return NextResponse.json(vw);
}
