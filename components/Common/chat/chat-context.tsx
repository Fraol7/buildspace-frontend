"use client"

import type React from "react"

import { createContext, useContext, useState, useCallback } from "react"
import type { Message } from "./chat-interface"

interface ChatContextType {
  messages: Message[]
  sendMessage: (content: string, receiverId: string) => Promise<void>
  sendFile: (file: File, receiverId: string) => Promise<void>
  retryMessage: (messageId: string) => Promise<void>
  deleteChat: (contactId: string) => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function useChatContext() {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider")
  }
  return context
}

const mockMessages: Message[] = [
  // 3 days ago (2025-05-29)
  {
    id: "1",
    content: "Hey! How's the project coming along?",
    senderId: "1",
    receiverId: "current-user",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    status: "read",
    type: "text",
  },
  {
    id: "2",
    content: "It's going well! Just finished the user interface mockups.",
    senderId: "current-user",
    receiverId: "1",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 300000).toISOString(), // 3 days ago + 5 min
    status: "read",
    type: "text",
  },
  {
    id: "3",
    content: "That's awesome! Can you share them?",
    senderId: "1",
    receiverId: "current-user",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 600000).toISOString(), // 3 days ago + 10 min
    status: "read",
    type: "text",
  },
  {
    id: "4",
    content: "Just sent them over. Let me know what you think!",
    senderId: "current-user",
    receiverId: "1",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 900000).toISOString(), // 3 days ago + 15 min
    status: "read",
    type: "text",
  },
  {
    id: "5",
    content: "They look great! Maybe adjust the button colors?",
    senderId: "1",
    receiverId: "current-user",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 1200000).toISOString(), // 3 days ago + 20 min
    status: "read",
    type: "text",
  },
  // 2 days ago (2025-05-30)
  {
    id: "6",
    content: "Good idea, I'll tweak the colors. How's the API going?",
    senderId: "current-user",
    receiverId: "1",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    status: "read",
    type: "text",
  },
  {
    id: "7",
    content: "API's progressing, but hit a bug with auth. Suggestions?",
    senderId: "1",
    receiverId: "current-user",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 300000).toISOString(), // 2 days ago + 5 min
    status: "read",
    type: "text",
  },
  {
    id: "8",
    content: "Check the token expiration logic. I'll review it too.",
    senderId: "current-user",
    receiverId: "1",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 600000).toISOString(), // 2 days ago + 10 min
    status: "read",
    type: "text",
  },
  {
    id: "9",
    content: "Fixed the token issue! Testing now.",
    senderId: "1",
    receiverId: "current-user",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 900000).toISOString(), // 2 days ago + 15 min
    status: "read",
    type: "text",
  },
  {
    id: "10",
    content: "Nice! Let me know how the tests go.",
    senderId: "current-user",
    receiverId: "1",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 1200000).toISOString(), // 2 days ago + 20 min
    status: "read",
    type: "text",
  },
  // Yesterday (2025-05-31)
  {
    id: "11",
    content: "Tests passed! Can you review the endpoints doc?",
    senderId: "1",
    receiverId: "current-user",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // Yesterday
    status: "read",
    type: "text",
  },
  {
    id: "12",
    content: "Looks good, fixed a typo in the params section.",
    senderId: "current-user",
    receiverId: "1",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 300000).toISOString(), // Yesterday + 5 min
    status: "read",
    type: "text",
  },
  {
    id: "13",
    content: "Thanks! Can we discuss the database schema?",
    senderId: "1",
    receiverId: "current-user",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 600000).toISOString(), // Yesterday + 10 min
    status: "read",
    type: "text",
  },
  {
    id: "14",
    content: "Sure, I'll prep notes. 2 PM work for you?",
    senderId: "current-user",
    receiverId: "1",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 900000).toISOString(), // Yesterday + 15 min
    status: "read",
    type: "text",
  },
  {
    id: "15",
    content: "2 PM's perfect. I'll set up the call.",
    senderId: "1",
    receiverId: "current-user",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 1200000).toISOString(), // Yesterday + 20 min
    status: "read",
    type: "text",
  },
  // Today (2025-06-01)
  {
    id: "16",
    content: "Call went great! Can you update the wireframes?",
    senderId: "1",
    receiverId: "current-user",
    timestamp: new Date(Date.now() - 180000).toISOString(), // 3 minutes ago
    status: "read",
    type: "text",
  },
  {
    id: "17",
    content: "On it! I'll send them by end of day.",
    senderId: "current-user",
    receiverId: "1",
    timestamp: new Date(Date.now() - 120000).toISOString(), // 2 minutes ago
    status: "read",
    type: "text",
  },
  {
    id: "18",
    content: "Awesome! Also, need your take on error handling.",
    senderId: "1",
    receiverId: "current-user",
    timestamp: new Date(Date.now() - 90000).toISOString(), // 1.5 minutes ago
    status: "read",
    type: "text",
  },
  {
    id: "19",
    content: "I'll add more logging. Looks solid otherwise.",
    senderId: "current-user",
    receiverId: "1",
    timestamp: new Date(Date.now() - 60000).toISOString(), // 1 minute ago
    status: "read",
    type: "text",
  },
  {
    id: "20",
    content: "Thanks! Let's finalize the sprint plan tomorrow.",
    senderId: "1",
    receiverId: "current-user",
    timestamp: new Date(Date.now() - 30000).toISOString(), // 30 seconds ago
    status: "read",
    type: "text",
  },
]

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>(mockMessages)

  const sendMessage = useCallback(async (content: string, receiverId: string): Promise<void> => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      senderId: "current-user",
      receiverId,
      timestamp: new Date().toISOString(),
      status: "sending",
      type: "text",
    }

    setMessages((prev) => [...prev, newMessage])

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simulate random failure for demonstration
      if (Math.random() < 0.1) {
        throw new Error("Network error")
      }

      setMessages((prev) =>
        prev.map((msg) => (msg.id === newMessage.id ? { ...msg, status: "delivered" as const } : msg)),
      )

      // Simulate receiving a response after a delay
      setTimeout(() => {
        const responseMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: `Thanks for your message: "${content}"`,
          senderId: receiverId,
          receiverId: "current-user",
          timestamp: new Date().toISOString(),
          status: "sent",
          type: "text",
        }
        setMessages((prev) => [...prev, responseMessage])
      }, 2000)
    } catch (error) {
      setMessages((prev) => prev.map((msg) => (msg.id === newMessage.id ? { ...msg, status: "failed" as const } : msg)))
      throw error
    }
  }, [])

  const sendFile = useCallback(async (file: File, receiverId: string): Promise<void> => {
    // Create a blob URL for the file (in a real app, you'd upload to your server)
    const fileUrl = URL.createObjectURL(file)

    const newMessage: Message = {
      id: Date.now().toString(),
      content: `Shared a file: ${file.name}`,
      senderId: "current-user",
      receiverId,
      timestamp: new Date().toISOString(),
      status: "sending",
      type: "file",
      fileData: {
        name: file.name,
        size: file.size,
        type: file.type,
        url: fileUrl,
      },
    }

    setMessages((prev) => [...prev, newMessage])

    // Simulate API call for file upload
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulate random failure for demonstration
      if (Math.random() < 0.1) {
        throw new Error("Upload failed")
      }

      setMessages((prev) =>
        prev.map((msg) => (msg.id === newMessage.id ? { ...msg, status: "delivered" as const } : msg)),
      )
    } catch (error) {
      setMessages((prev) => prev.map((msg) => (msg.id === newMessage.id ? { ...msg, status: "failed" as const } : msg)))
      throw error
    }
  }, [])

  const retryMessage = useCallback(
    async (messageId: string): Promise<void> => {
      const message = messages.find((m) => m.id === messageId)
      if (!message) return

      setMessages((prev) => prev.map((msg) => (msg.id === messageId ? { ...msg, status: "sending" as const } : msg)))

      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setMessages((prev) =>
          prev.map((msg) => (msg.id === messageId ? { ...msg, status: "delivered" as const } : msg)),
        )
      } catch (error) {
        setMessages((prev) => prev.map((msg) => (msg.id === messageId ? { ...msg, status: "failed" as const } : msg)))
        throw error
      }
    },
    [messages],
  )

  const deleteChat = useCallback((contactId: string) => {
    setMessages((prev) => prev.filter((msg) => !(msg.senderId === contactId || msg.receiverId === contactId)))
  }, [])

  return (
    <ChatContext.Provider value={{ messages, sendMessage, sendFile, retryMessage, deleteChat }}>
      {children}
    </ChatContext.Provider>
  )
}
