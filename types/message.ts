export interface User {
  id: number;
  name: string;
  username: string;
  profilePicture: string;
}

export interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  mediaUrl: string | null;
  seen: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  sender: User;
  receiver: User;
}

export interface Conversation {
  otherUser: User;
  lastMessage: {
    id: number;
    sender: User;
    receiver: User;
    content: string;
    mediaUrl: string | null;
    createdAt: string;
    seen: boolean;
  };
  unseenCount: number;
}

export interface SendMessageRequest {
  receiverId: number;
  content: string;
  media?: string;
}

export interface SendMessageResponse {
  success: boolean;
  message: string;
  data: Message;
}

export interface ConversationsResponse {
  success: boolean;
  conversations: Conversation[];
}

export interface MessagesResponse {
  success: boolean;
  messages: Message[];
}
