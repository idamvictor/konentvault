"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

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

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-semibold text-foreground mb-8">
              Log in
            </h2>
          </div>

          <div className="space-y-4">
            <Input placeholder="Email" type="email" className="h-12" />

            <div className="relative">
              <Input
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                className="h-12 pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>

            <Button type="button" className="w-full h-12">
              LOG IN
            </Button>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>
              By logging in and using Konentvault, you agree to our{" "}
              <Link href="#" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-primary hover:underline">
                Privacy Policy
              </Link>
              , and confirm that you are at least 18 years old.
            </p>
          </div>

          <div className="flex justify-center gap-4 text-sm">
            <Link
              href="/auth/forgot-password"
              className="text-primary hover:underline"
            >
              Forgot password?
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/auth/signup" className="text-primary hover:underline">
              Sign up for Konentvault
            </Link>
          </div>

          <div className="space-y-3">
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-primary-foreground"
            >
              <span className="mr-2 font-bold">𝕏</span>
              SIGN IN WITH X
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full h-12 bg-[#4285F4] hover:bg-[#3367D6] text-primary-foreground"
            >
              <span className="mr-2">G</span>
              SIGN IN WITH GOOGLE
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full h-12 bg-secondary hover:bg-secondary/90 text-secondary-foreground"
            >
              <span className="mr-2">🔑</span>
              PASSWORDLESS SIGN IN
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
