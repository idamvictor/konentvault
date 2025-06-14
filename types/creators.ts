export interface Creator {
  id: number;
  name: string;
  username: string;
  displayName: string | null;
  email: string;
  userType: "creator" | "subscriber" | "admin";
  profilePicture: string | null;
  coverImage: string | null;
  phone: string | null;
  country: string | null;
  gender: "male" | "female" | "other" | null;
  age: number | null;
  bio: string | null;
  welcomeMessage: string | null;
  emailVerified: boolean;
  isCreator: boolean;
  dateOfBirth: string | null;
  balance: string;
  isVerified: boolean;
  subscriptionPrice: string | null;
  paymentDetails: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type Creators = Creator[];

interface PayoutUser {
  id: number;
  username: string;
  profilePicture: string | null;
}

// Type for PayoutRequest
interface PayoutRequest {
  id: number;
  userId: number;
  amount: string;
  paymentMethod: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  updatedAt: string;
  user: PayoutUser;
  payoutEarnings: unknown[]; // or define if you know the structure
}

// Type for the main API response
export interface PayoutRequestResponse {
  success: boolean;
  message: string;
  payoutRequest: PayoutRequest;
}
