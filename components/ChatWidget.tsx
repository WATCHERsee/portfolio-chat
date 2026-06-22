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
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-[#10B981] text-[9px] font-mono tracking-widest">LIVE</span>
            </div>
          </div>

          {/* Messages area */}
          <div className="relative z-10 flex-1 overflow-y-auto px-4 py-4 space-y-1">

            {/* Boot sequence */}
            <div className="mb-4 pb-4 border-b border-[#1E1E28]">
              <p className="text-[#2A2A35] text-[10px] font-mono mb-1">
                Gemini 2.5 Flash · portfolio-agent v1.0
              </p>
              <p className="text-[#2A2A35] text-[10px] font-mono">
                system prompt loaded · context: 4.2k tokens
              </p>
            </div>

            {allMessages.map((m) => (
              <ChatMessage key={m.id} role={m.role} content={m.content} />
            ))}

            {/* Loading state — blinking cursor only */}
            {loading && messages[messages.length - 1]?.content === '' && (
              <div className="flex justify-start mb-3">
                <div className="text-[#00D9FF] text-[10px] font-mono mr-2 mt-1 tracking-widest">AG/</div>
                <div className="bg-[#16161E] border border-[#1E1E28] px-3 py-2.5 rounded-sm rounded-bl-none">
                  <span className="text-[#00D9FF] text-xs font-mono blink">_</span>
                </div>
              </div>
            )}

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
