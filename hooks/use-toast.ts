// Simple toast implementation for use-toast
// You can replace this with your own logic or a UI library

export type ToastOptions = {
  title: string;
  description?: string;
  variant?: "default" | "destructive";
};

export function toast({ title, description, variant }: ToastOptions) {
  // For now, just use alert as a placeholder
  // Replace with your own UI toast logic
  if (variant === "destructive") {
    alert(`❌ ${title}\n${description ?? ""}`);
  } else {
    alert(`${title}\n${description ?? ""}`);
  }
}
