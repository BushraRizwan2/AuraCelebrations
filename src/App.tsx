import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Star, 
  ArrowRight, 
  Compass, 
  Calendar, 
  DollarSign, 
  Users, 
  Check, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  ChevronRight, 
  FileText,
  GlassWater,
  Flower,
  FlameKindling,
  Shield,
  Menu,
  X,
  Search,
  Facebook,
  Instagram
} from 'lucide-react';
import { SeasonType, VibeType, StyleProposal, StylingService } from './types';
import { LUXURY_SERVICES, TESTIMONIALS, getStyleProposal } from './data';
import AdminPortal from './components/AdminPortal';

const HIGHLIGHTS = [
  {
    id: 'highlight-birthday-decor',
    category: 'Birthday' as const,
    title: 'Just Birthday Decor Package',
    subtitle: 'Ambient Balloon Cloude & Golden Frames',
    description: 'A charming, high-end intimate setup featuring pastel-purple and elegant dusty-rose organic balloon arches, gold circular metal frames, customized name signs, and warm fairy lights.',
    image: '/images/aura_birthday_decor_1781397692017.jpg',
    features: ['Organic Silk Balloon Arches', 'Gold Plate Cake Plinth', 'Romantic Candle & Fairy Lights'],
    price: 10000
  },
  {
    id: 'highlight-birthday-dinner',
    category: 'Birthday' as const,
    title: 'Birthday Decor & Dinner Package',
    subtitle: 'Premium Curation with 5 Main Dishes',
    description: 'An elite dual-experience offering premium stage backdrop styling paired with a magnificent seated buffet hosting 5 signature gourmet main courses served in warm brass chafing dishes under floating crystal chandeliers.',
    image: '/images/aura_birthday_dinner_1781399061307.jpg',
    features: ['5 Gourmet Main Dishes Buffet', 'Premium Stage Backdrop Decor', 'Fine Cutlery & Charger Plates'],
    price: 400000
  },
  {
    id: 'highlight-birthday-dj',
    category: 'Birthday' as const,
    title: 'Birthday Decor + DJ + Dinner Package',
    subtitle: 'The Ultimate Milestone Extravaganza',
    description: 'A custom, high-octane celebration package integrating complete theme decor, professional live sound DJ booth setups, warm mood wash-lights, and an expansive dinner buffet featuring 5 main courses.',
    image: '/images/aura_birthday_dj_1781399084641.jpg',
    features: ['Pro DJ Sound System & Laser Uplighting', '5-Course Luxury Feast Buffet', 'Immersive Atmospheric Backdrop Display'],
    price: 450000
  },
  {
    id: 'highlight-nikah',
    category: 'Nikah' as const,
    title: 'Nikah Decoration',
    subtitle: 'Ethereal Pristine White & Mirror Elements',
    description: 'A traditional yet contemporary sanctuary styled with fragrant white jasmine vines, hanging glass floral orbs, clear crystal seating, and seamless mirror aisles reflecting shimmering gold light.',
    image: '/images/aura_nikah_decor_1781397753467.jpg',
    features: ['Pure Jasmine Backdrops', 'High-Gloss Mirror Aisles', 'Plum Velvet Officiant Diwan']
  },
  {
    id: 'highlight-mayun',
    category: 'Wedding' as const,
    title: 'Mayun Decoration',
    subtitle: 'Vibrant Mustard Blooms & Brass Accents',
    description: 'A glowing festive setting celebrating old-world romance with dense marigold drops, orange crêpe drapes, low-sitting handcrafted velvet diwans, and authentic brass planters.',
    image: '/images/aura_mayun_decor_1781397736458.jpg',
    features: ['Dense Marigold Clouds', 'Embroidered Phulkari Drapes', 'Brass Oil-Lamp Arrays']
  },
  {
    id: 'highlight-barat',
    category: 'Wedding' as const,
    title: 'Barat Decoration',
    subtitle: 'Couture Crimson Stage & Gilded Pillars',
    description: 'The monumental moment. Styled with soaring backdrop walls of deepest red roses, hand-carved gold seating, heavy crystal chandeliers, and a regal red velvet carpeted runway.',
    image: '/images/aura_barat_decor_1781397775755.jpg',
    features: ['Grand Rose Background Stage', 'Multi-Tiered Crystal Chandeliers', 'Regal Gilded Seating']
  },
  {
    id: 'highlight-valima',
    category: 'Wedding' as const,
    title: 'Valima Decoration',
    subtitle: 'Sophisticated Foliage & Sage reception',
    description: 'A modern, ultra-luxurious reception. White gypsophila mist clouds paired with dusty silver and ice blue drapery, exquisite candle trees, and bespoke tableware with fine geometric borders.',
    image: '/images/aura_valima_decor_1781397793479.jpg',
    features: ['Satin Sage Drapery', 'Gypsophila Cloud Hanging', 'Geometric Champagne Glassware']
  },
  {
    id: 'highlight-office',
    category: 'Corporate' as const,
    title: 'Office Pakistan Independence Decor',
    subtitle: 'Corporate Emerald & White National Pride',
    description: 'Sophisticated company-wide festive styling for Pakistan Independence Day. Majestic green silk draperies matched beautifully with white orchids, brass elements, and creative crescent lighting.',
    image: '/images/aura_office_decor_1781397716019.jpg',
    features: ['Emerald Satin Drapes', 'White Orchid Arrangements', 'Crescent & Star Gold Motifs']
  },
  {
    id: 'highlight-gala',
    category: 'Corporate' as const,
    title: 'Grand Corporate Gala Dinner',
    subtitle: 'Prestigious Gala & Award Night Atmospheric Setup',
    description: 'A spectacular high-end gala dinner featuring opulent banquet tables decorated with cascading plum floral centerpieces, gilded dinnerware, and customized architectural uplighting that reflects standard-setting corporate prestige.',
    image: '/images/corporate_gala_1781799240061.jpg',
    features: ['Cascading Plum Florals', 'Gilded Charger Settings', 'Architectural Ambient Uplighting']
  },
  {
    id: 'highlight-cruise',
    category: 'Corporate' as const,
    title: 'Luxury Yacht Cruise Dinner',
    subtitle: 'Sunset Deck Banquets & Floating Soirees',
    description: 'An exclusive oceanfront banquet on a luxury yacht. Features sparkling brass lantern arrays, premium white-and-gold tablescapes, and ambient sunset lights reflecting off Karachi\'s sparkling waves.',
    image: '/images/cruise_dinner_1781799262512.jpg',
    features: ['Sparkling Brass Lanterns', 'Premium White-and-Gold Linens', 'Sunset Ocean Deck Setups']
  },
  {
    id: 'highlight-qawwali',
    category: 'Corporate' as const,
    title: 'Atmospheric Qawwali Night',
    subtitle: 'Sufi Musical Heritage & Festive Opulence',
    description: 'A mystical and opulent musical setting, organized in royal plum carpeted floor spaces, velvet gavi cushions, hundreds of warm taper candles, and fresh rose installations for a soulful experience.',
    image: '/images/qawwali_night_1781799286007.jpg',
    features: ['Plush Velvet Floor Cushions', 'Warm Taper Candle Trails', 'Royal Silk Canopy Drapes']
  },
  {
    id: 'highlight-picnic',
    category: 'Corporate' as const,
    title: 'Elite Picnic with Sea Sports',
    subtitle: 'Coastal Beach Escaping & Watersport Galas',
    description: 'A luxury bohemian beachside escape. Features crisp white beach parasols, low organic wooden dining setups, handwoven cushions, fine crystal glasses, and high-octane watersport options like jet skiing.',
    image: '/images/beach_sports_picnic_1781799307283.jpg',
    features: ['Elegant White Boho Parasols', 'Low Coastal Dining Tables', 'Exhilarating Watersport Galas']
  }
];

