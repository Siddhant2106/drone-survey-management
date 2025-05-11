import { ReportsAnalytics } from "@/components/reports-analytics"

export default function ReportsPage() {
  return (
    <div className="flex flex-col p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
      </div>

      <ReportsAnalytics />
    </div>
  )
}
