import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function RightPanel() {
  return (
    <div className="p-4 space-y-4 h-full overflow-y-auto bg-gray-50">
      <Card>
        <CardContent className="p-4">
          <div className="text-center">
            <h4 className="font-semibold text-gray-700 mb-2">SUBSCRIPTION</h4>
            <Button
              variant="default"
              size="lg"
              className="w-full bg-[#0095F6] hover:bg-[#0095F6]/90"
            >
              SUBSCRIBE FOR FREE
            </Button>
            <Separator className="my-4" />
            <div className="flex justify-center space-x-4 text-sm text-gray-500">
              <span className="hover:text-gray-700 cursor-pointer">
                Privacy
              </span>
              <span className="hover:text-gray-700 cursor-pointer">
                Cookie Notice
              </span>
              <span className="hover:text-gray-700 cursor-pointer">
                Terms of Service
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
