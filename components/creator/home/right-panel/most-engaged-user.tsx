'use client'

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Crown, Lock } from "lucide-react";
import { useEffect, useState } from "react";

const users = [
  {
    id: 1,
    initials: "BC",
    username: "User028378938",
    handle: "@Boycoco1",
    subscriptions: 6,
    spent: "$95K",
  },
  {
    id: 2,
    initials: "OB",
    username: "User0129151124",
    handle: "@Olamideb",
    subscriptions: 7,
    spent: "$183K",
  },
  {
    id: 3,
    initials: "MP",
    username: "User6898826197",
    handle: "@Regardstoy",
    subscriptions: 3,
    spent: "$124K",
  },
  {
    id: 4,
    initials: "HO",
    username: "User854876864",
    handle: "@Habeeb08",
    subscriptions: 5,
    spent: "$85K",
  },
];

export default function MostEngagedUser() {
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [sliding, setSliding] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">(
    "left"
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setSliding(true);
      setSlideDirection("left");

      setTimeout(() => {
        setCurrentUserIndex((prev) => (prev + 1) % users.length);
        setSlideDirection("right");
        setTimeout(() => {
          setSliding(false);
        }, 50);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentUser = users[currentUserIndex];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Most Engaged Subscribers</h2>

      <div className="relative overflow-hidden">
        <div
          className={`transition-all duration-300 ease-in-out transform ${
            sliding
              ? slideDirection === "left"
                ? "-translate-x-full opacity-0"
                : "translate-x-0 opacity-100"
              : ""
          }`}
        >
          <Card className="relative overflow-hidden border-0">
            <div className="absolute inset-0 bg-pink-50 z-0" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/50 opacity-100 top-[40%] z-10" />

            <CardContent className="p-6 relative z-20">
              {/* Decorative Lock Icon */}
              <div className="absolute top-4 right-4 opacity-20">
                <Lock className="h-8 w-8 text-primary" />
              </div>

              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold text-xl border-4 border-white/20">
                    {currentUser.initials}
                  </div>
                </div>

                <div className="flex-1 space-y-2 mt-auto pt-16">
                  {/* Top Spender Badge */}
                  <div>
                    <Badge className="bg-yellow-500 text-black font-semibold px-2 py-1 text-xs">
                      <Crown className="h-3 w-3 mr-1" />
                      TOP SPENDER
                    </Badge>
                  </div>

                  {/* User Info */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">
                        {currentUser.username}
                      </span>
                      <CheckCircle className="h-4 w-4 text-blue-300" />
                    </div>
                    <p className="text-sm text-white/90">
                      {currentUser.handle}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-white">
                    <div className="flex items-center gap-1">
                      <span className="opacity-90">📧 SUBS</span>
                      <span className="font-bold">
                        {currentUser.subscriptions}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="opacity-90">💰 SPENT</span>
                      <span className="font-bold">{currentUser.spent}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>{" "}
        {/* Carousel Indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-30">
          {users.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentUserIndex(index);
                setSliding(true);
                setSlideDirection(index < currentUserIndex ? "left" : "right");
                setTimeout(() => setSliding(false), 300);
              }}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer hover:opacity-100 ${
                index === currentUserIndex
                  ? "w-8 bg-white"
                  : "w-2 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
