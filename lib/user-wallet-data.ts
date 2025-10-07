export interface PaymentLog {
  id: number;
  userId: number;
  amount: string;
  paymentMethod: string;
  paymentType: string;
  description: string;
  reference: string;
  status: "successful" | "pending" | "failed";
  creatorId: number;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    username: string;
    name: string;
    profilePicture: string | null;
  };
}

export const USER_WALLET_BALANCE = {
  available: 5420.0,
  currency: "USD",
};

export const PAYMENT_LOGS: PaymentLog[] = [
  {
    id: 13,
    userId: 1,
    amount: "2000.00",
    paymentMethod: "paystack",
    paymentType: "wallet",
    description: "Wallet Funding by pascalnonso",
    reference: "wall_1751107879275_1",
    status: "successful",
    creatorId: 0,
    createdAt: "2025-06-28T10:51:19.000Z",
    updatedAt: "2025-06-28T10:53:28.000Z",
    user: {
      id: 1,
      username: "pascalnonso",
      name: "Pascal Chinonso O",
      profilePicture: null,
    },
  },
  {
    id: 12,
    userId: 1,
    amount: "1500.00",
    paymentMethod: "stripe",
    paymentType: "wallet",
    description: "Wallet Funding by pascalnonso",
    reference: "wall_1751107123456_1",
    status: "successful",
    creatorId: 0,
    createdAt: "2025-06-25T08:30:15.000Z",
    updatedAt: "2025-06-25T08:32:20.000Z",
    user: {
      id: 1,
      username: "pascalnonso",
      name: "Pascal Chinonso O",
      profilePicture: null,
    },
  },
  {
    id: 11,
    userId: 1,
    amount: "500.00",
    paymentMethod: "paystack",
    paymentType: "subscription",
    description: "Premium Subscription Payment",
    reference: "sub_1751098765432_1",
    status: "successful",
    creatorId: 5,
    createdAt: "2025-06-20T14:20:30.000Z",
    updatedAt: "2025-06-20T14:22:15.000Z",
    user: {
      id: 1,
      username: "pascalnonso",
      name: "Pascal Chinonso O",
      profilePicture: null,
    },
  },
  {
    id: 10,
    userId: 1,
    amount: "750.00",
    paymentMethod: "stripe",
    paymentType: "wallet",
    description: "Wallet Funding by pascalnonso",
    reference: "wall_1751087654321_1",
    status: "successful",
    creatorId: 0,
    createdAt: "2025-06-15T11:45:00.000Z",
    updatedAt: "2025-06-15T11:47:10.000Z",
    user: {
      id: 1,
      username: "pascalnonso",
      name: "Pascal Chinonso O",
      profilePicture: null,
    },
  },
  {
    id: 9,
    userId: 1,
    amount: "300.00",
    paymentMethod: "paystack",
    paymentType: "tip",
    description: "Tip to Creator",
    reference: "tip_1751076543210_1",
    status: "successful",
    creatorId: 8,
    createdAt: "2025-06-10T16:30:45.000Z",
    updatedAt: "2025-06-10T16:32:30.000Z",
    user: {
      id: 1,
      username: "pascalnonso",
      name: "Pascal Chinonso O",
      profilePicture: null,
    },
  },
  {
    id: 8,
    userId: 1,
    amount: "1000.00",
    paymentMethod: "stripe",
    paymentType: "wallet",
    description: "Wallet Funding by pascalnonso",
    reference: "wall_1751065432109_1",
    status: "pending",
    creatorId: 0,
    createdAt: "2025-06-05T09:15:20.000Z",
    updatedAt: "2025-06-05T09:15:20.000Z",
    user: {
      id: 1,
      username: "pascalnonso",
      name: "Pascal Chinonso O",
      profilePicture: null,
    },
  },
  {
    id: 7,
    userId: 1,
    amount: "370.00",
    paymentMethod: "paystack",
    paymentType: "purchase",
    description: "Digital Product Purchase",
    reference: "pur_1751054321098_1",
    status: "successful",
    creatorId: 3,
    createdAt: "2025-05-28T13:40:10.000Z",
    updatedAt: "2025-05-28T13:42:05.000Z",
    user: {
      id: 1,
      username: "pascalnonso",
      name: "Pascal Chinonso O",
      profilePicture: null,
    },
  },
];
