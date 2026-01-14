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
import { Plus, Eye, Download, Edit } from 'lucide-react'
import { Quotation } from '@/types'

export default function QuotationsPage() {
  const [quotations, setQuotations] = useState<Quotation[]>([])
  const [filter, setFilter] = useState<'all' | 'draft' | 'sent' | 'approved' | 'rejected'>('all')

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
