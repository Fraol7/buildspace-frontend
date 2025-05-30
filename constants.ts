import {
  SquareTerminal,
  TrendingUp,
  Network,
  MessageSquare,
  Rocket,
  Target, LayoutDashboard, CircleDollarSign, Users, ChartCandlestick, Telescope, MessagesSquare
} from "lucide-react"

export const DEFAULT_SKILLS = [
  "LinkedIn Portfolio",
  "Web Development",
  "Design",
  "Marketing",
  "Data Analysis",
  "JavaScript",
  "React",
  "Node.js",
  "Python",
  "UI/UX Design",
  "Project Management",
  "Digital Marketing",
  "SEO",
  "Content Writing",
  "Graphic Design",
  "TypeScript",
  "Vue.js",
  "Angular",
  "PHP",
  "Java",
  "C++",
  "Mobile Development",
  "DevOps",
  "Cloud Computing",
  "Machine Learning",
  "Artificial Intelligence",
  "Cybersecurity",
  "Database Management",
  "Product Management",
  "Sales",
  "Customer Service",
  "Business Analysis",
  "Consulting",
  "Photography",
  "Video Editing",
  "Social Media Management",
  "Email Marketing",
  "Brand Management",
  "Public Relations",
]

export const DEFAULT_LOCATIONS = [
  "Australia - Brisbane, QLD",
  "Australia - Gold Coast, QLD",
  "Australia - Melbourne, VIC",
  "Australia - Newcastle, NSW",
  "Australia - Sydney, NSW",
  "Belgium - Antwerp",
  "Belgium - Brussels",
  "Canada - Halifax, NS",
  "Canada - Kitchener, ON",
  "Canada - London, ON",
  "Canada - Montreal, QC",
  "Canada - Toronto, ON",
  "Canada - Vancouver, BC",
  "Canada - Victoria, BC",
  "Denmark - Aarhus",
  "Denmark - Copenhagen",
  "Denmark - Odense",
  "Ethiopia - Adama",
  "Ethiopia - Addis Ababa",
  "Ethiopia - Bahir Dar",
  "Ethiopia - Dessie",
  "Ethiopia - Dire Dawa",
  "Ethiopia - Gondar",
  "Ethiopia - Hawassa",
  "Ethiopia - Jimma",
  "Ethiopia - Mekelle",
  "Finland - Espoo",
  "Finland - Helsinki",
  "Finland - Tampere",
  "France - Aix-en-Provence",
  "France - Bordeaux",
  "France - Lille",
  "France - Lyon",
  "France - Marseille",
  "France - Montpellier",
  "France - Nantes",
  "France - Nice",
  "France - Paris",
  "France - Reims",
  "France - Rennes",
  "France - Saint-Étienne",
  "France - Strasbourg",
  "Germany - Berlin",
  "Germany - Bremen",
  "Germany - Cologne",
  "Germany - Dortmund",
  "Germany - Dresden",
  "Germany - Frankfurt am Main",
  "Germany - Hamburg",
  "Germany - Hanover",
  "Germany - Leipzig",
  "Germany - Munich",
  "Germany - Nuremberg",
  "Germany - Stuttgart",
  "Ireland - Cork",
  "Ireland - Dublin",
  "Italy - Bari",
  "Italy - Bologna",
  "Italy - Florence",
  "Italy - Genoa",
  "Italy - Milan",
  "Italy - Naples",
  "Italy - Rome",
  "Italy - Turin",
  "Japan - Hiroshima",
  "Japan - Kyoto",
  "Japan - Tokyo",
  "Japan - Yokohama",
  "Netherlands - Amsterdam",
  "Netherlands - Eindhoven",
  "Netherlands - Rotterdam",
  "Netherlands - The Hague",
  "Netherlands - Utrecht",
  "Norway - Bergen",
  "Norway - Oslo",
  "Portugal - Lisbon",
  "Portugal - Porto",
  "Singapore - Singapore",
  "Spain - Barcelona",
  "Spain - Bilbao",
  "Spain - Madrid",
  "Sweden - Gothenburg",
  "Sweden - Malmö",
  "Sweden - Stockholm",
  "Sweden - Uppsala",
  "Switzerland - Basel",
  "Switzerland - Geneva",
  "Switzerland - Zurich",
  "United Kingdom - Birmingham",
  "United Kingdom - Glasgow",
  "United Kingdom - Leeds",
  "United Kingdom - Liverpool",
  "United Kingdom - London",
  "United Kingdom - Manchester",
  "United States - Chicago, IL",
  "United States - Colorado Springs, CO",
  "United States - Houston, TX",
  "United States - Las Vegas, NV",
  "United States - Los Angeles, CA",
  "United States - Louisville, KY",
  "United States - Memphis, TN",
  "United States - Miami, FL",
  "United States - New York, NY",
  "United States - Omaha, NE",
  "United States - Philadelphia, PA",
  "United States - Phoenix, AZ",
  "United States - Portland, OR",
  "United States - Raleigh, NC",
  "United States - San Jose, CA",
  "Remote"
];


