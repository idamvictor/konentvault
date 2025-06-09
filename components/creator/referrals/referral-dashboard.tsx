"use client";

import { Copy, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function ReferralDashboard() {
  const [copied, setCopied] = useState(false);
  const referralLink = "https://allaccessfans.co/creator/onboarding?ref=zack25";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 w-full">
      <div className="mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">Referral Stats</h1>
        </div>

        {/* Stats and Referral Link Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stats Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card rounded-lg p-6 shadow-sm border">
                <div className="text-3xl font-bold text-card-foreground mb-1">
                  0
                </div>
                <div className="text-muted-foreground text-sm">Referrals</div>
              </div>
              <div className="bg-card rounded-lg p-6 shadow-sm border">
                <div className="text-3xl font-bold text-card-foreground mb-1">
                  ₦0
                </div>
                <div className="text-muted-foreground text-sm">
                  Base Earnings
                </div>
              </div>
              <div className="bg-card rounded-lg p-6 shadow-sm border">
                <div className="text-3xl font-bold text-card-foreground mb-1">
                  $0
                </div>
                <div className="text-muted-foreground text-sm">
                  Dollar Earnings
                </div>
              </div>
            </div>
          </div>

          {/* Referral Link Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-card-foreground">
                  Referral Link
                </CardTitle>
                <CardDescription>
                  Share your referral link and invite people to your page
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Input
                    value={referralLink}
                    readOnly
                    className="pr-4 text-sm bg-muted"
                  />
                </div>
                <Button
                  onClick={handleCopyLink}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  {copied ? "Copied!" : "Copy Link"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Referrals Section */}
        <div className="bg-card rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-card-foreground">
              Referrals
            </h2>
          </div>
          <div className="p-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-muted-foreground" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-muted rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full" />
                </div>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-card-foreground mb-2">
              No Referrals Yet
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
              It looks like you haven&apos;t referred anyone yet.
              <br />
              Start referring now and earn exciting rewards for
              <br />
              each successful referral.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
