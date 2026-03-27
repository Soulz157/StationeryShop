'use client'
import { Calendar } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { UserProfile } from '@/types'

export function ActivitySidebar({ profile }: { profile: UserProfile | null }) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base text-slate-900">
          <Calendar className="h-4 w-4 text-teal-600" />
          Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Member Since
          </p>
          <p className="mt-1 text-sm text-slate-700">
            {profile?.createdAt && formatDate(new Date(profile.createdAt))}
          </p>
        </div>
        <Separator className="bg-slate-200" />
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Last Updated
          </p>
          <p className="mt-1 text-sm text-slate-700">
            {profile?.updatedAt && formatDate(new Date(profile.updatedAt))}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
