import MessagesList from '@/components/creator/messages/messages-list';
import React from 'react'
import ConversationArea from '../../../components/creator/messages/conversation-area';

export default function MessagessPage() {
  return (
    <div className="flex h-screen">
      <MessagesList />
      <ConversationArea />
    </div>
  );
}
