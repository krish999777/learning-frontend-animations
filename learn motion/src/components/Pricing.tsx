import { useState } from 'react'
import { motion } from 'motion/react'
import { Check } from 'lucide-react'

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')

  const tiers = [
    {
      name: 'Starter',
      price: billingPeriod === 'monthly' ? 0 : 0,
      description: 'Ideal for side projects and individual builders looking to get started.',
      features: [
        'Up to 3 active workflows',
        '1,000 executions per month',
        'Standard 3-day log retention',
        'Community forum support'
      ],
      buttonText: 'Start for Free',
      popular: false,
      href: '#free'
    },
    {
      name: 'Pro',
      price: billingPeriod === 'monthly' ? 29 : 24,
      description: 'Perfect for growing developer teams requiring robust production automation.',
      features: [
        'Unlimited active workflows',
        '100,000 executions per month',
        '30-day detailed log retention',
        'Priority email support (under 4h)',
        'Custom webhooks & integrations',
        'Multi-participant permission roles'
      ],
      buttonText: 'Start 14-day Free Trial',
      popular: true,
      href: '#pro'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Tailored limits, high-frequency security SLAs, and dedicated support pipelines.',
      features: [
        'Custom workflow and execution volume',
        '1-year cold-storage log retention',
        'Dedicated server isolation options',
        'Dedicated Slack channel & TAM',
        '99.999% SLA guarantee',
        'SAML/SSO integration'
      ],
      buttonText: 'Contact Sales',
      popular: false,
      href: '#enterprise'
    }
  ]

  return (
    <section id="pricing" className="py-20 md:py-28 relative border-t border-white/5 bg-grid-pattern">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs uppercase tracking-widest font-semibold text-zinc-400">Pricing</h2>
          <p className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-white">
            Simple, developer-first pricing.
          </p>
          <p className="mt-4 text-zinc-400">
            Start for free and scale as your traffic grows. No credit card required.
          </p>

          {/* Toggle Switch */}
          <div className="mt-8 inline-flex items-center gap-1.5 p-1 rounded-full bg-zinc-900 border border-white/5">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                billingPeriod === 'monthly'
                  ? 'bg-white text-black shadow'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
                billingPeriod === 'yearly'
                  ? 'bg-white text-black shadow'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>Yearly</span>
              <span className="px-1.5 py-0.5 rounded-full bg-white/10 text-white text-[9px] font-bold">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`rounded-2xl flex flex-col justify-between p-8 relative transition-all duration-300 ${
                tier.popular
                  ? 'glass-panel border-white/30 shadow-2xl shadow-white/5 bg-zinc-900/60'
                  : 'glass-panel bg-zinc-950/40 border-white/5'
              }`}
            >
              {/* Popular Badge */}
              {tier.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white text-black text-[10px] font-bold uppercase tracking-wider shadow-md">
                  Most Popular
                </span>
              )}

              <div>
                {/* Name */}
                <h3 className="text-lg font-semibold text-white text-left">{tier.name}</h3>
                
                {/* Description */}
                <p className="mt-2 text-xs text-zinc-400 text-left min-h-[40px]">
                  {tier.description}
                </p>

                {/* Price */}
                <div className="mt-6 flex items-baseline gap-1 text-left">
                  <span className="text-4xl font-semibold tracking-tight text-white font-mono">
                    {typeof tier.price === 'number' ? `$${tier.price}` : tier.price}
                  </span>
                  {typeof tier.price === 'number' && (
                    <span className="text-xs text-zinc-500">/month</span>
                  )}
                </div>

                {billingPeriod === 'yearly' && typeof tier.price === 'number' && tier.price > 0 && (
                  <div className="text-[10px] text-zinc-400 font-mono text-left mt-1">
                    Billed annually (${tier.price * 12}/yr)
                  </div>
                )}

                <hr className="my-6 border-white/5" />

                {/* Features List */}
                <ul className="flex flex-col gap-3 text-left">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <Check className="w-4 h-4 text-white shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="mt-8">
                <a
                  href={tier.href}
                  className={`block w-full py-2.5 rounded-lg text-center text-xs font-semibold tracking-wide transition-all ${
                    tier.popular
                      ? 'bg-white hover:bg-zinc-200 text-black shadow-lg shadow-white/5'
                      : 'bg-zinc-900 border border-white/10 hover:border-white/20 text-white'
                  }`}
                >
                  {tier.buttonText}
                </a>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
