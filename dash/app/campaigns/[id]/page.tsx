'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { CampaignSequenceViewer } from '../../../components/CampaignSequenceViewer'
import { CampaignPerformance } from '../../../components/CampaignPerformance'
import { CampaignSchedule } from '../../../components/CampaignSchedule'

export default function CampaignDetails() {
  const { id } = useParams()
  const [campaign, setCampaign] = useState(null)

  useEffect(() => {
    fetchCampaignDetails()
  }, [id])

  const fetchCampaignDetails = async () => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_SMARTLEAD_API_KEY
      const response = await fetch(`https://server.smartlead.ai/api/v1/campaigns/${id}?api_key=${apiKey}`)
      const data = await response.json()
      setCampaign(data)
    } catch (error) {
      console.error('Error fetching campaign details:', error)
    }
  }

  if (!campaign) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{campaign.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CampaignSequenceViewer campaignId={id} />
        <CampaignPerformance campaignId={id} />
      </div>
      <CampaignSchedule campaign={campaign} />
    </div>
  )
}

