import CampaignOwnerDashboard from "@/pages/Entrepreneur/campaign-owner-dashboard"

// interface PageProps {
//   params: Promise<{ id: string }>
// }

export default async function CampaignPage() {
  // const { id } = await params

  return (
    // <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
    //   <h2 className="text-3xl text-red-800 mb-4">Campaign ID:   {id}</h2>
      <CampaignOwnerDashboard />
    // </div>
  )
}
