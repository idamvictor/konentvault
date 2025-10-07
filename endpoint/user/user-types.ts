interface PurchaseCreator {
  id: number;
  username: string;
  profilePicture: string;
}

export interface Purchase {
  id: number;
  type: "media";
  title: string;
  description: string;
  mediaUrl: string;
  itemType: "image" | "video";
  price: string;
  payType: "ppv" | "subscription";
  creator: PurchaseCreator;
  purchasedAt: string;
  amount: string;
  paymentReference: string;
}

export interface PurchasesResponse {
  success: boolean;
  message: string;
  purchases: Purchase[];
}

export interface Transaction {
  id: number;
  userId: number;
  amount: string;
  paymentMethod: "paystack" | "wallet";
  paymentType: "wallet" | "media" | "";
  description: string;
  reference: string;
  status: "successful" | "failed" | "";
  createdAt: string;
  updatedAt: string;
  creatorId: number;
}

export interface TransactionsResponse {
  success: boolean;
  paymentLogs: Transaction[];
}

export interface FundWalletRequest {
  amount: number;
  paymentProvider: "paystack" | "bani";
  paymentMethod?: "bank_transfer" | "mobile_money";
  bank_name?: string;
  momo_network?: string;
  callback_url?: string;
}

interface PaystackData {
  authorization_url: string;
  access_code: string;
  reference: string;
}

export interface FundWalletResponse {
  success: boolean;
  data: {
    status: boolean;
    message: string;
    data: PaystackData;
  };
}
