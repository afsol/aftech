import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import '@fortawesome/fontawesome-free/css/all.min.css';


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AF TECHNOLOGIES Technologies - CCTV & Solar Installation Services Islamabad",
  description:
    "Professional CCTV and Solar installation services in Islamabad. Best security cameras, solar panels, and renewable energy solutions with expert installation.",
  keywords:
    "CCTV installation Islamabad, Solar panels Pakistan, Security cameras, Solar energy systems, AF TECHNOLOGIES Technologies",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
