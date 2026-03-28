'use client'
import { Calendar, ChevronRight, Package } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { UserProfile } from '@/types'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function ActivitySidebar({ profile }: { profile: UserProfile | null }) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="space-y-4">
      <Card className="border-slate-200 border-teal-200 bg-gradient-to-br from-teal-50 to-cyan-50">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base text-slate-900">
            <Package className="h-4 w-4 text-teal-600" />
            My Orders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-600 mb-3">
            View and track your order history
          </p>
          <Link href="/order-history">
            <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white group">
              View Order History
              <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </CardContent>
      </Card>

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
    </div>
  )
}
