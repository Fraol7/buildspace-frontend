"use client";

import { useEffect, useState } from "react";
import { ContactList } from "./contact-list";
import { ChatArea } from "./chat-area";
import { ChatProvider } from "./chat-context";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, User, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useChatStore } from "@/store/chatStore";
import { useSession } from "next-auth/react";

export interface Contact {
  user_id: string;
  email: string;
  first_name: string;
  last_name: string;
  profile_picture_url?: string;
  last_message?: string;
  last_message_time?: string;
  is_online: boolean;
  unread_count: number;
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  timestamp: string;
  status: "sending" | "sent" | "delivered" | "read" | "failed";
  type: "text" | "file";
  fileData?: {
    name: string;
    size: number;
    type: string;
    url: string;
  };
}

export function ChatInterface() {
  const {
    contacts,
    fetchConversations,
    fetchMessages,
    connectSocket,
    disconnectSocket,
  } = useChatStore();
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.accessToken) {
      connectSocket(session.accessToken);
    }
    return () => {
      disconnectSocket();
    };
  }, [session?.accessToken, connectSocket, disconnectSocket]);

  useEffect(() => {
    const accessToken = session?.accessToken;
    if (accessToken) {
      fetchConversations(accessToken);
    }
  }, [fetchConversations]);

  useEffect(() => {
    const accessToken = session?.accessToken;
    if (selectedContact && accessToken) {
      fetchMessages(selectedContact.user_id, accessToken);
    }
  }, [selectedContact, fetchMessages, session?.accessToken]);

  const deleteChat = (contactId: string) => {
    if (selectedContact?.user_id === contactId) {
      setSelectedContact(null);
      // On mobile, go back to contacts list when chat is deleted
      if (window.innerWidth < 768) {
        setIsMobileView(false);
      }
    }
  };

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact);
    // On mobile, switch to chat view when contact is selected
    if (window.innerWidth < 768) {
      setIsMobileView(true);
    }
  };

  const handleBackToContacts = () => {
    setIsMobileView(false);
    setSelectedContact(null);
  };

  const handleDeleteChat = () => {
    if (selectedContact) {
      deleteChat(selectedContact.user_id);
      handleBackToContacts();
    }
  };

  return (
    <ChatProvider>
      <div className="flex md:h-[calc(100vh-73px)] h-[calc(100vh-73px)]">
        {/* Desktop Layout */}
        <div className="hidden md:flex w-full">
          <div className="w-80 border-r border-gray-200 bg-white">
            <ContactList
              contacts={contacts ?? []}
              selectedContact={selectedContact}
              onSelectContact={handleContactSelect}
            />
          </div>
          <div className="flex-1">
            <ChatArea
              selectedContact={selectedContact}
              onDeleteChat={deleteChat}
            />
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
                contacts={contacts ?? []}
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
                          <AvatarFallback className="bg-blue-100 text-blue-600">
                            {selectedContact.first_name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {selectedContact.is_online && (
                          <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h2 className="font-medium text-gray-900 truncate">
                          {selectedContact.first_name +
                            " " +
                            selectedContact.last_name}
                        </h2>
                        <p className="text-xs text-gray-500">
                          {selectedContact.is_online ? "Online" : "Offline"}
                        </p>
                      </div>
                    </>
                  )}
                </div>

                {selectedContact && (
                  <div className="flex items-center gap-1 shrink-0">
                    <Button
                      asChild
                      variant="ghost"
                      size="icon"
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <Link href={`/profile/${selectedContact.user_id}`}>
                        <User className="h-5 w-5" />
                      </Link>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <MoreVertical className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/profile/${selectedContact.user_id}`}
                            className="flex items-center gap-2"
                          >
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
  );
}
