export interface Project {
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

export const projectData = {
  id: "1",
  name: "EcoFarm",
  tagline: "Sustainable farming for a better tomorrow",
  description: "EcoFarm is revolutionizing agriculture with sustainable farming practices that increase yield while reducing environmental impact. Our innovative vertical farming technology uses 95% less water than traditional farming methods.",
  logo: "/placeholder.svg",
  industry: ["Agriculture", "Sustainability", "Technology"],
  location: "San Francisco, CA",
  website: "https://ecofarm.example.com",
  currentStage: "Seed Stage",
  businessModel: "B2B & B2C",
  fundingGoal: 500000,
  amountRaised: 250000,
  backersCount: 124,
  savedCount: 87,
  founder: {
    name: "Alex Johnson",
    avatar: "/placeholder.svg",
    bio: "Alex is a serial entrepreneur with a passion for sustainable agriculture. With over 10 years of experience in the tech industry, Alex is now focused on solving food security challenges through technology.",
    rating: 4.8
  }
};

export const recommendedInvestors = [
  {
    id: "inv1",
    name: "Sarah Williams",
    photo: "/placeholder.svg",
    role: "Investor",
    bio: "Early-stage investor focused on sustainable technologies and impact startups.",
    address: "New York, NY",
    rating: 4.5,
    totalInvestment: "$2.5M"
  },
  {
    id: "inv2",
    name: "Michael Chen",
    photo: "/placeholder.svg",
    role: "Investor",
    bio: "Angel investor with a background in agricultural technology and supply chain management.",
    address: "Austin, TX",
    rating: 4.7,
    totalInvestment: "$1.8M"
  },
  {
    id: "inv3",
    name: "Green Future Fund",
    photo: "/placeholder.svg",
    role: "Venture Capital",
    bio: "Venture capital firm investing in sustainable and environmentally friendly startups.",
    address: "San Francisco, CA",
    rating: 4.9,
    totalInvestment: "$15M"
  }
];

export const ALL_PROJECTS = [
  {
    id: "2",
    name: "AquaGrow",
    image: "/placeholder.jpg",
    category: "Hydroponics",
    industries: ["Agriculture", "Technology"],
    funding: "$150K raised",
    status: "In Progress",
    progress: 45,
    avatar: "/placeholder.svg",
    founderName: "Jamie Smith",
    rating: 4.5
  },
  {
    id: "3",
    name: "SolarHarvest",
    image: "/placeholder.jpg",
    category: "Renewable Energy",
    industries: ["Energy", "Sustainability"],
    funding: "$320K raised",
    status: "In Progress",
    progress: 64,
    avatar: "/placeholder.svg",
    founderName: "Priya Patel",
    rating: 4.8
  },
  {
    id: "4",
    name: "AgriDrone",
    image: "/placeholder.jpg",
    category: "Precision Agriculture",
    industries: ["Drones", "Agriculture"],
    funding: "$420K raised",
    status: "Completed",
    progress: 100,
    avatar: "/placeholder.svg",
    founderName: "Carlos Mendez",
    rating: 4.7
  }
];