export interface FormData {
  // Step 1: Brand Basics
  logo: string | null
  startupName: string
  tagline: string
  location: string
  website: string

  // Step 2: What You're Building
  productStage: string
  fundingRoundType: string
  startupDescription: string
  totalRaised: string
  additionalInfo: string
}

export const INITIAL_PROFILE_DATA = {
  fullName: "Feven Teaf",
  bio: "",
  skills: ["LinkedIn Portfolio"],
  address: "",
  avatar: null,
}

export const INITIAL_EMAIL_ADDRESSES = [
  {
    id: "1",
    email: "feventeaf322@gmail.com",
    addedDate: "1 month ago",
  },
]

export const INITIAL_FORM_DATA: FormData = {
  logo: null,
  startupName: "",
  tagline: "",
  location: "",
  website: "",
  productStage: "",
  fundingRoundType: "",
  startupDescription: "",
  totalRaised: "",
  additionalInfo: "",
}

export const PRODUCT_STAGES = [
  "💡 Idea",
  "🚀 MVP",
  "🧪 Beta",
  "📢 Launch",
  "📈 Growth",
  "🌍 Scale"
];

export const FUNDING_ROUNDS = [
  "🌱 Pre-seed",
  "🌿 Seed",
  "💰 Series A",
  "💵 Series B",
  "🏦 Series C+",
  "🚫 Not fundraising"
];

export const FEATURES = [
  {
    title: "🔍 AI-Powered Investment Insights",
    description: "Utilize advanced sentiment analysis to make data-driven decisions for your startup.",
    linkText: "Learn More"
  },
  {
    title: "🤝 Matchmaking That Matters",
    description: "Launch and manage campaigns seamlessly, connecting with investors worldwide.",
    linkText: "Learn More"
  },
  {
    title: "🚀 Accelerate Startup Growth",
    description: "Find the perfect investors or startups effortlessly with our AI-driven matchmaking tools.",
    linkText: "Learn More"
  },
  {
    title: "🌐 A Hub for Collaboration",
    description: "Collaborate in real-time with like-minded entrepreneurs and investors.",
    linkText: "Learn More"
  }
];

