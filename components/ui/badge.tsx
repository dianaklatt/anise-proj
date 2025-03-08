"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { PatientForm } from "@/components/patient-form"
import { Results } from "@/components/results"
import type { PatientPreferences, MatchResult } from "@/types"

// Mock data for initial testing
const mockResults: MatchResult[] = []

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<MatchResult[]>(mockResults)
  const [showResults, setShowResults] = useState(false)

  const handleSubmit = async (preferences: PatientPreferences) => {
    setLoading(true)
    try {
      const response = await fetch("/api/match", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preferences),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch matches")
      }

      const data = await response.json()
      setResults(data.matches)
      setShowResults(true)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch (err) {
      console.error(err)
      setError("Failed to find matches. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setShowResults(false)
    setResults([])
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {!showResults && <HeroSection />}

      <main className="flex-1 container mx-auto py-12 px-4">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="bg-destructive/10 text-destructive p-4 rounded-md">{error}</div>
        ) : showResults ? (
          <Results results={results} onReset={handleReset} />
        ) : (
          <PatientForm onSubmit={handleSubmit} />
        )}
      </main>

      <footer className="bg-primary text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg">© {new Date().getFullYear()} Anise Health. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

