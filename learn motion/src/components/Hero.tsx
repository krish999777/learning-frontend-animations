import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { ArrowRight, Play, Terminal, Database, Activity, Cpu, ShieldCheck } from 'lucide-react'

export default function Hero() {
  const [latency, setLatency] = useState(14)
  const [cpuUsage, setCpuUsage] = useState(24)
  const [logs, setLogs] = useState<string[]>([
    'GET /api/v1/auth/session - 200 OK (8ms)',
    'POST /api/v1/workflows/trigger - 202 Accepted (24ms)',
    'GET /api/v1/analytics/realtime - 200 OK (12ms)'
  ])

  // Telemetry simulation
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate slight latency changes
      setLatency((prev) => Math.max(8, Math.min(45, prev + Math.floor(Math.random() * 7) - 3)))
      // Simulate CPU changes
      setCpuUsage((prev) => Math.max(10, Math.min(95, prev + Math.floor(Math.random() * 11) - 5)))
      
      // Rotate logs
      const apiEndpoints = [
        'GET /api/v1/user/profile - 200 OK',
        'POST /api/v1/billing/checkout - 201 Created',
        'GET /api/v1/workflows/nodes - 200 OK',
        'PUT /api/v1/settings/webhook - 200 OK',
        'DELETE /api/v1/cache/clear - 200 OK'
      ]
      const randomApi = apiEndpoints[Math.floor(Math.random() * apiEndpoints.length)]
      const time = Math.floor(Math.random() * 30) + 5
      const newLog = `${randomApi} (${time}ms)`
      
      setLogs((prev) => [newLog, ...prev.slice(0, 2)])
    }, 2500)

    return () => clearInterval(interval)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  }

  const badgeVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const
      }
    }
  }

  const mockupVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  }

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-grid-pattern">
      {/* Glow backgrounds */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-20 left-1/3 w-[300px] h-[300px] bg-zinc-800/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center"
      >
        {/* Badge */}
        <motion.a
          href="#features"
          variants={badgeVariants}
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/5 text-xs font-medium text-zinc-300 hover:border-white/20 transition-all duration-300 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span>Aether Workflows is now in public beta</span>
          <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
        </motion.a>

        {/* Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-4xl leading-[1.1]"
        >
          Build software workflows <br />
          <span className="bg-gradient-to-r from-zinc-200 via-white to-zinc-400 bg-clip-text text-transparent">
            at the speed of thought
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="mt-6 text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed"
        >
          Aether is the visual automation and operations center built for developer teams. 
          Connect your API, database, and infrastructure in seconds.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="#signup"
            className="w-full sm:w-auto px-6 py-3 rounded-lg bg-white text-black text-sm font-medium hover:bg-zinc-200 transition-colors shadow-xl shadow-white/5 flex items-center justify-center gap-2"
          >
            <span>Start building free</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#demo"
            className="w-full sm:w-auto px-6 py-3 rounded-lg bg-zinc-900 border border-white/5 hover:border-white/10 text-white text-sm font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 text-zinc-500" />
            <span>Watch 2-min demo</span>
          </a>
        </motion.div>

        {/* Product UI Mockup */}
        <motion.div
          variants={mockupVariants}
          className="mt-20 w-full max-w-5xl rounded-2xl glass-panel glass-panel-glow overflow-hidden relative"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-zinc-950/40">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-4 text-xs font-mono text-zinc-500">project_production.aether</span>
            </div>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5 text-xs text-green-400 bg-green-500/5 px-2.5 py-0.5 rounded-full border border-green-500/10">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
                Operational
              </span>
            </div>
          </div>

          {/* Body Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 min-h-[360px] text-left">
            {/* Sidebar */}
            <div className="p-4 border-r border-white/5 bg-zinc-950/20 flex flex-col gap-4 text-xs">
              <div className="text-zinc-500 uppercase font-semibold tracking-wider text-[10px]">Resources</div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 px-2.5 py-2 rounded-lg bg-white/5 text-white">
                  <Activity className="w-4 h-4 text-white" />
                  <span>Real-time Streams</span>
                </div>
                <div className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors">
                  <Database className="w-4 h-4 text-zinc-500" />
                  <span>PostgreSQL Connector</span>
                </div>
                <div className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors">
                  <Terminal className="w-4 h-4 text-zinc-500" />
                  <span>Lambda Executors</span>
                </div>
              </div>
            </div>

            {/* Main Graphic telemetry */}
            <div className="col-span-3 p-6 flex flex-col gap-6 bg-zinc-950/10">
              <div className="grid grid-cols-3 gap-4">
                {/* Metric Card 1 */}
                <div className="p-4 rounded-xl bg-zinc-900/40 border border-white/5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-500 font-medium">Avg API Latency</span>
                    <Activity className="w-4 h-4 text-white" />
                  </div>
                  <div className="mt-2 text-2xl font-semibold text-white tracking-tight font-mono">
                    {latency}ms
                  </div>
                </div>

                {/* Metric Card 2 */}
                <div className="p-4 rounded-xl bg-zinc-900/40 border border-white/5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-500 font-medium">CPU Load</span>
                    <Cpu className="w-4 h-4 text-zinc-300" />
                  </div>
                  <div className="mt-2 text-2xl font-semibold text-white tracking-tight font-mono">
                    {cpuUsage}%
                  </div>
                </div>

                {/* Metric Card 3 */}
                <div className="p-4 rounded-xl bg-zinc-900/40 border border-white/5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-500 font-medium">Security Audits</span>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="mt-2 text-2xl font-semibold text-white tracking-tight font-mono">
                    100%
                  </div>
                </div>
              </div>

              {/* Logs Simulator */}
              <div className="flex-1 p-4 rounded-xl bg-black/60 border border-white/5 flex flex-col gap-2 font-mono text-xs overflow-hidden">
                <div className="text-zinc-500 border-b border-white/5 pb-2 mb-1 flex items-center justify-between">
                  <span>Live Stream Activity Logs</span>
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                </div>
                {logs.map((log, idx) => (
                  <motion.div
                    key={log + idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex items-center gap-2 ${idx === 0 ? 'text-white' : 'text-zinc-500'}`}
                  >
                    <span className="text-[10px] text-zinc-600 font-sans">[{new Date().toLocaleTimeString()}]</span>
                    <span>{log}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
