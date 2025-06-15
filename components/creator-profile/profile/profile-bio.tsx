"use client";

import { useParams } from "next/navigation";
import { useGetCreators } from "@/services/creator/get-creators";

export function ProfileBio() {
  const params = useParams();
  const username = params.username as string;
  const { data: creators = [], isLoading } = useGetCreators();
  const creator = creators.find((c) => c.username === username);

  if (isLoading) {
    return (
      <div className="px-4 py-2 bg-white">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
      </div>
    );
  }

  if (!creator) {
    return null;
  }

  return (
    <div className="px-4 py-2 bg-white">
      {creator.bio && (
        <p className="text-sm text-gray-700 mb-2">{creator.bio}</p>
      )}

      <div className="space-y-1">
        {/* Display basic info */}
        {creator.country && (
          <p className="text-sm text-gray-600">📍 {creator.country}</p>
        )}
        {creator.createdAt && (
          <p className="text-sm text-gray-600">
            🎉 Joined {new Date(creator.createdAt).toLocaleDateString()}
          </p>
        )}
        {creator.subscriptionPrice && (
          <p className="text-sm text-gray-600">
            💰 Subscription: ${creator.subscriptionPrice}/month
          </p>
        )}
        {creator.welcomeMessage && (
          <p className="text-sm text-gray-600 italic">
            &ldquo;{creator.welcomeMessage}&rdquo;
          </p>
        )}
      </div>
    </div>
  );
}
