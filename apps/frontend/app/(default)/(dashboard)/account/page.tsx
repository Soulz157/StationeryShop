'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useProfile } from '@/hooks/user/use-profile'
import { Loading } from '@/components/layouts'
import { useUpdateProfile } from '@/hooks/user/use-update-profile'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ProfileOverview } from './components/overview'
import { ProfileForm } from './components/from'
import { ActivitySidebar } from './components/activitySidebar'

const profileSchema = z.object({
  firstName: z.string().min(1, 'กรุณากรอกชื่อ'),
  lastName: z.string().min(1, 'กรุณากรอกนามสกุล'),
  address: z.string().optional(),
  phone: z
    .string()
    .regex(/^0\d{8,9}$/, 'รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง')
    .optional()
    .or(z.literal('')),
})
export default function AccountPage() {
  const { profile, loading, error, refetch } = useProfile()
  const { updateProfile, isUpdating } = useUpdateProfile()

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: profile?.firstName || '',
      lastName: profile?.lastName || '',
      address: profile?.address || '',
      phone: profile?.phone || '',
    },
  })

  useEffect(() => {
    if (profile) {
      form.reset({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        address: profile.address || '',
        phone: profile.phone || '',
      })
    }
  }, [profile, form])

  if (loading) return <Loading />
  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-red-500">Error: {JSON.stringify(error)}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-600 transition-colors hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back to Store</span>
          </Link>
          <h1 className="text-lg font-semibold text-slate-900">
            Account Settings
          </h1>
          <div className="w-24" />
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10">
        <ProfileOverview profile={profile} />

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <ProfileForm
              profile={profile}
              updateProfile={updateProfile}
              isUpdating={isUpdating}
              refetch={refetch}
            />
          </div>

          <div className="space-y-6">
            <ActivitySidebar profile={profile} />
          </div>
        </div>
      </main>
    </div>
  )
}
