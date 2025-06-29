// import MessagesList from '@/components/creator/messages/messages-list';
// import React from 'react'
// import ConversationArea from '../../../components/creator/messages/conversation-area';

// export default function MessagessPage() {
//   return (
//     <div className="flex h-screen">
//       <MessagesList />
//       <ConversationArea />
//     </div>
//   );
// }

import MessagingApp from "@/components/creator/messages/messaging-app";
import React from "react";

export default function MessagessPage() {
  return (
    <div className="flex h-screen">
      <MessagingApp />
    </div>
  );
}
