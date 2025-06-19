import { Startup } from "@/components/Entrepreneur/project-grid";
import { create } from "zustand";
import { User } from "./startupStore";

interface UserData {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  rating: number;
  // ... other user fields
}

interface InvestorStats {
  total_startups_backed: number;
  total_invested: number;
  user: UserData;
}

type Earning = {
  total_crowdfunding: number;
  total_investment: number;
  gain_over_time: any[];
};

type UserProfile = {
  rating: number;
  // add more fields as needed
};

type RecommendedInvestor = {
  id: string;
  user_id: string;
  investment_preferences: string[];
  minimum_ticket_size: number;
  maximum_ticket_size: number;
  preferred_stages: string[];
  location_preferences: string[];
  risk_tolerance: string;
  portfolio_Value: number;
  created_at: string;
  updated_at: string;
};

type RecommendedInvestorWithUser = RecommendedInvestor & {
  user: User | null;
};

type Investment = {
  id: string;
  startup_id: {
    id: string;
    startup_name: string;
    logo_url: string;
    industry: number;
    funding_goal: number;
    amount_raised: number;
    location: string;
  };
  amount: number;
  invested_at: string;
  status: string;
};

type DashboardState = {
  myStartups: Startup[] | [];
  earnings: Earning | null;
  userProfile: UserProfile | null;
  loading: boolean;
  error: string | null;
  recommendedStartups: Startup[];
  investorStartups: Startup[];
  investments: Investment[];
  recommendedStartupsForInvestor: Startup[];
  fetchRecommendedStartupsForInvestor: (accessToken: string) => Promise<void>;
  fetchAll: (accessToken: string) => Promise<void>;
  fetchRecommendedStartups: (accessToken: string) => Promise<void>;
  recommendedInvestors: RecommendedInvestorWithUser[];
  fetchRecommendedInvestors: (
    accessToken: string,
    startupId: string
  ) => Promise<void>;
  fetchUserById: (id: string, accessToken: string) => Promise<User | null>;
  user: User | null;
  fetchInvestorStartups: (accessToken: string) => Promise<void>;
  fetchInvestments: (accessToken: string) => Promise<void>;
};

