"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MultiSelect } from "@/components/multi-select"
import type { PatientPreferences } from "@/types"
import { allEthnicityOptions } from "@/lib/ethnicity-options"

const areasOfConcernOptions = [
  "Anxiety",
  "Depression",
  "Racial identity related issues",
  "Academic stress",
  "Trauma-related stress",
  "Work-related stress",
  "Insomnia",
  "ADHD",
  "Eating Disorders",
  "Relationship difficulties",
  "Low self-esteem",
  "LGBTQ+ related concerns",
  "Panic attacks",
  "Anger Management",
  "Grief and loss",
  "Substance use",
  "Addiction",
  "Bipolar disorder",
  "OCD",
  "PTSD",
  "Phobias",
  "Body image issues",
  "Self-harm",
  "Suicidal thoughts",
  "Family conflicts",
  "Parenting issues",
  "Cultural adjustment",
  "Immigration stress",
  "Identity development",
]

const treatmentModalityOptions = [
  "Cognitive Behavioral Therapy (CBT)",
  "Dialectical Behavior Therapy (DBT)",
  "Acceptance and Commitment Therapy (ACT)",
  "EMDR",
  "Mindfulness-Based (MBCT)",
  "Trauma Focused CBT",
  "Motivational Interviewing",
  "Psychodynamic Therapy",
  "Solution-Focused Brief Therapy",
  "Narrative Therapy",
  "Family Systems Therapy",
  "Interpersonal Therapy",
  "Humanistic Therapy",
  "Existential Therapy",
  "Gestalt Therapy",
  "Art Therapy",
  "Play Therapy",
]

// Demographics broken down by category
const genderIdentityOptions = [
  "Male",
  "Female",
  "Non-binary",
  "Transgender",
  "Gender non-conforming",
  "Genderqueer",
  "Genderfluid",
  "Agender",
  "Questioning",
  "Prefer not to say",
]

const sexualOrientationOptions = [
  "Heterosexual/Straight",
  "Gay",
  "Lesbian",
  "Bisexual",
  "Pansexual",
  "Asexual",
  "Queer",
  "Questioning",
  "Prefer not to say",
]

const religiousBackgroundOptions = [
  "Christian",
  "Catholic",
  "Protestant",
  "Orthodox",
  "Muslim",
  "Sunni",
  "Shia",
  "Hindu",
  "Buddhist",
  "Sikh",
  "Jain",
  "Jewish",
  "Baha'i",
  "Taoist",
  "Shinto",
  "Confucian",
  "Zoroastrian",
  "Atheist",
  "Agnostic",
  "Spiritual but not religious",
  "Prefer not to say",
]

const familyStatusOptions = [
  "Single",
  "In a relationship",
  "Engaged",
  "Married",
  "Divorced",
  "Separated",
  "Widowed",
  "Parent",
  "Expecting parent",
  "Empty nester",
  "Caregiver",
  "Prefer not to say",
]

const immigrationStatusOptions = [
  "US-born",
  "Immigrant",
  "First-generation",
  "Second-generation",
  "Third-generation",
  "International student",
  "Refugee",
  "Asylum seeker",
  "Expatriate",
  "Prefer not to say",
]

const occupationOptions = [
  "Student",
  "Graduate student",
  "Professional",
  "Healthcare worker",
  "Essential worker",
  "Entrepreneur",
  "Artist",
  "Retired",
  "Unemployed",
  "Military/Veteran",
  "Prefer not to say",
]

const locationOptions = [
  "CA",
  "NY",
  "TX",
  "FL",
  "IL",
  "PA",
  "OH",
  "GA",
  "NC",
  "MI",
  "NJ",
  "VA",
  "WA",
  "AZ",
  "MA",
  "TN",
  "IN",
  "MO",
  "MD",
  "WI",
  "CO",
  "MN",
  "SC",
  "AL",
  "LA",
  "KY",
  "OR",
  "OK",
  "CT",
  "UT",
  "IA",
  "NV",
  "AR",
  "MS",
  "KS",
  "NM",
  "NE",
  "WV",
  "ID",
  "HI",
  "NH",
  "ME",
  "MT",
  "RI",
  "DE",
  "SD",
  "ND",
  "AK",
  "DC",
  "VT",
  "WY",
]

const paymentMethodOptions = [
  "Aetna",
  "Magellan",
  "Anthem",
  "Blue Cross",
  "Cigna",
  "United Healthcare",
  "Kaiser",
  "Medicare",
  "Medicaid",
  "Self-pay",
  "Optum",
  "Humana",
  "Tricare",
  "Health Net",
  "Beacon Health Options",
  "Centene",
  "Molina Healthcare",
  "Ambetter",
  "Oscar Health",
  "Bright Health",
  "Clover Health",
  "Sliding scale",
]

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

