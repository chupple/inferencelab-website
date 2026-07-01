import React from 'react'
import { motion } from 'framer-motion'
import { Download, Key, MessageCircle } from 'lucide-react'
const steps = [
  {
    icon: Download,
    title: '1. Download the Kit',
    description:
      "Purchase the $50 starter kit. You'll get a lightweight installer for Mac or Windows that sets up the local environment automatically.",
  },
  {
    icon: Key,
    title: '2. Authenticate',
    description:
      'Sign in with your existing ChatGPT Plus account and Google Workspace using secure OAuth. No API keys to manage.',
  },
  {
    icon: MessageCircle,
    title: '3. Chat on Telegram',
    description:
      'Enter your one-time purchase code to allowlist your Telegram handle. Start messaging Roz immediately.',
  },
]
export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24 bg-surface/30 border-y border-border relative"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            From zero to assistant in 3 steps
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We've abstracted away the complex setup of open-source agents. If
            you can install a normal app, you can run Roz.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.2,
              }}
              className="relative bg-surface border border-white/5 rounded-2xl p-8 hover:bg-surfaceHover transition-colors"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 relative z-10">
                <step.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {step.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
