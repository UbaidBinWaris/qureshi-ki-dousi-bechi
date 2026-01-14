'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency, formatDate } from '@/lib/utils'
import { 
  DollarSign, 
  FileText, 
  Receipt, 
  Users, 
  TrendingUp,
  Clock
} from 'lucide-react'
import { Quotation, Invoice } from '@/types'

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    pendingAmount: 0,
    totalQuotations: 0,
    totalInvoices: 0,
    totalClients: 0,
    activeProjects: 0,
  })
  const [recentQuotations, setRecentQuotations] = useState<Quotation[]>([])
  const [recentInvoices, setRecentInvoices] = useState<Invoice[]>([])

  useEffect(() => {
    fetch('/api/dashboard')
      .then(res => res.json())
      .then(data => {
        setStats({
          totalRevenue: data.totalRevenue,
          pendingAmount: data.pendingAmount,
          totalQuotations: data.totalQuotations,
          totalInvoices: data.totalInvoices,
          totalClients: data.totalClients,
          activeProjects: data.activeProjects,
        })
        setRecentQuotations(data.recentQuotations)
        setRecentInvoices(data.recentInvoices)
      })
      .catch(err => console.error('Failed to load dashboard:', err))
  }, [])

  const statCards = [
    {
      title: 'Total Revenue',
      value: formatCurrency(stats.totalRevenue),
      icon: DollarSign,
      color: 'bg-green-500',
    },
    {
      title: 'Pending Amount',
      value: formatCurrency(stats.pendingAmount),
      icon: Clock,
      color: 'bg-orange-500',
    },
    {
      title: 'Quotations',
      value: stats.totalQuotations,
      icon: FileText,
      color: 'bg-blue-500',
    },
    {
      title: 'Invoices',
      value: stats.totalInvoices,
      icon: Receipt,
      color: 'bg-purple-500',
    },
    {
      title: 'Clients',
      value: stats.totalClients,
      icon: Users,
      color: 'bg-pink-500',
    },
    {
      title: 'Active Projects',
      value: stats.activeProjects,
      icon: TrendingUp,
      color: 'bg-cyan-500',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-1">Welcome back! Here's an overview of your business.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Quotations */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Quotations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentQuotations.length === 0 ? (
                <p className="text-sm text-slate-500 text-center py-4">No quotations yet</p>
              ) : (
                recentQuotations.map((quotation) => (
                  <div 
                    key={quotation.id} 
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-sm">{quotation.quotationNumber}</p>
                      <p className="text-xs text-slate-500">{quotation.client?.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">{formatCurrency(quotation.total)}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        quotation.status === 'approved' ? 'bg-green-100 text-green-700' :
                        quotation.status === 'sent' ? 'bg-blue-100 text-blue-700' :
                        quotation.status === 'rejected' ? 'bg-red-100 text-red-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {quotation.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Invoices */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentInvoices.length === 0 ? (
                <p className="text-sm text-slate-500 text-center py-4">No invoices yet</p>
              ) : (
                recentInvoices.map((invoice) => (
                  <div 
                    key={invoice.id} 
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-sm">{invoice.invoiceNumber}</p>
                      <p className="text-xs text-slate-500">{invoice.client?.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">{formatCurrency(invoice.total)}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        invoice.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' :
                        invoice.paymentStatus === 'partial' ? 'bg-orange-100 text-orange-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {invoice.paymentStatus}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
