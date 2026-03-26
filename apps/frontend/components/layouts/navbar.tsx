"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  User,
  ShoppingCart,
  LogOut,
  Book,
  Palette,
  PenTool,
  Boxes,
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { authService } from "@/services/auth";

export default function Navbar() {
  const { data: session, status } = useSession();

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Failed to blacklist token on backend:", error);
    } finally {
      await signOut({ callbackUrl: "/login" });
    }
  };

  if (status === "loading") return;

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
          {status === "authenticated" ? (
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-teal-600 flex items-center justify-center text-white overflow-hidden border border-teal-100 shadow-sm cursor-pointer hover:opacity-80 transition-opacity">
                <Link href="/account">
                  <User className="h-5 w-5" />
                </Link>
              </div>

              <span className="text-sm font-medium text-slate-700 hidden sm:block">
                {session.user?.email}
              </span>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="text-slate-400 hover:text-red-500"
              >
                <LogOut className="h-4 w-4" />
              </Button>
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
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-slate-300 hover:border-teal-400 hover:bg-teal-50"
          >
            <ShoppingCart className="h-4 w-4 text-slate-600" />
          </Button>
        </div>
      </div>
    </header>
  );
}
