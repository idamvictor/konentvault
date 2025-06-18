export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  balance: number;
  password?: string;
  displayName: string;
  country: string;
  state: string;
  address: string;
  city: string;
  zipCode: string;
  instagram?: string;
  xTwitter?: string;
  dateOfBirth?: string; // ISO 8601 format date
  userType: "fan" | "creator"; // Add more types as necessary
  profilePicture?: string | null;
  coverImage?: string | null;
  bio?: string;
  emailVerified: boolean;
  isVerified: boolean;
  subscriptionPrice: number;
  paymentDetails?: PaymentDetails;
  isActive: boolean;
  createdAt?: string; // ISO 8601 format date
  updatedAt?: string; // ISO 8601 format date
  documentType?: "passport" | "id_card" | "drivers_license";
}

export interface MinimalUser {
  id: number;
  name: string;
  email: string;
  username: string;
  userType: "fan" | "creator";
  balance: number;
  bio?: string;
  emailVerified: boolean;
  profilePicture?: string | null;
  coverImage?: string | null;
}

export interface PaymentDetails {
  bankName: string;
  accountNumber: string;
  name: string;
}
