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

export const TRENDING_PROJECTS = [
  {
    image: "/images/eco.jpg",
    title: "AI-Powered Investment Insights",
    tagline: "Revolutionizing investment strategies through AI.",
    currentStage: "Growth",
    industries: ["Agriculture", "Tech", "Industry"],
    funding: "$2.4M",
    target: "$3M",
    progress: 80,
    link: "#",
  },
  {
    image: "/images/ai-health.jpg",
    title: "AI-Driven Healthcare Solutions",
    tagline: "Transforming patient care with predictive analytics.",
    currentStage: "Seed",
    industries: ["Healthcare", "Biotech"],
    funding: "$1.1M",
    target: "$5M",
    progress: 22,
    link: "#",
  },
  {
    image: "/images/renew.jpg",
    title: "Retail AI Optimization",
    tagline: "Enhancing customer experiences through AI.",
    currentStage: "Series A",
    industries: ["Retail", "E-commerce"],
    funding: "$3M",
    target: "$10M",
    progress: 30,
    link: "#",
  },
  {
    image: "/images/eco.jpg",
    title: "Smart Energy Management",
    tagline: "Optimizing energy consumption with AI technologies.",
    currentStage: "Prototype",
    industries: ["Energy", "Tech"],
    funding: "$500K",
    target: "$1M",
    progress: 50,
    link: "#",
  },
  {
    image: "/images/ai-health.jpg",
    title: "AI in Education",
    tagline: "Personalizing learning experiences for students worldwide.",
    currentStage: "Scale",
    industries: ["Education", "EdTech"],
    funding: "$4M",
    target: "$6M",
    progress: 67,
    link: "#",
  },
  {
    image: "/images/eco.jpg",
    title: "Financial Fraud Detection",
    tagline: "Securing financial systems through advanced AI detection.",
    currentStage: "Beta Testing",
    industries: ["Finance", "Cybersecurity"],
    funding: "$3.5M",
    target: "$5M",
    progress: 70,
    link: "#",
  },
  {
    image: "/images/renew.jpg",
    title: "Autonomous Logistics Optimization",
    tagline: "Streamlining supply chains with AI automation.",
    currentStage: "Pilot",
    industries: ["Transportation", "Logistics"],
    funding: "$1.8M",
    target: "$4M",
    progress: 45,
    link: "#",
  },
];

// Mock data for trending projects
// export const TRENDING_PROJECTS = [
//   {
//     id: 1,
//     name: "EcoTech Solutions",
//     category: "Green Technology",
//     funding: "$2.4M",
//     target: "$3M",
//     progress: 80,
//     investors: 1247,
//     timeLeft: "12 days",
//     image: "/images/eco.jpg",
//     growth: "+24%",
//     link: "#",
//   },
//   {
//     id: 2,
//     name: "AI Healthcare Platform",
//     category: "Healthcare",
//     funding: "$1.8M",
//     target: "$2.5M",
//     progress: 72,
//     investors: 892,
//     timeLeft: "8 days",
//     image: "/images/ai-health.jpg",
//     growth: "+18%",
//     link: "#",
//   },
//   {
//     id: 3,
//     name: "Blockchain Finance",
//     category: "Fintech",
//     funding: "$3.2M",
//     target: "$4M",
//     progress: 85,
//     investors: 1567,
//     timeLeft: "15 days",
//     image: "/images/blockchain.jpg",
//     growth: "+32%",
//     link: "#",
//   },
//   {
//     id: 4,
//     name: "Smart City IoT",
//     category: "Technology",
//     funding: "$1.5M",
//     target: "$2M",
//     progress: 75,
//     investors: 743,
//     timeLeft: "20 days",
//     image: "/images/smart-iot.png",
//     growth: "+15%",
//     link: "#",
//   },
//   {
//     id: 5,
//     name: "Renewable Energy",
//     category: "Energy",
//     funding: "$4.1M",
//     target: "$5M",
//     progress: 82,
//     investors: 2134,
//     timeLeft: "5 days",
//     image: "/images/renew.jpg",
//     growth: "+28%",
//     link: "#",
//   },
// ]

