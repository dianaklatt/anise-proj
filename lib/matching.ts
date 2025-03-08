import type { Provider, PatientPreferences, MatchResult } from "@/types"

// Function to calculate a match score based on preferences
function calculateMatchScore(provider: Provider, preferences: PatientPreferences): number {
  let score = 0

  // Check for areas of concern match
  if (preferences.areasOfConcern && preferences.areasOfConcern.length > 0) {
    const providerAreas = (provider["Areas of Specialization"] || "").split(",").map((area) => area.trim()) || []
    const matchedAreas = preferences.areasOfConcern.filter((area) =>
      providerAreas.some((providerArea) => providerArea.toLowerCase().includes(area.toLowerCase())),
    )
    score += matchedAreas.length * 2 // Weight areas of concern highly
  }

  // Check for treatment modality match
  if (preferences.preferredTreatmentModality && preferences.preferredTreatmentModality.length > 0) {
    const providerModalities =
      (provider["Treatment Modality"] || "").split("\n").map((modality) => modality.trim()) || []
    const matchedModalities = preferences.preferredTreatmentModality.filter((modality) =>
      providerModalities.some((providerModality) => providerModality.toLowerCase().includes(modality.toLowerCase())),
    )
    score += matchedModalities.length * 2 // Weight treatment modalities highly
  }

  // Check for gender match - updated for multi-select
  if (preferences.therapistPreferences.gender && preferences.therapistPreferences.gender.length > 0) {
    const providerGender = provider["Gender Identity"] || ""
    if (
      preferences.therapistPreferences.gender.some((gender) => providerGender.toLowerCase() === gender.toLowerCase())
    ) {
      score += 3 // Strong preference for gender match
    }
  }

  // Check for ethnicity match
  if (preferences.therapistPreferences.ethnicity && preferences.therapistPreferences.ethnicity.length > 0) {
    const providerEthnicities =
      (provider["Ethnic Identity"] || "").split(",").map((ethnicity) => ethnicity.trim()) || []
    const matchedEthnicities = preferences.therapistPreferences.ethnicity.filter((ethnicity) =>
      providerEthnicities.some((providerEthnicity) =>
        providerEthnicity.toLowerCase().includes(ethnicity.toLowerCase()),
      ),
    )
    score += matchedEthnicities.length * 3 // Strong preference for ethnicity match
  }

  // Check for religion match - updated for multi-select
  if (preferences.therapistPreferences.religion && preferences.therapistPreferences.religion.length > 0) {
    const providerReligion = provider["Religious Background"] || ""
    if (
      preferences.therapistPreferences.religion.some(
        (religion) => providerReligion.toLowerCase() === religion.toLowerCase(),
      )
    ) {
      score += 2
    }
  }

  // Check for location match
  if (preferences.location && provider["Location"] === preferences.location) {
    score += 3 // Strong preference for location match
  }

  return score
}

// Function to determine match reasons
function getMatchReasons(provider: Provider, preferences: PatientPreferences): string[] {
  const reasons: string[] = []

  // Check for areas of concern match
  if (preferences.areasOfConcern && preferences.areasOfConcern.length > 0) {
    const providerAreas = (provider["Areas of Specialization"] || "").split(",").map((area) => area.trim()) || []
    const matchedAreas = preferences.areasOfConcern.filter((area) =>
      providerAreas.some((providerArea) => providerArea.toLowerCase().includes(area.toLowerCase())),
    )
    if (matchedAreas.length > 0) {
      reasons.push(`Specializes in your concerns: ${matchedAreas.join(", ")}`)
    }
  }

  // Check for treatment modality match
  if (preferences.preferredTreatmentModality && preferences.preferredTreatmentModality.length > 0) {
    const providerModalities =
      (provider["Treatment Modality"] || "").split("\n").map((modality) => modality.trim()) || []
    const matchedModalities = preferences.preferredTreatmentModality.filter((modality) =>
      providerModalities.some((providerModality) => providerModality.toLowerCase().includes(modality.toLowerCase())),
    )
    if (matchedModalities.length > 0) {
      reasons.push(`Uses your preferred treatment approaches: ${matchedModalities.join(", ")}`)
    }
  }

  // Check for gender match - updated for multi-select
  if (preferences.therapistPreferences.gender && preferences.therapistPreferences.gender.length > 0) {
    const providerGender = provider["Gender Identity"] || ""
    if (
      preferences.therapistPreferences.gender.some((gender) => providerGender.toLowerCase() === gender.toLowerCase())
    ) {
      reasons.push(`Matches your preferred gender: ${provider["Gender Identity"]}`)
    }
  }

  // Check for ethnicity match
  if (preferences.therapistPreferences.ethnicity && preferences.therapistPreferences.ethnicity.length > 0) {
    const providerEthnicities =
      (provider["Ethnic Identity"] || "").split(",").map((ethnicity) => ethnicity.trim()) || []
    const matchedEthnicities = preferences.therapistPreferences.ethnicity.filter((ethnicity) =>
      providerEthnicities.some((providerEthnicity) =>
        providerEthnicity.toLowerCase().includes(ethnicity.toLowerCase()),
      ),
    )
    if (matchedEthnicities.length > 0) {
      reasons.push(`Matches your preferred ethnicity: ${matchedEthnicities.join(", ")}`)
    }
  }

  // Check for religion match - updated for multi-select
  if (preferences.therapistPreferences.religion && preferences.therapistPreferences.religion.length > 0) {
    const providerReligion = provider["Religious Background"] || ""
    if (
      preferences.therapistPreferences.religion.some(
        (religion) => providerReligion.toLowerCase() === religion.toLowerCase(),
      )
    ) {
      reasons.push(`Matches your preferred religious background: ${provider["Religious Background"]}`)
    }
  }

  // Check for location match
  if (preferences.location && provider["Location"] === preferences.location) {
    reasons.push(`Located in your preferred area: ${provider["Location"]}`)
  }

  return reasons
}

// Main function to match providers with patient preferences
export function matchProviders(providers: Provider[], preferences: PatientPreferences): MatchResult[] {
  const scoredProviders = providers.map((provider) => {
    const score = calculateMatchScore(provider, preferences)
    return { provider, score }
  })

  // Filter out providers with a score of 0
  const filteredProviders = scoredProviders.filter((scoredProvider) => scoredProvider.score > 0)

  // Sort providers by score in descending order
  const sortedProviders = filteredProviders.sort((a, b) => b.score - a.score)

  // Get match reasons for the top providers
  const topProviders = sortedProviders.slice(0, 5).map((scoredProvider) => {
    const matchReasons = getMatchReasons(scoredProvider.provider, preferences)
    return {
      provider: scoredProvider.provider,
      matchReasons: matchReasons,
      score: scoredProvider.score,
    }
  })

  return topProviders
}

