"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Send,
  MoreVertical,
  AlertCircle,
  RotateCcw,
  Download,
  Trash2,
  User,
  FileText,
  ImageIcon,
  type File,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import { useChatContext } from "./chat-context"
import { FileUpload } from "./file-upload"
import Link from "next/link"
import type { Contact } from "./chat-interface"
import { EmojiPickerComponent } from "./emoji-picker"
import Image from "next/image"

interface ChatAreaProps {
  selectedContact: Contact | null
  onDeleteChat: (contactId: string) => void
  isMobile?: boolean
  onBackToContacts?: () => void
}

// Helper function to format date
const formatDate = (date: Date) => {
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  if (date.toDateString() === today.toDateString()) {
    return "Today"
  } else if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday"
  } else {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }
}

// Helper function to check if two dates are on different days
const isDifferentDay = (date1: Date, date2: Date) => {
  return date1.toDateString() !== date2.toDateString()
}

export function ChatArea({ selectedContact, onDeleteChat, isMobile = false, onBackToContacts }: ChatAreaProps) {
  const [message, setMessage] = useState("")
  const [isConnected] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()
  const { messages, sendMessage, sendFile, retryMessage } = useChatContext()

  const currentMessages = useMemo(() => {
    if (!selectedContact) return []
    return messages.filter(
      ({ senderId, receiverId }) =>
        (senderId === selectedContact.id && receiverId === "current-user") ||
        (senderId === "current-user" && receiverId === selectedContact.id),
    )
  }, [selectedContact, messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [currentMessages])

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedContact) return

    try {
      await sendMessage(message, selectedContact.id)
      setMessage("")
      // Focus back to input after sending
      inputRef.current?.focus()
    } catch (error) {
      console.error("Error sending message:", error)
      toast({
        title: "Failed to send message",
        description: "Please check your connection and try again.",
        variant: "destructive",
      })
    }
  }

  const handleRetry = async (messageId: string) => {
    try {
      await retryMessage(messageId)
      toast({
        title: "Message sent",
        description: "Your message has been delivered.",
      })
    } catch (error) {
      console.error("Error sending message:", error)
      toast({
        title: "Retry failed",
        description: "Please check your connection and try again.",
        variant: "destructive",
      })
    }
  }

  const handleFileSelect = async (file: File) => {
    if (!selectedContact) return

    try {
      await sendFile(file, selectedContact.id)
      toast({
        title: "File sent",
        description: `${file.name} has been shared.`,
      })
    } catch (error) {
      console.error("Error sending message:", error)
      toast({
        title: "Failed to send file",
        description: "Please check your connection and try again.",
        variant: "destructive",
      })
    }
  }

  const handleEmojiSelect = useCallback(
    (emoji: string) => {
      console.log("Emoji selected in chat area:", emoji) // Debug log

      if (!inputRef.current) {
        console.log("Input ref not available") // Debug log
        setMessage((prev) => prev + emoji)
        return
      }

      const input = inputRef.current
      const cursorPosition = input.selectionStart || message.length
      const newMessage = message.slice(0, cursorPosition) + emoji + message.slice(cursorPosition)

      console.log("Updating message from:", message, "to:", newMessage) // Debug log
      setMessage(newMessage)

      // Focus back to input and set cursor position after emoji
      setTimeout(() => {
        if (input) {
          input.focus()
          const newCursorPosition = cursorPosition + emoji.length
          input.setSelectionRange(newCursorPosition, newCursorPosition)
        }
      }, 0)
    },
    [message],
  )

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleDeleteChat = () => {
    onDeleteChat(selectedContact!.id)
    if (isMobile && onBackToContacts) {
      onBackToContacts()
    }
  }

  if (!selectedContact) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="h-8 w-8 text-indigo-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
          <p className="text-gray-500">Choose a contact from the list to start chatting</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Chat Header - Only show on desktop, mobile header is handled in parent */}
      {!isMobile && (
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-indigo-100 text-indigo-600">
                  {selectedContact.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {selectedContact.isOnline && (
                <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            <div>
              <h2 className="font-medium text-gray-900">{selectedContact.name}</h2>
              <p className="text-sm text-gray-500">{selectedContact.isOnline ? "Online" : "Offline"}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isConnected && (
              <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">Connection issues</span>
              </div>
            )}
            <Button asChild variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
              <Link href={`/profile/${selectedContact.id}`}>
                <User className="h-4 w-4" />
              </Link>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/profile/${selectedContact.id}`} className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    View Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleDeleteChat}
                  className="flex items-center gap-2 text-red-600 focus:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Chat
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}

      {/* Messages Area */}
      <div className={`flex-1 overflow-y-auto p-4 ${isMobile ? "pb-2" : ""}`}>
        {currentMessages.length === 0 ? (
          // No messages - Show welcome card
          <div className="flex items-center justify-center h-full">
            <div className="max-w-sm mx-auto text-center">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-lg font-semibold">
                      {selectedContact?.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Start a conversation with {selectedContact?.name.split(" ")[0]}
                </h3>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                  Say hello and start chatting! Your messages will appear here.
                </p>
                <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-2 rounded-full text-sm font-medium">
                  <span>👋</span>
                  <span>Say hello</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Existing messages
          <div className="space-y-1">
            {currentMessages.map((msg, index) => {
              const messageDate = new Date(msg.timestamp)
              const prevMessageDate = index > 0 ? new Date(currentMessages[index - 1].timestamp) : null
              const showDateSeparator = !prevMessageDate || isDifferentDay(messageDate, prevMessageDate)

              return (
                <div key={msg.id}>
                  {/* Date Separator */}
                  {showDateSeparator && (
                    <div className="flex justify-center my-4">
                      <div className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                        {formatDate(messageDate)}
                      </div>
                    </div>
                  )}

                  {/* Message */}
                  <div className={`flex ${msg.senderId === "current-user" ? "justify-end" : "justify-start"} mb-2`}>
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        msg.senderId === "current-user" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-900"
                      } ${isMobile ? "max-w-[280px]" : ""}`}
                    >
                      {msg.type === "file" && msg.fileData ? (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            {msg.fileData.type.startsWith("image/") ? (
                              <ImageIcon className="h-4 w-4" />
                            ) : (
                              <FileText className="h-4 w-4" />
                            )}
                            <span className="text-sm font-medium">{msg.fileData.name}</span>
                          </div>
                          {msg.fileData.type.startsWith("image/") ? (
                            <Image
                              src={msg.fileData.url || "/placeholder.svg"}
                              alt={msg.fileData.name}
                              className="max-w-full h-auto rounded"
                              width={300}
                              height={200}
                            />
                          ) : (
                            <div className="flex items-center justify-between">
                              <span className="text-xs opacity-75">
                                {(msg.fileData.size / 1024 / 1024).toFixed(2)} MB
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                className={`h-auto p-1 ${
                                  msg.senderId === "current-user"
                                    ? "text-indigo-200 hover:text-white"
                                    : "text-gray-600 hover:text-gray-900"
                                }`}
                                onClick={() => window.open(msg.fileData!.url, "_blank")}
                              >
                                <Download className="h-3 w-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                      )}
                      <div
                        className={`flex items-center justify-between mt-1 ${
                          msg.senderId === "current-user" ? "text-indigo-200" : "text-gray-500"
                        }`}
                      >
                        <span className="text-xs">
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                        {msg.senderId === "current-user" && (
                          <div className="flex items-center gap-1">
                            {msg.status === "failed" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRetry(msg.id)}
                                className="h-auto p-0 text-indigo-200 hover:text-white"
                              >
                                <RotateCcw className="h-3 w-3" />
                              </Button>
                            )}
                            <span className="text-xs">
                              {msg.status === "sending" && "⏳"}
                              {msg.status === "sent" && "✓"}
                              {msg.status === "delivered" && "✓✓"}
                              {msg.status === "read" && "✓✓"}
                              {msg.status === "failed" && "❌"}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className={`border-t border-gray-200 bg-white shrink-0 ${isMobile ? "p-3" : "p-4"}`}>
        <div className="flex items-center gap-2">
          <FileUpload onFileSelect={handleFileSelect} />
          <EmojiPickerComponent onEmojiSelect={handleEmojiSelect} />
          <Input
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            onKeyDown={handleKeyPress}
            className={`flex-1 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 ${
              isMobile ? "text-base" : ""
            }`}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className={`bg-indigo-600 hover:bg-indigo-700 ${isMobile ? "px-3" : ""}`}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
