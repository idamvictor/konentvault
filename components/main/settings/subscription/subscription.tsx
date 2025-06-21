import CollectionsPanel from "@/components/main/collections/collections-panel";
import FollowingPanel from "@/components/main/collections/following-panel";
import React from "react";

export default function Subscriptions() {
  return (
    //The Collections and the subscription route has the same layout
    <main className="flex min-h-screen flex-col">
      <div className="flex flex-col md:flex-row w-full border">
        <div className="w-full md:w-[435px] border-r">
          <CollectionsPanel />
        </div>
        <div className="w-full">
          <FollowingPanel />
        </div>
      </div>
    </main>
  );
}
