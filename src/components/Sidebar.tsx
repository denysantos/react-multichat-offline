import { useChatStore } from '../stores/chatStore'
import SidebarItem from './SidebarItem'

type SidebarProps = {
  isMobileOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isMobileOpen, onClose }: SidebarProps) {
  const {
    conversations,
    activeConversationId,
    createConversation,
    selectConversation,
    deleteConversation
  } = useChatStore() 

  function handleCreateConversation() {
    createConversation()
    onClose()
  }

  return (
    <aside
      id="conversation-sidebar"
      className={`h-dvh w-64 shrink-0 flex-col border-r border-stone-300 bg-stone-100 p-4 ${
        isMobileOpen ? 'fixed inset-y-0 left-0 z-40 flex' : 'hidden'
      } ${isMobileOpen ? 'pt-14' : ''} md:static md:z-auto md:flex`}
    >
      <button
        type="button"
        onClick={handleCreateConversation}
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
            onSelect={() => {
              selectConversation(conversation.id)
              onClose()
            }}
            onDelete={() => deleteConversation(conversation.id)}
          />
        ))}
      </nav>
    </aside>
  )
}
