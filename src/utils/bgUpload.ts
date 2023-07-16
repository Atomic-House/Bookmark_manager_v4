import { generateComponents } from "@uploadthing/react";

import type { BgFileRouter } from "@/app/api/uploadthing/core";

export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<BgFileRouter>();
