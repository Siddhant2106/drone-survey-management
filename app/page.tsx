import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardStats } from "@/components/dashboard-stats"
import { ActiveMissions } from "@/components/active-missions"
import { RecentSurveys } from "@/components/recent-surveys"
import { DroneStatusOverview } from "@/components/drone-status-overview"
import { SiteOverview } from "@/components/site-overview"

export default function Dashboard() {
  return (
    <div className="flex flex-col p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>

      <DashboardStats />

      <Tabs defaultValue="active-missions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active-missions">Active Missions</TabsTrigger>
          <TabsTrigger value="drone-status">Drone Status</TabsTrigger>
          <TabsTrigger value="site-overview">Site Overview</TabsTrigger>
        </TabsList>
        <TabsContent value="active-missions" className="space-y-4">
          <ActiveMissions />
        </TabsContent>
        <TabsContent value="drone-status" className="space-y-4">
          <DroneStatusOverview />
        </TabsContent>
        <TabsContent value="site-overview" className="space-y-4">
          <SiteOverview />
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Surveys</CardTitle>
            <CardDescription>Overview of recently completed survey missions</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentSurveys />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Upcoming Missions</CardTitle>
            <CardDescription>Scheduled missions for the next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-4 p-3 border rounded-lg">
                  <div className="w-2 h-10 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="font-medium">Site Inspection - Building {i}</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(Date.now() + i * 86400000).toLocaleDateString()} - Drone DJI-{1000 + i}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
