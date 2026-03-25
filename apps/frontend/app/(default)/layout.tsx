"use client";
import { Navbar } from "@/components/layouts";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div className="min-h-[70vh]">{children}</div>
    </>
  );
}
