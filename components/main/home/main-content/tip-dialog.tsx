"use client";

import type React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useSendTip } from "@/hooks/use-tips";
import { getImageUrl } from "@/lib/api";
import {
  DollarSign,
  Heart,
  Gift,
  Sparkles,
  AlertCircle,
  Info,
} from "lucide-react";

interface TipDialogProps {
  creatorId: number;
  creatorName: string;
  creatorUsername: string;
  creatorProfilePicture?: string | null;
  children: React.ReactNode;
}

// Updated quick tip amounts to meet minimum requirement
const QUICK_TIP_AMOUNTS = [2, 5, 10, 25, 50];
const MIN_TIP_AMOUNT = 1.5;
const MAX_TIP_AMOUNT = 300;

export function TipDialog({
  creatorId,
  creatorName,
  creatorUsername,
  creatorProfilePicture,
  children,
}: TipDialogProps) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState<number>(0);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedQuickAmount, setSelectedQuickAmount] = useState<number | null>(
    null
  );
  const [validationError, setValidationError] = useState<string>("");

  const sendTip = useSendTip();

  const validateAmount = (value: number): string => {
    if (value <= 0) {
      return "Please enter a tip amount";
    }
    if (value < MIN_TIP_AMOUNT) {
      return `Minimum tip amount is $${MIN_TIP_AMOUNT.toFixed(2)}`;
    }
    if (value > MAX_TIP_AMOUNT) {
      return `Maximum tip amount is $${MAX_TIP_AMOUNT.toFixed(2)}`;
    }
    return "";
  };

  const handleQuickAmountSelect = (quickAmount: number) => {
    setAmount(quickAmount);
    setSelectedQuickAmount(quickAmount);
    setCustomAmount("");
    setValidationError(validateAmount(quickAmount));
  };

  const handleCustomAmountChange = (value: string) => {
    const numValue = Number.parseFloat(value) || 0;
    setCustomAmount(value);
    setAmount(numValue);
    setSelectedQuickAmount(null);
    setValidationError(validateAmount(numValue));
  };

  const handleSendTip = () => {
    const error = validateAmount(amount);
    if (error) {
      setValidationError(error);
      return;
    }

    sendTip.mutate(
      { amount, creatorId },
      {
        onSuccess: () => {
          setOpen(false);
          resetForm();
        },
        onError: (error) => {
          // The error will be handled by the hook's onError callback
          // But we can also set local validation error if needed
          let errorMessage = "";
          if (
            error instanceof Error &&
            // @ts-expect-error: axios error shape
            error.response?.data
          ) {
            errorMessage =
              // @ts-expect-error: axios error shape
              error.response.data.error || error.response.data.message || "";
          }
          if (errorMessage) {
            setValidationError(errorMessage);
          }
        },
      }
    );
  };

  const resetForm = () => {
    setAmount(0);
    setCustomAmount("");
    setSelectedQuickAmount(null);
    setValidationError("");
  };

  const isValidAmount = amount >= MIN_TIP_AMOUNT && amount <= MAX_TIP_AMOUNT;

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        setOpen(newOpen);
        if (!newOpen) {
          resetForm();
        }
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-yellow-500" />
            Send Tip
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Creator Info */}
          <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <Avatar className="w-12 h-12">
              <AvatarImage
                src={
                  creatorProfilePicture
                    ? getImageUrl(creatorProfilePicture)
                    : undefined
                }
                alt={creatorName}
              />
              <AvatarFallback className="bg-blue-100 text-blue-600">
                {creatorName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-sm">{creatorName}</h3>
              <p className="text-xs text-muted-foreground">
                @{creatorUsername}
              </p>
            </div>
            <Badge
              variant="outline"
              className="bg-yellow-100 text-yellow-800 border-yellow-200"
            >
              <Sparkles className="w-3 h-3 mr-1" />
              Creator
            </Badge>
          </div>

          {/* Tip Amount Rules */}
          <Alert className="border-blue-200 bg-blue-50">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800 text-sm">
              Tip amount must be between ${MIN_TIP_AMOUNT.toFixed(2)} and $
              {MAX_TIP_AMOUNT.toFixed(2)}
            </AlertDescription>
          </Alert>

          {/* Quick Amount Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Quick Amounts</Label>
            <div className="grid grid-cols-5 gap-2">
              {QUICK_TIP_AMOUNTS.map((quickAmount) => (
                <Button
                  key={quickAmount}
                  variant={
                    selectedQuickAmount === quickAmount ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => handleQuickAmountSelect(quickAmount)}
                  className={`h-10 ${
                    selectedQuickAmount === quickAmount
                      ? "bg-green-600 hover:bg-green-700"
                      : "hover:bg-green-50 hover:border-green-200"
                  }`}
                >
                  ${quickAmount}
                </Button>
              ))}
            </div>
          </div>

          {/* Custom Amount */}
          <div className="space-y-2">
            <Label htmlFor="custom-amount" className="text-sm font-medium">
              Custom Amount
            </Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="custom-amount"
                type="number"
                min={MIN_TIP_AMOUNT}
                max={MAX_TIP_AMOUNT}
                step="0.01"
                placeholder={`${MIN_TIP_AMOUNT.toFixed(2)}`}
                value={customAmount}
                onChange={(e) => handleCustomAmountChange(e.target.value)}
                className={`pl-10 ${
                  validationError && !isValidAmount
                    ? "border-red-300 focus:border-red-500"
                    : ""
                }`}
              />
            </div>
            {validationError && (
              <div className="flex items-center gap-2 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{validationError}</span>
              </div>
            )}
          </div>

          {/* Total Display */}
          {amount > 0 && isValidAmount && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-green-800">
                  Total Tip Amount:
                </span>
                <span className="text-lg font-bold text-green-600">
                  ${amount.toFixed(2)}
                </span>
              </div>
            </div>
          )}

          {/* Validation Error Alert */}
          {validationError && !isValidAmount && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{validationError}</AlertDescription>
            </Alert>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSendTip}
              disabled={!isValidAmount || sendTip.isPending}
              className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50"
            >
              {sendTip.isPending ? (
                "Sending..."
              ) : (
                <>
                  <Heart className="w-4 h-4 mr-2" />
                  Send ${amount.toFixed(2)}
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
