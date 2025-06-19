import { Startup } from "@/components/Entrepreneur/project-grid";
import { create } from "zustand";

export type User = {
  id: string;
  email: string;
  password_hash: string;
  auth_type: string;
  role: "startup" | "investor";
  first_name: string;
  last_name: string;
  profile_picture_url: string;
  rating: number;
  created_at: string;
  updated_at: string;
};
type StartupStoreState = {
  startup: Startup | null;
  loading: boolean;
  user: User | null;
  error: string | null;
  savedStartups: Startup[];
  myStartups: Startup[];
  fetchUserById: (id: string, accessToken: string) => Promise<void>;
  fetchStartupById: (id: string, accessToken: string) => Promise<void>;
  fetchMyStartups: (accessToken: string) => Promise<void>;
  rateUser: (
    ratee_id: string,
    rating: number,
    accessToken: string
  ) => Promise<boolean>;
  updateStartup: (
    payload: Partial<Startup>,
    accessToken: string
  ) => Promise<boolean>;
  createStartup: (
    payload: StartupProfilePayload,
    accessToken: string
  ) => Promise<boolean>;
  saveStartup: (startupId: string, accessToken: string) => Promise<boolean>;
  getSavedStartups: (accessToken: string) => Promise<Startup[]>;
};

type StartupProfilePayload = {
  startup_name: string;
  tag_line: string;
  logo_url: string;
  description: string;
  website: string;
  industry: number;
  funding_goal: number;
  funding_stage: string;
  amount_raised: number;
  business_model: any; // Replace 'any' with your BusinessModel type if available
  revenue: number;
  location: string;
};

export const useStartupStore = create<StartupStoreState>((set, get) => ({
  startup: null,
  loading: false,
  user: null,
  error: null,
  savedStartups: [],
  myStartups: [],
  rateUser: async (ratee_id: string, rating: number, accessToken: string) => {
    set({ loading: true, error: null });
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${accessToken}`);
    try {
      const res = await fetch("https://buildspace.onrender.com/rate-user", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({ ratee_id, rating }),
        credentials: "omit" as RequestCredentials,
        redirect: "follow" as RequestRedirect,
      });
      if (!res.ok) {
        const errorData = await res.text();
        console.error("Error response:", errorData);
        throw new Error("Failed to rate user");
      }
      if (ratee_id == get().user?.id) {
        // If the rated user is the current user, update the user state
        const currentUser = get().user;
        if (currentUser) {
          const updatedUser: User = {
            ...currentUser,
            rating: rating,
            id: currentUser.id,
            email: currentUser.email,
            password_hash: currentUser.password_hash,
            auth_type: currentUser.auth_type,
            role: currentUser.role,
            first_name: currentUser.first_name,
            last_name: currentUser.last_name,
            profile_picture_url: currentUser.profile_picture_url,
            created_at: currentUser.created_at,
            updated_at: currentUser.updated_at,
          };
          set({ user: updatedUser });
        }
      }
      set({ loading: false });
      return true;
    } catch (e: any) {
      set({ error: e.message || "Unknown error", loading: false });
      return false;
    }
  },
  fetchUserById: async (id: string, accessToken: string) => {
    set({ loading: true, error: null });
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", `Bearer ${accessToken}`);

      const res = await fetch(
        `https://buildspace.onrender.com/userByID/${id}`,
        {
          method: "GET",
          headers: myHeaders,
          credentials: "omit" as RequestCredentials,
          redirect: "follow" as RequestRedirect,
        }
      );
      if (!res.ok) throw new Error("Failed to fetch user");
      const data = await res.json();
      set({ user: data, loading: false });
    } catch (e: any) {
      set({
        error: e.message || "Unknown error",
        startup: null,
        loading: false,
      });
    }
  },
  fetchStartupById: async (id: string, accessToken: string) => {
    set({ loading: true, error: null });
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", `Bearer ${accessToken}`);

      const res = await fetch(
        `https://buildspace.onrender.com/startupsByID/${id}`,
        {
          method: "GET",
          headers: myHeaders,
          credentials: "omit" as RequestCredentials,
          redirect: "follow" as RequestRedirect,
        }
      );
      if (!res.ok) throw new Error("Failed to fetch startup");
      const data = await res.json();
      set({ startup: data, loading: false });
    } catch (e: any) {
      set({
        error: e.message || "Unknown error",
        startup: null,
        loading: false,
      });
    }
  },
  fetchMyStartups: async (accessToken: string) => {
    set({ loading: true, error: null });
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", `Bearer ${accessToken}`);

      const res = await fetch("https://buildspace.onrender.com/my-startups", {
        method: "GET",
        headers: myHeaders,
        credentials: "omit" as RequestCredentials,
        redirect: "follow" as RequestRedirect,
      });
      if (!res.ok) throw new Error("Failed to fetch my startups");
      const data = await res.json();
      set({ myStartups: data ?? [], loading: false });
    } catch (e: any) {
      set({
        error: e.message || "Unknown error",
        myStartups: [],
        loading: false,
      });
    }
  },
  updateStartup: async (payload: Partial<Startup>, accessToken: string) => {
    set({ loading: true, error: null });
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${accessToken}`);
    try {
      const res = await fetch("https://buildspace.onrender.com/startup", {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(payload),
        credentials: "omit" as RequestCredentials,
        redirect: "follow" as RequestRedirect,
      });
      if (!res.ok) throw new Error("Failed to update startup");
      const data = await res.json();
      set({ startup: data, loading: false });
      return true;
    } catch (e: any) {
      set({ error: e.message || "Unknown error", loading: false });
      return false;
    }
  },
  createStartup: async (payload, accessToken) => {
    set({ loading: true, error: null });
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${accessToken}`);
    try {
      const res = await fetch(
        "https://buildspace.onrender.com/user/create-startup",
        {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify(payload),
          credentials: "omit" as RequestCredentials,
          redirect: "follow" as RequestRedirect,
        }
      );
      if (!res.ok) throw new Error("Failed to create startup");
      const data = await res.json();
      set({ startup: data, loading: false });
      return true;
    } catch (e: any) {
      set({ error: e.message || "Unknown error", loading: false });
      return false;
    }
  },
  saveStartup: async (startupId: string, accessToken: string) => {
    set({ loading: true, error: null });
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${accessToken}`);
    try {
      const res = await fetch(
        `https://buildspace.onrender.com/save-startup/${startupId}`,
        {
          method: "POST",
          headers: myHeaders,
          credentials: "omit" as RequestCredentials,
          redirect: "follow" as RequestRedirect,
        }
      );
      if (!res.ok) throw new Error("Failed to save startup");
      set({ loading: false });
      return true;
    } catch (e: any) {
      set({ error: e.message || "Unknown error", loading: false });
      return false;
    }
  },
  getSavedStartups: async (accessToken: string) => {
    set({ loading: true, error: null });
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${accessToken}`);
    try {
      const res = await fetch("https://buildspace.onrender.com/saved-startup", {
        method: "GET",
        headers: myHeaders,
        credentials: "omit" as RequestCredentials,
        redirect: "follow" as RequestRedirect,
      });
      if (!res.ok) throw new Error("Failed to fetch saved startups");
      const data = await res.json();
      console.log("Fetched saved startups:", data);
      set({ savedStartups: data ?? [], loading: false });
      return data;
    } catch (e: any) {
      set({ error: e.message || "Unknown error", loading: false });
      return [];
    }
  },
}));
