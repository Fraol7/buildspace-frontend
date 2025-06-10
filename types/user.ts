export type UserRole = "Entrepreneur" | "Investor"
export type UserType = "entrepreneur" | "investor"
export type UserStatus = "active" | "inactive" | "pending" | "verified"

export type Badge = {
  id: string;
  label: string;
  color: "blue" | "blue" | "indigo" | "teal" | "cyan";
  category: "industry" | "stage" | "specialization" | "type";
};

export type SocialLinks = {
  linkedin?: string;
  twitter?: string;
  website?: string;
  github?: string;
};

export type ContactInfo = {
  email: string;
  phone?: string;
  preferredContact: "email" | "phone" | "linkedin";
};

export type ProfessionalInfo = {
  title: string;
  company?: string;
  experience: number; // years of experience
  education?: string;
  previousCompanies?: string[];
};

export type InvestmentInfo = {
  investmentRange?: {
    min: number;
    max: number;
  };
  investmentStage?: string[];
  portfolioSize?: number;
  checkSize?: {
    min: number;
    max: number;
  };
};

export type User = {
  id: string;
  name: string;
  photo: string;
  rating: number;
  badges: string[];
  bio: string;
  address: string;
  role: UserRole;
  startupCount?: number; // For entrepreneurs
  totalInvestment?: string; // For investors (e.g., "$2.5M")
};

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

