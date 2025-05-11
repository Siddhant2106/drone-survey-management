"use client"

import { Battery, BatteryCharging, MapPin, Wifi, WifiOff } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

type DroneStatus = {
  id: string
  name: string
  model: string
  status: "available" | "in-mission" | "charging" | "maintenance"
  battery: number
  location: string
  lastActive: string
  connection: "online" | "offline"
}

export function DroneStatusOverview() {
  const { toast } = useToast()

  const drones: DroneStatus[] = [
    {
      id: "d1",
      name: "Surveyor-1",
      model: "DJI Matrice 300 RTK",
      status: "in-mission",
      battery: 68,
      location: "New York HQ",
      lastActive: "Active now",
      connection: "online",
    },
    {
      id: "d2",
      name: "Surveyor-2",
      model: "DJI Matrice 300 RTK",
      status: "available",
      battery: 100,
      location: "New York HQ",
      lastActive: "2 hours ago",
      connection: "online",
    },
    {
      id: "d3",
      name: "Surveyor-3",
      model: "DJI Phantom 4 RTK",
      status: "charging",
      battery: 35,
      location: "Chicago Facility",
      lastActive: "1 hour ago",
      connection: "online",
    },
    {
      id: "d4",
      name: "Surveyor-4",
      model: "DJI Phantom 4 RTK",
      status: "maintenance",
      battery: 0,
      location: "Maintenance Bay",
      lastActive: "2 days ago",
      connection: "offline",
    },
    {
      id: "d5",
      name: "Surveyor-5",
      model: "Autel EVO II",
      status: "available",
      battery: 92,
      location: "Phoenix Plant",
      lastActive: "3 hours ago",
      connection: "online",
    },
    {
      id: "d6",
      name: "Surveyor-6",
      model: "Autel EVO II",
      status: "in-mission",
      battery: 54,
      location: "Phoenix Plant",
      lastActive: "Active now",
      connection: "online",
    },
  ]

  const getStatusBadge = (status: DroneStatus["status"]) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-500">Available</Badge>
      case "in-mission":
        return <Badge className="bg-blue-500">In Mission</Badge>
      case "charging":
        return (
          <Badge variant="outline" className="text-yellow-500 border-yellow-500">
            Charging
          </Badge>
        )
      case "maintenance":
        return <Badge variant="destructive">Maintenance</Badge>
    }
  }

  const getBatteryColor = (battery: number) => {
    if (battery > 70) return "bg-green-500"
    if (battery > 30) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {drones.map((drone) => (
        <Card key={drone.id} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold">{drone.name}</h3>
                <p className="text-sm text-muted-foreground">{drone.model}</p>
              </div>
              <div className="flex items-center gap-2">
                {drone.connection === "online" ? (
                  <Wifi className="h-4 w-4 text-green-500" />
                ) : (
                  <WifiOff className="h-4 w-4 text-red-500" />
                )}
                {getStatusBadge(drone.status)}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{drone.location}</span>
              </div>

              <div className="flex items-center gap-2">
                {drone.status === "charging" ? (
                  <BatteryCharging className="h-4 w-4 text-yellow-500" />
                ) : (
                  <Battery className="h-4 w-4 text-muted-foreground" />
                )}
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Battery</span>
                    <span>{drone.battery}%</span>
                  </div>
                  <Progress value={drone.battery} className="h-2" indicatorClassName={getBatteryColor(drone.battery)} />
                </div>
              </div>

              <div className="text-sm text-muted-foreground">{drone.lastActive}</div>
            </div>

            <div className="flex gap-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                disabled={
                  drone.status === "in-mission" || drone.status === "maintenance" || drone.connection === "offline"
                }
                onClick={() => {
                  toast({
                    title: "Mission Assignment",
                    description: `${drone.name} is being prepared for a new mission.`,
                  })
                }}
              >
                Assign Mission
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => {
                  toast({
                    title: "Drone Details",
                    description: `Viewing details for ${drone.name}`,
                  })
                }}
              >
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
