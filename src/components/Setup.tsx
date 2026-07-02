import { Apple, Monitor, ShieldCheck, Smartphone } from 'lucide-react'
export function Setup() {
  return (
    <section id="setup" className="py-24 bg-surface/30 border-y border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Frictionless Setup
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We guarantee you'll have Roz running in under 15 minutes, or we'll
            refund your purchase.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Installers */}
          <div className="space-y-6">
            <div className="p-8 rounded-3xl bg-surface border border-white/5">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <Monitor className="w-5 h-5 text-primary" />
                Native Installers
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <Apple className="w-6 h-6 text-white" />
                    <div>
                      <div className="text-white font-medium">
                        macOS Installer
                      </div>
                      <div className="text-xs text-gray-400">
                        Apple Silicon & Intel • 142 MB
                      </div>
                    </div>
                  </div>
                  <div className="text-xs font-medium px-2 py-1 rounded bg-white/10 text-white">
                    .dmg
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <Monitor className="w-6 h-6 text-white" />
                    <div>
                      <div className="text-white font-medium">
                        Windows Installer
                      </div>
                      <div className="text-xs text-gray-400">
                        Windows 10/11 • 138 MB
                      </div>
                    </div>
                  </div>
                  <div className="text-xs font-medium px-2 py-1 rounded bg-white/10 text-white">
                    .exe
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Auth & Telegram */}
          <div className="space-y-6">
            <div className="p-8 rounded-3xl bg-surface border border-white/5 h-full flex flex-col justify-center">
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">
                      OAuth-Only Setup
                    </h4>
                    <p className="text-sm text-gray-400">
                      No hunting for API keys. Just click "Sign in with Google"
                      and "Connect ChatGPT" in the local dashboard.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
                    <Smartphone className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">
                      Telegram Allowlist
                    </h4>
                    <p className="text-sm text-gray-400">
                      Enter your unique purchase code to bind your Telegram
                      handle to your local Roz instance. Secure and private.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
