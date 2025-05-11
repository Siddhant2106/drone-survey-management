import { MissionPlanner } from "@/components/mission-planner"

export default function MissionsPage() {
  return (
    <div className="flex flex-col p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Mission Planning</h1>
      </div>

      <MissionPlanner />
    </div>
  )
}
