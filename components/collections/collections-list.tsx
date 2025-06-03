import Image from "next/image";

type Collection = {
  id: string;
  name: string;
  users: number;
  posts: number;
  avatars: string[];
  isEmpty?: boolean;
};

const collections: Collection[] = [
  {
    id: "following",
    name: "Following",
    users: 14,
    posts: 7500,
    avatars: [
      "https://res.cloudinary.com/dyp8gtllq/image/upload/v1737075756/cld-sample-5.jpg",
      "https://res.cloudinary.com/dyp8gtllq/image/upload/v1737075756/cld-sample-5.jpg",
      "https://res.cloudinary.com/dyp8gtllq/image/upload/v1737075756/cld-sample-5.jpg",
    ],
  },
  {
    id: "new-girl",
    name: "New girl",
    users: 1,
    posts: 1600,
    avatars: ["https://res.cloudinary.com/dyp8gtllq/image/upload/v1737075756/cld-sample-5.jpg"],
  },
  {
    id: "fans",
    name: "Fans",
    users: 8,
    posts: 5100,
    avatars: [
      "https://res.cloudinary.com/dyp8gtllq/image/upload/v1737075756/cld-sample-5.jpg",
      "https://res.cloudinary.com/dyp8gtllq/image/upload/v1737075756/cld-sample-5.jpg",
      "https://res.cloudinary.com/dyp8gtllq/image/upload/v1737075756/cld-sample-5.jpg",
    ],
  },
  {
    id: "restricted",
    name: "Restricted",
    users: 0,
    posts: 0,
    avatars: [],
    isEmpty: true,
  },
  {
    id: "blocked",
    name: "Blocked",
    users: 0,
    posts: 0,
    avatars: [],
    isEmpty: true,
  },
];

export default function CollectionsList() {
  return (
    <div className="flex flex-col">
      {collections.map((collection) => (
        <div
          key={collection.id}
          className="flex items-center justify-between p-4 border-b"
        >
          <div className="flex flex-col">
            <h3 className="font-medium">{collection.name}</h3>
            {collection.isEmpty ? (
              <span className="text-sm text-muted-foreground">empty</span>
            ) : (
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <span>
                  {collection.users} {collection.users === 1 ? "user" : "users"}
                </span>
                <span>•</span>
                <span>{formatNumber(collection.posts)} posts</span>
              </div>
            )}
          </div>
          <div className="flex -space-x-2">
            {collection.avatars.map((avatar, index) => (
              <div
                key={index}
                className="h-8 w-8 rounded-full border-2 border-background overflow-hidden"
              >
                <Image
                  src={avatar || "/placeholder.svg"}
                  alt="Avatar"
                  width={40}
                  height={40}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function formatNumber(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}
