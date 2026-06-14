export type SeasonType = 'Autumn Luxe' | 'Regal Winter' | 'Spring Opulence' | 'Gilded Summer';

export type VibeType = 'Moody Candlelit' | 'Modern Luxe' | 'Vintage Grandeur' | 'Ethereal Romantic';

export interface StyleProposal {
  season: SeasonType;
  vibe: VibeType;
  title: string;
  palette: { name: string; hex: string }[];
  florals: string[];
  textures: string[];
  lighting: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  eventType: string;
  content: string;
  rating: number;
  date: string;
  location: string;
}

export interface StylingService {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  priceStart: number;
  features: string[];
  image: string;
}
