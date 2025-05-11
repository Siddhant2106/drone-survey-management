"use client"

import { CheckCircle, Clock, Download, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

type Survey = {
  id: string
  name: string
  location: string
  date: string
  duration: string
  coverage: string
  drone: string
}

export function RecentSurveys() {
  const { toast } = useToast()

  const surveys: Survey[] = [
    {
      id: "s1",
      name: "Building Inspection - Tower B",
      location: "New York HQ",
      date: "Today, 9:15 AM",
      duration: "45 minutes",
      coverage: "100%",
      drone: "DJI-1001",
    },
    {
      id: "s2",
      name: "Warehouse Inventory Scan",
      location: "Chicago Facility",
      date: "Yesterday, 2:30 PM",
      duration: "1 hour 15 minutes",
      coverage: "95%",
      drone: "DJI-1002",
    },
    {
      id: "s3",
      name: "Solar Farm Inspection",
      location: "Phoenix Plant",
      date: "May 7, 11:00 AM",
      duration: "2 hours",
      coverage: "100%",
      drone: "DJI-1003",
    },
    {
      id: "s4",
      name: "Construction Progress Mapping",
      location: "Seattle Project",
      date: "May 6, 10:45 AM",
      duration: "1 hour 30 minutes",
      coverage: "98%",
      drone: "DJI-1004",
    },
  ]

  const handleDownload = (id: string) => {
    toast({
      title: "Report Downloaded",
      description: "The survey report has been downloaded successfully.",
    })
  }

  const handleView = (id: string) => {
    toast({
      title: "Viewing Survey Details",
      description: "Opening detailed view for the selected survey.",
    })
  }

  return (
    <div className="space-y-4">
      {surveys.map((survey) => (
        <div key={survey.id} className="flex items-start gap-4 p-4 border rounded-lg">
          <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium">{survey.name}</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-1">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span>{survey.location}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{survey.date}</span>
              </div>
              <div className="text-sm text-muted-foreground">Duration: {survey.duration}</div>
              <div className="text-sm text-muted-foreground">Coverage: {survey.coverage}</div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => handleView(survey.id)}>
              View
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleDownload(survey.id)}>
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
