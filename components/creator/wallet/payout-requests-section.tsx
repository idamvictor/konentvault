"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { PayoutRequestsTable } from "./payout-requests-table"
import { CreatePayoutDialog } from "./create-payout-dialog"
import { INITIAL_PAYOUT_REQUESTS, type PayoutRequest } from "@/lib/wallet-data"

export function PayoutRequestsSection() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [requests, setRequests] = useState<PayoutRequest[]>(INITIAL_PAYOUT_REQUESTS)

  const handleCreate = (newRequest: Omit<PayoutRequest, "id" | "status" | "requestedAt">) => {
    const request: PayoutRequest = {
      ...newRequest,
      id: (requests.length + 1).toString(),
      status: "pending",
      requestedAt: new Date().toISOString(),
    }
    setRequests([request, ...requests])
  }

  const handleUpdate = (id: string, updates: Partial<PayoutRequest>) => {
    setRequests(requests.map((req) => (req.id === id ? { ...req, ...updates } : req)))
  }

  const handleDelete = (id: string) => {
    setRequests(requests.filter((req) => req.id !== id))
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Payout Requests</CardTitle>
            <CardDescription className="mt-1.5">Manage your withdrawal requests</CardDescription>
          </div>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Request
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <PayoutRequestsTable requests={requests} onUpdate={handleUpdate} onDelete={handleDelete} />
      </CardContent>

      <CreatePayoutDialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen} onSuccess={handleCreate} />
    </Card>
  )
}
