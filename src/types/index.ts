export type Language = 'hi' | 'en';

export type FuelOption = 'included' | 'farmer';

export type TimeSlot = 'morning' | 'noon' | 'afternoon' | 'custom';

export interface Vehicle {
  id: number;
  nameHi: string;
  nameEn: string;
  model: string;
  hp: number;
  implementsHi: string;
  implementsEn: string;
  rateWithFuel: number;
  rateWithoutFuel: number;
  suitableCrops: string[];
  distanceKm: number;
  locationHi: string;
  locationEn: string;
  ownerName: string;
  ownerPhone: string;
  rating: number;
  totalTrips: number;
  image: string;
  isAvailable: boolean;
  category?: string;
}

export interface Booking {
  id?: string | number;
  vehicle_id: number;
  vehicle_name: string;
  farmer_name: string;
  farmer_phone: string;
  farmer_village: string;
  booking_date: string;
  time_slot: string;
  hours_needed: number;
  fuel_option: FuelOption;
  estimated_cost: number;
  rate_applied: number;
  status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
  created_at?: string;
  owner_name?: string;
  owner_phone?: string;
  driver_name?: string;
  driver_phone?: string;
}

export interface OwnerRegistration {
  id?: string | number;
  owner_name: string;
  phone: string;
  village: string;
  district: string;
  tractor_brand: string;
  tractor_hp: number;
  implements: string[];
  rate_with_diesel: number;
  rate_without_diesel: number;
  created_at?: string;
}

export interface MandiRate {
  mandiHi: string;
  mandiEn: string;
  cropHi: string;
  cropEn: string;
  ratePerQtl: number;
  trend: 'up' | 'down' | 'stable';
}

export interface UserAuth {
  isLoggedIn: boolean;
  phone?: string;
  name?: string;
  isGuest?: boolean;
}
