import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Conversation } from '../types/conversation'
import type { Message, Sender } from '../types/message'

type ChatState = {
  conversations: Conversation[]
  activeConversationId: string | null
  sender: Sender
  createConversation: () => void
  selectConversation: (id: string) => void
  deleteConversation: (id: string) => void
  addMessage: (text: string) => void
  toggleSender: () => void
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      conversations: [],
      activeConversationId: null,
      sender: 'user',

      createConversation: () => {
        const conversation: Conversation = {
          id: crypto.randomUUID(),
          messages: [],
        }

        set((state) => ({
          conversations: [...state.conversations, conversation],
          activeConversationId: conversation.id,
        }))
      },

      selectConversation: (id) => {
        set((state) =>
          state.conversations.some((conversation) => conversation.id === id)
            ? { activeConversationId: id }
            : state,
        )
      },

      deleteConversation: (id) => {
        set((state) => ({
          conversations: state.conversations.filter(
            (conversation) => conversation.id !== id,
          ),
          activeConversationId:
            state.activeConversationId === id ? null : state.activeConversationId,
        }))
      },

      addMessage: (text) => {
        const trimmedText = text.trim()
        if (!trimmedText) return

        set((state) => {
          if (!state.activeConversationId) return state

          const message: Message = {
            id: crypto.randomUUID(),
            text: trimmedText,
            sender: state.sender,
          }

          return {
            conversations: state.conversations.map((conversation) =>
              conversation.id === state.activeConversationId
                ? { ...conversation, messages: [...conversation.messages, message] }
                : conversation,
            ),
          }
        })
      },

      toggleSender: () => {
        set((state) => ({
          sender: state.sender === 'user' ? 'robot' : 'user',
        }))
      },
    }),
    {
      name: 'chat-store',
      partialize: (state) => ({ conversations: state.conversations }),
    },
  ),
)
