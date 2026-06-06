import { useState } from 'react'
import { motion } from 'motion/react'
import { Zap, Command, Layers, Share2, Search, CheckCircle2, Server } from 'lucide-react'

export default function Features() {
  const [activeTab, setActiveTab] = useState('db')
  const [cmdSearch, setCmdSearch] = useState('')

  const integrationList = [
    { id: 'db', name: 'PostgreSQL', type: 'Database', icon: Server },
    { id: 'stripe', name: 'Stripe', type: 'Payments', icon: Zap },
    { id: 'slack', name: 'Slack', type: 'Chatops', icon: Share2 },
    { id: 'aws', name: 'AWS Lambda', type: 'Executors', icon: Layers }
  ]

  const mockCommands = [
    { title: 'Create new workflow', shortcut: '⌘N' },
    { title: 'Connect new database', shortcut: '⌘D' },
    { title: 'Import workspace settings', shortcut: '⌘I' },
    { title: 'Open system logs', shortcut: '⌘L' }
  ].filter(c => c.title.toLowerCase().includes(cmdSearch.toLowerCase()))

  return (
    <section id="features" className="py-20 md:py-28 relative border-t border-white/5 bg-zinc-950/20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-2xl text-left mb-16 md:mb-24">
          <h2 className="text-xs uppercase tracking-widest font-semibold text-zinc-400">Features</h2>
          <p className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-white">
            Designed for builders. <br />
            Engineered for scale.
          </p>
          <p className="mt-4 text-zinc-400 text-lg">
            Aether replaces complex backend boilerplate with highly performant, automated event loops. 
            Connect everything, monitor everywhere, scale automatically.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Node-based Workflows (Spans 2 columns) */}
          <div className="md:col-span-2 rounded-2xl glass-panel p-8 flex flex-col justify-between overflow-hidden relative group min-h-[380px]">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="max-w-md">
              <span className="p-2 rounded-lg bg-white/10 text-white inline-block mb-4">
                <Layers className="w-5 h-5" />
              </span>
              <h3 className="text-xl font-semibold text-white">Visual Workflow Builder</h3>
              <p className="mt-2 text-zinc-400 text-sm">
                Map complex database triggers, conditionals, and API payloads visually. Direct node exports to production code in one click.
              </p>
            </div>

            {/* Node Animation Showcase */}
            <div className="mt-8 relative h-40 bg-zinc-950/40 rounded-xl border border-white/5 flex items-center justify-around p-4">
              {/* Grid backdrop */}
              <div className="absolute inset-0 bg-grid-pattern opacity-40 rounded-xl" />
              
              {/* Node 1 */}
              <div className="relative z-10 px-3 py-2 rounded-lg bg-zinc-900 border border-white/10 flex items-center gap-2 shadow-lg">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-xs font-mono text-white">webhook_trigger</span>
              </div>

              {/* Connected Line SVG */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                <path
                   d="M 170 80 Q 250 40 330 80"
                   fill="transparent"
                   stroke="rgba(255, 255, 255, 0.1)"
                   strokeWidth="2"
                />
                <motion.path
                  d="M 170 80 Q 250 40 330 80"
                  fill="transparent"
                  stroke="url(#glow-gradient)"
                  strokeWidth="2.5"
                  strokeDasharray="10 30"
                  animate={{ strokeDashoffset: [-60, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
                />
                <defs>
                  <linearGradient id="glow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#71717a" />
                  </linearGradient>
                </defs>
              </svg>
 
              {/* Node 2 */}
              <div className="relative z-10 px-3 py-2 rounded-lg bg-zinc-900 border border-white/10 flex items-center gap-2 shadow-lg">
                <div className="w-2 h-2 rounded-full bg-zinc-400" />
                <span className="text-xs font-mono text-white">transform_payload</span>
              </div>

              {/* Connected Line SVG 2 */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                <path
                  d="M 470 80 Q 560 120 650 80"
                  fill="transparent"
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="2"
                />
                <motion.path
                  d="M 470 80 Q 560 120 650 80"
                  fill="transparent"
                  stroke="url(#glow-gradient)"
                  strokeWidth="2.5"
                  strokeDasharray="8 24"
                  animate={{ strokeDashoffset: [-40, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                />
              </svg>
 
              {/* Node 3 */}
              <div className="relative z-10 px-3 py-2 rounded-lg bg-zinc-900 border border-white/10 flex items-center gap-2 shadow-lg">
                <div className="w-2 h-2 rounded-full bg-zinc-300" />
                <span className="text-xs font-mono text-white">slack_notify</span>
              </div>
            </div>
          </div>

          {/* Card 2: Command Bar (Spans 1 column) */}
          <div className="rounded-2xl glass-panel p-8 flex flex-col justify-between min-h-[380px] relative group">
            <div>
              <span className="p-2 rounded-lg bg-white/10 text-white inline-block mb-4">
                <Command className="w-5 h-5" />
              </span>
              <h3 className="text-xl font-semibold text-white">Command Bar</h3>
              <p className="mt-2 text-zinc-400 text-sm">
                Control your workspace without touching the mouse. Instantly search files, triggers, logs, and settings.
              </p>
            </div>

            {/* Interactive Mockup */}
            <div className="mt-6 rounded-xl bg-zinc-950/60 border border-white/5 p-3 flex flex-col gap-2 relative">
              <div className="flex items-center gap-2 bg-white/5 border border-white/5 rounded-lg px-2.5 py-1.5">
                <Search className="w-3.5 h-3.5 text-zinc-500" />
                <input
                  type="text"
                  value={cmdSearch}
                  onChange={(e) => setCmdSearch(e.target.value)}
                  placeholder="Type a command..."
                  className="bg-transparent border-none text-[11px] text-white outline-none w-full placeholder-zinc-600"
                />
              </div>
              <div className="flex flex-col gap-1 text-[10px] font-mono">
                {mockCommands.map((cmd, i) => (
                  <div key={i} className="flex items-center justify-between px-2 py-1.5 rounded hover:bg-white/5 text-zinc-400 hover:text-white transition-colors cursor-pointer">
                    <span>{cmd.title}</span>
                    <span className="text-zinc-600">{cmd.shortcut}</span>
                  </div>
                ))}
                {mockCommands.length === 0 && (
                  <div className="text-zinc-600 px-2 py-3 text-center">No commands found</div>
                )}
              </div>
            </div>
          </div>

          {/* Card 3: Database & Integrations (Spans 1 column) */}
          <div className="rounded-2xl glass-panel p-8 flex flex-col justify-between min-h-[380px] relative group">
            <div>
              <span className="p-2 rounded-lg bg-white/10 text-white inline-block mb-4">
                <Zap className="w-5 h-5" />
              </span>
              <h3 className="text-xl font-semibold text-white">Universal Integrations</h3>
              <p className="mt-2 text-zinc-400 text-sm">
                Aether integrates natively with standard production toolchains and APIs.
              </p>
            </div>

            {/* Selector Grid */}
            <div className="mt-6 grid grid-cols-2 gap-2">
              {integrationList.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all duration-300 ${
                    activeTab === item.id
                      ? 'bg-white/10 border-white/40 text-white'
                      : 'bg-zinc-950/20 border-white/5 text-zinc-500 hover:text-zinc-300 hover:border-white/10'
                  }`}
                >
                  <item.icon className={`w-4 h-4 mb-2 ${activeTab === item.id ? 'text-white' : 'text-zinc-600'}`} />
                  <div className="text-[11px] font-semibold tracking-tight">{item.name}</div>
                  <div className="text-[9px] text-zinc-500">{item.type}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 4: Global Scale & Latency (Spans 2 columns) */}
          <div className="md:col-span-2 rounded-2xl glass-panel p-8 flex flex-col justify-between min-h-[380px] relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[90px] pointer-events-none" />
            
            <div className="max-w-md">
              <span className="p-2 rounded-lg bg-white/10 text-white inline-block mb-4">
                <Layers className="w-5 h-5" />
              </span>
              <h3 className="text-xl font-semibold text-white">Serverless Edge Loop</h3>
              <p className="mt-2 text-zinc-400 text-sm">
                Workflows run distributed across 120 global edge locations, yielding close to zero startup latencies and full automatic failover redundancy.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 bg-zinc-950/40 p-5 rounded-xl border border-white/5 relative z-10">
              <div className="text-left">
                <div className="text-xs text-zinc-500 font-mono">EDGE POPS</div>
                <div className="text-2xl font-semibold text-white mt-1">120+</div>
                <div className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Worldwide coverage
                </div>
              </div>
              <div className="text-left border-t sm:border-t-0 sm:border-l border-white/5 pt-4 sm:pt-0 sm:pl-6">
                <div className="text-xs text-zinc-500 font-mono">LATENCY P99</div>
                <div className="text-2xl font-semibold text-white mt-1">12ms</div>
                <div className="text-[10px] text-zinc-400 mt-1">Under high-frequency load</div>
              </div>
              <div className="text-left border-t sm:border-t-0 sm:border-l border-white/5 pt-4 sm:pt-0 sm:pl-6">
                <div className="text-xs text-zinc-500 font-mono">UPTIME</div>
                <div className="text-2xl font-semibold text-white mt-1">99.999%</div>
                <div className="text-[10px] text-emerald-400 mt-1">Guaranteed by SLA</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
