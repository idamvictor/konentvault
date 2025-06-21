"use client";
// import DocumentUploadForm from '@/components/forms/DocumentUploadForm';

import CreatorAccountForm from "../../../../components/main/settings/id-verification/CreatorAccountForm";
import { useUserProfile } from "@/hooks/useUserProfile";

const IdentityVerification = () => {
  const { user, error } = useUserProfile();

  return (
    <>
      <div className="pt-4 sticky top-0 w-full bg-background border-b border-border z-10">
        <div className="px-4">
          <h3 className="text-sm sm:text-base uppercase font-medium text-foreground mb-4">
            Upgrade your account
          </h3>
        </div>
      </div>

      <div className="px-4 mt-4">
        <p className="text-sm sm:text-base text-foreground mb-4">
          To unlock all features, please verify your identity by uploading a
          government-issued ID and a selfie.
        </p>
        {/* documentUploadForm */}
        {/* <DocumentUploadForm/> */}
        {error && (
          <p className="text-sm sm:text-base text-red-500">
            Error: {(error as Error).message}
          </p>
        )}

        {user && <CreatorAccountForm user={user} />}
      </div>
    </>
  );
};

export default IdentityVerification;
