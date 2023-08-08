import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
//Gets all undeleted workspaces of a user from the database
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Not authenticated");
  const workspace = await prisma.workspace.findMany({
    where: {
      email: session.user?.email,
    },
    include: {
      boards: true,
      inbox: true,
    },
  });

  return NextResponse.json(workspace);
}
//Creates a workspace and the whole nested models inside  it till the the depth of list
export async function POST(
  req: NextRequest,
  { params }: { params: { data: string[] } },
) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Not authenticated");
  const body = await req.json();
  const user = await prisma.user.findUnique({
    where: {
      email: session.user?.email!,
    },
  });
  const workspace = await prisma.workspace.create({
    data: {
      userId: user?.id,
      name: body.name,
      email: session.user?.email!,
      inbox: {
        create: {
          email: session.user?.email!,
          tabs: {
            create: [
              {
                name: "Tab",
              },
            ],
          },
        },
      },
      boards: {
        create: [
          {
            name: "First Board",
            tabs: {
              create: [
                {
                  name: "Tab",
                  email: session.user?.email!,
                  lists: {
                    create: [{ name: "List", email: session.user?.email }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });
  return NextResponse.json(workspace);
}
//Change's a workspaces name
export async function PATCH(
  req: Request,
  { params }: { params: { data: string[] } },
) {
  const [id, name] = params.data;
  const workspace = await prisma.workspace.update({
    where: {
      id: id,
    },
    data: {
      name: name,
    },
  });
  return NextResponse.json(workspace);
}
//Deletes a workspace
export async function DELETE(
  req: Request,
  { params }: { params: { data: string[] } },
) {
  const [id] = params.data;
  const workspace = await prisma.workspace.delete({
    where: {
      id: id,
    },
  });
  return NextResponse.json(workspace);
}
