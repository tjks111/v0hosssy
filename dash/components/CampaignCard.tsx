import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CalendarIcon, MailIcon, UserIcon } from 'lucide-react'

export function CampaignCard({ campaign }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-500'
      case 'PAUSED':
        return 'bg-yellow-500'
      case 'COMPLETED':
        return 'bg-blue-500'
      case 'DRAFTED':
        return 'bg-gray-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{campaign.name || 'Unnamed Campaign'}</CardTitle>
          <Badge className={`${getStatusColor(campaign.status)} text-white`}>
            {campaign.status || 'Unknown'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>Created: {campaign.created_at ? new Date(campaign.created_at).toLocaleDateString() : 'N/A'}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <MailIcon className="mr-2 h-4 w-4" />
            <span>Leads per day: {campaign.max_leads_per_day || 'N/A'}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <UserIcon className="mr-2 h-4 w-4" />
            <span>Client ID: {campaign.client_id || 'N/A'}</span>
          </div>
        </div>
        <div className="mt-4">
          <Link 
            href={`/campaigns/${campaign.id}`} 
            className="text-blue-500 hover:text-blue-700 transition-colors"
          >
            View Details
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

