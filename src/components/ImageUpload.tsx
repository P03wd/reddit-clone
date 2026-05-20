"use client";

import { UploadButton } from "@uploadthing/react";

import type { OurFileRouter } from "@/app/api/uploadthing/core";

interface Props {
  onChange: (url: string) => void;
}

export default function ImageUpload({
  onChange,
}: Props) {
  return (
    <div className="bg-white border rounded-xl p-4">
      <UploadButton<OurFileRouter, "imageUploader">
        endpoint="imageUploader"
        appearance={{
          button:
            "bg-orange-500 text-white px-4 py-2 rounded-lg ut-ready:bg-orange-500 ut-uploading:bg-orange-400",
          container:
            "flex flex-col items-start gap-3",
          allowedContent:
            "text-gray-600 text-sm",
        }}
        content={{
          button() {
            return "Upload Image";
          },

          allowedContent() {
            return "Image (Max 4MB)";
          },
        }}
        onClientUploadComplete={(res) => {
          if (res?.[0]?.ufsUrl) {
            onChange(res[0].ufsUrl);
          }
        }}
        onUploadError={(error) => {
          alert(error.message);
        }}
      />
    </div>
  );
}