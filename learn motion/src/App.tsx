import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Pricing from './components/Pricing'
import CTA from './components/CTA'
import Footer from './components/Footer'

function App() {
  return (
    <div className="bg-black text-zinc-400 min-h-screen overflow-x-hidden font-sans antialiased selection:bg-indigo-500/30 selection:text-white">
      {/* Navbar Header */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Features Bento Grid */}
      <Features />

      {/* Pricing Tiers */}
      <Pricing />

      {/* Call to Action banner */}
      <CTA />

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
