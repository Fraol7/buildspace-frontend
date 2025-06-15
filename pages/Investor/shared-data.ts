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

export const ALL_PROJECTS: ProjectCard[] = [
  {
    id: '1',
    name: 'Project 1',
    category: 'Technology',
    image: '/placeholder.jpg',
    industries: ['AI', 'Machine Learning'],
    funding: '$50,000 raised',
    progress: 50,
    daysLeft: 15,
    status: 'Active',
    avatar: '/avatar1.jpg',
    founderName: 'Jane Smith',
    rating: 4.5,
    logo: '/logo1.png'
  },
  {
    id: '2',
    name: 'Project 2',
    category: 'Healthcare',
    image: '/placeholder.jpg',
    industries: ['Biotech', 'Health'],
    funding: '$75,000 raised',
    progress: 75,
    daysLeft: 30,
    status: 'Active',
    avatar: '/avatar2.jpg',
    founderName: 'John Doe',
    rating: 4.2,
    logo: '/logo2.png'
  },
];
