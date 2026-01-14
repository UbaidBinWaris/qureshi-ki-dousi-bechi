import { NextResponse } from 'next/server'
import { getQuotations } from '@/lib/db'

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
