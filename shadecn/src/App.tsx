import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { 
  Sun, Moon, Sparkles, Cpu, Bot, Terminal, 
  CheckCircle2, Play, ArrowRight, Command, 
  ChevronRight, RefreshCw, Layers, Zap
} from "lucide-react"
import { Button } from "./components/ui/button"

export default function App() {
  const { theme, setTheme } = useTheme()
  const [agentState, setAgentState] = useState<"idle" | "booting" | "analyzing" | "fixing" | "testing" | "merged">("idle")
  const [logs, setLogs] = useState<string[]>([])
  const [resolvedIssuesCount, setResolvedIssuesCount] = useState(0)

  // Force dark theme for the true pitch-black Linear experience
  useEffect(() => {
    setTheme("dark")
  }, [setTheme])

  // Simulation logs
  const simulationSteps = [
    { state: "booting", log: "Initializing Linear Agent v1.0.4...", delay: 600 },
    { state: "analyzing", log: "Analyzing issue: LIN-402 - Cache miss in database handler", delay: 1000 },
    { state: "analyzing", log: "Scanning files: src/db/connection.ts, src/handlers/cache.ts", delay: 800 },
    { state: "fixing", log: "Bottleneck found: Missing Redis client pipeline retry strategy", delay: 900 },
    { state: "fixing", log: "Applying patch: Adding automatic retry connection pool...", delay: 1200 },
    { state: "testing", log: "Running verification suite: 24 tests passed (100% coverage)", delay: 800 },
    { state: "merged", log: "Pull Request #1204 auto-merged by Linear Agent.", delay: 600 },
    { state: "merged", log: "Issue LIN-402 resolved. Status: Closed.", delay: 400 }
  ]

  const startAgentSimulation = async () => {
    if (agentState !== "idle" && agentState !== "merged") return
    
    setAgentState("booting")
    setLogs([])
    
    let currentLogs: string[] = []
    
    for (const step of simulationSteps) {
      setAgentState(step.state as any)
      currentLogs = [...currentLogs, step.log]
      setLogs(currentLogs)
      await new Promise((resolve) => setTimeout(resolve, step.delay))
    }
    
    setResolvedIssuesCount(prev => prev + 1)
  }

  return (
    <div className="min-h-screen bg-[#000000] text-white overflow-hidden relative font-sans selection:bg-indigo-500/30 selection:text-white">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white bg-[size:40px_40px] mask-radial opacity-35 pointer-events-none -z-20" />
      
      {/* Large Glowing Ambient Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-500/10 glow-orb animate-pulse-slow -z-10 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] rounded-full bg-purple-500/10 glow-orb animate-pulse-slow delay-2000 -z-10 pointer-events-none" />
      <div className="absolute top-[30%] right-[10%] w-[500px] h-[500px] rounded-full bg-blue-500/5 glow-orb animate-pulse-slow delay-1000 -z-10 pointer-events-none" />

      {/* Header/Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#000000]/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <a href="#" className="flex items-center space-x-2 group">
              <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-zinc-200 to-white flex items-center justify-center p-[2px] shadow-sm">
                <div className="h-full w-full rounded-full bg-black flex items-center justify-center">
                  <Command className="h-3 w-3 text-white group-hover:rotate-12 transition-transform duration-300" />
                </div>
              </div>
              <span className="font-semibold tracking-tight text-white text-md">Linear</span>
            </a>

            {/* Navigation links */}
            <nav className="hidden md:flex items-center space-x-6">
              {["Features", "Method", "Customers", "Changelog", "Pricing"].map((link) => (
                <a 
                  key={link} 
                  href="#" 
                  className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 text-zinc-400 hover:text-zinc-200 transition-colors rounded-lg hover:bg-white/5 cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <a href="#" className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors hidden sm:block">
              Contact Sales
            </a>
            <Button variant="ghost" className="text-zinc-300 hover:text-white hover:bg-white/5">
              Log in
            </Button>
            <Button className="bg-white text-black hover:bg-zinc-200 rounded-full font-medium text-xs px-4 py-1.5 h-8">
              Sign up
            </Button>
          </div>
        </div>
      </header>

      {/* Main Hero Container */}
      <main className="max-w-7xl mx-auto px-6 py-20 lg:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative">
        
        {/* Left Column: Hero Content */}
        <section className="lg:col-span-7 space-y-8 text-left">
          
          {/* Announcement Badge */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md hover:border-white/20 transition-all duration-300 cursor-pointer group animate-bounce-subtle">
            <Sparkles className="h-3.5 w-3.5 text-indigo-400 animate-pulse" />
            <span className="text-xs text-zinc-300 font-medium">Linear Next</span>
            <ChevronRight className="h-3 w-3 text-zinc-500 group-hover:translate-x-0.5 transition-transform" />
          </div>

          {/* Huge headline */}
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl lg:text-[76px] font-semibold tracking-[-0.03em] leading-[0.95] text-white">
              The product development
              <span className="block bg-gradient-to-b from-zinc-300 via-zinc-500 to-zinc-700 bg-clip-text text-transparent mt-2">
                system for teams and agents
              </span>
            </h1>
          </div>

          {/* Slogan (darker white, less emphasized, smaller) */}
          <div className="max-w-xl">
            <p className="text-base sm:text-lg text-zinc-500 font-normal leading-relaxed tracking-wide">
              Purpose-built for planning and building products. Designed for the AI era.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <Button className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-medium px-6 py-5 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/35 transition-all duration-300 group">
              Get Started 
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" className="border-white/10 text-zinc-300 hover:text-white hover:bg-white/5 rounded-full px-6 py-5">
              Watch Demo
              <Play className="ml-2 h-3.5 w-3.5 fill-current" />
            </Button>
          </div>

          {/* Metric tags */}
          <div className="pt-8 grid grid-cols-3 gap-6 border-t border-white/[0.05] max-w-lg">
            <div>
              <p className="text-2xl font-semibold text-white">10x</p>
              <p className="text-xs text-zinc-600 mt-1">Faster Planning cycles</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-white">100%</p>
              <p className="text-xs text-zinc-600 mt-1">Git-integrated state</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-white">AI</p>
              <p className="text-xs text-zinc-600 mt-1">Agent orchestration</p>
            </div>
          </div>

        </section>

        {/* Right Column: Hero Visual/Interactive Card */}
        <section className="lg:col-span-5 flex justify-center lg:justify-end">
          
          <div className="w-full max-w-[460px] animate-float">
            {/* The Outer Premium Card container */}
            <div className="relative group rounded-3xl p-[1px] bg-gradient-to-b from-white/15 to-white/5 shadow-2xl shadow-indigo-500/5 hover:shadow-indigo-500/10 transition-all duration-500">
              
              {/* Inner container */}
              <div className="rounded-[23px] bg-zinc-950/90 backdrop-blur-2xl p-6 border border-white/[0.04] space-y-6">
                
                {/* Visual Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
                  <div className="flex items-center space-x-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
                    <span className="text-[11px] font-mono text-zinc-500 ml-2">linear-agent-sandbox</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-xs text-zinc-400">
                    <Bot className="h-3.5 w-3.5 text-indigo-400" />
                    <span className="font-medium">AI Active</span>
                  </div>
                </div>

                {/* Simulated AI Agent Board Interface */}
                <div className="space-y-4">
                  {/* Issue Detail Box */}
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
                        LIN-402
                      </span>
                      <span className="text-xs text-zinc-500 flex items-center">
                        <span className={`h-1.5 w-1.5 rounded-full mr-2 ${agentState === "merged" ? "bg-emerald-500" : "bg-amber-500 animate-ping"}`} />
                        {agentState === "idle" ? "Idle" : agentState === "merged" ? "Resolved" : "Running"}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-zinc-200">
                      Cache miss in database connection handler
                    </p>
                    
                    {/* Simulated code container or info */}
                    <div className="flex items-center space-x-2 text-xs text-zinc-500">
                      <Layers className="h-3.5 w-3.5" />
                      <span>Priority: High</span>
                      <span>•</span>
                      <span>Assignee: Linear Agent</span>
                    </div>
                  </div>

                  {/* Terminal Log Output */}
                  <div className="bg-black/60 rounded-xl p-4 border border-white/[0.04] font-mono text-[11px] min-h-[140px] flex flex-col justify-between">
                    <div className="space-y-1.5 overflow-y-auto max-h-[110px] scrollbar-none">
                      {logs.length === 0 ? (
                        <p className="text-zinc-600 italic">// Click "Trigger AI Agent" below to resolve...</p>
                      ) : (
                        logs.map((log, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <span className="text-indigo-400 select-none">&gt;</span>
                            <span className={log.includes("PR") || log.includes("resolved") ? "text-emerald-400 font-semibold" : "text-zinc-300"}>
                              {log}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                    
                    {agentState !== "idle" && agentState !== "merged" && (
                      <div className="flex items-center text-indigo-400 space-x-2 pt-2 border-t border-white/[0.04]">
                        <RefreshCw className="h-3 w-3 animate-spin" />
                        <span>Agent compiling changes...</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Action Button */}
                  <button
                    onClick={startAgentSimulation}
                    disabled={agentState !== "idle" && agentState !== "merged"}
                    className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl border border-indigo-500/20 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 hover:text-white transition-all text-xs font-semibold select-none cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                  >
                    <Play className="h-3.5 w-3.5 fill-current" />
                    <span>{agentState === "merged" ? "Run Demo Again" : "Trigger AI Agent"}</span>
                  </button>
                </div>

                {/* Muted line separator */}
                <div className="h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

                {/* Custom requirement footer content */}
                <div className="text-center pt-2 space-y-3">
                  <div className="text-zinc-400 uppercase tracking-widest text-[11px] font-semibold">
                    Issue tracking is dead
                  </div>
                  <div>
                    <a
                      href="https://linear.app/next"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center space-x-1 text-sm font-semibold text-white hover:text-indigo-300 transition-colors group cursor-pointer"
                    >
                      <span>linear.app/next</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </section>

      </main>

      {/* Brand Logos Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-white/[0.04] mt-12">
        <p className="text-center text-xs text-zinc-600 uppercase tracking-wider mb-6">
          Powering the world's most innovative product teams
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 opacity-30 grayscale contrast-200">
          {["Vercel", "Retool", "Pitch", "Ramp", "Descript", "Raycast"].map((company) => (
            <span key={company} className="text-sm font-semibold tracking-wider text-white">
              {company}
            </span>
          ))}
        </div>
      </footer>
    </div>
  )
}