import { Lock, ImageIcon, Video } from "lucide-react";
import Image from "next/image";

interface ContentItem {
  id: string;
  type: "image" | "video";
  thumbnail?: string;
  duration?: string;
  locked: boolean;
}

interface ContentGridProps {
  items: ContentItem[];
}

export function ContentGrid({ items }: ContentGridProps) {
  return (
    <div className="grid grid-cols-3 gap-1 p-4 bg-gray-50">
      {items.map((item) => (
        <div
          key={item.id}
          className="aspect-square bg-gray-200 rounded-lg relative overflow-hidden"
        >
          {item.thumbnail ? (
            <Image
              src={item.thumbnail || "/placeholder.svg"}
              alt=""
              className="object-cover"
              fill
              sizes="(max-width: 768px) 33vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              {item.type === "video" ? (
                <Video className="h-8 w-8 text-gray-400" />
              ) : (
                <ImageIcon className="h-8 w-8 text-gray-400" />
              )}
            </div>
          )}

          {item.locked && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <Lock className="h-8 w-8 text-white" />
            </div>
          )}

          {item.duration && (
            <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-1 rounded">
              {item.duration}
            </div>
          )}

          <div className="absolute bottom-2 right-2 text-white text-xs">
            <span className="text-xs">💬</span> 1
          </div>
        </div>
      ))}
    </div>
  );
}
