import { BalanceCard } from "@/components/creator/dashboard/balance-card";
import { EarningsBreakdown } from "@/components/creator/dashboard/earnings-breakdown";
import { EarningsChart } from "@/components/creator/dashboard/earnings-chart";
import { RecentTransactions } from "@/components/creator/dashboard/recent-transactions";
import { SummaryCards } from "@/components/creator/dashboard/summary-cards";
import { WithdrawalDetails } from "@/components/creator/dashboard/withdrawal-details";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto p-4 md:p-6 lg:p-8">
        <div className="space-y-6">
          {/* Top Section */}
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <BalanceCard />
            </div>
            <div>
              <WithdrawalDetails />
            </div>
          </div>

          {/* Summary Cards */}
          <SummaryCards />

          {/* Charts and Breakdown */}
          <div className="grid gap-6 lg:grid-cols-2">
            <EarningsChart />
            <EarningsBreakdown />
          </div>

          {/* Recent Transactions */}
          <RecentTransactions />
        </div>
      </main>
    </div>
  );
}
