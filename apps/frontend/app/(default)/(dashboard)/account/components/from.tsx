'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User, Mail, Lock, Phone, MapPin, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { UpdateProfilePayload, UserProfile } from '@/types'

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

interface ProfileFormProps {
  profile: UserProfile | null
  updateProfile: (
    data: UpdateProfilePayload,
  ) => Promise<{ success: boolean; error?: string }>
  isUpdating: boolean
  refetch: () => Promise<void>
}

export function ProfileForm({
  profile,
  updateProfile,
  isUpdating,
  refetch,
}: ProfileFormProps) {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)

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

  const handleEditClick = () => setIsEditing(true)
  const handleCancel = () => {
    form.reset()
    setIsEditing(false)
  }

  const onSubmit = async (values: z.infer<typeof profileSchema>) => {
    const result = await updateProfile(values)
    if (result.success) {
      if (refetch) await refetch()
      setIsEditing(false)
      toast.success('อัปเดตข้อมูลสำเร็จ')
    } else {
      toast.error(result.error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-slate-900">
                Personal Information
              </CardTitle>
              <CardDescription>Manage your account details</CardDescription>
            </div>
            {!isEditing ? (
              <Button
                type="button"
                onClick={handleEditClick}
                className="border-teal-300 text-white bg-teal-600 hover:bg-teal-700"
              >
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleCancel}
                  className="text-slate-600"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isUpdating}
                  className="bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isUpdating ? 'Saving...' : 'Save'}
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Read Only Credentials */}
            <div className="rounded-lg bg-slate-100 p-4">
              <p className="mb-4 text-xs font-medium uppercase tracking-wide text-slate-500">
                Account Credentials (Read Only)
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-slate-500">
                    <Mail className="h-4 w-4" /> Email
                  </Label>
                  <div className="relative">
                    <Input
                      value={profile?.email || ''}
                      disabled
                      className="border-slate-300 bg-slate-200 text-slate-500 cursor-not-allowed"
                    />
                    <Lock className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-slate-500">
                    <Lock className="h-4 w-4" /> Password
                  </Label>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-slate-300 text-slate-600"
                    onClick={() => router.push('/account/change-password')}
                  >
                    Change Password
                  </Button>
                </div>
              </div>
            </div>

            <Separator className="bg-slate-200" />

            {/* Editable Fields */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-slate-700">
                  <User className="h-4 w-4 text-teal-600" /> First Name
                </Label>
                {isEditing ? (
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : (
                  <p className="rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-900">
                    {profile?.firstName || '-'}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-slate-700">
                  <User className="h-4 w-4 text-teal-600" /> Last Name
                </Label>
                {isEditing ? (
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : (
                  <p className="rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-900">
                    {profile?.lastName || '-'}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-slate-700">
                <Phone className="h-4 w-4 text-teal-600" /> Phone Number
              </Label>
              {isEditing ? (
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="+66 81 234 5678" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : (
                <p className="rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-900">
                  {profile?.phone || '-'}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-slate-700">
                <MapPin className="h-4 w-4 text-teal-600" /> Address
              </Label>
              {isEditing ? (
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Enter your address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : (
                <p className="rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-900">
                  {profile?.address || '-'}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  )
}
