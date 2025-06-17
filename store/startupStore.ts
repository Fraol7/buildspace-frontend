import { Startup } from "@/components/Entrepreneur/project-grid";
import { create } from "zustand";

type StartupStoreState = {
  startup: Startup | null;
  loading: boolean;
  error: string | null;
  savedStartups: Startup[];
  myStartups: Startup[];
  fetchStartupById: (id: string, accessToken: string) => Promise<void>;
  fetchMyStartups: (accessToken: string) => Promise<void>;
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

export const useStartupStore = create<StartupStoreState>((set) => ({
  startup: null,
  loading: false,
  error: null,
  savedStartups: [],
  myStartups: [],
  fetchStartupById: async (id: string, accessToken: string) => {
    set({ loading: true, error: null });
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", `Bearer ${accessToken}`);

      const res = await fetch(`http://localhost:8080/startupsByID/${id}`, {
        method: "GET",
        headers: myHeaders,
        credentials: "omit" as RequestCredentials,
        redirect: "follow" as RequestRedirect,
      });
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
      const res = await fetch("http://localhost:8080/startup", {
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
        `http://localhost:8080/save-startup/${startupId}`,
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
      const res = await fetch("http://localhost:8080/saved-startup", {
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
