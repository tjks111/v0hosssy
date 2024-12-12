'use client'

import { useState, useEffect } from 'react'
import { CampaignCard } from './CampaignCard'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'

export function CampaignDashboard() {
  const [campaigns, setCampaigns] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    fetchCampaigns()
  }, [])

  const fetchCampaigns = async () => {
    setLoading(true)
    setError(null)
    try {
      const apiKey = process.env.NEXT_PUBLIC_SMARTLEAD_API_KEY
      console.log('API Key:', apiKey) // Debugging line, remove in production
      if (!apiKey) {
        throw new Error('API key is not set. Please check your environment variables.')
      }
      const response = await fetch(`https://server.smartlead.ai/api/v1/campaigns?api_key=${apiKey}`)
      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
      }
      const data = await response.json()
      if (!Array.isArray(data)) {
        throw new Error(`Invalid data format. Expected an array, got: ${typeof data}`)
      }
      setCampaigns(data)
    } catch (error) {
      console.error('Error fetching campaigns:', error)
      setError(error.message || 'An error occurred while fetching campaigns')
      setCampaigns([])
    } finally {
      setLoading(false)
    }
  }

  const filteredCampaigns = campaigns.filter(campaign => 
    (campaign.name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) &&
    (statusFilter === 'all' || campaign.status === statusFilter)
  )

  const groupedCampaigns = filteredCampaigns.reduce((acc, campaign) => {
    const clientId = campaign.client_id || 'Unassigned'
    if (!acc[clientId]) {
      acc[clientId] = []
    }
    acc[clientId].push(campaign)
    return acc
  }, {})

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <Input
          placeholder="Search campaigns..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="ACTIVE">Active</SelectItem>
            <SelectItem value="PAUSED">Paused</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
            <SelectItem value="DRAFTED">Drafted</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, index) => (
            <Skeleton key={index} className="h-[200px] w-full" />
          ))}
        </div>
      ) : (
        Object.entries(groupedCampaigns).map(([clientId, clientCampaigns]) => (
          <div key={clientId} className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {clientId === 'Unassigned' ? 'Unassigned Campaigns' : `Client ID: ${clientId}`}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {clientCampaigns.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          </div>
        ))
      )}

      {!loading && !error && filteredCampaigns.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No campaigns found.</p>
      )}
    </div>
  )
}

