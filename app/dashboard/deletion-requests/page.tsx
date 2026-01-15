'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatDate } from '@/lib/utils'
import { CheckCircle, XCircle, AlertCircle, FileText } from 'lucide-react'
import { DeletionRequest } from '@/types'
import { toast } from 'sonner'

// Mock user - in production, get from auth context
const getCurrentUser = () => ({
  id: 'user-1',
  name: 'Admin User',
  role: 'admin' as 'admin' | 'user'
})

export default function DeletionRequestsPage() {
  const [requests, setRequests] = useState<DeletionRequest[]>([])
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending')
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<DeletionRequest | null>(null)
  const [reviewNotes, setReviewNotes] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  
  const currentUser = getCurrentUser()

  useEffect(() => {
    loadRequests()
  }, [])

  const loadRequests = () => {
    fetch('/api/deletion-requests')
      .then(res => res.json())
      .then(data => setRequests(data))
      .catch(err => console.error('Failed to load deletion requests:', err))
  }

  const filteredRequests = requests.filter(r => 
    filter === 'all' || r.status === filter
  )

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-700',
    approved: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
  }

  const handleReviewClick = (request: DeletionRequest) => {
    setSelectedRequest(request)
    setReviewDialogOpen(true)
  }

  const handleReview = async (status: 'approved' | 'rejected') => {
    if (!selectedRequest) return
    
    setIsProcessing(true)
    
    try {
      const response = await fetch('/api/deletion-requests', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedRequest.id,
          status,
          reviewNotes,
          reviewedBy: currentUser.id,
        }),
      })
      
      if (response.ok) {
        toast.success(`Request ${status}`)
        loadRequests()
        setReviewDialogOpen(false)
        setReviewNotes('')
        setSelectedRequest(null)
      } else {
        throw new Error('Failed to process request')
      }
    } catch (error) {
      toast.error('Failed to process request')
    } finally {
      setIsProcessing(false)
    }
  }

  if (currentUser.role !== 'admin') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
              <p className="text-slate-600">You do not have permission to view this page.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Deletion Requests</h1>
        <p className="text-slate-500 mt-1">Review and manage deletion requests from users</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {['all', 'pending', 'approved', 'rejected'].map((status) => (
          <Button
            key={status}
            variant={filter === status ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(status as any)}
            className={filter === status ? 'bg-orange-500 hover:bg-orange-600' : ''}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
            {status === 'all' ? ` (${requests.length})` : 
             ` (${requests.filter(r => r.status === status).length})`}
          </Button>
        ))}
      </div>

      {/* Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle>Deletion Requests</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredRequests.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">No deletion requests found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Item #</TableHead>
                    <TableHead>Requested By</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium capitalize">
                        {request.type}
                      </TableCell>
                      <TableCell>{request.itemNumber}</TableCell>
                      <TableCell>{request.requestedByName}</TableCell>
                      <TableCell className="max-w-xs truncate">{request.reason}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 text-xs rounded-full ${statusColors[request.status]}`}>
                          {request.status}
                        </span>
                      </TableCell>
                      <TableCell>{formatDate(request.createdAt)}</TableCell>
                      <TableCell className="text-right">
                        {request.status === 'pending' ? (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleReviewClick(request)}
                          >
                            Review
                          </Button>
                        ) : (
                          <span className="text-sm text-slate-500">
                            {request.reviewedAt ? formatDate(request.reviewedAt) : '-'}
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Review Dialog */}
      <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Review Deletion Request</DialogTitle>
            <DialogDescription>
              Review the details and approve or reject this deletion request.
            </DialogDescription>
          </DialogHeader>
          
          {selectedRequest && (
            <div className="py-4 space-y-4">
              <div className="p-3 bg-slate-50 rounded-md space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Type:</span>
                  <span className="text-sm capitalize">{selectedRequest.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Item #:</span>
                  <span className="text-sm">{selectedRequest.itemNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Requested By:</span>
                  <span className="text-sm">{selectedRequest.requestedByName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Date:</span>
                  <span className="text-sm">{formatDate(selectedRequest.createdAt)}</span>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Reason for Deletion:</Label>
                <p className="mt-1 text-sm text-slate-600 p-2 bg-slate-50 rounded">
                  {selectedRequest.reason}
                </p>
              </div>
              
              <div>
                <Label htmlFor="reviewNotes">Review Notes (Optional)</Label>
                <Input
                  id="reviewNotes"
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  placeholder="Add notes about your decision..."
                  className="mt-1"
                />
              </div>
            </div>
          )}
          
          <DialogFooter className="gap-2">
            <Button 
              variant="outline" 
              onClick={() => {
                setReviewDialogOpen(false)
                setReviewNotes('')
                setSelectedRequest(null)
              }}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={() => handleReview('rejected')}
              disabled={isProcessing}
            >
              <XCircle className="h-4 w-4 mr-2" />
              {isProcessing ? 'Processing...' : 'Reject'}
            </Button>
            <Button 
              onClick={() => handleReview('approved')}
              disabled={isProcessing}
              className="bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              {isProcessing ? 'Processing...' : 'Approve'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
