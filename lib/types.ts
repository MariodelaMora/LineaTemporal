export interface MemoryPhoto {
  id: string;
  memory_id: string;
  url: string;
  position: number;
}

export interface Memory {
  id: string;
  title: string;
  description: string | null;
  date: string; // ISO date (yyyy-mm-dd)
  location_name: string;
  lat: number;
  lng: number;
  created_at: string;
  photos: MemoryPhoto[];
}

export interface Milestone {
  id: string;
  title: string;
  date: string;
  icon: string | null;
}
