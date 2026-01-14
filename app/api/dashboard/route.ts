import { NextResponse } from 'next/server'
import { getQuotations, getInvoices, getClients, getProjects } from '@/lib/db'

export async function GET() {
  try {
    const quotations = getQuotations()
    const invoices = getInvoices()
    const clients = getClients()
    const projects = getProjects()

    const totalRevenue = invoices
      .filter(i => i.paymentStatus === 'paid')
      .reduce((sum, i) => sum + i.amountPaid, 0)

    const pendingAmount = invoices
      .filter(i => i.paymentStatus !== 'paid')
      .reduce((sum, i) => sum + (i.total - i.amountPaid), 0)

    const activeProjects = projects.filter(p => p.status === 'active').length

    const stats = {
      totalRevenue,
      pendingAmount,
      totalQuotations: quotations.length,
      totalInvoices: invoices.length,
      totalClients: clients.length,
      activeProjects,
      recentQuotations: quotations.slice(-5).reverse(),
      recentInvoices: invoices.slice(-5).reverse(),
    }

    return NextResponse.json(stats)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    )
  }
}
