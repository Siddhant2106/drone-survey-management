import { MissionDetails } from "@/components/mission-details"

export default function MissionDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-6">
      <MissionDetails missionId={params.id} />
    </div>
  )
}
