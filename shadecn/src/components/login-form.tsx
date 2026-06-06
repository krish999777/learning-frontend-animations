import React, { useState } from "react"
import { Eye, EyeOff, Mail, Lock, Loader2, Chrome, Github, ShieldAlert, Sparkles } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Checkbox } from "./ui/checkbox"
import { toast } from "sonner"

export function LoginForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password || (!isLogin && !name)) {
      toast.error("Please fill in all fields", {
        description: "Ensure no field is left blank before submitting.",
        icon: <ShieldAlert className="h-5 w-5 text-destructive" />
      })
      return
    }

    setIsLoading(true)

    // Simulate API request
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    toast.success(isLogin ? "Welcome back!" : "Account created successfully!", {
      description: isLogin
        ? `Successfully signed in as ${email}`
        : `Welcome to the community, ${name}!`,
      icon: <Sparkles className="h-5 w-5 text-amber-500 animate-pulse" />
    })
  }

  const handleSocialLogin = (platform: string) => {
    toast.info(`Connecting to ${platform}...`, {
      description: "Redirecting to OAuth provider."
    })
  }

  return (
    <div className="w-full max-w-md px-4">
      {/* Glow Backdrops */}
      <div className="absolute -top-12 -left-12 -z-10 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-500/5" />
      <div className="absolute -bottom-12 -right-12 -z-10 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl dark:bg-purple-500/5" />

      <Card className="relative overflow-hidden border border-border/40 bg-card/60 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-border/60 hover:shadow-indigo-500/5 dark:bg-zinc-950/40">
        <CardHeader className="space-y-2 text-center pb-4">
          <div className="mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20 text-white animate-bounce-subtle">
            <Sparkles className="h-5 w-5" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight bg-gradient-to-r from-foreground via-foreground/90 to-foreground/80 bg-clip-text text-transparent">
            {isLogin ? "Welcome Back" : "Create Account"}
          </CardTitle>
          <CardDescription className="text-muted-foreground/80 text-sm">
            {isLogin
              ? "Enter your credentials to access your workspace"
              : "Get started by creating your account below"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-1.5 transition-all duration-300">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative group">
                  <Input
                    id="name"
                    placeholder="John Doe"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-9 h-10 border-border/60 bg-background/50 focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500 transition-all duration-200"
                    disabled={isLoading}
                  />
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground/50 group-focus-within:text-indigo-500 transition-colors">
                    <span className="text-xs font-semibold">@</span>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative group">
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9 h-10 border-border/60 bg-background/50 focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500 transition-all duration-200"
                  disabled={isLoading}
                />
                <Mail className="absolute inset-y-0 left-3 h-4 w-4 my-auto text-muted-foreground/50 group-focus-within:text-indigo-500 transition-colors" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                {isLogin && (
                  <button
                    type="button"
                    onClick={() => toast.info("Password reset request sent.", { description: "Check your email inbox." })}
                    className="text-xs font-medium text-indigo-500 hover:text-indigo-600 transition-colors"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative group">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 pr-10 h-10 border-border/60 bg-background/50 focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500 transition-all duration-200"
                  disabled={isLoading}
                />
                <Lock className="absolute inset-y-0 left-3 h-4 w-4 my-auto text-muted-foreground/50 group-focus-within:text-indigo-500 transition-colors" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-muted-foreground/50 hover:text-indigo-500 transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="flex items-center space-x-2 pt-1">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(!!checked)}
                  disabled={isLoading}
                  className="border-border/60 data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500 focus-visible:ring-indigo-500/50"
                />
                <Label
                  htmlFor="remember"
                  className="text-xs font-medium text-muted-foreground/90 cursor-pointer select-none"
                >
                  Remember me on this device
                </Label>
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-10 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium shadow-md shadow-indigo-500/10 transition-all duration-200 hover:scale-[1.01] hover:shadow-indigo-500/20 active:scale-[0.99] cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isLogin ? "Signing In..." : "Creating Account..."}
                </>
              ) : (
                isLogin ? "Sign In" : "Get Started"
              )}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/40" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card/90 px-3 text-muted-foreground/70 backdrop-blur-xl">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={() => handleSocialLogin("Google")}
              className="h-10 border-border/50 bg-background/30 hover:bg-background/80 hover:text-foreground transition-all duration-200 cursor-pointer"
              disabled={isLoading}
            >
              <Chrome className="mr-2 h-4 w-4 text-red-500" />
              Google
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSocialLogin("Github")}
              className="h-10 border-border/50 bg-background/30 hover:bg-background/80 hover:text-foreground transition-all duration-200 cursor-pointer"
              disabled={isLoading}
            >
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center pb-6 pt-2">
          <p className="text-xs text-muted-foreground">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => {
                setIsLogin(!isLogin)
                setEmail("")
                setPassword("")
                setName("")
              }}
              className="font-semibold text-indigo-500 hover:text-indigo-600 underline underline-offset-4 transition-colors"
              disabled={isLoading}
            >
              {isLogin ? "Sign up now" : "Sign in here"}
            </button>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
