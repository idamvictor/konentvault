import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function RightPanel() {
  return (
    <div className="p-4 space-y-4 h-full overflow-y-auto bg-muted">
      <Card>
        <CardContent className="p-4">
          <div className="text-center">
            <h4 className="font-semibold text-foreground mb-2">SUBSCRIPTION</h4>
            <Button variant="default" size="lg" className="w-full">
              SUBSCRIBE FOR FREE
            </Button>
            <Separator className="my-4" />
            <div className="flex justify-center space-x-4 text-sm text-muted-foreground">
              <span className="hover:text-foreground cursor-pointer transition-colors">
                Privacy
              </span>
              <span className="hover:text-foreground cursor-pointer transition-colors">
                Cookie Notice
              </span>
              <span className="hover:text-foreground cursor-pointer transition-colors">
                Terms of Service
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
