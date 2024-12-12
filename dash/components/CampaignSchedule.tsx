import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'

export function CampaignSchedule({ campaign }) {
  let schedule = { tz: 'N/A', days: [], startHour: 'N/A', endHour: 'N/A' };
  let error = null;

  try {
    if (campaign.scheduler_cron_value) {
      schedule = JSON.parse(campaign.scheduler_cron_value);
    } else {
      error = 'Scheduler cron value is missing';
    }
  } catch (err) {
    console.error('Error parsing scheduler_cron_value:', err);
    error = 'Invalid scheduler cron value format';
  }

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Schedule Management</CardTitle>
      </CardHeader>
      <CardContent>
        {error ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <>
            <p>Timezone: {schedule.tz}</p>
            <p>Days: {Array.isArray(schedule.days) ? schedule.days.join(', ') : 'N/A'}</p>
            <p>Start Time: {schedule.startHour}</p>
            <p>End Time: {schedule.endHour}</p>
            <p>Min Time Between Emails: {campaign.min_time_btwn_emails || 'N/A'} minutes</p>
            <p>Max Leads Per Day: {campaign.max_leads_per_day || 'N/A'}</p>
          </>
        )}
      </CardContent>
    </Card>
  )
}

