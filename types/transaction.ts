import { User } from "./user";

export interface Transaction {
  id: number;
  userId: number;
  amount: string;
  paymentMethod: string;
  paymentType: string;
  description: string;
  reference: string;
  status: string;
  createdAt: string; // or Date if you'll parse it
  updatedAt: string; // or Date if you'll parse it
  creatorId: number;
}

export interface PaystackInitData {
  authorization_url: string;
  access_code: string;
  reference: string;
}

export interface PaystackInitMeta {
  status: boolean;
  message: string;
  data: PaystackInitData;
}

export interface FundWalletResponse {
  success: boolean;
  data: PaystackInitMeta;
}

export interface VerifyPaymentResponse {
  success: boolean
  message: string
  user: User
  data: PaymentData
}

export interface PaymentData {
  id: number
  domain: string
  status: string
  reference: string
  amount: number
  gateway_response: string
  paid_at: string
  created_at: string
  channel: string
  currency: string
  ip_address: string
  metadata: {
    referrer: string
  }
  log: {
    start_time: number
    time_spent: number
    attempts: number
    errors: number
    success: boolean
    mobile: boolean
    input: any[]
    history: {
      type: string
      message: string
      time: number
    }[]
  }
  fees: number
  authorization: Authorization
  customer: Customer
  fees_breakdown: {
    amount: number
    formula: string | null
    type: string
  }[]
  paidAt: string
  createdAt: string
  requested_amount: number
  transaction_date: string
}

export interface Authorization {
  authorization_code: string
  bin: string
  last4: string
  exp_month: string
  exp_year: string
  channel: string
  card_type: string
  bank: string
  country_code: string
  brand: string
  reusable: boolean
  signature: string | null
  account_name: string | null
  sender_bank: string
  sender_country: string
  sender_bank_account_number: string
  sender_name: string
  narration: string
  receiver_bank_account_number: string | null
  receiver_bank: string | null
}

export interface Customer {
  id: number
  first_name: string | null
  last_name: string | null
  email: string
  customer_code: string
  phone: string | null
  metadata: any
  risk_action: string
  international_format_phone: string | null
}