// Mock data for projects grid
export const PROJECTS_GRID = [
  {
    id: "1",
    name: "EcoTech Solutions",
    category: "CleanTech",
    image: "/images/eco.jpg",
    funding: "$2.4M",
    status: "In Progress",
    progress: 75,
    industries: ["Renewable Energy", "Sustainability"],
    founderName: "Alex Rivera",
    avatar: "/images/avatars/alex.jpg",
    rating: 4.8,
  },
  {
    id: "2",
    name: "MediHealth AI",
    category: "HealthTech",
    image: "/images/ai-health.jpg",
    funding: "$1.8M",
    status: "Completed",
    progress: 100,
    industries: ["Healthcare", "AI", "Analytics"],
    founderName: "Sarah Chen",
    avatar: "/images/blockchain.jpg",
    rating: 5.0,
  },
  {
    id: "3",
    name: "FinEdge",
    category: "FinTech",
    image: "/images/renew.jpg",
    funding: "$3.2M",
    status: "In Progress",
    progress: 60,
    industries: ["Finance", "Blockchain"],
    founderName: "Michael Johnson",
    avatar: "/images/avatars/michael.jpg",
    rating: 4.5,
  },
  {
    id: "4",
    name: "EduLearn Platform",
    category: "EdTech",
    image: "/images/renew.jpg",
    funding: "$1.5M",
    status: "New",
    progress: 30,
    industries: ["Education", "SaaS"],
    founderName: "Priya Patel",
    avatar: "/images/avatars/priya.jpg",
    rating: 4.2,
  },
  {
    id: "5",
    name: "AgriSmart",
    category: "AgTech",
    image: "/images/smart-iot.png",
    funding: "$2.1M",
    status: "In Progress",
    progress: 65,
    industries: ["Agriculture", "IoT"],
    founderName: "Carlos Rodriguez",
    avatar: "/images/avatars/carlos.jpg",
    rating: 4.7,
  },
  {
    id: "6",
    name: "RetailAI",
    category: "Retail",
    image: "/images/eco.jpg",
    funding: "$1.9M",
    status: "New",
    progress: 25,
    industries: ["Retail", "AI", "Analytics"],
    founderName: "Emma Wilson",
    avatar: "/images/avatars/emma.jpg",
    rating: 4.3,
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
    image: "/images/eco.jpg",
    status: "Profitable",
  },
  {
    id: 2,
    name: "Tesla Motors",
    type: "Electric Vehicles",
    amount: "$12,500",
    returns: "+$2,890",
    percentage: "+23.12%",
    image: "/images/eco.jpg",
    status: "Profitable",
  },
  {
    id: 3,
    name: "Meta Platforms",
    type: "Social Media",
    amount: "$8,750",
    returns: "+$1,456",
    percentage: "+16.64%",
    image: "/images/eco.jpg",
    status: "Profitable",
  },
  {
    id: 4,
    name: "Amazon",
    type: "E-commerce",
    amount: "$20,000",
    returns: "+$4,200",
    percentage: "+21.00%",
    image: "/images/eco.jpg",
    status: "Profitable",
  },
]

// Mock data for Rising Projects chart
export const RISING_PROJECTS_DATA = [
  {
    month: "Jan",
    MVP: 4,
    Seed: 3,
    Final: 2,
  },
  {
    month: "Feb",
    MVP: 3,
    Seed: 2,
    Final: 2,
  },
  {
    month: "Mar",
    MVP: 2,
    Seed: 2,
    Final: 3,
  },
  {
    month: "Apr",
    MVP: 3,
    Seed: 4,
    Final: 2,
  },
  {
    month: "May",
    MVP: 2,
    Seed: 5,
    Final: 2,
  },
  {
    month: "Jun",
    MVP: 2,
    Seed: 3,
    Final: 3,
  },
  {
    month: "Jul",
    MVP: 3,
    Seed: 4,
    Final: 3,
  },
]

// Mock data for Your Spending chart
export const SPENDING_DATA = [
  {
    month: "Jan",
    amount: 3200,
  },
  {
    month: "Feb",
    amount: 4100,
  },
  {
    month: "Mar",
    amount: 2800,
  },
  {
    month: "Apr",
    amount: 3600,
  },
  {
    month: "May",
    amount: 2900,
  },
  {
    month: "Jun",
    amount: 3700,
  },
  {
    month: "Jul",
    amount: 3300,
  },
  {
    month: "Aug",
    amount: 4800,
  },
]

// Define types for our stats data
export interface StatCard {
  id: string
  title: string
  value: string | number
  change: {
    value: string
    trend: "up" | "down" | "neutral"
    text: string
  }
  icon: "dollar" | "trending" | "star"
  link: string
  rating?: number // Only used for rating card
}

// Dummy data for demonstration
export const STAT_DATA: StatCard[] = [
  {
    id: "startups",
    title: "Total Startups",
    value: 300,
    change: {
      value: "+12%",
      trend: "up",
      text: "from last month",
    },
    icon: "dollar",
    link: "/startups",
  },
  {
    id: "earnings",
    title: "Total Earnings",
    value: "$5,000.00",
    change: {
      value: "+8%",
      trend: "up",
      text: "this quarter",
    },
    icon: "trending",
    link: "/earnings",
  },
  {
    id: "rating",
    title: "Rating",
    value: "3.5/5",
    change: {
      value: "",
      trend: "neutral",
      text: "",
    },
    icon: "star",
    link: "/ratings",
    rating: 3.5,
  },
]

export const CROWDFUNDING_TOTAL = "$12,345.78"; // Dummy data for Crowdfunding
export const INVEST_TOTAL = "$2,050.50"; // Dummy data for Invest
export const MVP_TOTAL = "19";
export const SEED_TOTAL = "23";
export const FINAL_TOTAL = "17";