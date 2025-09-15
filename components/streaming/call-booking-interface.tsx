"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Users, Clock, DollarSign, Shield, Star } from "lucide-react";
import Image from "next/image";

interface Participant {
  id: string;
  name: string;
  //   role: string;
  avatar: string;
}

const availableParticipants: Participant[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    // role: "Senior Consultant",
    avatar:
      "https://res.cloudinary.com/dyp8gtllq/image/upload/v1737075755/cld-sample.jpg",
  },
  {
    id: "2",
    name: "Michael Chen",
    // role: "Technical Expert",
    avatar:
      "https://res.cloudinary.com/dyp8gtllq/image/upload/v1737075755/cld-sample.jpg",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    // role: "Project Manager",
    avatar:
      "https://res.cloudinary.com/dyp8gtllq/image/upload/v1737075755/cld-sample.jpg",
  },
  {
    id: "4",
    name: "David Kim",
    // role: "Strategy Advisor",
    avatar:
      "https://res.cloudinary.com/dyp8gtllq/image/upload/v1737075755/cld-sample.jpg",
  },
  {
    id: "5",
    name: "Lisa Thompson",
    // role: "Industry Specialist",
    avatar:
      "https://res.cloudinary.com/dyp8gtllq/image/upload/v1737075755/cld-sample.jpg",
  },
];

interface CallBookingInterfaceProps {
  onBookingComplete?: () => void;
}

