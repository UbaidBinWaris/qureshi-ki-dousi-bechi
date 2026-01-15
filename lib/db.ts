import fs from 'fs'
import path from 'path'
import { User, Client, Project, Material, Labor, Quotation, Invoice, CompanySettings, DeletionRequest } from '@/types'

const dataDir = path.join(process.cwd(), 'data')

// Helper to read JSON files
function readJSONFile<T>(filename: string): T {
  const filePath = path.join(dataDir, filename)
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(fileContent)
}

// Helper to write JSON files
function writeJSONFile<T>(filename: string, data: T): void {
  const filePath = path.join(dataDir, filename)
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
}

// Users
export function getUsers(): User[] {
  return readJSONFile<User[]>('users.json')
}

export function getUserById(id: string): User | undefined {
  const users = getUsers()
  return users.find(user => user.id === id)
}

export function getUserByEmail(email: string): User | undefined {
  const users = getUsers()
  return users.find(user => user.email === email)
}

// Clients
export function getClients(): Client[] {
  return readJSONFile<Client[]>('clients.json')
}

export function getClientById(id: string): Client | undefined {
  const clients = getClients()
  return clients.find(client => client.id === id)
}

export function addClient(client: Client): void {
  const clients = getClients()
  clients.push(client)
  writeJSONFile('clients.json', clients)
}

export function updateClient(id: string, updates: Partial<Client>): void {
  const clients = getClients()
  const index = clients.findIndex(c => c.id === id)
  if (index !== -1) {
    clients[index] = { ...clients[index], ...updates }
    writeJSONFile('clients.json', clients)
  }
}

export function deleteClient(id: string): void {
  const clients = getClients()
  const filtered = clients.filter(c => c.id !== id)
  writeJSONFile('clients.json', filtered)
}

// Projects
export function getProjects(): Project[] {
  const projects = readJSONFile<Project[]>('projects.json')
  const clients = getClients()
  
  return projects.map(project => ({
    ...project,
    client: clients.find(c => c.id === project.clientId)
  }))
}

export function getProjectById(id: string): Project | undefined {
  const projects = getProjects()
  return projects.find(project => project.id === id)
}

export function addProject(project: Project): void {
  const projects = readJSONFile<Project[]>('projects.json')
  projects.push(project)
  writeJSONFile('projects.json', projects)
}

export function updateProject(id: string, updates: Partial<Project>): void {
  const projects = readJSONFile<Project[]>('projects.json')
  const index = projects.findIndex(p => p.id === id)
  if (index !== -1) {
    projects[index] = { ...projects[index], ...updates }
    writeJSONFile('projects.json', projects)
  }
}

// Materials
export function getMaterials(): Material[] {
  return readJSONFile<Material[]>('materials.json')
}

export function getMaterialById(id: string): Material | undefined {
  const materials = getMaterials()
  return materials.find(material => material.id === id)
}

// Labor
export function getLabor(): Labor[] {
  return readJSONFile<Labor[]>('labor.json')
}

export function getLaborById(id: string): Labor | undefined {
  const labor = getLabor()
  return labor.find(l => l.id === id)
}

// Quotations
export function getQuotations(): Quotation[] {
  const quotations = readJSONFile<Quotation[]>('quotations.json')
  const projects = getProjects()
  const clients = getClients()
  
  return quotations.map(quotation => ({
    ...quotation,
    project: projects.find(p => p.id === quotation.projectId),
    client: clients.find(c => c.id === quotation.clientId)
  }))
}

export function getQuotationById(id: string): Quotation | undefined {
  const quotations = getQuotations()
  return quotations.find(q => q.id === id)
}

export function addQuotation(quotation: Quotation): void {
  const quotations = readJSONFile<Quotation[]>('quotations.json')
  quotations.push(quotation)
  writeJSONFile('quotations.json', quotations)
}

