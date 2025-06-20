"use client";

import { Upload, X } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
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
  const [previews, setPreviews] = useState<{ file: File; url: string }[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (newFiles: File[]) => {
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      if (onFilesSelected) {
        onFilesSelected(newFiles);
      }
      // Create URLs for previews
      const newPreviews = newFiles.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));
      setPreviews((prev) => [...prev, ...newPreviews]);
    },
  });

  // Cleanup preview URLs when component unmounts
  useEffect(() => {
    return () => {
      previews.forEach((preview) => URL.revokeObjectURL(preview.url));
    };
  }, [previews]);

  // Function to remove a file and its preview
  const removeFile = (fileName: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
    setPreviews((prevPreviews) => {
      const filteredPreviews = prevPreviews.filter(
        (preview) => preview.file.name !== fileName
      );
      // Cleanup the URL of the removed preview
      prevPreviews
        .filter((preview) => preview.file.name === fileName)
        .forEach((preview) => URL.revokeObjectURL(preview.url));
      return filteredPreviews;
    });
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

      {/* Dropzone and Previews */}
      <div className="mt-2">
        {/* Image Previews Grid */}
        {previews.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
            {previews.map((preview) => (
              <div key={preview.file.name} className="relative group">
                <Image
                  src={preview.url}
                  alt={preview.file.name}
                  width={300}
                  height={300}
                  className="object-cover w-full h-40 rounded"
                />
                <button
                  onClick={() => removeFile(preview.file.name)}
                  className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={16} className="text-white" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Dropzone */}
        <div className="grid grid-cols-2 gap-4">
          {/* Default Image (only show if no previews) */}
          {previews.length === 0 && (
            <Image
              src="https://res.cloudinary.com/dyp8gtllq/image/upload/v1750327353/doc-upload_j8njhv.jpg"
              alt="ID Verification"
              width={300}
              height={300}
              className="object-contain rounded"
              loading="lazy"
            />
          )}
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
                {files.length > 0 ? "Add More Files" : "Select Files"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-2">{description}</p>
    </section>
  );
};

export default CreatorDocumentUpload;
