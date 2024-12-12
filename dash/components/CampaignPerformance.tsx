'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function CampaignPerformance({ campaignId }) {
  const [performance, setPerformance] = useState(null)

  useEffect(() => {
    fetchPerformance()
  }, [campaignId])

  const fetchPerformance = async () => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_SMARTLEAD_API_KEY
      const response = await fetch(`https://server.smartlead.ai/api/v1/campaigns/${campaignId}/statistics?api_key=${apiKey}`)
      const data = await response.json()
      setPerformance(data)
    } catch (error) {
      console.error('Error fetching performance data:', error)
    }
  }

  if (!performance) {
    return <div>Loading performance data...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Sent: {performance.sent}</p>
        <p>Opened: {performance.opened}</p>
        <p>Clicked: {performance.clicked}</p>
        <p>Replied: {performance.replied}</p>
      </CardContent>
    </Card>
  )
}

