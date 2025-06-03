import MessagesList from '@/components/messages/messages-list';
import React from 'react'
import ConversationArea from '../../../components/messages/conversation-area';

export default function MessagessPage() {
  return (
    <div className="flex h-screen">
      <MessagesList />
      <ConversationArea />
    </div>
  );
}
