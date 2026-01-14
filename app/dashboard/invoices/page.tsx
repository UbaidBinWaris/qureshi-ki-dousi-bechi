'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Plus, Eye, Download } from 'lucide-react'
import { Invoice } from '@/types'

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [filter, setFilter] = useState<'all' | 'unpaid' | 'partial' | 'paid'>('all')

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
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
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
    </div>
  )
}
