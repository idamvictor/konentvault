"use client";

import type React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
// import { useToast } from "@/hooks/use-toast"

interface FundWalletDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFund: (amount: number, paymentMethod: string) => void;
}

export function FundWalletDialog({
  open,
  onOpenChange,
  onFund,
}: FundWalletDialogProps) {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  // const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const amountNum = Number.parseFloat(amount);

    if (!amount || amountNum <= 0) {
      toast("Please enter a valid amount greater than 0");
      return;
    }

    if (!paymentMethod) {
      toast("Please select a payment method");
      return;
    }

    onFund(amountNum, paymentMethod);
    toast(`$${amountNum.toFixed(2)} has been added to your wallet`);

    setAmount("");
    setPaymentMethod("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Fund Wallet</DialogTitle>
          <DialogDescription>
            Add funds to your wallet using your preferred payment method
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="amount">Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="payment-method">Payment Method</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger id="payment-method">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Paystack">Paystack</SelectItem>
                  <SelectItem value="Stripe">Stripe</SelectItem>
                  <SelectItem value="PayPal">PayPal</SelectItem>
                  <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Fund Wallet</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
