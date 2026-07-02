'use client'

interface ChatMessageProps {
  role: 'user' | 'assistant'
  content: string
}

export default function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === 'user'

  return (
    <div className={`msg-in flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      {!isUser && (
        <div className="text-[#00D9FF] text-[11px] font-mono mr-2 mt-1 shrink-0 tracking-widest select-none">
          AG/
        </div>
      )}

      <div
        className={`max-w-[82%] px-3 py-2.5 text-[13px] font-mono leading-[1.6] border ${
          isUser
            ? 'bg-[rgba(0,217,255,0.07)] border-[rgba(0,217,255,0.18)] text-[#E4E4E7] rounded-sm rounded-br-none'
            : 'bg-[#16161E] border-[#1E1E28] text-[#C4C4CC] rounded-sm rounded-bl-none'
        }`}
        style={{ wordBreak: 'break-word' }}
      >
        {content}
        {!isUser && content === '' && (
          <span className="text-[#00D9FF] blink">_</span>
        )}
      </div>

      {isUser && (
        <div className="text-[#52525B] text-[11px] font-mono ml-2 mt-1 shrink-0 tracking-widest select-none">
          /ME
        </div>
      )}
    </div>
  )
}
