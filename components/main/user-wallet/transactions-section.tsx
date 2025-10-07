import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TransactionsTable } from "./transactions-table";
import { PurchasesTable } from "./purchases-table";
import { Receipt, ShoppingBag } from "lucide-react";
import { useTransactions } from "@/endpoint/user/user-queries";
import { usePurchases } from "@/endpoint/user/user-queries";
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TransactionsSection() {
  const { data: transactionsData, isLoading: isLoadingTransactions } =
    useTransactions();
  const { data: purchasesData, isLoading: isLoadingPurchases } = usePurchases();

  if (isLoadingTransactions || isLoadingPurchases) {
    return (
      <Card>
        <CardContent className="flex justify-center py-8">
          <Spinner />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Receipt className="h-5 w-5" />
          History
        </CardTitle>
        <CardDescription>
          View all your transactions and purchases
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="transactions">
          <TabsList className="mb-4">
            <TabsTrigger
              value="transactions"
              className="flex items-center gap-2"
            >
              <Receipt className="h-4 w-4" />
              Transactions
            </TabsTrigger>
            <TabsTrigger value="purchases" className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              Purchases
            </TabsTrigger>
          </TabsList>
          <TabsContent value="transactions">
            <TransactionsTable
              transactions={transactionsData?.paymentLogs || []}
            />
          </TabsContent>
          <TabsContent value="purchases">
            <PurchasesTable purchases={purchasesData?.purchases || []} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
