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