const timeSlots = [
  "Early Morning (6AM-9AM)",
  "Morning (9AM-12PM)",
  "Afternoon (12PM-4PM)",
  "Late Afternoon (4PM-6PM)",
  "Evening (6PM-9PM)",
  "Night (9PM-11PM)",
]

interface PatientFormProps {
  onSubmit: (data: PatientPreferences) => void
}

export function PatientForm({ onSubmit }: PatientFormProps) {
  const [areasOfConcern, setAreasOfConcern] = useState<string[]>([])
  const [preferredTreatmentModality, setPreferredTreatmentModality] = useState<string[]>([])

  // Demographics broken down by category
  const [genderIdentity, setGenderIdentity] = useState<string[]>([])
  const [sexualOrientation, setSexualOrientation] = useState<string[]>([])
  const [religiousBackground, setReligiousBackground] = useState<string[]>([])
  const [familyStatus, setFamilyStatus] = useState<string[]>([])
  const [immigrationStatus, setImmigrationStatus] = useState<string[]>([])
  const [occupation, setOccupation] = useState<string[]>([])

  // Changed from string to string[]
  const [therapistGender, setTherapistGender] = useState<string[]>([])
  const [therapistEthnicity, setTherapistEthnicity] = useState<string[]>([])
  const [therapistReligion, setTherapistReligion] = useState<string[]>([])

  const [location, setLocation] = useState<string>("CA")
  const [paymentMethod, setPaymentMethod] = useState<string>("Self-pay")
  const [error, setError] = useState<string | null>(null)
  const [preferredDays, setPreferredDays] = useState<string[]>([])
  const [preferredTimes, setPreferredTimes] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (areasOfConcern.length === 0) {
      setError("Please select at least one area of concern")
      return
    }

    if (preferredTreatmentModality.length === 0) {
      setError("Please select at least one treatment modality")
      return
    }

    // Combine all demographics into a single array for the API
    const demographics = [
      ...genderIdentity,
      ...sexualOrientation,
      ...religiousBackground,
      ...familyStatus,
      ...immigrationStatus,
      ...occupation,
    ]

    const patientPreferences: PatientPreferences = {
      areasOfConcern,
      preferredTreatmentModality,
      demographics,
      therapistPreferences: {
        gender: therapistGender,
        ethnicity: therapistEthnicity,
        religion: therapistReligion,
      },
      location,
      paymentMethod,
      timing: {
        preferredDays,
        preferredTimes,
      },
      demographicDetails: {
        genderIdentity,
        sexualOrientation,
        religiousBackground,
        familyStatus,
        immigrationStatus,
        occupation,
      },
    }

    onSubmit(patientPreferences)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto border-0 shadow-lg overflow-hidden">
      <CardHeader className="bg-primary text-white py-8 px-6">
        <CardTitle className="text-2xl md:text-3xl">Find Your Ideal Therapist</CardTitle>
        <CardDescription className="text-white/90 text-lg">
          Tell us about your needs and preferences to find the best match
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-8 pt-8 px-6">
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}

          {/* Patient Information Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-primary">Patient Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label htmlFor="areasOfConcern" className="text-lg font-medium">
                  Areas of Concern
                </Label>
                <MultiSelect
                  options={areasOfConcernOptions}
                  selected={areasOfConcern}
                  onChange={setAreasOfConcern}
                  placeholder="Select areas of concern..."
                />
                <p className="text-sm text-muted-foreground">Select the issues you'd like help with</p>
              </div>

              <div className="space-y-3">
                <Label htmlFor="preferredTreatmentModality" className="text-lg font-medium">
                  Preferred Treatment Approach
                </Label>
                <MultiSelect
                  options={treatmentModalityOptions}
                  selected={preferredTreatmentModality}
                  onChange={setPreferredTreatmentModality}
                  placeholder="Select treatment approaches..."
                />
                <p className="text-sm text-muted-foreground">Select therapy approaches you prefer</p>
              </div>
            </div>
          </div>

          {/* Demographics Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-primary">Your Demographics</h3>
            <div className="bg-secondary/50 p-4 rounded-md mb-4">
              <p className="text-sm">
                We're asking for this information to help match you with a therapist who understands your unique
                background and experiences. Please share only what you're comfortable with - all fields are optional and
                multi-select.
              </p>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              All fields are multi-select. Choose all that apply to you.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label htmlFor="genderIdentity" className="text-lg font-medium">
                  Gender Identity
                </Label>
                <MultiSelect
                  options={genderIdentityOptions}
                  selected={genderIdentity}
                  onChange={setGenderIdentity}
                  placeholder="Select gender identities..."
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="sexualOrientation" className="text-lg font-medium">
                  Sexual Orientation
                </Label>
                <MultiSelect
                  options={sexualOrientationOptions}
                  selected={sexualOrientation}
                  onChange={setSexualOrientation}
                  placeholder="Select sexual orientations..."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label htmlFor="religiousBackground" className="text-lg font-medium">
                  Religious Background
                </Label>
                <MultiSelect
                  options={religiousBackgroundOptions}
                  selected={religiousBackground}
                  onChange={setReligiousBackground}
                  placeholder="Select religious backgrounds..."
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="familyStatus" className="text-lg font-medium">
                  Family Status
                </Label>
                <MultiSelect
                  options={familyStatusOptions}
                  selected={familyStatus}
                  onChange={setFamilyStatus}
                  placeholder="Select family statuses..."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label htmlFor="immigrationStatus" className="text-lg font-medium">
                  Immigration Status
                </Label>
                <MultiSelect
                  options={immigrationStatusOptions}
                  selected={immigrationStatus}
                  onChange={setImmigrationStatus}
                  placeholder="Select immigration statuses..."
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="occupation" className="text-lg font-medium">
                  Occupation
                </Label>
                <MultiSelect
                  options={occupationOptions}
                  selected={occupation}
                  onChange={setOccupation}
                  placeholder="Select occupations..."
                />
              </div>
            </div>
          </div>

          {/* Therapist Preferences Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-primary">Therapist Preferences</h3>
            <div className="bg-secondary/50 p-4 rounded-md mb-4">
              <p className="text-sm">
                All therapist preference fields are multi-select. Choose all options that you would be comfortable with.
              </p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label htmlFor="therapistGender" className="text-lg font-medium">
                    Preferred Gender
                  </Label>
                  <MultiSelect
                    options={genderIdentityOptions}
                    selected={therapistGender}
                    onChange={setTherapistGender}
                    placeholder="Select gender preferences..."
                  />
                  <p className="text-sm text-muted-foreground">Select all genders you'd be comfortable with</p>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="therapistReligion" className="text-lg font-medium">
                    Preferred Religious Background
                  </Label>
                  <MultiSelect
                    options={religiousBackgroundOptions}
                    selected={therapistReligion}
                    onChange={setTherapistReligion}
                    placeholder="Select religious preferences..."
                  />
                  <p className="text-sm text-muted-foreground">
                    Select all religious backgrounds you'd be comfortable with
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="therapistEthnicity" className="text-lg font-medium">
                  Preferred Ethnicity
                </Label>
                <MultiSelect
                  options={allEthnicityOptions}
                  selected={therapistEthnicity}
                  onChange={setTherapistEthnicity}
                  placeholder="Select ethnicity preferences..."
                />
                <p className="text-sm text-muted-foreground">Select all ethnicities you'd be comfortable with</p>
              </div>
            </div>
          </div>

          {/* Scheduling Preferences Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-primary">Scheduling Preferences</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label htmlFor="preferredDays" className="text-lg font-medium">
                  Preferred Days
                </Label>
                <MultiSelect
                  options={daysOfWeek}
                  selected={preferredDays}
                  onChange={setPreferredDays}
                  placeholder="Select preferred days..."
                />
                <p className="text-sm text-muted-foreground">Select the days you're available for sessions</p>
              </div>

              <div className="space-y-3">
                <Label htmlFor="preferredTimes" className="text-lg font-medium">
                  Preferred Times
                </Label>
                <MultiSelect
                  options={timeSlots}
                  selected={preferredTimes}
                  onChange={setPreferredTimes}
                  placeholder="Select preferred times..."
                />
                <p className="text-sm text-muted-foreground">Select the times that work best for you</p>
              </div>
            </div>
          </div>

          {/* Location and Payment Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-primary">Location & Payment</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label htmlFor="location" className="text-lg font-medium">
                  Your Location
                </Label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locationOptions.map((loc) => (
                      <SelectItem key={loc} value={loc}>
                        {loc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="paymentMethod" className="text-lg font-medium">
                  Payment Method
                </Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentMethodOptions.map((method) => (
                      <SelectItem key={method} value={method}>
                        {method}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="bg-secondary py-6 px-6">
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-lg">
            Find My Matches
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

