export interface User {
  id: number;
  username: string;
  profilePicture: string | null;
}

export interface Media {
  // Define media properties if available, otherwise leave as unknown
  [key: string]: unknown;
}

export interface Reaction {
  // If you have a structure for reactions, define it here. Otherwise, leave as an empty array.
  [key: string]: unknown;
}

export interface Post {
  id: number;
  content: string;
  userId: number;
  price: string;
  isPaid: boolean;
  payType: string;
  published: boolean;
  views: number;
  type: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  media: Media[];
  reactions: Reaction[];
}

export type PostFeedsResponse = Post[];
