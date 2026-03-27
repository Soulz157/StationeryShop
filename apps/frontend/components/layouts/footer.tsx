'use client'

export default function Footer() {
  return (
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
  )
}
