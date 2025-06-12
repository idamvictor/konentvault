"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/auth-context";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    userType: "fan" as const,
  });

  const { register } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await register(formData);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

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
            Join Konentvault to support
            <br />
            your favorite creators
          </h2>
        </div>
      </div>

      {/* Right side - Sign Up Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-semibold text-foreground mb-8">
              Sign up for Konentvault
            </h2>
          </div>

          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <Input
              name="name"
              placeholder="Full Name"
              type="text"
              className="h-12"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <Input
              name="email"
              placeholder="Email"
              type="email"
              className="h-12"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <div className="relative">
              <Input
                name="password"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                className="h-12 pr-10"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
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

            <Button type="submit" className="w-full h-12" disabled={loading}>
              {loading ? "SIGNING UP..." : "SIGN UP"}
            </Button>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>
              By signing up for Konentvault, you agree to our{" "}
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

          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-primary hover:underline">
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
