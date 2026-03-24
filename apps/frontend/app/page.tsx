"use client";

import {
  ArrowRight,
  Book,
  Palette,
  PenTool,
  ShoppingCart,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-stone-50 dark:bg-stone-950 font-sans text-stone-900 dark:text-stone-50">
      {/* 🟢 Navbar (Simplified) */}
      <header className="sticky top-0 z-50 w-full border-b border-stone-200 bg-white/80 backdrop-blur-md dark:border-stone-800 dark:bg-stone-950/80">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="text-2xl font-bold tracking-tight">PenShop.</div>
          <nav className="hidden md:flex gap-6 font-medium text-sm">
            <a href="#" className="hover:text-stone-600 transition-colors">
              Pens
            </a>
            <a href="#" className="hover:text-stone-600 transition-colors">
              Notebooks
            </a>
            <a href="#" className="hover:text-stone-600 transition-colors">
              Art Supplies
            </a>
            <a href="#" className="hover:text-stone-600 transition-colors">
              Accessories
            </a>
          </nav>
          <Button variant="outline" size="icon" className="rounded-full">
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <main className="flex-1 w-full">
        {/* 🟢 1. Hero Section */}
        <section className="relative overflow-hidden bg-stone-100 dark:bg-stone-900 py-24 sm:py-32 isolate">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-stone-200 via-stone-100 to-transparent dark:from-stone-800 dark:via-stone-900 opacity-70"></div>
          <div className="container mx-auto px-6 text-center lg:px-8">
            <div className="mx-auto max-w-3xl">
              <h1 className="mt-4 text-5xl font-extrabold tracking-tight sm:text-7xl">
                The Art of <span className="text-stone-500">Writing.</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-stone-600 dark:text-stone-400 max-w-xl mx-auto">
                Discover our curated collection of premium fountain pens, craft
                notebooks, and artisan supplies designed for the modern creator.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-4">
                <Button size="lg" className="rounded-full h-12 px-8 text-base">
                  Shop Now
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full h-12 px-8 text-base group"
                >
                  Explore Collections
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 🟢 2. Featured Categories */}
        <section className="py-24 container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight">
              Shop by Category
            </h2>
            <p className="mt-2 text-stone-500 dark:text-stone-400">
              Everything you need, beautifully organized.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="group cursor-pointer hover:shadow-lg transition-all border-none bg-stone-100 dark:bg-stone-900">
              <CardContent className="flex flex-col items-center justify-center p-10 text-center">
                <div className="p-4 rounded-full bg-white dark:bg-stone-800 mb-4 shadow-sm group-hover:scale-110 transition-transform">
                  <PenTool className="h-8 w-8 text-stone-700 dark:text-stone-300" />
                </div>
                <h3 className="font-semibold text-xl">Fine Pens</h3>
                <p className="text-sm mt-2 text-stone-500">
                  Fountain, Rollerball, & More
                </p>
              </CardContent>
            </Card>
            <Card className="group cursor-pointer hover:shadow-lg transition-all border-none bg-stone-100 dark:bg-stone-900">
              <CardContent className="flex flex-col items-center justify-center p-10 text-center">
                <div className="p-4 rounded-full bg-white dark:bg-stone-800 mb-4 shadow-sm group-hover:scale-110 transition-transform">
                  <Book className="h-8 w-8 text-stone-700 dark:text-stone-300" />
                </div>
                <h3 className="font-semibold text-xl">Notebooks</h3>
                <p className="text-sm mt-2 text-stone-500">
                  Premium Paper & Journals
                </p>
              </CardContent>
            </Card>
            <Card className="group cursor-pointer hover:shadow-lg transition-all border-none bg-stone-100 dark:bg-stone-900">
              <CardContent className="flex flex-col items-center justify-center p-10 text-center">
                <div className="p-4 rounded-full bg-white dark:bg-stone-800 mb-4 shadow-sm group-hover:scale-110 transition-transform">
                  <Palette className="h-8 w-8 text-stone-700 dark:text-stone-300" />
                </div>
                <h3 className="font-semibold text-xl">Art Supplies</h3>
                <p className="text-sm mt-2 text-stone-500">
                  Inks, Paints, & Brushes
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 🟢 3. Bestselling Products */}
        <section className="py-24 bg-stone-100 dark:bg-stone-900/50">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-end mb-12 max-w-6xl mx-auto">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">
                  Bestsellers
                </h2>
                <p className="mt-2 text-stone-500 dark:text-stone-400">
                  Our most loved stationery.
                </p>
              </div>
              <Button variant="ghost" className="hidden sm:flex group">
                View all{" "}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {/* Product 1 */}
              <div className="group relative">
                <div className="aspect-square w-full rounded-2xl bg-white dark:bg-stone-800 overflow-hidden flex items-center justify-center mb-4 transition-all border border-stone-200 dark:border-stone-800 group-hover:border-stone-300 shadow-sm">
                  {/* Placeholder for Product Image */}
                  <div className="w-32 h-3/4 bg-stone-200 dark:bg-stone-700 rounded-sm transform -rotate-12 transition-transform group-hover:rotate-0 duration-500"></div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-lg">
                      Classic Fountain Pen
                    </h3>
                    <p className="text-stone-500 text-sm">Matte Black</p>
                  </div>
                  <p className="font-semibold">$45.00</p>
                </div>
                <Button className="w-full mt-4 rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 absolute bottom-16 lg:bottom-12 z-10 shadow-lg">
                  Add to Cart
                </Button>
              </div>

              {/* Product 2 */}
              <div className="group relative">
                <div className="aspect-square w-full rounded-2xl bg-white dark:bg-stone-800 overflow-hidden flex items-center justify-center mb-4 transition-all border border-stone-200 dark:border-stone-800 group-hover:border-stone-300 shadow-sm">
                  <div className="w-3/4 h-48 bg-stone-200 dark:bg-stone-700 rounded-md transition-transform group-hover:scale-105 duration-500"></div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-lg">Leather Journal</h3>
                    <p className="text-stone-500 text-sm">A5, Dot Grid</p>
                  </div>
                  <p className="font-semibold">$28.00</p>
                </div>
                <Button className="w-full mt-4 rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 absolute bottom-16 lg:bottom-12 z-10 shadow-lg">
                  Add to Cart
                </Button>
              </div>

              {/* Product 3 */}
              <div className="group relative">
                <div className="aspect-square w-full rounded-2xl bg-white dark:bg-stone-800 overflow-hidden flex items-center justify-center mb-4 transition-all border border-stone-200 dark:border-stone-800 group-hover:border-stone-300 shadow-sm">
                  <div className="w-16 h-20 bg-stone-200 dark:bg-stone-700 rounded-sm m-2"></div>
                  <div className="w-16 h-20 bg-stone-300 dark:bg-stone-600 rounded-sm m-2"></div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-lg">Calligraphy Ink Set</h3>
                    <p className="text-stone-500 text-sm">3 Colors</p>
                  </div>
                  <p className="font-semibold">$32.00</p>
                </div>
                <Button className="w-full mt-4 rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 absolute bottom-16 lg:bottom-12 z-10 shadow-lg">
                  Add to Cart
                </Button>
              </div>

              {/* Product 4 */}
              <div className="group relative">
                <div className="aspect-square w-full rounded-2xl bg-white dark:bg-stone-800 overflow-hidden flex items-center justify-center mb-4 transition-all border border-stone-200 dark:border-stone-800 group-hover:border-stone-300 shadow-sm">
                  <div className="w-48 h-32 bg-stone-200 dark:bg-stone-700 rounded-md transition-transform group-hover:scale-105 duration-500"></div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-lg">
                      Brass Desk Organizer
                    </h3>
                    <p className="text-stone-500 text-sm">Solid Brass</p>
                  </div>
                  <p className="font-semibold">$65.00</p>
                </div>
                <Button className="w-full mt-4 rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 absolute bottom-16 lg:bottom-12 z-10 shadow-lg">
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 🟢 4. Newsletter Section */}
        <section className="py-24 container mx-auto px-6">
          <div className="max-w-3xl mx-auto bg-stone-900 dark:bg-stone-100 dark:text-stone-900 text-white rounded-3xl p-12 text-center md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-8 -mr-8 text-stone-800/10 dark:text-white/20">
              <Mail className="h-64 w-64 -rotate-12" />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Join the PenClub
              </h2>
              <p className="mt-4 text-stone-300 dark:text-stone-600 text-lg">
                Subscribe to get special offers, free giveaways, and
                once-in-a-lifetime deals.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="h-12 bg-white/10 dark:bg-black/5 border-white/20 dark:border-black/10 text-white dark:text-black placeholder:text-stone-400 dark:placeholder:text-stone-500 focus-visible:ring-stone-500"
                />
                <Button className="h-12 px-8 bg-white text-stone-900 hover:bg-stone-200 dark:bg-black dark:text-white dark:hover:bg-stone-800 rounded-md sm:w-auto w-full transition-colors">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 🟢 Footer */}
      <footer className="w-full py-12 border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
        <div className="container mx-auto px-6 flex flex-col items-center">
          <div className="text-2xl font-bold tracking-tight mb-4">PenShop.</div>
          <p className="text-stone-500 dark:text-stone-400 text-sm text-center">
            &copy; {new Date().getFullYear()} PenShop Inc. All rights reserved.
            Made with ❤️ and Next.js.
          </p>
        </div>
      </footer>
    </div>
  );
}
