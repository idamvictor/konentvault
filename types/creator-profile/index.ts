export interface Creator {
  id: number;
  name: string;
  username: string;
  displayName: string | null;
  email: string;
  userType: string;
  profilePicture: string | null;
  coverImage: string | null;
  phone: string | null;
  country: string | null;
  gender: string;
  age: number | null;
  bio: string | null;
  welcomeMessage: string | null;
  emailVerified: boolean;
  isCreator: boolean;
  isAdminUser: boolean;
  dateOfBirth: string | null;
  balance: string;
  isVerified: boolean;
  subscriptionPrice: string | null;
  paymentDetails: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PostMedia {
  id: number;
  mediaId: number;
  mediaPath: string;
  postId: number;
  createdAt: string;
  updatedAt: string;
}

export interface PostReaction {
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
  type: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    name: string;
    username: string;
    profilePicture: string | null;
  };
  media: PostMedia[];
  reactions: PostReaction[];
  status: "locked" | "unlocked";
}

export interface Media {
  id: number;
  userId: number;
  galleryId: number | null;
  title: string;
  type: "image" | "video";
  tags: string | null;
  description: string;
  participants: string | null;
  status: "locked" | "unlocked";
  price: string;
  isPaid: boolean;
  payType: "free" | "ppv" | "subscription";
  scheduleAt: string | null;
  file: string;
  teaserFile: string | null;
  thumbnail: string | null;
  views: number;
  createdAt: string;
  updatedAt: string;
  creator: {
    id: number;
    username: string;
    profilePicture: string | null;
  };
  gallery: any | null;
}

export interface SubscriptionPlan {
  id: number;
  creatorId: number;
  name: string;
  price: string;
  duration: number;
  type: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface CreatorsResponse extends ApiResponse<Creator[]> {
  creators: Creator[];
}

export interface PostsResponse extends ApiResponse<Post[]> {
  posts: Post[];
}

export interface MediaResponse extends ApiResponse<Media[]> {
  media: Media[];
  user: {
    id: number;
    username: string;
    profilePicture: string | null;
  };
}

export interface SubscriptionPlansResponse
  extends ApiResponse<SubscriptionPlan[]> {
  plans: SubscriptionPlan[];
}
