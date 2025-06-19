import { Image, Trash2Icon } from "lucide-react";
import React from "react";

interface DocumentPreviewProps {
  fileName: string;
  removeFile: (fileName: string) => void; // Accepts a string instead of a File
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({
  fileName,
  removeFile,
}) => {
  return (
    // Preview of the uploaded document
    // This should be a styled component that shows the file name and a remove button
    <div className="flex gap-2 justify-between rounded-3xl mt-2 bg-gray-200 opacity-50 p-1 px-2">
      <div className="flex items-center gap-2">
        <Image size={16} className="text-primary" />
        <div className="flex flex-col">
          <p className="text-sm font-semibold truncate max-w-60 text-foreground">
            {fileName}
          </p>
        </div>
      </div>
      {/* Remove button */}
      <button
        onClick={() => removeFile(fileName)} // ✅ Pass function reference
        title="Remove file"
        className="flex p-1 items-center justify-center w-6 h-6 rounded-full bg-gray-700 opacity-50 hover:opacity-100 transition duration-200"
      >
        <Trash2Icon color="#fff" className="text-white" size={16} />
      </button>
    </div>
  );
};

export default DocumentPreview;
