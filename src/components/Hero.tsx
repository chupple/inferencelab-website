import { motion } from 'framer-motion'
import { Terminal, Sparkles, ArrowRight, CheckCircle2, Bot } from 'lucide-react'
export function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-hero-glow blur-[120px] rounded-full opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span>InferenceLab Agent Starter Kit</span>
          </motion.div>

          <motion.h1
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              delay: 0.1,
            }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]"
          >
            Your personal AI assistant, <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              running in 10 minutes.
            </span>
          </motion.h1>

          <motion.p
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              delay: 0.2,
            }}
            className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl"
          >
            Meet Roz. A powerful, private assistant that connects to your
            ChatGPT account. No complex building, no coding required. Just
            download, authenticate, and start chatting on Telegram.
          </motion.p>

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              delay: 0.3,
            }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <a
              href="#pricing"
              className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primaryHover text-white rounded-full font-medium transition-all flex items-center justify-center gap-2 group shadow-[0_0_40px_rgba(16,185,129,0.3)] hover:shadow-[0_0_60px_rgba(16,185,129,0.4)]"
            >
              Get the Starter Kit — $50
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#how-it-works"
              className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-full font-medium transition-all flex items-center justify-center gap-2 border border-white/10"
            >
              See how it works
            </a>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.5,
              delay: 0.5,
            }}
            className="mt-8 flex items-center gap-6 text-sm text-gray-500"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>One-time purchase</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>Uses your ChatGPT Plus</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>15-min setup guarantee</span>
            </div>
          </motion.div>
        </div>

        {/* Hero Image/Mockup */}
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 0.4,
          }}
          className="mt-20 relative mx-auto max-w-5xl"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-20" />
          <div className="rounded-2xl border border-white/10 bg-surface/50 backdrop-blur-xl overflow-hidden shadow-2xl relative z-10 flex">
            {/* Sidebar */}
            <div className="w-64 border-r border-white/5 bg-black/20 p-4 hidden md:block">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="space-y-2">
                <div className="h-8 rounded bg-white/5 flex items-center px-3 text-xs text-gray-400 font-medium">
                  Roz Dashboard
                </div>
                <div className="h-8 rounded hover:bg-white/5 flex items-center px-3 text-xs text-gray-500 cursor-pointer">
                  Integrations
                </div>
                <div className="h-8 rounded hover:bg-white/5 flex items-center px-3 text-xs text-gray-500 cursor-pointer">
                  Settings
                </div>
              </div>
            </div>
            {/* Main Content */}
            <div className="flex-1 p-6 bg-black/40">
              <div className="flex items-center gap-4 mb-8 border-b border-white/5 pb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-medium">Roz is online</h3>
                  <p className="text-xs text-gray-400">
                    Connected via Telegram • Using GPT-4
                  </p>
                </div>
              </div>

              <div className="space-y-4 font-mono text-sm">
                <div className="flex gap-4">
                  <span className="text-gray-500">10:42:01</span>
                  <span className="text-secondary">[System]</span>
                  <span className="text-gray-300">
                    OAuth verification successful.
                  </span>
                </div>
                <div className="flex gap-4">
                  <span className="text-gray-500">10:42:05</span>
                  <span className="text-primary">[Roz]</span>
                  <span className="text-gray-300">
                    Connected to Google Calendar. Found 3 meetings today.
                  </span>
                </div>
                <div className="flex gap-4">
                  <span className="text-gray-500">10:42:12</span>
                  <span className="text-primary">[Roz]</span>
                  <span className="text-gray-300">
                    Telegram webhook active. Listening for messages...
                  </span>
                </div>
                <div className="flex gap-4 mt-8 p-4 rounded-lg bg-white/5 border border-white/10">
                  <Terminal className="w-5 h-5 text-gray-400" />
                  <span className="text-white">
                    Ready. Send a message to @RozAssistantBot to begin.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
