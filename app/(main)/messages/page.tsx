import MessagesList from '@/components/main/messages/messages-list';
import React from 'react'
import ConversationArea from '../../../components/main/messages/conversation-area';

export default function MessagessPage() {
  return (
    <div className="flex h-screen">
      <MessagesList />
      <ConversationArea />
    </div>
  );
}
