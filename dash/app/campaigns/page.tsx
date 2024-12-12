import { Metadata } from 'next'
import { CampaignDashboard } from '@/components/CampaignDashboard'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Campaign Management | Campaigns',
  description: 'Manage and monitor your email campaigns',
}

export default function CampaignsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Campaigns</h1>
        <Button asChild>
          <Link href="/campaigns/new">Create New Campaign</Link>
        </Button>
      </div>
      <CampaignDashboard />
    </div>
  )
}

