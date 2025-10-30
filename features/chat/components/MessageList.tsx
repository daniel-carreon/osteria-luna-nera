import { Check, Calendar, Users, Clock, Loader2 } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  toolInvocations?: any[]
}

interface MessageListProps {
  messages: Message[]
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <>
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[85%] rounded-lg p-4 ${
              message.role === 'user'
                ? 'bg-secondary text-background'
                : 'bg-white text-primary shadow-sm'
            }`}
          >
            {/* Message Content */}
            {message.content && (
              <div className="prose prose-sm prose-primary max-w-none [&_p]:mb-2 [&_p:last-child]:mb-0 [&_ul]:mb-2 [&_ol]:mb-2">
                <ReactMarkdown
                  components={{
                    strong: ({ children }) => (
                      <strong className="font-semibold text-primary">{children}</strong>
                    ),
                    p: ({ children }) => (
                      <p className="text-sm leading-relaxed">{children}</p>
                    ),
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            )}

            {/* Tool Invocations */}
            {message.toolInvocations && message.toolInvocations.length > 0 && (
              <div className="mt-3 space-y-2">
                {message.toolInvocations.map((tool) => (
                  <ToolInvocation key={tool.toolCallId} tool={tool} />
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  )
}

function ToolInvocation({ tool }: { tool: any }) {
  const getToolIcon = () => {
    switch (tool.toolName) {
      case 'check_availability':
        return <Calendar className="w-4 h-4" />
      case 'create_reservation':
        return <Check className="w-4 h-4" />
      case 'get_menu':
        return <Users className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const getToolLabel = () => {
    switch (tool.toolName) {
      case 'check_availability':
        return 'Checking availability...'
      case 'create_reservation':
        return 'Creating reservation...'
      case 'get_menu':
        return 'Loading menu...'
      default:
        return 'Processing...'
    }
  }

  if (tool.state === 'call') {
    return (
      <div className="flex items-center space-x-2 text-secondary text-sm p-2 bg-secondary/10 rounded">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span>{getToolLabel()}</span>
      </div>
    )
  }

  if (tool.state === 'result') {
    return (
      <div className="p-3 bg-secondary/5 border border-secondary/20 rounded-lg">
        <div className="flex items-center space-x-2 text-secondary mb-2">
          {getToolIcon()}
          <span className="text-xs font-semibold uppercase tracking-wide">
            {tool.toolName.replace(/_/g, ' ')}
          </span>
        </div>

        {/* Display result based on tool */}
        {tool.toolName === 'get_menu' && tool.result?.dishes && (
          <div className="text-xs text-primary-light">
            Found {tool.result.dishes.length} dishes
          </div>
        )}

        {tool.toolName === 'check_availability' && (
          <div className="text-xs space-y-1">
            {tool.result?.available ? (
              <div className="flex items-center space-x-1 text-green-600">
                <Check className="w-3 h-3" />
                <span>Tables available</span>
              </div>
            ) : (
              <div className="text-accent">No tables available</div>
            )}
          </div>
        )}

        {tool.toolName === 'create_reservation' && tool.result?.success && (
          <div className="flex items-center space-x-1 text-green-600 text-xs">
            <Check className="w-3 h-3" />
            <span>Reservation confirmed</span>
          </div>
        )}
      </div>
    )
  }

  return null
}
