import { Bot } from 'lucide-react'
export function Footer() {
  return (
    <footer className="py-12 border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-gray-400" />
          <span className="font-medium text-gray-400">InferenceLab</span>
        </div>

        <div className="flex items-center gap-6 text-sm text-gray-500">
          <a href="#" className="hover:text-white transition-colors">
            Documentation
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Support
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Terms of Service
          </a>
        </div>

        <div className="text-sm text-gray-600">
          © {new Date().getFullYear()} InferenceLab. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
