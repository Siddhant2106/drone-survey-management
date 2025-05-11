"use client"

import { useState } from "react"
import { Clock, DrillIcon as Drone, MapPin, Pause, Play, StopCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

type Mission = {
  id: string
  name: string
  location: string
  drone: string
  progress: number
  status: "in-progress" | "paused" | "completed" | "aborted"
  startTime: string
  estimatedEndTime: string
}

export function ActiveMissions() {
  const { toast } = useToast()
  const [missions, setMissions] = useState<Mission[]>([
    {
      id: "m1",
      name: "Building Inspection - Tower A",
      location: "New York HQ",
      drone: "DJI-1001",
      progress: 75,
      status: "in-progress",
      startTime: "10:30 AM",
      estimatedEndTime: "11:15 AM",
    },
    {
      id: "m2",
      name: "Perimeter Security Scan",
      location: "Chicago Facility",
      drone: "DJI-1002",
      progress: 45,
      status: "in-progress",
      startTime: "10:15 AM",
      estimatedEndTime: "11:00 AM",
    },
    {
      id: "m3",
      name: "Solar Panel Inspection",
      location: "Phoenix Plant",
      drone: "DJI-1003",
      progress: 90,
      status: "in-progress",
      startTime: "09:45 AM",
      estimatedEndTime: "10:30 AM",
    },
    {
      id: "m4",
      name: "Construction Site Mapping",
      location: "Seattle Project",
      drone: "DJI-1004",
      progress: 30,
      status: "paused",
      startTime: "10:00 AM",
      estimatedEndTime: "11:30 AM",
    },
  ])

  const handlePause = (id: string) => {
    setMissions(missions.map((mission) => (mission.id === id ? { ...mission, status: "paused" as const } : mission)))
    toast({
      title: "Mission Paused",
      description: "The mission has been paused successfully.",
    })
  }

  const handleResume = (id: string) => {
    setMissions(
      missions.map((mission) => (mission.id === id ? { ...mission, status: "in-progress" as const } : mission)),
    )
    toast({
      title: "Mission Resumed",
      description: "The mission has been resumed successfully.",
    })
  }

  const handleAbort = (id: string) => {
    setMissions(missions.map((mission) => (mission.id === id ? { ...mission, status: "aborted" as const } : mission)))
    toast({
      title: "Mission Aborted",
      description: "The mission has been aborted successfully.",
      variant: "destructive",
    })
  }

  const getStatusBadge = (status: Mission["status"]) => {
    switch (status) {
      case "in-progress":
        return <Badge className="bg-green-500">In Progress</Badge>
      case "paused":
        return (
          <Badge variant="outline" className="text-yellow-500 border-yellow-500">
            Paused
          </Badge>
        )
      case "completed":
        return <Badge className="bg-blue-500">Completed</Badge>
      case "aborted":
        return <Badge variant="destructive">Aborted</Badge>
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {missions.map((mission) => (
        <Card key={mission.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{mission.name}</h3>
                {getStatusBadge(mission.status)}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{mission.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Drone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{mission.drone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Started: {mission.startTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">ETA: {mission.estimatedEndTime}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{mission.progress}%</span>
                </div>
                <Progress value={mission.progress} className="h-2" />
              </div>
            </div>

            <div className="flex border-t">
              {mission.status === "in-progress" ? (
                <Button variant="ghost" className="flex-1 rounded-none h-12" onClick={() => handlePause(mission.id)}>
                  <Pause className="mr-2 h-4 w-4" />
                  Pause
                </Button>
              ) : mission.status === "paused" ? (
                <Button variant="ghost" className="flex-1 rounded-none h-12" onClick={() => handleResume(mission.id)}>
                  <Play className="mr-2 h-4 w-4" />
                  Resume
                </Button>
              ) : null}

              {(mission.status === "in-progress" || mission.status === "paused") && (
                <Button
                  variant="ghost"
                  className="flex-1 rounded-none h-12 text-destructive hover:text-destructive"
                  onClick={() => handleAbort(mission.id)}
                >
                  <StopCircle className="mr-2 h-4 w-4" />
                  Abort
                </Button>
              )}

              <Button variant="ghost" className="flex-1 rounded-none h-12" asChild>
                <Link href={`/missions/${mission.id}`}>View Details</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
