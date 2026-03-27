import { Card, CardContent } from '@/components/ui/card'
import { Book, Palette, PenTool } from 'lucide-react'

export default function FeatureCategory() {
  return (
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
            <h3 className="font-semibold text-xl text-slate-800">Fine Pens</h3>
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
            <h3 className="font-semibold text-xl text-slate-800">Notebooks</h3>
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
  )
}
