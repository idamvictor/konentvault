import Image from "next/image";
import {
  Star,
  MessageSquare,
  DollarSign,
  Share2,
  Check,
  MoreVertical,
} from "lucide-react";

type User = {
  id: string;
  name: string;
  username: string;
  verified: boolean;
  profileImage: string;
  coverImage: string;
  subscribed: boolean;
  free: boolean;
  lastSeen?: string;
};

const users: User[] = [
  {
    id: "1",
    name: "Say",
    username: "sweetbutsavvy",
    verified: true,
    profileImage: "https://res.cloudinary.com/dyp8gtllq/image/upload/v1737506531/vco-LT_M58j9DIAxlS1Cv9uvzbRhB6cYIZJS7ocZksWRqoEPat_QXb6fVFi77lciJZQ_w526-h296-rw_lmkjh2.webp",
    coverImage: "https://res.cloudinary.com/dyp8gtllq/image/upload/v1737324222/1000_F_628005942_zF7vOoa3tTs6bQPPPNVdXivtqYXh78Um_dk0fv2.jpg",
    subscribed: true,
    free: true,
  },
  {
    id: "2",
    name: "Lu A",
    username: "lubecita",
    verified: true,
    profileImage: "https://res.cloudinary.com/dyp8gtllq/image/upload/v1737506531/vco-LT_M58j9DIAxlS1Cv9uvzbRhB6cYIZJS7ocZksWRqoEPat_QXb6fVFi77lciJZQ_w526-h296-rw_lmkjh2.webp",
    coverImage: "https://res.cloudinary.com/dyp8gtllq/image/upload/v1737324222/1000_F_628005942_zF7vOoa3tTs6bQPPPNVdXivtqYXh78Um_dk0fv2.jpg",
    subscribed: true,
    free: true,
    lastSeen: "Yesterday",
  },
  {
    id: "3",
    name: "Strangelove",
    username: "sexstrange",
    verified: true,
    profileImage: "https://res.cloudinary.com/dyp8gtllq/image/upload/v1737506531/vco-LT_M58j9DIAxlS1Cv9uvzbRhB6cYIZJS7ocZksWRqoEPat_QXb6fVFi77lciJZQ_w526-h296-rw_lmkjh2.webp",
    coverImage: "https://res.cloudinary.com/dyp8gtllq/image/upload/v1737324222/1000_F_628005942_zF7vOoa3tTs6bQPPPNVdXivtqYXh78Um_dk0fv2.jpg",
    subscribed: true,
    free: true,
  },
  {
    id: "4",
    name: "OnlyFans",
    username: "onlyfans",
    verified: true,
    profileImage: "https://res.cloudinary.com/dyp8gtllq/image/upload/v1737506531/vco-LT_M58j9DIAxlS1Cv9uvzbRhB6cYIZJS7ocZksWRqoEPat_QXb6fVFi77lciJZQ_w526-h296-rw_lmkjh2.webp",
    coverImage: "https://res.cloudinary.com/dyp8gtllq/image/upload/v1737324222/1000_F_628005942_zF7vOoa3tTs6bQPPPNVdXivtqYXh78Um_dk0fv2.jpg",
    subscribed: true,
    free: true,
  },
];

export default function UserGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}

function UserCard({ user }: { user: User }) {
  return (
    <div className="border rounded-md overflow-hidden">
      {/* Cover Image */}
      <div className="relative h-32">
        <Image
          src={user.coverImage || "/placeholder.svg"}
          alt={`${user.name}'s cover`}
          fill
          className="object-cover"
        />

        {/* Share Button */}
        <div className="absolute top-2 right-2 flex gap-2">
          <button className="bg-background/80 p-1 rounded-md">
            <Share2 className="h-5 w-5" />
          </button>
          <button className="bg-background/80 p-1 rounded-md">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>

        {/* Last Seen */}
        {user.lastSeen && (
          <div className="absolute top-2 right-16 bg-background/80 px-2 py-1 rounded-md text-xs">
            Seen {user.lastSeen}
          </div>
        )}
      </div>

      {/* Profile Content */}
      <div className="pt-10 px-4 pb-4 relative">
        {/* Profile Image */}
        <div className="absolute -top-10 left-4 h-20 w-20 rounded-full border-4 border-background overflow-hidden">
          <Image
            src={user.profileImage || "/placeholder.svg"}
            alt={user.name}
            width={80}
            height={80}
            className="h-full w-full object-cover"
          />
        </div>

        {/* User Info */}
        <div className="mb-4">
          <div className="flex items-center gap-1">
            <h3 className="text-lg font-medium">{user.name}</h3>
            {user.verified && <Check className="h-4 w-4 text-primary" />}
          </div>
          <p className="text-sm text-muted-foreground">@{user.username}</p>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <button className="flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="h-4 w-4" />
            <span>Add to favorites and other lists</span>
          </button>

          <div className="flex gap-2">
            <button className="flex items-center gap-1 bg-muted px-4 py-2 rounded-md text-sm">
              <MessageSquare className="h-4 w-4" />
              <span>Message</span>
            </button>

            {user.id !== "4" && (
              <button className="flex items-center gap-1 bg-muted px-4 py-2 rounded-md text-sm">
                <DollarSign className="h-4 w-4" />
                <span>Send a tip</span>
              </button>
            )}
          </div>

          <div className="flex justify-between">
            <div className="bg-muted px-4 py-2 rounded-md text-sm text-primary">
              SUBSCRIBED
            </div>
            <div className="bg-muted px-4 py-2 rounded-md text-sm text-primary">
              FOR FREE
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
