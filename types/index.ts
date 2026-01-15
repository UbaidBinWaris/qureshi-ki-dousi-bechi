export type UserRole = 'admin' | 'user'

export interface User {
  id: string
  name: string
  email: string
  password: string
  role: UserRole
  createdAt: string
}

// Room and Project Phase Types
export interface Room {
  id: string
  name: string
  type: RoomType
  width: number // in feet
  length: number // in feet
  height?: number // in feet
  squareFeet: number
  demolitionCost?: number
  wasteBinCost?: number
  materials: RoomMaterial[]
  labor: RoomLabor[]
  notes?: string
}

export type RoomType = 
  | 'bathroom' 
  | 'kitchen' 
  | 'powder-room' 
  | 'living-room' 
  | 'bedroom'
  | 'dining-room'
  | 'basement'
  | 'garage'
  | 'laundry-room'
  | 'hallway'
  | 'office'
  | 'other'

export interface RoomMaterial {
  id: string
  materialId: string
  materialName: string
  quantity: number
  unit: string
  rate: number
  amount: number
  vendor?: string
}

export interface RoomLabor {
  id: string
  laborId: string
  laborName: string
  hours: number
  rate: number
  amount: number
  providerId?: string
  providerName?: string
}

export interface RoomTemplate {
  id: string
  roomType: RoomType
  defaultMaterials: string[] // material IDs
  defaultLabor: string[] // labor IDs
  estimatedHoursPerSqFt: number
}

export interface AdditionalCost {
  id: string
  name: string
  description?: string
  defaultCost: number
  category: 'permit' | 'inspection' | 'waste' | 'equipment' | 'other'
  isEditable: boolean
  createdAt: string
}

export interface Trade {
  id: string
  name: string
  category: string
  description?: string
  providers: TradeProvider[]
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
  targetEndDate: string
  endDate?: string
  budget?: number
  status: 'draft' | 'quoted' | 'active' | 'completed' | 'on-hold'
  currentPhase: 'structural' | 'finishing' | 'final-review' | 'completed'
  description?: string
  rooms: Room[]
  additionalCosts: ProjectAdditionalCost[]
  totalEstimate: number
  actualCost?: number
  createdAt: string
  updatedAt: string
}

export interface ProjectAdditionalCost {
  id: string
  costId: string
  name: string
  amount: number
  isPaid: boolean
  paidDate?: string
}

export interface Material {
  id: string
  name: string
  description?: string
  unit: string
  rate: number
  category: string
  materialType: 'building' | 'finishing'
  roomTypes?: string[] // applicable room types
  defaultQuantityPerSqFt?: number
  vendorLinks?: VendorLink[]
  createdAt: string
}

export interface VendorLink {
  vendorName: string
  url: string
  lastPrice?: number
  lastUpdated?: string
}

export interface Labor {
  id: string
  name: string
  description?: string
  hourlyRate: number
  jobRate?: number
  category: string
  trade: string
  providers?: TradeProvider[]
  createdAt: string
}

export interface TradeProvider {
  id: string
  name: string
  phone: string
  email?: string
  hourlyRate: number
  jobRate?: number
  rating?: number
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
  phase: 'structural' | 'finishing' | 'full'
  rooms: Room[]
  additionalCosts: ProjectAdditionalCost[]
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
  specialInstructions?: string
  signedBy?: string
  signedDate?: string
  signatureData?: string
  createdBy: string
  createdAt: string
  updatedAt: string
}

export interface Invoice {
  id: string
  invoiceNumber: string
  quotationId?: string
  quotation?: Quotation
  projectId: string
  project?: Project
  clientId: string
  client?: Client
  phase?: 'structural' | 'finishing' | 'final'
  items: QuotationItem[]
  actualMaterialUsage?: RoomMaterial[]
  actualLaborHours?: RoomLabor[]
  extrasAndAdjustments?: InvoiceAdjustment[]
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

export interface InvoiceAdjustment {
  id: string
  description: string
  type: 'extra' | 'credit' | 'adjustment'
  amount: number
  approved: boolean
  approvedBy?: string
  approvedDate?: string
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

export interface DeletionRequest {
  id: string
  type: 'quotation' | 'invoice'
  itemId: string
  itemNumber: string
  requestedBy: string
  requestedByName: string
  reason: string
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
  reviewedBy?: string
  reviewedAt?: string
  reviewNotes?: string
}

export interface DashboardStats {
  totalRevenue: number
  pendingAmount: number
  totalQuotations: number
  totalInvoices: number
  recentQuotations: Quotation[]
  recentInvoices: Invoice[]
}
