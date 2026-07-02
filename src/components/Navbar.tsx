import { Bot, ChevronRight } from 'lucide-react'
export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold text-lg tracking-tight">Roz</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
          <a
            href="#how-it-works"
            className="hover:text-white transition-colors"
          >
            How it works
          </a>
          <a href="#features" className="hover:text-white transition-colors">
            Features
          </a>
          <a href="#setup" className="hover:text-white transition-colors">
            Setup
          </a>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="#pricing"
            className="hidden md:block text-sm text-gray-400 hover:text-white transition-colors"
          >
            Sign in
          </a>
          <a
            href="#pricing"
            className="group relative px-4 py-2 text-sm font-medium text-white bg-white/10 rounded-full hover:bg-white/20 transition-all flex items-center gap-2"
          >
            <span>Get Roz</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </nav>
  )
}
