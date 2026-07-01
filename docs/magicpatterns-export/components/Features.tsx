import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Calendar, FileText, Cpu, Blocks } from 'lucide-react'
const features = [
  {
    icon: Mail,
    title: 'Email Triage',
    description:
      "Roz reads your inbox, drafts replies, and highlights what's urgent. Never miss a critical thread.",
  },
  {
    icon: Calendar,
    title: 'Smart Scheduling',
    description:
      "Connects to Google Calendar. Just tell Roz 'Find time with Sarah next week' and it handles the rest.",
  },
  {
    icon: FileText,
    title: 'File Prep & Summaries',
    description:
      'Drop PDFs or docs into Telegram. Roz reads them and gives you the TL;DR before your meetings.',
  },
  {
    icon: Cpu,
    title: 'Local Privacy',
    description:
      "The orchestration runs locally on your machine. Your personal data isn't stored on our servers.",
  },
  {
    icon: Blocks,
    title: 'App Integrations',
    description:
      'Works with Notion, Linear, and Slack out of the box. Authenticate once, use everywhere.',
  },
]
export function Features() {
  return (
    <section id="features" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Everything you need, built-in
          </h2>
          <p className="text-gray-400 max-w-2xl">
            Roz comes pre-configured with the most useful skills for daily
            productivity. No prompt engineering required.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
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
                delay: index * 0.1,
              }}
              className="p-6 rounded-2xl bg-surface border border-white/5 hover:border-white/10 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}

          {/* Decorative empty state card */}
          <motion.div
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
              delay: 0.5,
            }}
            className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 flex flex-col items-center justify-center text-center"
          >
            <h3 className="text-lg font-semibold text-white mb-2">
              More coming soon
            </h3>
            <p className="text-sm text-gray-400">
              Free updates for all starter kit owners.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
