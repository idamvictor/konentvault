"use client";

import { useState } from "react";
import {
  USER_WALLET_BALANCE,
  PAYMENT_LOGS,
  type PaymentLog,
} from "@/lib/user-wallet-data";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { UserBalanceCard } from "@/components/main/user-wallet/user-balance-card";
import { TransactionsSection } from "@/components/main/user-wallet/transactions-section";
import { FundWalletDialog } from "@/components/main/user-wallet/fund-wallet-dialog";

export default function UserWalletPage() {
  const [transactions, setTransactions] = useState<PaymentLog[]>(PAYMENT_LOGS);
  const [balance, setBalance] = useState(USER_WALLET_BALANCE.available);
  const [isFundDialogOpen, setIsFundDialogOpen] = useState(false);

  const handleFundWallet = (amount: number, paymentMethod: string) => {
    const newTransaction: PaymentLog = {
      id: Math.max(...transactions.map((t) => t.id)) + 1,
      userId: 1,
      amount: amount.toFixed(2),
      paymentMethod: paymentMethod.toLowerCase(),
      paymentType: "wallet",
      description: `Wallet Funding by pascalnonso`,
      reference: `wall_${Date.now()}_1`,
      status: "successful",
      creatorId: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      user: {
        id: 1,
        username: "pascalnonso",
        name: "Pascal Chinonso O",
        profilePicture: null,
      },
    };

    setTransactions([newTransaction, ...transactions]);
    setBalance(balance + amount);
    setIsFundDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Wallet</h1>
            <p className="text-muted-foreground mt-1">
              Manage your balance and transactions
            </p>
          </div>
          <Button onClick={() => setIsFundDialogOpen(true)} size="lg">
            <Plus className="mr-2 h-4 w-4" />
            Fund Wallet
          </Button>
        </div>

        <UserBalanceCard balance={balance} />

        <TransactionsSection transactions={transactions} />

        <FundWalletDialog
          open={isFundDialogOpen}
          onOpenChange={setIsFundDialogOpen}
          onFund={handleFundWallet}
        />
      </div>
    </div>
  );
}
