export interface UpdatePostData {
  content: string;
  payType: "free" | "ppv" | "subscription";
  price: number;
}
