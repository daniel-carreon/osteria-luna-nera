'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Loader2 } from 'lucide-react'
import { MessageList } from './MessageList'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  toolInvocations?: any[]
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      if (!response.ok) throw new Error('Failed to fetch')

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let assistantContent = ''

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          assistantContent += chunk

          setMessages(prev => {
            const lastMessage = prev[prev.length - 1]
            if (lastMessage?.role === 'assistant') {
              return [
                ...prev.slice(0, -1),
                { ...lastMessage, content: assistantContent },
              ]
            } else {
              return [
                ...prev,
                {
                  id: Date.now().toString(),
                  role: 'assistant',
                  content: assistantContent,
                },
              ]
            }
          })
        }
      }
    } catch (error) {
      console.error('Chat error:', error)
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: 'Sorry, there was an error processing your request. Please try again.',
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Floating Button */}
      <button
        data-chat-button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 ${
          isOpen ? 'gold-gradient' : 'bg-accent hover:bg-accent-light'
        }`}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-primary" />
        ) : (
          <MessageCircle className="w-6 h-6 text-background" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-[400px] max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-8rem)] glass-effect rounded-2xl shadow-2xl flex flex-col animate-slide-up">
          {/* Header */}
          <div className="p-4 border-b border-secondary/20 gold-gradient rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-serif font-bold text-primary">
                  Osteria Luna Nera
                </h3>
                <p className="text-sm font-italiana text-primary-light">
                  AI Concierge
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5 text-primary" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 mx-auto gold-gradient rounded-full flex items-center justify-center">
                  <MessageCircle className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-serif font-semibold text-primary mb-2">
                    Buonasera!
                  </h4>
                  <p className="text-sm text-primary-light">
                    Welcome to Osteria Luna Nera. How may I assist you today?
                  </p>
                  <p className="text-xs text-primary-light/70 mt-2">
                    Ask about our menu or make a reservation.
                  </p>
                </div>
              </div>
            ) : (
              <MessageList messages={messages} />
            )}
            {isLoading && (
              <div className="flex items-center space-x-2 text-secondary">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Thinking...</span>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="p-4 border-t border-secondary/20"
          >
            <div className="flex items-center space-x-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1 px-4 py-3 rounded-lg bg-white/80 border border-secondary/30 text-primary placeholder-primary-light/50 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-3 gold-gradient rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105"
                aria-label="Send message"
              >
                <Send className="w-5 h-5 text-primary" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
