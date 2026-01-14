import { NextResponse } from 'next/server'
import { getMaterials, getLabor } from '@/lib/db'

export async function GET() {
  try {
    const materials = getMaterials()
    const labor = getLabor()
    return NextResponse.json({ materials, labor })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch materials' },
      { status: 500 }
    )
  }
}
