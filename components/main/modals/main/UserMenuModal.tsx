"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ChevronDown,
  Settings,
  BookMarked,
  HelpCircle,
  Moon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface UserMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserMenuModal({ isOpen, onClose }: UserMenuModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!p-4 w-72 !left-4 !translate-x-0 !top-20 !translate-y-0">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>

        {/* User Info */}
        <div className="space-y-1">
          <h2 className="font-semibold text-foreground">zack</h2>
          <p className="text-sm text-muted-foreground">@u453162462</p>
        </div>

        <div className="mt-4 flex gap-1">
          <div className="text-sm">
            <span className="font-semibold">8</span> Fans
          </div>
          <div className="text-sm text-muted-foreground">·</div>
          <div className="text-sm">
            <span className="font-semibold">14</span> Following
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6 space-y-1">
          <Link
            href="/profile"
            className="flex items-center gap-3 px-2 py-2 text-sm hover:bg-accent rounded-lg"
          >
            <Settings className="h-4 w-4" />
            My profile
          </Link>
          <Link
            href="/collections"
            className="flex items-center gap-3 px-2 py-2 text-sm hover:bg-accent rounded-lg"
          >
            <BookMarked className="h-4 w-4" />
            Collections
          </Link>
        </nav>

        <Separator className="my-4" />

        {/* Settings */}
        <div className="space-y-1">
          <Button variant="ghost" className="w-full justify-start text-sm h-9">
            <Settings className="h-4 w-4 mr-3" />
            Settings
          </Button>
          <Button variant="ghost" className="w-full justify-start text-sm h-9">
            <HelpCircle className="h-4 w-4 mr-3" />
            Help and support
          </Button>
          <Button variant="ghost" className="w-full justify-start text-sm h-9">
            <Moon className="h-4 w-4 mr-3" />
            Dark mode
          </Button>
          <Button variant="ghost" className="w-full justify-start text-sm h-9">
            <ChevronDown className="h-4 w-4 mr-3" />
            English
          </Button>
        </div>

        <Separator className="my-4" />

        {/* Footer */}
        <Button variant="ghost" className="w-full justify-start text-sm h-9">
          Log out
        </Button>
      </DialogContent>
    </Dialog>
  );
}
