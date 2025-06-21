import React from "react";

import { User } from "@/types/user";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { identityVerificationFormSchema } from "@/schema/account";
import { z } from "zod";
import { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countries, documentTypes } from "@/constants";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CreatorDocumentUpload from "./CreatorDocumentUpload";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { verifyCreatorAccount } from "@/services/user/user-services";
import { Loader2 } from "lucide-react";

interface CreatorAccountFormProps {
  user: User;
}

const CreatorAccountForm = ({ user }: CreatorAccountFormProps) => {
  // 	First name
  // Middle name
  // last name
  // Country
  // State/Province
  // Address
  // City
  // Zip/Postal code
  // Instagram
  // X(Twitter)
  // Date of birth
  // Document Type -- passport, ID card, driver's license
  // PHOTO OF YOUR ID -- upload
  // PHOTO OF HOLDING YOUR ID  --- Please upload a photo holding your ID (i.e. a selfie, ensuring your face is visible)
  // VIDEO OF YOU HOLD A CLEAN PAPER WITH TODAYS DATE IN THE FORMAT DD/MM/YYYY --- Please upload a video holding a clean paper with today's date on it (i.e. a selfie, ensuring your face is visible)

  // 	firstName:Pascal
  // middleName:Nonso
  // lastName:Cosmas
  // country:Nigeria
  // state:Lagos
  // address:1234 Main St
  // city:Ikeja
  // zipCode:100001
  // instagram:@johndoe
  // twitter:@doe_x
  // dateOfBirth:1995-06-15
  // documentType:ID card
  const queryClient = useQueryClient();

  const [loading, setLoading] = React.useState(false);
  const [documentPhotoFront, setDocumentPhotoFront] =
    React.useState<File | null>(null);
  const [documentPhotoBack, setDocumentPhotoBack] = React.useState<File | null>(
    null
  );
  const [selfieWithIdPhoto, setSelfieWithIdPhoto] = React.useState<File | null>(
    null
  );
  const [videoWithDatePhoto, setVideoWithDatePhoto] =
    React.useState<File | null>(null);

  const fullName = user.name?.trim() || "";
  const nameParts = fullName.split(" ");

  // Fallback to individual fields if they exist, or extract from `name`
  const firstName = nameParts[0] || "";
  const middleName = nameParts.length === 3 ? nameParts[1] : "";
  const lastName = nameParts[nameParts.length - 1] || "";

  const form = useForm<z.infer<typeof identityVerificationFormSchema>>({
    resolver: zodResolver(identityVerificationFormSchema),
    defaultValues: {
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      country: user.country,
      instagram: user.instagram,
      xTwitter: user.xTwitter,
      dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth) : undefined,
      documentType: user.documentType,
    },
  });

  const onSubmit = async (
    values: z.infer<typeof identityVerificationFormSchema>
  ) => {
    console.log("values", values);
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("firstName", values.firstName);
      formData.append("middleName", values.middleName || "");
      formData.append("lastName", values.lastName);
      formData.append("country", values.country);
      formData.append("instagram", values.instagram || "");
      formData.append("xTwitter", values.xTwitter || "");
      formData.append("dateOfBirth", values.dateOfBirth?.toISOString() || "");
      formData.append("documentType", values.documentType);
      if (documentPhotoFront) {
        formData.append("documentPhotoFront", documentPhotoFront);
      }
      if (documentPhotoBack) {
        formData.append("documentPhotoBack", documentPhotoBack);
      }
      if (selfieWithIdPhoto) {
        formData.append("selfieWithID", selfieWithIdPhoto);
      }
      if (videoWithDatePhoto) {
        formData.append("verificationVideo", videoWithDatePhoto);
      }
      const { message } = await verifyCreatorAccount(formData);
      toast.success(message);
      queryClient.invalidateQueries({
        queryKey: ["userProfile"],
        exact: false,
      });
    } catch (error) {
      console.error("error", error);
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message ||
            error.message ||
            "An error occurred during verification"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <div className="flex flex-col border-b border-border pb-4 mb-6 space-y-4">
          <h3 className="text-sm sm:text-base uppercase font-medium text-muted-foreground">
            Personal Information
          </h3>
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Enter your first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="middleName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Enter your middle name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Enter your last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>{field.value || "country"}</SelectTrigger>
                  <SelectContent>
                    {countries.map(({ label, value }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Removed: state, address, city, zipCode fields */}

          <FormField
            control={form.control}
            name="instagram"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Instagram" {...field} />
                </FormControl>
                <FormDescription>
                  This information will not be shown on your public profile
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="xTwitter"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Twitter (X)" {...field} />
                </FormControl>
                <FormDescription>
                  This information will not be shown on your public profile
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* date of birth */}

          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem className="border-border-lg shadow border-2 rounded">
                <DatePicker
                  showIcon // Show calendar icon
                  selected={field.value} // Use field.value as the selected date
                  onChange={(date: Date | null) => field.onChange(date)} // Update form state
                  onBlur={field.onBlur} // Trigger blur for validation
                  name={field.name} // Pass name for form control
                  ref={field.ref} // Pass ref for focus management (if needed)
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col border-b border-border pb-4 mb-6 space-y-4">
          <h3 className="text-sm sm:text-base uppercase font-medium text-muted-foreground">
            Documents Information
          </h3>

          <FormField
            control={form.control}
            name="documentType"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Document Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {documentTypes.map(({ value, label }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 gap-4">
            <CreatorDocumentUpload
              title="PHOTO OF YOUR FRONT ID"
              subtitle="Please upload a photo of your picture ID Document (i.e. Passport)"
              description="Clearly shows ID document fully in frame, in colour, with text clearly visible and minimum background. The image should not be edited, resized or rotated. The file must be .png or .jpg under 7MB in size. Any ID uploaded must also be valid in date."
              onFilesSelected={(files) => {
                if (files.length > 0) {
                  setDocumentPhotoFront(files[0]);
                }
              }}
            />

            <CreatorDocumentUpload
              title="PHOTO OF YOUR BACK ID"
              subtitle="Please upload a photo of your picture ID Document (i.e. Passport)"
              description="Clearly shows ID document fully in frame, in colour, with text clearly visible and minimum background. The image should not be edited, resized or rotated. The file must be .png or .jpg under 7MB in size. Any ID uploaded must also be valid in date."
              onFilesSelected={(files) => {
                if (files.length > 0) {
                  setDocumentPhotoBack(files[0]);
                }
              }}
            />
            {/* selfieWithID */}
            <CreatorDocumentUpload
              title="SELFIE WITH ID"
              subtitle="Please upload a photo holding your ID (i.e. a selfie, ensuring your face is clearly visible)"
              description="As well as clear image of the uploaded ID, a facial verification image is also required in order to accurately verify the identity of a user."
              onFilesSelected={(files) => {
                if (files.length > 0) {
                  setSelfieWithIdPhoto(files[0]);
                }
              }}
            />

            {/* verificationVideo */}
            <CreatorDocumentUpload
              title="VIDEO OF YOU HOLDING A CLEAN PAPER WITH TODAY'S DATE"
              subtitle="Please upload a photo holding your ID (i.e. a selfie, ensuring your face is clearly visible)"
              description="As well as clear image of the uploaded ID, a facial verification image is also required in order to accurately verify the identity of a user."
              onFilesSelected={(files) => {
                if (files.length > 0) {
                  setVideoWithDatePhoto(files[0]);
                }
              }}
            />
          </div>
        </div>
        <Button
          type="submit"
          onClick={() => form.trigger()}
          disabled={loading}
          className="px-6 flex justify-end bg-primary gap-1 rounded-2xl hover:opacity-70 hover:bg-primary"
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Profile
        </Button>
      </form>
    </Form>
  );
};

export default CreatorAccountForm;
