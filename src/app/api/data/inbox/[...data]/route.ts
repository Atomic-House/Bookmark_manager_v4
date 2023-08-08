import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
//Handles GET request to get inbox inside a workspace
export async function GET(
  req: Request,
  { params }: { params: { data: string[] } },
) {
  const [inboxId] = params.data;
  const inbox = await prisma.inbox.findUnique({
    where: {
      id: inboxId,
    },
    include: {
      tabs: true,
    },
  });
  return NextResponse.json(inbox);
}
//Handles post request to add a tab inside a inbox
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
