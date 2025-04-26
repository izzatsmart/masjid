import { NextResponse } from "next/server"

// This is a simple mock API for demonstration purposes
// In a real application, this would connect to a database

export async function GET() {
  // In a real app, fetch from database
  return NextResponse.json({
    title: "MAJLIS RUMAH TERBUKA @ JAMUAN HARI RAYA",
    location: "MASJID AL-HIDAYAH",
    venue: "KG. SUNGAI PENCHALA",
    date: "2025-04-13",
    timeStart: "10:00",
    timeEnd: "13:00",
    additionalInfo: "SEMUA JEMAAH & AHLI KARIAH DIJEMPUT HADIR",
  })
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.title || !data.location) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In a real app, save to database
    console.log("Saving announcement:", data)

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Error saving announcement:", error)
    return NextResponse.json({ error: "Failed to save announcement" }, { status: 500 })
  }
}
