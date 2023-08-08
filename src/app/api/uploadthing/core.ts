//Core folder of upload thing containing the file router which resides the user to send the data and the file to save to the database

import { getServerSession } from "next-auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
//create a file
const f = createUploadthing();
//Auth function to authenticate user
const auth = async () => {
  const session = await getServerSession(authOptions);
  return session;
};
//Create a FileRouter for each type of file to be be uploaded
export const ourFileRouter = {
  //Uploader for the main user profile picture
  imageUploader: f({ image: { maxFileSize: "2MB" } })
    .middleware(async (req) => {
      const user = await auth();
      if (!user) throw new Error("Unauthorized");
      return { userEmail: user.user?.email };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("metadata", metadata.userEmail);
      //Saves the file link to the prisma database
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
  //Uploader for the user's background picture
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
      //Saves the file link to the prisma database
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
