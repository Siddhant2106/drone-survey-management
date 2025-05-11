"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { DrillIcon as Drone, MapPin, Pause, Play, StopCircle, User } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import dynamic from "next/dynamic"

// Dynamically import Leaflet components with no SSR
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false })
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false })
const Polyline = dynamic(() => import("react-leaflet").then((mod) => mod.Polyline), { ssr: false })

type MissionDetailsProps = {
  missionId: string
}

export function MissionDetails({ missionId }: MissionDetailsProps) {
  const { toast } = useToast()
  const [status, setStatus] = useState<"in-progress" | "paused" | "completed" | "aborted">("in-progress")
  const [progress, setProgress] = useState(35)
  const [mapReady, setMapReady] = useState(false)

  // Sample mission data - in a real app, this would come from an API
  const mission = {
    id: missionId,
    name: "Building Inspection - Tower A",
    location: "New York HQ",
    drone: "Surveyor-1 (DJI-1001)",
    operator: "John Doe",
    startTime: "10:30 AM",
    estimatedEndTime: "11:15 AM",
    altitude: 50,
    speed: 5,
    batteryStart: 98,
    batteryCurrent: 68,
    missionType: "grid",
    area: "12,500 m²",
    waypoints: 24,
    // Sample flight path coordinates (longitude, latitude)
    flightPath: [
      [-74.006, 40.7128], // NYC coordinates as example
      [-74.006, 40.7138],
      [-74.005, 40.7138],
      [-74.005, 40.7128],
      [-74.004, 40.7128],
      [-74.004, 40.7138],
      [-74.003, 40.7138],
      [-74.003, 40.7128],
    ],
    // Sample drone current position
    currentPosition: [-74.0045, 40.7133],
  }

  // Initialize Leaflet when component mounts
  useEffect(() => {
    // This is needed to initialize Leaflet icons
    if (typeof window !== "undefined") {
      // Import Leaflet CSS
      import("leaflet/dist/leaflet.css")

      // Fix Leaflet default icon issue
      import("leaflet").then((L) => {
        delete (L.Icon.Default.prototype as any)._getIconUrl
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "/leaflet/marker-icon-2x.png",
          iconUrl: "/leaflet/marker-icon.png",
          shadowUrl: "/leaflet/marker-shadow.png",
        })
        setMapReady(true)
      })
    }
  }, [])

  // Simulate drone movement
  useEffect(() => {
    if (status === "in-progress" && progress < 100) {
      const interval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 1, 100))
      }, 3000)

      return () => clearInterval(interval)
    }
  }, [status, progress])

  const handlePause = () => {
    setStatus("paused")
    toast({
      title: "Mission Paused",
      description: "The mission has been paused successfully.",
    })
  }

  const handleResume = () => {
    setStatus("in-progress")
    toast({
      title: "Mission Resumed",
      description: "The mission has been resumed successfully.",
    })
  }

  const handleAbort = () => {
    setStatus("aborted")
    toast({
      title: "Mission Aborted",
      description: "The mission has been aborted successfully.",
      variant: "destructive",
    })
  }

  const getStatusBadge = () => {
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

  // Create a custom drone icon
  const createDroneIcon = () => {
    if (typeof window !== "undefined" && mapReady) {
      const L = require("leaflet")
      return new L.DivIcon({
        html: `<div style="
          width: 24px; 
          height: 24px; 
          background-color: #FF9800; 
          border-radius: 50%; 
          border: 2px solid white;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 10px rgba(0,0,0,0.3);
        ">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="white">
            <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/>
          </svg>
        </div>`,
        className: "",
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      })
    }
    return null
  }

  if (!mapReady) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{mission.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{mission.location}</span>
              {getStatusBadge()}
            </div>
          </div>
          <div>Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{mission.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{mission.location}</span>
            {getStatusBadge()}
          </div>
        </div>
        <div className="flex gap-2">
          {status === "in-progress" ? (
            <Button variant="outline" onClick={handlePause}>
              <Pause className="mr-2 h-4 w-4" />
              Pause Mission
            </Button>
          ) : status === "paused" ? (
            <Button variant="outline" onClick={handleResume}>
              <Play className="mr-2 h-4 w-4" />
              Resume Mission
            </Button>
          ) : null}

          {(status === "in-progress" || status === "paused") && (
            <Button variant="destructive" onClick={handleAbort}>
              <StopCircle className="mr-2 h-4 w-4" />
              Abort Mission
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Live Mission View</CardTitle>
              <CardDescription>Real-time visualization of the drone's flight path</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] p-0">
              <MapContainer
                center={[mission.currentPosition[1], mission.currentPosition[0]]}
                zoom={16}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
                  subdomains={["mt0", "mt1", "mt2", "mt3"]}
                  attribution="&copy; Google Maps"
                  maxZoom={20}
                />

                {/* Flight path */}
                <Polyline
                  positions={mission.flightPath.map((coord) => [coord[1], coord[0]])}
                  color="#FF9800"
                  weight={3}
                  dashArray="5,5"
                />

                {/* Waypoint markers */}
                {mission.flightPath.map((coord, index) => (
                  <Marker key={index} position={[coord[1], coord[0]]}>
                    <Popup>Waypoint {index + 1}</Popup>
                  </Marker>
                ))}

                {/* Drone marker */}
                <Marker position={[mission.currentPosition[1], mission.currentPosition[0]]} icon={createDroneIcon()}>
                  <Popup>Current Drone Position</Popup>
                </Marker>
              </MapContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Mission Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Completion</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Start Time</div>
                  <div className="font-medium">{mission.startTime}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Est. End Time</div>
                  <div className="font-medium">{mission.estimatedEndTime}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Battery</div>
                  <div className="font-medium">{mission.batteryCurrent}%</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Waypoints</div>
                  <div className="font-medium">{mission.waypoints}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Mission Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Drone</div>
                  <div className="font-medium flex items-center gap-1">
                    <Drone className="h-4 w-4" />
                    {mission.drone}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Operator</div>
                  <div className="font-medium flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {mission.operator}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Altitude</div>
                  <div className="font-medium">{mission.altitude} meters</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Speed</div>
                  <div className="font-medium">{mission.speed} m/s</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Mission Type</div>
                  <div className="font-medium capitalize">{mission.missionType}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Area</div>
                  <div className="font-medium">{mission.area}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Telemetry Data</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="realtime">
                <TabsList className="w-full">
                  <TabsTrigger value="realtime" className="flex-1">
                    Real-time
                  </TabsTrigger>
                  <TabsTrigger value="sensors" className="flex-1">
                    Sensors
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="realtime" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Altitude</div>
                      <div className="font-medium">{mission.altitude} m</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Ground Speed</div>
                      <div className="font-medium">{mission.speed} m/s</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Battery</div>
                      <div className="font-medium">{mission.batteryCurrent}%</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Signal Strength</div>
                      <div className="font-medium">92%</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">GPS Satellites</div>
                      <div className="font-medium">14</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Wind Speed</div>
                      <div className="font-medium">3.2 m/s</div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="sensors" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Camera</div>
                      <div className="font-medium">Active</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Thermal</div>
                      <div className="font-medium">Active</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">LiDAR</div>
                      <div className="font-medium">Inactive</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Multispectral</div>
                      <div className="font-medium">Inactive</div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
