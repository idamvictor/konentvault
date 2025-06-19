import { User } from "./user";

export type SubscriptionPlan = {
	id: number;
	name: string;
	price: string;
	duration: number;
	createdAt: string;
}

export interface MySubscriptionResponse {
  success: boolean;
  subscriptions: MySubscription[];
}

export interface MySubscription {
  id: number;
  subscriberId: number;
  creatorId: number;
  amount: string;
  status: string;
  reference: string;
  startedAt: string;
  expiresAt: string;
  cancelledAt: string | null;
  subscriptionPlanId: number ;
  autoRenew: boolean;
  authorizationCode: string | null;
  createdAt: string;
  updatedAt: string;
  creator: User;
	subscriptionPlan: SubscriptionPlan | null;
}


