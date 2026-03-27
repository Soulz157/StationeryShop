'use client'
import { LogOut } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { authService } from '@/services/auth'
import { signOut } from 'next-auth/react'
import { UserProfile } from '@/types'

export function ProfileOverview({ profile }: { profile: UserProfile | null }) {
  const handleLogout = async () => {
    try {
      await authService.logout()
    } catch (error) {
      console.error('Failed to blacklist token on backend:', error)
    } finally {
      await signOut({ callbackUrl: '/login' })
    }
  }

  return (
    <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-indigo-500">
          <span className="text-2xl font-bold text-white">
            {profile?.firstName?.[0]}
            {profile?.lastName?.[0]}
          </span>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            {profile?.firstName} {profile?.lastName}
          </h2>
          <p className="text-slate-500">{profile?.email}</p>
          <Badge
            variant="secondary"
            className="mt-2 bg-teal-100 text-teal-700 hover:bg-teal-100"
          >
            {profile?.role}
          </Badge>
        </div>
      </div>

      <AlertDialog>
        <AlertDialogTrigger>
          <div className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 h-10 px-4 py-2">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to logout?
            </AlertDialogTitle>
            <AlertDialogDescription>
              You will be redirected to the login page and will need to sign in
              again to access your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-slate-200">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLogout}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
