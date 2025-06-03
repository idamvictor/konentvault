import CollectionsPanel from '@/components/collections/collections-panel';
import FollowingPanel from '@/components/collections/following-panel';
import React from 'react'

export default function CollectionsPage() {
  return (
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
