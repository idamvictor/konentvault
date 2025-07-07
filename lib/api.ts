import { axiosInstance as apiClient } from "./axios";

export interface Post {
  id: number;
  content: string;
  userId: number;
  price: string;
  isPaid: boolean;
  payType: "free" | "ppv" | "subscription";
  published: boolean;
  views: number;
  type: "text" | "image" | "video" | "mixed";
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    name: string;
    username: string;
    profilePicture: string | null;
  };
  media: Array<{
    mediaPath: string;
  }>;
  reactions: Reaction[];
  mentionedUsers?: Creator[];
}

export interface Reaction {
  id: number;
  type: "like" | "comment" | "share";
  content: string;
  postId: number;
  userId: number;
  hideStatus: boolean;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    name: string;
    username: string;
    profilePicture: string | null;
  };
}

export interface CreatePostData {
  content: string;
  media?: string;
  type: "text" | "image" | "video" | "mixed";
  price?: number;
  payType: "free" | "ppv" | "subscription";
  mentionedUserIds?: number[];
}

export interface UpdatePostData {
  content: string;
  price?: number;
  payType: "free" | "ppv" | "subscription";
}

export interface CreateReactionData {
  type: "like" | "comment" | "share";
  postId: number;
  text?: string;
  media?: string;
}

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
  gender: string | null;
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

export interface CreateTipData {
  amount: number;
  creatorId: number;
}

export interface TipResponse {
  success: boolean;
  message: string;
}

// Post API functions
export const postApi = {
  create: async (data: FormData | CreatePostData) => {
    const config =
      data instanceof FormData
        ? { headers: { "Content-Type": "multipart/form-data" } }
        : {};

    // If it's FormData and has mentionedUserIds, make sure it's properly formatted
    if (data instanceof FormData) {
      const mentionedUserIds = data.get("mentionedUserIds");
      if (mentionedUserIds) {
        // Parse the JSON string and append each ID separately
        const userIds = JSON.parse(mentionedUserIds as string);
        data.delete("mentionedUserIds"); // Remove the JSON string
        userIds.forEach((id: number) => {
          data.append("mentionedUserIds[]", id.toString());
        });
      }
    }

    const response = await apiClient.post("/post", data, config);
    return response.data;
  },

  getUserPosts: async () => {
    const response = await apiClient.get("/post/my");
    return response.data;
  },

  getById: async (id: number) => {
    const response = await apiClient.get(`/post/${id}`);
    return response.data;
  },

  update: async (id: number, data: UpdatePostData) => {
    const response = await apiClient.put(`/post/${id}`, data);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await apiClient.delete(`/post/${id}`);
    return response.data;
  },
};

// Reaction API functions
export const reactionApi = {
  create: async (data: CreateReactionData) => {
    const response = await apiClient.post("/reaction", data);
    return response.data;
  },

  update: async (id: number, data: Partial<CreateReactionData>) => {
    const response = await apiClient.put(`/reaction/${id}`, data);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await apiClient.delete(`/reaction/${id}`);
    return response.data;
  },

  getPostReactions: async (postId: number) => {
    const response = await apiClient.get(`/reaction/post/${postId}`);
    return response.data;
  },
};

// Creators API functions
export const creatorsApi = {
  getAll: async () => {
    const response = await apiClient.get("/creators");
    return response.data;
  },
};

// Tip API functions
export const tipApi = {
  sendTip: async (data: CreateTipData): Promise<TipResponse> => {
    const response = await apiClient.post("/user/give-tip", data);
    return response.data;
  },
};

export const getImageUrl = (mediaPath: string) => {
  return `https://sp.konentvault.net.ng${mediaPath}`;
};
