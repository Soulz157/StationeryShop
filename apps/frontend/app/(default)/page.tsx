import { ArrowRight, Book, Palette, PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import FeatureCategory from "./components/feature-category";
import BestSeller from "./components/best-seller";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const isAuthenticated = !!session;
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-900">
      <main className="flex-1 w-full">
        <section className="relative overflow-hidden bg-gradient-to-b from-slate-100 to-slate-50 py-24 sm:py-32">
          <div className="absolute inset-0 -z-10 opacity-30">
            <div className="absolute top-20 left-10 w-72 h-72 bg-teal-200 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-200 rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto px-6 text-center lg:px-8">
            <div className="mx-auto max-w-3xl">
              <h1 className="mt-4 text-5xl font-extrabold tracking-tight sm:text-7xl text-slate-800 text-balance">
                The Art of <span className="text-teal-600">Writing.</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-600 max-w-xl mx-auto text-pretty">
                Discover our curated collection of premium fountain pens, craft
                notebooks, and artisan supplies designed for the modern creator.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-4">
                {isAuthenticated ? (
                  <Link href="/products">
                    <Button
                      size="lg"
                      className="rounded-full cursor-pointer h-12 px-8 text-base bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                      Shop Now
                    </Button>
                  </Link>
                ) : (
                  <Link href="/login">
                    <Button
                      size="lg"
                      className="rounded-full cursor-pointer h-12 px-8 text-base bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                      Shop Now
                    </Button>
                  </Link>
                )}
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full cursor-pointer h-12 px-8 text-base group border-teal-400 text-teal-700 hover:bg-teal-50"
                >
                  Explore Collections
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        <FeatureCategory />
        <BestSeller />

        {/* Newsletter Section*/}
        {/* <section className="py-24 container mx-auto px-6">
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-indigo-600 to-indigo-800 text-white rounded-3xl p-12 text-center md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-8 -mr-8 text-white/10">
              <Mail className="h-64 w-64 -rotate-12" />
            </div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-400/20 rounded-full blur-2xl" />
            <div className="relative z-10">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Join the PenClub
              </h2>
              <p className="mt-4 text-indigo-200 text-lg">
                Subscribe to get special offers, free giveaways, and
                once-in-a-lifetime deals.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="h-12 bg-white/10 border-white/20 text-white placeholder:text-indigo-300 focus-visible:ring-teal-400"
                />
                <Button className="h-12 px-8 bg-teal-500 text-white hover:bg-teal-400 rounded-md sm:w-auto w-full transition-colors">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </section> */}
      </main>
    </div>
  );
}
