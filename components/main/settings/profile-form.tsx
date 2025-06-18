"use client";

import React from "react";
import { User } from "@/types/user";
import ProfileImageUpload from "./profile-image-upload";
import ProfileDetailsForm from "./profile-details-form";

type ProfileFormProps = {
  user?: User;
};

const ProfileForm = ({ user }: ProfileFormProps) => {
  return (
    <>
      <ProfileImageUpload user={user} />
      <ProfileDetailsForm user={user} />
    </>
  );
};

export default ProfileForm;
