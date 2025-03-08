"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { PatientForm } from "@/components/patient-form"
import { Results } from "@/components/results"
import { LoadingState } from "@/components/loading-state"
import { ErrorState } from "@/components/error-state"
import type { PatientPreferences, MatchResult } from "@/types"
import { loadProviders } from "@/lib/load-providers"

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<MatchResult[]>([])
  const [showResults, setShowResults] = useState(false)
  const [dataLoaded, setDataLoaded] = useState(false)

  // Check if providers data can be loaded on initial render
  useEffect(() => {
    const checkDataAccess = async () => {
      try {
        const providers = await loadProviders()
        if (providers.length === 0) {
          setError("No provider data available. Please check your connection and try again.")
        } else {
          setDataLoaded(true)
        }
      } catch (err) {
        console.error("Error checking data access:", err)
        setError("Failed to access provider data. Please check your connection and try again.")
      }
    }

    checkDataAccess()
  }, [])

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
    setError(null)
  }

  const handleRetry = () => {
    setError(null)
    window.location.reload()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {!showResults && <HeroSection />}

      <main className="flex-1 container mx-auto py-12 px-4">
        {error ? (
          <ErrorState message={error} onRetry={handleRetry} />
        ) : loading ? (
          <LoadingState message={showResults ? "Finding your matches..." : "Loading..."} />
        ) : !dataLoaded ? (
          <LoadingState message="Loading provider data..." />
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

