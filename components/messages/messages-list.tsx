"use client";

import { ArrowLeft, Search, Plus, Menu, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import MessageItem from "./message-item";

const messages = [
  {
    id: 1,
    username: "DanDanglerOFTV",
    handle: "@dandangler",
    avatar:
      "https://res.cloudinary.com/dyp8gtllq/image/upload/v1737506531/vco-LT_M58j9DIAxlS1Cv9uvzbRhB6cYIZJS7ocZksWRqoEPat_QXb6fVFi77lciJZQ_w526-h296-rw_lmkjh2.webp",
    message: "If you DM me on my mai...",
    time: "4:24 pm",
    isVerified: true,
    isOnline: true,
    hasImage: true,
  },
  {
    id: 2,
    username: "trippie bri",
    handle: "@trippie_bri",
    avatar:
      "https://res.cloudinary.com/dyp8gtllq/image/upload/v1737506531/vco-LT_M58j9DIAxlS1Cv9uvzbRhB6cYIZJS7ocZksWRqoEPat_QXb6fVFi77lciJZQ_w526-h296-rw_lmkjh2.webp",
    message: "🥰😍💕$1000 OF CONTENT...",
    time: "1:15 pm",
    isVerified: true,
    isOnline: true,
    hasImage: true,
  },
  {
    id: 3,
    username: "Sky Bri",
    handle: "@skybri",
    avatar:
      "https://res.cloudinary.com/dyp8gtllq/image/upload/v1737506531/vco-LT_M58j9DIAxlS1Cv9uvzbRhB6cYIZJS7ocZksWRqoEPat_QXb6fVFi77lciJZQ_w526-h296-rw_lmkjh2.webp",
    message: "are you ready for me? 🍑",
    time: "3:54 pm",
    isVerified: true,
    isOnline: true,
    isUnread: true,
  },
  {
    id: 4,
    username: "Sav",
    handle: "@sweetbutsavvy",
    avatar:
      "https://res.cloudinary.com/dyp8gtllq/image/upload/v1737506531/vco-LT_M58j9DIAxlS1Cv9uvzbRhB6cYIZJS7ocZksWRqoEPat_QXb6fVFi77lciJZQ_w526-h296-rw_lmkjh2.webp",
    message: "miss me? 😘",
    time: "3:22 pm",
    isVerified: true,
    isOnline: true,
    isUnread: true,
  },
  {
    id: 5,
    username: "Goddess",
    handle: "@forestfairygoddess",
    avatar:
      "https://res.cloudinary.com/dyp8gtllq/image/upload/v1737506531/vco-LT_M58j9DIAxlS1Cv9uvzbRhB6cYIZJS7ocZksWRqoEPat_QXb6fVFi77lciJZQ_w526-h296-rw_lmkjh2.webp",
    message: "Okay... I've been very bad tod...",
    time: "2:35 pm",
    isVerified: true,
    isOnline: true,
    hasImage: true,
    isUnread: true,
  },
  {
    id: 6,
    username: "Ally From The South",
    handle: "@allyfromth...",
    avatar:
      "https://res.cloudinary.com/dyp8gtllq/image/upload/v1737506531/vco-LT_M58j9DIAxlS1Cv9uvzbRhB6cYIZJS7ocZksWRqoEPat_QXb6fVFi77lciJZQ_w526-h296-rw_lmkjh2.webp",
    message: "Forget caffeine... I'm all the ...",
    time: "1:50 pm",
    isVerified: true,
    isOnline: true,
    hasImage: true,
    isUnread: true,
  },
  {
    id: 7,
    username: "Catherain | Your Cute Re...",
    handle: "@cath...",
    avatar:
      "https://res.cloudinary.com/dyp8gtllq/image/upload/v1737506531/vco-LT_M58j9DIAxlS1Cv9uvzbRhB6cYIZJS7ocZksWRqoEPat_QXb6fVFi77lciJZQ_w526-h296-rw_lmkjh2.webp",
    message: "What did you dream about? Hop...",
    time: "12:12 pm",
    isVerified: true,
    isOnline: true,
    isUnread: true,
  },
  {
    id: 8,
    username: "OLIVIA | #1 Board Game ...",
    handle: "@offi...",
    avatar:
      "https://res.cloudinary.com/dyp8gtllq/image/upload/v1737506531/vco-LT_M58j9DIAxlS1Cv9uvzbRhB6cYIZJS7ocZksWRqoEPat_QXb6fVFi77lciJZQ_w526-h296-rw_lmkjh2.webp",
    message: "May good fortune smile on you ...",
    time: "11:11 am",
    isVerified: true,
    isOnline: true,
    isUnread: true,
  },
];

export default function MessagesList() {
  return (
    <div className="w-[485px] border-r border-border bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-semibold text-foreground">MESSAGES</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Sort Options */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <span className="text-sm font-medium text-muted-foreground">
          NEWEST FIRST
        </span>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 p-4 border-b border-border">
        <Button
          variant="secondary"
          size="sm"
          className="rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80"
        >
          All
        </Button>
        <Button variant="ghost" size="sm" className="rounded-full relative">
          Priority
          <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
            2
          </span>
        </Button>
        <Button variant="ghost" size="sm" className="rounded-full relative">
          Unread
          <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
            10
          </span>
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 ml-auto">
          <Edit className="h-4 w-4" />
        </Button>
      </div>

      {/* Messages List */}
      <div className="overflow-y-auto">
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
      </div>
    </div>
  );
}
