import { StylingService, Testimonial, StyleProposal, SeasonType, VibeType } from './types';

export const LUXURY_SERVICES: StylingService[] = [
  {
    id: 'tablescape',
    title: 'The Imperial Tablescape',
    subtitle: 'Couture Dining Design',
    description: 'Immersive table architecture integrating pure linen drapery, gold-dipped cutlery, hand-chosen luxury porcelain, and signature miniature floral garlands under glowing taper candles.',
    priceStart: 180000,
    features: [
      'Bespoke visual place settings (up to 150 guests)',
      'Custom gold-embossed personalized menu cards',
      'Assorted premium crystal stemware pairings',
      'Fine satin or velvet menu ribbon styling',
      'Post-event white-glove strike and retrieval'
    ],
    image: '/src/assets/images/celestique_tablescape_1781396278721.jpg'
  },
  {
    id: 'floral',
    title: 'Opulent Blooming',
    subtitle: 'Couture Floral Sculpting',
    description: 'Breathtaking cascades of deep-plum dahlias, midnight burgundy calla lilies, and gilded branches that climb architectural pillars and spill elegantly across dynamic heights.',
    priceStart: 350000,
    features: [
      'Symphonic tall and low pedestal centerpiece dynamics',
      'Rare import blooms selected for deep color saturation',
      'In-situ artisan installation and sculpting',
      'Fragrance-profile design custom to the venue',
      'Sustainably sourced, water-retaining mechanics'
    ],
    image: '/src/assets/images/celestique_floral_1781396321270.jpg'
  },
  {
    id: 'reception',
    title: 'Candlelit Grandeur',
    subtitle: 'Ambient Atmospheric Curation',
    description: 'An atmospheric takeover utilizing architectural uplighting, hundreds of clean-burning honeycomb taper candles, and overhead cascading starry warm-microlight structures.',
    priceStart: 250000,
    features: [
      'Full venue candlelit lighting audit and safety design',
      'Layered high-altitude floating tealight spheres',
      'Custom gold-accented hurricane glass shields',
      'Dynamic low-lying fog and warm wash-lights',
      'Professional certified atmospheric technicians'
    ],
    image: '/src/assets/images/celestique_reception_1781396299184.jpg'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Aisha & Zain Malik',
    eventType: 'Winter Nikah Reception',
    content: '“Aura Celebrations transformed our grand hall into a dark, candlelit fairytale. The pairing of deepest plum run-set velvet with brilliant gold-dipped branches took my breath away. It was pure sensory poetry.”',
    rating: 5,
    date: 'December 2025',
    location: 'DHA Phase 6, Karachi'
  },
  {
    id: 'test-2',
    name: 'Anam & Shahzad Bilal',
    eventType: 'Opulent Barat Ceremony',
    content: '“The attention to details is peerless. Guests are still discussing the magnificent tablescape—the heavy crystal, the scent of fresh burgundy lilies, and the warm, ethereal glow that held the room until midnight.”',
    rating: 5,
    date: 'April 2026',
    location: 'DHA Phase 8, Karachi'
  },
  {
    id: 'test-3',
    name: 'Mariam Suleman (Director Marketing)',
    eventType: 'Independence Day Gala',
    content: '“They don’t just decorate; they choreograph atmospheres. The overlapping geometric gold arches and corporate green-white cascades established an editorial canvas seen only on the glossy pages of high-end design catalogs.”',
    rating: 5,
    date: 'August 2025',
    location: 'DHA Phase 2, Karachi'
  }
];

