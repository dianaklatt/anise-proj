"use client"

import type { MatchResult } from "@/types"
import { ProviderCard } from "@/components/provider-card"
import { Button } from "@/components/ui/button"

interface ResultsProps {
  results: MatchResult[]
  onReset: () => void
}

export function Results({ results, onReset }: ResultsProps) {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-center bg-primary text-white p-6 rounded-lg">
        <div>
          <h2 className="text-2xl font-bold">Your Matches</h2>
          <p className="text-white/80">We found {results.length} therapists that match your preferences</p>
        </div>
        <Button variant="outline" onClick={onReset} className="bg-white text-primary hover:bg-white/90">
          Start Over
        </Button>
      </div>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((result, index) => (
            <ProviderCard
              key={index}
              provider={result.provider}
              matchReasons={result.matchReasons}
              score={result.score}
            />
          ))}
        </div>
      ) : (
        <div className="text-center p-12 bg-secondary rounded-lg">
          <h3 className="text-xl font-medium mb-2 text-primary">No matches found</h3>
          <p className="text-muted-foreground">
            We couldn't find any providers matching your criteria. Please try adjusting your preferences.
          </p>
          <Button onClick={onReset} className="mt-4 bg-primary text-white">
            Try Again
          </Button>
        </div>
      )}
    </div>
  )
}

