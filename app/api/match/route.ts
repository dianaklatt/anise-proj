import { NextResponse } from "next/server"
import { loadProviders } from "@/lib/load-providers"
import { matchProviders } from "@/lib/matching"
import type { PatientPreferences } from "@/types"

export async function POST(request: Request) {
  try {
    // Parse the request body
    const preferences: PatientPreferences = await request.json()

    // Load providers from our mock data
    const providers = await loadProviders()

    // Match providers based on preferences
    const matches = matchProviders(providers, preferences)

    // Return the matches
    return NextResponse.json({ matches })
  } catch (error) {
    console.error("Error in match API:", error)
    return NextResponse.json({ error: "Failed to match providers" }, { status: 500 })
  }
}