// High-end pre-engineered stylistic proposals returned by the Interactive Moodboard Generator
export const STYLE_PROPOSALS: StyleProposal[] = [
  // Autumn Luxe
  {
    season: 'Autumn Luxe',
    vibe: 'Moody Candlelit',
    title: 'Crimson Velvet & Whispering Hearth',
    palette: [
      { name: 'Regal Plum', hex: '#220a22' },
      { name: 'Burgundy Velvet', hex: '#4a0e17' },
      { name: 'Burnished Gold', hex: '#aa8410' },
      { name: 'Smoked Oak', hex: '#2c221e' }
    ],
    florals: ['Burgundy Dahlias', 'Smoked Eucalyptus', 'Deep Plum Ranunculus', 'Gilded Magnolia Leaves'],
    textures: ['Heavy Cotton Velvet', 'Distressed Brass', 'Raw Silk Ribbons'],
    lighting: 'Drenched Amber Uplighting & Tiered Taper Candles on raw stone plinths',
    description: 'An intimate, moody sanctuary capturing the deep, crackling warmth of late autumn. Earthy wood notes combine with high-contrast velvet colors to create an immersive, intellectual, and deeply romantic banquet setting.'
  },
  {
    season: 'Autumn Luxe',
    vibe: 'Modern Luxe',
    title: 'Gilded Ochres & Avant-Garde Lines',
    palette: [
      { name: 'Rich Champagne', hex: '#f2e9d3' },
      { name: 'Molten Gold', hex: '#d4af37' },
      { name: 'Matte Charcoal', hex: '#1c1c1c' },
      { name: 'Earthy Plum', hex: '#3d1c3d' }
    ],
    florals: ['Toffee Roses', 'Golden Mustard Anthuriums', 'Bleached Ferns', 'Plum Orchids'],
    textures: ['Polished Gold Plates', 'Structured Crepe Linen', 'Smoked Acrylic Glassware'],
    lighting: 'Sculptural brass chandeliers with sharp, warm focus spots',
    description: 'A striking editorial layout balancing negative space with bold, architectural floral sculptures. Crisp champagne surfaces act as a canvas for high-gloss metallic details.'
  },
  {
    season: 'Autumn Luxe',
    vibe: 'Vintage Grandeur',
    title: 'The Edwardian Harvest Feast',
    palette: [
      { name: 'Plum Majestic', hex: '#351035' },
      { name: 'Warm Champagne', hex: '#dccea8' },
      { name: 'Moss Velvet', hex: '#1e2d1d' },
      { name: 'Old Gold', hex: '#aa8410' }
    ],
    florals: ['David Austin Cabbage Roses', 'Plum Clematis Trails', 'Gilded Wheat Sheaves'],
    textures: ['Ornate Brocade', 'Hand-hammered Charger Plates', 'Antique Gilt Candelabras'],
    lighting: 'Prismatic crystal chandelier warm candlelight refraction',
    description: 'An opulent nod to historical heritage, surrounding guests with heavy ornamental textures, warm antique metals, and cascading vine draperies reminiscent of vintage European estates.'
  },
  {
    season: 'Autumn Luxe',
    vibe: 'Ethereal Romantic',
    title: 'La Vie En Plum & Golden Mists',
    palette: [
      { name: 'Dusty Plum', hex: '#5e1b5e' },
      { name: 'Blush Champagne', hex: '#fbf9f4' },
      { name: 'Soft Muted Gold', hex: '#deb038' },
      { name: 'Dusk Lavender', hex: '#483c48' }
    ],
    florals: ['Muted Lavender Roses', 'Ethereal Baby\'s Breath in Plum Mist', 'Wisteria Creepers'],
    textures: ['Sheer Silk Chiffon', 'Etched Mercury Glass', 'Fine Cotton Lace'],
    lighting: 'Subtle twinkling overhead canopy mimicking autumn starlight',
    description: 'A glowing, dream-like atmosphere defined by translucent layers and weightless drapes. Feathery floral structures billow above neutral-toned, elegant linen settings.'
  },

  // Regal Winter
  {
    season: 'Regal Winter',
    vibe: 'Moody Candlelit',
    title: 'Nocturne Midnight & Crimson Ice',
    palette: [
      { name: 'Deep Royal Purple', hex: '#140514' },
      { name: 'Oxblood Red', hex: '#3d020a' },
      { name: 'Polished Brass', hex: '#d4af37' },
      { name: 'Spruce Green', hex: '#0f2214' }
    ],
    florals: ['Black Baccara Roses', 'Plum Hellebores', 'Frosted Spruce Silhouettes', 'Gold Pine Cones'],
    textures: ['Pristine Velvet Cushions', 'Heavy Crystal Glassware', 'Blackened Steel Accents'],
    lighting: 'Low-lying cobalt blue floods intersected by dynamic flicker flames',
    description: 'A breathtaking winter banquet concept that pairs absolute dark table linen with bright, contrasting candlelight and frost-like crystalline details.'
  },
  {
    season: 'Regal Winter',
    vibe: 'Modern Luxe',
    title: 'Monochromatic Plum Glamour',
    palette: [
      { name: 'Sleek Plum Velvet', hex: '#351035' },
      { name: 'Bright Gold Accent', hex: '#f6e6c2' },
      { name: 'Crisp White Card', hex: '#ffffff' },
      { name: 'Deep Space Navy', hex: '#080c1d' }
    ],
    florals: ['Plum Callas', 'Bleached Monstera Leaves', 'White Luxury Tulips Devoré'],
    textures: ['Brushed Platinum Finishes', 'Ultra-clean Matte Velvet', 'Laser-cut Gold Placeholders'],
    lighting: 'Minimalist white neon arches casting warm reflections onto glossy surfaces',
    description: 'A clean, geometric approach to seasonal decor, featuring sharp contrasts and minimalist accents that preserve a grand, prestigious scale.'
  },

  // Spring Opulence
  {
    season: 'Spring Opulence',
    vibe: 'Ethereal Romantic',
    title: 'The Lilac Bower in Secret Gardens',
    palette: [
      { name: 'Lustrous Orchid', hex: '#8d2e8d' },
      { name: 'Tender Champagne', hex: '#fdfaf2' },
      { name: 'Soft Sage Leaf', hex: '#4e5b4c' },
      { name: 'Gold Dust', hex: '#deb038' }
    ],
    florals: ['French Lilacs', 'White Peonies', 'Cascading Lavender Wisteria', 'Poppies'],
    textures: ['Raw Crinkle Silk', 'Fluted Porcelain', 'Handwoven Champagne Linen'],
    lighting: 'Warm daylight filtering through cherry blossom canopies',
    description: 'The absolute pinnacle of luxury spring romance—a bountiful floral sky hanging over pristine champagne porcelain in a modern garden oasis.'
  },

  // Gilded Summer
  {
    season: 'Gilded Summer',
    vibe: 'Modern Luxe',
    title: 'Solstice Sunset & Golden Linens',
    palette: [
      { name: 'Wild Plum Wine', hex: '#5e115e' },
      { name: 'Marigold Apricot', hex: '#f3c241' },
      { name: 'Sandalwood Amber', hex: '#aa8410' },
      { name: 'Summer Linen White', hex: '#ffffff' }
    ],
    florals: ['Saffron Ranunculus', 'Plum Cattleya Orchids', 'Gilded Palm Leaves', 'Dried Palm Spears'],
    textures: ['Woven Belgian Linen', 'Terrazzo Chargers', 'Faceted Gold Goblets'],
    lighting: 'Warm dusk-matching overhead washes combined with miniature pin spots',
    description: 'A vibrant yet deeply elite sensory landscape commemorating the summer solstice. Saturated warmth is balanced by highly tailored minimalist details.'
  }
];

// Helper to fallback safely if a collection is missing
export function getStyleProposal(season: SeasonType, vibe: VibeType): StyleProposal {
  const match = STYLE_PROPOSALS.find(p => p.season === season && p.vibe === vibe);
  if (match) return match;
  
  // Custom smart default
  return {
    season,
    vibe,
    title: `${season} Custom Symphony`,
    palette: [
      { name: 'Imperial Plum', hex: '#220a22' },
      { name: 'Polished Gold', hex: '#d4af37' },
      { name: 'Warm Champagne', hex: '#f2e9d3' },
      { name: 'Pristine Lily White', hex: '#ffffff' }
    ],
    florals: ['Signature Aura Celebrations Dahlias', 'Gilded Vine Leaves', 'White Gardenia blooms'],
    textures: ['Pristine Velvet drapery', 'Engraved crystal chargers', 'Silk satin bindings'],
    lighting: 'Scattered flickering taper candlelight and custom warm uplights',
    description: `A custom-tailored luxury layout balancing the opulent, majestic essence of ${season} with the flawless character of ${vibe}. Hand-finished details create a striking multi-dimensional space.`
  };
}
