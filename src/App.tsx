import { useMemo, useState } from 'react';
import {
  ArrowRight,
  Bot,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Download,
  FileText,
  Inbox,
  KeyRound,
  Laptop,
  LockKeyhole,
  MailCheck,
  MousePointerClick,
  PlayCircle,
  PlugZap,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
  Workflow,
} from 'lucide-react';

type DemoStep = {
  id: string;
  eyebrow: string;
  title: string;
  prompt: string;
  response: string;
  outcome: string;
  visual: 'email' | 'calendar' | 'files' | 'setup' | 'integrations';
};

type AgentCapability = {
  title: string;
  body: string;
  icon: typeof Inbox;
};

const demoSteps: DemoStep[] = [
  {
    id: 'email',
    eyebrow: 'Step 1 · Inbox triage',
    title: 'Roz sorts the morning inbox before you touch it.',
    prompt: 'Roz, what do I need to answer before lunch?',
    response:
      'Three messages need action: confirm the 2:30 call, approve the vendor invoice, and send Maya the launch notes. I drafted replies and marked the rest as read-later.',
    outcome: 'Email triage/drafting becomes an assisted workflow, not a blank compose window.',
    visual: 'email',
  },
  {
    id: 'calendar',
    eyebrow: 'Step 2 · Calendar scheduling',
    title: 'Roz finds the realistic slot and prepares the reply.',
    prompt: 'Move the project sync away from my focus block.',
    response:
      'Best option is Thursday 10:30–11:00. It avoids your focus block, keeps Alex in their working hours, and includes the relevant prep note in the calendar description.',
    outcome: 'Calendar scheduling accounts for context, people, and prep materials.',
    visual: 'calendar',
  },
  {
    id: 'files',
    eyebrow: 'Step 3 · File organization',
    title: 'Roz turns scattered files into a workday packet.',
    prompt: 'Collect the documents I need for the client call.',
    response:
      'I found the latest proposal, meeting transcript, budget spreadsheet, and launch checklist. I grouped them into a dated folder and summarized what changed since last week.',
    outcome: 'File organization becomes an assistant job with source links and a short explanation.',
    visual: 'files',
  },
  {
    id: 'setup',
    eyebrow: 'Step 4 · Local setup',
    title: 'Roz checks the local agent stack without exposing secrets.',
    prompt: 'Is my local agent ready to use?',
    response:
      'Hermes is installed, the browser tool is available, and Google access still needs OAuth sign-in. No website token setup. Open the sign-in window to connect services safely.',
    outcome: 'Local setup is guided through OAuth-style sign-in instead of copied API tokens.',
    visual: 'setup',
  },
  {
    id: 'integrations',
    eyebrow: 'Step 5 · App/API integrations',
    title: 'Roz explains what each connection unlocks.',
    prompt: 'What happens after I connect ChatGPT, Google, and my apps?',
    response:
      'ChatGPT handles reasoning, Google unlocks mail/calendar/files, and optional app connectors let Roz search, draft, schedule, organize, and hand work back to you for approval.',
    outcome: 'App/API integrations are presented as practical outcomes, not setup jargon.',
    visual: 'integrations',
  },
];

const capabilities: AgentCapability[] = [
  {
    title: 'Email triage and drafting',
    body: 'Find urgent messages, summarize threads, draft replies, and keep you in the approval loop.',
    icon: MailCheck,
  },
  {
    title: 'Calendar scheduling',
    body: 'Compare availability, protect focus time, prepare meeting notes, and suggest the next realistic slot.',
    icon: CalendarDays,
  },
  {
    title: 'File organization',
    body: 'Collect related files, name folders clearly, summarize changes, and surface the source material behind an answer.',
    icon: FileText,
  },
  {
    title: 'Local setup help',
    body: 'Check local tools, guide safe credential entry, run first-workflow tests, and explain what still needs your account access.',
    icon: Laptop,
  },
  {
    title: 'App/API integrations',
    body: 'Connect the services you already use so the agent can search, prepare, draft, and route work across them.',
    icon: PlugZap,
  },
];


