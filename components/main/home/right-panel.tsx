// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";

// export default function RightPanel() {
//   return (
//     <div className="p-4 space-y-4 h-full overflow-y-auto bg-muted">
//       <Card>
//         <CardContent className="p-4">
//           <div className="text-center">
//             <h4 className="font-semibold text-foreground mb-2">SUBSCRIPTION</h4>
//             <Button variant="default" size="lg" className="w-full">
//               SUBSCRIBE FOR FREE
//             </Button>
//             <Separator className="my-4" />
//             <div className="flex justify-center space-x-4 text-sm text-muted-foreground">
//               <span className="hover:text-foreground cursor-pointer transition-colors">
//                 Privacy
//               </span>
//               <span className="hover:text-foreground cursor-pointer transition-colors">
//                 Cookie Notice
//               </span>
//               <span className="hover:text-foreground cursor-pointer transition-colors">
//                 Terms of Service
//               </span>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

import {
  Search,
  Shuffle,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SuggestionCard } from "./right-panel/suggestion-card";
import { Separator } from "@/components/ui/separator";

const suggestions = [
  {
    name: "Hot Bebesita",
    username: "@bebesitard",
    avatar: "/placeholder.svg?height=60&width=60",
    coverImage:
      "https://res.cloudinary.com/dyp8gtllq/image/upload/v1739221358/e89ddd0960eee5c57ba98da220fd9ea5_mgyvdv.jpg",
    badge: "🔥",
  },
  {
    name: "Free",
    username: "@thegreenevedbabe",
    avatar: "/placeholder.svg?height=60&width=60",
    coverImage:
      "https://res.cloudinary.com/dyp8gtllq/image/upload/v1739222053/Mothers_20and_20their_20children_20_20at_20ANC_20clinic_20in_20Homa_20Bay_i25atg.jpg",
    badge: "💚",
  },
  {
    name: "CagedWorm",
    username: "@cagedworm",
    avatar: "/placeholder.svg?height=60&width=60",
    coverImage:
      "https://res.cloudinary.com/dyp8gtllq/image/upload/v1739221358/e89ddd0960eee5c57ba98da220fd9ea5_mgyvdv.jpg",
    badge: "Free",
  },
];

const expiredSubscriptions = [
  {
    name: "trippie bri",
    username: "@trippie_bri",
    avatar: "/placeholder.svg?height=60&width=60",
    coverImage:
      "https://res.cloudinary.com/dyp8gtllq/image/upload/v1739222053/Mothers_20and_20their_20children_20_20at_20ANC_20clinic_20in_20Homa_20Bay_i25atg.jpg",
  },
  {
    name: "Luna Star",
    username: "@lunastar_22",
    avatar: "/placeholder.svg?height=60&width=60",
    coverImage:
      "https://res.cloudinary.com/dyp8gtllq/image/upload/v1739221358/e89ddd0960eee5c57ba98da220fd9ea5_mgyvdv.jpg",
  },
  {
    name: "Dark Angel",
    username: "@dark_angel",
    avatar: "/placeholder.svg?height=60&width=60",
    coverImage:
      "https://res.cloudinary.com/dyp8gtllq/image/upload/v1739222053/Mothers_20and_20their_20children_20_20at_20ANC_20clinic_20in_20Homa_20Bay_i25atg.jpg",
  },
];

export default function RightPanel() {
  return (
    <aside className="w-80 p-4 space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search users or posts" className="pl-10" />
      </div>

      {/* Suggestions */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            SUGGESTIONS
          </h2>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <Shuffle className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <RefreshCw className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <ChevronLeft className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <ChevronRight className="h-3 w-3" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          {suggestions.map((suggestion, index) => (
            <SuggestionCard key={index} suggestion={suggestion} />
          ))}
        </div>
      </div>

      <Separator />

      {/* Expired Subscriptions */}
      <div className="space-y-3">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          EXPIRED SUBSCRIPTIONS
        </h2>

        <div className="space-y-2">
          {expiredSubscriptions.map((subscription, index) => (
            <SuggestionCard key={index} suggestion={subscription} />
          ))}
        </div>
      </div>
    </aside>
  );
}
