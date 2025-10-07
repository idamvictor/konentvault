"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { UserBalanceCard } from "@/components/main/user-wallet/user-balance-card";
import { TransactionsSection } from "@/components/main/user-wallet/transactions-section";
// import FundWalletDialog from "@/components/main/user-wallet/fund-wallet-dialog";

export default function UserWalletPage() {
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
          <Button size="lg">
            <Plus className="mr-2 h-4 w-4" />
            Fund Wallet
          </Button>
        </div>

        <UserBalanceCard />

        <TransactionsSection />

        {/* <FundWalletDialog /> */}
      </div>
    </div>
  );
}
