import { NextResponse } from 'next/server'
import { getQuotations, addQuotation, updateQuotation, deleteQuotation, getNextQuotationNumber } from '@/lib/db'
import { Quotation } from '@/types'

export async function GET() {
  try {
    const quotations = getQuotations()
    return NextResponse.json(quotations)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch quotations' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const quotation: Quotation = {
      ...body,
      id: `quotation-${Date.now()}`,
      quotationNumber: body.quotationNumber || getNextQuotationNumber(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    addQuotation(quotation)
    return NextResponse.json(quotation, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create quotation' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, ...updates } = body
    updateQuotation(id, { ...updates, updatedAt: new Date().toISOString() })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update quotation' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json(
        { error: 'Quotation ID is required' },
        { status: 400 }
      )
    }
    deleteQuotation(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete quotation' },
      { status: 500 }
    )
  }
}
