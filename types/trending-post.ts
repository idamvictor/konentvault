export interface TrendingUser {
  id: number;
  username: string;
  profilePicture: string | null;
}

export interface TrendingMedia {
  // Define media properties if available, otherwise leave as unknown
  [key: string]: unknown;
}

export interface TrendingReaction {
  id: number;
  userId: number;
  type: string;
  postId: number;
  content: string;
}

export interface TrendingPost {
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
  user: TrendingUser;
  media: TrendingMedia[];
  reactions: TrendingReaction[];
  trendingScore: number;
}

export type TrendingPostsResponse = TrendingPost[];