const buyerWins = [
  {
    title: 'Start your day with a ranked plan',
    body: 'Ask Roz what needs attention first and get a short priority list with draft replies and meeting prep attached.',
  },
  {
    title: 'Stop context switching between apps',
    body: 'Let Roz collect the email, calendar, file, and app context before you decide what to send or schedule.',
  },
  {
    title: 'Try it before connecting real accounts',
    body: 'Use the pre-canned workday data first, then connect your own ChatGPT, Google, and app accounts only when you are ready.',
  },
];


const setupFlow = [
  {
    title: 'Install on Mac or Windows',
    body: 'Download the right installer, open Roz Setup, and let it check Hermes locally before you connect accounts.',
  },
  {
    title: 'Sign in with accounts you already have',
    body: 'Use OAuth-style sign-in for ChatGPT/OpenAI and Google. No copy-pasting API tokens into the website.',
  },
  {
    title: 'Message Roz on Telegram',
    body: 'After purchase, send your one-time setup code to the Roz onboarding bot so your Telegram account can be allowed before download.',
  },
];

const installerOptions = [
  {
    title: 'Mac installer',
    body: 'A double-click .command helper opens the Roz setup app, checks Hermes, and guides OAuth sign-in.',
    href: '/downloads/roz-starter-package/installers/mac/Roz Installer.command',
    cta: 'Preview Mac installer',
  },
  {
    title: 'Windows installer',
    body: 'A PowerShell helper opens the same guided setup path for Windows users and avoids manual terminal setup.',
    href: '/downloads/roz-starter-package/installers/windows/Roz Installer.ps1',
    cta: 'Preview Windows installer',
  },
];

const telegramFlow = [
  'Get Roz through Shopify and receive a one-time setup code.',
  'Message the prebuilt Roz Telegram onboarding bot with that setup code.',
  'The bot verifies the code, captures your Telegram user ID, and adds you to the allowlist.',
  'Once allowlisted, the bot sends the download link and your first “message Roz” instructions.',
];

const setupPackage = [
  'Sanitized Hermes/Roz profile template with placeholders only — no bundled passwords, OAuth secrets, access tokens, API keys, or connection strings.',
  'Small setup app that checks/installs Hermes, opens OAuth-style sign-in, runs the pre-canned demo, and never asks you to paste tokens into the website.',
  'OAuth-first setup flow that asks you to sign in with ChatGPT/OpenAI and Google locally without showing credentials on the website.',
  'Pre-canned demo data for email, calendar, files, Telegram, and setup checks so Roz works before you connect real accounts.',
  'OpenClaw-to-Hermes orientation notes for moderately technical people who want a clean first path instead of scattered docs.',
];

const shopifyScope = [
  {
    title: 'Checkout',
    body: 'Shopify can sell the $50 digital product/service with shipping disabled and a normal checkout link. The live button should point to the final Shopify product or buy button once store access exists.',
  },
  {
    title: 'Post-purchase access',
    body: 'Shopify Digital Downloads can deliver a file or supported access link after purchase. A .zip package, hosted guide, Calendly/Acuity link, or course-style access link can be attached as the asset.',
  },
  {
    title: 'Accounts and authentication',
    body: 'New Shopify customer accounts provide order history and authenticated account pages. The Customer Account API uses OAuth/OIDC discovery and PKCE for public clients, but it is not a custom app login replacement by itself.',
  },
  {
    title: 'Multipass limitation',
    body: 'Multipass single sign-on is legacy-customer-account only and requires Shopify Plus, so it should not be assumed for this launch.',
  },
  {
    title: 'Scheduling access',
    body: 'The setup call can be delivered as a post-purchase booking link using a Shopify booking app or Digital Downloads link to Calendly/Acuity until a final scheduling provider is chosen.',
  },
];

