export interface User {
  id: number;
  name: string;
  username: string;
  profilePicture: string | null;
}

export interface Media {
  // Define media properties if you have them, otherwise leave as unknown
  [key: string]: unknown;
}

export interface Reaction {
  id: number;
  userId: number;
  type: string;
  postId: number;
  content: string;
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

export type PostsResponse = Post[];
