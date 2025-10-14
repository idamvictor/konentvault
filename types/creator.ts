export interface Creator {
  id: number;
  username: string;
  name: string;
  profilePicture: string | null;
  displayName: string;
  email: string;
  userType: string;
  coverImage: string | null;
  isCreator?: boolean;
  isActive?: boolean;
  isVerified?: boolean;
  bio?: string;
  website?: string;
  location?: string;
  social?: {
    twitter?: string;
    instagram?: string;
    facebook?: string;
  };
  statistics?: {
    followers: number;
    following: number;
    posts: number;
  };
}
