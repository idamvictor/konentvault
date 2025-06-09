"use client";

import { useState } from "react";
import { Camera, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

interface ProfileData {
  displayName: string;
  username: string;
  phoneNumber: string;
  email: string;
  bio: string;
  socialMedia: {
    twitter: string;
    instagram: string;
    facebook: string;
  };
}

export function ProfileEditor() {
  const [profileData, setProfileData] = useState<ProfileData>({
    displayName: "Creator849214764",
    username: "zack25",
    phoneNumber: "8064037149",
    email: "zechara.honibei@yahoo.com",
    bio: "checking out things",
    socialMedia: {
      twitter: "",
      instagram: "",
      facebook: "zack",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSocialMediaChange = (
    platform: keyof ProfileData["socialMedia"],
    value: string
  ) => {
    setProfileData((prev) => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: value,
      },
    }));
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    // Handle success/error states here
  };

  const handleSaveSocialMedia = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    // Handle success/error states here
  };

  return (
    <div className="w-full mx-auto p-4 sm:p-6 lg:p-8">
      <Tabs defaultValue="edit-profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
          <TabsTrigger value="edit-profile" className="text-sm">
            Edit Profile
          </TabsTrigger>
          <TabsTrigger value="subscriptions" className="text-sm">
            Subscriptions
          </TabsTrigger>
          <TabsTrigger value="welcome-message" className="text-sm">
            Welcome Message
          </TabsTrigger>
          <TabsTrigger value="login-security" className="text-sm">
            Login & Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="edit-profile" className="space-y-8">
          <Card className="border-border">
            <CardContent className="p-0">
              {/* Banner Section */}
              <div className="relative h-48 sm:h-64 overflow-hidden rounded-t-lg">
                <Image
                  src="https://res.cloudinary.com/dyp8gtllq/image/upload/v1737075755/cld-sample.jpg"
                  alt="Profile banner with colorful geometric gradient"
                  fill
                  className="object-cover"
                  priority
                />
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute top-4 right-4 bg-background/80 hover:bg-background/90"
                  aria-label="Change banner image"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>

              {/* Profile Picture Section */}
              <div className="relative px-6 pb-6">
                <div className="relative -mt-16 sm:-mt-20">
                  <Avatar className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-background shadow-lg">
                    <AvatarImage src="/placeholder.svg" alt="Profile picture" />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-primary-foreground text-background text-xl sm:text-2xl">
                      U
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute bottom-0 right-0 rounded-full bg-background shadow-md hover:bg-secondary"
                    aria-label="Change profile picture"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>

                {/* Profile Form */}
                <div className="mt-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="displayName"
                        className="text-sm font-medium"
                      >
                        Display Name
                      </Label>
                      <Input
                        id="displayName"
                        value={profileData.displayName}
                        onChange={(e) =>
                          handleInputChange("displayName", e.target.value)
                        }
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="username" className="text-sm font-medium">
                        Username
                      </Label>
                      <Input
                        id="username"
                        value={profileData.username}
                        onChange={(e) =>
                          handleInputChange("username", e.target.value)
                        }
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="phoneNumber"
                        className="text-sm font-medium"
                      >
                        Phone Number
                      </Label>
                      <Input
                        id="phoneNumber"
                        type="tel"
                        value={profileData.phoneNumber}
                        onChange={(e) =>
                          handleInputChange("phoneNumber", e.target.value)
                        }
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email Address
                      </Label>
                      <div className="relative">
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          className="w-full pr-10"
                        />
                        <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-sm font-medium">
                      Bio <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      className="min-h-[120px] resize-none"
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button
                      onClick={handleSaveProfile}
                      disabled={isLoading}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
                    >
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Media Section */}
          <Card className="border-border">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-primary mb-6">
                Social Media
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="twitter" className="text-sm font-medium">
                    X (Formerly Twitter)
                  </Label>
                  <Input
                    id="twitter"
                    placeholder="Username or profile link"
                    value={profileData.socialMedia.twitter}
                    onChange={(e) =>
                      handleSocialMediaChange("twitter", e.target.value)
                    }
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instagram" className="text-sm font-medium">
                    Instagram
                  </Label>
                  <Input
                    id="instagram"
                    placeholder="Username or profile link"
                    value={profileData.socialMedia.instagram}
                    onChange={(e) =>
                      handleSocialMediaChange("instagram", e.target.value)
                    }
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="facebook" className="text-sm font-medium">
                    Facebook
                  </Label>
                  <Input
                    id="facebook"
                    placeholder="Username or profile link"
                    value={profileData.socialMedia.facebook}
                    onChange={(e) =>
                      handleSocialMediaChange("facebook", e.target.value)
                    }
                    className="w-full"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <Button
                  onClick={handleSaveSocialMedia}
                  disabled={isLoading}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
                >
                  {isLoading ? "Saving..." : "Save"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscriptions">
          <Card className="border-border">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Subscriptions</h2>
              <p className="text-muted-foreground">
                Subscription settings will be displayed here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="welcome-message">
          <Card className="border-border">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Welcome Message</h2>
              <p className="text-muted-foreground">
                Welcome message settings will be displayed here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="login-security">
          <Card className="border-border">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Login & Security</h2>
              <p className="text-muted-foreground">
                Login and security settings will be displayed here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
