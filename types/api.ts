import { Post } from "./post";
import { SubscriptionPlan } from "./subscription";
import { Transaction } from "./transaction";
import { User } from "./user";

export interface defaultApiResponse {
  success: boolean;
  message: string;
}

export interface dataApiResponse {
  status: boolean;
  message: string;
  data: any;
}

export interface UpdateProfileResponse {
  success: boolean;
  message: string;
  user: User;
}

export interface PostApiResponse {
  success: boolean;
  posts: Post[];
}

export interface SinglePostApiResponse {
  success: boolean;
  post: Post;
}

export interface UserApiResponse {
  success: boolean;
  user: User;
}

export interface CreatorsApiResponse {
  success: boolean;
  creators: User[];
}

// subscription plans api response
export interface SubscriptionPlanResponse {
  success: boolean;
  plans: SubscriptionPlan[];
}

export interface TransactionsHistoryResponse {
  success: boolean;
  paymentLogs: Transaction[];
}
