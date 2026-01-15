import { NextResponse } from 'next/server'
import { getDeletionRequests, addDeletionRequest, updateDeletionRequest, deleteDeletionRequest, deleteQuotation, deleteInvoice, getQuotationById, getInvoiceById } from '@/lib/db'
import { DeletionRequest } from '@/types'

export async function GET() {
  try {
    const requests = getDeletionRequests()
    return NextResponse.json(requests)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch deletion requests' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const deletionRequest: DeletionRequest = {
      ...body,
      id: `del-req-${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }
    addDeletionRequest(deletionRequest)
    return NextResponse.json(deletionRequest, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create deletion request' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, status, reviewNotes, reviewedBy } = body
    
    // Update the deletion request
    updateDeletionRequest(id, {
      status,
      reviewNotes,
      reviewedBy,
      reviewedAt: new Date().toISOString(),
    })
    
    // If approved, delete the actual item
    if (status === 'approved') {
      const deletionRequest = getDeletionRequests().find(r => r.id === id)
      if (deletionRequest) {
        if (deletionRequest.type === 'quotation') {
          deleteQuotation(deletionRequest.itemId)
        } else if (deletionRequest.type === 'invoice') {
          deleteInvoice(deletionRequest.itemId)
        }
      }
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update deletion request' },
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
        { error: 'Request ID is required' },
        { status: 400 }
      )
    }
    deleteDeletionRequest(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete request' },
      { status: 500 }
    )
  }
}
