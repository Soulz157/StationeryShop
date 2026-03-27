import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function BestSeller() {
  return (
    <section className="py-24 bg-slate-100">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-12 max-w-6xl mx-auto">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-800">
              Bestsellers
            </h2>
            <p className="mt-2 text-slate-500">Our most loved stationery.</p>
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
  )
}
