import { Metadata } from 'next'
import { CampaignCreationWizard } from '@/components/CampaignCreationWizard'

export const metadata: Metadata = {
  title: 'Create New Campaign',
  description: 'Create a new email campaign',
}

export default function NewCampaignPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Campaign</h1>
      <CampaignCreationWizard />
    </div>
  )
}

