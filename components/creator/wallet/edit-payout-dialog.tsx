"use client";

import type React from "react";
import { useState, useEffect } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import type { PayoutRequest } from "@/lib/wallet-data";
import { toast } from "@/hooks/use-toast";

type EditPayoutDialogProps = {
  request: PayoutRequest;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (updates: Partial<PayoutRequest>) => void;
};

export function EditPayoutDialog({
  request,
  open,
  onOpenChange,
  onSuccess,
}: EditPayoutDialogProps) {
  const [amount, setAmount] = useState(request.amount.toString());
  const [method, setMethod] = useState(request.paymentMethod);
  const [notes, setNotes] = useState(request.notes || "");

  useEffect(() => {
    setAmount(request.amount.toString());
    setMethod(request.paymentMethod);
    setNotes(request.notes || "");
  }, [request]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsedAmount = Number.parseFloat(amount);

    if (parsedAmount <= 0 || isNaN(parsedAmount)) {
      toast({
        title: "Error",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }

    if (!method) {
      toast({
        title: "Error",
        description: "Please select a payment method",
        variant: "destructive",
      });
      return;
    }

    onSuccess({
      amount: parsedAmount,
      paymentMethod: method,
      notes: notes || undefined,
    });

    toast({
      title: "Success",
      description: "Payout request updated successfully",
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Payout Request</DialogTitle>
            <DialogDescription>
              Update your payout request details
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-amount">Amount</Label>
              <Input
                id="edit-amount"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-method">Payment Method</Label>
              <Select value={method} onValueChange={setMethod} required>
                <SelectTrigger id="edit-method">
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                  <SelectItem value="PayPal">PayPal</SelectItem>
                  <SelectItem value="Stripe">Stripe</SelectItem>
                  <SelectItem value="Cryptocurrency">Cryptocurrency</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-notes">Notes (Optional)</Label>
              <Textarea
                id="edit-notes"
                placeholder="Add any additional information..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
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
            <Button type="submit">Update Request</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
