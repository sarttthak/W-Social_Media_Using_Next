import type { OurFileRouter } from "@/app/api/uploadthing/core.ts";


import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";


export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();
