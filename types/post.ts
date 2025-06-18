import { User } from "./user";

export interface Media {
	// Define properties if media has a structure, otherwise keep it as an empty array type
	mediaPath: string;
}

export interface Reaction {
	id: number;
	userId: number;
	type: "like" | "comment";
	postId: number;
	content?: string;
}

export interface Post {
	id: number;
	content: string;
	userId: number;
	createdAt: string;
	updatedAt: string;
	user: User;
	media?: Media[]; // If media has properties, update `Media` type accordingly
	reactions?: Reaction[];
}

export interface MediaItem {
  id: number
  userId: number
  galleryId: number | null
  title: string
  type: 'image' | 'video' | string
  tags: string[] | null
  description: string
  participants: string[] | null
  status: 'active' | 'inactive' | string
  price: string
  isPaid: boolean
  payType: 'free' | 'paid' | string
  scheduleAt: string | null
  file: string
  teaserFile: string | null
  thumbnail: string | null
  views: number
  createdAt: string
  updatedAt: string
}

export interface MediaItemResponse {
  success: boolean
  media: MediaItem[]
}

