import { BalanceCard } from "@/components/creator/wallet/balance-card";
import { EarningsCard } from "@/components/creator/wallet/earnings-card";
import { EarningsListSection } from "@/components/creator/wallet/earnings-list-section";
import { PayoutRequestsSection } from "@/components/creator/wallet/payout-requests-section";


export default function WalletPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Wallet</h1>
        <p className="text-muted-foreground mt-2">
          Manage your balance, earnings, and payout requests
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <BalanceCard />
        <EarningsCard />
      </div>

      <div className="mb-8">
        <EarningsListSection />
      </div>

      <PayoutRequestsSection />
    </div>
  );
}
