import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { Quotation, Invoice, CompanySettings } from '@/types'
import { formatCurrency, formatDate } from '@/lib/utils'

export function generateQuotationPDF(quotation: Quotation, company: CompanySettings) {
  const doc = new jsPDF()
  
  // Company Header
  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.text(company.name, 15, 20)
  
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text(company.address, 15, 28)
  doc.text(`${company.city} | ${company.phone}`, 15, 33)
  doc.text(company.email, 15, 38)
  
  // Quotation Title
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.text('QUOTATION', 150, 20)
  
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text(`Quotation #: ${quotation.quotationNumber}`, 150, 28)
  doc.text(`Date: ${formatDate(quotation.createdAt)}`, 150, 33)
  doc.text(`Valid Until: ${formatDate(quotation.validUntil)}`, 150, 38)
  
  // Client Information
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('Bill To:', 15, 50)
  
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  if (quotation.client) {
    doc.text(quotation.client.name, 15, 56)
    doc.text(quotation.client.address, 15, 61)
    doc.text(`${quotation.client.city} | ${quotation.client.phone}`, 15, 66)
    doc.text(quotation.client.email, 15, 71)
  }
  
  // Project Info
  if (quotation.project) {
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.text('Project:', 15, 83)
    
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text(quotation.project.name, 15, 89)
    doc.text(quotation.project.location, 15, 94)
  }
  
  // Items Table
  const tableData = quotation.items.map(item => [
    item.itemName,
    item.description || '-',
    item.quantity.toString(),
    formatCurrency(item.rate),
    formatCurrency(item.amount)
  ])
  
  autoTable(doc, {
    startY: 105,
    head: [['Item', 'Description', 'Quantity', 'Rate', 'Amount']],
    body: tableData,
    theme: 'striped',
    headStyles: { fillColor: [234, 88, 12] }, // Orange-500
  })
  
  // Totals
  const finalY = (doc as any).lastAutoTable.finalY + 10
  
  doc.setFontSize(10)
  doc.text('Subtotal:', 130, finalY)
  doc.text(formatCurrency(quotation.subtotal), 170, finalY, { align: 'right' })
  
  doc.text(`Tax (${quotation.taxRate}%):`, 130, finalY + 6)
  doc.text(formatCurrency(quotation.taxAmount), 170, finalY + 6, { align: 'right' })
  
  if (quotation.discount > 0) {
    doc.text('Discount:', 130, finalY + 12)
    doc.text(`-${formatCurrency(quotation.discount)}`, 170, finalY + 12, { align: 'right' })
  }
  
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  const totalY = quotation.discount > 0 ? finalY + 18 : finalY + 12
  doc.text('Total:', 130, totalY)
  doc.text(formatCurrency(quotation.total), 170, totalY, { align: 'right' })
  
  // Terms & Notes
  if (quotation.terms || quotation.notes) {
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text('Terms & Conditions:', 15, totalY + 15)
    
    doc.setFont('helvetica', 'normal')
    if (quotation.terms) {
      const termsLines = doc.splitTextToSize(quotation.terms, 180)
      doc.text(termsLines, 15, totalY + 21)
    }
    
    if (quotation.notes) {
      doc.setFont('helvetica', 'bold')
      doc.text('Notes:', 15, totalY + 35)
      doc.setFont('helvetica', 'normal')
      const notesLines = doc.splitTextToSize(quotation.notes, 180)
      doc.text(notesLines, 15, totalY + 41)
    }
  }
  
  return doc
}

