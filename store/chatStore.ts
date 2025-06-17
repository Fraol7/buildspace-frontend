import { create } from "zustand";
import type { Contact, Message } from "@/components/Common/chat/chat-interface";

interface ChatStoreState {
  contacts: Contact[];
  messages: Message[];
  loading: boolean;
  error: string | null;
  socket: WebSocket | null;
  fetchConversations: (accessToken: string) => Promise<void>;
  fetchMessages: (receiverId: string, accessToken: string) => Promise<void>;
  sendMessage: ({
    content,
    senderId,
    receiverId,
    accessToken,
  }: {
    content: string;
    senderId: string;
    receiverId: string;
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
  fetchConversations: async (accessToken: string) => {
    set({ loading: true, error: null });
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", `Bearer ${accessToken}`);

      const conversationsRes = await fetch(
        "https://buildspace.onrender.com/chat/conversations",
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
  fetchMessages: async (receiverId: string, accessToken: string) => {
    set({ loading: true, error: null });
    try {
      const markRes = await fetch(
        `https://buildspace.onrender.com/chat/mark-read/${receiverId}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (!markRes.ok) console.error("Failed to mark messages as read");

      const res = await fetch(
        `https://buildspace.onrender.com/chat/messages/${receiverId}`,
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
        type: msg.file ? "file" : "text",
        fileData: msg.file
          ? {
              name: "file name",
              size: "file size",
              type: "file type",
              url: msg.file.url,
            }
          : undefined,
      }));
      set({ messages, loading: false });
    } catch (error: any) {
      set({ error: error.message || "Unknown error", loading: false });
    }
  },
  sendMessage: async ({
    content,
    senderId,
    receiverId,
    accessToken,
  }: {
    content: string;
    senderId: string;
    receiverId: string;
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
      type: "text",
    };
    set((state) => ({ messages: [...state.messages, newMessage] }));
    const { socket } = get();

    try {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(
          JSON.stringify({
            to: receiverId,
            text: content,
            files: [],
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
      `wss://buildspace.onrender.com/chat/ws?token=${accessToken}`
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
      set((state) => ({
        messages: [...state.messages, mappedMsg],
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
