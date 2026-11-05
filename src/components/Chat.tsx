import { useState } from 'react'
import ChatInput from './ChatInput'
import MessageList from './MessageList'
import MobileMenuButton from './MobileMenuButton'
import Sidebar from './Sidebar'
import { useChatStore } from '../stores/chatStore'

export default function Chat() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
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
      <Sidebar
        isMobileOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />
      {isMobileSidebarOpen && (
        <button
          type="button"
          aria-label="Fechar menu de conversas"
          onClick={() => setIsMobileSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
        />
      )}
      <main className="relative flex min-w-0 flex-1 justify-center">
        <MobileMenuButton
          isOpen={isMobileSidebarOpen}
          onClick={() => setIsMobileSidebarOpen((isOpen) => !isOpen)}
        />
        <div className="flex h-full w-full max-w-2xl flex-col pt-14 md:pt-0">
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
