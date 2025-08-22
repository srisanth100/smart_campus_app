export interface User {
  id: string;
  name: string;
  email: string;
  department?: string;
  avatar?: string;
  role: 'student' | 'staff' | 'admin';
  universityId?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image?: string;
  category: 'academic' | 'cultural' | 'sports' | 'workshop';
  registeredCount: number;
  maxCapacity: number;
  isRegistered?: boolean;
}

export interface LostFoundItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  category: 'electronics' | 'clothing' | 'books' | 'accessories' | 'other';
  status: 'lost' | 'found' | 'claimed';
  location: string;
  dateReported: string;
  reportedBy: string;
  contactInfo: string;
}

export interface CafeteriaItem {
  id: string;
  name: string;
  price: number;
  image?: string;
  category: 'main' | 'snacks' | 'beverages' | 'desserts';
  availability: boolean;
  rating: number;
}

export interface QueueStatus {
  cafeteriaId: string;
  name: string;
  currentQueue: number;
  estimatedWait: number;
  status: 'low' | 'medium' | 'high';
  lastUpdated: string;
}

export interface NavigationPoint {
  id: string;
  name: string;
  category: 'academic' | 'facility' | 'food' | 'transport';
  coordinates: { lat: number; lng: number };
  description?: string;
}