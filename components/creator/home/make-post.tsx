import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ImageIcon, Link2Icon, SmileIcon } from "lucide-react";

export function MakePost() {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <Input
              type="text"
              placeholder="Create a post..."
              className="rounded-xl"
            />
          </div>
          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground"
              >
                <ImageIcon className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground"
              >
                <Link2Icon className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground"
              >
                <SmileIcon className="h-5 w-5" />
              </Button>
            </div>
            <Button>Post</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
