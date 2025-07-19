"use client";



import { UploadDropzone } from '@/lib/uploadthing';
import { on } from 'events';
import { XIcon } from 'lucide-react';
import React from 'react'

interface ImageUploadProps {
    onChange: (url: string) => void
    value: string;
    endpoint: "postImage"
}

function ImageUpload({ onChange, value, endpoint }: ImageUploadProps) {


    if(value){
        return(
            <div className="relative size-40">
        <img src={value} alt="Upload" className="rounded-lg size-40 object-cover" />
        <button
          onClick={() => onChange("")}
          className="absolute top-0 right-0 p-1 m-1 bg-black rounded-full shadow-sm"
          type="button"
        >
          <XIcon className="h-4 w-4 text-white" />
        </button>
      </div>
        )
    }

  return (
    <UploadDropzone 
    endpoint={endpoint}
    onClientUploadComplete={res=>{
        onChange(res?.[0].url);
    }}
    onUploadError={(error: Error) => {
        console.error("Upload failed:", error);
    }}
    />

)
}

export default ImageUpload