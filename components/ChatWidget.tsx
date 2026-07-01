'use client'

import { useEffect, useRef, useState } from 'react'
import ChatMessage from './ChatMessage'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

const STARTERS = [
  '> what have you built with AI?',
  '> walk me through your tech stack',
  '> most complex system you shipped?',
  '> open to new opportunities?',
]

const GREETING: Message = {
  id: 'greeting',
  role: 'assistant',
  content: "AGENT INITIALIZED. I represent Raja's work and skills. Query anything — projects, stack, philosophy, availability.",
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100)
  }, [open])

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text }
    const history = [...messages, userMsg]
    setMessages(history)
    setInput('')
    setLoading(true)

    const assistantId = (Date.now() + 1).toString()
    setMessages(prev => [...prev, { id: assistantId, role: 'assistant', content: '' }])

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: history.map(m => ({ role: m.role, content: m.content })),
        }),
      })

      if (!res.ok || !res.body) throw new Error('stream failed')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let accumulated = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        accumulated += decoder.decode(value, { stream: true })
        setMessages(prev =>
          prev.map(m => m.id === assistantId ? { ...m, content: accumulated } : m)
        )
      }
    } catch {
      setMessages(prev =>
        prev.map(m =>
          m.id === assistantId
            ? { ...m, content: 'ERR: stream interrupted. retry.' }
            : m
        )
      )
    } finally {
      setLoading(false)
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    sendMessage(input)
  }

  const allMessages = [GREETING, ...messages]

  return (
    <>
      {/* Floating trigger */}
      <button
        onClick={() => setOpen(o => !o)}
        className="pulse-ring relative fixed bottom-7 right-7 z-50 flex items-center gap-2.5 border border-[#00D9FF] bg-[#09090B] text-[#00D9FF] text-[11px] font-mono tracking-widest uppercase px-4 py-2.5 hover:bg-[rgba(0,217,255,0.07)] transition-colors duration-150 active:scale-95"
        style={{ borderRadius: '3px' }}
        aria-label="Toggle agent"
      >
        {open ? (
          <>
            <span className="text-[#3F3F50]">ESC</span>
            <span>/</span>
            <span>CLOSE</span>
          </>
        ) : (
          <>
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] shrink-0 animate-pulse" />
            TALK TO MY AGENT
          </>
        )}
      </button>

      {/* Chat terminal window */}
      {open && (
        <div
          className="widget-open scanlines fixed bottom-24 right-7 z-50 flex flex-col border border-[#1E1E28] bg-[#0F0F14]"
          style={{ width: '400px', height: '560px', borderRadius: '4px', boxShadow: '0 0 0 1px #1E1E28, 0 24px 60px rgba(0,0,0,0.8)' }}
        >
          {/* Terminal header */}
          <div className="relative z-10 flex items-center justify-between px-4 py-2.5 border-b border-[#1E1E28] bg-[#0D0D12] shrink-0">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1E1E28]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#1E1E28]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#1E1E28]" />
              </div>
              <span className="text-[#3F3F50] text-[10px] font-mono tracking-widest">
                PORTFOLIO-AGENT — bash
              </span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/WATCHERsee"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3F3F50] hover:text-[#00D9FF] transition-colors duration-150"
                title="GitHub"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/raja-adnan-ahmed-71a9162a0/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3F3F50] hover:text-[#00D9FF] transition-colors duration-150"
                title="LinkedIn"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                <span className="text-[#10B981] text-[9px] font-mono tracking-widest">LIVE</span>
              </div>
            </div>
          </div>

          {/* Messages area */}
          <div className="relative z-10 flex-1 overflow-y-auto px-4 py-4 space-y-1">

            {/* Boot sequence */}
            <div className="mb-4 pb-4 border-b border-[#1E1E28]">
              <p className="text-[#2A2A35] text-[10px] font-mono mb-1">
                Qwen3.5-27B · portfolio-agent v1.0
              </p>
              <p className="text-[#2A2A35] text-[10px] font-mono">
                system prompt loaded · context: 4.2k tokens
              </p>
            </div>

            {allMessages.map((m) => (
              <ChatMessage key={m.id} role={m.role} content={m.content} />
            ))}

            {/* Starter prompts */}
            {messages.length === 0 && (
              <div className="pt-3 flex flex-col gap-1.5">
                {STARTERS.map(s => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s.replace('> ', ''))}
                    disabled={loading}
                    className="text-left text-[11px] font-mono text-[#52525B] hover:text-[#00D9FF] hover:bg-[rgba(0,217,255,0.04)] border border-[#1E1E28] hover:border-[rgba(0,217,255,0.2)] px-3 py-2 transition-all duration-100 disabled:opacity-40"
                    style={{ borderRadius: '2px' }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="relative z-10 flex items-center border-t border-[#1E1E28] bg-[#0D0D12] shrink-0"
          >
            <span className="text-[#00D9FF] text-xs font-mono pl-3 pr-1 select-none shrink-0">&gt;</span>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="type your query..."
              disabled={loading}
              className="flex-1 bg-transparent text-[#E4E4E7] text-xs font-mono py-3 px-2 outline-none placeholder:text-[#2A2A35] disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="text-[#00D9FF] text-[10px] font-mono tracking-widest px-4 py-3 border-l border-[#1E1E28] hover:bg-[rgba(0,217,255,0.06)] disabled:opacity-25 disabled:cursor-not-allowed transition-colors duration-100 shrink-0"
            >
              SEND
            </button>
          </form>
        </div>
      )}
    </>
  )
}
