declare module './shared-data' {
  export interface ProjectData {
    id: string;
    name: string;
    tagline: string;
    description: string;
    logo?: string;
    industry: string[];
    location: string;
    website: string;
    currentStage: string;
    businessModel: string;
    fundingGoal: number;
    amountRaised: number;
    backersCount: number;
    savedCount: number;
    founder: {
      name: string;
      avatar?: string;
      bio: string;
      rating: number;
    };
  }

  export interface Investor {
    id: string;
    name: string;
    photo?: string;
    role: string;
    bio: string;
    address: string;
    rating: number;
    totalInvestment?: string;
  }

  export const projectData: ProjectData;
  export const recommendedInvestors: Investor[];
  export const ALL_PROJECTS: Array<{
    id: string;
    name: string;
    image?: string;
    category: string;
    industries?: string[];
    funding: string;
    status: string;
    progress: number;
    avatar?: string;
    founderName?: string;
    rating?: number;
  }>;
}
