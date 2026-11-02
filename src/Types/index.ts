export interface Studio {
  _id: string;
  title: string;
  category: string;
  badge?: string;
  location: string;
  features: string[];
  hourlyRate: number;
  securityDeposit?: number;
  maxCapacity?: number;
  rating: number;
  shootsCompleted: number;
  image: string;
  isFeatured?: boolean;
  ownerEmail?: string;
  ownerName?: string;
  overview?: string;
  createdAt?: string | Date;
}