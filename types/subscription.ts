interface Creator {
  id: number;
  username: string;
  profilePicture: string | null;
}

// Type for each subscription
interface Subscription {
  id: number;
  subscriberId: number;
  creatorId: number;
  amount: string;
  status: "active" | "inactive" | "paused" | "canceled";
  reference: string;
  expiresAt: string;
  cancelledAt: string | null;
  autoRenew: boolean;
  authorizationCode: string;
  createdAt: string;
  updatedAt: string;
  creator: Creator;
}

export type Subscriptions = { Subscriptions: Subscription[] };
