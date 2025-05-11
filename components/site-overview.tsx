"use client"

import { MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

type Site = {
  id: string
  name: string
  location: string
  activeMissions: number
  totalDrones: number
  lastSurvey: string
  coveragePercent: number
}

export function SiteOverview() {
  const { toast } = useToast()

  const sites: Site[] = [
    {
      id: "site1",
      name: "New York Headquarters",
      location: "New York, NY",
      activeMissions: 2,
      totalDrones: 5,
      lastSurvey: "Today, 9:15 AM",
      coveragePercent: 85,
    },
    {
      id: "site2",
      name: "Chicago Manufacturing Facility",
      location: "Chicago, IL",
      activeMissions: 1,
      totalDrones: 4,
      lastSurvey: "Yesterday, 2:30 PM",
      coveragePercent: 70,
    },
    {
      id: "site3",
      name: "Phoenix Solar Plant",
      location: "Phoenix, AZ",
      activeMissions: 1,
      totalDrones: 3,
      lastSurvey: "May 7, 11:00 AM",
      coveragePercent: 90,
    },
    {
      id: "site4",
      name: "Seattle Construction Project",
      location: "Seattle, WA",
      activeMissions: 0,
      totalDrones: 2,
      lastSurvey: "May 6, 10:45 AM",
      coveragePercent: 60,
    },
    {
      id: "site5",
      name: "Boston Research Campus",
      location: "Boston, MA",
      activeMissions: 0,
      totalDrones: 2,
      lastSurvey: "May 5, 3:20 PM",
      coveragePercent: 75,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {sites.map((site) => (
        <Card key={site.id}>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">{site.name}</h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>{site.location}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <div className="text-muted-foreground">Active Missions</div>
                  <div className="font-medium">{site.activeMissions}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Total Drones</div>
                  <div className="font-medium">{site.totalDrones}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-muted-foreground">Last Survey</div>
                  <div className="font-medium">{site.lastSurvey}</div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Site Coverage</span>
                  <span>{site.coveragePercent}%</span>
                </div>
                <Progress value={site.coveragePercent} className="h-2" />
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    toast({
                      title: "New Mission",
                      description: `Creating a new mission for ${site.name}`,
                    })
                  }}
                >
                  New Mission
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    toast({
                      title: "Site Details",
                      description: `Viewing details for ${site.name}`,
                    })
                  }}
                >
                  View Details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
