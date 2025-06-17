export interface Founder {
  name: string;
  avatar?: string;
  rating: number;
  role: string;
  bio: string;
  experience: string[];
}

export interface Project {
  id: string;
  title: string;
  name: string;
  tagline: string;
  description: string;
  amountRaised: number;
  fundingGoal: number;
  backersCount: number;
  daysLeft: number;
  category: string;
  imageUrl: string;
  logo: string;
  industry: string[];
  location: string;
  website: string;
  savedCount: number;
  currentStage: string;
  businessModel: string;
  founder: Founder;
}

export interface ProjectCard {
  id: string;
  name: string;
  category: string;
  image: string;
  industries: string[];
  funding: string;
  progress: number;
  daysLeft: number;
  status: string;
  avatar?: string;
  founderName: string;
  rating: number;
  logo: string;
}

export interface RecommendedInvestor {
  id: string;
  name: string;
  avatar?: string;
  title: string;
  company: string;
  location: string;
  industries: string[];
  investmentFocus: string[];
  checkSize: string;
  investments: number;
  connected: boolean;
  lastActive: string;
}

export const projectData: Project = {
  id: '1',
  title: 'Sample Project',
  name: 'Sample Project',
  tagline: 'Revolutionizing the future of technology',
  description: 'This is a sample project description that explains what the project is about and its goals.',
  amountRaised: 50000,
  fundingGoal: 100000,
  backersCount: 42,
  daysLeft: 15,
  category: 'Technology',
  imageUrl: '/placeholder.svg',
  logo: '/logo-placeholder.svg',
  industry: ['Tech', 'AI', 'SaaS'],
  location: 'San Francisco, CA',
  website: 'https://example.com',
  savedCount: 128,
  currentStage: 'Seed',
  businessModel: 'B2B SaaS',
  founder: {
    name: 'John Doe',
    avatar: '/placeholder.svg',
    rating: 4,
    role: 'CEO & Founder',
    bio: 'Serial entrepreneur with 10+ years of experience in the tech industry',
    experience: [
      'Former CTO at TechCorp',
      '10+ years in software development',
      'Expert in AI and machine learning'
    ]
  }
};

export const recommendedInvestors: RecommendedInvestor[] = [
  {
    id: 'inv1',
    name: 'Alex Johnson',
    avatar: '/avatar-inv1.jpg',
    title: 'Partner',
    company: 'Venture Capital Partners',
    location: 'San Francisco, CA',
    industries: ['Tech', 'AI', 'SaaS'],
    investmentFocus: ['Seed', 'Series A'],
    checkSize: '$50K - $500K',
    investments: 24,
    connected: true,
    lastActive: '2 days ago'
  },
  {
    id: 'inv2',
    name: 'Sarah Williams',
    avatar: '/avatar-inv2.jpg',
    title: 'Managing Director',
    company: 'Angel Investors Network',
    location: 'New York, NY',
    industries: ['FinTech', 'Blockchain'],
    investmentFocus: ['Pre-seed', 'Seed'],
    checkSize: '$10K - $100K',
    investments: 42,
    connected: false,
    lastActive: '1 week ago'
  }
];
