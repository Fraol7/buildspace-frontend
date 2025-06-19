import { create } from "zustand";

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  rating: number;
  role: string;
  profile_picture_url?: string;
}

interface UserStoreState {
  users: User[];
  loading: boolean;
  error: string | null;
  fetchAllUsers: (accessToken: string) => Promise<void>;
  submitUserRating: (rateeId: string, rating: number, accessToken: string) => Promise<User | null>;
}

export const useUserStore = create<UserStoreState>((set) => ({
    users: [],
    loading: false,
    error: null,

    fetchAllUsers: async (accessToken: string) => {
        set({ loading: true });
        try {
          const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("Accept", "application/json");
          myHeaders.append("Authorization", `Bearer ${accessToken}`);
    
          const response = await fetch(
            "https://buildspace.onrender.com/all-users/all",
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
            users: Array.isArray(data) ? data : [],
            loading: false 
          });
        } catch (e) {
          console.error("Error fetching users:", e);
          set({ 
            users: [], 
            loading: false,
            error: "Failed to load users"
          });
        }
    },
    submitUserRating: async (rateeId: string, rating: number, accessToken: string): Promise<User | null> => {
        set({ loading: true, error: null });
        try {
          const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("Accept", "application/json");
          myHeaders.append("Authorization", `Bearer ${accessToken}`);
      
          const body = JSON.stringify({
            ratee_id: rateeId,
            rating,
          });
      
          const response = await fetch("https://buildspace.onrender.com/rate-user", {
            method: "POST",
            headers: myHeaders,
            body,
            credentials: "omit" as RequestCredentials,
            redirect: "follow" as RequestRedirect,
          });
      
          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Failed to submit rating");
          }
      
          const data: User = await response.json();
          
          // Update the users array with the new rating
          set((state) => ({
            users: state.users.map(user => 
              user.id === rateeId ? { ...user, rating: data.rating || rating } : user
            ),
            loading: false
          }));
          
          return data;
        } catch (error: any) {
          console.error("Error submitting rating:", error);
          set({ 
            error: error.message || "Unknown error occurred while submitting rating", 
            loading: false 
          });
          return null;
        }
    },      
}));
