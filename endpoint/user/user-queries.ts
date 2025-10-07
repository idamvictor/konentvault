import { useQuery, useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import {
  TransactionsResponse,
  PurchasesResponse,
  FundWalletRequest,
  FundWalletResponse,
} from "./user-types";

// ==================================== Get User Purchases ========================================//

const getPurchases = async (): Promise<PurchasesResponse> => {
  const response = await axiosInstance.get("/user/my/purchases");
  return response.data;
};

export const usePurchases = () => {
  return useQuery<PurchasesResponse>({
    queryKey: ["purchases"],
    queryFn: getPurchases,
  });
};

// ==================================== Fund Wallet ========================================//

export const useFundWallet = () => {
  return useMutation<FundWalletResponse, Error, FundWalletRequest>({
    mutationFn: async (data: FundWalletRequest) => {
      const response = await axiosInstance.post("/user/fund-wallet", data);
      return response.data;
    },
  });
};

// ==================================== Get User Transactions ========================================//

const getTransactions = async (): Promise<TransactionsResponse> => {
  const response = await axiosInstance.get("/user/transaction/all");
  return response.data;
};

export const useTransactions = () => {
  return useQuery<TransactionsResponse>({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });
};
