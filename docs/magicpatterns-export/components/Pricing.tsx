import React from 'react'
import { Check, Zap } from 'lucide-react'
export function Pricing() {
  return (
    <section id="pricing" className="py-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="rounded-3xl bg-gradient-to-b from-surface to-background border border-white/10 p-1 overflow-hidden relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

          <div className="rounded-[23px] bg-surface p-8 md:p-12 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-white mb-4">
                Start using Roz today
              </h2>
              <p className="text-gray-400 mb-8">
                One-time purchase. No recurring subscriptions. Keep it forever.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  'Mac & Windows Installers',
                  'Local orchestration engine',
                  'Telegram bot integration',
                  'Email & Calendar skills',
                  '15-minute setup guarantee',
                  'Free future skill updates',
                ].map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-sm text-gray-300"
                  >
                    <Check className="w-5 h-5 text-primary shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full md:w-80 shrink-0 bg-background rounded-2xl p-8 border border-white/5 text-center">
              <div className="text-sm text-gray-400 font-medium mb-2">
                Starter Kit
              </div>
              <div className="flex items-baseline justify-center gap-1 mb-6">
                <span className="text-5xl font-bold text-white">$50</span>
                <span className="text-gray-500">USD</span>
              </div>

              <button className="w-full py-4 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 mb-4">
                <Zap className="w-4 h-4" />
                Buy Now
              </button>

              <p className="text-xs text-gray-500">
                Requires an active ChatGPT Plus subscription for the underlying
                model.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
