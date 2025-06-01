"use client"

import { useState } from "react"
import { ContactList } from "./contact-list"
import { ChatArea } from "./chat-area"
import { ChatProvider } from "./chat-context"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft, User, MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

export interface Contact {
  id: string
  name: string
  avatar?: string
  lastMessage?: string
  lastMessageTime?: string
  isOnline: boolean
  unreadCount: number
}

export interface Message {
  id: string
  content: string
  senderId: string
  receiverId: string
  timestamp: string
  status: "sending" | "sent" | "delivered" | "read" | "failed"
  type: "text" | "file"
  fileData?: {
    name: string
    size: number
    type: string
    url: string
  }
}

const mockContacts: Contact[] = [
  {
    id: "11",
    name: "Kidist Mengistu",
    lastMessage: "Can you review the latest draft?",
    lastMessageTime: "1 min ago",
    isOnline: true,
    unreadCount: 5,
  },
  {
    id: "1",
    name: "Abebe Kebede",
    lastMessage: "Selam, did you review the documents?",
    lastMessageTime: "5 min ago",
    isOnline: true,
    unreadCount: 3,
  },
  {
    id: "2",
    name: "Birtukan Alemayehu",
    lastMessage: "Got it, I'll check and let you know.",
    lastMessageTime: "10 min ago",
    isOnline: true,
    unreadCount: 1,
  },
  {
    id: "3",
    name: "Chala Bekele",
    lastMessage: "Can we meet tomorrow morning?",
    lastMessageTime: "30 min ago",
    isOnline: false,
    unreadCount: 2,
  },
  {
    id: "4",
    name: "Desta Worku",
    lastMessage: "Great progress on the project!",
    lastMessageTime: "1 hour ago",
    isOnline: false,
    unreadCount: 0,
  },
  {
    id: "5",
    name: "Eyerusalem Tadesse",
    lastMessage: "Thanks for the clarification.",
    lastMessageTime: "2 hours ago",
    isOnline: true,
    unreadCount: 0,
  },
  {
    id: "6",
    name: "Fikadu Girma",
    lastMessage: "I'll send the files shortly.",
    lastMessageTime: "3 hours ago",
    isOnline: false,
    unreadCount: 1,
  },
  {
    id: "13",
    name: "Meseret Yohannes",
    lastMessage: "I'll share the document soon.",
    lastMessageTime: "4 hours ago",
    isOnline: true,
    unreadCount: 2,
  },
  {
    id: "7",
    name: "Genet Hailu",
    lastMessage: "Selam, are you free for a quick call?",
    lastMessageTime: "Yesterday",
    isOnline: true,
    unreadCount: 4,
  },
  {
    id: "12",
    name: "Lensa Eshete",
    lastMessage: "Looking forward to our meeting!",
    lastMessageTime: "1 day ago",
    isOnline: false,
    unreadCount: 0,
  },
  {
    id: "8",
    name: "Hana Wondimu",
    lastMessage: "Please confirm the meeting schedule.",
    lastMessageTime: "2 days ago",
    isOnline: false,
    unreadCount: 0,
  },
  {
    id: "9",
    name: "Isayas Tesfaye",
    lastMessage: "I'll follow up on that.",
    lastMessageTime: "3 days ago",
    isOnline: true,
    unreadCount: 0,
  },
  {
    id: "10",
    name: "Jemal Ahmed",
    lastMessage: "Thanks, talk to you soon!",
    lastMessageTime: "Last week",
    isOnline: false,
    unreadCount: 1,
  },
];

export function ChatInterface() {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [contacts, setContacts] = useState<Contact[]>(mockContacts)
  const [isMobileView, setIsMobileView] = useState(false)

  const deleteChat = (contactId: string) => {
    setContacts(contacts.filter((contact) => contact.id !== contactId))
    if (selectedContact?.id === contactId) {
      setSelectedContact(null)
      // On mobile, go back to contacts list when chat is deleted
      if (window.innerWidth < 768) {
        setIsMobileView(false)
      }
    }
  }

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact)
    // On mobile, switch to chat view when contact is selected
    if (window.innerWidth < 768) {
      setIsMobileView(true)
    }
  }

  const handleBackToContacts = () => {
    setIsMobileView(false)
    setSelectedContact(null)
  }

  const handleDeleteChat = () => {
    if (selectedContact) {
      deleteChat(selectedContact.id)
      handleBackToContacts()
    }
  }

  return (
    <ChatProvider>
      <div className="flex md:h-[calc(100vh-73px)] h-[calc(100vh-73px)]">
        {/* Desktop Layout */}
        <div className="hidden md:flex w-full">
          <div className="w-80 border-r border-gray-200 bg-white">
            <ContactList contacts={contacts} selectedContact={selectedContact} onSelectContact={handleContactSelect} />
          </div>
          <div className="flex-1">
            <ChatArea selectedContact={selectedContact} onDeleteChat={deleteChat} />
          </div>
        </div>

        {/* Mobile/Tablet Layout */}
        <div className="flex md:hidden w-full">
          {!isMobileView ? (
            // Show contacts list on mobile
            <div className="w-full bg-white">
              <div className="border-b border-gray-200 p-4">
                <h1 className="text-xl font-semibold text-gray-900">Chats</h1>
              </div>
              <ContactList
                contacts={contacts}
                selectedContact={selectedContact}
                onSelectContact={handleContactSelect}
              />
            </div>
          ) : (
            // Show chat area on mobile
            <div className="w-full flex flex-col h-full">
              {/* Mobile Chat Header */}
              <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-white shrink-0">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleBackToContacts}
                    className="text-gray-500 hover:text-gray-700 shrink-0"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  {selectedContact && (
                    <>
                      <div className="relative shrink-0">
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
                      <div className="flex-1 min-w-0">
                        <h2 className="font-medium text-gray-900 truncate">{selectedContact.name}</h2>
                        <p className="text-xs text-gray-500">{selectedContact.isOnline ? "Online" : "Offline"}</p>
                      </div>
                    </>
                  )}
                </div>

                {selectedContact && (
                  <div className="flex items-center gap-1 shrink-0">
                    <Button asChild variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
                      <Link href={`/profile/${selectedContact.id}`}>
                        <User className="h-5 w-5" />
                      </Link>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
                          <MoreVertical className="h-5 w-5" />
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
                          <MoreVertical className="h-4 w-4" />
                          Delete Chat
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </div>

              {/* Chat Content */}
              <div className="flex-1 min-h-0">
                <ChatArea
                  selectedContact={selectedContact}
                  onDeleteChat={deleteChat}
                  isMobile={true}
                  onBackToContacts={handleBackToContacts}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </ChatProvider>
  )
}
