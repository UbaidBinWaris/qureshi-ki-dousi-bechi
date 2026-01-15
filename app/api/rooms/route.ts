import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'rooms.json')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const rooms = JSON.parse(fileContents)
    return NextResponse.json(rooms)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch room templates' },
      { status: 500 }
    )
  }
}