function VisualWindow({ step }: { step: DemoStep }) {
  const commonHeader = (
    <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
      <div className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-rose-400" />
        <span className="h-3 w-3 rounded-full bg-amber-300" />
        <span className="h-3 w-3 rounded-full bg-emerald-300" />
      </div>
      <span className="rounded-full bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">screenshot-style preview</span>
    </div>
  );

  if (step.visual === 'email') {
    return (
      <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/90 p-5 shadow-2xl shadow-black/40">
        {commonHeader}
        <div className="grid gap-3 md:grid-cols-[0.78fr_1.22fr]">
          <div className="space-y-3">
            {['Investor follow-up', 'Invoice approval', 'Newsletter digest'].map((subject, index) => (
              <div key={subject} className={`rounded-2xl border p-3 ${index === 0 ? 'border-cyan-300/40 bg-cyan-300/10' : 'border-white/10 bg-white/[0.03]'}`}>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Inbox</p>
                <p className="mt-1 text-sm font-bold text-white">{subject}</p>
                <p className="mt-1 text-xs text-slate-400">Roz: {index === 0 ? 'reply before lunch' : 'safe to batch later'}</p>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-200">Draft ready</p>
            <p className="mt-3 text-sm leading-6 text-slate-100">
              “Thanks — Thursday 10:30 works. I added the launch notes and will bring the updated budget packet.”
            </p>
            <div className="mt-4 flex gap-2 text-xs font-semibold">
              <span className="rounded-full bg-white px-3 py-1.5 text-slate-950">Approve</span>
              <span className="rounded-full border border-white/15 px-3 py-1.5 text-slate-200">Edit</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step.visual === 'calendar') {
    return (
      <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/90 p-5 shadow-2xl shadow-black/40">
        {commonHeader}
        <div className="grid grid-cols-3 gap-3 text-xs md:text-sm">
          {['9:00', '10:30', '1:00', '2:30', '3:00', '4:30'].map((time) => (
            <div key={time} className={`rounded-2xl border p-4 ${time === '10:30' ? 'border-cyan-300/50 bg-cyan-300/15' : time === '2:30' ? 'border-amber-300/40 bg-amber-300/10' : 'border-white/10 bg-white/[0.03]'}`}>
              <p className="font-bold text-white">{time}</p>
              <p className="mt-2 text-slate-400">{time === '10:30' ? 'Best slot' : time === '2:30' ? 'Focus block' : 'Available'}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4 text-sm leading-6 text-cyan-50">
          Roz recommends Thursday 10:30 and attaches the prep note automatically.
        </div>
      </div>
    );
  }

  if (step.visual === 'files') {
    return (
      <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/90 p-5 shadow-2xl shadow-black/40">
        {commonHeader}
        <div className="space-y-3">
          {['/Client launch packet/Proposal v4.pdf', '/Client launch packet/Budget.xlsx', '/Client launch packet/Meeting transcript.md', '/Client launch packet/Checklist.md'].map((file, index) => (
            <div key={file} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center gap-3">
                <FileText className={`h-5 w-5 ${index === 0 ? 'text-cyan-300' : 'text-slate-400'}`} />
                <span className="text-sm text-slate-200">{file}</span>
              </div>
              <span className="text-xs text-emerald-200">linked</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (step.visual === 'setup') {
    return (
      <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/90 p-5 shadow-2xl shadow-black/40">
        {commonHeader}
        <div className="rounded-2xl border border-slate-700 bg-slate-900 p-4 font-mono text-sm leading-7 text-slate-300">
          <p><span className="text-emerald-300">✓</span> Roz installer opened</p>
          <p><span className="text-emerald-300">✓</span> ChatGPT subscription found</p>
          <p><span className="text-amber-300">!</span> Google OAuth sign-in needed</p>
          <p><span className="text-cyan-300">→</span> opening secure sign-in window…</p>
          <p><span className="text-slate-500">auth:</span> OAuth, not token setup</p>
        </div>
        <div className="mt-4 flex items-center gap-3 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4 text-sm text-emerald-50">
          <LockKeyhole className="h-5 w-5" />
          Sign-ins stay local and are never collected by the marketing website.
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/90 p-5 shadow-2xl shadow-black/40">
      {commonHeader}
      <div className="grid gap-3 sm:grid-cols-2">
        {['ChatGPT reasoning', 'Google mail/calendar/files', 'Browser automation', 'App/API connectors'].map((item) => (
          <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <PlugZap className="h-5 w-5 text-cyan-300" />
            <p className="mt-3 text-sm font-bold text-white">{item}</p>
            <p className="mt-1 text-xs text-slate-400">Connect through guided local setup.</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function App() {
  const [activeStepId, setActiveStepId] = useState(demoSteps[0].id);
  const activeStep = useMemo(() => demoSteps.find((step) => step.id === activeStepId) ?? demoSteps[0], [activeStepId]);

  return (
    <main className="min-h-screen overflow-hidden text-slate-100">
      <section className="relative border-b border-white/10">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(14,165,233,0.18),rgba(79,70,229,0.08)_42%,rgba(15,23,42,0.0))]" />
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
          <a href="#top" className="flex items-center gap-3" aria-label="InferenceLab home">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20">
              <Sparkles className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-sm font-semibold uppercase tracking-[0.32em] text-cyan-200">InferenceLab</span>
              <span className="block text-lg font-bold text-white">Agent Starter Kit</span>
            </span>
          </a>
          <div className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <a className="hover:text-white" href="#workday">Guided workday</a>
            <a className="hover:text-white" href="#capabilities">What agents do</a>
            <a className="hover:text-white" href="#guarantee">Guarantee</a>
            <a className="hover:text-white" href="#commerce">Shopify scope</a>
          </div>
          <a
            href="#pricing"
            className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-white/10 transition hover:-translate-y-0.5 hover:bg-cyan-100"
          >
            Get Roz
          </a>
        </nav>

        <div id="top" className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-20 pt-10 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:pb-28 lg:pt-20">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-100">
              <Clock3 className="h-4 w-4" />
              Built for a useful personal assistant in about 10 minutes
            </div>
            <h1 className="max-w-4xl text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
              Your personal AI assistant, running in 10 minutes.
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-8 text-slate-300">
              Meet Roz: a $50 downloadable starter kit for people who already have a ChatGPT subscription and want a useful personal assistant without building OpenClaw or Hermes themselves. Download the installer, authenticate with OAuth, and start chatting on Telegram.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#pricing"
                className="group inline-flex items-center justify-center rounded-2xl bg-cyan-300 px-6 py-4 text-base font-bold text-slate-950 shadow-xl shadow-cyan-500/20 transition hover:-translate-y-0.5 hover:bg-cyan-200"
              >
                Get Roz — $50
                <ArrowRight className="ml-2 h-5 w-5 transition group-hover:translate-x-1" />
              </a>
              <a
                href="#workday"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-4 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                <PlayCircle className="mr-2 h-5 w-5" />
                Try guided workday
              </a>
            </div>
            <p className="mt-5 text-sm text-slate-400">
              You can review the experience locally now; the final Shopify checkout, account, domain, and scheduling links can be wired once store access is available.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-cyan-400/10 blur-3xl" />
            <div className="rounded-[2rem] border border-white/10 bg-slate-950/75 p-5 shadow-2xl shadow-black/40 backdrop-blur">
              <div className="rounded-[1.5rem] border border-slate-700/80 bg-slate-900 p-5">
                <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <p className="text-sm font-semibold text-cyan-200">Roz first-run console</p>
                    <p className="text-xs text-slate-500">What you see after purchase</p>
                  </div>
                  <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">Guided setup</span>
                </div>
                <div className="space-y-3">
                  {['Download Mac or Windows installer', 'Sign in with ChatGPT + Google OAuth', 'Message Roz on Telegram', 'Approve Roz’s first drafts'].map((step, index) => (
                    <div key={step} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-300 text-sm font-bold text-slate-950">
                        {index + 1}
                      </span>
                      <p className="text-sm leading-6 text-slate-200">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8" id="use-cases">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-cyan-200">Built around your workday</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-white">Obvious value in your first session.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              You are not buying a business idea. You are buying a practical starter kit that shows how Roz can help with the work you already do: triage, scheduling, file prep, setup, and app handoffs.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {buyerWins.map((win) => (
              <article key={win.title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <CheckCircle2 className="h-6 w-6 text-emerald-300" />
                <h3 className="mt-4 text-lg font-bold text-white">{win.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{win.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025]" id="setup-flow">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-cyan-200">Simple setup, not token setup</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-white">From zero to assistant in 3 steps.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              Magic Patterns direction applied: keep setup as a consumer product flow. If you can install a normal app and sign in to ChatGPT, Google, and Telegram, you can run Roz.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {setupFlow.map((item, index) => (
              <article key={item.title} className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-300 text-sm font-black text-slate-950">{index + 1}</span>
                <h3 className="mt-5 text-xl font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03]" id="workday">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-cyan-200">See Roz handle a workday</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight text-white">A guided personal-assistant experience built into the page.</h2>
              <p className="mt-5 text-lg leading-8 text-slate-300">
                This is not just copy about a demo. Click each step to see how Roz uses sample email, calendar, files, local setup, and integrations to answer the question: “What can agents do for me?”
              </p>
              <div className="mt-7 grid gap-3">
                {demoSteps.map((step) => (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => setActiveStepId(step.id)}
                    className={`group rounded-2xl border p-4 text-left transition ${activeStepId === step.id ? 'border-cyan-300/50 bg-cyan-300/10 shadow-lg shadow-cyan-500/10' : 'border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]'}`}
                  >
                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">{step.eyebrow}</span>
                    <span className="mt-2 block text-base font-bold text-white">{step.title}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-6">
                <div className="flex items-center gap-3 text-cyan-100">
                  <Bot className="h-7 w-7" />
                  <p className="text-sm font-bold uppercase tracking-[0.22em]">{activeStep.eyebrow}</p>
                </div>
                <h3 className="mt-4 text-2xl font-black text-white">{activeStep.title}</h3>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">You ask</p>
                    <p className="mt-2 text-sm leading-6 text-slate-200">“{activeStep.prompt}”</p>
                  </div>
                  <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">Roz responds</p>
                    <p className="mt-2 text-sm leading-6 text-slate-100">{activeStep.response}</p>
                  </div>
                </div>
                <p className="mt-4 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4 text-sm leading-6 text-emerald-50">
                  <strong>Outcome:</strong> {activeStep.outcome}
                </p>
              </div>
              <VisualWindow step={activeStep} />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8" id="capabilities">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-cyan-200">What can agents do?</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-white">Practical work people already understand.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            You see AI agents through everyday assistant jobs first, then learn how the same local Hermes-style setup can grow into deeper workflows.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {capabilities.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-black/10">
                <Icon className="h-7 w-7 text-cyan-300" />
                <h3 className="mt-5 text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-y border-white/10 bg-cyan-300/10" id="guarantee">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-20 lg:grid-cols-[1fr_0.9fr] lg:px-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200/25 bg-slate-950/40 px-4 py-2 text-sm font-bold text-cyan-100">
              <UserRoundCheck className="h-4 w-4" />
              15-minute setup guarantee
            </div>
            <h2 className="mt-5 text-4xl font-black text-white">If you get stuck, the launch path still has a human handoff.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-200">
              If you aren&apos;t up and running in 15 mins schedule a call and we will set it up for you.
            </p>
            <p className="mt-4 text-sm leading-6 text-cyan-50/80">
              The site can ship with this scheduling CTA now. The final booking URL can point to Cal.com, Calendly, Acuity, or a Shopify booking app once the provider is chosen.
            </p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/75 p-6 shadow-2xl shadow-black/30">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-sm font-bold text-cyan-200">Setup call</p>
                <p className="text-xs text-slate-500">Placeholder scheduling card</p>
              </div>
              <CalendarDays className="h-6 w-6 text-cyan-300" />
            </div>
            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-lg font-black text-white">Book a 15-minute Roz setup call</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">Use this after purchase if the starter package does not get you running quickly.</p>
              <a
                href="mailto:hello@inferencelab.app?subject=Schedule%20a%2015-minute%20Roz%20setup%20call"
                className="mt-5 inline-flex items-center rounded-2xl bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-100"
              >
                Schedule setup call
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <p className="mt-3 text-xs text-slate-500">Replace this mailto with the final Cal.com/Calendly/Acuity URL.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8" id="installers-telegram">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-cyan-200">Mac, Windows, Telegram</p>
            <h2 className="mt-3 text-4xl font-black text-white">The download path should feel prebuilt.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              Buyers should not have to create a bot, copy an API token, or manually edit an allowlist. The intended flow is purchase code → Telegram onboarding bot → allowlisted Roz chat → installer download.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {installerOptions.map((installer) => (
                <a key={installer.title} href={installer.href} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-white/[0.07]">
                  <Download className="h-6 w-6 text-cyan-300" />
                  <h3 className="mt-4 text-lg font-bold text-white">{installer.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{installer.body}</p>
                  <span className="mt-4 inline-flex text-sm font-bold text-cyan-200">{installer.cta} →</span>
                </a>
              ))}
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/75 p-6">
            <div className="flex items-center gap-3">
              <Bot className="h-7 w-7 text-emerald-300" />
              <div>
                <h3 className="text-2xl font-black text-white">Telegram onboarding logistics</h3>
                <p className="text-sm text-slate-400">Prebuild the bot; buyers only message it.</p>
              </div>
            </div>
            <ol className="mt-6 space-y-4">
              {telegramFlow.map((item, index) => (
                <li key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-slate-300">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-300 text-xs font-black text-slate-950">{index + 1}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8" id="package">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-cyan-200">Downloadable Roz starter package</p>
            <h2 className="mt-3 text-4xl font-black text-white">Sanitized by default, useful before account connections.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              The package is scoped as a safe first-run bundle: sample data, setup instructions, OAuth-style account connection, Telegram onboarding, and Mac/Windows installer helpers. You bring your existing ChatGPT subscription and Google account; the download never includes private credentials.
            </p>
          </div>
          <div className="grid gap-4">
            {setupPackage.map((item) => (
              <div key={item} className="flex gap-3 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-emerald-300" />
                <p className="text-sm leading-7 text-slate-300">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03]" id="commerce">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-cyan-200">Shopify checkout, accounts, and access scope</p>
            <h2 className="mt-3 text-4xl font-black text-white">What Shopify can provide before live checkout wiring.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              Use Shopify for payment, digital delivery, customer order/account surfaces, and booking-link delivery. Keep buyer authentication simple: Shopify confirms purchase, Telegram onboarding verifies a one-time setup code, and Roz setup handles local OAuth sign-in.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {shopifyScope.map((item) => (
              <article key={item.title} className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                <ReceiptText className="h-6 w-6 text-cyan-300" />
                <h3 className="mt-4 text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-20 lg:grid-cols-[1fr_0.9fr] lg:px-8" id="pricing">
        <div className="rounded-[2rem] border border-cyan-300/20 bg-cyan-300/10 p-8">
          <div className="flex items-center gap-3 text-cyan-100">
            <Download className="h-7 w-7" />
            <p className="text-sm font-bold uppercase tracking-[0.28em]">Starter offer</p>
          </div>
          <h2 className="mt-5 text-4xl font-black text-white">Start using Roz today.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-200">
            One-time purchase. No recurring InferenceLab subscription. You bring your existing ChatGPT account; Roz gives you the installer, OAuth-first setup, Telegram onboarding, guided assistant flow, pre-canned demo, and service-connection checklist.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="mailto:hello@inferencelab.app?subject=InferenceLab%20Agent%20Starter%20Kit"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-4 font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-100"
            >
              Get Roz — $50
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <a
              href="/downloads/roz-starter-package.zip"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-4 font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              Download package ZIP
            </a>
            <a
              href="/downloads/roz-starter-package/apps/roz_setup_app.py"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-4 font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              Preview setup app
            </a>
            <a
              href="/downloads/roz-starter-package/README.md"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-4 font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              Preview package scope
            </a>
          </div>
          <p className="mt-4 text-sm text-cyan-100/80">Temporary CTA uses email until Shopify checkout is connected.</p>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
          <div className="flex items-center gap-3 text-slate-200">
            <Workflow className="h-7 w-7 text-cyan-300" />
            <h3 className="text-2xl font-black text-white">Launch wiring checklist</h3>
          </div>
          <ul className="mt-6 space-y-4">
            {[
              'Replace mailto purchase CTA with final Shopify checkout link and generated one-time setup code.',
              'Attach the Roz package as a Shopify Digital Downloads file or supported access link.',
              'Choose the scheduling provider and replace the placeholder setup-call CTA.',
              'Keep OAuth sign-in local; never store or display buyer secrets on the website.',
              'Magic Patterns redesign applied from generated artifact export under docs/magicpatterns-export/.',
              'Publish the production build once domain and deployment access are available.',
            ].map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6 text-slate-300">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 text-sm leading-6 text-amber-50">
            <KeyRound className="mb-2 h-5 w-5" />
            Security note: credential values in examples are shown only as [REDACTED] or placeholders.
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 text-center lg:px-8">
        <a href="#workday" className="inline-flex items-center gap-2 text-sm font-bold text-cyan-200 hover:text-white">
          <MousePointerClick className="h-4 w-4" />
          Try guided workday again
        </a>
      </section>
    </main>
  );
}
