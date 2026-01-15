import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'additional-costs.json')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const costs = JSON.parse(fileContents)
    return NextResponse.json(costs)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch additional costs' },
      { status: 500 }
    )
  }
}
