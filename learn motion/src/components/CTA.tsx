import React, { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function CTA() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubmitted(true)
      setEmail('')
    }
  }

  return (
    <section className="py-20 md:py-28 relative border-t border-white/5 overflow-hidden">
      {/* Glow Backdrop */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-white/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="rounded-3xl glass-panel p-8 md:p-16 text-center relative overflow-hidden flex flex-col items-center">
          {/* Internal gradient mesh glow */}
          <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[400px] h-[250px] bg-white/5 rounded-full blur-[90px] pointer-events-none" />

          {/* Icon */}
          <span className="p-2 rounded-lg bg-white/10 text-white inline-block mb-6 relative">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </span>

          {/* Heading */}
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white max-w-2xl leading-tight">
            Start automating your development workflows today
          </h2>
          
          <p className="mt-4 text-zinc-400 text-sm md:text-base max-w-xl">
            Join thousands of developer teams who use Aether to run production workflows without standard server overhead.
          </p>

          {/* Form */}
          <div className="mt-10 w-full max-w-md">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-xl bg-white/10 border border-white/20 text-white text-sm font-medium"
              >
                Thank you! Check your inbox for access instructions.
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email..."
                  className="flex-1 px-4 py-3 rounded-lg bg-zinc-900 border border-white/5 focus:border-white/40 text-white text-sm outline-none transition-colors placeholder-zinc-500"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg bg-white hover:bg-zinc-200 text-black text-sm font-medium transition-colors flex items-center justify-center gap-1.5 shrink-0"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
            <p className="mt-3 text-[10px] text-zinc-500">
              No credit card required. Free plan includes 1,000 executions per month.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
