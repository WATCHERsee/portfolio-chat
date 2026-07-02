import ChatWidget from '@/components/ChatWidget'

export default function Home() {
  return (
    <main className="grid-bg relative min-h-screen flex flex-col items-start justify-center px-6 sm:px-10 overflow-hidden">

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 sm:px-10 py-4 border-b border-[#1E1E28]">
        <span className="text-[#52525B] text-[11px] tracking-widest uppercase font-mono">
          sys://portfolio-agent-v1
        </span>
        <span className="text-[#52525B] text-[11px] tracking-widest uppercase font-mono flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] inline-block animate-pulse" />
          AGENT ONLINE
        </span>
      </div>

      {/* Main content */}
      <div className="max-w-2xl mt-20">

        {/* Label */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-px h-5 bg-[#00D9FF]" />
          <span className="text-[#00D9FF] text-[11px] tracking-widest uppercase font-mono">
            AI Systems Engineer
          </span>
        </div>

        {/* Name */}
        <h1 className="text-4xl sm:text-5xl font-mono font-bold text-[#F4F4F5] leading-none tracking-tight mb-3">
          Raja Adnan Ahmed
        </h1>
        <p className="text-[#71717A] text-2xl sm:text-3xl font-mono font-bold leading-none tracking-tight mb-10">
          Builds agents that ship.
        </p>

        {/* Description */}
        <p className="text-[#71717A] text-sm font-mono leading-6 max-w-lg mb-10">
          Multi-agent orchestration. Context engineering. Production AI pipelines.<br />
          Systems that run while you sleep — and send signals to your phone.
        </p>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <span className="text-[#52525B] text-[11px] tracking-widest uppercase font-mono">
            &darr; Interact with the agent
          </span>
          <div className="flex-1 h-px bg-[#1E1E28] max-w-32" />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-6 sm:px-10 py-3 border-t border-[#1E1E28]">
        <span className="text-[#52525B] text-[11px] font-mono">work.cloudex@gmail.com</span>
        <span className="text-[#52525B] text-[11px] font-mono">deepseek-v4-flash · vercel ai sdk</span>
      </div>

      <ChatWidget />
    </main>
  )
}
