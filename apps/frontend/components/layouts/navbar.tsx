'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  User,
  Book,
  Palette,
  PenTool,
  Boxes,
  LogOut,
  Settings,
} from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { CartSheet } from '../cart-sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu'

export default function Navbar() {
  const { data: session, status } = useSession()

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' })
  }
  if (status === 'loading') return null

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-slate-800"
        >
          Stationery Store.
        </Link>
        <nav className="hidden md:flex gap-8 font-medium text-sm">
          <Link
            href="/products?category=pens"
            className="text-slate-600 hover:text-teal-600 transition-colors flex items-center"
          >
            <PenTool className="h-4 w-4 mr-2" />
            Pens
          </Link>
          <Link
            href="/products?category=notebooks"
            className="text-slate-600 hover:text-teal-600 transition-colors flex items-center"
          >
            <Book className="h-4 w-4 mr-2" />
            Notebooks
          </Link>
          <Link
            href="/products?category=art-supplies"
            className="text-slate-600 hover:text-teal-600 transition-colors flex items-center"
          >
            <Palette className="h-4 w-4 mr-2" />
            Art & Craft
          </Link>
          <Link
            href="/products?category=accessories"
            className="text-slate-600 hover:text-teal-600 transition-colors flex items-center"
          >
            <Boxes className="h-4 w-4 mr-2" />
            Accessories
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          {status === 'authenticated' ? (
            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="flex h-9 w-9 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-teal-100 bg-teal-600 text-white shadow-sm transition-opacity hover:opacity-80">
                    <User className="h-5 w-5" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="bottom"
                  align="start"
                  className="w-56"
                >
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          My Account
                        </p>
                        <p className="text-xs leading-none text-slate-500">
                          {session.user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                      <Link href="/account">
                        <div className="flex items-center">
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Account Settings</span>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              <span className="text-sm font-medium text-slate-700 hidden sm:block">
                {session.user?.email}
              </span>
            </div>
          ) : (
            <Link href="/login">
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-600 hover:text-teal-600 hover:bg-teal-50"
              >
                <User className="h-4 w-4 mr-2" />
                Login
              </Button>
            </Link>
          )}
          <CartSheet />
        </div>
      </div>
    </header>
  )
}