const sanitizeStorageJson = (raw: string | null) => {
  if (!raw) return null;
  try {
    let sanitized = raw;
    // Replace "/src/assets/images/" or "src/assets/images/" with "/images/"
    sanitized = sanitized.replace(/\/?src\/assets\/images\//g, '/images/');
    // Ensure all "/assets/images" or "assets/images" start with "/images/"
    sanitized = sanitized.replace(/\/?assets\/images\//g, '/images/');
    // Handle any existing "/images/" correctly
    sanitized = sanitized.replace(/\/?images\//g, '/images/');
    return JSON.parse(sanitized);
  } catch (e) {
    return null;
  }
};

const resolveImgUrl = (url: string | undefined): string => {
  if (!url) return '';
  let resolved = url;
  
  const KNOWN_FILENAMES = [
    'aura_barat_decor_1781397775755.jpg',
    'aura_birthday_decor_1781397692017.jpg',
    'aura_birthday_dinner_1781399061307.jpg',
    'aura_birthday_dj_1781399084641.jpg',
    'aura_logo_1781397175518.jpg',
    'aura_mayun_decor_1781397736458.jpg',
    'aura_nikah_decor_1781397753467.jpg',
    'aura_office_decor_1781397716019.jpg',
    'aura_valima_decor_1781397793479.jpg',
    'celestique_floral_1781396321270.jpg',
    'celestique_hero_1781396253917.jpg',
    'celestique_reception_1781396299184.jpg',
    'celestique_tablescape_1781396278721.jpg',
    'corporate_gala_1781799240061.jpg',
    'cruise_dinner_1781799262512.jpg',
    'qawwali_night_1781799286007.jpg',
    'beach_sports_picnic_1781799307283.jpg'
  ];
  
  for (const filename of KNOWN_FILENAMES) {
    if (resolved.includes(filename)) {
      return `/images/${filename}`;
    }
  }

  if (resolved.includes('images/')) {
    const parts = resolved.split('images/');
    const filename = parts[parts.length - 1];
    return `/images/${filename}`;
  }

  if (resolved.startsWith('//')) {
    resolved = resolved.replace(/^\/+/, '/');
  }
  return resolved;
};

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Navigation active state for layout highlights
  const [activeTab, setActiveTab] = useState<'home' | 'services' | 'moodboard' | 'estimator' | 'testimonials' | 'inquiry'>('home');

  // Web dynamic configurations
  const [webConfig, setWebConfig] = useState(() => {
    const raw = localStorage.getItem('aura_web_config');
    const parsed = sanitizeStorageJson(raw);
    if (parsed && parsed.colors && parsed.colors.background_950 !== '#140514') return parsed;
    const defaultColors = {
      background_950: '#050505',
      background_900: '#121212',
      background_800: '#1c1c1e',
      gold_accent: '#d4af37',
      gold_dark: '#aa8410',
      gold_light: '#f6e6c2',
      textColor: '#ffffff',
      cardBackground: '#0d0d0d'
    };
    const migrated = {
      colors: defaultColors,
      sections: parsed?.sections || [
        { id: 'hero-section', name: 'Hero Curation Intro', enabled: true },
        { id: 'services-section', name: 'Dynamic Tailoring Services', enabled: true },
        { id: 'moodboard-section', name: 'Interactive Moodboard Generator', enabled: true },
        { id: 'highlights-section', name: 'Aura Portfolio & Highlights Grid', enabled: true },
        { id: 'estimator-section', name: 'Calculative Cost Estimator', enabled: true },
        { id: 'testimonials-section', name: 'Words of Patrons (Testimonials)', enabled: true },
        { id: 'inquiry-section', name: 'Grand Consultation Intake Forms', enabled: true }
      ],
      hero: parsed?.hero || {
        title: 'Aura Celebrations',
        subtitle: 'CHOREOGRAPHING ATMOSPHERIC MASTERPIECES',
        description: 'We craft hyper-exclusive, premium sensory landscapes for elite celebrations in Karachi, Pakistan. Balancing architectural density, pure velvet textiles, and raw flora sculpting.',
        image: '/images/celestique_reception_1781396299184.jpg'
      }
    };
    localStorage.setItem('aura_web_config', JSON.stringify(migrated));
    return migrated;
  });

  const [dynamicServices, setDynamicServices] = useState<any[]>(() => {
    const raw = localStorage.getItem('aura_dynamic_services');
    const parsed = sanitizeStorageJson(raw);
    if (parsed) return parsed;
    return LUXURY_SERVICES;
  });

  const [dynamicHighlights, setDynamicHighlights] = useState<any[]>(() => {
    const raw = localStorage.getItem('aura_dynamic_highlights');
    const parsed = sanitizeStorageJson(raw);
    if (parsed && parsed.length >= 12 && parsed.some(h => h.category === 'Corporate')) return parsed;
    localStorage.setItem('aura_dynamic_highlights', JSON.stringify(HIGHLIGHTS));
    return HIGHLIGHTS;
  });

  const [dynamicTestimonials, setDynamicTestimonials] = useState<any[]>(() => {
    const raw = localStorage.getItem('aura_dynamic_testimonials');
    const parsed = sanitizeStorageJson(raw);
    if (parsed) return parsed;
    return TESTIMONIALS;
  });

  const [feedbacks, setFeedbacks] = useState<any[]>(() => {
    const raw = localStorage.getItem('aura_feedbacks');
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (e) {}
    }
    return [];
  });

  const allTestimonials = useMemo(() => {
    const activeReviews = feedbacks
      .filter((f: any) => f.showOnWebsite === true)
      .map((f: any) => ({
        id: f.id,
        name: f.customerName,
        rating: f.rating || 5,
        content: `“${f.feedbackText}”`,
        eventType: 'Honored Guest Review',
        location: 'Karachi, PK',
        date: f.eventDate || 'Recently'
      }));
    return [...dynamicTestimonials, ...activeReviews];
  }, [dynamicTestimonials, feedbacks]);

  // Active unread alerts tracker for badge in primary headers!
  const [unreadCount, setUnreadCount] = useState(() => {
    const raw = localStorage.getItem('aura_notifications');
    if (raw) {
      try {
        const list = JSON.parse(raw);
        return list.filter((n: any) => !n.read).length;
      } catch(e) {}
    }
    return 2; // Default seeded unread count
  });

  // Listener to pick up live config alterations instantly
  React.useEffect(() => {
    const handleSync = () => {
      const rawCfg = localStorage.getItem('aura_web_config');
      const parsedCfg = sanitizeStorageJson(rawCfg);
      if (parsedCfg) setWebConfig(parsedCfg);

      const rawSrv = localStorage.getItem('aura_dynamic_services');
      const parsedSrv = sanitizeStorageJson(rawSrv);
      if (parsedSrv) setDynamicServices(parsedSrv);

      const rawHigh = localStorage.getItem('aura_dynamic_highlights');
      const parsedHigh = sanitizeStorageJson(rawHigh);
      if (parsedHigh) {
        if (parsedHigh.length >= 12 && parsedHigh.some(h => h.category === 'Corporate')) {
          setDynamicHighlights(parsedHigh);
        } else {
          setDynamicHighlights(HIGHLIGHTS);
          localStorage.setItem('aura_dynamic_highlights', JSON.stringify(HIGHLIGHTS));
        }
      }

      const rawTest = localStorage.getItem('aura_dynamic_testimonials');
      const parsedTest = sanitizeStorageJson(rawTest);
      if (parsedTest) setDynamicTestimonials(parsedTest);

      const rawFeeds = localStorage.getItem('aura_feedbacks');
      if (rawFeeds) {
        try {
          setFeedbacks(JSON.parse(rawFeeds));
        } catch (e) {}
      }

      const rawNotifs = localStorage.getItem('aura_notifications');
      if (rawNotifs) {
        try {
          const list = JSON.parse(rawNotifs);
          setUnreadCount(list.filter((n: any) => !n.read).length);
        } catch (e) {}
      }
    };
    window.addEventListener('aura_web_config_updated', handleSync);
    // Bind click trigger for direct updates
    window.addEventListener('click', handleSync);
    return () => {
      window.removeEventListener('aura_web_config_updated', handleSync);
      window.removeEventListener('click', handleSync);
    };
  }, []);

  // Highlights active category and search filter states
  const [activeHighlightCategory, setActiveHighlightCategory] = useState<'all' | 'Birthday' | 'Nikah' | 'Wedding' | 'Corporate'>('all');
  const [highlightsSearchQuery, setHighlightsSearchQuery] = useState<string>('');

  const filteredHighlights = useMemo(() => {
    let items = dynamicHighlights;
    if (activeHighlightCategory !== 'all') {
      items = items.filter(h => h.category === activeHighlightCategory);
    }
    if (highlightsSearchQuery.trim() !== '') {
      const q = highlightsSearchQuery.toLowerCase();
      items = items.filter(h => 
        (h.title && h.title.toLowerCase().includes(q)) || 
        (h.description && h.description.toLowerCase().includes(q))
      );
    }
    return items;
  }, [activeHighlightCategory, dynamicHighlights, highlightsSearchQuery]);

  // Highlights detailed view state
  const [selectedHighlight, setSelectedHighlight] = useState<any | null>(null);

  // Moodboard state
  const [selectedSeason, setSelectedSeason] = useState<SeasonType>('Autumn Luxe');
  const [selectedVibe, setSelectedVibe] = useState<VibeType>('Moody Candlelit');
  const currentProposal = useMemo(() => getStyleProposal(selectedSeason, selectedVibe), [selectedSeason, selectedVibe]);
  
  // Custom theme backdrop color override based on selected style color
  const [activeSwatchGlow, setActiveSwatchGlow] = useState<string>('#121212');

  // Estimator Form state
  const [guestCount, setGuestCount] = useState<number>(100);
  const [selectedServices, setSelectedServices] = useState<string[]>(['tablescape', 'floral']);
  const [accentLevel, setAccentLevel] = useState<'Standard' | 'Premium Elite' | 'Imperial Couture'>('Premium Elite');

  // Inquiry Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    eventDate: '',
    venueLocation: 'Karachi, Pakistan',
    specialNotes: '',
    appliedProposal: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Testimonial submission form state
  const [feedbackName, setFeedbackName] = useState('');
  const [feedbackEvent, setFeedbackEvent] = useState('');
  const [feedbackContent, setFeedbackContent] = useState('');
  const [feedbackRating, setFeedbackRating] = useState<number>(5);
  const [feedbackLocation, setFeedbackLocation] = useState('Clifton, Karachi'); // Pre-set to Karachi address!
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [isFeedbackFormOpen, setIsFeedbackFormOpen] = useState(false);

  // Auto scroll to target section
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Live Investment Estimation Calculation
  const totalInvestmentEstimation = useMemo(() => {
    let base = 0;
    
    // Add starts of each selected service
    selectedServices.forEach(srvId => {
      const match = dynamicServices.find(s => s.id === srvId);
      if (match) base += match.priceStart;
    });

    // Handle empty services
    if (base === 0) base = 120000;

    // Apply scale factor based on guests
    const scaleFactor = 1 + (guestCount - 50) * 0.005;
    
    // Apply accent levels
    let tierMultiplier = 1.0;
    if (accentLevel === 'Premium Elite') tierMultiplier = 1.35;
    if (accentLevel === 'Imperial Couture') tierMultiplier = 1.8;

    const finalEstimate = Math.round(base * scaleFactor * tierMultiplier);
    
    return {
      total: finalEstimate,
      rangeMin: Math.round(finalEstimate * 0.9),
      rangeMax: Math.round(finalEstimate * 1.15)
    };
  }, [selectedServices, guestCount, accentLevel, dynamicServices]);

  // Handle service check toggles
  const toggleService = (srvId: string) => {
    setSelectedServices(prev => 
      prev.includes(srvId) ? prev.filter(id => id !== srvId) : [...prev, srvId]
    );
  };

  // Adopt style proposal into inquiry form
  const adoptProposal = (prop: StyleProposal) => {
    setFormData(prev => ({
      ...prev,
      appliedProposal: `${prop.season} - ${prop.title}`
    }));
    scrollToSection('inquiry-section');
  };

  // Form submit with real-time notification push back!
  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) {
      alert("Please provide at least a name and email so our styling consultants can reach you.");
      return;
    }
    setIsSubmitting(true);

    // Create new customer notification
    const newNotif = {
      id: 'notif-' + Date.now(),
      type: 'inquiry',
      title: 'New Client Inquiry',
      message: `${formData.fullName} (${formData.email}) filed a ${formData.appliedProposal || 'custom'} consultation inquiry. Venue: ${formData.venueLocation || 'Karachi Venue'}. Notes: ${formData.specialNotes || 'No special directives.'}`,
      timestamp: new Date().toLocaleString(),
      read: false,
      metadata: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone || '',
        eventDate: formData.eventDate || '',
        venueLocation: formData.venueLocation || 'Karachi, Pakistan',
        specialNotes: formData.specialNotes || '',
        appliedProposal: formData.appliedProposal || ''
      }
    };

    setTimeout(() => {
      try {
        const rawNotifs = localStorage.getItem('aura_notifications');
        const list = rawNotifs ? JSON.parse(rawNotifs) : [
          {
            id: 'notif-seed-1',
            type: 'inquiry',
            title: 'New Client Inquiry',
            message: 'Aisha Khan filed consultation request for winter wedding wedding tablescapes on August 15 in DHA Phase 3, Karachi.',
            timestamp: new Date(Date.now() - 3600000).toLocaleString(),
            read: false
          },
          {
            id: 'notif-seed-2',
            type: 'feedback',
            title: 'New Feedback Received',
            message: 'Hamza Yusuf gave 4-star experience review: "Beautiful decor, very premium!"',
            timestamp: new Date(Date.now() - 7200000).toLocaleString(),
            read: false
          }
        ];
        
        list.unshift(newNotif);
        localStorage.setItem('aura_notifications', JSON.stringify(list));
        setUnreadCount(list.filter((n: any) => !n.read).length);
        
        // Dispatch event to sync panels instantly
        window.dispatchEvent(new Event('aura_web_config_updated'));
      } catch (err) {
        console.error("Failed to persist notification", err);
      }
      
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 1500);
  };

  // Testimonial submission
  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackName || !feedbackContent) {
      alert("Please provide your name and experience feedback.");
      return;
    }
    setIsSubmittingFeedback(true);

    // Force کراچی / Karachi on location
    let finalLocation = feedbackLocation.trim();
    if (!finalLocation.toLowerCase().includes("karachi")) {
      finalLocation += ", Karachi";
    }

    const testId = 'test-' + Date.now();
    const newTestimonial = {
      id: testId,
      name: feedbackName,
      eventType: feedbackEvent || 'Exclusive Custom Celebration',
      content: `“${feedbackContent}”`,
      rating: feedbackRating,
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      location: finalLocation
    };

    // Create notification for feed trigger
    const newNotif = {
      id: 'notif-' + Date.now(),
      type: 'feedback',
      title: 'New Feedback Received',
      message: `${feedbackName} gave a ${feedbackRating}-star experience review: "${feedbackContent}" from ${finalLocation}.`,
      timestamp: new Date().toLocaleString(),
      read: false,
      metadata: newTestimonial
    };

    setTimeout(() => {
      try {
        // Save to dynamic testimonials database
        const updatedTestimonials = [newTestimonial, ...dynamicTestimonials];
        localStorage.setItem('aura_dynamic_testimonials', JSON.stringify(updatedTestimonials));
        setDynamicTestimonials(updatedTestimonials);

        // Save to notifications
        const rawNotifs = localStorage.getItem('aura_notifications');
        const list = rawNotifs ? JSON.parse(rawNotifs) : [];
        list.unshift(newNotif);
        localStorage.setItem('aura_notifications', JSON.stringify(list));
        setUnreadCount(list.filter((n: any) => !n.read).length);

        // Dispatch sync event
        window.dispatchEvent(new Event('aura_web_config_updated'));
      } catch (err) {
        console.error("Failed to publish feedback", err);
      }

      setIsSubmittingFeedback(false);
      setFeedbackSubmitted(true);
      // Reset form fields
      setFeedbackName('');
      setFeedbackEvent('');
      setFeedbackContent('');
      setFeedbackRating(5);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-ambient-layer text-white selection:bg-gold-accent selection:text-plum-950 font-sans relative">
      
      {/* Dynamic Style overrides for real-time Palette changes */}
      <style>{`
        :root {
          --color-plum-950: ${webConfig.colors.background_950 || '#050505'};
          --color-plum-900: ${webConfig.colors.background_900 || '#121212'};
          --color-gold-accent: ${webConfig.colors.gold_accent || '#d4af37'};
          --color-gold-light: ${webConfig.colors.gold_light || '#f6e6c2'};
          --color-textColor: ${webConfig.colors.textColor || '#ffffff'};
        }
        body, .min-h-screen {
          background-color: ${webConfig.colors.background_950 || '#050505'} !important;
          color: ${webConfig.colors.textColor || '#ffffff'} !important;
        }
        .bg-plum-950 { background-color: ${webConfig.colors.background_950 || '#050505'} !important; }
        .bg-plum-900 { background-color: ${webConfig.colors.background_900 || '#121212'} !important; }
        .bg-plum-900\\/40 { background-color: ${webConfig.colors.background_900 || '#121212'}66 !important; }
        .text-gold-accent { color: ${webConfig.colors.gold_accent || '#d4af37'} !important; }
        .border-gold-accent { border-color: ${webConfig.colors.gold_accent || '#d4af37'} !important; }
        .hover\\:bg-gold-accent:hover { background-color: ${webConfig.colors.gold_accent || '#d4af37'} !important; }
      `}</style>
      
      {/* Decorative starry particles / ambient background glows */}
      <div className="absolute top-0 left-0 w-full h-[800px] pointer-events-none overflow-hidden z-0">
        <div 
          className="absolute opacity-15 blur-[120px] rounded-full w-[450px] h-[450px] -top-32 -left-20 transition-all duration-1000"
          style={{ backgroundColor: activeSwatchGlow }}
        />
        <div className="absolute opacity-20 blur-[130px] rounded-full w-[500px] h-[500px] -top-10 -right-20 bg-purple-royal" />
      </div>

      {/* RUNNING ANNOUNCEMENT BANNER */}
      <div className="w-full bg-[#0c0c0e] border-b border-gold-dark/20 py-2.5 overflow-hidden relative z-50 select-none">
        <div className="flex animate-marquee whitespace-nowrap gap-8">
          <div className="flex items-center gap-8 shrink-0">
            {Array(4).fill("This website is under construction. Please DM for your order on social media pages or WhatsApp").map((text, idx) => (
              <span key={idx} className="flex items-center gap-3.5 font-sans uppercase font-semibold text-[10px] sm:text-[11px] tracking-widest text-gold-light">
                <Sparkles className="w-3.5 h-3.5 text-gold-accent animate-pulse" />
                <span>{text}</span>
              </span>
            ))}
          </div>
          {/* Duplicate for seamless infinite loop */}
          <div className="flex items-center gap-8 shrink-0 font-medium" aria-hidden="true">
            {Array(4).fill("This website is under construction. Please DM for your order on social media pages or WhatsApp").map((text, idx) => (
              <span key={`dup-${idx}`} className="flex items-center gap-3.5 font-sans uppercase font-semibold text-[10px] sm:text-[11px] tracking-widest text-gold-light">
                <Sparkles className="w-3.5 h-3.5 text-gold-accent animate-pulse" />
                <span>{text}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* FIXED GLASS NAVIGATION HEADER */}
      <header id="nav-header" className="sticky top-0 z-50 backdrop-blur-md bg-plum-950/80 border-b border-gold-dark/20 py-3 sm:py-4 px-3 sm:px-6 md:px-12 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer select-none" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            {/* Elegant Logo Image Frame without circular truncation or redundant sidebar text */}
            <div id="brand-logo-crest" className="relative group shrink-0 flex items-center pr-2">
              <img 
                src={resolveImgUrl("/images/aura_logo_1781397175518.jpg")} 
                alt="Aura Celebrations" 
                className="h-16 sm:h-20 lg:h-24 w-auto object-contain rounded border border-gold-dark/15 group-hover:border-gold-accent/40 shadow-xl transition-all duration-500 bg-black/60"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-1 right-2">
                <Sparkles className="w-3.5 h-3.5 text-gold-light animate-pulse" />
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav" className="hidden md:flex items-center gap-8">
            <button 
              id="nav-link-services"
              onClick={() => { setActiveTab('services'); scrollToSection('services-section'); }} 
              className={`text-xs uppercase tracking-widest transition-colors duration-300 ${activeTab === 'services' ? 'text-gold-accent font-medium' : 'text-champagne-light/70 hover:text-white'}`}
            >
              Services
            </button>
            <button 
              id="nav-link-moodboard"
              onClick={() => { setActiveTab('moodboard'); scrollToSection('moodboard-section'); }} 
              className={`text-xs uppercase tracking-widest transition-colors duration-300 ${activeTab === 'moodboard' ? 'text-gold-accent font-medium' : 'text-champagne-light/70 hover:text-white'}`}
            >
              Style Studio
            </button>
            <button 
              id="nav-link-estimator"
              onClick={() => { setActiveTab('estimator'); scrollToSection('estimator-section'); }} 
              className={`text-xs uppercase tracking-widest transition-colors duration-300 ${activeTab === 'estimator' ? 'text-gold-accent font-medium' : 'text-champagne-light/70 hover:text-white'}`}
            >
              Curation Blueprint
            </button>
            <button 
              id="nav-link-testimonials"
              onClick={() => { setActiveTab('testimonials'); scrollToSection('testimonials-section'); }} 
              className={`text-xs uppercase tracking-widest transition-colors duration-300 ${activeTab === 'testimonials' ? 'text-gold-accent font-medium' : 'text-champagne-light/70 hover:text-white'}`}
            >
              Appreciations
            </button>
          </nav>

          {/* Responsive Consultation CTA & Lock Trigger */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Admin Shield Console Switcher with Pulse Badge */}
            <button 
              id="admin-shield-toggle"
              onClick={() => setIsAdminOpen(true)}
              className="relative p-1.5 sm:p-2 rounded-full border border-gold-dark/20 hover:border-gold-accent text-champagne-light hover:text-gold-accent bg-plum-950/40 transition-all duration-300 flex items-center justify-center cursor-pointer group"
              title="Aura Governance Console"
            >
              <Shield className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 group-hover:scale-110 transition-transform duration-300" />
            </button>

            {/* Optimized Inquire Now elements preventing mobile overlap */}
            <button 
              id="nav-cta-contact"
              onClick={() => { setActiveTab('inquiry'); scrollToSection('inquiry-section'); }}
              className="group border border-gold-accent hover:bg-gold-accent hover:text-plum-950 transition-all duration-500 px-2 py-1 sm:px-4 sm:py-1.5 md:px-5 md:py-2 rounded text-[8px] sm:text-[10px] md:text-xs uppercase tracking-widest text-gold-accent font-semibold font-sans flex items-center gap-1 shrink-0 text-nowrap"
            >
              <span className="hidden min-[360px]:inline group-hover:text-plum-950 transition-colors duration-500">Inquire Now</span>
              <span className="min-[360px]:hidden group-hover:text-plum-950 transition-colors duration-500">Inquire</span>
              <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gold-accent group-hover:text-plum-950 transition-colors duration-500" />
            </button>

            {/* Hamburger Menu Toggle on Mobile */}
            <button 
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-1.5 sm:p-2 rounded border border-gold-dark/20 hover:border-gold-accent text-champagne-light hover:text-gold-accent bg-plum-950/40 transition-all duration-300 flex items-center justify-center cursor-pointer"
              title="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE NAV DROPDOWN MENU WITH ANIMATED FADE AND COLLAPSE */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-plum-950/95 border-b border-gold-dark/20 backdrop-blur-md overflow-hidden sticky top-[65px] sm:top-[74px] z-40 text-center py-4 shadow-xl"
          >
            <div className="flex flex-col gap-4 px-6">
              <button 
                onClick={() => { setIsMobileMenuOpen(false); setActiveTab('services'); scrollToSection('services-section'); }} 
                className={`py-2 text-[11px] uppercase tracking-[0.2em] font-sans border-b border-gold-dark/5 transition-colors text-center ${activeTab === 'services' ? 'text-gold-accent font-semibold' : 'text-champagne-light/75 hover:text-white'}`}
              >
                Services
              </button>
              <button 
                onClick={() => { setIsMobileMenuOpen(false); setActiveTab('moodboard'); scrollToSection('moodboard-section'); }} 
                className={`py-2 text-[11px] uppercase tracking-[0.2em] font-sans border-b border-gold-dark/5 transition-colors text-center ${activeTab === 'moodboard' ? 'text-gold-accent font-semibold' : 'text-champagne-light/75 hover:text-white'}`}
              >
                Style Studio
              </button>
              <button 
                onClick={() => { setIsMobileMenuOpen(false); setActiveTab('estimator'); scrollToSection('estimator-section'); }} 
                className={`py-2 text-[11px] uppercase tracking-[0.2em] font-sans border-b border-gold-dark/5 transition-colors text-center ${activeTab === 'estimator' ? 'text-gold-accent font-semibold' : 'text-champagne-light/75 hover:text-white'}`}
              >
                Curation Blueprint
              </button>
              <button 
                onClick={() => { setIsMobileMenuOpen(false); setActiveTab('testimonials'); scrollToSection('testimonials-section'); }} 
                className={`py-2 text-[11px] uppercase tracking-[0.2em] font-sans border-b border-gold-dark/5 transition-colors text-center ${activeTab === 'testimonials' ? 'text-gold-accent font-semibold' : 'text-champagne-light/75 hover:text-white'}`}
              >
                Appreciations
              </button>
              <button 
                onClick={() => { setIsMobileMenuOpen(false); setIsAdminOpen(true); }} 
                className="py-2 text-[11px] uppercase tracking-[0.2em] font-sans text-gold-accent hover:text-gold-light border-b border-gold-dark/5 flex items-center justify-center gap-1.5 font-medium"
              >
                <Shield className="w-3.5 h-3.5" /> Governance Console
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION WITH OVERLAPPING LAYOUT */}
      {webConfig.sections.find(s => s.id === 'hero-section')?.enabled !== false && (
        <section id="hero-section" className="relative pt-12 pb-24 px-6 md:px-12 max-w-7xl mx-auto z-10 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content Column */}
            <div className="md:col-span-7 lg:col-span-6 w-full space-y-8 text-left z-20">
              <div className="inline-flex items-center gap-2 border border-gold-dark/30 bg-plum-900/50 px-3 py-1.5 rounded-full text-xs text-gold-light tracking-wide backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5 text-gold-accent" />
                <span>{webConfig.hero.subtitle || 'Couture Event Styling & Tableaux Architecture'}</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-serif text-white leading-none tracking-tight">
                  {webConfig.hero.title || 'Aura Celebrations'}
                  <br />
                  <span className="text-gold-accent italic">of Opulence</span>
                </h1>
                <p className="text-lg text-champagne-light/80 font-serif font-light max-w-xl leading-relaxed">
                  {webConfig.hero.description || 'Artfully curated tablescapes, moody candlelit environments, and magnificent seasonal floral designs engineered to tell your most magnificent aesthetic story.'}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                <button 
                  id="hero-btn-discover"
                  onClick={() => scrollToSection('moodboard-section')}
                  className="bg-gold-accent hover:bg-gold-light text-plum-950 px-6 py-3 text-xs font-semibold uppercase tracking-widest rounded transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-gold-accent/10"
                >
                  <span>Curate Your Moodboard</span>
                  <Compass className="w-4 h-4" />
                </button>
                <button 
                  id="hero-btn-estimator"
                  onClick={() => scrollToSection('estimator-section')}
                  className="border border-champagne-dark/50 hover:border-gold-accent hover:text-gold-light px-6 py-3 text-xs font-semibold uppercase tracking-widest rounded transition-all duration-300 text-champagne-light flex items-center justify-center gap-2"
                >
                  Assemble Blueprint
                </button>
              </div>

              {/* Quick trust metrics */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gold-dark/20 max-w-md">
                <div>
                  <span className="block text-2xl font-serif text-gold-accent">140+</span>
                  <span className="text-[10px] uppercase tracking-wider text-champagne-light/60">Grand Galas</span>
                </div>
                <div>
                  <span className="block text-2xl font-serif text-gold-accent">12+</span>
                  <span className="text-[10px] uppercase tracking-wider text-champagne-light/60">Seasons Styled</span>
                </div>
                <div>
                  <span className="block text-2xl font-serif text-gold-accent">100%</span>
                  <span className="text-[10px] uppercase tracking-wider text-champagne-light/60">Bespoke Design</span>
                </div>
              </div>
            </div>

            {/* Hero Right Visual Column - Overlapping Geometric Frame Design */}
            <div className="md:col-span-5 lg:col-span-6 w-full relative flex justify-start md:justify-end">
              <div className="relative w-full max-w-lg aspect-[11/12] sm:aspect-square md:aspect-[4/5] lg:aspect-square">
                {/* Backing Gold wireframe diamond accent */}
                <div className="absolute -inset-4 border border-gold-accent/20 rotate-3 rounded z-0 pointer-events-none" />
                {/* Outer Deep Plum background offset block */}
                <div className="absolute top-8 left-8 right-0 bottom-0 bg-gradient-to-br from-purple-royal to-plum-900 border border-gold-dark/10 rounded shadow-2xl z-0" />
                
                {/* Main Image frame */}
                <div className="absolute top-0 left-0 right-6 bottom-6 overflow-hidden rounded border border-gold-accent shadow-2xl z-10 group">
                  <img 
                    id="hero-main-img"
                    src={resolveImgUrl(webConfig.hero.image || '/images/celestique_hero_1781396253917.jpg')}
                    alt="High-end curated wedding reception tablescape design by Aura Celebrations"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Image Overlay Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-plum-950/90 via-plum-950/20 to-transparent pointer-events-none" />
                  
                  {/* Tiny Floating Gold Accent Details */}
                  <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                    <div className="space-y-1">
                      <span className="text-[9px] uppercase tracking-[0.3em] text-gold-light/80 block">Featured Presentation</span>
                      <span className="font-serif text-lg tracking-wide text-white block">Imperial Plum & Gold Solstice</span>
                    </div>
                    <div className="flex gap-1">
                      <Star className="w-3.5 h-3.5 text-gold-accent fill-gold-accent" />
                      <Star className="w-3.5 h-3.5 text-gold-accent fill-gold-accent" />
                      <Star className="w-3.5 h-3.5 text-gold-accent fill-gold-accent" />
                    </div>
                  </div>
                </div>

                {/* Overlapping small detail badge */}
                <div className="absolute -bottom-2 -left-4 bg-plum-900 border border-gold-accent py-4 px-5 rounded shadow-xl z-20 max-w-[200px] text-left">
                  <div className="flex items-center gap-1 text-gold-accent mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span className="text-[10px] tracking-widest font-mono">ESTABLISHED</span>
                  </div>
                  <p className="font-serif text-sm text-champagne-light italic">"Every tablescape a masterpiece, every candle a story."</p>
                </div>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* PHILOSOPHY & ATMOSPHERICS BRIEF */}
      <section className="bg-plum-900/30 border-y border-gold-dark/15 py-16 px-6 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Star className="w-5 h-5 text-gold-accent mx-auto animate-spin" style={{ animationDuration: '6s' }} />
          <h2 className="text-3xl md:text-4xl font-serif tracking-wide text-gold-accent">The Philosophy of Aura Celebrations</h2>
          <p className="text-champagne-light/80 font-sans leading-relaxed text-sm md:text-base max-w-2xl mx-auto">
            We believe that extraordinary occasions are not simply planned; they are orchestrated as magnificent sensory memories. We replace ordinary event production with spatial drama—layering rich velvet linens, handcrafted table architectures, heavy vintage crystal goblets, and custom architectural scenting to cast an unforgettable spell over your guests.
          </p>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold-accent to-transparent mx-auto pt-2" />
        </div>
      </section>

      {/* CORE LUXURY SERVICES SECTION */}
      {webConfig.sections.find(s => s.id === 'services-section')?.enabled !== false && (
        <section id="services-section" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10 animate-fade-in">
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs uppercase tracking-[0.4em] text-gold-accent">THE ARTISAN COLLECTION</span>
            <h2 className="text-4xl md:text-5xl font-serif text-white">Our Styling Foundations</h2>
            <p className="text-champagne-light/60 max-w-lg mx-auto text-sm">
              Invest in peerless craftsmanship, tailored exclusively to your location and guest dynamics.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {dynamicServices.map((srv, idx) => (
              <div 
                key={srv.id} 
                id={`service-card-${srv.id}`}
                className="bg-plum-900/40 border border-gold-dark/20 rounded-lg overflow-hidden flex flex-col justify-between group hover:border-gold-accent/40 transition-all duration-500 hover:-translate-y-1 block shadow-xl"
              >
                <div>
                  {/* Hover zoom picture */}
                  <div className="h-64 overflow-hidden relative">
                    <img 
                      src={resolveImgUrl(srv.image)} 
                      alt={srv.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-plum-950 via-transparent to-transparent opacity-60 pointer-events-none" />
                    
                    {/* Miniature index badge */}
                    <div className="absolute top-4 right-4 bg-plum-950/85 border border-gold-accent/30 text-gold-accent py-1 px-2 text-[10px] tracking-widest uppercase font-mono rounded">
                      0{idx + 1}
                    </div>
                  </div>

                  <div className="p-8 space-y-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-gold-light/70 block mb-1">{srv.subtitle}</span>
                      <h3 className="text-2xl font-serif text-white tracking-wide group-hover:text-gold-accent transition-colors duration-300">{srv.title}</h3>
                    </div>
                    <p className="text-xs text-champagne-light/75 leading-relaxed">{srv.description}</p>
                  </div>
                </div>

                {/* Price and Features footer */}
                <div className="px-8 pb-8 space-y-6">
                  <div className="space-y-2 border-t border-gold-dark/10 pt-4">
                    <span className="text-[10px] uppercase tracking-wider text-champagne-light/50 block">Included Services Include:</span>
                    <ul className="space-y-1.5">
                      {srv.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2 text-[11px] text-champagne-light/80">
                          <Check className="w-3.5 h-3.5 text-gold-accent shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-champagne-light/40 block">styling from</span>
                      <span className="text-xl font-serif text-gold-accent font-semibold">₨ {srv.priceStart.toLocaleString()}</span>
                    </div>
                    <button 
                      id={`service-btn-${srv.id}`}
                      onClick={() => {
                        if (!selectedServices.includes(srv.id)) {
                          toggleService(srv.id);
                        }
                        scrollToSection('estimator-section');
                      }}
                      className="border border-gold-dark/40 hover:border-gold-accent group-hover:bg-gold-accent group-hover:text-plum-950 py-2 px-4 rounded text-[10px] uppercase tracking-widest font-semibold transition-all duration-300"
                    >
                      Select Module
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* INTERACTIVE COMPREHENSIVE DESIGN STUDIO & MOODBOARD */}
      {webConfig.sections.find(s => s.id === 'moodboard-section')?.enabled !== false && (
        <section id="moodboard-section" className="py-24 px-6 md:px-12 bg-plum-900/20 border-y border-gold-dark/15 relative z-10 animate-fade-in">
          <div className="max-w-7xl mx-auto">
            
            <div className="text-center space-y-4 mb-16">
              <span className="text-xs uppercase tracking-[0.4em] text-gold-accent">COUTURE CREATION ENGINE</span>
              <h2 className="text-4xl md:text-5xl font-serif text-white">Interactive Styling Studio</h2>
              <p className="text-champagne-light/60 max-w-lg mx-auto text-sm">
                Combine your seasonal timeframe with your requested aesthetic scale to discover a mathematically harmonious design blueprint.
              </p>
            </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Interactive Selectors Column (4 Cols) */}
            <div className="lg:col-span-4 space-y-8 bg-plum-950/70 border border-gold-dark/25 p-5 sm:p-8 rounded-lg backdrop-blur-sm shadow-xl">
              
              {/* Step 1: Select Season */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-6 h-6 rounded-full bg-gold-accent/15 text-gold-accent flex items-center justify-center text-xs font-semibold">1</span>
                  <label className="text-[11px] uppercase tracking-[0.2em] font-medium text-gold-light">CHOOSE SEASON</label>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {(['Autumn Luxe', 'Regal Winter', 'Spring Opulence', 'Gilded Summer'] as SeasonType[]).map(season => (
                    <button 
                      key={season}
                      id={`btn-season-${season.toLowerCase().replace(' ', '-')}`}
                      onClick={() => {
                        setSelectedSeason(season);
                        // Reset swatch back color on season change
                        const fallbackProp = getStyleProposal(season, selectedVibe);
                        if (fallbackProp.palette.length > 0) {
                          setActiveSwatchGlow(fallbackProp.palette[0].hex);
                        }
                      }}
                      className={`py-3 px-4 rounded text-xs tracking-wider transition-all duration-300 border font-sans text-center ${selectedSeason === season ? 'bg-gold-accent text-plum-950 border-gold-accent font-semibold shadow-md' : 'bg-plum-900/30 border-gold-dark/20 text-champagne-light/75 hover:border-gold-accent/50'}`}
                    >
                      {season}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Select Mood/Vibe */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-6 h-6 rounded-full bg-gold-accent/15 text-gold-accent flex items-center justify-center text-xs font-semibold">2</span>
                  <label className="text-[11px] uppercase tracking-[0.2em] font-medium text-gold-light">CHOOSE SCENIC VIBE</label>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {(['Moody Candlelit', 'Modern Luxe', 'Vintage Grandeur', 'Ethereal Romantic'] as VibeType[]).map(vibe => (
                    <button 
                      key={vibe}
                      id={`btn-vibe-${vibe.toLowerCase().replace(' ', '-')}`}
                      onClick={() => {
                        setSelectedVibe(vibe);
                        const fallbackProp = getStyleProposal(selectedSeason, vibe);
                        if (fallbackProp.palette.length > 0) {
                          setActiveSwatchGlow(fallbackProp.palette[0].hex);
                        }
                      }}
                      className={`py-3 px-4 rounded text-xs tracking-wider transition-all duration-300 border font-sans text-center ${selectedVibe === vibe ? 'bg-gold-accent text-plum-950 border-gold-accent font-semibold shadow-md' : 'bg-plum-900/30 border-gold-dark/20 text-champagne-light/75 hover:border-gold-accent/50'}`}
                    >
                      {vibe}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Information Display Box */}
              <div className="p-4 bg-plum-900/40 rounded border border-gold-dark/10 text-xs text-champagne-light/70 space-y-2">
                <p className="font-serif italic text-gold-accent text-sm">"Our Curation Philosophy"</p>
                <p className="leading-relaxed">
                  Choosing parameters aligns custom materials, florist reserves, and physical table drapings instantly. Click on the color swatches to dynamically alter the ambient background studio light.
                </p>
              </div>

            </div>

            {/* Live Generated Master Moodboard Card Column (8 Cols) */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={`${selectedSeason}-${selectedVibe}`}
                  id="style-studio-board"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="bg-plum-950/80 border-2 border-gold-accent/40 rounded-xl p-4 sm:p-8 md:p-12 shadow-2xl relative overflow-hidden backdrop-blur-md"
                >
                  {/* Subtle Glowing Spot behind content card */}
                  <div 
                    className="absolute opacity-25 blur-[120px] rounded-full w-[350px] h-[350px] -bottom-20 -right-20 pointer-events-none transition-all duration-700" 
                    style={{ backgroundColor: activeSwatchGlow }}
                  />

                  {/* Top Accented border header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-gold-dark/20 gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-gold-accent mb-1 text-[11px] tracking-widest font-mono uppercase">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Aura Celebrations Concept</span>
                      </div>
                      <h3 className="text-3xl md:text-4xl font-serif text-white tracking-wide">{currentProposal.title}</h3>
                    </div>
                    
                    {/* Active Style Identifiers */}
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-plum-900 border border-gold-dark/40 rounded text-[10px] tracking-widest uppercase text-champagne-light">{currentProposal.season}</span>
                      <span className="px-3 py-1 bg-gold-accent/15 border border-gold-accent/30 rounded text-[10px] tracking-widest uppercase text-gold-accent">{currentProposal.vibe}</span>
                    </div>
                  </div>

                  {/* Body grid inside proposal */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 items-start">
                    
                    {/* Descriptions and Color swatches (7 cols) */}
                    <div className="md:col-span-7 space-y-6">
                      <p className="text-sm text-champagne-light/90 leading-relaxed font-sans">{currentProposal.description}</p>
                      
                      {/* Color Palette Swatches */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase tracking-wider text-gold-accent block font-mono">1. HARMONIZED DESIGN PALETTE</span>
                          <span className="text-[9px] text-champagne-light/40 italic">Click color to illuminate studio</span>
                        </div>
                        
                        <div className="grid grid-cols-4 gap-3">
                          {currentProposal.palette.map((color, cIdx) => (
                            <button
                              key={cIdx}
                              id={`panel-swatch-${color.name.toLowerCase().replace(' ', '-')}`}
                              onClick={() => setActiveSwatchGlow(color.hex)}
                              className="group text-left space-y-2 focus:outline-none"
                            >
                              <div className="h-14 rounded shadow-inner border border-white/10 relative transition-transform duration-300 hover:scale-105" style={{ backgroundColor: color.hex }}>
                                {activeSwatchGlow === color.hex && (
                                  <div className="absolute inset-0 border-2 border-gold-accent rounded flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-white animate-ping" />
                                  </div>
                                )}
                              </div>
                              <div>
                                <span className="text-[9px] font-semibold text-white block truncate leading-none">{color.name}</span>
                                <span className="text-[8px] font-mono text-champagne-light/50 uppercase">{color.hex}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Textures and details */}
                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="p-3 bg-plum-900/30 rounded border border-gold-dark/10">
                          <span className="text-[9px] uppercase tracking-wider text-gold-accent font-mono block mb-1">DESIGNED TEXTURES</span>
                          <p className="text-[11px] text-champagne-light/85 leading-relaxed">{currentProposal.textures.join(', ')}</p>
                        </div>
                        <div className="p-3 bg-plum-900/30 rounded border border-gold-dark/10">
                          <span className="text-[9px] uppercase tracking-wider text-gold-accent font-mono block mb-1">ATMOSPHERIC LIGHTING</span>
                          <p className="text-[11px] text-champagne-light/85 leading-relaxed">{currentProposal.lighting}</p>
                        </div>
                      </div>

                    </div>

                    {/* Florals lists with elegant background detail (5 cols) */}
                    <div className="md:col-span-5 bg-plum-900/40 border border-gold-dark/20 p-6 rounded-lg space-y-4">
                      <div className="flex items-center gap-1.5 border-b border-gold-dark/20 pb-3">
                        <Flower className="w-4 h-4 text-gold-accent" />
                        <span className="text-[10px] uppercase tracking-wider text-gold-accent font-mono">2. FLORISTIC DIRECTIVE</span>
                      </div>
                      
                      <ul id="florals-directive-list" className="space-y-3">
                        {currentProposal.florals.map((flora, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-3 text-xs text-champagne-light/90">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold-accent shrink-0 animate-pulse" />
                            <span>{flora}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="pt-4 border-t border-gold-dark/15 text-[10px] text-champagne-light/50 italic leading-relaxed">
                        *Florals subject to climate variables; alternatives chosen comply strictly with the palette profile.
                      </div>
                    </div>

                  </div>

                  {/* Actions Bar inside proposal */}
                  <div className="mt-8 pt-8 border-t border-gold-dark/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-champagne-light/60 text-center sm:text-left">
                      Loving this template? Adopt this color profile and floristics immediately inside our consultation blueprint form.
                    </p>
                    <button 
                      id="adopt-proposal-btn"
                      onClick={() => adoptProposal(currentProposal)}
                      className="bg-gold-accent hover:bg-gold-light text-plum-950 py-3 px-6 rounded text-xs uppercase tracking-widest font-semibold font-sans transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-2"
                    >
                      <span>Adopt This Aesthetic</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

          </div>

        </div>
      </section>
      )}

      {/* CURATED HIGHLIGHTS PORTFOLIO */}
      {webConfig.sections.find(s => s.id === 'highlights-section')?.enabled !== false && (
        <section id="highlights-section" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10 animate-fade-in">
          <div className="text-center space-y-4 mb-8">
            <span className="text-xs uppercase tracking-[0.4em] text-gold-accent">ATMOSPHERIC REPERTOIRE</span>
            <h2 className="text-4xl md:text-5xl font-serif text-white">Highlights</h2>
            <p className="text-champagne-light/60 max-w-lg mx-auto text-sm">
              Explore our custom signature setups across distinct celebration styles, from high-end corporate displays to grand matrimonial phases.
            </p>
          </div>

        {/* Real-time Text Search Bar */}
        <div className="max-w-md mx-auto mb-8 relative px-4 w-full">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gold-accent/70" />
            </span>
            <input
              type="text"
              value={highlightsSearchQuery}
              onChange={(e) => setHighlightsSearchQuery(e.target.value)}
              placeholder="Search setups (e.g., marigold, jasmine, crimson, sage...)"
              className="w-full pl-10 pr-10 py-3 bg-plum-950/60 border border-gold-dark/30 rounded-full text-xs text-white placeholder-champagne-light/40 focus:outline-none focus:border-gold-accent focus:ring-1 focus:ring-gold-accent/40 transition-all duration-300 shadow-inner"
            />
            {highlightsSearchQuery && (
              <button
                onClick={() => setHighlightsSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-champagne-light/50 hover:text-gold-accent transition-colors block"
                title="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Category Filtering Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-3 mb-16 max-w-3xl mx-auto">
          {(['all', 'Birthday', 'Nikah', 'Wedding', 'Corporate'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setActiveHighlightCategory(cat)}
              className={`py-2.5 px-6 rounded-full text-xs tracking-wider uppercase font-sans transition-all duration-300 border ${
                activeHighlightCategory === cat 
                  ? 'bg-gold-accent text-plum-950 border-gold-accent font-semibold shadow-lg shadow-gold-accent/15'
                  : 'bg-plum-900/30 border-gold-dark/20 text-champagne-light/75 hover:border-gold-accent/40'
              }`}
            >
              {cat === 'all' ? 'All Portfolios' : cat}
            </button>
          ))}
        </div>

        {/* Filtered Grid with smooth layout animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredHighlights.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-16 bg-plum-950/45 border border-gold-dark/15 rounded-xl space-y-4"
              >
                <div className="w-12 h-12 rounded-full bg-gold-accent/10 flex items-center justify-center mx-auto">
                  <Search className="w-5 h-5 text-gold-accent" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-gold-light font-serif text-lg">No Matching Portfolio Found</h4>
                  <p className="text-xs text-champagne-light/50 max-w-sm mx-auto leading-relaxed">
                    We couldn't find any setups matching "{highlightsSearchQuery}". Try looking up different floral names or layout styles.
                  </p>
                </div>
                <button 
                  onClick={() => { setHighlightsSearchQuery(''); setActiveHighlightCategory('all'); }}
                  className="px-4 py-2 text-xs bg-gold-accent/10 border border-gold-accent/20 rounded hover:bg-gold-accent/25 hover:border-gold-accent text-gold-accent font-sans uppercase tracking-widest transition-all duration-300 cursor-pointer"
                >
                  Reset Filtering
                </button>
              </motion.div>
            ) : (
              filteredHighlights.map((highlight) => (
                <motion.div
                  key={highlight.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="group relative flex flex-col justify-between"
                >
                  {/* Backing structural double gold line outline */}
                  <div className="absolute inset-0 border border-gold-accent/10 translate-x-3 translate-y-3 rounded-lg -z-10 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-500" />
                  
                  <div 
                    onClick={() => setSelectedHighlight(highlight)}
                    className="bg-plum-950 border border-gold-dark/25 rounded-lg overflow-hidden shadow-2xl relative flex flex-col h-full justify-between cursor-pointer hover:border-gold-accent/50 group-hover:border-gold-accent/40 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.12)] transition-all duration-500"
                  >
                    {/* Photo container */}
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img 
                        src={resolveImgUrl(highlight.image)} 
                        alt={highlight.title} 
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      {/* Hover state luxury action overlay */}
                      <div className="absolute inset-0 bg-plum-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                        <span className="py-2.5 px-5 bg-plum-950/90 border border-gold-accent hover:bg-gold-accent hover:!text-plum-950 text-gold-accent font-serif text-xs uppercase tracking-widest rounded transition-all duration-300 shadow-xl font-medium">
                          Discover Specifications
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-plum-950/80 via-transparent to-transparent pointer-events-none" />
                      
                      {/* Category Overlay Tag */}
                      <span className="absolute top-4 left-4 bg-plum-950/90 border border-gold-accent/40 text-[9px] uppercase tracking-[0.25em] text-gold-accent font-semibold px-3 py-1 rounded-full backdrop-blur-sm z-10">
                        {highlight.category}
                      </span>
                    </div>

                  {/* Narrative details */}
                  <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="text-[10px] uppercase tracking-widest text-gold-light/65 block">{highlight.subtitle}</span>
                        {highlight.price && (
                          <span className="text-xs font-mono font-bold text-gold-accent bg-gold-accent/15 px-2 py-0.5 rounded border border-gold-accent/30 shrink-0">
                            ₨ {highlight.price.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <h3 className="font-serif text-xl text-white group-hover:text-gold-accent transition-colors duration-300">{highlight.title}</h3>
                      <p className="text-xs text-champagne-light/75 leading-relaxed font-sans line-clamp-2">{highlight.description}</p>
                    </div>

                    {/* Features checklist */}
                    <div className="pt-4 border-t border-gold-dark/10 space-y-4">
                      <ul className="space-y-1.5">
                        {highlight.features.slice(0, 3).map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-2 text-[10px] text-champagne-light/80 font-mono">
                            <Sparkles className="w-3 h-3 text-gold-accent shrink-0" />
                            <span className="truncate">{feat}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {/* Discover details text trigger */}
                      <div className="text-[10px] uppercase tracking-wider font-sans text-gold-accent group-hover:text-gold-light flex items-center justify-end gap-1 font-semibold pt-1">
                        View Detailed Concept <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
            )}
          </AnimatePresence>
        </div>
      </section>
      )}

      {/* INVESTMENT ESTIMATOR & CURATION BLUEPRINT */}
      {webConfig.sections.find(s => s.id === 'estimator-section')?.enabled !== false && (
        <section id="estimator-section" className="py-24 px-6 bg-plum-900/30 border-y border-gold-dark/15 relative z-10 animate-fade-in">
          <div className="max-w-7xl mx-auto">
            
            <div className="text-center space-y-4 mb-16">
              <span className="text-xs uppercase tracking-[0.4em] text-gold-accent">PROPOSAL COMPILATION</span>
              <h2 className="text-4xl md:text-5xl font-serif text-white">Assemble Your Blueprint</h2>
              <p className="text-champagne-light/60 max-w-lg mx-auto text-sm">
                Use our real-time estimation matrix to outline the volume scale of your event and compile a tailored styling itinerary.
              </p>
            </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Input estimation variables Form (7 Cols) */}
            <div className="lg:col-span-7 bg-plum-950/70 border border-gold-dark/20 rounded-lg p-4 sm:p-8 space-y-8 backdrop-blur-sm">
              <h3 className="text-2xl font-serif text-gold-accent border-b border-gold-dark/20 pb-4">Configure Scale & Modules</h3>

              {/* Slider for Guest Count */}
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <label className="uppercase tracking-widest text-gold-light font-mono font-semibold">1. EXCLUSIVITY SCALE (GUEST COUNT)</label>
                  <span className="bg-gold-accent/20 text-gold-accent px-2 py-0.5 rounded font-mono font-bold text-sm">{guestCount} Guests</span>
                </div>
                <input 
                  type="range"
                  min="20"
                  max="350"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full accent-gold-accent cursor-ew-resize h-1 bg-plum-800 rounded-lg appearance-none"
                />
                <div className="flex justify-between text-[10px] text-champagne-light/40 font-mono">
                  <span>Intimate Banquet (20)</span>
                  <span>Signature Grandeur (150)</span>
                  <span>Imperial Scale (350+)</span>
                </div>
              </div>

              {/* Checkboxes for services */}
              <div className="space-y-4">
                <label className="uppercase tracking-widest text-gold-light font-mono text-xs block font-semibold">2. INCLUDED DESIGN MODULES</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {dynamicServices.map(srv => {
                    const isSelected = selectedServices.includes(srv.id);
                    return (
                      <button
                        key={srv.id}
                        id={`module-select-btn-${srv.id}`}
                        onClick={() => toggleService(srv.id)}
                        className={`p-4 rounded-lg border text-left flex flex-col justify-between transition-all duration-300 ${isSelected ? 'bg-gold-accent/10 border-gold-accent shadow-lg shadow-gold-accent/5' : 'bg-plum-900/20 border-gold-dark/20 hover:border-gold-accent/50'}`}
                      >
                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-[9px] uppercase tracking-widest text-champagne-light/50 font-mono">Module</span>
                            <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${isSelected ? 'bg-gold-accent border-gold-accent text-plum-950' : 'border-gold-dark/40'}`}>
                              {isSelected && <Check className="w-2.5 h-2.5 stroke-[4px]" />}
                            </div>
                          </div>
                          <span className="font-serif text-base text-white block">{srv.title}</span>
                          <span className="text-[10px] text-champagne-light/60 block mt-0.5">{srv.subtitle}</span>
                        </div>
                        <span className="text-xs font-serif text-gold-accent mt-2 font-semibold">₨ {srv.priceStart.toLocaleString()}+</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Accent/Materials Tier Selection */}
              <div className="space-y-4">
                <label className="uppercase tracking-widest text-gold-light font-mono text-xs block font-semibold">3. MATERIALS & ACCENT HEIRLOOMS</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {([
                    { name: 'Standard', desc: 'Satin table cloths, classic brass candelabras, seasonal foliage' },
                    { name: 'Premium Elite', desc: 'Heavy velvet runners, dynamic pedestal centerpieces, tailored glass shields' },
                    { name: 'Imperial Couture', desc: 'Couture place settings, rare imports, overhead kinetic starry canopies' }
                  ] as { name: 'Standard' | 'Premium Elite' | 'Imperial Couture', desc: string }[]).map(tier => {
                    const isSelected = accentLevel === tier.name;
                    return (
                      <button
                        key={tier.name}
                        id={`tier-select-btn-${tier.name.toLowerCase().replace(' ', '-')}`}
                        onClick={() => setAccentLevel(tier.name)}
                        className={`p-4 rounded-lg border text-left space-y-2 transition-all duration-300 ${isSelected ? 'bg-gold-accent/15 border-gold-accent shadow-md' : 'bg-plum-900/20 border-gold-dark/20 hover:border-gold-accent/50'}`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-serif text-white font-bold">{tier.name}</span>
                          <div className={`w-3 h-3 rounded-full border flex items-center justify-center ${isSelected ? 'border-gold-accent bg-gold-accent' : 'border-gold-dark/40'}`} />
                        </div>
                        <p className="text-[10px] text-champagne-light/70 leading-relaxed">{tier.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Generated Real-Time Bill Curation Proposal Card (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div id="blueprint-receipt" className="bg-champagne-light border-y-4 border-gold-accent text-plum-950 rounded-lg p-4 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-accent/5 rounded-full blur-2xl pointer-events-none" />
                
                {/* Receipt Header */}
                <div className="text-center space-y-2 border-b border-plum-950/10 pb-6 relative">
                  <div className="w-12 h-12 rounded-full bg-plum-950 text-gold-light flex items-center justify-center mx-auto mb-2">
                    <FileText className="w-5 h-5 text-gold-accent" />
                  </div>
                  <span className="text-[9px] uppercase tracking-[0.25em] text-plum-950 font-bold block">PLANNING ENCLOSURE</span>
                  <h4 className="font-serif text-2xl tracking-wide text-plum-900">Styling Blueprint Draft</h4>
                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-plum-950/60 font-mono">
                    <Calendar className="w-3 h-3" />
                    <span>Projected Event Scope</span>
                  </div>
                </div>

                {/* Scope list */}
                <div className="space-y-4 text-xs font-mono">
                  <div className="flex justify-between text-plum-950/50 uppercase text-[9px] font-bold border-b border-plum-950/10 pb-1.5">
                    <span>Component Detail</span>
                    <span>Configuration</span>
                  </div>

                  <div className="flex justify-between text-plum-900">
                    <span className="font-semibold">Event Exclusivity:</span>
                    <span>{guestCount} Guests</span>
                  </div>
                  <div className="flex justify-between text-plum-900">
                    <span className="font-semibold">Bespoke Season Profile:</span>
                    <span>{selectedSeason}</span>
                  </div>
                  <div className="flex justify-between text-plum-900">
                    <span className="font-semibold">Aesthetic Tone:</span>
                    <span>{selectedVibe}</span>
                  </div>
                  <div className="flex justify-between text-plum-900">
                    <span className="font-semibold">Material Grade:</span>
                    <span>{accentLevel}</span>
                  </div>

                  <div className="space-y-1 pt-2">
                    <span className="text-[9px] text-plum-950/50 uppercase font-bold block">Included Installations:</span>
                    {selectedServices.length === 0 ? (
                      <span className="text-[11px] text-red-700 italic block">None selected. Tap modules to build.</span>
                    ) : (
                      <div className="space-y-1">
                        {selectedServices.map(srvId => {
                          const match = dynamicServices.find(s => s.id === srvId);
                          return (
                            <div key={srvId} className="flex justify-between text-[11px] text-plum-950/90 pl-2 border-l-2 border-gold-accent">
                              <span>{match?.title}</span>
                              <span>Included</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* Real-time Estimated Pricing Display */}
                <div className="bg-plum-950 text-white rounded p-4 font-serif text-center space-y-1 border border-gold-dark">
                  <span className="text-[9px] uppercase tracking-widest text-gold-accent font-mono block">PROJECTED INVESTMENT</span>
                  <div className="text-3xl text-gold-accent font-semibold">₨ {totalInvestmentEstimation.total.toLocaleString()}</div>
                  <span className="text-[10px] text-champagne-light/50 font-sans block">Estimated styling range: ₨ {totalInvestmentEstimation.rangeMin.toLocaleString()} - ₨ {totalInvestmentEstimation.rangeMax.toLocaleString()}*</span>
                </div>

                <div className="text-center font-serif text-[10px] text-plum-950/60 leading-normal italic">
                  *Proposals exclude venue rental fees, insurance, and long-distance cargo routing variables. Completed blueprints are locked during formal draft finalization.
                </div>

                {/* Attach to consultation action */}
                <button 
                  id="attach-blueprint-btn"
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      specialNotes: `Automated Blueprint Specs Applied: Season: ${selectedSeason}, Aesthetic: ${selectedVibe}, Scale Target: ${guestCount} Guests, Accent Level: ${accentLevel}. Estimative Budget Range: ₨ ${totalInvestmentEstimation.rangeMin.toLocaleString()} - ₨ ${totalInvestmentEstimation.rangeMax.toLocaleString()}`
                    }));
                    scrollToSection('inquiry-section');
                  }}
                  className="w-full bg-plum-950 hover:bg-plum-900 text-gold-accent py-3 px-6 rounded text-xs uppercase tracking-widest font-semibold font-sans transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
                >
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  <span>Transfer Blueprint to Inquiry</span>
                </button>
              </div>

              {/* Informative reassurance text */}
              <div className="p-4 bg-plum-900/20 border border-gold-dark/10 rounded text-xs text-champagne-light/60 flex gap-3">
                <Clock className="w-5 h-5 text-gold-accent shrink-0 mt-0.5" />
                <p>
                  Blueprint configurations are directly submitted in our core queue upon final inquiry. High-end clients receive immediate scheduling callbacks within 24 operational hours.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>
      )}

      {/* RE-ASSURING TESTIMONIALS SECTIONS (Bento Grid) */}
      {webConfig.sections.find(s => s.id === 'testimonials-section')?.enabled !== false && (
        <section id="testimonials-section" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10 animate-fade-in">
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs uppercase tracking-[0.4em] text-gold-accent font-sans">CLIENT APPRECIATIONS</span>
            <h2 className="text-4xl md:text-5xl font-serif text-white">Words of Splendor</h2>
            <p className="text-champagne-light/60 max-w-lg mx-auto text-sm font-sans">
              Read critical notes of approval sent by patrons who requested outstanding physical events.
            </p>
          </div>

          {/* Bento Grid layout style */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {allTestimonials.map((t, idx) => (
            <div 
              key={t.id} 
              id={`testimonial-card-${t.id}`}
              className={`p-8 bg-plum-900/30 border border-gold-dark/20 rounded-lg space-y-6 relative flex flex-col justify-between hover:border-gold-accent/40 transition-all duration-500 shadow-xl ${idx === 1 ? 'lg:scale-[1.03] lg:border-gold-accent/35 lg:bg-plum-900/50' : ''}`}
            >
              <div className="space-y-4">
                {/* Five star rating graphics */}
                <div className="flex gap-1.5">
                  {[...Array(t.rating)].map((_, rIdx) => (
                    <Star key={rIdx} className="w-4 h-4 text-gold-accent fill-gold-accent" />
                  ))}
                </div>

                <p className="text-[13px] md:text-sm text-champagne-light/90 italic leading-relaxed font-serif font-light">
                  {t.content}
                </p>
              </div>

              {/* Patron Bio signature details */}
              <div className="flex items-center justify-between border-t border-gold-dark/15 pt-4">
                <div>
                  <h5 className="font-serif text-sm text-white font-medium tracking-wide">{t.name}</h5>
                  <span className="text-[10px] text-champagne-light/60 block">{t.eventType}</span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] uppercase tracking-wider text-gold-accent block font-mono font-medium">{t.location}</span>
                  <span className="text-[8px] text-champagne-light/40 block font-mono">{t.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      )}

      {/* BRAND INQUIRY SECTION (CRISP WHITE CARD WITH DEEP BACKGROUND CONTRAST) */}
      {webConfig.sections.find(s => s.id === 'inquiry-section')?.enabled !== false && (
        <section id="inquiry-section" className="py-24 px-6 md:px-12 relative z-10 animate-fade-in">
          <div className="max-w-4xl mx-auto">
            
            <div className="text-center space-y-4 mb-16">
              <span className="text-xs uppercase tracking-[0.4em] text-gold-accent">SECURE YOUR PLACEMENT</span>
              <h2 className="text-4xl md:text-5xl font-serif text-white">Begin the Curation</h2>
              <p className="text-champagne-light/60 max-w-lg mx-auto text-sm">
                We accept only three client commissions per styling season to preserve impeccable white-glove quality. Submit your inquiry below.
              </p>
            </div>

          <div className="relative">
            {/* Geometric shadow backs */}
            <div className="absolute inset-4 bg-purple-royal/20 rounded-xl blur-3xl pointer-events-none -z-10" />

            {/* CRISP WHITE CONTENT CARD - Contrasted purposefully against the regal deep purple backdrop */}
            <div id="booking-container" className="bg-white text-plum-950 rounded-xl p-5 sm:p-8 md:p-12 shadow-2xl relative overflow-hidden">
              
              {/* Inner ambient details in gray */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-champagne-light rounded-bl-full -z-0 pointer-events-none opacity-40" />

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6 border-b border-plum-950/10 pb-4">
                  <Sparkles className="w-5 h-5 text-gold-dark" />
                  <span className="font-serif text-lg tracking-wider text-plum-900 font-semibold">The Grand Consultation Intake</span>
                </div>

                {!formSubmitted ? (
                  <form id="consultation-inquiry-form" onSubmit={handleInquirySubmit} className="space-y-6">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Full Name input */}
                      <div className="space-y-1.5 text-left">
                        <label htmlFor="fullName" className="text-[10px] uppercase tracking-widest text-plum-900/60 font-mono block font-semibold">Full Legal Name *</label>
                        <input 
                          type="text" 
                          id="fullName" 
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData(p => ({ ...p, fullName: e.target.value }))}
                          placeholder="Zainab Muzamil (or Ayesha & Bilal)"
                          className="w-full bg-champagne-light/50 border border-plum-950/10 rounded px-4 py-3 text-sm text-plum-950 placeholder-plum-950/40 focus:outline-none focus:border-gold-accent transition-colors"
                        />
                      </div>

                      {/* Email input */}
                      <div className="space-y-1.5 text-left">
                        <label htmlFor="email" className="text-[10px] uppercase tracking-widest text-plum-900/60 font-mono block font-semibold">Secure Email Address *</label>
                        <input 
                          type="email" 
                          id="email" 
                          required
                          value={formData.email}
                          onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                          placeholder="zainab.muzamil@outlook.pk"
                          className="w-full bg-champagne-light/50 border border-plum-950/10 rounded px-4 py-3 text-sm text-plum-950 placeholder-plum-950/40 focus:outline-none focus:border-gold-accent transition-colors"
                        />
                      </div>

                      {/* Phone input */}
                      <div className="space-y-1.5 text-left">
                        <label htmlFor="phone" className="text-[10px] uppercase tracking-widest text-plum-900/60 font-mono block font-semibold">Contact Telephone *</label>
                        <input 
                          type="tel" 
                          id="phone" 
                          value={formData.phone}
                          onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))}
                          placeholder="+92 (300) 123-4567"
                          className="w-full bg-champagne-light/50 border border-plum-950/10 rounded px-4 py-3 text-sm text-plum-950 placeholder-plum-950/40 focus:outline-none focus:border-gold-accent transition-colors"
                        />
                      </div>

                      {/* Event Date input */}
                      <div className="space-y-1.5 text-left">
                        <label htmlFor="eventDate" className="text-[10px] uppercase tracking-widest text-plum-900/60 font-mono block font-semibold">Target Event Date</label>
                        <input 
                          type="date" 
                          id="eventDate" 
                          value={formData.eventDate}
                          onChange={(e) => setFormData(p => ({ ...p, eventDate: e.target.value }))}
                          className="w-full bg-champagne-light/50 border border-plum-950/10 rounded px-4 py-3 text-sm text-plum-950 focus:outline-none focus:border-gold-accent transition-colors"
                        />
                      </div>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Venue Location Location */}
                      <div className="space-y-1.5 text-left">
                        <label htmlFor="venueLocation" className="text-[10px] uppercase tracking-widest text-plum-900/60 font-mono block font-semibold">Proposed Venue & Location</label>
                        <input 
                          type="text" 
                          id="venueLocation" 
                          value={formData.venueLocation}
                          onChange={(e) => setFormData(p => ({ ...p, venueLocation: e.target.value }))}
                          placeholder="DHA Golf Club / PC Karachi or Royal Palm Lahore"
                          className="w-full bg-champagne-light/50 border border-plum-950/10 rounded px-4 py-3 text-sm text-plum-950 placeholder-plum-950/40 focus:outline-none focus:border-gold-accent transition-colors"
                        />
                      </div>

                      {/* Selected Design Program dropdown */}
                      <div className="space-y-1.5 text-left">
                        <label htmlFor="appliedProposal" className="text-[10px] uppercase tracking-widest text-plum-900/60 font-mono block font-semibold">Applied Aesthetic Tone</label>
                        <input 
                          type="text" 
                          id="appliedProposal" 
                          value={formData.appliedProposal}
                          onChange={(e) => setFormData(p => ({ ...p, appliedProposal: e.target.value }))}
                          placeholder="e.g. Traditional Shehnai, Royal Shendi or Emerald Valima"
                          className="w-full bg-champagne-light/50 border border-plum-950/10 rounded px-4 py-3 text-sm text-plum-950 placeholder-plum-950/45 focus:outline-none focus:border-gold-accent transition-colors"
                        />
                      </div>

                    </div>

                    {/* Special requests textarea */}
                    <div className="space-y-1.5 text-left">
                      <label htmlFor="specialNotes" className="text-[10px] uppercase tracking-widest text-plum-900/60 font-mono block font-semibold">Special Directives & Atmospheric Ambitions</label>
                      <textarea 
                        id="specialNotes" 
                        rows={4}
                        value={formData.specialNotes}
                        onChange={(e) => setFormData(p => ({ ...p, specialNotes: e.target.value }))}
                        placeholder="Detail any specifics regarding traditional jasmine (motia) carpets, marigold (genda) arches, custom brass katora lanterns, custom seating layouts, or specific staging dimensions..."
                        className="w-full bg-champagne-light/50 border border-plum-950/10 rounded px-4 py-3 text-sm text-plum-950 placeholder-plum-950/40 focus:outline-none focus:border-gold-accent transition-colors resize-y"
                      />
                    </div>

                    {/* Checkbox agreements */}
                    <div className="flex items-start gap-3 text-left">
                      <input 
                        type="checkbox" 
                        id="agreement" 
                        required 
                        defaultChecked
                        className="mt-1 accent-gold-dark cursor-pointer"
                      />
                      <label htmlFor="agreement" className="text-[11px] text-plum-950/70 leading-normal">
                        I acknowledge Aura Celebrations works exclusively with premium organic materials subject to wild seasonal variables. I confirm that this inquiry drafts standard initial space holding blocks.
                      </label>
                    </div>

                    {/* Elegant premium submit button */}
                    <div className="pt-4 flex justify-end">
                      <button 
                        type="submit" 
                        id="submit-inquiry-btn"
                        disabled={isSubmitting}
                        className="bg-plum-950 hover:bg-plum-900 disabled:bg-plum-950/50 text-gold-accent font-semibold text-xs uppercase tracking-widest px-10 py-4.5 rounded transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-2 cursor-pointer relative shadow-lg"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4.5 h-4.5 border-2 border-gold-accent border-t-transparent rounded-full animate-spin" />
                            <span>Routing Your Request...</span>
                          </>
                        ) : (
                          <>
                            <span>Authorize Styling Commission</span>
                            <Sparkles className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>

                  </form>
                ) : (
                  // Elegant visual receipt confirmation card
                  <motion.div 
                    id="success-alert-receipt"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 px-6 space-y-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-gold-accent/20 border-2 border-gold-dark flex items-center justify-center mx-auto text-gold-dark">
                      <Check className="w-8 h-8 stroke-[3px]" />
                    </div>

                    <div className="space-y-2">
                      <span className="text-[9px] uppercase tracking-[0.3em] text-gold-dark font-semibold font-mono block">COMMISSION TRANSMITTED</span>
                      <h4 className="font-serif text-3xl text-plum-900">Your Placement is Staged</h4>
                      <p className="text-sm text-plum-950/70 max-w-md mx-auto leading-relaxed">
                        Thank you, <span className="font-semibold text-plum-950">{formData.fullName}</span>. A master design architect has locked your date queue and is vetting material routes against your selected parameters.
                      </p>
                    </div>

                    {/* Aesthetic Receipt Breakdown Card */}
                    <div className="bg-champagne-light p-6 rounded border border-plum-950/10 max-w-lg mx-auto text-left space-y-4 text-xs font-mono">
                      <div className="text-center border-b border-plum-950/15 pb-2 uppercase text-[10px] tracking-widest text-plum-900 font-bold">
                        Intake Token Registry
                      </div>
                      <div className="flex justify-between">
                        <span className="text-plum-950/60">Registrant Name:</span>
                        <span className="font-semibold text-plum-950">{formData.fullName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-plum-950/60">Registered Channel:</span>
                        <span className="font-semibold text-plum-950">{formData.email}</span>
                      </div>
                      {formData.eventDate && (
                        <div className="flex justify-between">
                          <span className="text-plum-950/60">Reserved Date:</span>
                          <span className="font-semibold text-plum-950">{formData.eventDate}</span>
                        </div>
                      )}
                      {formData.appliedProposal && (
                        <div className="flex justify-between">
                          <span className="text-plum-950/60">Adopted Design:</span>
                          <span className="font-semibold text-plum-950">{formData.appliedProposal}</span>
                        </div>
                      )}
                      <div className="border-t border-plum-950/15 pt-3 text-[10px] text-plum-950/60 text-center uppercase leading-none font-bold">
                        Callback Target: within 24 operational hours
                      </div>
                    </div>

                    <button 
                      id="reset-form-btn"
                      onClick={() => {
                        setFormSubmitted(false);
                        setFormData({
                          fullName: '',
                          email: '',
                          phone: '',
                          eventDate: '',
                          venueLocation: '',
                          specialNotes: '',
                          appliedProposal: ''
                        });
                      }}
                      className="border border-plum-950 hover:bg-plum-950 hover:text-gold-light py-2 px-6 rounded text-[10px] uppercase tracking-widest font-semibold transition-all duration-300 inline-block font-sans"
                    >
                      Draft Another Request
                    </button>
                  </motion.div>
                )}

              </div>
            </div>
          </div>

        </div>
      </section>
      )}

      {/* CUSTOM SECTIONS CREATED BY ADMIN */}
      {webConfig.customSections && webConfig.customSections.map((section: any) => (
        <section key={section.id} id={`custom-section-${section.id}`} className="py-24 px-6 md:px-12 border-t border-gold-dark/15 max-w-7xl mx-auto relative z-10 animate-fade-in text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-[0.4em] text-gold-accent font-sans">Bespoke Tableaux Extension</span>
              <h2 className="text-4xl md:text-5xl font-serif text-white">{section.title}</h2>
              {section.category && (
                <span className="inline-block bg-gold-accent/15 border border-gold-accent/30 text-gold-accent py-1 px-3 text-[10px] tracking-widest uppercase font-mono rounded">
                  Category: {section.category}
                </span>
              )}
              <p className="text-champagne-light/75 text-sm leading-relaxed max-w-lg">{section.description}</p>
            </div>
            {section.image && (
              <div className="lg:col-span-6 relative aspect-[16/10] overflow-hidden rounded border border-gold-accent/40 shadow-2xl group">
                <img 
                  src={resolveImgUrl(section.image)} 
                  alt={section.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-plum-950/65 via-transparent to-transparent pointer-events-none" />
              </div>
            )}
          </div>
        </section>
      ))}

      {/* FOOTER SECTION */}
      <footer id="brand-footer" className="bg-plum-950 border-t border-gold-dark/20 pt-16 pb-12 px-6 md:px-12 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Logo Column */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img 
                src={resolveImgUrl("/images/aura_logo_1781397175518.jpg")} 
                alt="Aura Celebrations" 
                className="h-24 sm:h-28 lg:h-32 w-auto object-contain rounded border border-gold-dark/15 shadow-md bg-black/40"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-xs text-champagne-light/50 leading-relaxed max-w-xs">
              Designing theatrical atmospheres and opulent table layouts that write a mesmerizing legacy for fine celebrations.
            </p>
            {/* Social Media Links */}
            <div className="pt-2 flex items-center gap-3">
              <a 
                href="https://www.facebook.com/profile.php?id=61568845152955" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-full border border-gold-dark/30 hover:border-gold-accent text-champagne-light/60 hover:text-gold-accent flex items-center justify-center transition-all duration-300 bg-plum-900/20 hover:scale-110 cursor-pointer"
                title="Follow Aura on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://www.instagram.com/aura.celeberations/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-full border border-gold-dark/30 hover:border-gold-accent text-champagne-light/60 hover:text-gold-accent flex items-center justify-center transition-all duration-300 bg-plum-900/20 hover:scale-110 cursor-pointer"
                title="Follow Aura on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://wa.me/923313388966" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-full border border-gold-dark/30 hover:border-gold-accent text-champagne-light/60 hover:text-gold-accent flex items-center justify-center transition-all duration-300 bg-plum-900/20 hover:scale-110 cursor-pointer"
                title="Chat with Aura on WhatsApp"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-4 text-left">
            <h6 className="text-[10px] uppercase tracking-[0.25em] text-gold-accent font-mono font-bold">THE STUDIO</h6>
            <ul className="space-y-2.5 text-xs text-champagne-light/60">
              <li><button onClick={() => scrollToSection('hero-section')} className="hover:text-white transition-colors">Return to Top</button></li>
              <li><button onClick={() => scrollToSection('services-section')} className="hover:text-white transition-colors">Foundational Programs</button></li>
              <li><button onClick={() => scrollToSection('moodboard-section')} className="hover:text-white transition-colors">Style & Mood Creator</button></li>
              <li><button onClick={() => scrollToSection('estimator-section')} className="hover:text-white transition-colors">Blueprint Estimations</button></li>
            </ul>
          </div>

          {/* Directives details info */}
          <div className="space-y-4 text-left">
            <h6 className="text-[10px] uppercase tracking-[0.25em] text-gold-accent font-mono font-bold">ATMOSPHERIC DETAILS</h6>
            <div className="space-y-3 text-xs text-champagne-light/60">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-gold-accent shrink-0" />
                <span>103/A, Block 5 Clifton, Karachi, 75500, Pakistan</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gold-accent shrink-0" />
                <span>+92 (300) 400-AURA</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-gold-accent shrink-0" />
                <span>curator@auracelebrations.com</span>
              </div>
            </div>
          </div>

          {/* Sparkly Quote Block */}
          <div className="space-y-4 text-left">
            <h6 className="text-[10px] uppercase tracking-[0.25em] text-gold-accent font-mono font-bold">SENSORY LEGACY</h6>
            <div className="p-4 bg-plum-900/30 border border-gold-dark/15 rounded text-xs text-champagne-light/70 italic font-serif leading-relaxed">
              "To enter a space styled by Aura Celebrations is to leave the terrestrial behind for a symphony of candlelight."
            </div>
          </div>

        </div>

        {/* Closing details */}
        <div className="max-w-7xl mx-auto pt-8 border-t border-gold-dark/10 flex flex-col md:flex-row items-center justify-between text-[11px] text-champagne-light/40 gap-4">
          <p>© 2026 Aura Celebrations Inc. All architectural and ornamental layouts fully reserved.</p>
          <div className="flex gap-6 items-center flex-wrap">
            <a href="#privacy" className="hover:text-champagne-light transition-colors">Atmospheric Protocols</a>
            <a href="#terms" className="hover:text-champagne-light transition-colors">Charter Agreements</a>
            <button 
              onClick={() => setIsAdminOpen(true)}
              className="hover:text-gold-accent text-champagne-light/30 transition-colors uppercase font-mono tracking-widest text-[9px] flex items-center gap-1 border border-gold-dark/10 hover:border-gold-accent/30 px-2.5 py-0.5 rounded cursor-pointer"
            >
              System Portal
            </button>
          </div>
        </div>
      </footer>

      {/* Admin Portal Overlay */}
      <AnimatePresence>
        {isAdminOpen && (
          <AdminPortal onClose={() => setIsAdminOpen(false)} />
        )}
      </AnimatePresence>

      {/* Detailed Highlight Portfolio View Modal */}
      <AnimatePresence>
        {selectedHighlight && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedHighlight(null)}
              className="absolute inset-0 bg-plum-950/90 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Body Card */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              className="bg-plum-900 border border-gold-dark/35 text-white w-full max-w-4xl rounded-xl shadow-2xl relative z-10 max-h-[90vh] overflow-y-auto overflow-x-hidden flex flex-col md:flex-row"
            >
              {/* Close Button absolute inside */}
              <button
                onClick={() => setSelectedHighlight(null)}
                className="absolute top-4 right-4 bg-plum-950/80 hover:bg-plum-950 text-champagne-light hover:text-gold-accent border border-gold-dark/20 hover:border-gold-accent p-2 rounded-full transition-all duration-300 z-20 cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Left Side: Images/Creative gallery */}
              <div className="w-full md:w-1/2 relative bg-plum-950 flex flex-col justify-between shrink-0">
                <div className="aspect-[4/3] md:h-full relative overflow-hidden">
                  <img
                    src={resolveImgUrl(selectedHighlight.image)}
                    alt={selectedHighlight.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-plum-900 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Category overlay */}
                  <span className="absolute top-4 left-4 bg-plum-950/90 border border-gold-accent/40 text-[9px] uppercase tracking-[0.25em] text-gold-accent font-semibold px-3 py-1 rounded-full backdrop-blur-sm z-15">
                    {selectedHighlight.category}
                  </span>
                </div>
              </div>

              {/* Right Side: Specifications and narratives */}
              <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-gold-light/65 block font-mono font-semibold">
                      {selectedHighlight.subtitle}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-white mt-1">
                      {selectedHighlight.title}
                    </h3>
                  </div>

                  {/* Financial Estimate */}
                  {selectedHighlight.price && (
                    <div className="bg-gold-accent/10 border border-gold-accent/20 rounded p-3 flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-wider text-gold-accent font-semibold font-mono">
                        Base Investment Framework
                      </span>
                      <span className="text-lg font-mono font-bold text-gold-accent">
                        ₨ {selectedHighlight.price.toLocaleString()}
                      </span>
                    </div>
                  )}

                  {/* Core Description Narrative */}
                  <div className="space-y-2">
                    <span className="text-[9px] uppercase tracking-wider text-champagne-light/40 font-mono block">
                      Aesthetic Philosophy
                    </span>
                    <p className="text-xs sm:text-sm text-champagne-light/85 leading-relaxed font-sans">
                      {selectedHighlight.description}
                    </p>
                  </div>

                  {/* Curated feature lists */}
                  <div className="space-y-2.5">
                    <span className="text-[9px] uppercase tracking-wider text-champagne-light/40 font-mono block">
                      Core Atmospheric Inclusions
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] font-mono text-champagne-light/90">
                      {selectedHighlight.features.map((feat: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2 bg-plum-950/40 p-2 rounded border border-gold-dark/10">
                          <Check className="w-3.5 h-3.5 text-gold-accent shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Dynamic recommendations based on category */}
                  <div className="space-y-2">
                    <span className="text-[9px] uppercase tracking-wider text-champagne-light/40 font-mono block">
                      Design Studio Styling Advice
                    </span>
                    <div className="bg-plum-950/40 border border-gold-dark/10 p-3 rounded text-xs text-champagne-light/75 font-sans leading-relaxed flex gap-2">
                      <Sparkles className="w-4 h-4 text-gold-accent shrink-0 mt-0.5" />
                      <div>
                        {selectedHighlight.category === 'Wedding' && (
                          <span>We recommend pairing this majestic scale blueprint with amber warm stage washes (2700K) and heavy cascading candle paths. Best customized for medium to grand gatherings of 150-600 esteemed guests.</span>
                        )}
                        {selectedHighlight.category === 'Nikah' && (
                          <span>A pristine daylight scheme with cool projection spots elevates physical mirror depth. Recommended with fresh hydration misting intervals to safeguard original jasmine fragrance. Perfect for elegant, quiet rites.</span>
                        )}
                        {selectedHighlight.category === 'Birthday' && (
                          <span>A mesmerizing dual-focus setup where custom high-gloss lacquer finishes on frame installations produce majestic camera-ready sheens. Soft lavender wash uplighting creates premium atmospheric photography.</span>
                        )}
                        {selectedHighlight.category === 'Corporate' && (
                          <span>Perfect for high-density lobby entrances, public forums, or custom corporate and luxury events. Branding details, sufi stages, beachside spreads, or themes can be customized elegantly.</span>
                        )}
                        {!['Wedding', 'Nikah', 'Birthday', 'Corporate'].includes(selectedHighlight.category) && (
                          <span>Our curating specialists recommend coordinating your color swatches with premium silk overlays to balance atmospheric harmony. Customized configurations are fully tailored upon booking verification.</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Booking Call-To-Action form coupling! */}
                <div className="pt-4 border-t border-gold-dark/10">
                  <button
                    onClick={() => {
                      const notes = `Hi Aura Stylists,\n\nI am captivated by your beautiful "${selectedHighlight.title}" showcase (${selectedHighlight.subtitle}). I would love to build a customized consultation proposal integrating this physical portfolio style.\n\nPlease share design specifics and scheduling options for this.`;
                      
                      setFormData(prev => ({
                        ...prev,
                        appliedProposal: selectedHighlight.title,
                        specialNotes: notes
                      }));
                      
                      setSelectedHighlight(null);
                      setTimeout(() => {
                        scrollToSection('inquiry-section');
                      }, 200);
                    }}
                    className="w-full py-3 px-6 rounded bg-gold-accent hover:bg-gold-light text-plum-950 font-bold font-serif text-xs uppercase tracking-[0.15em] transition-all duration-300 shadow-lg shadow-gold-accent/15 cursor-pointer flex items-center justify-center gap-2"
                  >
                    Adopt Portfolio Aesthetic & Inquire <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
