import { useChatStore } from '../stores/chatStore'
import SidebarItem from './SidebarItem'

export default function Sidebar() {
  const {
    conversations,
    activeConversationId,
    createConversation,
    selectConversation,
    deleteConversation
  } = useChatStore() 

  return (
    <aside className="hidden h-dvh w-64 shrink-0 flex-col border-r border-stone-300 bg-stone-100 p-4 md:flex">
      <button
        type="button"
        onClick={createConversation}
        className="mb-4 rounded-lg bg-stone-800 px-4 py-2 text-left font-medium text-white transition-colors hover:bg-stone-700"
      >
        + Nova conversa
      </button>

      <nav aria-label="Conversas" className="flex flex-col gap-2 overflow-y-auto">
        {conversations.map((conversation) => (
          <SidebarItem
            key={conversation.id}
            id={conversation.id}
            isActive={conversation.id === activeConversationId}
            onSelect={() => selectConversation(conversation.id)}
            onDelete={() => deleteConversation(conversation.id)}
          />
        ))}
      </nav>
    </aside>
  )
}
