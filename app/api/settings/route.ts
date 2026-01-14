import { NextResponse } from 'next/server'
import { getCompanySettings } from '@/lib/db'

export async function GET() {
  try {
    const settings = getCompanySettings()
    return NextResponse.json(settings)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch company settings' },
      { status: 500 }
    )
  }
}
