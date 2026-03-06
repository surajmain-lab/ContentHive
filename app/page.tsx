import { Navbar } from '@/components/landing/Navbar'
import { Hero } from '@/components/landing/Hero'
import { FloatingElements } from '@/components/landing/FloatingElements'
import { Features } from '@/components/landing/Features'
import { Process } from '@/components/landing/Process'
import { Testimonials } from '@/components/landing/Testimonials'
import { Pricing } from '@/components/landing/Pricing'
import { FAQ } from '@/components/landing/FAQ'
import { Footer } from '@/components/landing/Footer'

export default function RootPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 border-[0.5rem] md:border-[1rem] border-gray-100 rounded-[1.5rem] md:rounded-[2.5rem] m-2 md:m-4 overflow-hidden relative">
      <Navbar />

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <FloatingElements />
        <Hero />
      </div>

      {/* Main Content Sections */}
      <div className="relative z-10 bg-white">
        <Features />
        <Process />
        <Testimonials />
        <Pricing />
        <FAQ />
      </div>

      <Footer />
    </main>
  )
}
