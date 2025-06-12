"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/auth-context";
import { cn } from "@/lib/utils";
import { AuthError } from "@/lib/errors";

interface FanFormData {
  name: string;
  email: string;
  password: string;
  userType: "fan";
}

interface CreatorFormData {
  name: string;
  username: string;
  email: string;
  phone: string;
  country: string;
  gender: string;
  dateOfBirth: string;
  password: string;
  userType: "creator";
}

type FormData = FanFormData | CreatorFormData;

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    userType: "fan",
  });

  const { register } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Clear field-specific error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleUserTypeChange = (value: "fan" | "creator") => {
    if (value === "fan") {
      setFormData({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        userType: "fan",
      });
    } else {
      setFormData({
        name: formData.name,
        username: "", // Default username for creator
        email: formData.email,
        phone: "", // Default phone number for creator
        country: "",
        gender: "",
        dateOfBirth: "", // Default date of birth for creator
        password: formData.password,
        userType: "creator",
      });
    }
    setError("");
    setFieldErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setFieldErrors({});

    try {
      await register(formData);
    } catch (error) {
      if (error instanceof AuthError) {
        setError(error.message); // Or however you're managing error state
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

          <Tabs
            defaultValue="fan"
            onValueChange={(value) =>
              handleUserTypeChange(value as "fan" | "creator")
            }
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="fan">Fan</TabsTrigger>
              <TabsTrigger value="creator">Creator</TabsTrigger>
            </TabsList>

            <TabsContent value="fan" className="space-y-4">
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
            </TabsContent>

            <TabsContent value="creator" className="space-y-4">
              <Input
                name="name"
                placeholder="Full Name"
                type="text"
                className="h-12"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <div className="space-y-1">
                <Input
                  name="username"
                  placeholder="Username (letters and numbers only)"
                  type="text"
                  className={cn(
                    "h-12",
                    fieldErrors.username &&
                      "border-red-500 focus-visible:ring-red-200"
                  )}
                  value={
                    formData.userType === "creator" ? formData.username : ""
                  }
                  onChange={handleChange}
                  pattern="^[a-zA-Z0-9]+$"
                  required
                  aria-invalid={!!fieldErrors.username}
                />
                {fieldErrors.username && (
                  <p className="text-sm text-red-500 px-1">
                    {fieldErrors.username}
                  </p>
                )}
              </div>

              <Input
                name="email"
                placeholder="Email"
                type="email"
                className="h-12"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <Input
                name="phone"
                placeholder="Phone Number"
                type="tel"
                className="h-12"
                value={formData.userType === "creator" ? formData.phone : ""}
                onChange={handleChange}
                required
              />

              <Input
                name="country"
                placeholder="Country"
                type="text"
                className="h-12"
                value={formData.userType === "creator" ? formData.country : ""}
                onChange={handleChange}
                required
              />

              <Input
                name="gender"
                placeholder="Gender"
                type="text"
                className="h-12"
                value={formData.userType === "creator" ? formData.gender : ""}
                onChange={handleChange}
                required
              />

              <Input
                name="dateOfBirth"
                placeholder="Date of Birth"
                type="date"
                className="h-12"
                value={
                  formData.userType === "creator" ? formData.dateOfBirth : ""
                }
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
            </TabsContent>
          </Tabs>

          <Button
            type="submit"
            className="w-full h-12"
            disabled={loading}
            onClick={() => {}}
          >
            {loading ? "SIGNING UP..." : "SIGN UP"}
          </Button>

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
