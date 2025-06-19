"use client";

import { Upload } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import DocumentPreview from "./DocumentPreview";

interface CreatorDocumentUploadProps {
  title: string;
  subtitle: string;
  description: string;
  onFilesSelected?: (files: File[]) => void;
}

const CreatorDocumentUpload = ({
  title,
  subtitle,
  description,
  onFilesSelected,
}: CreatorDocumentUploadProps) => {
  const [files, setFiles] = useState<File[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (newFiles: File[]) => {
      setFiles((prevFiles) => [...prevFiles, ...newFiles]); // Append new files
      if (onFilesSelected) {
        onFilesSelected(newFiles); // Pass selected files to parent
      }
    },
  });

  // Function to remove a file
  const removeFile = (fileName: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  return (
    <section className="flex flex-col justify-center w-full h-full">
      <h2 className="text-base text-muted-foreground font-semibold mb-2">
        {title}
      </h2>
      <p className="text-xs text-muted-foreground">{subtitle}</p>

      {/* Files List */}
      {files.length > 0 &&
        files.map((file) => (
          <DocumentPreview
            key={file.name}
            fileName={file.name}
            removeFile={removeFile}
          />
        ))}

      {/* Dropzone */}
      <div className="grid grid-cols-2 mt-2 gap-4">
        {/* Image */}
        <Image
          src="https://res.cloudinary.com/dyp8gtllq/image/upload/v1750327353/doc-upload_j8njhv.jpg"
          alt="ID Verification"
          width={300}
          height={300}
          className="object-contain rounded"
          loading="lazy"
        />
        <div
          {...getRootProps({
            className:
              "dropzone bg-gray-100 rounded p-4 h-full flex items-center justify-center",
          })}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center gap-1">
            <Upload size={24} className="text-muted-foreground" />
            <p className="text-sm text-muted-foreground uppercase">
              Select File
            </p>
          </div>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-2">{description}</p>
    </section>
  );
};

export default CreatorDocumentUpload;