export const EntrepreneurNavMain = [
  {
    title: "Dashboard",
    url: "/entrepreneur/dashboard",
    icon: SquareTerminal,
    id: "dashboard",
  },
  {
    title: "Startups",
    url: "/entrepreneur/my-startups",
    icon: Rocket,
    id: "startups",
    items: [
      {
        title: "My Startups",
        url: "/entrepreneur/my-startups",
        id: "my-startups",
      },
      {
        title: "Saved Startups",
        url: "/entrepreneur/saved-startups",
        id: "saved-startups",
      },
    ],
  },
  {
    title: "Crowdfunding",
    url: "/entrepreneur/my-campaigns",
    icon: Target,
    id: "crowdfunding",
    items: [
      {
        title: "My Campaigns",
        url: "/entrepreneur/my-campaigns",
        id: "my-campaigns",
      },
      {
        title: "Explore Campaigns",
        url: "/entrepreneur/explore-campaigns",
        id: "explore-campaigns",
      },
    ],
  },
  {
    title: "Market Insights",
    url: "/entrepreneur/market-insights",
    icon: TrendingUp,
    id: "market-insights",
  },
  {
    title: "Network",
    url: "/entrepreneur/network",
    icon: Network,
    id: "network",
  },
  {
    title: "Collab Space",
    url: "/entrepreneur/collab-space",
    icon: MessageSquare,
    id: "collab-space",
  },
]

export const InvestorNavMain = [
  {
    title: "Dashboard",
    url: "/investor/dashboard",
    icon: LayoutDashboard,
    id: "dashboard",
  },
  {
    title: "My Investments",
    url: "/investor/invested",
    icon: CircleDollarSign,
    id: "my-investments",
    items: [
      {
        title: "Invested Startups",
        url: "/investor/invested-startups",
        id: "invested-startups",
      },
      {
        title: "Funded Campaigns",
        url: "/investor/funded-campaigns",
        id: "funded-campaigns",
      },
    ],
  },
  {
    title: "Explore",
    url: "/investor/startups",
    icon: Telescope,
    id: "explore",
    items: [
      {
        title: "All Startups",
        url: "/investor/startups",
        id: "all-startups",
      },
      {
        title: "Saved Startups",
        url: "/investor/saved-startups",
        id: "saved-startups",
      },
      {
        title: "Campaigns",
        url: "/investor/campaigns",
        id: "campaigns",
      },
    ],
  },
  {
    title: "Market Insights",
    url: "/investor/market-insights",
    icon: ChartCandlestick,
    id: "market-insights",
  },
  {
    title: "Network",
    url: "/investor/network",
    icon: Users,
    id: "network",
  },
  {
    title: "Collab Space",
    url: "/investor/collab-space",
    icon: MessagesSquare,
    id: "collab-space",
  },
];

// Mock data for trending projects
export const TRENDING_PROJECTS = [
  {
    id: 1,
    name: "EcoTech Solutions",
    category: "Green Technology",
    funding: "$2.4M",
    target: "$3M",
    progress: 80,
    investors: 1247,
    timeLeft: "12 days",
    image: "/images/eco.jpg",
    growth: "+24%",
    link: "#",
  },
  {
    id: 2,
    name: "AI Healthcare Platform",
    category: "Healthcare",
    funding: "$1.8M",
    target: "$2.5M",
    progress: 72,
    investors: 892,
    timeLeft: "8 days",
    image: "/images/ai-health.jpg",
    growth: "+18%",
    link: "#",
  },
  {
    id: 3,
    name: "Blockchain Finance",
    category: "Fintech",
    funding: "$3.2M",
    target: "$4M",
    progress: 85,
    investors: 1567,
    timeLeft: "15 days",
    image: "/images/blockchain.jpg",
    growth: "+32%",
    link: "#",
  },
  {
    id: 4,
    name: "Smart City IoT",
    category: "Technology",
    funding: "$1.5M",
    target: "$2M",
    progress: 75,
    investors: 743,
    timeLeft: "20 days",
    image: "/images/smart-iot.png",
    growth: "+15%",
    link: "#",
  },
  {
    id: 5,
    name: "Renewable Energy",
    category: "Energy",
    funding: "$4.1M",
    target: "$5M",
    progress: 82,
    investors: 2134,
    timeLeft: "5 days",
    image: "/images/renew.jpg",
    growth: "+28%",
    link: "#",
  },
]

