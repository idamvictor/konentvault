"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex">
        {/* Left side - Background */}
        <div
          className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary to-primary relative overflow-hidden"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/90 to-primary/90" />
          <div className="relative z-10 flex flex-col justify-center items-start p-12 text-primary-foreground">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 bg-card rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-lg">K</span>
              </div>
              <h1 className="text-3xl font-bold">Konentvault</h1>
            </div>
            <h2 className="text-4xl font-bold leading-tight">
              Sign up to support your
              <br />
              favorite creators
            </h2>
          </div>
        </div>

        {/* Right side - Success Message */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-6 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="w-8 h-8 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-foreground">
                Check your email
              </h2>
              <p className="text-muted-foreground">
                We&apos;ve sent a password reset link to your email address.
                Please check your inbox and follow the instructions to reset
                your password.
              </p>
            </div>

            <div className="space-y-4">
              <Button
                onClick={() => setIsSubmitted(false)}
                variant="outline"
                className="w-full h-12"
              >
                Send another email
              </Button>

              <Link href="/auth/login">
                <Button className="w-full h-12" variant="secondary">
                  Back to login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Background */}
      <div
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary to-primary relative overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/90 to-primary/90" />
        <div className="relative z-10 flex flex-col justify-center items-start p-12 text-primary-foreground">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-card rounded-full flex items-center justify-center">
              <span className="text-primary font-bold text-lg">K</span>
            </div>
            <h1 className="text-3xl font-bold">Konentvault</h1>
          </div>
          <h2 className="text-4xl font-bold leading-tight">
            Sign up to support your
            <br />
            favorite creators
          </h2>
        </div>
      </div>

      {/* Right side - Forgot Password Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-4">
            <Link
              href="/auth/login"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to login
            </Link>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                Forgot your password?
              </h2>
              <p className="text-muted-foreground">
                Enter your email address and we&apos;ll send you a link to reset
                your password.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <Input placeholder="Email" type="email" className="h-12 w-full" />

            <Button
              type="button"
              className="w-full h-12"
              onClick={() => setIsSubmitted(true)}
            >
              Send reset link
            </Button>
          </div>
          <div className="text-center text-sm">
            <span className="text-muted-foreground">
              Remember your password?{" "}
            </span>
            <Link href="/auth/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
