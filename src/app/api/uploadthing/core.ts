import { getServerSession } from "next-auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
const f = createUploadthing();
const auth = async () => {
  const session = await getServerSession(authOptions);
  return session;
};

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "2MB" } })
    .middleware(async (req) => {
      const user = await auth();
      if (!user) throw new Error("Unauthorized");

      return { userEmail: user.user?.email };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("metadata", metadata.userEmail);
      await prisma.user.update({
        where: {
          email: metadata.userEmail!,
        },
        data: {
          image: file.url,
        },
      });
      console.log("metadata", file.url);
    }),
  bgUpload: f({
    image: { maxFileSize: "2MB" },
  })
    .middleware(async (req) => {
      const user = await auth();
      if (!user) throw new Error("Unauthorized");

      return { userEmail: user.user?.email };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("metadata", metadata.userEmail);
      await prisma.user.update({
        where: {
          email: metadata.userEmail!,
        },
        data: {
          UserPreferences: {
            create: {
              background: file.url,
            },
          },
        },
      });
      console.log("metadata", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
