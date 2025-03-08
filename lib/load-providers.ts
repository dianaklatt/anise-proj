import type { Provider } from "@/types"
import { parseCSV } from "./csv-parser"

// URL to the providers CSV file
const PROVIDERS_CSV_URL =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/providers-vU5KOLsFkmzVNmeuPjTlEYoA1j5Nkw.csv"

export async function loadProviders(): Promise<Provider[]> {
  try {
    // Fetch the CSV file
    const response = await fetch(PROVIDERS_CSV_URL)

    if (!response.ok) {
      throw new Error(`Failed to fetch providers: ${response.status} ${response.statusText}`)
    }

    // Get the CSV text
    const csvText = await response.text()

    // Parse the CSV
    const providers = parseCSV(csvText)

    // Clean and validate the data
    return providers.filter(
      (provider) => provider["First Name"] && provider["Last Name"] && provider["Ethnic Identity"],
    ) as Provider[]
  } catch (error) {
    console.error("Error loading providers:", error)

    // Return empty array in case of error
    return []
  }
}

