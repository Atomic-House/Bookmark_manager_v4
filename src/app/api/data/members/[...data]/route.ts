import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
export async function GET() {
  return NextResponse.json("teams");
}
export async function POST(req: Request) {
  const body: { name: string; membersEmail: string[] } = await req.json();
  const session = await getServerSession(authOptions);
  const team = await prisma.team.create({
    data: {
      name: body.name,
      owner: {
        create: {
          user: {
            connect: {
              email: session?.user?.email!,
            },
          },
        },
      },
    },
  });
  const userIds = body.membersEmail.map((email) => {
    return {
      email: {
        contains: email,
      },
    };
  });
  const users = await prisma.user.findMany({
    where: {
      OR: [...userIds],
    },
  });
  const members = await prisma.team.update({
    where: {
      id: team.id,
    },
    data: {
      members: {
        createMany: {
          data: [
            ...users.map((user) => {
              return {
                userId: user.id,
              };
            }),
          ],
        },
      },
    },
  });

  return NextResponse.json(team);
}

export async function PATCH(
  req: Request,
  { params }: { params: { data: string[] } },
) {
  const [teamId] = params.data;
  const body: { name: string; membersEmail: string[] } = await req.json();
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Not authenticated");
  }
}
