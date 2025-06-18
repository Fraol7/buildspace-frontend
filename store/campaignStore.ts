import { create } from "zustand";

export interface Campaign {
  id: string;
  startup_id: string;
  title: string;
  description: string;
  target_amount: number;
  amount_raised: number;
  minimum_investment: number;
  start_date: string;
  end_date: string;
  is_active: boolean;
  total_funders: number;
  created_at: string;
  updated_at: string;
}

export interface InvestedCampaign extends Campaign {
  my_invested_amount: number;
  founder_name: string;
  founder_avatar: string;
  founder_rating: number;
}

export interface ExploreCampaign extends Campaign {
  founder_name: string;
  founder_avatar: string;
  founder_rating: number;
}

interface FundCampaignPayload {
  campaign_id: string;
  amount: string;
  redirect_url: string;
}

export interface CreateCampaignPayload {
  startup_id: string;
  title: string;
  description: string;
  target_amount: number;
  amount_raised: number;
  minimum_investment: number;
  start_date: string;
  end_date: string;
  is_active: boolean;
}

export interface FundraisingHistoryPoint {
  date: string; // e.g. "Jun 14"
  amount: number;
  day: string; // e.g. "Sat"
}

interface EditCampaignPayload {
  id: string;
  title: string;
  description: string;
  target_amount: number;
}

interface CampaignStoreState {
  myCampaigns: Campaign[];
  investedCampaigns: InvestedCampaign[];
  loading: boolean;
  error: string | null;
  isInvesting: boolean;
  allCampaigns: ExploreCampaign[];
  fetchAllCampaigns: (
    accessToken: string,
    limit?: number,
    offset?: number
  ) => Promise<void>;
  fetchMyCampaigns: (accessToken: string) => Promise<void>;
  fetchMyInvestedCampaigns: (accessToken: string) => Promise<void>;
  fundCampaign: (
    payload: FundCampaignPayload,
    accessToken: string
  ) => Promise<{ payment_url?: string; error?: string }>;
  getCampaignById: (
    campaignId: string,
    accessToken: string
  ) => Promise<Campaign | null>;
  getStartupEarnings: (
    startupId: string,
    accessToken: string
  ) => Promise<FundraisingHistoryPoint[]>;
  editCampaign: (
    payload: EditCampaignPayload,
    accessToken: string
  ) => Promise<Campaign | null>;
  createCampaign: (
    payload: Omit<
      CreateCampaignPayload,
      "amount_raised" | "is_active" | "start_date"
    > & { end_date: string },
    accessToken: string
  ) => Promise<Campaign | null>;
}

