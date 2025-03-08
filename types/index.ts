export interface PatientPreferences {
  areasOfConcern: string[]
  preferredTreatmentModality: string[]
  demographics: string[]
  therapistPreferences: {
    gender: string[] // Changed from string to string[]
    ethnicity: string[]
    religion: string[] // Changed from string to string[]
  }
  location: string
  paymentMethod: string
  timing: {
    preferredDays: string[]
    preferredTimes: string[]
  }
  demographicDetails: {
    genderIdentity: string[]
    sexualOrientation: string[]
    religiousBackground: string[]
    familyStatus: string[]
    immigrationStatus: string[]
    occupation: string[]
  }
}

export interface Provider {
  "First Name": string
  "Last Name": string
  "Ethnic Identity": string
  "Gender Identity": string
  "No Of Clients Able To Take On"?: string
  Language?: string
  Location: string
  Bio: string
  "Sexual Orientation"?: string
  "Religious Background"?: string
  "Treatment Modality": string
  "Areas of Specialization": string
  "Payment Methods"?: string
  Availability?: string
}

export interface MatchResult {
  provider: Provider
  matchReasons: string[]
  score: number
}

