"use client"

import { useState } from "react"
import { BarChart, Calendar, Download, FileText, Filter, LineChart, MapPin, PieChart, Share2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

export function ReportsAnalytics() {
  const { toast } = useToast()
  const [timeRange, setTimeRange] = useState("month")

  const handleDownload = () => {
    toast({
      title: "Report Downloaded",
      description: "The report has been downloaded successfully.",
    })
  }

  const handleShare = () => {
    toast({
      title: "Report Shared",
      description: "The report sharing link has been copied to clipboard.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last 7 Days</SelectItem>
              <SelectItem value="month">Last 30 Days</SelectItem>
              <SelectItem value="quarter">Last 90 Days</SelectItem>
              <SelectItem value="year">Last 12 Months</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="gap-1">
            <Filter className="h-4 w-4" />
            Filter
          </Button>

          <Button variant="outline" className="gap-1">
            <Calendar className="h-4 w-4" />
            Date Range
          </Button>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Surveys</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground">+23 from previous period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Flight Hours</CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">256.5</div>
            <p className="text-xs text-muted-foreground">+42.3 from previous period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Area Covered</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,245 km²</div>
            <p className="text-xs text-muted-foreground">+215 from previous period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <p className="text-xs text-muted-foreground">+2.1% from previous period</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="surveys">
        <TabsList className="mb-4">
          <TabsTrigger value="surveys">Survey Reports</TabsTrigger>
          <TabsTrigger value="drones">Drone Performance</TabsTrigger>
          <TabsTrigger value="sites">Site Coverage</TabsTrigger>
        </TabsList>

        <TabsContent value="surveys">
          <Card>
            <CardHeader>
              <CardTitle>Survey Reports</CardTitle>
              <CardDescription>Comprehensive reports of all completed surveys</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="rounded-md border">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead>
                        <tr className="border-b transition-colors hover:bg-muted/50">
                          <th className="h-12 px-4 text-left align-middle font-medium">Survey Name</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Location</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Duration</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Drone</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Coverage</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            name: "Building Inspection - Tower B",
                            location: "New York HQ",
                            date: "Today, 9:15 AM",
                            duration: "45 minutes",
                            drone: "DJI-1001",
                            coverage: "100%",
                          },
                          {
                            name: "Warehouse Inventory Scan",
                            location: "Chicago Facility",
                            date: "Yesterday, 2:30 PM",
                            duration: "1 hour 15 minutes",
                            drone: "DJI-1002",
                            coverage: "95%",
                          },
                          {
                            name: "Solar Farm Inspection",
                            location: "Phoenix Plant",
                            date: "May 7, 11:00 AM",
                            duration: "2 hours",
                            drone: "DJI-1003",
                            coverage: "100%",
                          },
                          {
                            name: "Construction Progress Mapping",
                            location: "Seattle Project",
                            date: "May 6, 10:45 AM",
                            duration: "1 hour 30 minutes",
                            drone: "DJI-1004",
                            coverage: "98%",
                          },
                          {
                            name: "Perimeter Security Scan",
                            location: "Chicago Facility",
                            date: "May 5, 3:20 PM",
                            duration: "55 minutes",
                            drone: "DJI-1002",
                            coverage: "100%",
                          },
                        ].map((survey, index) => (
                          <tr key={index} className="border-b transition-colors hover:bg-muted/50">
                            <td className="p-4 align-middle font-medium">{survey.name}</td>
                            <td className="p-4 align-middle">{survey.location}</td>
                            <td className="p-4 align-middle">{survey.date}</td>
                            <td className="p-4 align-middle">{survey.duration}</td>
                            <td className="p-4 align-middle">{survey.drone}</td>
                            <td className="p-4 align-middle">
                              <Badge variant={survey.coverage === "100%" ? "default" : "outline"}>
                                {survey.coverage}
                              </Badge>
                            </td>
                            <td className="p-4 align-middle">
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  View
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button variant="outline">Load More</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drones">
          <Card>
            <CardHeader>
              <CardTitle>Drone Performance Analytics</CardTitle>
              <CardDescription>Performance metrics for your drone fleet</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Flight Hours by Drone</CardTitle>
                    </CardHeader>
                    <CardContent className="h-80 flex items-center justify-center">
                      <BarChart className="h-16 w-16 text-muted-foreground" />
                      <div className="ml-4 text-center">
                        <p className="text-muted-foreground">Chart visualization would appear here</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Showing flight hours for each drone in the fleet
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Battery Efficiency</CardTitle>
                    </CardHeader>
                    <CardContent className="h-80 flex items-center justify-center">
                      <LineChart className="h-16 w-16 text-muted-foreground" />
                      <div className="ml-4 text-center">
                        <p className="text-muted-foreground">Chart visualization would appear here</p>
                        <p className="text-xs text-muted-foreground mt-2">Showing battery usage efficiency over time</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Drone Utilization</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                          <thead>
                            <tr className="border-b transition-colors hover:bg-muted/50">
                              <th className="h-12 px-4 text-left align-middle font-medium">Drone</th>
                              <th className="h-12 px-4 text-left align-middle font-medium">Total Missions</th>
                              <th className="h-12 px-4 text-left align-middle font-medium">Flight Hours</th>
                              <th className="h-12 px-4 text-left align-middle font-medium">Avg. Mission Duration</th>
                              <th className="h-12 px-4 text-left align-middle font-medium">Utilization Rate</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              {
                                drone: "Surveyor-1 (DJI-1001)",
                                missions: 42,
                                hours: 156.5,
                                avgDuration: "45 min",
                                utilization: "85%",
                              },
                              {
                                drone: "Surveyor-2 (DJI-1002)",
                                missions: 38,
                                hours: 142.3,
                                avgDuration: "52 min",
                                utilization: "78%",
                              },
                              {
                                drone: "Surveyor-3 (DJI-1003)",
                                missions: 26,
                                hours: 98.7,
                                avgDuration: "38 min",
                                utilization: "65%",
                              },
                              {
                                drone: "Surveyor-5 (DJI-1005)",
                                missions: 18,
                                hours: 65.2,
                                avgDuration: "42 min",
                                utilization: "72%",
                              },
                              {
                                drone: "Surveyor-6 (DJI-1006)",
                                missions: 22,
                                hours: 78.9,
                                avgDuration: "47 min",
                                utilization: "70%",
                              },
                            ].map((drone, index) => (
                              <tr key={index} className="border-b transition-colors hover:bg-muted/50">
                                <td className="p-4 align-middle font-medium">{drone.drone}</td>
                                <td className="p-4 align-middle">{drone.missions}</td>
                                <td className="p-4 align-middle">{drone.hours}</td>
                                <td className="p-4 align-middle">{drone.avgDuration}</td>
                                <td className="p-4 align-middle">{drone.utilization}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sites">
          <Card>
            <CardHeader>
              <CardTitle>Site Coverage Analytics</CardTitle>
              <CardDescription>Coverage metrics for your organization's sites</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Coverage by Site</CardTitle>
                    </CardHeader>
                    <CardContent className="h-80 flex items-center justify-center">
                      <PieChart className="h-16 w-16 text-muted-foreground" />
                      <div className="ml-4 text-center">
                        <p className="text-muted-foreground">Chart visualization would appear here</p>
                        <p className="text-xs text-muted-foreground mt-2">Showing coverage percentage for each site</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Survey Frequency</CardTitle>
                    </CardHeader>
                    <CardContent className="h-80 flex items-center justify-center">
                      <BarChart className="h-16 w-16 text-muted-foreground" />
                      <div className="ml-4 text-center">
                        <p className="text-muted-foreground">Chart visualization would appear here</p>
                        <p className="text-xs text-muted-foreground mt-2">Showing survey frequency by site over time</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Site Survey Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                          <thead>
                            <tr className="border-b transition-colors hover:bg-muted/50">
                              <th className="h-12 px-4 text-left align-middle font-medium">Site</th>
                              <th className="h-12 px-4 text-left align-middle font-medium">Total Surveys</th>
                              <th className="h-12 px-4 text-left align-middle font-medium">Area Covered</th>
                              <th className="h-12 px-4 text-left align-middle font-medium">Last Survey</th>
                              <th className="h-12 px-4 text-left align-middle font-medium">Coverage %</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              {
                                site: "New York Headquarters",
                                surveys: 35,
                                area: "425 km²",
                                lastSurvey: "Today, 9:15 AM",
                                coverage: "85%",
                              },
                              {
                                site: "Chicago Manufacturing Facility",
                                surveys: 28,
                                area: "320 km²",
                                lastSurvey: "Yesterday, 2:30 PM",
                                coverage: "70%",
                              },
                              {
                                site: "Phoenix Solar Plant",
                                surveys: 32,
                                area: "380 km²",
                                lastSurvey: "May 7, 11:00 AM",
                                coverage: "90%",
                              },
                              {
                                site: "Seattle Construction Project",
                                surveys: 18,
                                area: "120 km²",
                                lastSurvey: "May 6, 10:45 AM",
                                coverage: "60%",
                              },
                              {
                                site: "Boston Research Campus",
                                surveys: 15,
                                area: "95 km²",
                                lastSurvey: "May 5, 3:20 PM",
                                coverage: "75%",
                              },
                            ].map((site, index) => (
                              <tr key={index} className="border-b transition-colors hover:bg-muted/50">
                                <td className="p-4 align-middle font-medium">{site.site}</td>
                                <td className="p-4 align-middle">{site.surveys}</td>
                                <td className="p-4 align-middle">{site.area}</td>
                                <td className="p-4 align-middle">{site.lastSurvey}</td>
                                <td className="p-4 align-middle">{site.coverage}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
