import { create } from "zustand";
import type { Contact, Message } from "@/components/Common/chat/chat-interface";

interface ChatStoreState {
  contacts: Contact[];
  messages: Message[];
  loading: boolean;
  error: string | null;
  socket: WebSocket | null;
  activeContactId: string | null;
  setActiveContact: (contactId: string | null) => void;
  uploadFiles: (files: File[], accessToken: string) => Promise<string[]>;
  fetchConversations: (accessToken: string) => Promise<void>;
  markMessagesAsRead: (
    receiverId: string,
    accessToken: string
  ) => Promise<void>;
  fetchMessages: (receiverId: string, accessToken: string) => Promise<void>;
  sendMessage: ({
    content,
    senderId,
    receiverId,
    files,
    accessToken,
  }: {
    content: string;
    senderId: string;
    receiverId: string;
    files?: File[];
    accessToken: string;
  }) => Promise<void>;
  connectSocket: (accessToken: string) => void;
  disconnectSocket: () => void;
}

export const useChatStore = create<ChatStoreState>((set, get) => ({
  contacts: [],
  messages: [],
  loading: false,
  error: null,
  socket: null,
  activeContactId: null,
  setActiveContact: (contactId: string | null) =>
    set({ activeContactId: contactId }),
  uploadFiles: async (files: File[], accessToken: string) => {
    set({ loading: true, error: null });
    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));

      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${accessToken}`);

      const response = await fetch("http://localhost:8080/chat/upload", {
        method: "POST",
        headers: myHeaders,
        body: formData,
        credentials: "omit" as RequestCredentials,
        redirect: "follow" as RequestRedirect,
      });

      if (!response.ok) throw new Error("Failed to upload files");
      const data = await response.json();
      set({ loading: false });
      return data.urls; // Assuming the API returns an array of file URLs
    } catch (error: any) {
      set({ error: error.message || "Unknown error", loading: false });
      return [];
    }
  },
  fetchConversations: async (accessToken: string) => {
    set({ loading: true, error: null });
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", `Bearer ${accessToken}`);

      const conversationsRes = await fetch(
        "http://localhost:8080/chat/conversations",
        {
          method: "GET",
          headers: myHeaders,
          credentials: "omit" as RequestCredentials,
          redirect: "follow" as RequestRedirect,
        }
      );
      if (!conversationsRes.ok)
        throw new Error("Failed to fetch conversations");
      const data = await conversationsRes.json();
      set({ contacts: data, loading: false });
    } catch (error: any) {
      set({ error: error.message || "Unknown error", loading: false });
    }
  },
  markMessagesAsRead: async (receiverId: string, accessToken: string) => {
    const markRes = await fetch(
      `http://localhost:8080/chat/mark-read/${receiverId}`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    get().contacts.forEach((contact) => {
      if (contact.user_id === receiverId) {
        contact.unread_count = 0; // Reset unread count for this contact
      }
    });

    if (!markRes.ok) console.error("Failed to mark messages as read");
  },
  fetchMessages: async (receiverId: string, accessToken: string) => {
    set({ loading: true, error: null });
    try {
      await get().markMessagesAsRead(receiverId, accessToken);
      const res = await fetch(
        `http://localhost:8080/chat/messages/${receiverId}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch messages");
      const data = await res.json();
      console.log("Fetched messages:", data);
      const messages: Message[] = data.map((msg: any, idx: number) => ({
        id: idx.toString(),
        content: msg.text,
        senderId: msg.from,
        receiverId: msg.to,
        timestamp: msg.created,
        status: "delivered",
        type: msg.files ? "file" : "text",
        files: Array.isArray(msg.files)
          ? msg.files.map((url: string) => ({
              url,
              name: url.split("/").pop() || "file",
              type: url.match(/\.(jpg|jpeg|png|gif)$/i)
                ? "image/" + (url.split(".").pop() || "jpeg")
                : url.match(/\.(mp4|mov|avi|webm)$/i)
                ? "video/" + (url.split(".").pop() || "mp4")
                : "application/octet-stream",
            }))
          : undefined,
      }));
      console.log("Mapped messages:", messages);
      set({ messages, loading: false });
    } catch (error: any) {
      set({ error: error.message || "Unknown error", loading: false });
    }
  },
  sendMessage: async ({
    content,
    senderId,
    receiverId,
    files = [],
    accessToken,
  }: {
    content: string;
    senderId: string;
    receiverId: string;
    files?: File[];
    accessToken: string;
  }) => {
    console.log("Sending message:", content);
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      senderId: senderId,
      receiverId,
      timestamp: new Date().toISOString(),
      status: "sending",
      type: files.length > 0 ? "file" : "text",
    };
    set((state) => ({ messages: [...state.messages, newMessage] }));
    const { socket } = get();

    let fileUrls: string[] = [];
    if (files && files.length > 0) {
      try {
        fileUrls = await get().uploadFiles(files, accessToken);
      } catch {
        set((state) => ({
          messages: state.messages.map((msg) =>
            msg.id === newMessage.id ? { ...msg, status: "failed" } : msg
          ),
        }));
        throw new Error("File upload failed");
      }
    }

    try {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(
          JSON.stringify({
            to: receiverId,
            text: content,
            files: fileUrls,
          })
        );
        set((state) => ({
          messages: state.messages.map((msg) =>
            msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg
          ),
        }));
      } else {
        // Fallback to HTTP POST
        console.log("WebSocket not connected, using HTTP POST");
        throw new Error(
          "No POST endpoint available for sending messages. Please connect via WebSocket."
        );
      }
    } catch {
      set((state) => ({
        messages: state.messages.map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: "failed" } : msg
        ),
      }));
    }
  },
  connectSocket: (accessToken: string) => {
    if (get().socket) return; // Already connected
    const ws = new WebSocket(
      `ws://localhost:8080/chat/ws?token=${accessToken}`
    );
    ws.onopen = () => {
      // Send the token as an Authorization header via a custom protocol message
      console.log("WebSocket connected");
      set({ socket: ws });
    };
    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      const mappedMsg: Message = {
        id: Date.now().toString() + Math.random().toString(36).slice(2), // unique id
        content: msg.text,
        senderId: msg.from,
        receiverId: msg.to,
        timestamp: msg.created,
        status: "delivered",
        type: "text",
      };

      const { activeContactId } = get();

      console.log("Received message:", mappedMsg);
      set((state) => ({
        messages: [...state.messages, mappedMsg],
        contacts: state.contacts.map((contact) => {
          // Only increment unread if this conversation is NOT open
          if (
            contact.user_id === mappedMsg.senderId &&
            mappedMsg.senderId !== activeContactId
          ) {
            return {
              ...contact,
              unread_count: (contact.unread_count || 0) + 1,
            };
          }
          get().markMessagesAsRead(contact.user_id, accessToken);
          return contact;
        }),
      }));
    };
    ws.onclose = () => {
      set({ socket: null });
      console.log("WebSocket disconnected");
    };
  },

  disconnectSocket: () => {
    get().socket?.close();
    set({ socket: null });
  },
}));
