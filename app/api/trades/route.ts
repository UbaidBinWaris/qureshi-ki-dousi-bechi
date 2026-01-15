import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'trades.json')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const trades = JSON.parse(fileContents)
    return NextResponse.json(trades)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch trades' },
      { status: 500 }
    )
  }
}
