"use client";
import { Navbar, Footer } from "@/components/layouts";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div className="min-h-[70vh]">{children}</div>
      <Footer />
    </>
  );
}
