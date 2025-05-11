"use client"

import { useState } from "react"
import {
  Battery,
  BatteryCharging,
  Check,
  Filter,
  MapPin,
  MoreHorizontal,
  Plus,
  Search,
  Wifi,
  WifiOff,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

type DroneType = {
  id: string
  name: string
  model: string
  status: "available" | "in-mission" | "charging" | "maintenance"
  battery: number
  location: string
  lastActive: string
  connection: "online" | "offline"
  flightHours: number
  lastMaintenance: string
  sensors: string[]
}

export function FleetManagement() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [showAddDroneDialog, setShowAddDroneDialog] = useState(false)

  const drones: DroneType[] = [
    {
      id: "d1",
      name: "Surveyor-1",
      model: "DJI Matrice 300 RTK",
      status: "in-mission",
      battery: 68,
      location: "New York HQ",
      lastActive: "Active now",
      connection: "online",
      flightHours: 156.5,
      lastMaintenance: "April 15, 2023",
      sensors: ["RGB Camera", "Thermal Camera", "LiDAR"],
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
      flightHours: 142.3,
      lastMaintenance: "April 20, 2023",
      sensors: ["RGB Camera", "Thermal Camera"],
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
      flightHours: 98.7,
      lastMaintenance: "May 1, 2023",
      sensors: ["RGB Camera", "Multispectral"],
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
      flightHours: 210.5,
      lastMaintenance: "May 6, 2023",
      sensors: ["RGB Camera"],
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
      flightHours: 65.2,
      lastMaintenance: "April 25, 2023",
      sensors: ["RGB Camera", "Thermal Camera"],
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
      flightHours: 78.9,
      lastMaintenance: "April 28, 2023",
      sensors: ["RGB Camera", "LiDAR"],
    },
  ]

  const filteredDrones = drones.filter((drone) => {
    const matchesSearch =
      drone.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      drone.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      drone.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter ? drone.status === statusFilter : true

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: DroneType["status"]) => {
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

  const handleAddDrone = () => {
    setShowAddDroneDialog(false)
    toast({
      title: "Drone Added",
      description: "New drone has been added to the fleet.",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Drone Fleet</CardTitle>
              <CardDescription>Manage and monitor your organization's drone fleet</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search drones..."
                  className="pl-8 w-full sm:w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-1">
                    <Filter className="h-4 w-4" />
                    Filter
                    {statusFilter && (
                      <Badge variant="secondary" className="ml-1 text-xs">
                        1
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setStatusFilter(null)}>
                    <Check className={`mr-2 h-4 w-4 ${!statusFilter ? "opacity-100" : "opacity-0"}`} />
                    All
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("available")}>
                    <Check className={`mr-2 h-4 w-4 ${statusFilter === "available" ? "opacity-100" : "opacity-0"}`} />
                    Available
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("in-mission")}>
                    <Check className={`mr-2 h-4 w-4 ${statusFilter === "in-mission" ? "opacity-100" : "opacity-0"}`} />
                    In Mission
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("charging")}>
                    <Check className={`mr-2 h-4 w-4 ${statusFilter === "charging" ? "opacity-100" : "opacity-0"}`} />
                    Charging
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("maintenance")}>
                    <Check className={`mr-2 h-4 w-4 ${statusFilter === "maintenance" ? "opacity-100" : "opacity-0"}`} />
                    Maintenance
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Dialog open={showAddDroneDialog} onOpenChange={setShowAddDroneDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Drone
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Drone</DialogTitle>
                    <DialogDescription>Enter the details of the new drone to add to your fleet.</DialogDescription>
                  </DialogHeader>

                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="drone-name">Drone Name</Label>
                      <Input id="drone-name" placeholder="Enter drone name" />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="drone-model">Model</Label>
                      <Select>
                        <SelectTrigger id="drone-model">
                          <SelectValue placeholder="Select model" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dji-matrice">DJI Matrice 300 RTK</SelectItem>
                          <SelectItem value="dji-phantom">DJI Phantom 4 RTK</SelectItem>
                          <SelectItem value="autel-evo">Autel EVO II</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="drone-location">Location</Label>
                      <Select>
                        <SelectTrigger id="drone-location">
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new-york">New York HQ</SelectItem>
                          <SelectItem value="chicago">Chicago Facility</SelectItem>
                          <SelectItem value="phoenix">Phoenix Plant</SelectItem>
                          <SelectItem value="seattle">Seattle Project</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label>Sensors</Label>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                          RGB Camera
                        </Badge>
                        <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                          Thermal Camera
                        </Badge>
                        <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                          LiDAR
                        </Badge>
                        <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                          Multispectral
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowAddDroneDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddDrone}>Add Drone</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="grid">
            <TabsList className="mb-4">
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="table">Table View</TabsTrigger>
            </TabsList>

            <TabsContent value="grid" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredDrones.map((drone) => (
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
                            <Progress
                              value={drone.battery}
                              className="h-2"
                              indicatorClassName={getBatteryColor(drone.battery)}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <div className="text-muted-foreground">Flight Hours</div>
                            <div>{drone.flightHours} hrs</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Last Maintenance</div>
                            <div>{drone.lastMaintenance}</div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {drone.sensors.map((sensor, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {sensor}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={
                            drone.status === "in-mission" ||
                            drone.status === "maintenance" ||
                            drone.connection === "offline"
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

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                toast({
                                  title: "Drone Details",
                                  description: `Viewing details for ${drone.name}`,
                                })
                              }}
                            >
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                toast({
                                  title: "Maintenance Scheduled",
                                  description: `Maintenance scheduled for ${drone.name}`,
                                })
                              }}
                            >
                              Schedule Maintenance
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">Remove Drone</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="table">
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead>
                      <tr className="border-b transition-colors hover:bg-muted/50">
                        <th className="h-12 px-4 text-left align-middle font-medium">Name</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Model</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Battery</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Location</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Flight Hours</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDrones.map((drone) => (
                        <tr key={drone.id} className="border-b transition-colors hover:bg-muted/50">
                          <td className="p-4 align-middle">{drone.name}</td>
                          <td className="p-4 align-middle">{drone.model}</td>
                          <td className="p-4 align-middle">{getStatusBadge(drone.status)}</td>
                          <td className="p-4 align-middle">
                            <div className="flex items-center gap-2">
                              <Progress
                                value={drone.battery}
                                className="h-2 w-16"
                                indicatorClassName={getBatteryColor(drone.battery)}
                              />
                              <span>{drone.battery}%</span>
                            </div>
                          </td>
                          <td className="p-4 align-middle">{drone.location}</td>
                          <td className="p-4 align-middle">{drone.flightHours} hrs</td>
                          <td className="p-4 align-middle">
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                disabled={
                                  drone.status === "in-mission" ||
                                  drone.status === "maintenance" ||
                                  drone.connection === "offline"
                                }
                              >
                                Assign
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>View Details</DropdownMenuItem>
                                  <DropdownMenuItem>Schedule Maintenance</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-destructive">Remove Drone</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
