import type { Provider } from "@/types"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProviderCardProps {
  provider: Provider
  matchReasons: string[]
  score: number
}

export function ProviderCard({ provider, matchReasons, score }: ProviderCardProps) {
  return (
    <Card className="w-full h-full border-0 shadow-md overflow-hidden">
      <CardHeader className="pb-2 border-b bg-secondary/30">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl text-primary">
              {provider["First Name"]} {provider["Last Name"]}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {provider["Gender Identity"]} • {provider["Location"]}
              {provider["Language"] && ` • ${provider["Language"]}`}
            </CardDescription>
          </div>
          <Badge variant="outline" className="bg-primary/10 text-primary font-medium">
            Match Score: {score}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        <div>
          <h4 className="font-medium mb-1 text-primary">Bio</h4>
          <p className="text-sm text-muted-foreground">{provider["Bio"] || "No bio provided"}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-1 text-primary">Ethnic Identity</h4>
            <p className="text-sm text-muted-foreground">{provider["Ethnic Identity"]}</p>
          </div>
          <div>
            <h4 className="font-medium mb-1 text-primary">Religious Background</h4>
            <p className="text-sm text-muted-foreground">{provider["Religious Background"] || "Not specified"}</p>
          </div>
        </div>

        {provider["Sexual Orientation"] && (
          <div>
            <h4 className="font-medium mb-1 text-primary">Sexual Orientation</h4>
            <p className="text-sm text-muted-foreground">{provider["Sexual Orientation"]}</p>
          </div>
        )}

        <div>
          <h4 className="font-medium mb-1 text-primary">Treatment Modalities</h4>
          <div className="flex flex-wrap gap-1">
            {(provider["Treatment Modality"] || "")
              .split("\n")
              .filter(Boolean)
              .map((modality, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {modality.trim()}
                </Badge>
              ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-1 text-primary">Areas of Specialization</h4>
          <div className="flex flex-wrap gap-1">
            {(provider["Areas of Specialization"] || "")
              .split(",")
              .filter(Boolean)
              .map((area, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {area.trim()}
                </Badge>
              ))}
          </div>
        </div>

        {provider["No Of Clients Able To Take On"] && (
          <div>
            <h4 className="font-medium mb-1 text-primary">Availability</h4>
            <p className="text-sm text-muted-foreground">
              Can take on {provider["No Of Clients Able To Take On"]} new clients
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="bg-secondary/50 flex flex-col items-start">
        <h4 className="font-medium mb-2 text-primary">Why we matched you</h4>
        {matchReasons.length > 0 ? (
          <ul className="text-sm list-disc pl-5 space-y-1">
            {matchReasons.map((reason, index) => (
              <li key={index}>{reason}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">This provider generally matches your preferences.</p>
        )}
      </CardFooter>
    </Card>
  )
}

