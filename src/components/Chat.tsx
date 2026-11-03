import ChatInput from './ChatInput'
import MessageList from './MessageList'
import Sidebar from './Sidebar'
import { useChatStore } from '../stores/chatStore'

export default function Chat() {
  const conversations = useChatStore((state) => state.conversations)
  const activeConversationId = useChatStore(
    (state) => state.activeConversationId,
  )
  const sender = useChatStore((state) => state.sender)
  const addMessage = useChatStore((state) => state.addMessage)
  const toggleSender = useChatStore((state) => state.toggleSender)
  const activeConversation = conversations.find(
    (conversation) => conversation.id === activeConversationId,
  )

  return (
    <div className="flex h-dvh bg-stone-200">
      <Sidebar />
      <main className="flex min-w-0 flex-1 justify-center">
        <div className="flex h-full w-full max-w-2xl flex-col">
          <MessageList messages={activeConversation?.messages ?? null} />
          <ChatInput
            sender={sender}
            onToggleSender={toggleSender}
            onSend={addMessage}
            disabled={!activeConversation}
          />
        </div>
      </main>
    </div>
  )
}
