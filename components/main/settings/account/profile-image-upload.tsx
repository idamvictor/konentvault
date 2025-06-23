"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Loader2 } from "lucide-react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  uploadCoverImage,
  uploadProfileImage,
} from "@/services/user/user-services";
import { User } from "@/types/user";

interface FileWithPreview extends File {
  preview: string;
}

type ProfileImageUploadProps = {
  user?: User;
};

const ProfileImageUpload = ({ user }: ProfileImageUploadProps) => {
  const queryClient = useQueryClient();

  const [loadingImage, setLoadingImage] = useState(false);
  const [loadingCoverImage, setLoadingCoverImage] = useState(false);
  const [profileFiles, setProfileFiles] = useState<FileWithPreview[]>([]);
  const [coverFiles, setCoverFiles] = useState<FileWithPreview[]>([]);

  const profileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const {
    getRootProps: getProfileRootProps,
    getInputProps: getProfileInputProps,
  } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => {
      setProfileFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      );
      if (profileInputRef.current) {
        const dataTransfer = new DataTransfer();
        acceptedFiles.forEach((v) => dataTransfer.items.add(v));
        profileInputRef.current.files = dataTransfer.files;
      }
    },
  });

  const { getRootProps: getCoverRootProps, getInputProps: getCoverInputProps } =
    useDropzone({
      accept: { "image/*": [] },
      onDrop: (acceptedFiles) => {
        setCoverFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
          )
        );
        if (coverInputRef.current) {
          const dataTransfer = new DataTransfer();
          acceptedFiles.forEach((v) => dataTransfer.items.add(v));
          coverInputRef.current.files = dataTransfer.files;
        }
      },
    });

  const profileThumbs = profileFiles.map((file) => (
    <Image
      key={file.name}
      className="object-cover object-center h-28 w-28 rounded-full"
      src={file.preview}
      alt="Profile preview"
      width={112}
      height={112}
      onLoad={() => URL.revokeObjectURL(file.preview)}
    />
  ));

  const coverThumbs = coverFiles.map((file) => (
    <Image
      key={file.name}
      className="object-cover object-top w-full h-32"
      src={file.preview}
      alt="Cover preview"
      width={400}
      height={128}
      onLoad={() => URL.revokeObjectURL(file.preview)}
    />
  ));

  useEffect(() => {
    return () => {
      profileFiles.forEach((file) => URL.revokeObjectURL(file.preview));
      coverFiles.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [profileFiles, coverFiles]);

  const handleProfilePictureUpload = async () => {
    const formData = new FormData();
    formData.append("profilePicture", profileFiles[0]);

    try {
      setLoadingImage(true);
      const { message } = await uploadProfileImage(formData);
      toast.success(message);
      queryClient.invalidateQueries({
        queryKey: ["userProfile"],
        exact: false,
      });
    } catch (error) {
      const newError =
        error instanceof Error
          ? error
          : new Error("An unexpected error occurred");
      console.log("error", error);
      toast.error(newError.message || "Failed to upload profile picture");
    } finally {
      setLoadingImage(false);
    }
  };

  const handleCoverPictureUpload = async () => {
    const formData = new FormData();
    formData.append("coverImage", coverFiles[0]);

    try {
      setLoadingCoverImage(true);
      const { message } = await uploadCoverImage(formData);
      toast.success(message);
      queryClient.invalidateQueries({
        queryKey: ["userProfile"],
        exact: false,
      });
    } catch (error) {
      const newError =
        error instanceof Error
          ? error
          : new Error("An unexpected error occurred");
      console.log("error", error);
      toast.error(newError.message || "Failed to upload cover image");
    } finally {
      setLoadingCoverImage(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 justify-center w-full relative">
      {/* Cover Picture Section */}
      <div className="h-52 overflow-hidden w-full relative">
        {coverFiles.length > 0 ? (
          coverThumbs
        ) : user?.coverImage ? (
          <Image
            src={`https://sp.konentvault.net.ng/${user?.coverImage}`}
            alt="User cover"
            width={400}
            height={128}
            className="object-cover object-top w-full"
          />
        ) : (
          <Image
            className="object-cover object-top w-full"
            src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
            alt="Default cover"
            width={400}
            height={128}
            layout="responsive"
            priority
          />
        )}
        <div
          {...getCoverRootProps({
            className:
              "dropzone bg-primary p-2 opacity-60 rounded-full flex justify-center items-center cursor-pointer absolute right-2 top-2",
          })}
        >
          <input {...getCoverInputProps()} />
          <Camera className="w-6 h-6" color="#fff" />
          <input
            type="hidden"
            name="coverImage"
            required
            style={{ opacity: 0 }}
            ref={coverInputRef}
          />
        </div>
      </div>

      {/* Profile Picture Section */}
      <div className="flex px-4 gap-1 items-start justify-start relative w-fit -top-16 mb-4">
        <div className="w-28 h-28 absolute border-2 border-muted-foreground overflow-hidden rounded-full bg-gray-50">
          {profileThumbs.length > 0 ? (
            profileThumbs
          ) : user?.profilePicture ? (
            <Image
              src={`https://sp.konentvault.net.ng/${user?.profilePicture}`}
              alt="User profile"
              width={112}
              height={112}
              className="object-cover object-center h-28 w-28 rounded-full"
            />
          ) : (
            <div className="w-full h-full absolute right-0 top-10 flex items-center justify-center">
              <Camera className="w-8 h-8 text-gray-400" />
            </div>
          )}
        </div>
        <div
          {...getProfileRootProps({
            className:
              "dropzone bg-primary p-2 opacity-60 rounded-full flex justify-center items-center cursor-pointer absolute left-[105px] top-10",
          })}
        >
          <input {...getProfileInputProps()} />
          <Camera className="w-6 h-6" color="#fff" />
          <input
            type="hidden"
            name="profilePicture"
            required
            style={{ opacity: 0 }}
            ref={profileInputRef}
          />
        </div>
      </div>

      {/* Upload Buttons */}
      <div className="flex gap-2 absolute right-[20px] -bottom-[10px]">
        {profileFiles.length > 0 && (
          <Button
            type="button"
            className="w-fit mt-4 text-xs border-primary"
            disabled={loadingImage}
            variant="outline"
            size="sm"
            onClick={handleProfilePictureUpload}
          >
            {loadingImage ? (
              <Loader2 className="animate-spin mr-2" />
            ) : (
              "Upload Profile"
            )}
          </Button>
        )}
        {coverFiles.length > 0 && (
          <Button
            type="button"
            className="w-fit mt-4 border-primary text-xs"
            disabled={loadingCoverImage}
            variant="outline"
            size="sm"
            onClick={handleCoverPictureUpload}
          >
            {loadingCoverImage ? (
              <Loader2 className="animate-spin mr-2" />
            ) : (
              "Upload Cover"
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProfileImageUpload;