export const useDashboardStore = create<DashboardState>((set, get) => ({
  myStartups: [],
  earnings: null,
  userProfile: null,
  loading: false,
  error: null,
  recommendedStartups: [],
  recommendedInvestors: [],
  recommendedStartupsForInvestor: [],
  fetchRecommendedStartupsForInvestor: async (accessToken: string) => {
    set({ loading: true });
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", `Bearer ${accessToken}`);

      const response = await fetch(
        "https://buildspace.onrender.com/investor/startup",
        {
          method: "GET",
          headers: myHeaders,
          credentials: "omit" as RequestCredentials,
          redirect: "follow" as RequestRedirect,
        }
      );
      if (!response.ok) throw new Error("Failed to fetch recommended startups");
      const data = await response.json();

      set({
        recommendedStartupsForInvestor: data || [],
        loading: false,
      });
    } catch (e) {
      set({ recommendedStartupsForInvestor: [], loading: false });
    }
  },
  fetchRecommendedInvestors: async (accessToken: string, startupId: string) => {
    set({ loading: true });
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", `Bearer ${accessToken}`);

      const response = await fetch(
        `https://buildspace.onrender.com/startups/investors/${startupId}`,
        {
          method: "GET",
          headers: myHeaders,
          credentials: "omit" as RequestCredentials,
          redirect: "follow" as RequestRedirect,
        }
      );
      if (!response.ok)
        throw new Error("Failed to fetch recommended investors");
      const data: RecommendedInvestor[] = await response.json();

      const investorsWithUser: RecommendedInvestorWithUser[] =
        await Promise.all(
          data.map(async (inv) => {
            let user: User | null = null;
            try {
              user = await get().fetchUserById(inv.user_id, accessToken);
            } catch {
              user = null;
            }
            return { ...inv, user };
          })
        );

      set({
        recommendedInvestors: investorsWithUser,
        loading: false,
      });
    } catch (e) {
      set({ recommendedInvestors: [], loading: false });
    }
  },
  investorStartups: [],
  investments: [],
  fetchAll: async (accessToken: string) => {
    console.log("Access token:", accessToken);
    set({ loading: true });
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json"); // Use JSON if your server expects it
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", `Bearer ${accessToken}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        credentials: "omit" as RequestCredentials,
        redirect: "follow" as RequestRedirect,
      };

      const [startupsRes, earningsRes, meRes] = await Promise.all([
        fetch("https://buildspace.onrender.com/my-startups", requestOptions),
        fetch(
          "https://buildspace.onrender.com/startups/earnings",
          requestOptions
        ),
        fetch("https://buildspace.onrender.com/user/me", requestOptions),
      ]);

      let startupsData: Startup[] | [] = [];
      if (startupsRes.ok) {
        startupsData = await startupsRes.json();
      }
      let earningsData: Earning | null = null;
      if (earningsRes.ok) {
        earningsData = await earningsRes.json();
      }
      let meData: UserProfile | null = null;
      if (meRes.ok) {
        meData = await meRes.json();
      }

      console.log("Startups data:", startupsData);

      set({
        myStartups: startupsData || [],
        earnings: earningsData || null,
        userProfile: meData || null,
        loading: false,
      });
    } catch (e) {
      set({
        myStartups: [],
        recommendedStartups: [],
        earnings: null,
        userProfile: null,
        loading: false,
      });
    }
  },
  fetchRecommendedStartups: async (accessToken: string) => {
    set({ loading: true });
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", `Bearer ${accessToken}`);

      // Fetch user's startups first
      const startupsRes = await fetch(
        "https://buildspace.onrender.com/my-startups",
        {
          method: "GET",
          headers: myHeaders,
          credentials: "omit" as RequestCredentials,
          redirect: "follow" as RequestRedirect,
        }
      );
      if (!startupsRes.ok) throw new Error("Failed to fetch startups");
      const startupsData = await startupsRes.json();

      if (Array.isArray(startupsData) && startupsData.length > 0) {
        const randomIndex = Math.floor(Math.random() * startupsData.length);
        const randomId = startupsData[randomIndex].id;

        // Fetch recommended startups
        const recommendRes = await fetch(
          `https://buildspace.onrender.com/startups/${randomId}`,
          {
            method: "GET",
            headers: myHeaders,
            credentials: "omit" as RequestCredentials,
            redirect: "follow" as RequestRedirect,
          }
        );
        if (!recommendRes.ok)
          throw new Error("Failed to fetch recommendations");
        const recommendData = await recommendRes.json();

        // Map and normalize recommended startups
        if (Array.isArray(recommendData)) {
          set({
            recommendedStartups: recommendData.map((item: any) => {
              const progress =
                item.funding_goal > 0
                  ? Math.round((item.amount_raised / item.funding_goal) * 100)
                  : 0;
              return {
                ...item,
                status:
                  item.amount_raised === 0
                    ? "New"
                    : item.amount_raised < item.funding_goal
                    ? "In Progress"
                    : "Completed",
                progress,
              };
            }),
            loading: false,
          });
        } else {
          set({ recommendedStartups: [], loading: false });
        }
      } else {
        set({ recommendedStartups: [], loading: false });
      }
    } catch (e) {
      set({ recommendedStartups: [], loading: false });
    }
  },
  fetchUserById: async (
    id: string,
    accessToken: string
  ): Promise<User | null> => {
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
      return data;
    } catch (e: any) {
      return null;
    }
  },
  user: null,
  fetchInvestorStartups: async (accessToken: string) => {
    set({ loading: true });
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", `Bearer ${accessToken}`);

      const response = await fetch(
        "https://buildspace.onrender.com/investor/startup",
        {
          method: "GET",
          headers: myHeaders,
          credentials: "omit" as RequestCredentials,
          redirect: "follow" as RequestRedirect,
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error(errorMessage);
        throw new Error("Failed to fetch investor startups");
      }
      const data = await response.json();

      if (Array.isArray(data)) {
        set({
          investorStartups: data.map((item: any) => ({
            ...item,
            status:
              item.amount_raised === 0
                ? "New"
                : item.amount_raised < item.funding_goal
                ? "In Progress"
                : "Completed",
            progress:
              item.funding_goal > 0
                ? Math.round((item.amount_raised / item.funding_goal) * 100)
                : 0,
          })),
          loading: false,
        });
      } else {
        set({ investorStartups: [], loading: false });
      }
    } catch (e) {
      console.error("Error fetching investor startups:", e);
      set({ investorStartups: [], loading: false });
    }
  },
  fetchInvestments: async (accessToken: string) => {
    set({ loading: true });
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", `Bearer ${accessToken}`);

      const response = await fetch(
        "https://buildspace.onrender.com/my-investments",
        {
          method: "GET",
          headers: myHeaders,
          credentials: "omit" as RequestCredentials,
          redirect: "follow" as RequestRedirect,
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error(errorMessage);
        throw new Error("Failed to fetch investments");
      }
      const data = await response.json();

      set({
        investments: Array.isArray(data) ? data : [],
        loading: false,
      });
    } catch (e) {
      console.error("Error fetching investments:", e);
      set({
        investments: [],
        loading: false,
        error: "Failed to load investments",
      });
    }
  },
}));

type TodaysPick = {
  id: string;
  user_id: string;
  startup_name: string;
  tag_line: string;
  logo_url: string;
  description: string;
  website: string;
  industry: number;
  funding_stage: string;
  funding_goal: number;
  amount_raised: number;
  business_model: string;
  revenue: number;
  location: string;
  embedding: any;
  created_at: string;
  updated_at: string;
};

type TodaysPicksState = {
  todaysPicks: TodaysPick[];
  loading: boolean;
  fetchTodaysPicks: (accessToken: string) => Promise<void>;
};

