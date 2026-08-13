export type FishCategory = 
  | 'Semua' 
  | 'Molly Dalmatian & Zebra' 
  | 'Black & White Molly' 
  | 'Gold & Lemon Molly' 
  | 'Lyretail & Redhead Molly' 
  | 'Balloon Molly' 
  | 'Varian Molly Lainnya';

export interface FishItem {
  id: string;
  name: string;
  image: string;
  category: FishCategory;
  shortDescription: string;
  featured?: boolean;
  internalCode?: string;
  healthStatus?: string;
  waterTemp?: string;
  careLevel?: string;
}
