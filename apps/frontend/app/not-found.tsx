"use client";

import Link from "next/link";
import { ArrowLeft, PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-900">
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="mx-auto w-20 h-20 rounded-full bg-teal-100 flex items-center justify-center mb-8">
            <PenTool className="h-10 w-10 text-teal-600" />
          </div>

          <h1 className="text-8xl font-bold text-slate-200 mb-4">404</h1>

          <h2 className="text-2xl font-semibold text-slate-800 mb-2">
            Page Not Found
          </h2>
          <p className="text-slate-500 mb-8">
            Sorry, the page you are looking for does not exist or has been
            moved.
          </p>

          <Link href="/">
            <Button className="rounded-full h-12 px-8 bg-indigo-600 hover:bg-indigo-700 text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </main>

      <footer className="py-6 border-t border-slate-200 bg-white">
        <div className="container mx-auto px-6 text-center">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} Stationery Store Inc.
          </p>
        </div>
      </footer>
    </div>
  );
}