export function generateInvoicePDF(invoice: Invoice, company: CompanySettings) {
  const doc = new jsPDF()
  
  // Company Header
  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.text(company.name, 15, 20)
  
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text(company.address, 15, 28)
  doc.text(`${company.city} | ${company.phone}`, 15, 33)
  doc.text(company.email, 15, 38)
  if (company.taxId) {
    doc.text(`Tax ID: ${company.taxId}`, 15, 43)
  }
  
  // Invoice Title
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.text('INVOICE', 150, 20)
  
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text(`Invoice #: ${invoice.invoiceNumber}`, 150, 28)
  doc.text(`Date: ${formatDate(invoice.createdAt)}`, 150, 33)
  doc.text(`Due Date: ${formatDate(invoice.dueDate)}`, 150, 38)
  
  // Payment Status Badge
  doc.setFillColor(invoice.paymentStatus === 'paid' ? 34 : 
                   invoice.paymentStatus === 'partial' ? 234 : 220, 
                   invoice.paymentStatus === 'paid' ? 197 :
                   invoice.paymentStatus === 'partial' ? 88 : 38,
                   invoice.paymentStatus === 'paid' ? 94 : 12)
  doc.rect(148, 41, 32, 6, 'F')
  doc.setTextColor(255, 255, 255)
  doc.text(invoice.paymentStatus.toUpperCase(), 164, 45, { align: 'center' })
  doc.setTextColor(0, 0, 0)
  
  // Client Information
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('Bill To:', 15, 55)
  
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  if (invoice.client) {
    doc.text(invoice.client.name, 15, 61)
    doc.text(invoice.client.address, 15, 66)
    doc.text(`${invoice.client.city} | ${invoice.client.phone}`, 15, 71)
    doc.text(invoice.client.email, 15, 76)
  }
  
  // Project Info
  if (invoice.project) {
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.text('Project:', 15, 88)
    
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text(invoice.project.name, 15, 94)
    doc.text(invoice.project.location, 15, 99)
  }
  
  // Items Table
  const tableData = invoice.items.map(item => [
    item.itemName,
    item.description || '-',
    item.quantity.toString(),
    formatCurrency(item.rate),
    formatCurrency(item.amount)
  ])
  
  autoTable(doc, {
    startY: 110,
    head: [['Item', 'Description', 'Quantity', 'Rate', 'Amount']],
    body: tableData,
    theme: 'striped',
    headStyles: { fillColor: [234, 88, 12] },
  })
  
  // Totals
  const finalY = (doc as any).lastAutoTable.finalY + 10
  
  doc.setFontSize(10)
  doc.text('Subtotal:', 130, finalY)
  doc.text(formatCurrency(invoice.subtotal), 170, finalY, { align: 'right' })
  
  doc.text(`Tax (${invoice.taxRate}%):`, 130, finalY + 6)
  doc.text(formatCurrency(invoice.taxAmount), 170, finalY + 6, { align: 'right' })
  
  if (invoice.discount > 0) {
    doc.text('Discount:', 130, finalY + 12)
    doc.text(`-${formatCurrency(invoice.discount)}`, 170, finalY + 12, { align: 'right' })
  }
  
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  let totalY = invoice.discount > 0 ? finalY + 18 : finalY + 12
  doc.text('Total Amount:', 130, totalY)
  doc.text(formatCurrency(invoice.total), 170, totalY, { align: 'right' })
  
  totalY += 6
  doc.setFontSize(10)
  doc.text('Amount Paid:', 130, totalY)
  doc.text(formatCurrency(invoice.amountPaid), 170, totalY, { align: 'right' })
  
  totalY += 6
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.text('Balance Due:', 130, totalY)
  doc.text(formatCurrency(invoice.total - invoice.amountPaid), 170, totalY, { align: 'right' })
  
  // Bank Details
  if (company.bankName && company.accountNumber) {
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text('Bank Details:', 15, totalY + 15)
    
    doc.setFont('helvetica', 'normal')
    doc.text(`Bank: ${company.bankName}`, 15, totalY + 21)
    doc.text(`Account: ${company.accountNumber}`, 15, totalY + 26)
  }
  
  // Payment Terms & Notes
  if (invoice.paymentTerms || invoice.notes) {
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text('Payment Terms:', 15, totalY + 38)
    
    doc.setFont('helvetica', 'normal')
    if (invoice.paymentTerms) {
      const termsLines = doc.splitTextToSize(invoice.paymentTerms, 180)
      doc.text(termsLines, 15, totalY + 44)
    }
    
    if (invoice.notes) {
      doc.setFont('helvetica', 'bold')
      doc.text('Notes:', 15, totalY + 58)
      doc.setFont('helvetica', 'normal')
      const notesLines = doc.splitTextToSize(invoice.notes, 180)
      doc.text(notesLines, 15, totalY + 64)
    }
  }
  
  return doc
}

export function downloadQuotationPDF(quotation: Quotation, company: CompanySettings) {
  const doc = generateQuotationPDF(quotation, company)
  doc.save(`Quotation-${quotation.quotationNumber}.pdf`)
}

export function downloadInvoicePDF(invoice: Invoice, company: CompanySettings) {
  const doc = generateInvoicePDF(invoice, company)
  doc.save(`Invoice-${invoice.invoiceNumber}.pdf`)
}
