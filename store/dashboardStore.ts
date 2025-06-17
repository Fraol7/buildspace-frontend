import { Startup } from "@/components/Entrepreneur/project-grid";
import { create } from "zustand";

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

type DashboardState = {
  myStartups: Startup[] | [];
  earnings: Earning | null;
  userProfile: UserProfile | null;
  loading: boolean;
  recommendedStartups: Startup[];
  fetchAll: (accessToken: string) => Promise<void>;
  fetchRecommendedStartups: (accessToken: string) => Promise<void>;
};

export const useDashboardStore = create<DashboardState>((set) => ({
  myStartups: [],
  earnings: null,
  userProfile: null,
  loading: false,
  recommendedStartups: [],
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

interface InvestorDashboardState {
  stats: InvestorStats | null;
  user: UserData | null;
  loading: boolean;
  fetchInvestorStats: (accessToken: string) => Promise<void>;
};

export const useInvestorDashboardStore = create<InvestorDashboardState>((set) => ({
  stats: null,
  user: null,
  loading: false,
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
        })
      ]);

      if (!statsRes.ok || !userRes.ok) {
        throw new Error("Failed to fetch investor data");
      }

      const [statsData, userData] = await Promise.all([
        statsRes.json(),
        userRes.json()
      ]);

      set({
        stats: {
          total_startups_backed: statsData.total_startups_backed,
          total_invested: statsData.total_invested,
          user: userData
        },
        user: userData,
        loading: false,
      });
    } catch (e) {
      set({ stats: null, user: null, loading: false });
    }
  },
}));
