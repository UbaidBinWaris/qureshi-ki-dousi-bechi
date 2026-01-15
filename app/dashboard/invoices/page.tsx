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
import { Invoice } from '@/types'
import { toast } from 'sonner'

// Mock user role - in production, get from auth context
const getCurrentUser = () => ({
  id: 'user-1',
  name: 'John Doe',
  role: 'admin' as 'admin' | 'user'
})

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [filter, setFilter] = useState<'all' | 'unpaid' | 'partial' | 'paid'>('all')
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [deleteReason, setDeleteReason] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  
  const currentUser = getCurrentUser()

  useEffect(() => {
    loadInvoices()
  }, [])

  const loadInvoices = () => {
    fetch('/api/invoices')
      .then(res => res.json())
      .then(data => setInvoices(data))
      .catch(err => console.error('Failed to load invoices:', err))
  }

  const filteredInvoices = invoices.filter(i => 
    filter === 'all' || i.paymentStatus === filter
  )

  const statusColors = {
    unpaid: 'bg-red-100 text-red-700',
    partial: 'bg-orange-100 text-orange-700',
    paid: 'bg-green-100 text-green-700',
  }

  const handleDeleteClick = (invoice: Invoice) => {
    setSelectedInvoice(invoice)
    setDeleteDialogOpen(true)
  }

  const handleDelete = async () => {
    if (!selectedInvoice) return
    
    setIsDeleting(true)
    
    try {
      if (currentUser.role === 'admin') {
        // Admin can delete directly
        const response = await fetch(`/api/invoices?id=${selectedInvoice.id}`, {
          method: 'DELETE',
        })
        
        if (response.ok) {
          toast.success('Invoice deleted successfully')
          loadInvoices()
        } else {
          throw new Error('Failed to delete')
        }
      } else {
        // User must request deletion
        const response = await fetch('/api/deletion-requests', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'invoice',
            itemId: selectedInvoice.id,
            itemNumber: selectedInvoice.invoiceNumber,
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
      setSelectedInvoice(null)
    } catch (error) {
      toast.error('Failed to delete invoice')
    } finally {
      setIsDeleting(false)
    }
  }

  const downloadPDF = async (invoice: Invoice) => {
    toast.info('PDF download will be implemented')
    // TODO: Implement PDF generation
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Invoices</h1>
          <p className="text-slate-500 mt-1">Manage your invoices and payments</p>
        </div>
        <Link href="/dashboard/invoices/new">
          <Button className="bg-orange-500 hover:bg-orange-600">
            <Plus className="h-4 w-4 mr-2" />
            New Invoice
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {['all', 'unpaid', 'partial', 'paid'].map((status) => (
          <Button
            key={status}
            variant={filter === status ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(status as any)}
            className={filter === status ? 'bg-orange-500 hover:bg-orange-600' : ''}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
            {status === 'all' ? ` (${invoices.length})` : 
             ` (${invoices.filter(i => i.paymentStatus === status).length})`}
          </Button>
        ))}
      </div>

      {/* Invoices Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredInvoices.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 mb-4">No invoices found</p>
              <Link href="/dashboard/invoices/new">
                <Button className="bg-orange-500 hover:bg-orange-600">
                  Create Your First Invoice
                </Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice #</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead>Paid Amount</TableHead>
                    <TableHead>Balance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">
                        {invoice.invoiceNumber}
                      </TableCell>
                      <TableCell>{invoice.client?.name || 'N/A'}</TableCell>
                      <TableCell>{invoice.project?.name || 'N/A'}</TableCell>
                      <TableCell>{formatCurrency(invoice.total)}</TableCell>
                      <TableCell>{formatCurrency(invoice.amountPaid)}</TableCell>
                      <TableCell className="font-medium">
                        {formatCurrency(invoice.total - invoice.amountPaid)}
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 text-xs rounded-full ${statusColors[invoice.paymentStatus]}`}>
                          {invoice.paymentStatus}
                        </span>
                      </TableCell>
                      <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/dashboard/invoices/${invoice.id}`}>
                            <Button variant="outline" size="sm" title="View">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Link href={`/dashboard/invoices/${invoice.id}/edit`}>
                            <Button variant="outline" size="sm" title="Edit">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            title="Download PDF"
                            onClick={() => downloadPDF(invoice)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            title={currentUser.role === 'admin' ? 'Delete' : 'Request Deletion'}
                            onClick={() => handleDeleteClick(invoice)}
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
              {currentUser.role === 'admin' ? 'Delete Invoice' : 'Request Invoice Deletion'}
            </DialogTitle>
            <DialogDescription>
              {currentUser.role === 'admin' 
                ? 'Are you sure you want to delete this invoice? This action cannot be undone.'
                : 'Please provide a reason for deletion. An admin will review your request.'}
            </DialogDescription>
          </DialogHeader>
          
          {selectedInvoice && (
            <div className="py-4">
              <div className="mb-4 p-3 bg-slate-50 rounded-md">
                <p className="text-sm font-medium">Invoice: {selectedInvoice.invoiceNumber}</p>
                <p className="text-sm text-slate-600">Client: {selectedInvoice.client?.name}</p>
                <p className="text-sm text-slate-600">Amount: {formatCurrency(selectedInvoice.total)}</p>
                <p className="text-sm text-slate-600">Status: {selectedInvoice.paymentStatus}</p>
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
                setSelectedInvoice(null)
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
