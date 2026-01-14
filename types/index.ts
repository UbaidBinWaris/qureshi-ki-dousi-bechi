export type UserRole = 'admin' | 'user'

export interface User {
  id: string
  name: string
  email: string
  password: string
  role: UserRole
  createdAt: string
}

export interface Client {
  id: string
  name: string
  email: string
  phone: string
  address: string
  city: string
  createdAt: string
}

export interface Project {
  id: string
  name: string
  clientId: string
  client?: Client
  location: string
  startDate: string
  endDate?: string
  status: 'active' | 'completed' | 'on-hold'
  description?: string
  createdAt: string
}

export interface Material {
  id: string
  name: string
  description?: string
  unit: string
  rate: number
  category: string
  createdAt: string
}

export interface Labor {
  id: string
  name: string
  description?: string
  hourlyRate: number
  category: string
  createdAt: string
}

export interface QuotationItem {
  id: string
  type: 'material' | 'labor'
  itemId: string
  itemName: string
  description?: string
  quantity: number
  rate: number
  amount: number
}

export interface Quotation {
  id: string
  quotationNumber: string
  projectId: string
  project?: Project
  clientId: string
  client?: Client
  items: QuotationItem[]
  subtotal: number
  taxRate: number
  taxAmount: number
  discount: number
  total: number
  status: 'draft' | 'sent' | 'approved' | 'rejected'
  validUntil: string
  terms?: string
  notes?: string
  createdBy: string
  createdAt: string
  updatedAt: string
}

export interface Invoice {
  id: string
  invoiceNumber: string
  quotationId?: string
  projectId: string
  project?: Project
  clientId: string
  client?: Client
  items: QuotationItem[]
  subtotal: number
  taxRate: number
  taxAmount: number
  discount: number
  total: number
  paymentStatus: 'unpaid' | 'partial' | 'paid'
  amountPaid: number
  dueDate: string
  paymentTerms?: string
  notes?: string
  createdBy: string
  createdAt: string
  updatedAt: string
}

export interface CompanySettings {
  id: string
  name: string
  email: string
  phone: string
  address: string
  city: string
  taxId?: string
  logo?: string
  bankName?: string
  accountNumber?: string
  defaultTaxRate: number
  defaultPaymentTerms?: string
}

export interface DashboardStats {
  totalRevenue: number
  pendingAmount: number
  totalQuotations: number
  totalInvoices: number
  recentQuotations: Quotation[]
  recentInvoices: Invoice[]
}
