import { type Creator } from "./creator";

export interface User {
  id: number;
  username: string;
  profilePicture: string | null;
  name?: string; // Making it required since PostCard needs it
}

export interface Media {
  mediaPath: string;
  [key: string]: unknown;
}

export interface Reaction {
  id: number;
  userId: number;
  type: "like" | "comment" | "share";
  postId: number;
  content: string;
}

export interface Post {
  id: number;
  content: string;
  userId: number;
  price: string;
  isPaid: boolean;
  payType: "free" | "ppv" | "subscription";
  published: boolean;
  views: number;
  type: "video" | "image" | "text" | "mixed";
  createdAt: string;
  updatedAt: string;
  user: User;
  media: Media[];
  reactions: Reaction[];
  mentionedUsers?: (User | Creator)[];
}

export type PostFeedsResponse = Post[];
