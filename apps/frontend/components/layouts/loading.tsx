import { ArrowLeft } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

export default function AccountSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-400 transition-colors hover:text-slate-600"
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

      <main className="mx-auto max-w-4xl px-6 py-10 animate-pulse">
        <div className="mb-8 flex items-center gap-6">
          <div className="h-20 w-20 rounded-full bg-slate-200"></div>
          <div className="space-y-3">
            <div className="h-7 w-48 rounded-md bg-slate-200"></div>
            <div className="h-4 w-32 rounded-md bg-slate-200"></div>
            <div className="h-6 w-16 rounded-full bg-slate-200"></div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card className="border-slate-200">
              <CardHeader>
                <div className="h-6 w-40 rounded-md bg-slate-200"></div>
                <div className="mt-2 h-4 w-56 rounded-md bg-slate-200"></div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="h-24 w-full rounded-lg bg-slate-100"></div>
                <Separator className="bg-slate-100" />
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="h-16 w-full rounded-md bg-slate-100"></div>
                  <div className="h-16 w-full rounded-md bg-slate-100"></div>
                </div>
                <div className="h-16 w-full rounded-md bg-slate-100"></div>
                <div className="h-16 w-full rounded-md bg-slate-100"></div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-slate-200">
              <CardHeader>
                <div className="h-5 w-32 rounded-md bg-slate-200"></div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="h-10 w-full rounded-md bg-slate-100"></div>
                <Separator className="bg-slate-100" />
                <div className="h-10 w-full rounded-md bg-slate-100"></div>
              </CardContent>
            </Card>
            <Card className="border-slate-200">
              <CardHeader>
                <div className="h-5 w-24 rounded-md bg-slate-200"></div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="h-10 w-full rounded-md bg-slate-100"></div>
                <Separator className="bg-slate-100" />
                <div className="h-10 w-full rounded-md bg-slate-100"></div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
