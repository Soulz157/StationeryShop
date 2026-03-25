"use client";

import {
  ArrowRight,
  Book,
  Palette,
  PenTool,
  ShoppingCart,
  Mail,
  User,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight text-slate-800"
          >
            Stationery Store.
          </Link>
          <nav className="hidden md:flex gap-8 font-medium text-sm">
            <a
              href="#"
              className="text-slate-600 hover:text-teal-600 transition-colors"
            >
              Pens
            </a>
            <a
              href="#"
              className="text-slate-600 hover:text-teal-600 transition-colors"
            >
              Notebooks
            </a>
            <a
              href="#"
              className="text-slate-600 hover:text-teal-600 transition-colors"
            >
              Art Supplies
            </a>
            <a
              href="#"
              className="text-slate-600 hover:text-teal-600 transition-colors"
            >
              Accessories
            </a>
          </nav>
          <div className="flex items-center gap-3">
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

      <main className="flex-1 w-full">
        {/* Hero Section - 60% Slate background */}
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
                {/* 10% Indigo - Primary CTA */}
                <Button
                  size="lg"
                  className="rounded-full h-12 px-8 text-base bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  Shop Now
                </Button>
                {/* 30% Teal - Secondary CTA */}
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full h-12 px-8 text-base group border-teal-400 text-teal-700 hover:bg-teal-50"
                >
                  Explore Collections
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Categories - 30% Teal accents */}
        <section className="py-24 container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-800">
              Shop by Category
            </h2>
            <p className="mt-2 text-slate-500">
              Everything you need, beautifully organized.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="group cursor-pointer hover:shadow-xl transition-all border-none bg-gradient-to-br from-slate-100 to-teal-50">
              <CardContent className="flex flex-col items-center justify-center p-10 text-center">
                <div className="p-4 rounded-full bg-teal-100 mb-4 group-hover:scale-110 transition-transform group-hover:bg-teal-200">
                  <PenTool className="h-8 w-8 text-teal-700" />
                </div>
                <h3 className="font-semibold text-xl text-slate-800">
                  Fine Pens
                </h3>
                <p className="text-sm mt-2 text-slate-500">
                  Fountain, Rollerball, & More
                </p>
              </CardContent>
            </Card>
            <Card className="group cursor-pointer hover:shadow-xl transition-all border-none bg-gradient-to-br from-slate-100 to-cyan-50">
              <CardContent className="flex flex-col items-center justify-center p-10 text-center">
                <div className="p-4 rounded-full bg-cyan-100 mb-4 group-hover:scale-110 transition-transform group-hover:bg-cyan-200">
                  <Book className="h-8 w-8 text-cyan-700" />
                </div>
                <h3 className="font-semibold text-xl text-slate-800">
                  Notebooks
                </h3>
                <p className="text-sm mt-2 text-slate-500">
                  Premium Paper & Journals
                </p>
              </CardContent>
            </Card>
            <Card className="group cursor-pointer hover:shadow-xl transition-all border-none bg-gradient-to-br from-slate-100 to-indigo-50">
              <CardContent className="flex flex-col items-center justify-center p-10 text-center">
                <div className="p-4 rounded-full bg-indigo-100 mb-4 group-hover:scale-110 transition-transform group-hover:bg-indigo-200">
                  <Palette className="h-8 w-8 text-indigo-700" />
                </div>
                <h3 className="font-semibold text-xl text-slate-800">
                  Art Supplies
                </h3>
                <p className="text-sm mt-2 text-slate-500">
                  Inks, Paints, & Brushes
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Bestselling Products */}
        <section className="py-24 bg-slate-100">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-end mb-12 max-w-6xl mx-auto">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-800">
                  Bestsellers
                </h2>
                <p className="mt-2 text-slate-500">
                  Our most loved stationery.
                </p>
              </div>
              <Button
                variant="ghost"
                className="hidden sm:flex group text-teal-700 hover:text-teal-800 hover:bg-teal-50"
              >
                View all
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {/* Product 1 */}
              <div className="group relative">
                <div className="aspect-square w-full rounded-2xl bg-white overflow-hidden flex items-center justify-center mb-4 transition-all border border-slate-200 group-hover:border-teal-300 shadow-sm">
                  <div className="w-32 h-3/4 bg-gradient-to-b from-slate-200 to-slate-300 rounded-sm transform -rotate-12 transition-transform group-hover:rotate-0 duration-500"></div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-lg text-slate-800">
                      Classic Fountain Pen
                    </h3>
                    <p className="text-slate-500 text-sm">Matte Black</p>
                  </div>
                  <p className="font-semibold text-teal-700">$45.00</p>
                </div>
                <Button className="w-full mt-4 rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 absolute bottom-16 lg:bottom-12 z-10 shadow-lg bg-indigo-600 hover:bg-indigo-700 text-white">
                  Add to Cart
                </Button>
              </div>

              {/* Product 2 */}
              <div className="group relative">
                <div className="aspect-square w-full rounded-2xl bg-white overflow-hidden flex items-center justify-center mb-4 transition-all border border-slate-200 group-hover:border-teal-300 shadow-sm">
                  <div className="w-3/4 h-48 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-md transition-transform group-hover:scale-105 duration-500"></div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-lg text-slate-800">
                      Leather Journal
                    </h3>
                    <p className="text-slate-500 text-sm">A5, Dot Grid</p>
                  </div>
                  <p className="font-semibold text-teal-700">$28.00</p>
                </div>
                <Button className="w-full mt-4 rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 absolute bottom-16 lg:bottom-12 z-10 shadow-lg bg-indigo-600 hover:bg-indigo-700 text-white">
                  Add to Cart
                </Button>
              </div>

              {/* Product 3 */}
              <div className="group relative">
                <div className="aspect-square w-full rounded-2xl bg-white overflow-hidden flex items-center justify-center mb-4 transition-all border border-slate-200 group-hover:border-teal-300 shadow-sm">
                  <div className="w-16 h-20 bg-gradient-to-b from-indigo-200 to-indigo-300 rounded-sm m-2"></div>
                  <div className="w-16 h-20 bg-gradient-to-b from-teal-200 to-teal-300 rounded-sm m-2"></div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-lg text-slate-800">
                      Calligraphy Ink Set
                    </h3>
                    <p className="text-slate-500 text-sm">3 Colors</p>
                  </div>
                  <p className="font-semibold text-teal-700">$32.00</p>
                </div>
                <Button className="w-full mt-4 rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 absolute bottom-16 lg:bottom-12 z-10 shadow-lg bg-indigo-600 hover:bg-indigo-700 text-white">
                  Add to Cart
                </Button>
              </div>

              {/* Product 4 */}
              <div className="group relative">
                <div className="aspect-square w-full rounded-2xl bg-white overflow-hidden flex items-center justify-center mb-4 transition-all border border-slate-200 group-hover:border-teal-300 shadow-sm">
                  <div className="w-48 h-32 bg-gradient-to-br from-cyan-100 to-slate-200 rounded-md transition-transform group-hover:scale-105 duration-500"></div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-lg text-slate-800">
                      Brass Desk Organizer
                    </h3>
                    <p className="text-slate-500 text-sm">Solid Brass</p>
                  </div>
                  <p className="font-semibold text-teal-700">$65.00</p>
                </div>
                <Button className="w-full mt-4 rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 absolute bottom-16 lg:bottom-12 z-10 shadow-lg bg-indigo-600 hover:bg-indigo-700 text-white">
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section - 10% Indigo accent background */}
        <section className="py-24 container mx-auto px-6">
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
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 border-t border-slate-200 bg-white">
        <div className="container mx-auto px-6 flex flex-col items-center">
          <div className="text-2xl font-bold tracking-tight mb-4 text-slate-800">
            Stationery Store.
          </div>
          <p className="text-slate-500 text-sm text-center">
            &copy; {new Date().getFullYear()} Stationery Store Inc. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
