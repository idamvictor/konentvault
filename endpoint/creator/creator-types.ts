export interface Earning {
  id: number;
  userId: number;
  amount: string;
  systemCommission: number;
  netAmount: string;
  type: "tip" | "subscription" | "media";
  reference: string;
  status: "paid" | "unpaid";
  isPaid: boolean;
  referralCommission: number;
  createdAt: string;
  updatedAt: string;
}

export interface EarningsResponse {
  success: boolean;
  earnings: Earning[];
}
