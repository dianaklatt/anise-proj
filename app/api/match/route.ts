import { type NextRequest, NextResponse } from "next/server"
import { fetchProviders } from "@/lib/providers"
import { matchProviders } from "@/lib/matching"
import type { PatientPreferences } from "@/types"

export async function POST(request: NextRequest) {
  try {
    const preferences: PatientPreferences = await request.json()

    // Validate the input
    if (!preferences.areasOfConcern || !preferences.location || !preferences.paymentMethod) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Fetch providers
    const providers = await fetchProviders()

    if (!providers || providers.length === 0) {
      return NextResponse.json({ error: "No providers available" }, { status: 500 })
    }

    // Match providers
    const matches = matchProviders(providers, preferences)

    return NextResponse.json({ matches })
  } catch (error) {
    console.error("Error in match API:", error)
    return NextResponse.json({ error: "Failed to process matching request" }, { status: 500 })
  }
}

