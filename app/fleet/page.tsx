import { FleetManagement } from "@/components/fleet-management"

export default function FleetPage() {
  return (
    <div className="flex flex-col p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Fleet Management</h1>
      </div>

      <FleetManagement />
    </div>
  )
}