export function CallBookingInterface({
  onBookingComplete,
}: CallBookingInterfaceProps) {
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>(
    []
  );
  const [duration, setDuration] = useState<number>(30);
  const [durationUnit, setDurationUnit] = useState<"minutes" | "hours">(
    "minutes"
  );
  const [totalCost, setTotalCost] = useState<number>(0);

  // Pricing configuration
  const baseRatePerMinute = 2.5; // $2.50 per minute per participant
  const discountThreshold = 3; // 10% discount for 3+ participants
  const discountRate = 0.1;

  useEffect(() => {
    const durationInMinutes =
      durationUnit === "hours" ? duration * 60 : duration;
    const baseCost =
      selectedParticipants.length * durationInMinutes * baseRatePerMinute;
    const discount =
      selectedParticipants.length >= discountThreshold
        ? baseCost * discountRate
        : 0;
    setTotalCost(baseCost - discount);
  }, [selectedParticipants, duration, durationUnit]);

  const toggleParticipant = (participantId: string) => {
    setSelectedParticipants((prev) =>
      prev.includes(participantId)
        ? prev.filter((id) => id !== participantId)
        : [...prev, participantId]
    );
  };

  const handlePayment = () => {
    // Handle payment logic here (to be implemented)

    // Call the completion callback if provided
    if (onBookingComplete) {
      onBookingComplete();
    }
  };

  const selectedParticipantData = availableParticipants.filter((p) =>
    selectedParticipants.includes(p.id)
  );

  return (
    <div className="grid gap-6 md:grid-cols-2 text-white">
      {/* Left Column - Configuration */}
      <div className="space-y-6">
        {/* Participant Selection */}
        <Card className="border-none bg-dark-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Users className="h-5 w-5 text-primary" />
              Select Participants
            </CardTitle>
            <CardDescription className="text-sky-2">
              Choose the experts you&apos;d like to include in your call
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              {availableParticipants.map((participant) => (
                <div
                  key={participant.id}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                    selectedParticipants.includes(participant.id)
                      ? "bg-blue-1 text-white"
                      : "bg-dark-1 text-sky-2 hover:bg-dark-2"
                  }`}
                  onClick={() => toggleParticipant(participant.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleParticipant(participant.id);
                    }
                  }}
                  aria-pressed={selectedParticipants.includes(participant.id)}
                >
                  <Image
                    src={participant.avatar || "/placeholder.svg"}
                    alt={`${participant.name} avatar`}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover"
                    unoptimized={participant.avatar.startsWith(
                      "/placeholder.svg"
                    )}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-white truncate">
                      {participant.name}
                    </p>
                    {/* <p className="text-xs text-muted-foreground truncate">
                      {participant.role}
                    </p> */}
                  </div>
                  {selectedParticipants.includes(participant.id) && (
                    <Badge
                      variant="secondary"
                      className="bg-primary text-primary-foreground"
                    >
                      Selected
                    </Badge>
                  )}
                </div>
              ))}
            </div>
            {selectedParticipants.length >= discountThreshold && (
              <div className="flex items-center gap-2 p-3 bg-accent/10 rounded-lg border border-accent/20">
                <Star className="h-4 w-4 text-accent" />
                <span className="text-sm text-accent font-medium">
                  10% discount applied for 3+ participants!
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Duration Input */}
        <Card className="border-none bg-dark-3 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Clock className="h-5 w-5 text-primary" />
              Call Duration
            </CardTitle>
            <CardDescription className="text-sky-2">
              Specify how long you&apos;d like the call to be
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-1">
                <Label htmlFor="duration" className="sr-only">
                  Duration
                </Label>
                <Input
                  id="duration"
                  type="number"
                  min="1"
                  max={durationUnit === "hours" ? 8 : 480}
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="text-center border-none bg-dark-1 focus-visible:ring-0 focus-visible:ring-offset-0"
                  aria-describedby="duration-help"
                />
              </div>
              <Select
                value={durationUnit}
                onValueChange={(value: "minutes" | "hours") =>
                  setDurationUnit(value)
                }
              >
                <SelectTrigger className="w-32 border-none bg-dark-1 focus:ring-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-dark-1 border-none">
                  <SelectItem value="minutes" className="hover:bg-dark-3">
                    Minutes
                  </SelectItem>
                  <SelectItem value="hours" className="hover:bg-dark-3">
                    Hours
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p id="duration-help" className="text-xs text-muted-foreground">
              Minimum 1 {durationUnit.slice(0, -1)}, maximum{" "}
              {durationUnit === "hours" ? "8 hours" : "480 minutes"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Right Column - Summary & Payment */}
      <div className="space-y-6">
        {/* Cost Summary */}
        <Card className="border-none bg-dark-3 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <DollarSign className="h-5 w-5 text-primary" />
              Cost Summary
            </CardTitle>
            <CardDescription className="text-sky-2">
              Real-time pricing based on your selections
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedParticipants.length > 0 ? (
              <>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Participants:</span>
                    <span className="font-medium">
                      {selectedParticipants.length}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium">
                      {duration} {durationUnit}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Rate:</span>
                    <span className="font-medium">
                      ${baseRatePerMinute}/min per participant
                    </span>
                  </div>
                  {selectedParticipants.length >= discountThreshold && (
                    <div className="flex justify-between text-sm text-accent">
                      <span>Discount (10%):</span>
                      <span className="font-medium">
                        -$
                        {(
                          selectedParticipants.length *
                          (durationUnit === "hours"
                            ? duration * 60
                            : duration) *
                          baseRatePerMinute *
                          discountRate
                        ).toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total Cost:</span>
                  <span className="text-2xl font-bold text-primary">
                    ${totalCost.toFixed(2)}
                  </span>
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Select participants to see pricing</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Selected Participants Preview */}
        {selectedParticipantData.length > 0 && (
          <Card className="border-none bg-dark-3 text-white">
            <CardHeader>
              <CardTitle className="text-lg">Your Call Team</CardTitle>
              <CardDescription>
                Participants selected for your call
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {selectedParticipantData.map((participant) => (
                  <div key={participant.id} className="flex items-center gap-3">
                    <Image
                      src={participant.avatar || "/placeholder.svg"}
                      alt={`${participant.name} avatar`}
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded-full object-cover"
                      unoptimized={participant.avatar.startsWith(
                        "/placeholder.svg"
                      )}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate text-white">
                        {participant.name}
                      </p>
                      {/* <p className="text-xs text-muted-foreground truncate">
                        {participant.role}
                      </p> */}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Trust Signals */}
        <Card className="border-accent/20 bg-accent/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="h-5 w-5 text-accent" />
              <span className="font-medium text-accent">Secure & Trusted</span>
            </div>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 256-bit SSL encryption</li>
              <li>• 99.9% uptime guarantee</li>
              <li>• Money-back guarantee</li>
            </ul>
          </CardContent>
        </Card>

        {/* Payment Button */}
        <Button
          onClick={handlePayment}
          disabled={selectedParticipants.length === 0 || duration <= 0}
          className="w-full h-12 text-lg font-semibold bg-blue-1 hover:bg-blue-1/90 text-white"
          size="lg"
        >
          {selectedParticipants.length === 0
            ? "Select Participants to Continue"
            : `Pay $${totalCost.toFixed(2)} & Book Call`}
        </Button>
      </div>
    </div>
  );
}
