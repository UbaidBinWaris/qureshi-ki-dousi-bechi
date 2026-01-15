'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Plus, Eye, Download, Edit, Trash2, FileText } from 'lucide-react'
import { Quotation } from '@/types'
import { toast } from 'sonner'

// Mock user role - in production, get from auth context
const getCurrentUser = () => ({
  id: 'user-1',
  name: 'John Doe',
  role: 'admin' as 'admin' | 'user'
})

export default function QuotationsPage() {
  const [quotations, setQuotations] = useState<Quotation[]>([])
  const [filter, setFilter] = useState<'all' | 'draft' | 'sent' | 'approved' | 'rejected'>('all')
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedQuotation, setSelectedQuotation] = useState<Quotation | null>(null)
  const [deleteReason, setDeleteReason] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  
  const currentUser = getCurrentUser()

  useEffect(() => {
    loadQuotations()
  }, [])

  const loadQuotations = () => {
    fetch('/api/quotations')
      .then(res => res.json())
      .then(data => setQuotations(data))
      .catch(err => console.error('Failed to load quotations:', err))
  }

  const filteredQuotations = quotations.filter(q => 
    filter === 'all' || q.status === filter
  )

  const statusColors = {
    draft: 'bg-slate-100 text-slate-700',
    sent: 'bg-blue-100 text-blue-700',
    approved: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
  }

  const handleDeleteClick = (quotation: Quotation) => {
    setSelectedQuotation(quotation)
    setDeleteDialogOpen(true)
  }

  const handleDelete = async () => {
    if (!selectedQuotation) return
    
    setIsDeleting(true)
    
    try {
      if (currentUser.role === 'admin') {
        // Admin can delete directly
        const response = await fetch(`/api/quotations?id=${selectedQuotation.id}`, {
          method: 'DELETE',
        })
        
        if (response.ok) {
          toast.success('Quotation deleted successfully')
          loadQuotations()
        } else {
          throw new Error('Failed to delete')
        }
      } else {
        // User must request deletion
        const response = await fetch('/api/deletion-requests', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'quotation',
            itemId: selectedQuotation.id,
            itemNumber: selectedQuotation.quotationNumber,
            requestedBy: currentUser.id,
            requestedByName: currentUser.name,
            reason: deleteReason,
          }),
        })
        
        if (response.ok) {
          toast.success('Deletion request submitted to admin')
        } else {
          throw new Error('Failed to submit request')
        }
      }
      
      setDeleteDialogOpen(false)
      setDeleteReason('')
      setSelectedQuotation(null)
    } catch (error) {
      toast.error('Failed to delete quotation')
    } finally {
      setIsDeleting(false)
    }
  }

  const downloadPDF = async (quotation: Quotation) => {
    toast.info('PDF download will be implemented')
    // TODO: Implement PDF generation
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Quotations</h1>
          <p className="text-slate-500 mt-1">Manage your project quotations</p>
        </div>
        <Link href="/dashboard/quotations/new">
          <Button className="bg-orange-500 hover:bg-orange-600">
            <Plus className="h-4 w-4 mr-2" />
            New Quotation
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {['all', 'draft', 'sent', 'approved', 'rejected'].map((status) => (
          <Button
            key={status}
            variant={filter === status ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(status as any)}
            className={filter === status ? 'bg-orange-500 hover:bg-orange-600' : ''}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
            {status === 'all' ? ` (${quotations.length})` : 
             ` (${quotations.filter(q => q.status === status).length})`}
          </Button>
        ))}
      </div>

      {/* Quotations Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Quotations</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredQuotations.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 mb-4">No quotations found</p>
              <Link href="/dashboard/quotations/new">
                <Button className="bg-orange-500 hover:bg-orange-600">
                  Create Your First Quotation
                </Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Quotation #</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Valid Until</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredQuotations.map((quotation) => (
                    <TableRow key={quotation.id}>
                      <TableCell className="font-medium">
                        {quotation.quotationNumber}
                      </TableCell>
                      <TableCell>{quotation.client?.name || 'N/A'}</TableCell>
                      <TableCell>{quotation.project?.name || 'N/A'}</TableCell>
                      <TableCell>{formatCurrency(quotation.total)}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 text-xs rounded-full ${statusColors[quotation.status]}`}>
                          {quotation.status}
                        </span>
                      </TableCell>
                      <TableCell>{formatDate(quotation.validUntil)}</TableCell>
                      <TableCell>{formatDate(quotation.createdAt)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/dashboard/quotations/${quotation.id}`}>
                            <Button variant="outline" size="sm" title="View">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Link href={`/dashboard/quotations/${quotation.id}/edit`}>
                            <Button variant="outline" size="sm" title="Edit">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            title="Download PDF"
                            onClick={() => downloadPDF(quotation)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            title={currentUser.role === 'admin' ? 'Delete' : 'Request Deletion'}
                            onClick={() => handleDeleteClick(quotation)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {currentUser.role === 'admin' ? 'Delete Quotation' : 'Request Quotation Deletion'}
            </DialogTitle>
            <DialogDescription>
              {currentUser.role === 'admin' 
                ? 'Are you sure you want to delete this quotation? This action cannot be undone.'
                : 'Please provide a reason for deletion. An admin will review your request.'}
            </DialogDescription>
          </DialogHeader>
          
          {selectedQuotation && (
            <div className="py-4">
              <div className="mb-4 p-3 bg-slate-50 rounded-md">
                <p className="text-sm font-medium">Quotation: {selectedQuotation.quotationNumber}</p>
                <p className="text-sm text-slate-600">Client: {selectedQuotation.client?.name}</p>
                <p className="text-sm text-slate-600">Amount: {formatCurrency(selectedQuotation.total)}</p>
              </div>
              
              {currentUser.role === 'user' && (
                <div>
                  <Label htmlFor="reason">Reason for Deletion *</Label>
                  <Input
                    id="reason"
                    value={deleteReason}
                    onChange={(e) => setDeleteReason(e.target.value)}
                    placeholder="Enter reason..."
                    className="mt-1"
                  />
                </div>
              )}
            </div>
          )}
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setDeleteDialogOpen(false)
                setDeleteReason('')
                setSelectedQuotation(null)
              }}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting || (currentUser.role === 'user' && !deleteReason.trim())}
            >
              {isDeleting ? 'Processing...' : currentUser.role === 'admin' ? 'Delete' : 'Submit Request'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
