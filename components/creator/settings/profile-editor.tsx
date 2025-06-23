"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import EditProfile from "./EditProfile";
import IdentityVerification from "@/components/main/settings/id-verification/identity-verification";
import SubscriptionSetting from "@/app/(main)/settings/subscription/page";
import BankingSettings from "@/components/main/settings/banking/banking-settings";
import EmailSetting from "@/components/main/settings/security/email-setting";
import PasswordSetting from "@/components/main/settings/security/password-setting";
import Account from "@/components/main/settings/account/account";

export function ProfileEditor() {
  return (
    <div className="w-full mx-auto p-4 sm:p-6 lg:p-8">
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-8">
          <TabsTrigger value="account" className="text-sm">
            Account
          </TabsTrigger>
          <TabsTrigger value="security" className="text-sm">
            Security
          </TabsTrigger>
          <TabsTrigger value="subscriptions" className="text-sm">
            Subscriptions
          </TabsTrigger>
          <TabsTrigger value="banking" className="text-sm">
            Banking
          </TabsTrigger>
          <TabsTrigger value="id-verification" className="text-sm">
            ID Verification
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-8">
          <div className="border-border p-6">
            <h2 className="text-xl font-semibold mb-4">Account</h2>
            {/* <EditProfile />{" "} */}
            <Account />
          </div>
        </TabsContent>

        <TabsContent value="security">
          <div className="border-border p-6">
            <h2 className="text-xl font-semibold mb-4">Security</h2>
            <EmailSetting />
            <PasswordSetting />
          </div>
        </TabsContent>

        <TabsContent value="subscriptions">
          <div className="border-border p-6">
            <h2 className="text-xl font-semibold mb-4">Subscriptions</h2>
            <SubscriptionSetting />
          </div>
        </TabsContent>

        <TabsContent value="banking">
          <div className="border-border p-6">
            <h2 className="text-xl font-semibold mb-4">Banking</h2>
            <BankingSettings />
          </div>
        </TabsContent>

        <TabsContent value="id-verification">
          <div className="border-border p-6">
            <h2 className="text-xl font-semibold mb-4">ID Verification</h2>
            <IdentityVerification />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
