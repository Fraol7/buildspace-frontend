import { create } from "zustand";

interface SentimentProbabilities {
  negative: number;
  neutral: number;
  positive: number;
}

interface SentimentData {
  overall: "positive" | "neutral" | "negative";
  score: number;
  probabilities: SentimentProbabilities;
}

interface SentimentStoreState {
  loading: boolean;
  error: string | null;
  report: string | null;
  sentiment: SentimentData | null;
  sources: [string, string][];
  fetchSentiment: (industryName: string) => Promise<void>;
  reset: () => void;
}

export const useSentimentStore = create<SentimentStoreState>((set) => ({
  loading: false,
  error: null,
  report: null,
  sentiment: null,
  sources: [],
  fetchSentiment: async (industryName: string) => {
    set({
      loading: true,
      error: null,
      report: null,
      sentiment: null,
      sources: [],
    });
    try {
      const res = await fetch(
        "https://sentiment-api-x718.onrender.com/market/sentiment",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: industryName }),
        }
      );
      if (!res.ok) {
        const err = await res.text();
        console.error("Error fetching sentiment:", err);
        throw new Error("Failed to fetch sentiment analysis");
      }
      const data = await res.json();
      set({
        report: data.report,
        sentiment: data.sentiment,
        sources: data.sources,
        loading: false,
      });
    } catch (error: any) {
      set({
        error: error.message || "Unknown error",
        loading: false,
        report: null,
        sentiment: null,
        sources: [],
      });
    }
  },
  reset: () =>
    set({
      loading: false,
      error: null,
      report: null,
      sentiment: null,
      sources: [],
    }),
}));
