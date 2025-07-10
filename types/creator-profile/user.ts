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

export interface CreatorsResponse {
  success: boolean;
  creators: Creator[];
}
