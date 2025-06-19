import { Startup } from "@/components/Entrepreneur/project-grid";
import { create } from "zustand";

type Investment = {
  id: string;
  startup_id: Startup;
  investor_id: string;
  amount: number;
  tx_ref: string;
  status: string;
  invested_at: string;
};

type InvestmentStoreState = {
  investments: Investment[];
  loading: boolean;
  error: string | null;
  getMyInvestments: (accessToken: string) => Promise<Investment[]>;
};

export const useInvestmentStore = create<InvestmentStoreState>((set) => ({
  investments: [],
  loading: false,
  error: null,
  getMyInvestments: async (accessToken: string) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(
        "https://buildspace.onrender.com/my-investments",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
          },
          credentials: "omit",
          redirect: "follow",
        }
      );
      if (!res.ok) throw new Error("Failed to fetch investments");
      const data = await res.json();
      set({ investments: data ?? [], loading: false });
      return data;
    } catch (e: any) {
      set({
        error: e.message || "Unknown error",
        loading: false,
        investments: [],
      });
      return [];
    }
  },
}));