export function updateQuotation(id: string, updates: Partial<Quotation>): void {
  const quotations = readJSONFile<Quotation[]>('quotations.json')
  const index = quotations.findIndex(q => q.id === id)
  if (index !== -1) {
    quotations[index] = { ...quotations[index], ...updates }
    writeJSONFile('quotations.json', quotations)
  }
}

export function deleteQuotation(id: string): void {
  const quotations = readJSONFile<Quotation[]>('quotations.json')
  const filtered = quotations.filter(q => q.id !== id)
  writeJSONFile('quotations.json', filtered)
}

// Invoices
export function getInvoices(): Invoice[] {
  const invoices = readJSONFile<Invoice[]>('invoices.json')
  const projects = getProjects()
  const clients = getClients()
  
  return invoices.map(invoice => ({
    ...invoice,
    project: projects.find(p => p.id === invoice.projectId),
    client: clients.find(c => c.id === invoice.clientId)
  }))
}

export function getInvoiceById(id: string): Invoice | undefined {
  const invoices = getInvoices()
  return invoices.find(i => i.id === id)
}

export function addInvoice(invoice: Invoice): void {
  const invoices = readJSONFile<Invoice[]>('invoices.json')
  invoices.push(invoice)
  writeJSONFile('invoices.json', invoices)
}

export function updateInvoice(id: string, updates: Partial<Invoice>): void {
  const invoices = readJSONFile<Invoice[]>('invoices.json')
  const index = invoices.findIndex(i => i.id === id)
  if (index !== -1) {
    invoices[index] = { ...invoices[index], ...updates }
    writeJSONFile('invoices.json', invoices)
  }
}

export function deleteInvoice(id: string): void {
  const invoices = readJSONFile<Invoice[]>('invoices.json')
  const filtered = invoices.filter(i => i.id !== id)
  writeJSONFile('invoices.json', filtered)
}

// Company Settings
export function getCompanySettings(): CompanySettings {
  return readJSONFile<CompanySettings>('company.json')
}

export function updateCompanySettings(updates: Partial<CompanySettings>): void {
  const settings = getCompanySettings()
  const updated = { ...settings, ...updates }
  writeJSONFile('company.json', updated)
}

// Get next sequential number
export function getNextQuotationNumber(): string {
  const quotations = readJSONFile<Quotation[]>('quotations.json')
  const maxNumber = quotations.reduce((max, q) => {
    const num = parseInt(q.quotationNumber.split('-')[1])
    return num > max ? num : max
  }, 0)
  return `QT-${String(maxNumber + 1).padStart(4, '0')}`
}

export function getNextInvoiceNumber(): string {
  const invoices = readJSONFile<Invoice[]>('invoices.json')
  const maxNumber = invoices.reduce((max, i) => {
    const num = parseInt(i.invoiceNumber.split('-')[1])
    return num > max ? num : max
  }, 0)
  return `INV-${String(maxNumber + 1).padStart(4, '0')}`
}

// Deletion Requests
export function getDeletionRequests(): DeletionRequest[] {
  try {
    return readJSONFile<DeletionRequest[]>('deletion-requests.json')
  } catch (error) {
    // If file doesn't exist, return empty array
    return []
  }
}

export function getDeletionRequestById(id: string): DeletionRequest | undefined {
  const requests = getDeletionRequests()
  return requests.find(r => r.id === id)
}

export function addDeletionRequest(request: DeletionRequest): void {
  const requests = getDeletionRequests()
  requests.push(request)
  writeJSONFile('deletion-requests.json', requests)
}

export function updateDeletionRequest(id: string, updates: Partial<DeletionRequest>): void {
  const requests = getDeletionRequests()
  const index = requests.findIndex(r => r.id === id)
  if (index !== -1) {
    requests[index] = { ...requests[index], ...updates }
    writeJSONFile('deletion-requests.json', requests)
  }
}

export function deleteDeletionRequest(id: string): void {
  const requests = getDeletionRequests()
  const filtered = requests.filter(r => r.id !== id)
  writeJSONFile('deletion-requests.json', filtered)
}
