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

export interface Booking {
  _id: string;
  studioId: string;
  studioTitle: string;
  studioImage: string;
  studioLocation?: string;
  category?: string;
  hourlyRate: number;
  renterEmail: string;
  renterName: string;
  date: string;
  hours: number;
  callTime: string;
  wrapTime: string;
  totalAmount: number;
  specialNotes?: string;
  status:
    | "CONFIRMED"
    | "PENDING"
    | "COMPLETED"
    | "CANCELLED"
    | "Pending Host Approval"
    | "Cancelled"
    | string;
  createdAt?: string | Date;
}

export interface WishlistItem {
  _id: string;
  studioId: string;
  userEmail: string;
  title: string;
  image: string;
  location: string;
  hourlyRate: number;
  category: string;
  rating: number;
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