// A simple CSV parser utility
export function parseCSV(csvText: string): any[] {
  // Split the CSV text into lines
  const lines = csvText.split("\n")

  // Extract the header row
  const headers = lines[0].split(",").map((header) => header.trim().replace(/^"|"$/g, ""))

  // Parse each data row
  const results = []
  for (let i = 1; i < lines.length; i++) {
    // Skip empty lines
    if (!lines[i].trim()) continue

    const values = parseCSVLine(lines[i])

    // Create an object with the header as keys
    const obj: Record<string, string> = {}
    headers.forEach((header, index) => {
      if (header) {
        // Skip empty headers
        obj[header] = values[index] ? values[index].trim() : ""
      }
    })

    results.push(obj)
  }

  return results
}

// Helper function to parse a CSV line, handling quoted values with commas
function parseCSVLine(line: string): string[] {
  const result = []
  let current = ""
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]

    if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === "," && !inQuotes) {
      result.push(current)
      current = ""
    } else {
      current += char
    }
  }

  // Add the last value
  result.push(current)

  return result.map((value) => value.replace(/^"|"$/g, ""))
}