export const useTodaysPicksStore = create<TodaysPicksState>((set) => ({
  todaysPicks: [],
  loading: false,
  fetchTodaysPicks: async (accessToken: string) => {
    set({ loading: true });
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", `Bearer ${accessToken}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        credentials: "omit" as RequestCredentials,
        redirect: "follow" as RequestRedirect,
      };
      const response = await fetch(
        "https://buildspace.onrender.com/startups/today-picks",
        requestOptions
      );
      if (!response.ok) {
        const errorMessage = await response.text();
        console.error(errorMessage);
        throw new Error("Failed to fetch today's picks");
      }
      const data = await response.json();
      console.log("Today's picks data:", data);
      set({
        todaysPicks: data || [],
        loading: false,
      });
    } catch (e) {
      set({ todaysPicks: [], loading: false });
    }
  },
}));

interface InvestmentByStage {
  stage: string;
  count: number;
}

interface SpendData {
  month: string;
  Spend: number;
}

interface InvestorSpendData {
  total_investment: number;
  total_crowdfunding: number;
  spend_over_time: SpendData[];
}

interface InvestorDashboardState {
  stats: InvestorStats | null;
  user: UserData | null;
  loading: boolean;
  investmentsByStage: InvestmentByStage[];
  spendData: InvestorSpendData | null;
  fetchInvestorStats: (accessToken: string) => Promise<void>;
  fetchInvestmentsByStage: (accessToken: string) => Promise<void>;
  fetchInvestorChartData: (accessToken: string) => Promise<void>;
}

export const useInvestorDashboardStore = create<InvestorDashboardState>(
  (set) => ({
    stats: null,
    user: null,
    loading: false,
    investmentsByStage: [],
    spendData: null,
    fetchInvestorStats: async (accessToken: string) => {
      set({ loading: true });
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${accessToken}`);

        const [statsRes, userRes] = await Promise.all([
          fetch("https://buildspace.onrender.com/investor/stats", {
            method: "GET",
            headers: myHeaders,
            credentials: "omit" as RequestCredentials,
            redirect: "follow" as RequestRedirect,
          }),
          fetch("https://buildspace.onrender.com/user/me", {
            method: "GET",
            headers: myHeaders,
            credentials: "omit" as RequestCredentials,
            redirect: "follow" as RequestRedirect,
          }),
        ]);

        if (!statsRes.ok || !userRes.ok) {
          throw new Error("Failed to fetch investor data");
        }

        const [statsData, userData] = await Promise.all([
          statsRes.json(),
          userRes.json(),
        ]);

        set({
          stats: {
            total_startups_backed: statsData.total_startups_backed,
            total_invested: statsData.total_invested,
            user: userData,
          },
          user: userData,
          loading: false,
        });
      } catch (e) {
        set({ stats: null, user: null, loading: false });
      }
    },
    fetchInvestmentsByStage: async (accessToken: string) => {
      set({ loading: true });
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${accessToken}`);

        const response = await fetch(
          "https://buildspace.onrender.com/my-investments-by-stage",
          {
            method: "GET",
            headers: myHeaders,
            credentials: "omit",
            redirect: "follow",
          }
        );

        if (!response.ok) {
          const errorMessage = await response.text();
          console.error(errorMessage);
          throw new Error("Failed to fetch investments by stage");
        }

        const data = await response.json();

        // Format the data to match the expected format
        const formattedData = Array.isArray(data)
          ? data.map((item) => ({
              stage: item.funding_stage
                .split("-")
                .map(
                  (word: string) => word.charAt(0).toUpperCase() + word.slice(1)
                )
                .join(" "),
              count: item.count,
            }))
          : [];

        set({
          investmentsByStage: formattedData,
          loading: false,
        });
      } catch (e) {
        console.error("Error fetching investments by stage:", e);
        set({
          investmentsByStage: [],
          loading: false,
        });
      }
    },
    fetchInvestorChartData: async (accessToken: string) => {
      set({ loading: true });
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${accessToken}`);

        const response = await fetch(
          "https://buildspace.onrender.com/investor/total-spend",
          {
            method: "GET",
            headers: myHeaders,
            credentials: "omit",
            redirect: "follow",
          }
        );

        if (!response.ok) {
          const errorMessage = await response.text();
          console.error(errorMessage);
          throw new Error("Failed to fetch investor chart data");
        }

        const data = await response.json();

        // Format month values to show full month names
        const formattedSpendOverTime = Array.isArray(data.spend_over_time)
          ? data.spend_over_time.map(
              (item: { month: string; Spend: number }) => ({
                ...item,
                month: new Date(item.month + "-01").toLocaleString("default", {
                  month: "short",
                  year: "numeric",
                }),
              })
            )
          : [];

        set({
          spendData: {
            total_investment: data.total_investment || 0,
            total_crowdfunding: data.total_crowdfunding || 0,
            spend_over_time: formattedSpendOverTime,
          },
          loading: false,
        });
      } catch (e) {
        console.error("Error fetching investor chart data:", e);
        set({
          spendData: null,
          loading: false,
        });
      }
    },
  })
);
