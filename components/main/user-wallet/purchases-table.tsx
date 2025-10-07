import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { Purchase } from "@/endpoint/user/user-types";
import Image from "next/image";

interface PurchasesTableProps {
  purchases: Purchase[];
}

export function PurchasesTable({ purchases }: PurchasesTableProps) {
  if (purchases.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No purchases yet</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Media</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Creator</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Reference</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {purchases.map((purchase) => (
            <TableRow key={purchase.id}>
              <TableCell>
                {purchase.mediaUrl && (
                  <div className="relative w-12 h-12 rounded-md overflow-hidden">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}/${
                        purchase.mediaUrl.startsWith("/")
                          ? purchase.mediaUrl.slice(1)
                          : purchase.mediaUrl
                      }`}
                      alt={purchase.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </TableCell>
              <TableCell className="font-medium">{purchase.title}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {purchase.creator.profilePicture && (
                    <div className="relative w-6 h-6 rounded-full overflow-hidden">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}/${
                          purchase.creator.profilePicture.startsWith("/")
                            ? purchase.creator.profilePicture.slice(1)
                            : purchase.creator.profilePicture
                        }`}
                        alt={purchase.creator.username}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <span>{purchase.creator.username}</span>
                </div>
              </TableCell>
              <TableCell className="font-semibold">
                $
                {Number(purchase.price).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </TableCell>
              <TableCell>
                <Badge variant="secondary">{purchase.payType}</Badge>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(purchase.purchasedAt), {
                  addSuffix: true,
                })}
              </TableCell>
              <TableCell className="font-mono text-xs text-muted-foreground">
                {purchase.paymentReference}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