// Mock data for projects grid
export const PROJECTS_GRID = [
  {
    id: 1,
    name: "Airbnb",
    category: "Travel & Hospitality",
    funding: "$125,000",
    progress: 85,
    status: "Active",
    image: "/placeholder.jpg?height=40&width=40",
  },
  {
    id: 2,
    name: "Software Inc",
    category: "Technology",
    funding: "$89,500",
    progress: 72,
    status: "Active",
    image: "/placeholder.jpg?height=40&width=40",
  },
  {
    id: 3,
    name: "TechStart",
    category: "Software",
    funding: "$156,000",
    progress: 91,
    status: "Completed",
    image: "/placeholder.jpg?height=40&width=40",
  },
  {
    id: 4,
    name: "Spotify",
    category: "Music & Audio",
    funding: "$234,000",
    progress: 68,
    status: "Active",
    image: "/placeholder.jpg?height=40&width=40",
  },
  {
    id: 5,
    name: "Behance",
    category: "Creative",
    funding: "$98,750",
    progress: 79,
    status: "Active",
    image: "/placeholder.jpg?height=40&width=40",
  },
  {
    id: 6,
    name: "InnovateLab",
    category: "Research",
    funding: "$187,500",
    progress: 84,
    status: "Active",
    image: "/placeholder.jpg?height=40&width=40",
  },
]

// Mock data for investments
export const INVESTMENTS = [
  {
    id: 1,
    name: "Coinbase",
    type: "Cryptocurrency Exchange",
    amount: "$15,000",
    returns: "+$3,250",
    percentage: "+21.67%",
    image: "/placeholder.jpg?height=50&width=50",
    status: "Profitable",
  },
  {
    id: 2,
    name: "Tesla Motors",
    type: "Electric Vehicles",
    amount: "$12,500",
    returns: "+$2,890",
    percentage: "+23.12%",
    image: "/placeholder.jpg?height=50&width=50",
    status: "Profitable",
  },
  {
    id: 3,
    name: "Meta Platforms",
    type: "Social Media",
    amount: "$8,750",
    returns: "+$1,456",
    percentage: "+16.64%",
    image: "/placeholder.jpg?height=50&width=50",
    status: "Profitable",
  },
  {
    id: 4,
    name: "Amazon",
    type: "E-commerce",
    amount: "$20,000",
    returns: "+$4,200",
    percentage: "+21.00%",
    image: "/placeholder.jpg?height=50&width=50",
    status: "Profitable",
  },
]

// Mock data for Rising Projects chart
export const RISING_PROJECTS_DATA = [
  {
    month: "Jan",
    MVP: 4000,
    Seed: 2400,
    Final: 1800,
  },
  {
    month: "Feb",
    MVP: 3000,
    Seed: 2210,
    Final: 2200,
  },
  {
    month: "Mar",
    MVP: 2000,
    Seed: 2290,
    Final: 2500,
  },
  {
    month: "Apr",
    MVP: 2780,
    Seed: 3908,
    Final: 2300,
  },
  {
    month: "May",
    MVP: 1890,
    Seed: 4800,
    Final: 2400,
  },
  {
    month: "Jun",
    MVP: 2390,
    Seed: 3800,
    Final: 2800,
  },
  {
    month: "Jul",
    MVP: 3490,
    Seed: 4300,
    Final: 2900,
  },
]

// Mock data for Your Spending chart
export const SPENDING_DATA = [
  {
    month: "Jan",
    amount: 1200,
  },
  {
    month: "Feb",
    amount: 2100,
  },
  {
    month: "Mar",
    amount: 800,
  },
  {
    month: "Apr",
    amount: 1600,
  },
  {
    month: "May",
    amount: 900,
  },
  {
    month: "Jun",
    amount: 1700,
  },
  {
    month: "Jul",
    amount: 1300,
  },
  {
    month: "Aug",
    amount: 1800,
  },
]

export const CROWDFUNDING_TOTAL = "$12,345.78"; // Dummy data for Crowdfunding
export const INVEST_TOTAL = "$2,050.50"; // Dummy data for Invest
export const MVP_TOTAL = "2";
export const SEED_TOTAL = "1";
export const FINAL_TOTAL = "3";