export const useCampaignStore = create<CampaignStoreState>((set) => ({
  myCampaigns: [],
  investedCampaigns: [],
  loading: false,
  error: null,
  isInvesting: false,
  allCampaigns: [],
  fetchAllCampaigns: async (accessToken: string, limit = 6, offset = 0) => {
    set({ loading: true, error: null });
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", `Bearer ${accessToken}`);
      const url = new URL("https://buildspace.onrender.com/get-campaigns");
      url.searchParams.append("limit", limit.toString());
      url.searchParams.append("offset", offset.toString());

      const res = await fetch(url.toString(), {
        method: "GET",
        headers: myHeaders,
        credentials: "omit" as RequestCredentials,
        redirect: "follow" as RequestRedirect,
      });
      if (!res.ok) throw new Error("Failed to fetch campaigns");
      const data = await res.json();
      console.log("Fetched campaigns:", data);
      set((state) => ({
        allCampaigns: data ?? [],
        loading: false,
      }));
    } catch (error: any) {
      set({
        error: error.message || "Unknown error",
        allCampaigns: [],
        loading: false,
      });
    }
  },
  fetchMyCampaigns: async (accessToken: string) => {
    set({ loading: true, error: null });
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", `Bearer ${accessToken}`);

      const res = await fetch(
        "https://buildspace.onrender.com/get-all-my-campaigns",
        {
          method: "GET",
          headers: myHeaders,
          credentials: "omit" as RequestCredentials,
          redirect: "follow" as RequestRedirect,
        }
      );
      if (!res.ok) throw new Error("Failed to fetch campaigns");
      const data = await res.json();
      console.log("Fetched campaigns:", data);
      set({ myCampaigns: data, loading: false });
    } catch (error: any) {
      set({ error: error.message || "Unknown error", loading: false });
    }
  },
  fetchMyInvestedCampaigns: async (accessToken: string) => {
    set({ loading: true, error: null });
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", `Bearer ${accessToken}`);

      const res = await fetch("https://buildspace.onrender.com/get-invested-campaigns", {
        method: "GET",
        headers: myHeaders,
        credentials: "omit" as RequestCredentials,
        redirect: "follow" as RequestRedirect,
      });
      if (!res.ok) throw new Error("Failed to fetch invested campaigns");
      const data = await res.json();
      console.log("Fetched invested campaigns:", data);
      set({ investedCampaigns: data ?? [], loading: false });
    } catch (error: any) {
      set({
        error: error.message || "Unknown error",
        investedCampaigns: [],
        loading: false,
      });
    }
  },
  fundCampaign: async (payload: FundCampaignPayload, accessToken: string) => {
    set({ isInvesting: true, error: null });
    console.log(payload);
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", `Bearer ${accessToken}`);

      const res = await fetch(
        "https://buildspace.onrender.com/crowdfunding/make-payment",
        {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify({
            campaign_id: payload.campaign_id,
            amount: payload.amount,
            redirect_url: payload.redirect_url,
          }),
          credentials: "omit" as RequestCredentials,
          redirect: "follow" as RequestRedirect,
        }
      );
      const payment_url = await res.json();
      set({ isInvesting: false });
      if (!res.ok)
        throw new Error(payment_url.error || "Failed to create payment");
      return { payment_url: payment_url };
    } catch (error: any) {
      set({ error: error.message || "Unknown error", loading: false });
      return { error: error.message || "Unknown error" };
    }
  },
  getCampaignById: async (campaignId: string, accessToken: string) => {
    set({ loading: true, error: null });
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", `Bearer ${accessToken}`);

      const res = await fetch(
        `https://buildspace.onrender.com/get-campaign-by-id/${campaignId}`,
        {
          method: "GET",
          headers: myHeaders,
          credentials: "omit" as RequestCredentials,
          redirect: "follow" as RequestRedirect,
        }
      );
      if (!res.ok) throw new Error("Failed to fetch campaign");
      const data = await res.json();
      set({ loading: false });
      return data as Campaign;
    } catch (error: any) {
      set({ error: error.message || "Unknown error", loading: false });
      return null;
    }
  },
  getStartupEarnings: async (startupId: string, accessToken: string) => {
    set({ loading: true, error: null });
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", `Bearer ${accessToken}`);

      const res = await fetch(
        `https://buildspace.onrender.com/get-startup-earnings/${startupId}`,
        {
          method: "GET",
          headers: myHeaders,
          credentials: "omit" as RequestCredentials,
          redirect: "follow" as RequestRedirect,
        }
      );
      if (!res.ok) throw new Error("Failed to fetch earnings data");
      const data = await res.json();
      // Transform to compatible format for the graph
      const transformed: FundraisingHistoryPoint[] = data.map(
        (item: { date: string; amount: number }) => {
          const dateObj = new Date(item.date);
          return {
            date: dateObj.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            }), // e.g. "Jun 14"
            amount: item.amount,
            day: dateObj.toLocaleDateString("en-US", { weekday: "short" }), // e.g. "Sat"
          };
        }
      );
      set({ loading: false });
      console.log("Transformed earnings data:", transformed);
      return transformed;
    } catch (error: any) {
      set({ error: error.message || "Unknown error", loading: false });
      return [];
    }
  },
  editCampaign: async (payload, accessToken) => {
    set({ loading: true, error: null });
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", `Bearer ${accessToken}`);

      const res = await fetch(
        "https://buildspace.onrender.com/update-campaign",
        {
          method: "PUT",
          headers: myHeaders,
          body: JSON.stringify(payload),
          credentials: "omit" as RequestCredentials,
          redirect: "follow" as RequestRedirect,
        }
      );
      if (!res.ok) throw new Error("Failed to update campaign");
      const data = await res.json();
      set({ loading: false });
      // Optionally update myCampaigns in store if needed
      return data as Campaign;
    } catch (error: any) {
      set({ error: error.message || "Unknown error", loading: false });
      return null;
    }
  },
  createCampaign: async (payload, accessToken) => {
    set({ loading: true, error: null });
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", `Bearer ${accessToken}`);

      // Calculate start_date (today) and format as ISO string
      const start_date = new Date().toISOString();
      // Use the provided end_date (should be in ISO format already)
      const {
        startup_id,
        title,
        description,
        target_amount,
        minimum_investment,
        end_date,
      } = payload;

      const body: CreateCampaignPayload = {
        startup_id,
        title,
        description,
        target_amount: Number(target_amount),
        amount_raised: 0,
        minimum_investment: Number(minimum_investment),
        start_date,
        end_date,
        is_active: true,
      };

      const res = await fetch("https://buildspace.onrender.com/create-campaign", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
        credentials: "omit" as RequestCredentials,
        redirect: "follow" as RequestRedirect,
      });
      if (!res.ok) throw new Error("Failed to create campaign");
      const data = await res.json();
      set({ loading: false });
      return data as Campaign;
    } catch (error: any) {
      set({ error: error.message || "Unknown error", loading: false });
      return null;
    }
  },
}));
