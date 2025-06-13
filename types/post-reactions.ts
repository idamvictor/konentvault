export interface ReactionUser {
  id: number;
  name: string;
  username: string;
  profilePicture: string | null;
}

export interface Reaction {
  id: number;
  type: string;
  content: string; // JSON string, e.g., '{"text":"nice one"}'
  postId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  user: ReactionUser;
}

export interface ReactionsResponse {
  success: boolean;
  total: number;
  page: number;
  totalPages: number;
  reactions: Reaction[];
}
