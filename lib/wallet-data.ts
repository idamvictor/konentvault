export interface PayoutRequest {
  id: string;
  amount: number;
  paymentMethod: string;
  status: "pending" | "processing" | "completed" | "rejected";
  requestedAt: string;
  notes?: string;
}

export interface Earning {
  id: string;
  source: string;
  amount: number;
  type: "subscription" | "one-time" | "tip" | "commission";
  date: string;
  description?: string;
}

export const WALLET_BALANCE = {
  available: 2450.75,
  pending: 320.5,
  currency: "USD",
};

export const CREATOR_EARNINGS = {
  total: 15780.25,
  thisMonth: 2771.25,
  lastMonth: 2450.75,
  percentageChange: 13.08,
  currency: "USD",
};

export const EARNINGS_LIST: Earning[] = [
  {
    id: "1",
    source: "Premium Subscription",
    amount: 299.99,
    type: "subscription",
    date: "2025-01-06T14:30:00Z",
    description: "Monthly subscription revenue",
  },
  {
    id: "2",
    source: "Custom Commission",
    amount: 850.0,
    type: "commission",
    date: "2025-01-05T10:15:00Z",
    description: "Logo design project",
  },
  {
    id: "3",
    source: "Supporter Tip",
    amount: 50.0,
    type: "tip",
    date: "2025-01-04T16:45:00Z",
  },
  {
    id: "4",
    source: "Digital Product Sale",
    amount: 149.99,
    type: "one-time",
    date: "2025-01-03T09:20:00Z",
    description: "UI Kit purchase",
  },
  {
    id: "5",
    source: "Premium Subscription",
    amount: 299.99,
    type: "subscription",
    date: "2024-12-06T14:30:00Z",
    description: "Monthly subscription revenue",
  },
  {
    id: "6",
    source: "Supporter Tip",
    amount: 25.0,
    type: "tip",
    date: "2024-12-28T11:10:00Z",
  },
  {
    id: "7",
    source: "Custom Commission",
    amount: 1200.0,
    type: "commission",
    date: "2024-12-20T13:00:00Z",
    description: "Website redesign project",
  },
  {
    id: "8",
    source: "Digital Product Sale",
    amount: 79.99,
    type: "one-time",
    date: "2024-12-15T08:30:00Z",
    description: "Icon pack purchase",
  },
];

export const INITIAL_PAYOUT_REQUESTS: PayoutRequest[] = [
  {
    id: "1",
    amount: 500.0,
    paymentMethod: "PayPal",
    status: "completed",
    requestedAt: "2024-12-15T10:30:00Z",
    notes: "Monthly payout",
  },
  {
    id: "2",
    amount: 750.5,
    paymentMethod: "Bank Transfer",
    status: "processing",
    requestedAt: "2024-12-28T14:20:00Z",
  },
  {
    id: "3",
    amount: 320.5,
    paymentMethod: "Stripe",
    status: "pending",
    requestedAt: "2025-01-05T09:15:00Z",
    notes: "End of year payout",
  },
];
