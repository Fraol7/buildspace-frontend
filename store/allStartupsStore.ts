import { create } from 'zustand';

export interface Startup {
  id: string;
  startup_name: string;
  logo_url: string;
  industry: number;
  funding_stage: string;
  funding_goal: number;
  amount_raised: number;
  status: string;
  progress: number;
  location: string;
  category?: string;
  description?: string;
}

interface AllStartupsState {
  allStartups: Startup[];  // Original list from API
  filteredStartups: Startup[];  // Filtered list based on search
  loading: boolean;
  error: string | null;
  currentSearchQuery: string;  // Renamed to avoid conflicts
  fetchAllStartups: (accessToken: string) => Promise<void>;
  searchStartups: (query: string) => void;
}

export const useAllStartupsStore = create<AllStartupsState>((set, get) => ({
  allStartups: [],
  filteredStartups: [],
  loading: false,
  error: null,
  currentSearchQuery: '',

  fetchAllStartups: async (accessToken: string) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('https://buildspace.onrender.com/all-startups', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch startups: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!Array.isArray(data)) {
        throw new Error('Invalid data format received from API');
      }

      // Transform the data if needed
      const startups = data.map((startup: any) => ({
        ...startup,
        progress: Math.min(Math.round((startup.amount_raised / startup.funding_goal) * 100), 100)
      }));

      // Re-apply search filter if there's an active search query
      const state = get();
      if (state.currentSearchQuery) {
        const lowerQuery = state.currentSearchQuery.toLowerCase();
        const filtered = startups.filter(
          (startup: any) =>
            (startup.startup_name?.toLowerCase().includes(lowerQuery) || false) ||
            (startup.location?.toLowerCase().includes(lowerQuery) || false) ||
            (startup.funding_stage?.toLowerCase().includes(lowerQuery) || false) ||
            (startup.description?.toLowerCase().includes(lowerQuery) || false)
        );
        set({ 
          allStartups: startups,
          filteredStartups: filtered,
          loading: false 
        });
      } else {
        set({ 
          allStartups: startups, 
          filteredStartups: startups, 
          loading: false 
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch startups';
      console.error('Error in fetchAllStartups:', error);
      set({ error: errorMessage, loading: false });
    }
  },

  searchStartups: (query: string) => {
    const state = get();
    
    if (!query.trim()) {
      set({ 
        filteredStartups: [...state.allStartups],
        currentSearchQuery: ''
      });
      return;
    }
    
    const lowerQuery = query.toLowerCase();
    const filtered = state.allStartups.filter(
      (startup) =>
        (startup.startup_name?.toLowerCase().includes(lowerQuery) || false) ||
        (startup.location?.toLowerCase().includes(lowerQuery) || false) ||
        (startup.funding_stage?.toLowerCase().includes(lowerQuery) || false) ||
        (startup.description?.toLowerCase().includes(lowerQuery) || false)
    );
    
    set({ 
      filteredStartups: filtered,
      currentSearchQuery: query
    });
  },
}));
