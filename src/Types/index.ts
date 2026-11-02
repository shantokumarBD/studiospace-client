export interface Studio {
  _id: string;
  title: string;
  category: string;
  location: string;
  image: string;
  hourlyRate: number;
  rating: number;
  features: string[];
  shootsCompleted?: number;
  securityDeposit?: number;
  maxCapacity?: number;
  sqft?: number;
  availability?: string;
  badge?: string;
  isFeatured?: boolean;
  overview?: string;
  ownerEmail?: string;
  ownerName?: string;
  createdAt?: string | Date;
}

export interface FilterState {
  search: string;
  category: string;
  city: string;
  sort: string;
}

export interface StudioFilterProps {
  categories: string[];
  filters: FilterState;
  onFilterChange: (name: keyof FilterState, value: string) => void;
  onReset: () => void;
}


export interface AuthButtonsProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
  onSignOut?: () => void;
}