import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(
  req: Request,
  { params }: { params: { data: string[] } },
) {
  const [wsId, data] = params.data;
  const inbox = await prisma.inbox.findFirst({
    where: {
      workspaceId: wsId,
    },
    include: {
      tabs: true,
    },
  });
  return NextResponse.json(inbox);
}
export async function POST(
  req: Request,
  { params }: { params: { data: string[] } },
) {
  const [inboxId] = params.data;
  const body: { name: string } = await req.json();

  const inbox = await prisma.inbox.update({
    where: {
      id: inboxId,
    },
    data: {
      tabs: {
        createMany: {
          data: [
            {
              name: body.name,
            },
          ],
        },
      },
    },
  });
  return NextResponse.json(inbox);
}
