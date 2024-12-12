'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'

export function CampaignSequenceViewer({ campaignId }) {
  const [sequences, setSequences] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchSequences()
  }, [campaignId])

  const fetchSequences = async () => {
    setLoading(true)
    setError(null)
    try {
      const apiKey = process.env.NEXT_PUBLIC_SMARTLEAD_API_KEY
      if (!apiKey) {
        throw new Error('API key is not set')
      }
      const response = await fetch(`https://server.smartlead.ai/api/v1/campaigns/${campaignId}/sequences?api_key=${apiKey}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      if (!Array.isArray(data)) {
        throw new Error('Invalid data format. Expected an array.')
      }
      setSequences(data)
    } catch (error) {
      console.error('Error fetching sequences:', error)
      setError(error.message || 'An error occurred while fetching sequences')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <Card><CardContent>Loading sequences...</CardContent></Card>
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Sequence</CardTitle>
      </CardHeader>
      <CardContent>
        {sequences.length > 0 ? (
          sequences.map((sequence) => (
            <div key={sequence.id} className="mb-4">
              <h4 className="font-semibold">Step {sequence.seq_number}</h4>
              <p>Subject: {sequence.subject}</p>
              <div dangerouslySetInnerHTML={{ __html: sequence.email_body }} />
            </div>
          ))
        ) : (
          <p>No sequences found for this campaign.</p>
        )}
      </CardContent>
    </Card>
  )
}

