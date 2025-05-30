import Image from "next/image";
import { CheckCircle, Users, ImageIcon, Calendar } from "lucide-react";
import { getLandingPostsData } from "@/lib/landing/getLandingPostData";

export default async function RightPanel() {
  const data = await getLandingPostsData();
  const { user } = data;

  return (
    <div className="p-4 space-y-6 h-full overflow-y-auto">
      {/* User Profile Card */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="text-center">
          <div className="relative inline-block mb-4">
            <Image
              src={user.avatar || "/placeholder.svg"}
              alt={`${user.name}'s profile picture`}
              width={80}
              height={80}
              className="rounded-full"
            />
            {user.verified && (
              <CheckCircle className="absolute -bottom-1 -right-1 w-6 h-6 text-blue-500 bg-white rounded-full" />
            )}
          </div>

          <h2 className="text-xl font-bold text-gray-900 mb-1">{user.name}</h2>
          <p className="text-gray-500 mb-4">{user.username}</p>

          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
            {user.bio}
          </p>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="font-bold text-gray-900">{user.posts}</div>
              <div className="text-xs text-gray-500">Posts</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-gray-900">{user.followers}</div>
              <div className="text-xs text-gray-500">Followers</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-gray-900">{user.following}</div>
              <div className="text-xs text-gray-500">Following</div>
            </div>
          </div>

          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200">
            Follow
          </button>
        </div>
      </div>

      {/* Trending Topics */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Trending Topics
        </h3>
        <div className="space-y-3">
          {[
            { topic: "#CreativePhotography", posts: "12.5K posts" },
            { topic: "#ArtisticVision", posts: "8.2K posts" },
            { topic: "#DigitalArt", posts: "15.7K posts" },
            { topic: "#CreativeProcess", posts: "6.1K posts" },
          ].map((trend) => (
            <div
              key={trend.topic}
              className="flex justify-between items-center"
            >
              <div>
                <div className="font-medium text-gray-900">{trend.topic}</div>
                <div className="text-sm text-gray-500">{trend.posts}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Users className="w-5 h-5 text-blue-500" />
            <div>
              <div className="font-medium text-gray-900">Active Users</div>
              <div className="text-sm text-gray-500">2.1M online now</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <ImageIcon className="w-5 h-5 text-green-500" />
            <div>
              <div className="font-medium text-gray-900">Posts Today</div>
              <div className="text-sm text-gray-500">45.2K new posts</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-purple-500" />
            <div>
              <div className="font-medium text-gray-900">Events</div>
              <div className="text-sm text-gray-500">12 upcoming</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
