import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function WithdrawalDetails() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">
          Withdrawal Details
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="text-primary hover:text-primary/90"
        >
          <Edit className="mr-1 h-4 w-4" />
          Edit
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            {" "}
            <Label htmlFor="bank-name">Bank Name</Label>
            <Input
              id="bank-name"
              value="OPAY"
              readOnly
              className="bg-muted"
              aria-describedby="bank-name-desc"
            />
            <span id="bank-name-desc" className="sr-only">
              Current bank name for withdrawals
            </span>
          </div>
          <div className="space-y-2">
            {" "}
            <Label htmlFor="account-number">Account Number</Label>
            <Input
              id="account-number"
              value="8064037149"
              readOnly
              className="bg-muted"
              aria-describedby="account-number-desc"
            />
            <span id="account-number-desc" className="sr-only">
              Current account number for withdrawals
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
