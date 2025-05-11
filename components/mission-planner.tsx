"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { MapView } from "@/components/map-view"
import { useToast } from "@/hooks/use-toast"
import { Calendar, Clock, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function MissionPlanner() {
  const { toast } = useToast()
  const [missionType, setMissionType] = useState("grid")
  const [altitude, setAltitude] = useState(50)
  const [overlap, setOverlap] = useState(70)
  const [speed, setSpeed] = useState(5)
  const mapRef = useRef<any>(null)

  const handleCreateMission = () => {
    toast({
      title: "Mission Created",
      description: "Your mission has been created successfully.",
    })
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card className="h-[calc(100vh-12rem)]">
          <CardHeader>
            <CardTitle>Survey Area</CardTitle>
            <CardDescription>Define the survey area by drawing on the map</CardDescription>
          </CardHeader>
          <CardContent className="p-0 h-[calc(100%-8rem)]">
            <MapView missionType={missionType} />
          </CardContent>
          <CardFooter className="border-t p-4">
            <div className="flex gap-4 w-full">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  toast({
                    title: "Clear Area",
                    description: "Use the trash icon in the map controls to clear the area.",
                  })
                }}
              >
                Clear Area
              </Button>
              <Button
                className="flex-1"
                onClick={() => {
                  toast({
                    title: "Generate Flight Path",
                    description: "First draw a survey area using the polygon tool in the map.",
                  })
                }}
              >
                Generate Flight Path
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Mission Configuration</CardTitle>
            <CardDescription>Configure your drone survey mission</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="mission-name">Mission Name</Label>
              <Input id="mission-name" placeholder="Enter mission name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="drone-select">Select Drone</Label>
              <Select defaultValue="drone1">
                <SelectTrigger id="drone-select">
                  <SelectValue placeholder="Select drone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="drone1">Surveyor-1 (DJI Matrice 300 RTK)</SelectItem>
                  <SelectItem value="drone2">Surveyor-2 (DJI Matrice 300 RTK)</SelectItem>
                  <SelectItem value="drone5">Surveyor-5 (Autel EVO II)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Mission Type</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-5 w-5">
                        <Info className="h-4 w-4" />
                        <span className="sr-only">Mission type info</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Grid: Parallel lines for complete coverage
                        <br />
                        Crosshatch: Perpendicular lines for detailed mapping
                        <br />
                        Perimeter: Follows boundary of the defined area
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Tabs defaultValue="grid" onValueChange={setMissionType}>
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="grid">Grid</TabsTrigger>
                  <TabsTrigger value="crosshatch">Crosshatch</TabsTrigger>
                  <TabsTrigger value="perimeter">Perimeter</TabsTrigger>
                </TabsList>
                <TabsContent value="grid" className="mt-2">
                  <p className="text-sm text-muted-foreground">
                    Grid pattern for complete area coverage with parallel flight lines.
                  </p>
                </TabsContent>
                <TabsContent value="crosshatch" className="mt-2">
                  <p className="text-sm text-muted-foreground">
                    Crosshatch pattern with perpendicular flight lines for detailed mapping.
                  </p>
                </TabsContent>
                <TabsContent value="perimeter" className="mt-2">
                  <p className="text-sm text-muted-foreground">
                    Perimeter pattern that follows the boundary of the defined area.
                  </p>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Flight Altitude</Label>
                  <span className="text-sm">{altitude} meters</span>
                </div>
                <Slider
                  value={[altitude]}
                  min={10}
                  max={120}
                  step={5}
                  onValueChange={(value) => setAltitude(value[0])}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Image Overlap</Label>
                  <span className="text-sm">{overlap}%</span>
                </div>
                <Slider value={[overlap]} min={50} max={90} step={5} onValueChange={(value) => setOverlap(value[0])} />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Flight Speed</Label>
                  <span className="text-sm">{speed} m/s</span>
                </div>
                <Slider value={[speed]} min={1} max={10} step={0.5} onValueChange={(value) => setSpeed(value[0])} />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-return">Auto Return on Low Battery</Label>
                <Switch id="auto-return" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="obstacle-avoidance">Obstacle Avoidance</Label>
                <Switch id="obstacle-avoidance" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="geofencing">Enable Geofencing</Label>
                <Switch id="geofencing" defaultChecked />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Mission Schedule</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="mission-date" className="text-sm">
                      Date
                    </Label>
                  </div>
                  <Input type="date" id="mission-date" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="mission-time" className="text-sm">
                      Time
                    </Label>
                  </div>
                  <Input type="time" id="mission-time" />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t p-4">
            <Button variant="outline">Save as Draft</Button>
            <Button onClick={handleCreateMission}>Create Mission</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
