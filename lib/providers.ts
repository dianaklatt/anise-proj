import Papa from "papaparse"
import type { Provider } from "@/types"

// This is a fallback in case the CSV fetch fails
const MOCK_PROVIDERS: Provider[] = [
  {
    "First Name": "Geri",
    "Last Name": "Charles",
    "Ethnic Identity": "South Asian- Mixed, Sri Lankan",
    "Gender Identity": "Female",
    "No Of Clients Able To Take On": "20",
    Language: "English",
    Location: "CA",
    Bio: "I'm passionate about supporting clients struggling with chronic pain or illness. By integrating mindfulness and cognitive-behavioral strategies, I help individuals cope with their symptoms and lead fulfilling lives despite physical challenges.",
    "Sexual Orientation": "Gay / lesbian",
    "Religious Background": "Muslim",
    "Treatment Modality":
      "Acceptance and Commitment Therapy (ACT)\nCBT\nMindfulness-Based (MBCT)\nTrauma Focused CBT\nMotivational Interviewing",
    "Areas of Specialization":
      "Academic stress, Anger Management, Anxiety, ADHD, Depression, Culturally-responsive treatments, Impulse-control difficulties, Ethnicity and racial identity related issues and/or trauma, Eating Disorders, Interpersonal problems, Low self-esteem, LGBTQ+ related concerns, Relationship difficulties, Work-related stress, Major life transitions, Trauma-related stress, Panic attacks, Worry",
  },
  {
    "First Name": "Sarah",
    "Last Name": "Kim",
    "Ethnic Identity": "East Asian, Korean",
    "Gender Identity": "Female",
    "No Of Clients Able To Take On": "15",
    Language: "English, Korean",
    Location: "NY",
    Bio: "I specialize in helping clients navigate cultural identity issues and intergenerational trauma. My approach combines traditional therapy techniques with cultural sensitivity to create a safe space for healing.",
    "Sexual Orientation": "Heterosexual",
    "Religious Background": "Christian",
    "Treatment Modality": "CBT\nPsychodynamic\nNarrative Therapy\nSolution-Focused Brief Therapy",
    "Areas of Specialization":
      "Anxiety, Depression, Cultural identity issues, Intergenerational trauma, Family conflicts, Relationship difficulties, Work-related stress, Academic stress, Grief and loss, Life transitions",
  },
  {
    "First Name": "Raj",
    "Last Name": "Patel",
    "Ethnic Identity": "South Asian, Indian",
    "Gender Identity": "Male",
    "No Of Clients Able To Take On": "10",
    Language: "English, Hindi, Gujarati",
    Location: "TX",
    Bio: "As a therapist with over 15 years of experience, I help clients overcome anxiety, depression, and relationship challenges. I believe in a holistic approach that addresses mind, body, and spirit.",
    "Sexual Orientation": "Heterosexual",
    "Religious Background": "Hindu",
    "Treatment Modality": "CBT\nMindfulness-Based (MBCT)\nDialectical Behavior Therapy (DBT)\nEMDR",
    "Areas of Specialization":
      "Anxiety, Depression, Relationship issues, Work stress, Cultural adjustment, Immigration stress, Identity development, Trauma, Grief, Substance use",
  },
]

export async function fetchProviders(): Promise<Provider[]> {
  try {
    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/providers-7ER6xTkUOfRqdcssZTCVVEcUC4iM2E.csv",
    )
    if (!response.ok) {
      throw new Error("Failed to fetch CSV")
    }

    const csvText = await response.text()

    const result = Papa.parse<Provider>(csvText, {
      header: true,
      skipEmptyLines: true,
    })

    if (result.errors && result.errors.length > 0) {
      console.error("CSV parsing errors:", result.errors)
    }

    return result.data.filter((provider) => provider["First Name"] && provider["Last Name"])
  } catch (error) {
    console.error("Error fetching providers:", error)
    // Return mock data as fallback
    return MOCK_PROVIDERS
  }
}

