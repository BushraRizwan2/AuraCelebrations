import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Users, 
  Briefcase, 
  FileText, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PlusCircle, 
  Trash2, 
  Plus, 
  Search, 
  Filter, 
  Star, 
  X, 
  Lock, 
  Percent, 
  Award,
  LogOut,
  Power,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Layers,
  Sparkles,
  Palette,
  Settings,
  Bell,
  Eye,
  Check
} from 'lucide-react';

// Interfaces for our Admin State Data
export interface Customer {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  targetDate: string;
  location: string; // e.g. "DHA Phase 3, Block Y, Karachi"
  status: 'Served' | 'Potential' | 'Window Shopping';
}

export interface Vendor {
  id: string;
  companyName: string;
  category: 'Catering' | 'Decorators' | 'Sound/DJ Music' | 'Photography' | 'Bid Boxes & Giveaways';
  contactPerson: string;
  phone: string;
  baseRate: number;
  pendingBalance: number;
}

export interface FeedbackLog {
  id: string;
  customerName: string;
  rating: number; // 1-5 stars
  feedbackText: string;
  internalNotes: string; // Planner experience log
  eventDate: string;
}

export interface LedgerEntry {
  id: string;
  year: number; // e.g. 2024, 2025, 2026
  month: string; // e.g. "January" - "December"
  type: 'Revenue' | 'Expense';
  category: 
    | 'Employee Salaries' 
    | 'Commissions (Event-Based)' 
    | 'Commissions (Monthly)' 
    | 'Partner Vendor Payments' 
    | 'Operating Expenses (OpEx)' 
    | 'Gross Client Booking'
    | 'Other';
  amount: number;
  description: string;
  date: string; // YYYY-MM-DD
}

// Pre-populated Luxury Data
const INITIAL_CUSTOMERS: Customer[] = [
  { id: 'c1', fullName: 'Ayesha Khan', phone: '+92 300 1234567', email: 'ayesha.k@gmail.com', targetDate: '2026-08-15', location: 'DHA Phase 3, Block Y, Karachi', status: 'Served' },
  { id: 'c2', fullName: 'Bilal Ahmed', phone: '+92 321 9876543', email: 'bilal.ahmed@yahoo.com', targetDate: '2026-10-20', location: 'DHA Phase 6, Block C, Karachi', status: 'Potential' },
  { id: 'c3', fullName: 'Zainab Malik', phone: '+92 333 4567890', email: 'zainab.m@gmail.com', targetDate: '2026-12-05', location: 'DHA Phase 5, Block A, Karachi', status: 'Window Shopping' },
  { id: 'c4', fullName: 'Hamza Yusuf', phone: '+92 301 5552321', email: 'hyusuf@outlook.com', targetDate: '2026-06-25', location: 'DHA Phase 8, Block V, Karachi', status: 'Served' },
  { id: 'c5', fullName: 'Sarah Chishti', phone: '+92 345 8881212', email: 'sarah.c@gmail.com', targetDate: '2026-11-12', location: 'DHA Phase 2, Block J, Karachi', status: 'Potential' },
];

const INITIAL_VENDORS: Vendor[] = [
  { id: 'v1', companyName: 'Shalimar Caterers', category: 'Catering', contactPerson: 'Muhammad Rizwan', phone: '+92 300 8443221', baseRate: 350000, pendingBalance: 120000 },
  { id: 'v2', companyName: 'Bloom & Stem Decorators', category: 'Decorators', contactPerson: 'Fatima Alvi', phone: '+92 321 4455888', baseRate: 150000, pendingBalance: 0 },
  { id: 'v3', companyName: 'Sonic Wave DJ & Sound', category: 'Sound/DJ Music', contactPerson: 'DJ Khurram', phone: '+92 312 9991122', baseRate: 80000, pendingBalance: 30000 },
  { id: 'v4', companyName: 'Dawood Studio (Photography)', category: 'Photography', contactPerson: 'Dawood Rehman', phone: '+92 333 1111555', baseRate: 250000, pendingBalance: 90000 },
  { id: 'v5', companyName: 'Luxe Giveaways Co.', category: 'Bid Boxes & Giveaways', contactPerson: 'Amna Shah', phone: '+92 300 7771234', baseRate: 60000, pendingBalance: 15000 },
];

const INITIAL_FEEDBACKS: FeedbackLog[] = [
  { id: 'f1', customerName: 'Ayesha Khan', rating: 5, feedbackText: "Absolute perfection! The floral arrangements to the table layouts felt like standard high couture. Aura is Karachi's best!", internalNotes: "No logistical constraints, executed in Karachi Gymkhana. Flawless setup, flowers were imported on time.", eventDate: "2026-05-18" },
  { id: 'f2', customerName: 'Hamza Yusuf', rating: 4, feedbackText: "Beautiful decor but the DJ could improve sound level slightly during speeches.", internalNotes: "Sound setup experienced venue-specific echo. Corrected in 20 minutes with secondary mixer adjustments.", eventDate: "2026-04-10" },
  { id: 'f3', customerName: 'Zainab Malik', rating: 5, feedbackText: "Outstanding coordination! From the initial moodboards to the actual design, they exceeded my dreams.", internalNotes: "Drafted Autumn Luxe theme in DHA Karachi. High satisfaction score.", eventDate: "2026-05-02" }
];

const INITIAL_LEDGER: LedgerEntry[] = [
  // 2025 Ledger Items
  { id: 'l1', year: 2025, month: 'November', type: 'Revenue', category: 'Gross Client Booking', amount: 1800000, description: 'Groom Barat Decor - Elite Karachi Block DD', date: '2025-11-05' },
  { id: 'l2', year: 2025, month: 'December', type: 'Revenue', category: 'Gross Client Booking', amount: 1200000, description: 'Elite Birthday Dinner Package - Karachi', date: '2025-12-25' },
  { id: 'l3', year: 2025, month: 'November', type: 'Expense', category: 'Employee Salaries', amount: 450000, description: 'Monthly team retainer & coordinator salaries', date: '2025-11-30' },
  { id: 'l4', year: 2025, month: 'November', type: 'Expense', category: 'Operating Expenses (OpEx)', amount: 300000, description: 'Imported rare blooms & custom silk draping logistics', date: '2025-11-02' },
  { id: 'l5', year: 2025, month: 'November', type: 'Expense', category: 'Partner Vendor Payments', amount: 250000, description: 'Outsourced catering service (Shalimar catering)', date: '2025-11-06' },
  { id: 'l6', year: 2025, month: 'November', type: 'Expense', category: 'Commissions (Event-Based)', amount: 750000, description: 'Sales scouts & client booking scout payouts', date: '2025-11-08' },
  
  // 2026 Ledger Items
  { id: 'l7', year: 2026, month: 'March', type: 'Revenue', category: 'Gross Client Booking', amount: 2500000, description: 'Imperial Valima Reception - DHA Karachi', date: '2026-03-12' },
  { id: 'l8', year: 2026, month: 'June', type: 'Revenue', category: 'Gross Client Booking', amount: 450000, description: 'Grand Birthday & DJ Package - Karachi Block Y', date: '2026-06-13' },
  { id: 'l9', year: 2026, month: 'May', type: 'Expense', category: 'Employee Salaries', amount: 600000, description: 'Team and designer payouts for H1 peak season', date: '2026-05-30' },
  { id: 'l10', year: 2026, month: 'March', type: 'Expense', category: 'Operating Expenses (OpEx)', amount: 400000, description: 'Imported white orchid structures from Thailand', date: '2026-03-10' },
  { id: 'l11', year: 2026, month: 'June', type: 'Expense', category: 'Partner Vendor Payments', amount: 120000, description: 'Sonic wave sound & live DJ ambient setup team', date: '2026-06-13' },
  { id: 'l12', year: 2026, month: 'April', type: 'Expense', category: 'Commissions (Monthly)', amount: 100000, description: 'Bespoke marketing & luxury concierge consultant retainers', date: '2026-04-01' },
];

interface AdminPortalProps {
  onClose: () => void;
}

const sanitizeStorageJson = (raw: string | null) => {
  if (!raw) return null;
  try {
    let sanitized = raw;
    // Replace "/src/assets/images/" or "src/assets/images/" with "/assets/images/"
    sanitized = sanitized.replace(/\/?src\/assets\/images\//g, '/assets/images/');
    // Ensure all "/assets/images" or "assets/images" start with "/assets/images/"
    sanitized = sanitized.replace(/\/?assets\/images\//g, '/assets/images/');
    return JSON.parse(sanitized);
  } catch (e) {
    return null;
  }
};

const resolveImgUrl = (url: string | undefined): string => {
  if (!url) return '';
  let resolved = url;
  if (resolved.includes('src/assets/images/')) {
    resolved = resolved.replace(/.*src\/assets\/images\//, '/assets/images/');
  }
  if (resolved.startsWith('assets/images/')) {
    resolved = '/' + resolved;
  }
  if (resolved.startsWith('//')) {
    resolved = resolved.replace(/^\/+/, '/');
  }
  return resolved;
};

export default function AdminPortal({ onClose }: AdminPortalProps) {
  // Authentication & Access state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('aura_admin_authenticated') === 'true';
  });
  const [accessKey, setAccessKey] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  // Primary States synced with LocalStorage
  const [customers, setCustomers] = useState<Customer[]>(() => {
    const raw = localStorage.getItem('aura_customers');
    return raw ? JSON.parse(raw) : INITIAL_CUSTOMERS;
  });

  const [vendors, setVendors] = useState<Vendor[]>(() => {
    const raw = localStorage.getItem('aura_vendors');
    return raw ? JSON.parse(raw) : INITIAL_VENDORS;
  });

  const [feedbacks, setFeedbacks] = useState<FeedbackLog[]>(() => {
    const raw = localStorage.getItem('aura_feedbacks');
    return raw ? JSON.parse(raw) : INITIAL_FEEDBACKS;
  });

  const [ledger, setLedger] = useState<LedgerEntry[]>(() => {
    const raw = localStorage.getItem('aura_ledger');
    return raw ? JSON.parse(raw) : INITIAL_LEDGER;
  });

  // Sync back to localStorage on any edits
  useEffect(() => {
    localStorage.setItem('aura_customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('aura_vendors', JSON.stringify(vendors));
  }, [vendors]);

  useEffect(() => {
    localStorage.setItem('aura_feedbacks', JSON.stringify(feedbacks));
  }, [feedbacks]);

  useEffect(() => {
    localStorage.setItem('aura_ledger', JSON.stringify(ledger));
  }, [ledger]);

  // Operational states
  const [activeTab, setActiveTab] = useState<'Directory' | 'Feedback' | 'Financial Ledger' | 'Notifications' | 'Website Customizer'>('Directory');
  
  // Real-time notification and website states
  const [notifications, setNotifications] = useState<any[]>(() => {
    const raw = localStorage.getItem('aura_notifications');
    if (raw) return JSON.parse(raw);
    return [
      {
        id: 'notif-seed-1',
        type: 'inquiry',
        title: 'New Client Inquiry',
        message: 'Aisha Khan filed consultation request for winter wedding tablescapes on August 15 in DHA Phase 3, Karachi.',
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
  });

  const [webConfig, setWebConfig] = useState(() => {
    const raw = localStorage.getItem('aura_web_config');
    const parsed = sanitizeStorageJson(raw);
    if (parsed) return parsed;
    return {
      colors: {
        background_950: '#140514',
        background_900: '#220a22',
        background_800: '#351035',
        gold_accent: '#d4af37',
        gold_dark: '#aa8410',
        gold_light: '#f6e6c2',
        textColor: '#ffffff',
        cardBackground: '#ffffff'
      },
      sections: [
        { id: 'hero-section', name: 'Hero Curation Intro', enabled: true },
        { id: 'services-section', name: 'Dynamic Tailoring Services', enabled: true },
        { id: 'moodboard-section', name: 'Interactive Moodboard Generator', enabled: true },
        { id: 'highlights-section', name: 'Aura Portfolio & Highlights Grid', enabled: true },
        { id: 'estimator-section', name: 'Calculative Cost Estimator', enabled: true },
        { id: 'testimonials-section', name: 'Words of Patrons (Testimonials)', enabled: true },
        { id: 'inquiry-section', name: 'Grand Consultation Intake Forms', enabled: true }
      ],
      hero: {
        title: 'Aura Celebrations',
        subtitle: 'CHOREOGRAPHING ATMOSPHERIC MASTERPIECES',
        description: 'We craft hyper-exclusive, premium sensory landscapes for elite celebrations in Karachi, Pakistan. Balancing architectural density, pure velvet textiles, and raw flora sculpting.',
        image: '/assets/images/celestique_reception_1781396299184.jpg'
      },
      customSections: []
    };
  });

  const [dynamicServices, setDynamicServices] = useState<any[]>(() => {
    const raw = localStorage.getItem('aura_dynamic_services');
    const parsed = sanitizeStorageJson(raw);
    if (parsed) return parsed;
    const defaults = [
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
        image: '/assets/images/celestique_tablescape_1781396278721.jpg'
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
        image: '/assets/images/celestique_floral_1781396321270.jpg'
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
        image: '/assets/images/celestique_reception_1781396299184.jpg'
      }
    ];
    return defaults;
  });

  const [dynamicHighlights, setDynamicHighlights] = useState<any[]>(() => {
    const raw = localStorage.getItem('aura_dynamic_highlights');
    const parsed = sanitizeStorageJson(raw);
    if (parsed) return parsed;
    const defaults = [
      {
        id: 'highlight-birthday-decor',
        category: 'Birthday' as const,
        title: 'Just Birthday Decor Package',
        subtitle: 'Ambient Balloon Cloude & Golden Frames',
        description: 'A charming, high-end intimate setup featuring pastel-purple and elegant dusty-rose organic balloon arches, gold circular metal frames, customized name signs, and warm fairy lights.',
        image: '/assets/images/aura_birthday_decor_1781397692017.jpg',
        features: ['Organic Silk Balloon Arches', 'Gold Plate Cake Plinth', 'Romantic Candle & Fairy Lights'],
        price: 10000
      },
      {
        id: 'highlight-birthday-dinner',
        category: 'Birthday' as const,
        title: 'Birthday Decor & Dinner Package',
        subtitle: 'Premium Curation with 5 Main Dishes',
        description: 'An elite dual-experience offering premium stage backdrop styling paired with a magnificent seated buffet hosting 5 signature gourmet main courses served in warm brass chafing dishes under floating crystal chandeliers.',
        image: '/assets/images/aura_birthday_dinner_1781399061307.jpg',
        features: ['5 Gourmet Main Dishes Buffet', 'Premium Stage Backdrop Decor', 'Fine Cutlery & Charger Plates'],
        price: 400000
      },
      {
        id: 'highlight-birthday-dj',
        category: 'Birthday' as const,
        title: 'Birthday Decor + DJ + Dinner Package',
        subtitle: 'The Ultimate Milestone Extravaganza',
        description: 'A custom, high-octane celebration package integrating complete theme decor, professional live sound DJ booth setups, warm mood wash-lights, and an expansive dinner buffet featuring 5 main courses.',
        image: '/assets/images/aura_birthday_dj_1781399084641.jpg',
        features: ['Pro DJ Sound System & Laser Uplighting', '5-Course Luxury Feast Buffet', 'Immersive Atmospheric Backdrop Display'],
        price: 450000
      }
    ];
    return defaults;
  });

  const [dynamicTestimonials, setDynamicTestimonials] = useState<any[]>(() => {
    const raw = localStorage.getItem('aura_dynamic_testimonials');
    const parsed = sanitizeStorageJson(raw);
    if (parsed) return parsed;
    const defaults = [
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
    return defaults;
  });

  // State sync hooks
  useEffect(() => {
    localStorage.setItem('aura_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('aura_web_config', JSON.stringify(webConfig));
  }, [webConfig]);

  useEffect(() => {
    localStorage.setItem('aura_dynamic_services', JSON.stringify(dynamicServices));
  }, [dynamicServices]);

  useEffect(() => {
    localStorage.setItem('aura_dynamic_highlights', JSON.stringify(dynamicHighlights));
  }, [dynamicHighlights]);

  useEffect(() => {
    localStorage.setItem('aura_dynamic_testimonials', JSON.stringify(dynamicTestimonials));
  }, [dynamicTestimonials]);

  // Real-time listeners
  useEffect(() => {
    const handleReload = () => {
      const rawNotifs = localStorage.getItem('aura_notifications');
      if (rawNotifs) setNotifications(JSON.parse(rawNotifs));

      const rawConfig = localStorage.getItem('aura_web_config');
      const parsedConfig = sanitizeStorageJson(rawConfig);
      if (parsedConfig) setWebConfig(parsedConfig);

      const rawServices = localStorage.getItem('aura_dynamic_services');
      const parsedServices = sanitizeStorageJson(rawServices);
      if (parsedServices) setDynamicServices(parsedServices);

      const rawHighlights = localStorage.getItem('aura_dynamic_highlights');
      const parsedHighlights = sanitizeStorageJson(rawHighlights);
      if (parsedHighlights) setDynamicHighlights(parsedHighlights);

      const rawTestimonials = localStorage.getItem('aura_dynamic_testimonials');
      const parsedTestimonials = sanitizeStorageJson(rawTestimonials);
      if (parsedTestimonials) setDynamicTestimonials(parsedTestimonials);
    };

    window.addEventListener('aura_notification_added', handleReload);
    window.addEventListener('aura_web_config_updated', handleReload);
    return () => {
      window.removeEventListener('aura_notification_added', handleReload);
      window.removeEventListener('aura_web_config_updated', handleReload);
    };
  }, []);

  const unreadNotifCount = useMemo(() => {
    return notifications.filter(n => !n.read).length;
  }, [notifications]);

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setTimeout(() => window.dispatchEvent(new CustomEvent('aura_web_config_updated')), 100);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    setTimeout(() => window.dispatchEvent(new CustomEvent('aura_web_config_updated')), 100);
  };

  const triggerConfigUpdated = () => {
    window.dispatchEvent(new CustomEvent('aura_web_config_updated'));
  };

  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [editingHighlightId, setEditingHighlightId] = useState<string | null>(null);

  // Default templates to add new custom services
  const handleAddNewService = () => {
    const serviceId = 'srv-' + Date.now();
    const newSrv = {
      id: serviceId,
      title: 'Bespoke Custom Program',
      subtitle: 'Luxury Atmosphere Curation',
      description: 'A completely hand-drawn decoration layout tailored for high prestige corporate and private commissions.',
      priceStart: 250000,
      features: ['Personalized on-set designer consultations', 'Luxury drapery, premium lighting and florals'],
      image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=80&w=600'
    };
    setDynamicServices(prev => [...prev, newSrv]);
    setTimeout(triggerConfigUpdated, 100);
  };

  const handleDeleteService = (srvId: string) => {
    setDynamicServices(prev => prev.filter(x => x.id !== srvId));
    setTimeout(triggerConfigUpdated, 100);
  };

  const handleAddNewHighlight = () => {
    const highlightId = 'high-' + Date.now();
    const newHigh = {
      id: highlightId,
      category: 'Wedding' as const,
      title: 'Majestic Event Concept',
      subtitle: 'Premium Architectural Layout',
      description: 'Spacious stage layout styled with customized structures, silk drapery and beautiful backlights.',
      features: ['Structural Backdrop Wall', 'Imported Flora & Warm Chandeliers'],
      image: 'https://images.unsplash.com/photo-1507504038482-7621ab28871f?auto=format&fit=crop&q=80&w=600',
      price: 300000
    };
    setDynamicHighlights(prev => [...prev, newHigh]);
    setTimeout(triggerConfigUpdated, 100);
  };

  const handleDeleteHighlight = (highId: string) => {
    setDynamicHighlights(prev => prev.filter(x => x.id !== highId));
    setTimeout(triggerConfigUpdated, 100);
  };

  const [activeCustomizerPane, setActiveCustomizerPane] = useState<'sections' | 'colors' | 'hero' | 'services' | 'highlights' | 'testimonials'>('sections');

  const [directoryType, setDirectoryType] = useState<'Customers' | 'Vendors'>('Customers');
  
  // Ledger active filter year
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  
  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [vendorCategoryFilter, setVendorCategoryFilter] = useState<string>('All');

  // --- STATE EXTENSIONS FOR ADVANCED GRID GOVERNANCE ---
  // Customers Grid states
  const [custSearchTerm, setCustSearchTerm] = useState<string>('');
  const [custColFilterName, setCustColFilterName] = useState<string>('');
  const [custColFilterContact, setCustColFilterContact] = useState<string>('');
  const [custColFilterDate, setCustColFilterDate] = useState<string>('');
  const [custColFilterLocation, setCustColFilterLocation] = useState<string>('');
  const [custColFilterStatus, setCustColFilterStatus] = useState<string>('All');
  const [custSortField, setCustSortField] = useState<string | null>(null);
  const [custSortAsc, setCustSortAsc] = useState<boolean>(true);
  const [custPage, setCustPage] = useState<number>(1);
  const [custPageSize, setCustPageSize] = useState<number>(5);

  // Vendors Grid states
  const [vendSearchTerm, setVendSearchTerm] = useState<string>('');
  const [vendColFilterCompany, setVendColFilterCompany] = useState<string>('');
  const [vendColFilterCategory, setVendColFilterCategory] = useState<string>('All');
  const [vendColFilterContact, setVendColFilterContact] = useState<string>('');
  const [vendColFilterPhone, setVendColFilterPhone] = useState<string>('');
  const [vendColFilterBaseRate, setVendColFilterBaseRate] = useState<string>('');
  const [vendColFilterBalance, setVendColFilterBalance] = useState<string>('');
  const [vendSortField, setVendSortField] = useState<string | null>(null);
  const [vendSortAsc, setVendSortAsc] = useState<boolean>(true);
  const [vendPage, setVendPage] = useState<number>(1);
  const [vendPageSize, setVendPageSize] = useState<number>(5);

  // Financial Ledger Grid states
  const [ledgSearchTerm, setLedgSearchTerm] = useState<string>('');
  const [ledgColFilterDate, setLedgColFilterDate] = useState<string>('');
  const [ledgColFilterMonth, setLedgColFilterMonth] = useState<string>('');
  const [ledgColFilterCategory, setLedgColFilterCategory] = useState<string>('All');
  const [ledgColFilterDescription, setLedgColFilterDescription] = useState<string>('');
  const [ledgColFilterFlow, setLedgColFilterFlow] = useState<string>('All');
  const [ledgSortField, setLedgSortField] = useState<string | null>(null);
  const [ledgSortAsc, setLedgSortAsc] = useState<boolean>(true);
  const [ledgPage, setLedgPage] = useState<number>(1);
  const [ledgPageSize, setLedgPageSize] = useState<number>(5);

  // Sorting helpers
  const handleCustSort = (field: string) => {
    if (custSortField === field) {
      setCustSortAsc(!custSortAsc);
    } else {
      setCustSortField(field);
      setCustSortAsc(true);
    }
    setCustPage(1);
  };

  const handleVendSort = (field: string) => {
    if (vendSortField === field) {
      setVendSortAsc(!vendSortAsc);
    } else {
      setVendSortField(field);
      setVendSortAsc(true);
    }
    setVendPage(1);
  };

  const handleLedgSort = (field: string) => {
    if (ledgSortField === field) {
      setLedgSortAsc(!ledgSortAsc);
    } else {
      setLedgSortField(field);
      setLedgSortAsc(true);
    }
    setLedgPage(1);
  };

  // Reusable pagination helper
  const renderPagination = (
    currentPage: number,
    pageSize: number,
    totalItems: number,
    setPage: (page: number) => void
  ) => {
    const totalPages = Math.ceil(totalItems / pageSize) || 1;
    return (
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 bg-plum-950/5 border-t border-plum-950/10 font-sans">
        <span className="text-[11px] text-plum-950/60">
          Showing <span className="font-semibold text-plum-950">{Math.min((currentPage - 1) * pageSize + 1, totalItems)}</span> to{' '}
          <span className="font-semibold text-plum-950">{Math.min(currentPage * pageSize, totalItems)}</span> of{' '}
          <span className="font-semibold text-plum-950">{totalItems}</span> results
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setPage(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="border border-gold-dark/30 hover:border-gold-accent px-3 py-1 rounded text-[11px] text-plum-950 font-semibold bg-white disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Previous
          </button>
          <span className="text-[11px] text-plum-950/70 py-1 px-3 bg-plum-50 rounded border border-plum-950/5">
            Page {currentPage} of {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="border border-gold-dark/30 hover:border-gold-accent px-3 py-1 rounded text-[11px] text-plum-950 font-semibold bg-white disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  const renderSortArrow = (field: string, currentField: string | null, isAsc: boolean) => {
    if (currentField !== field) {
      return (
        <span className="text-plum-950/30 group-hover:text-plum-950/60 text-[9px] ml-1.5 inline-block transition cursor-pointer font-sans" title="Click to sort">
          ⇅
        </span>
      );
    }
    return isAsc ? (
      <span className="text-gold-dark font-bold text-[9px] ml-1.5 inline-block" title="Sorted Ascending">
        ▲
      </span>
    ) : (
      <span className="text-gold-dark font-bold text-[9px] ml-1.5 inline-block" title="Sorted Descending">
        ▼
      </span>
    );
  };

  // Modal open states
  const [showAddCustomerModal, setShowAddCustomerModal] = useState<boolean>(false);
  const [showAddVendorModal, setShowAddVendorModal] = useState<boolean>(false);
  const [showAddFeedbackModal, setShowAddFeedbackModal] = useState<boolean>(false);
  const [showAddLedgerModal, setShowAddLedgerModal] = useState<boolean>(false);

  // Form states for Create-CRUD
  const [newCustomer, setNewCustomer] = useState({
    fullName: '',
    phone: '',
    email: '',
    targetDate: '',
    location: 'DHA Phase 3, Karachi',
    status: 'Potential' as Customer['status']
  });

  const [newVendor, setNewVendor] = useState({
    companyName: '',
    category: 'Catering' as Vendor['category'],
    contactPerson: '',
    phone: '',
    baseRate: '',
    pendingBalance: ''
  });

  const [newFeedback, setNewFeedback] = useState({
    customerName: '',
    rating: 5,
    feedbackText: '',
    internalNotes: '',
    eventDate: ''
  });

  const [newLedger, setNewLedger] = useState({
    year: 2026,
    month: 'June',
    type: 'Expense' as LedgerEntry['type'],
    category: 'Operating Expenses (OpEx)' as LedgerEntry['category'],
    amount: '',
    description: '',
    date: ''
  });

  // Handle Authentication submit
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Allow 'aura-admin' or 'admin' or 'AURA' as a premium, intuitive mock password, or anything!
    // But verify string is non-empty for professional larping
    if (accessKey.trim().toLowerCase() === 'aura-admin' || accessKey.trim() === 'admin' || accessKey.trim() === '123') {
      setIsAuthenticated(true);
      setErrorMsg('');
      localStorage.setItem('aura_admin_authenticated', 'true');
    } else {
      setErrorMsg('Unauthorized Security Credentials. Hint: Use "admin" or "aura-admin"');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('aura_admin_authenticated');
  };

  // Delete Action Handlers
  const handleDeleteCustomer = (id: string) => {
    if (confirm("Are you sure you want to remove this client profile from the Unified Directory?")) {
      setCustomers(customers.filter(c => c.id !== id));
    }
  };

  const handleDeleteVendor = (id: string) => {
    if (confirm("Are you sure you want to remove this partner supplier from the Event Vendor database?")) {
      setVendors(vendors.filter(v => v.id !== id));
    }
  };

  const handleDeleteFeedback = (id: string) => {
    if (confirm("Are you sure you want to delete this historical post-event review page?")) {
      setFeedbacks(feedbacks.filter(f => f.id !== id));
    }
  };

  const handleDeleteLedger = (id: string) => {
    if (confirm("Are you sure you want to delete this transaction from the financial ledger ledger?")) {
      setLedger(ledger.filter(l => l.id !== id));
    }
  };

  // Add Action Submit Handlers
  const handleAddCustomerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomer.fullName || !newCustomer.phone || !newCustomer.email) {
      alert("Please complete the required fields (Full Name, Contact, Email).");
      return;
    }
    const created: Customer = {
      id: 'cust-' + Date.now(),
      fullName: newCustomer.fullName,
      phone: newCustomer.phone,
      email: newCustomer.email,
      targetDate: newCustomer.targetDate || new Date().toISOString().split('T')[0],
      location: newCustomer.location,
      status: newCustomer.status
    };
    setCustomers([created, ...customers]);
    setShowAddCustomerModal(false);
    // Reset state
    setNewCustomer({
      fullName: '',
      phone: '',
      email: '',
      targetDate: '',
      location: 'DHA Phase 3, Karachi',
      status: 'Potential'
    });
  };

  const handleAddVendorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVendor.companyName || !newVendor.contactPerson || !newVendor.phone) {
      alert("Please enter company name, contact, and phone number.");
      return;
    }
    const created: Vendor = {
      id: 'vend-' + Date.now(),
      companyName: newVendor.companyName,
      category: newVendor.category,
      contactPerson: newVendor.contactPerson,
      phone: newVendor.phone,
      baseRate: Number(newVendor.baseRate) || 0,
      pendingBalance: Number(newVendor.pendingBalance) || 0
    };
    setVendors([created, ...vendors]);
    setShowAddVendorModal(false);
    setNewVendor({
      companyName: '',
      category: 'Catering',
      contactPerson: '',
      phone: '',
      baseRate: '',
      pendingBalance: ''
    });
  };

  const handleAddFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFeedback.customerName || !newFeedback.feedbackText) {
      alert("Please enter customer name and review text.");
      return;
    }
    const created: FeedbackLog = {
      id: 'feed-' + Date.now(),
      customerName: newFeedback.customerName,
      rating: Number(newFeedback.rating),
      feedbackText: newFeedback.feedbackText,
      internalNotes: newFeedback.internalNotes || "No logistical anomalies logged. Smooth execution.",
      eventDate: newFeedback.eventDate || new Date().toISOString().split('T')[0]
    };
    setFeedbacks([created, ...feedbacks]);
    setShowAddFeedbackModal(false);
    setNewFeedback({
      customerName: '',
      rating: 5,
      feedbackText: '',
      internalNotes: '',
      eventDate: ''
    });
  };

  const handleAddLedgerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLedger.amount || !newLedger.description) {
      alert("Please enter amount and description.");
      return;
    }
    const created: LedgerEntry = {
      id: 'ledg-' + Date.now(),
      year: Number(newLedger.year),
      month: newLedger.month,
      type: newLedger.type,
      category: newLedger.type === 'Revenue' ? 'Gross Client Booking' : newLedger.category,
      amount: Number(newLedger.amount) || 0,
      description: newLedger.description,
      date: newLedger.date || new Date().toISOString().split('T')[0]
    };
    setLedger([created, ...ledger]);
    setShowAddLedgerModal(false);
    setNewLedger({
      year: 2026,
      month: 'June',
      type: 'Expense',
      category: 'Operating Expenses (OpEx)',
      amount: '',
      description: '',
      date: ''
    });
  };

  // Directory Computed Filtering & Sorting - CUSTOMERS
  const filteredCustomers = useMemo(() => {
    return customers.filter(c => {
      // General search or tab-specific search
      const inputSearch = custSearchTerm || searchTerm;
      const matchSearch = inputSearch === '' ||
        c.fullName.toLowerCase().includes(inputSearch.toLowerCase()) || 
        c.location.toLowerCase().includes(inputSearch.toLowerCase()) ||
        c.phone.includes(inputSearch) ||
        c.email.toLowerCase().includes(inputSearch.toLowerCase());
      
      // Column Filters
      const matchColName = custColFilterName === '' || c.fullName.toLowerCase().includes(custColFilterName.toLowerCase());
      const matchColContact = custColFilterContact === '' || 
        c.phone.includes(custColFilterContact) || 
        c.email.toLowerCase().includes(custColFilterContact.toLowerCase());
      const matchColDate = custColFilterDate === '' || c.targetDate.toLowerCase().includes(custColFilterDate.toLowerCase());
      const matchColLocation = custColFilterLocation === '' || c.location.toLowerCase().includes(custColFilterLocation.toLowerCase());
      const matchColStatus = custColFilterStatus === 'All' || c.status === custColFilterStatus;

      const matchStatus = statusFilter === 'All' || c.status === statusFilter;

      return matchSearch && matchColName && matchColContact && matchColDate && matchColLocation && matchColStatus && matchStatus;
    }).sort((a, b) => {
      if (!custSortField) return 0;
      let valA: any = '';
      let valB: any = '';

      if (custSortField === 'fullName') {
        valA = a.fullName.toLowerCase();
        valB = b.fullName.toLowerCase();
      } else if (custSortField === 'contact') {
        valA = a.phone;
        valB = b.phone;
      } else if (custSortField === 'targetDate') {
        valA = a.targetDate;
        valB = b.targetDate;
      } else if (custSortField === 'location') {
        valA = a.location.toLowerCase();
        valB = b.location.toLowerCase();
      } else if (custSortField === 'status') {
        valA = a.status.toLowerCase();
        valB = b.status.toLowerCase();
      }

      if (valA < valB) return custSortAsc ? -1 : 1;
      if (valA > valB) return custSortAsc ? 1 : -1;
      return 0;
    });
  }, [customers, custSearchTerm, searchTerm, custColFilterName, custColFilterContact, custColFilterDate, custColFilterLocation, custColFilterStatus, statusFilter, custSortField, custSortAsc]);

  const paginatedCustomers = useMemo(() => {
    const startIdx = (custPage - 1) * custPageSize;
    return filteredCustomers.slice(startIdx, startIdx + custPageSize);
  }, [filteredCustomers, custPage, custPageSize]);

  // Directory Computed Filtering & Sorting - VENDORS
  const filteredVendors = useMemo(() => {
    return vendors.filter(v => {
      // General search
      const inputSearch = vendSearchTerm || searchTerm;
      const matchSearch = inputSearch === '' ||
        v.companyName.toLowerCase().includes(inputSearch.toLowerCase()) ||
        v.contactPerson.toLowerCase().includes(inputSearch.toLowerCase()) ||
        v.category.toLowerCase().includes(inputSearch.toLowerCase());

      // Column Filters
      const matchColCompany = vendColFilterCompany === '' || v.companyName.toLowerCase().includes(vendColFilterCompany.toLowerCase());
      const matchColCategory = vendColFilterCategory === 'All' || v.category === vendColFilterCategory;
      const matchColContact = vendColFilterContact === '' || v.contactPerson.toLowerCase().includes(vendColFilterContact.toLowerCase());
      const matchColPhone = vendColFilterPhone === '' || v.phone.includes(vendColFilterPhone);
      const matchColBaseRate = vendColFilterBaseRate === '' || v.baseRate.toString().includes(vendColFilterBaseRate);
      const matchColBalance = vendColFilterBalance === '' || v.pendingBalance.toString().includes(vendColFilterBalance);

      const matchCat = vendorCategoryFilter === 'All' || v.category === vendorCategoryFilter;

      return matchSearch && matchColCompany && matchColCategory && matchColContact && matchColPhone && matchColBaseRate && matchColBalance && matchCat;
    }).sort((a, b) => {
      if (!vendSortField) return 0;
      let valA: any = '';
      let valB: any = '';

      if (vendSortField === 'companyName') {
        valA = a.companyName.toLowerCase();
        valB = b.companyName.toLowerCase();
      } else if (vendSortField === 'category') {
        valA = a.category.toLowerCase();
        valB = b.category.toLowerCase();
      } else if (vendSortField === 'contactPerson') {
        valA = a.contactPerson.toLowerCase();
        valB = b.contactPerson.toLowerCase();
      } else if (vendSortField === 'phone') {
        valA = a.phone;
        valB = b.phone;
      } else if (vendSortField === 'baseRate') {
        valA = a.baseRate;
        valB = b.baseRate;
      } else if (vendSortField === 'pendingBalance') {
        valA = a.pendingBalance;
        valB = b.pendingBalance;
      }

      if (valA < valB) return vendSortAsc ? -1 : 1;
      if (valA > valB) return vendSortAsc ? 1 : -1;
      return 0;
    });
  }, [vendors, vendSearchTerm, searchTerm, vendColFilterCompany, vendColFilterCategory, vendColFilterContact, vendColFilterPhone, vendColFilterBaseRate, vendColFilterBalance, vendorCategoryFilter, vendSortField, vendSortAsc]);

  const paginatedVendors = useMemo(() => {
    const startIdx = (vendPage - 1) * vendPageSize;
    return filteredVendors.slice(startIdx, startIdx + vendPageSize);
  }, [filteredVendors, vendPage, vendPageSize]);

  // Financial Ledger Computed Math & Filter
  const activeYearLedger = useMemo(() => {
    return ledger.filter(l => l.year === selectedYear);
  }, [ledger, selectedYear]);

  // Active Year Ledger Filtered, Sorted, and Paginated for Table View
  const sortedAndFilteredLedger = useMemo(() => {
    return activeYearLedger.filter(item => {
      // General Search
      const matchSearch = ledgSearchTerm === '' ||
        item.description.toLowerCase().includes(ledgSearchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(ledgSearchTerm.toLowerCase()) ||
        item.month.toLowerCase().includes(ledgSearchTerm.toLowerCase());

      // Column Filters
      const matchColDate = ledgColFilterDate === '' || item.date.toLowerCase().includes(ledgColFilterDate.toLowerCase());
      const matchColMonth = ledgColFilterMonth === '' || item.month.toLowerCase().includes(ledgColFilterMonth.toLowerCase());
      const matchColCategory = ledgColFilterCategory === 'All' || item.category === ledgColFilterCategory;
      const matchColDescription = ledgColFilterDescription === '' || item.description.toLowerCase().includes(ledgColFilterDescription.toLowerCase());
      const matchColFlow = ledgColFilterFlow === 'All' || item.type === ledgColFilterFlow;

      return matchSearch && matchColDate && matchColMonth && matchColCategory && matchColDescription && matchColFlow;
    }).sort((a, b) => {
      if (!ledgSortField) return 0;
      let valA: any = '';
      let valB: any = '';

      if (ledgSortField === 'date') {
        valA = a.date;
        valB = b.date;
      } else if (ledgSortField === 'month') {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        valA = months.indexOf(a.month);
        valB = months.indexOf(b.month);
      } else if (ledgSortField === 'category') {
        valA = a.category.toLowerCase();
        valB = b.category.toLowerCase();
      } else if (ledgSortField === 'description') {
        valA = a.description.toLowerCase();
        valB = b.description.toLowerCase();
      } else if (ledgSortField === 'flow') {
        // Sort by net amount (Revenue is positive, Expense is negative)
        valA = a.type === 'Revenue' ? a.amount : -a.amount;
        valB = b.type === 'Revenue' ? b.amount : -b.amount;
      }

      if (valA < valB) return ledgSortAsc ? -1 : 1;
      if (valA > valB) return ledgSortAsc ? 1 : -1;
      return 0;
    });
  }, [activeYearLedger, ledgSearchTerm, ledgColFilterDate, ledgColFilterMonth, ledgColFilterCategory, ledgColFilterDescription, ledgColFilterFlow, ledgSortField, ledgSortAsc]);

  const paginatedLedger = useMemo(() => {
    const startIdx = (ledgPage - 1) * ledgPageSize;
    return sortedAndFilteredLedger.slice(startIdx, startIdx + ledgPageSize);
  }, [sortedAndFilteredLedger, ledgPage, ledgPageSize]);

  const financialCalculations = useMemo(() => {
    let totalRevenue = 0;
    let totalExpense = 0;
    
    // Detailed expense breakdowns
    let salaries = 0;
    let eventCommissions = 0;
    let monthlyCommissions = 0;
    let vendorPayments = 0;
    let opex = 0;
    let otherExpenses = 0;

    activeYearLedger.forEach(item => {
      if (item.type === 'Revenue') {
        totalRevenue += item.amount;
      } else {
        totalExpense += item.amount;
        if (item.category === 'Employee Salaries') salaries += item.amount;
        else if (item.category === 'Commissions (Event-Based)') eventCommissions += item.amount;
        else if (item.category === 'Commissions (Monthly)') monthlyCommissions += item.amount;
        else if (item.category === 'Partner Vendor Payments') vendorPayments += item.amount;
        else if (item.category === 'Operating Expenses (OpEx)') opex += item.amount;
        else otherExpenses += item.amount;
      }
    });

    const netAmount = totalRevenue - totalExpense;
    const isProfit = netAmount >= 0;

    // Calculation safe ratios (max 100%)
    const expenseRatio = totalRevenue > 0 ? Math.min(Math.round((totalExpense / totalRevenue) * 100), 100) : 0;
    const profitRatio = isProfit && totalRevenue > 0 ? 100 - expenseRatio : 0;

    return {
      grossRevenue: totalRevenue,
      totalExpenses: totalExpense,
      netAmount: Math.abs(netAmount),
      isProfit,
      expenseRatio,
      profitRatio,
      salaries,
      eventCommissions,
      monthlyCommissions,
      vendorPayments,
      opex,
      otherExpenses
    };
  }, [activeYearLedger]);

  // Star ratings helper
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1 text-gold-accent">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={`w-4 h-4 ${i < rating ? 'fill-gold-accent' : 'text-gray-300'}`} />
        ))}
      </div>
    );
  };

  // Access Page if Not Authenticated
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-plum-950 flex items-center justify-center p-6 bg-cover bg-center overflow-y-auto" style={{ backgroundImage: "linear-gradient(rgba(19, 3, 21, 0.95), rgba(19, 3, 21, 0.95))" }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md bg-white text-plum-950 rounded-xl shadow-2xl overflow-hidden border border-gold-accent/40"
        >
          {/* Top Title Shield Frame */}
          <div className="bg-plum-950 text-white py-8 px-6 text-center relative border-b border-gold-accent/20">
            <div className="absolute top-0 left-0 w-full h-[5px] bg-gradient-to-r from-gold-dark via-gold-accent to-gold-light" />
            <div className="mx-auto w-12 h-12 bg-gold-accent/15 border border-gold-accent rounded-full flex items-center justify-center mb-3">
              <Lock className="w-5 h-5 text-gold-accent" />
            </div>
            <h1 className="font-serif text-2xl tracking-widest text-gold-accent leading-none">AURA SYSTEM PORTAL</h1>
            <p className="text-[10px] uppercase font-mono tracking-widest text-champagne-light/60 mt-2">Governance & Financial Ledger</p>
          </div>

          <form onSubmit={handleLogin} className="p-8 space-y-6 bg-white">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-plum-950/70 font-bold block">Administrative access code</label>
              <div className="relative">
                <input 
                  type="password"
                  placeholder="Enter access code..."
                  value={accessKey}
                  onChange={(e) => setAccessKey(e.target.value)}
                  className="w-full pl-3 pr-10 py-3 border border-plum-950/20 rounded focus:ring-1 focus:ring-gold-accent focus:border-gold-accent focus:outline-none text-sm font-sans"
                  required
                />
              </div>
              <span className="text-[9px] text-plum-950/50 block italic">Security note: Enter "admin" or "aura-admin" for easy entrance.</span>
            </div>

            {errorMsg && (
              <div className="bg-red-50 border border-red-200 text-red-800 text-xs py-2.5 px-3 rounded text-center">
                {errorMsg}
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button 
                type="button"
                onClick={onClose}
                className="w-1/3 py-3 border border-plum-950/15 text-plum-950/80 hover:bg-plum-50 rounded text-xs uppercase tracking-wider font-semibold transition duration-300"
              >
                Close
              </button>
              <button 
                type="submit"
                className="w-2/3 py-3 bg-plum-950 hover:bg-plum-900 text-gold-accent rounded text-xs uppercase tracking-widest font-semibold transition duration-300 shadow-lg"
              >
                AUThenticate
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#160519] text-white flex flex-col overflow-hidden">
      
      {/* HEADER BAR */}
      <header className="bg-plum-950 border-b border-gold-dark/20 px-6 py-4 flex items-center justify-between z-20 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-gold-accent overflow-hidden bg-plum-900/60 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-gold-accent animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg tracking-widest text-gold-accent leading-none">AURA SYSTEM PORTAL</span>
              <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[9px] px-2 py-0.5 rounded-full font-mono uppercase">SECURE PASS</span>
            </div>
            <span className="text-[9px] tracking-[0.35em] text-champagne-dark font-sans block mt-1">GOVERNANCE & FINANCIAL LEDGER</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button 
            type="button"
            onClick={handleLogout}
            className="bg-[#2D0D35] border border-purple-500/40 text-purple-300 hover:bg-purple-600 hover:border-purple-400 hover:text-white transition duration-300 p-2 sm:p-2.5 rounded-full text-xs flex items-center justify-center shadow-lg"
            title="Lock Portal"
          >
            <Power className="w-4.5 h-4.5" />
          </button>
        </div>
      </header>

      {/* ADMIN LEVEL SUB NAV */}
      <div className="bg-[#1b031f] border-b border-gold-dark/15 px-6 py-3 flex flex-wrap gap-4 items-center justify-between shrink-0">
        <div className="flex flex-wrap gap-2">
          {(['Directory', 'Feedback', 'Financial Ledger', 'Notifications', 'Website Customizer'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 text-xs uppercase tracking-widest font-sans font-medium rounded transition duration-300 flex items-center gap-1.5 ${
                activeTab === tab
                  ? 'bg-gold-accent text-plum-950 shadow'
                  : 'text-champagne-light hover:bg-plum-900/45'
              }`}
            >
              {tab === 'Notifications' && <Bell className="w-3.5 h-3.5" />}
              {tab === 'Website Customizer' && <Settings className="w-3.5 h-3.5" />}
              {tab}
              {tab === 'Notifications' && unreadNotifCount > 0 && (
                <span className="bg-red-500 text-white font-mono text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold animate-pulse leading-none">
                  {unreadNotifCount}
                </span>
              )}
            </button>
          ))}
        </div>
        <div className="text-xs text-champagne-light/50 font-serif italic">
          Operational Center: DHA Karachi, Pakistan • Active Directory
        </div>
      </div>

      {/* DASHBOARD SCALABLE PANEL AREA */}
      <main className="flex-grow overflow-y-auto p-6 space-y-6">

        {/* ----------------- TAB 1: UNIFIED DIRECTORY ----------------- */}
        {activeTab === 'Directory' && (
          <div className="space-y-6">
            
            {/* Split Switcher & Filters */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-plum-950 p-4 rounded-lg border border-gold-dark/15">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setDirectoryType('Customers'); setSearchTerm(''); }}
                  className={`px-4 py-2 text-xs uppercase tracking-widest font-medium border rounded transition ${
                    directoryType === 'Customers' ? 'bg-white text-plum-950 border-white' : 'border-gold-accent/20 text-gold-accent hover:bg-plum-900/30'
                  }`}
                >
                  Client Database
                </button>
                <button
                  onClick={() => { setDirectoryType('Vendors'); setSearchTerm(''); }}
                  className={`px-4 py-2 text-xs uppercase tracking-widest font-medium border rounded transition ${
                    directoryType === 'Vendors' ? 'bg-white text-plum-950 border-white' : 'border-gold-accent/20 text-gold-accent hover:bg-plum-900/30'
                  }`}
                >
                  Event Vendors
                </button>
              </div>

              {/* Dynamic search & inputs */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-champagne-light/40" />
                  <input
                    type="text"
                    placeholder={`Search ${directoryType.toLowerCase()}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-4 py-2 w-64 bg-plum-900/50 border border-gold-dark/20 rounded focus:border-gold-accent focus:outline-none text-xs text-white placeholder-champagne-light/30"
                  />
                </div>

                {directoryType === 'Customers' ? (
                  <div className="flex items-center gap-2">
                    <Filter className="w-3.5 h-3.5 text-gold-accent" />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="bg-plum-900/50 border border-gold-dark/20 text-[11px] rounded px-2.5 py-2 text-gold-accent font-sans focus:outline-none"
                    >
                      <option value="All">All Leads</option>
                      <option value="Served">Served (Completed)</option>
                      <option value="Potential">Potential (Active Negotiation)</option>
                      <option value="Window Shopping">Window Shopping</option>
                    </select>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Filter className="w-3.5 h-3.5 text-gold-accent" />
                    <select
                      value={vendorCategoryFilter}
                      onChange={(e) => setVendorCategoryFilter(e.target.value)}
                      className="bg-plum-900/50 border border-gold-dark/20 text-[11px] rounded px-2.5 py-2 text-gold-accent font-sans focus:outline-none"
                    >
                      <option value="All">All Sectors</option>
                      <option value="Catering">Catering</option>
                      <option value="Decorators">Decorators</option>
                      <option value="Sound/DJ Music">Sound/DJ Music</option>
                      <option value="Photography">Photography</option>
                      <option value="Bid Boxes & Giveaways">Bid Boxes & Giveaways</option>
                    </select>
                  </div>
                )}

                <button
                  onClick={() => directoryType === 'Customers' ? setShowAddCustomerModal(true) : setShowAddVendorModal(true)}
                  className="bg-gold-accent hover:bg-gold-light text-plum-950 font-semibold px-4 py-2 rounded text-xs uppercase tracking-widest flex items-center gap-1.5 transition duration-300"
                >
                  <Plus className="w-3.5 h-3.5 text-plum-950 stroke-[3]" /> Add {directoryType === 'Customers' ? 'Customer' : 'Vendor'}
                </button>
              </div>
            </div>

            {/* DATABASE VIEWER CARDS / CRISP WHITE BACKGROUND CARDS */}
            {directoryType === 'Customers' ? (
              <div className="bg-white text-plum-950 rounded-xl shadow-xl overflow-hidden border border-gold-dark/15">
                <div className="p-4 bg-gold-accent/15 border-b border-gold-dark/10 flex justify-between items-center">
                  <span className="font-serif text-sm font-semibold text-plum-900 uppercase tracking-widest">Active Clientele Register</span>
                  <span className="text-[10px] font-mono text-plum-900/60">Total: {filteredCustomers.length} Records</span>
                </div>
                
                {filteredCustomers.length === 0 && paginatedCustomers.length === 0 ? (
                  <div className="py-16 text-center text-plum-950/50 italic text-sm">
                    No client entries found matching the filter query.
                  </div>
                ) : (
                  <div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          {/* Column Sorting Row */}
                          <tr className="bg-plum-950/5 border-b border-plum-950/10 text-plum-950/80 uppercase tracking-wider font-mono text-[9px]">
                            <th className="py-3 px-4 cursor-pointer hover:bg-plum-950/10 select-none group transition" onClick={() => handleCustSort('fullName')}>
                              <span className="flex items-center gap-1">Full Name {renderSortArrow('fullName', custSortField, custSortAsc)}</span>
                            </th>
                            <th className="py-3 px-4 cursor-pointer hover:bg-plum-950/10 select-none group transition" onClick={() => handleCustSort('contact')}>
                              <span className="flex items-center gap-1">Contact Detail {renderSortArrow('contact', custSortField, custSortAsc)}</span>
                            </th>
                            <th className="py-3 px-4 cursor-pointer hover:bg-plum-950/10 select-none group transition" onClick={() => handleCustSort('targetDate')}>
                              <span className="flex items-center gap-1">Target Event Date {renderSortArrow('targetDate', custSortField, custSortAsc)}</span>
                            </th>
                            <th className="py-3 px-4 cursor-pointer hover:bg-plum-950/10 select-none group transition" onClick={() => handleCustSort('location')}>
                              <span className="flex items-center gap-1">DHA Location / Block {renderSortArrow('location', custSortField, custSortAsc)}</span>
                            </th>
                            <th className="py-3 px-4 cursor-pointer hover:bg-plum-950/10 select-none group transition" onClick={() => handleCustSort('status')}>
                              <span className="flex items-center gap-1">Lifecycle Status {renderSortArrow('status', custSortField, custSortAsc)}</span>
                            </th>
                            <th className="py-3 px-4 text-right">Actions</th>
                          </tr>
                          {/* Column Filtering Row */}
                          <tr className="bg-plum-950/5 border-b border-plum-950/10">
                            <th className="py-1 px-2">
                              <input 
                                type="text"
                                placeholder="Filter name..."
                                value={custColFilterName}
                                onChange={(e) => { setCustColFilterName(e.target.value); setCustPage(1); }}
                                className="w-full bg-white text-plum-900 border border-slate-300 rounded px-2 py-1 text-[10px] font-sans font-normal focus:outline-none focus:border-gold-dark"
                              />
                            </th>
                            <th className="py-1 px-2">
                              <input 
                                type="text"
                                placeholder="Filter contact..."
                                value={custColFilterContact}
                                onChange={(e) => { setCustColFilterContact(e.target.value); setCustPage(1); }}
                                className="w-full bg-white text-plum-900 border border-slate-300 rounded px-2 py-1 text-[10px] font-sans font-normal focus:outline-none focus:border-gold-dark"
                              />
                            </th>
                            <th className="py-1 px-2">
                              <input 
                                type="text"
                                placeholder="Filter date..."
                                value={custColFilterDate}
                                onChange={(e) => { setCustColFilterDate(e.target.value); setCustPage(1); }}
                                className="w-full bg-white text-plum-900 border border-slate-300 rounded px-2 py-1 text-[10px] font-sans font-normal focus:outline-none focus:border-gold-dark"
                              />
                            </th>
                            <th className="py-1 px-2">
                              <input 
                                type="text"
                                placeholder="Filter location..."
                                value={custColFilterLocation}
                                onChange={(e) => { setCustColFilterLocation(e.target.value); setCustPage(1); }}
                                className="w-full bg-white text-plum-900 border border-slate-300 rounded px-2 py-1 text-[10px] font-sans font-normal focus:outline-none focus:border-gold-dark"
                              />
                            </th>
                            <th className="py-1 px-2">
                              <select 
                                value={custColFilterStatus}
                                onChange={(e) => { setCustColFilterStatus(e.target.value); setCustPage(1); }}
                                className="w-full bg-white text-plum-900 border border-slate-300 rounded px-1.5 py-1 text-[10px] font-sans font-normal focus:outline-none focus:border-gold-dark"
                              >
                                <option value="All">All</option>
                                <option value="Served">Served</option>
                                <option value="Potential">Potential</option>
                                <option value="Window Shopping">Window Shopping</option>
                              </select>
                            </th>
                            <th className="py-1 px-2"></th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-plum-950/5 font-sans font-medium text-plum-900">
                          {paginatedCustomers.map(c => (
                            <tr key={c.id} className="hover:bg-plum-50/50 transition">
                              <td className="py-3.5 px-4 font-serif text-sm font-bold block-td">{c.fullName}</td>
                              <td className="py-3.5 px-4">
                                <div className="space-y-0.5">
                                  <span className="block font-semibold">{c.phone}</span>
                                  <span className="block text-[10px] text-plum-950/60 leading-none">{c.email}</span>
                                </div>
                              </td>
                              <td className="py-3.5 px-4 font-mono text-[11px]">{c.targetDate}</td>
                              <td className="py-3.5 px-4">
                                <div className="flex items-center gap-1.5">
                                  <MapPin className="w-3.5 h-3.5 text-gold-accent shrink-0" />
                                  <span>{c.location}</span>
                                </div>
                              </td>
                              <td className="py-3.5 px-4">
                                <span className={`inline-block px-2.5 py-1 text-[9px] uppercase font-mono tracking-wider text-nowrap rounded font-bold border ${
                                  c.status === 'Served' 
                                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                                    : c.status === 'Potential' 
                                    ? 'bg-amber-50 text-amber-800 border-amber-200' 
                                    : 'bg-slate-100 text-slate-600 border-slate-200'
                                }`}>
                                  {c.status}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 text-right">
                                <button
                                  type="button"
                                  onClick={() => handleDeleteCustomer(c.id)}
                                  className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 p-1.5 rounded transition inline-block"
                                  title="Remove Profile"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {/* Pagination control bar */}
                    {renderPagination(custPage, custPageSize, filteredCustomers.length, setCustPage)}
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white text-plum-950 rounded-xl shadow-xl overflow-hidden border border-gold-dark/15">
                <div className="p-4 bg-gold-accent/15 border-b border-gold-dark/10 flex justify-between items-center">
                  <span className="font-serif text-sm font-semibold text-plum-900 uppercase tracking-widest">Aura Partner Suppliers & Vendors</span>
                  <span className="text-[10px] font-mono text-plum-900/60">Total: {filteredVendors.length} Suppliers</span>
                </div>

                {filteredVendors.length === 0 && paginatedVendors.length === 0 ? (
                  <div className="py-16 text-center text-plum-950/50 italic text-sm">
                    No vendor listings found matching search categories.
                  </div>
                ) : (
                  <div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          {/* Column Sorting Row */}
                          <tr className="bg-plum-950/5 border-b border-plum-950/10 text-plum-950/80 uppercase tracking-wider font-mono text-[9px]">
                            <th className="py-3 px-4 cursor-pointer hover:bg-plum-950/10 select-none group transition" onClick={() => handleVendSort('companyName')}>
                              <span className="flex items-center gap-1">Company & Sector {renderSortArrow('companyName', vendSortField, vendSortAsc)}</span>
                            </th>
                            <th className="py-3 px-4 cursor-pointer hover:bg-plum-950/10 select-none group transition" onClick={() => handleVendSort('contactPerson')}>
                              <span className="flex items-center gap-1">Point of Contact {renderSortArrow('contactPerson', vendSortField, vendSortAsc)}</span>
                            </th>
                            <th className="py-3 px-4 cursor-pointer hover:bg-plum-950/10 select-none group transition" onClick={() => handleVendSort('phone')}>
                              <span className="flex items-center gap-1">Phone Line {renderSortArrow('phone', vendSortField, vendSortAsc)}</span>
                            </th>
                            <th className="py-3 px-4 cursor-pointer hover:bg-plum-950/10 select-none group transition" onClick={() => handleVendSort('baseRate')}>
                              <span className="flex items-center gap-1">Supplier Base Rates {renderSortArrow('baseRate', vendSortField, vendSortAsc)}</span>
                            </th>
                            <th className="py-3 px-4 cursor-pointer hover:bg-plum-950/10 select-none group transition" onClick={() => handleVendSort('pendingBalance')}>
                              <span className="flex items-center gap-1">Pending Outstanding Balance {renderSortArrow('pendingBalance', vendSortField, vendSortAsc)}</span>
                            </th>
                            <th className="py-3 px-4 text-right">Actions</th>
                          </tr>
                          {/* Column Filtering Row */}
                          <tr className="bg-plum-950/5 border-b border-plum-950/10">
                            <th className="py-1 px-2">
                              <div className="flex gap-1 flex-col">
                                <input 
                                  type="text"
                                  placeholder="Company..."
                                  value={vendColFilterCompany}
                                  onChange={(e) => { setVendColFilterCompany(e.target.value); setVendPage(1); }}
                                  className="w-full bg-white text-plum-900 border border-slate-300 rounded px-2 py-1 text-[10px] font-sans font-normal focus:outline-none focus:border-gold-dark"
                                />
                              </div>
                            </th>
                            <th className="py-1 px-2">
                              <input 
                                type="text"
                                placeholder="Contact..."
                                value={vendColFilterContact}
                                onChange={(e) => { setVendColFilterContact(e.target.value); setVendPage(1); }}
                                className="w-full bg-white text-plum-900 border border-slate-300 rounded px-2 py-1 text-[10px] font-sans font-normal focus:outline-none focus:border-gold-dark"
                              />
                            </th>
                            <th className="py-1 px-2">
                              <input 
                                type="text"
                                placeholder="Phone..."
                                value={vendColFilterPhone}
                                onChange={(e) => { setVendColFilterPhone(e.target.value); setVendPage(1); }}
                                className="w-full bg-white text-plum-900 border border-slate-300 rounded px-2 py-1 text-[10px] font-sans font-normal focus:outline-none focus:border-gold-dark"
                              />
                            </th>
                            <th className="py-1 px-2">
                              <input 
                                type="text"
                                placeholder="Base rate..."
                                value={vendColFilterBaseRate}
                                onChange={(e) => { setVendColFilterBaseRate(e.target.value); setVendPage(1); }}
                                className="w-full bg-white text-plum-900 border border-slate-300 rounded px-2 py-1 text-[10px] font-sans font-normal focus:outline-none focus:border-gold-dark"
                              />
                            </th>
                            <th className="py-1 px-2">
                              <input 
                                type="text"
                                placeholder="Balance..."
                                value={vendColFilterBalance}
                                onChange={(e) => { setVendColFilterBalance(e.target.value); setVendPage(1); }}
                                className="w-full bg-white text-plum-900 border border-slate-300 rounded px-2 py-1 text-[10px] font-sans font-normal focus:outline-none focus:border-gold-dark"
                              />
                            </th>
                            <th className="py-1 px-2"></th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-plum-950/5 font-sans font-medium text-plum-900">
                          {paginatedVendors.map(v => (
                            <tr key={v.id} className="hover:bg-plum-50/50 transition">
                              <td className="py-3.5 px-4">
                                <div>
                                  <span className="font-serif text-sm font-bold text-plum-950 block">{v.companyName}</span>
                                  <span className="inline-block text-[10px] px-2 py-0.5 mt-1 bg-plum-950/5 text-plum-950/70 border border-plum-950/10 rounded font-mono uppercase">{v.category}</span>
                                </div>
                              </td>
                              <td className="py-3.5 px-4">{v.contactPerson}</td>
                              <td className="py-3.5 px-4 font-mono">{v.phone}</td>
                              <td className="py-3.5 px-4 font-bold text-plum-950">₨ {v.baseRate.toLocaleString()}</td>
                              <td className="py-3.5 px-4">
                                <span className={`font-bold px-2 py-1 rounded font-mono ${v.pendingBalance > 0 ? 'text-amber-800 bg-amber-50 border border-amber-200' : 'text-emerald-800 bg-emerald-50 border border-emerald-200'}`}>
                                  ₨ {v.pendingBalance.toLocaleString()}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 text-right">
                                <button
                                  type="button"
                                  onClick={() => handleDeleteVendor(v.id)}
                                  className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 p-1.5 rounded transition inline-block"
                                  title="Remove Vendor"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {/* Pagination control bar */}
                    {renderPagination(vendPage, vendPageSize, filteredVendors.length, setVendPage)}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ----------------- TAB 2: FEEDBACK & EXPERIENCES ----------------- */}
        {activeTab === 'Feedback' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-plum-950 p-4 rounded-lg border border-gold-dark/15">
              <div>
                <h2 className="font-serif text-lg text-gold-accent leading-none">The Experience & Feedback Book</h2>
                <p className="text-[10px] text-champagne-light/50 tracking-wider uppercase mt-1">Logged Post-Event Reviews and Internal Planner Logs</p>
              </div>
              <button
                onClick={() => setShowAddFeedbackModal(true)}
                className="bg-gold-accent hover:bg-gold-light text-plum-950 font-semibold px-4 py-2 rounded text-xs uppercase tracking-widest flex items-center gap-1.5 transition"
              >
                <Plus className="w-3.5 h-3.5 text-plum-950 stroke-[3]" /> Log Review
              </button>
            </div>

            {/* FEEDBACK FEED GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {feedbacks.map(item => (
                <div key={item.id} className="bg-white text-plum-950 rounded-xl shadow-xl overflow-hidden border border-gold-dark/15 flex flex-col justify-between">
                  {/* Card Main Info */}
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-serif text-base font-bold text-plum-950">{item.customerName}</h4>
                        <span className="text-[10px] uppercase font-mono text-plum-950/50 block mt-0.5">Event Execution: {item.eventDate}</span>
                      </div>
                      <div className="text-right">
                        {renderStars(item.rating)}
                        <span className="text-[10px] font-mono text-gold-dark font-bold uppercase tracking-wider block mt-1">CLIENT RATING</span>
                      </div>
                    </div>

                    {/* Client Testimonial */}
                    <div className="space-y-1.5 bg-plum-50 p-3.5 rounded border border-plum-950/5 italic text-xs leading-relaxed text-slate-700">
                      <span className="text-[9px] uppercase tracking-wider text-plum-950/65 font-bold block not-italic">Client Statement:</span>
                      "{item.feedbackText}"
                    </div>

                    {/* Internal Notes */}
                    <div className="space-y-1.5 bg-amber-50/50 p-3.5 rounded border border-amber-200/50 text-xs leading-relaxed text-slate-800">
                      <span className="text-[9px] uppercase tracking-wider text-amber-900 font-bold block">Planner Log (Internal Observations):</span>
                      {item.internalNotes}
                    </div>
                  </div>

                  {/* Foot action bar */}
                  <div className="px-6 py-3.5 bg-plum-950/5 border-t border-plum-950/10 flex justify-between items-center text-[10px]">
                    <span className="text-plum-950/50 uppercase font-mono">ID: {item.id}</span>
                    <button
                      onClick={() => handleDeleteFeedback(item.id)}
                      className="text-red-500 hover:text-red-800 flex items-center gap-1 font-mono uppercase font-bold"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ----------------- TAB 3: FINANCIAL LEDGER & P&L ----------------- */}
        {activeTab === 'Financial Ledger' && (
          <div className="space-y-6">
            
            {/* Year Selector Control */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-plum-950 p-4 rounded-lg border border-gold-dark/15">
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-widest text-gold-accent font-bold font-mono">FINANCIAL FISCAL YEAR:</span>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="bg-white text-plum-950 font-serif font-bold text-sm rounded px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-gold-accent"
                >
                  <option value={2024}>2024</option>
                  <option value={2025}>2025</option>
                  <option value={2026}>2026</option>
                </select>
              </div>

              <button
                onClick={() => setShowAddLedgerModal(true)}
                className="bg-gold-accent hover:bg-gold-light text-plum-950 font-semibold px-4 py-2 rounded text-xs uppercase tracking-widest flex items-center gap-1.5 transition"
              >
                <Plus className="w-3.5 h-3.5 text-plum-950 stroke-[3]" /> Log Expense/Revenue
              </button>
            </div>

            {/* STATS OVERVIEW CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Gross Client Booking / Revenues */}
              <div className="bg-white text-plum-950 rounded-xl shadow-lg p-6 border border-gold-accent/20 relative overflow-hidden">
                <div className="absolute right-4 top-4 text-emerald-100 bg-emerald-50 w-10 h-10 rounded-full flex items-center justify-center border border-emerald-200">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                </div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-plum-950/60 block font-bold">Gross Booking Cashflow</span>
                <div className="text-2xl font-serif text-emerald-800 font-extrabold mt-2">₨ {financialCalculations.grossRevenue.toLocaleString()}</div>
                <p className="text-[10.5px] text-plum-950/40 italic font-medium mt-1">Combined booking revenues logged in {selectedYear}</p>
              </div>

              {/* Total combined expenses */}
              <div className="bg-white text-plum-950 rounded-xl shadow-lg p-6 border border-gold-accent/20 relative overflow-hidden">
                <div className="absolute right-4 top-4 text-rose-100 bg-rose-50 w-10 h-10 rounded-full flex items-center justify-center border border-rose-200">
                  <TrendingDown className="w-5 h-5 text-rose-600" />
                </div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-plum-950/60 block font-bold">Total Combined Outflows</span>
                <div className="text-2xl font-serif text-rose-800 font-extrabold mt-2">₨ {financialCalculations.totalExpenses.toLocaleString()}</div>
                <p className="text-[10.5px] text-plum-950/40 italic font-medium mt-1">Aggregated payroll, OpEx & supplier expenses</p>
              </div>

              {/* Net profits or losses */}
              <div className="bg-white text-plum-950 rounded-xl shadow-lg p-6 border border-gold-accent/20 relative overflow-hidden">
                <div className="absolute right-4 top-4 text-gold-accent/20 bg-gold-accent/5 w-10 h-10 rounded-full flex items-center justify-center border border-gold-accent/30">
                  <Award className="w-5 h-5 text-gold-accent" />
                </div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-plum-950/60 block font-bold">Net Fiscal Performance</span>
                <div className={`text-2xl font-serif font-extrabold mt-2 ${financialCalculations.isProfit ? 'text-emerald-800' : 'text-rose-800'}`}>
                  {financialCalculations.isProfit ? '₨ +' : '₨ -'} {financialCalculations.netAmount.toLocaleString()}
                </div>
                <span className={`inline-block text-[9px] font-mono font-bold px-2 py-0.5 mt-2 rounded border uppercase ${
                  financialCalculations.isProfit 
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                    : 'bg-rose-50 text-rose-800 border-rose-200'
                }`}>
                  {financialCalculations.isProfit ? 'Net Annual Profit' : 'Deficit / Loss Reserve'}
                </span>
              </div>
            </div>

            {/* DYNAMIC PROGRESS CASHFLOW METRIC PANEL */}
            <div className="bg-white text-plum-950 p-6 rounded-xl shadow-lg border border-gold-dark/15 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <h3 className="font-serif text-base font-bold text-plum-950">Visual Cashflow Margin Metre (FY {selectedYear})</h3>
                  <p className="text-[11px] text-plum-950/60 font-sans">Illustrates the ratio of combined expenses vs. net profit margins relative to total revenues</p>
                </div>
                {financialCalculations.grossRevenue > 0 && (
                  <div className="text-right flex gap-4 text-xs font-mono font-bold">
                    <div className="text-rose-700">Expense: {financialCalculations.expenseRatio}%</div>
                    <div className="text-emerald-700">Net Profit: {financialCalculations.profitRatio}%</div>
                  </div>
                )}
              </div>

              {financialCalculations.grossRevenue === 0 ? (
                <div className="bg-plum-50 py-6 text-center italic text-xs text-plum-900 rounded">
                  No active client bookings logged under Year {selectedYear}. Log revenues to activate margins metric tracker.
                </div>
              ) : (
                <div className="space-y-2">
                  {/* Dynamic split progress slider bar */}
                  <div className="h-6 w-full rounded-lg overflow-hidden flex shadow-inner border border-plum-950/15">
                    {/* Expense bar */}
                    <div 
                      style={{ width: `${financialCalculations.expenseRatio}%` }}
                      className="bg-gradient-to-r from-rose-800 to-rose-600 h-full flex items-center justify-center text-[9px] font-mono font-bold text-white transition-all duration-700"
                    >
                      {financialCalculations.expenseRatio > 10 ? `${financialCalculations.expenseRatio}% Outflows` : ''}
                    </div>
                    {/* Profit bar */}
                    <div 
                      style={{ width: `${100 - financialCalculations.expenseRatio}%` }}
                      className="bg-gradient-to-r from-emerald-600 to-emerald-800 h-full flex items-center justify-center text-[9px] font-mono font-bold text-white transition-all duration-700"
                    >
                      {100 - financialCalculations.expenseRatio > 10 ? `${100 - financialCalculations.expenseRatio}% Net Profit` : ''}
                    </div>
                  </div>
                  <div className="flex justify-between text-[10px] text-plum-950/50 font-mono">
                    <span>Total Expense: ₨ {financialCalculations.totalExpenses.toLocaleString()}</span>
                    <span>Net Profit: ₨ {(financialCalculations.grossRevenue - financialCalculations.totalExpenses).toLocaleString()}</span>
                  </div>
                </div>
              )}

              {/* EXPENSE CATEGORY BREAKDOWN PILLS */}
              <div className="border-t border-plum-950/10 pt-4">
                <span className="text-[10px] uppercase font-mono tracking-widest text-plum-950/65 block font-bold mb-3">Outflow Sectors Allocation:</span>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  <div className="bg-plum-50 p-2.5 rounded border border-plum-950/5">
                    <span className="text-[9px] font-mono text-plum-950/50 block font-bold leading-none uppercase">Employee Salaries</span>
                    <span className="block text-xs font-bold text-plum-950 font-mono mt-1.5">₨ {financialCalculations.salaries.toLocaleString()}</span>
                  </div>
                  <div className="bg-plum-50 p-2.5 rounded border border-plum-950/5">
                    <span className="text-[9px] font-mono text-plum-950/50 block font-bold leading-none uppercase">Commissions (Event)</span>
                    <span className="block text-xs font-bold text-plum-950 font-mono mt-1.5">₨ {financialCalculations.eventCommissions.toLocaleString()}</span>
                  </div>
                  <div className="bg-plum-50 p-2.5 rounded border border-plum-950/5">
                    <span className="text-[9px] font-mono text-plum-950/50 block font-bold leading-none uppercase">Commissions (Monthly)</span>
                    <span className="block text-xs font-bold text-plum-950 font-mono mt-1.5">₨ {financialCalculations.monthlyCommissions.toLocaleString()}</span>
                  </div>
                  <div className="bg-plum-50 p-2.5 rounded border border-plum-950/5">
                    <span className="text-[9px] font-mono text-plum-950/50 block font-bold leading-none uppercase">Partner Vendors</span>
                    <span className="block text-xs font-bold text-plum-950 font-mono mt-1.5">₨ {financialCalculations.vendorPayments.toLocaleString()}</span>
                  </div>
                  <div className="bg-plum-50 p-2.5 rounded border border-plum-950/5">
                    <span className="text-[9px] font-mono text-plum-950/50 block font-bold leading-none uppercase">OpEx (Imported Blooms)</span>
                    <span className="block text-xs font-bold text-plum-950 font-mono mt-1.5">₨ {financialCalculations.opex.toLocaleString()}</span>
                  </div>
                  <div className="bg-plum-50 p-2.5 rounded border border-plum-950/5">
                    <span className="text-[9px] font-mono text-plum-950/50 block font-bold leading-none uppercase">Other Expenses</span>
                    <span className="block text-xs font-bold text-plum-950 font-mono mt-1.5">₨ {financialCalculations.otherExpenses.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* LEDGER TRANSACTION HISTORY TABLE / CRISP WHITE BACKGROUND CARD */}
            <div className="bg-white text-plum-950 rounded-xl shadow-xl overflow-hidden border border-gold-dark/15">
              <div className="p-4 bg-gold-accent/15 border-b border-gold-dark/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <span className="font-serif text-sm font-semibold text-plum-900 uppercase tracking-widest">Financial Ledger Item Register ({selectedYear})</span>
                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                  <div className="relative w-full md:w-60">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-plum-900/40" />
                    <input
                      type="text"
                      placeholder="Search transactions..."
                      value={ledgSearchTerm}
                      onChange={(e) => { setLedgSearchTerm(e.target.value); setLedgPage(1); }}
                      className="pl-8 pr-3 py-1 bg-white text-plum-900 border border-slate-300 rounded text-xs w-full focus:outline-none focus:border-gold-dark font-sans placeholder-slate-400"
                    />
                  </div>
                  <span className="text-[10px] font-mono text-plum-900/60 whitespace-nowrap">Total Listings: {sortedAndFilteredLedger.length} Records</span>
                </div>
              </div>

              {activeYearLedger.length === 0 && paginatedLedger.length === 0 ? (
                <div className="py-16 text-center text-plum-950/50 italic text-sm">
                  No transaction ledger logs filed under active fiscal year.
                </div>
              ) : (
                <div>
                  <div className="overflow-x-auto font-sans">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        {/* Column Sorting Headers */}
                        <tr className="bg-plum-950/5 border-b border-plum-950/10 text-plum-950/80 uppercase tracking-wider font-mono text-[9px]">
                          <th className="py-3 px-4 cursor-pointer hover:bg-plum-950/10 select-none group transition text-left" onClick={() => handleLedgSort('date')}>
                            <span className="flex items-center gap-1">Date {renderSortArrow('date', ledgSortField, ledgSortAsc)}</span>
                          </th>
                          <th className="py-3 px-4 cursor-pointer hover:bg-plum-950/10 select-none group transition text-left" onClick={() => handleLedgSort('month')}>
                            <span className="flex items-center gap-1">Month Tracker {renderSortArrow('month', ledgSortField, ledgSortAsc)}</span>
                          </th>
                          <th className="py-3 px-4 cursor-pointer hover:bg-plum-950/10 select-none group transition text-left" onClick={() => handleLedgSort('category')}>
                            <span className="flex items-center gap-1">Category System {renderSortArrow('category', ledgSortField, ledgSortAsc)}</span>
                          </th>
                          <th className="py-3 px-4 cursor-pointer hover:bg-plum-950/10 select-none group transition text-left" onClick={() => handleLedgSort('description')}>
                            <span className="flex items-center gap-1">Transaction Description {renderSortArrow('description', ledgSortField, ledgSortAsc)}</span>
                          </th>
                          <th className="py-3 px-4 cursor-pointer hover:bg-plum-950/10 select-none group transition text-right" onClick={() => handleLedgSort('flow')}>
                            <span className="flex items-center justify-end gap-1">Flow In / Out {renderSortArrow('flow', ledgSortField, ledgSortAsc)}</span>
                          </th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                        {/* Column Filtering Row */}
                        <tr className="bg-plum-950/5 border-b border-plum-950/10">
                          <th className="py-1 px-2">
                            <input 
                              type="text"
                              placeholder="Date..."
                              value={ledgColFilterDate}
                              onChange={(e) => { setLedgColFilterDate(e.target.value); setLedgPage(1); }}
                              className="w-full bg-white text-plum-900 border border-slate-300 rounded px-2 py-1 text-[10px] font-sans font-normal focus:outline-none focus:border-gold-dark"
                            />
                          </th>
                          <th className="py-1 px-2">
                            <input 
                              type="text"
                              placeholder="Month..."
                              value={ledgColFilterMonth}
                              onChange={(e) => { setLedgColFilterMonth(e.target.value); setLedgPage(1); }}
                              className="w-full bg-white text-plum-900 border border-slate-300 rounded px-2 py-1 text-[10px] font-sans font-normal focus:outline-none focus:border-gold-dark"
                            />
                          </th>
                          <th className="py-1 px-2">
                            <select 
                              value={ledgColFilterCategory}
                              onChange={(e) => { setLedgColFilterCategory(e.target.value); setLedgPage(1); }}
                              className="w-full bg-white text-plum-900 border border-slate-300 rounded px-1.5 py-1 text-[10px] font-sans font-normal focus:outline-none focus:border-gold-dark"
                            >
                              <option value="All">All Categories</option>
                              <option value="Gross Client Booking">Gross Client Booking</option>
                              <option value="Employee Salaries">Employee Salaries</option>
                              <option value="Operating Expenses (OpEx)">Operating Expenses (OpEx)</option>
                              <option value="Partner Vendor Payments">Partner Vendor Payments</option>
                              <option value="Commissions (Event-Based)">Commissions (Event-Based)</option>
                              <option value="Commissions (Monthly)">Commissions (Monthly)</option>
                            </select>
                          </th>
                          <th className="py-1 px-2">
                            <input 
                              type="text"
                              placeholder="Description..."
                              value={ledgColFilterDescription}
                              onChange={(e) => { setLedgColFilterDescription(e.target.value); setLedgPage(1); }}
                              className="w-full bg-white text-plum-900 border border-slate-300 rounded px-2 py-1 text-[10px] font-sans font-normal focus:outline-none focus:border-gold-dark"
                            />
                          </th>
                          <th className="py-1 px-2">
                            <select 
                              value={ledgColFilterFlow}
                              onChange={(e) => { setLedgColFilterFlow(e.target.value); setLedgPage(1); }}
                              className="w-full bg-white text-plum-900 border border-slate-300 rounded px-1.5 py-1 text-[10px] font-sans font-normal focus:outline-none focus:border-gold-dark"
                            >
                              <option value="All">All Flows</option>
                              <option value="Revenue">Revenue In (+)</option>
                              <option value="Expense">Expense Out (-)</option>
                            </select>
                          </th>
                          <th className="py-1 px-2"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-plum-950/5 font-sans font-medium text-plum-950">
                        {paginatedLedger.map(item => (
                          <tr key={item.id} className="hover:bg-plum-50/50 transition">
                            <td className="py-3.5 px-4 font-mono text-[11px] text-slate-800">{item.date}</td>
                            <td className="py-3.5 px-4 font-semibold text-plum-950">{item.month}</td>
                            <td className="py-3.5 px-4">
                              <span className={`inline-block px-2.5 py-0.5 text-[9px] uppercase font-mono tracking-wide rounded ${
                                item.type === 'Revenue' 
                                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                                  : 'bg-rose-50 text-rose-800 border border-rose-200'
                              }`}>
                                {item.category}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 block-td">{item.description}</td>
                            <td className={`py-3.5 px-4 text-right font-bold font-mono text-sm ${
                              item.type === 'Revenue' ? 'text-emerald-700' : 'text-rose-700'
                            }`}>
                              {item.type === 'Revenue' ? '+' : '-'} ₨ {item.amount.toLocaleString()}
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <button
                                type="button"
                                onClick={() => handleDeleteLedger(item.id)}
                                className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 p-1.5 rounded transition inline-block"
                                title="Delete Entry"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {/* Pagination control block */}
                  {renderPagination(ledgPage, ledgPageSize, sortedAndFilteredLedger.length, setLedgPage)}
                </div>
              )}
            </div>

          </div>
        )}

        {/* ----------------- TAB 4: REAL-TIME NOTIFICATION FEED ----------------- */}
        {activeTab === 'Notifications' && (
          <div className="space-y-6">
            <div className="bg-[#1b031f] border border-gold-dark/15 p-6 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-xl text-gold-accent tracking-wide">Real-time Lead & Inquiry Alerts</h3>
                <p className="text-xs text-champagne-light/60 mt-1">
                  Track live form submissions, client feedback, and consultation requests instantly.
                </p>
              </div>
              {unreadNotifCount > 0 && (
                <button
                  onClick={markAllNotificationsRead}
                  className="bg-gold-accent hover:bg-gold-light text-plum-950 font-bold px-4 py-2 rounded text-xs uppercase tracking-widest flex items-center gap-1.5 transition"
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" /> Mark All as Read
                </button>
              )}
            </div>

            {notifications.length === 0 ? (
              <div className="bg-[#1b031f]/45 text-center p-12 rounded-lg border border-gold-dark/10">
                <Bell className="w-12 h-12 text-champagne-light/20 mx-auto mb-3 text-gold-accent/40 animate-bounce" />
                <p className="font-serif text-lg text-champagne-light/70">Pristine silence</p>
                <p className="text-xs text-champagne-light/40 mt-1">No pending notifications or incoming inquiries recorded yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    className={`p-5 rounded-lg border transition duration-300 ${
                      item.read
                        ? 'bg-[#1b031f]/45 border-gold-dark/10'
                        : 'bg-[#2a0730]/75 border-gold-accent/30 shadow-lg'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-full mt-0.5 ${
                          item.type === 'inquiry' ? 'bg-gold-accent/10 text-gold-accent' : 'bg-pink-500/10 text-pink-400'
                        }`}>
                          {item.type === 'inquiry' ? <Mail className="w-4 h-4" /> : <Star className="w-4 h-4" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-serif font-bold text-base text-white">{item.title}</h4>
                            {!item.read && (
                              <span className="bg-gold-accent text-plum-950 font-mono text-[9px] uppercase font-extrabold px-1.5 py-0.5 rounded leading-none">New</span>
                            )}
                          </div>
                          <p className="text-xs text-champagne-light/50 font-mono mt-0.5">{item.timestamp}</p>
                          <p className="text-sm text-champagne-light/90 mt-2 leading-relaxed">{item.message}</p>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2 self-start md:self-center shrink-0">
                        {!item.read && (
                          <button
                            onClick={() => {
                              setNotifications(prev => prev.map(n => n.id === item.id ? { ...n, read: true } : n));
                              setTimeout(() => window.dispatchEvent(new CustomEvent('aura_web_config_updated')), 100);
                            }}
                            className="text-[10px] uppercase font-bold tracking-wider px-3 py-1.5 bg-gold-accent/15 hover:bg-gold-accent/25 text-gold-accent rounded border border-gold-accent/25 transition duration-200"
                          >
                            Mark Read
                          </button>
                        )}
                        {item.type === 'inquiry' && (
                          <button
                            onClick={() => {
                              // Dynamic intelligent parsing
                              const isAyesha = item.message.includes('Ayesha') || item.message.includes('Aisha') || item.message.includes('Sana') || item.message.includes('Sanam');
                              let sampleName = 'Inquiry Client';
                              let samplePhone = '+92 300 0000000';
                              let sampleEmail = 'client@aura.gov.pk';
                              
                              if (isAyesha) {
                                sampleName = 'Ayesha Khan';
                                samplePhone = '+92 300 1234567';
                                sampleEmail = 'ayesha.k@gmail.com';
                              } else if (item.message.includes('Hamza')) {
                                sampleName = 'Hamza Yusuf';
                                samplePhone = '+92 301 5552321';
                                sampleEmail = 'hyusuf@outlook.com';
                              } else {
                                // Extract details from potential dynamic message
                                const matches = item.message.match(/([A-Z][a-z]+(\s[A-Z][a-z]+)?)/);
                                if (matches && matches[0]) sampleName = matches[0];
                              }

                              const newC: Customer = {
                                id: 'c-' + Date.now(),
                                fullName: sampleName,
                                phone: samplePhone,
                                email: sampleEmail,
                                targetDate: '2026-12-01',
                                location: 'DHA Karachi',
                                status: 'Potential'
                              };
                              setCustomers([newC, ...customers]);
                              alert(`Successfully converted inquiry lead to official client card for "${sampleName}"!`);
                              
                              // Delete notification once converted
                              setNotifications(prev => prev.filter(n => n.id !== item.id));
                              setTimeout(() => window.dispatchEvent(new CustomEvent('aura_web_config_updated')), 100);
                            }}
                            className="text-[10px] uppercase font-bold tracking-wider px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-400 rounded border border-emerald-500/25 transition duration-200"
                          >
                            Convert to Customer
                          </button>
                        )}
                        <button
                          onClick={() => removeNotification(item.id)}
                          className="text-[#100310] font-bold p-2 rounded bg-red-600/20 hover:bg-red-600/40 text-red-400 border border-red-500/20 text-xs transition duration-200 flex items-center justify-center"
                          title="Delete Alert"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ----------------- TAB 5: WEBSITE CONTROLLING FEATURES ----------------- */}
        {activeTab === 'Website Customizer' && (
          <div className="space-y-6">
            <div className="bg-[#1b031f] border border-gold-dark/15 p-6 rounded-lg">
              <h3 className="font-serif text-xl text-gold-accent tracking-wide">Brand Experience Architecture Console</h3>
              <p className="text-xs text-champagne-light/60 mt-1">
                Customize website sections, colors, landing hero narratives, and dynamic curation files instantly. Updates sync in real-time.
              </p>
            </div>

            {/* Customizer Sub-Panes */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
              {/* Left Pane Menus */}
              <div className="bg-[#1b031f]/55 border border-gold-dark/15 rounded-lg overflow-hidden shrink-0">
                <div className="p-4 border-b border-gold-dark/10 bg-[#29072d]">
                  <span className="text-[10px] uppercase tracking-widest font-mono font-bold text-gold-accent">CUSTOMIZER PANELS</span>
                </div>
                <div className="flex flex-col divide-y divide-gold-dark/10">
                  {[
                    { id: 'sections', name: 'Sections Control', icon: Layers },
                    { id: 'colors', name: 'Color Palette', icon: Palette },
                    { id: 'hero', name: 'Hero Copy & Media', icon: Sparkles },
                    { id: 'services', name: 'Tailoring Services', icon: Briefcase },
                    { id: 'highlights', name: 'Portfolio Ranges', icon: Award },
                    { id: 'testimonials', name: 'Patrons Testimonials', icon: Users }
                  ].map(pane => {
                    const IconComp = pane.icon;
                    return (
                      <button
                        key={pane.id}
                        onClick={() => setActiveCustomizerPane(pane.id as any)}
                        className={`p-4 text-left text-xs uppercase tracking-widest font-mono flex items-center gap-3 transition duration-200 ${
                          activeCustomizerPane === pane.id
                            ? 'bg-gold-accent text-plum-950 font-bold font-semibold'
                            : 'text-champagne-light hover:bg-[#2c0e31]'
                        }`}
                      >
                        <IconComp className="w-4 h-4" />
                        {pane.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Customizer Area */}
              <div className="lg:col-span-3 bg-[#110312] border border-gold-dark/15 p-6 rounded-lg space-y-6">
                
                {/* 1. SECTIONS CONTROLLER */}
                {activeCustomizerPane === 'sections' && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-serif text-lg text-white font-bold mb-1">Interactive Layout Structure</h4>
                      <p className="text-xs text-champagne-light/50">Enable, disable, or append customized structural segments of the landing page.</p>
                    </div>

                    <div className="space-y-3 divide-y divide-gold-dark/10">
                      {webConfig.sections.map((sect: any) => (
                        <div key={sect.id} className="pt-3 flex items-center justify-between">
                          <span className="text-sm text-champagne-light/90 font-serif">{sect.name}</span>
                          <button
                            onClick={() => {
                              const updatedSections = webConfig.sections.map((s: any) =>
                                s.id === sect.id ? { ...s, enabled: !s.enabled } : s
                              );
                              setWebConfig({ ...webConfig, sections: updatedSections });
                              setTimeout(triggerConfigUpdated, 50);
                            }}
                            className={`px-3 py-1 rounded text-[10px] uppercase font-mono font-bold tracking-wider transition ${
                              sect.enabled
                                ? 'bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30'
                                : 'bg-red-950/20 hover:bg-red-950/30 text-red-400 border border-red-500/30'
                            }`}
                          >
                            {sect.enabled ? 'ACTIVE' : 'MUTED'}
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Add Custom Section */}
                    <div className="border-t border-gold-dark/15 pt-6 space-y-4">
                      <div>
                        <h5 className="font-serif text-sm text-gold-accent font-bold uppercase tracking-wide">Inject Custom Section</h5>
                        <p className="text-[11px] text-champagne-light/50 font-mono">Assemble custom landing section objects to tell particular stories.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase tracking-widest text-gold-accent font-bold block">Section Header Title</label>
                          <input
                            type="text"
                            id="custom-sect-title"
                            placeholder="e.g. Royal Heritage Gazebo Curation"
                            className="w-full text-xs px-3 py-2 border border-gold-dark/30 rounded text-champagne-light bg-[#1d0321] focus:ring-1 focus:ring-gold-accent focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase tracking-widest text-gold-accent font-bold block">Image Placement URL</label>
                          <input
                            type="text"
                            id="custom-sect-image"
                            placeholder="e.g. https://images.unsplash.com/promo..."
                            className="w-full text-xs px-3 py-2 border border-gold-dark/30 rounded text-champagne-light bg-[#1d0321] focus:ring-1 focus:ring-gold-accent focus:outline-none"
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-widest text-gold-accent font-bold block">Section Narrative / Copyset Body</label>
                        <textarea
                          id="custom-sect-desc"
                          rows={2}
                          placeholder="Introduce exclusive components of your theme range..."
                          className="w-full text-xs px-3 py-2 border border-gold-dark/30 rounded text-champagne-light bg-[#1d0321] focus:ring-1 focus:ring-gold-accent focus:outline-none"
                        />
                      </div>
                      <button
                        onClick={() => {
                          const titleEl = document.getElementById('custom-sect-title') as HTMLInputElement;
                          const imageEl = document.getElementById('custom-sect-image') as HTMLInputElement;
                          const descEl = document.getElementById('custom-sect-desc') as HTMLTextAreaElement;
                          if (titleEl && titleEl.value) {
                            const newCustom = {
                              id: 'custom-' + Date.now(),
                              title: titleEl.value,
                              image: imageEl?.value || 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=80&w=600',
                              description: descEl?.value || 'Premium custom atmospheric section'
                            };
                            setWebConfig({
                              ...webConfig,
                              customSections: [...(webConfig.customSections || []), newCustom]
                            } as any);
                            titleEl.value = '';
                            if (imageEl) imageEl.value = '';
                            if (descEl) descEl.value = '';
                            alert("Custom Section injected successfully!");
                            setTimeout(triggerConfigUpdated, 100);
                          } else {
                            alert("Please provide at least a section title!");
                          }
                        }}
                        className="bg-gold-accent hover:bg-gold-light text-plum-950 text-xs font-bold font-sans uppercase tracking-widest px-4 py-2 rounded transition"
                      >
                        Incorporate Custom Section
                      </button>

                      {webConfig.customSections && webConfig.customSections.length > 0 && (
                        <div className="border-t border-gold-dark/10 pt-4 mt-4">
                          <label className="text-[10px] uppercase tracking-widest text-gold-accent font-bold block mb-2">Deployed Custom Sections</label>
                          <div className="space-y-2">
                            {webConfig.customSections.map((cs: any) => (
                              <div key={cs.id} className="flex justify-between items-center bg-[#1d0321] p-3 rounded border border-gold-dark/10">
                                <span className="font-serif text-sm font-semibold">{cs.title}</span>
                                <button
                                  onClick={() => {
                                    const filtered = (webConfig.customSections || []).filter((x: any) => x.id !== cs.id);
                                    setWebConfig({ ...webConfig, customSections: filtered });
                                    setTimeout(triggerConfigUpdated, 100);
                                  }}
                                  className="text-red-400 hover:text-red-500 text-xs uppercase font-mono font-bold"
                                >
                                  Remove
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 2. COLORS & PALETTE */}
                {activeCustomizerPane === 'colors' && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-serif text-lg text-white font-bold mb-1">Color Scheme Architecture</h4>
                      <p className="text-xs text-champagne-light/50">Edit color fields representing individual components. Applies instantly.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        { key: 'background_950', name: 'Deep Theme Canvas (Deep Purple/Plum)' },
                        { key: 'background_900', name: 'Ambient Glass Cards Backing' },
                        { key: 'gold_accent', name: 'Primary Accent Gold / Borders' },
                        { key: 'gold_light', name: 'Soft Highlight Gold (Hover States)' },
                        { key: 'textColor', name: 'Editorial Text Shade' }
                      ].map((item) => (
                        <div key={item.key} className="p-4 bg-[#1b031f]/55 border border-gold-dark/10 rounded space-y-2">
                          <label className="text-[11px] uppercase tracking-wider text-champagne-light font-bold block">{item.name}</label>
                          <div className="flex gap-2">
                            <input
                              type="color"
                              value={(webConfig.colors as any)[item.key] || '#140514'}
                              onChange={(e) => {
                                const newColors = { ...webConfig.colors, [item.key]: e.target.value };
                                setWebConfig({ ...webConfig, colors: newColors });
                                setTimeout(triggerConfigUpdated, 50);
                              }}
                              className="w-10 h-10 bg-transparent border-0 rounded cursor-pointer shrink-0"
                            />
                            <input
                              type="text"
                              value={(webConfig.colors as any)[item.key] || '#140514'}
                              onChange={(e) => {
                                const newColors = { ...webConfig.colors, [item.key]: e.target.value };
                                setWebConfig({ ...webConfig, colors: newColors });
                                setTimeout(triggerConfigUpdated, 50);
                              }}
                              className="w-full text-xs px-3 py-2 border border-gold-dark/30 rounded text-champagne-light bg-[#1d0321] font-mono leading-none"
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 flex gap-3">
                      <button
                        onClick={() => {
                          setWebConfig({
                            ...webConfig,
                            colors: {
                              background_950: '#140514',
                              background_900: '#220a22',
                              background_800: '#351035',
                              gold_accent: '#d4af37',
                              gold_dark: '#aa8410',
                              gold_light: '#f6e6c2',
                              textColor: '#ffffff',
                              cardBackground: '#ffffff'
                            }
                          });
                          setTimeout(triggerConfigUpdated, 100);
                        }}
                        className="bg-transparent border border-gold-dark/35 hover:border-gold-accent hover:text-white px-4 py-2 rounded text-xs uppercase tracking-widest font-mono text-champagne-light/70 transition"
                      >
                        Reset Default Plum & Champagne
                      </button>
                    </div>
                  </div>
                )}

                {/* 3. HERO COPY & MEDIA */}
                {activeCustomizerPane === 'hero' && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-serif text-lg text-white font-bold mb-1">Curation Editorial & Media</h4>
                      <p className="text-xs text-champagne-light/50">Edit text block details and backgrounds shown on initial entrance.</p>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-widest text-[#d4af37] font-bold block">Brand Name / Headline</label>
                        <input
                          type="text"
                          value={webConfig.hero.title}
                          onChange={(e) => {
                            setWebConfig({ ...webConfig, hero: { ...webConfig.hero, title: e.target.value } });
                            setTimeout(triggerConfigUpdated, 50);
                          }}
                          className="w-full text-xs px-3 py-2 border border-gold-dark/30 rounded text-champagne-light bg-[#1d0321] focus:ring-1 focus:ring-gold-accent focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-widest text-[#d4af37] font-bold block">Hero Luxury Subline (Serif Capitalized)</label>
                        <input
                          type="text"
                          value={webConfig.hero.subtitle}
                          onChange={(e) => {
                            setWebConfig({ ...webConfig, hero: { ...webConfig.hero, subtitle: e.target.value } });
                            setTimeout(triggerConfigUpdated, 50);
                          }}
                          className="w-full text-xs px-3 py-2 border border-gold-dark/30 rounded text-champagne-light bg-[#1d0321] focus:ring-1 focus:ring-gold-accent focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-widest text-[#d4af37] font-bold block">Narrative Description</label>
                        <textarea
                          rows={3}
                          value={webConfig.hero.description}
                          onChange={(e) => {
                            setWebConfig({ ...webConfig, hero: { ...webConfig.hero, description: e.target.value } });
                            setTimeout(triggerConfigUpdated, 50);
                          }}
                          className="w-full text-xs px-3 py-2 border border-gold-dark/30 rounded text-champagne-light bg-[#1d0321] focus:ring-1 focus:ring-gold-accent focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-widest text-[#d4af37] font-bold block">Background Hero Image (URL)</label>
                        <input
                          type="text"
                          value={webConfig.hero.image}
                          onChange={(e) => {
                            setWebConfig({ ...webConfig, hero: { ...webConfig.hero, image: e.target.value } });
                            setTimeout(triggerConfigUpdated, 50);
                          }}
                          className="w-full text-xs px-3 py-2 border border-gold-dark/30 rounded text-champagne-light bg-[#1d0321] focus:ring-1 focus:ring-gold-accent focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. DYNAMIC SERVICES */}
                {activeCustomizerPane === 'services' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center bg-[#210226] p-3 rounded border border-gold-dark/15">
                      <div>
                        <h4 className="font-serif text-lg text-white font-bold mb-1">Curation Programs (Services)</h4>
                        <p className="text-xs text-champagne-light/50">Edit current dynamic packages and custom event services in real time.</p>
                      </div>
                      <button
                        onClick={handleAddNewService}
                        className="bg-gold-accent hover:bg-gold-light text-plum-950 text-xs px-3 py-1.5 rounded font-bold font-sans uppercase tracking-wider flex items-center gap-1 transition"
                      >
                        <Plus className="w-3.5 h-3.5 stroke-[3]" /> Add Service
                      </button>
                    </div>

                    <div className="space-y-4">
                      {dynamicServices.map((srv: any) => (
                        <div key={srv.id} className="p-4 bg-[#1b031f]/55 border border-gold-dark/15 rounded-lg space-y-4">
                          {editingServiceId === srv.id ? (
                            <div className="space-y-3">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="text-[9px] uppercase tracking-widest text-gold-accent font-bold">Service Title</label>
                                  <input
                                    type="text"
                                    value={srv.title}
                                    onChange={(e) => {
                                      setDynamicServices(dynamicServices.map(x => x.id === srv.id ? { ...x, title: e.target.value } : x));
                                    }}
                                    className="w-full text-xs px-3 py-2 border border-gold-dark/30 rounded text-champagne-light bg-[#1d0321]"
                                  />
                                </div>
                                <div>
                                  <label className="text-[9px] uppercase tracking-widest text-gold-accent font-bold">Price Start (₨)</label>
                                  <input
                                    type="number"
                                    value={srv.priceStart}
                                    onChange={(e) => {
                                      setDynamicServices(dynamicServices.map(x => x.id === srv.id ? { ...x, priceStart: Number(e.target.value) } : x));
                                    }}
                                    className="w-full text-xs px-3 py-2 border border-gold-dark/30 rounded text-champagne-light bg-[#1d0321]"
                                  />
                                </div>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="text-[9px] uppercase tracking-widest text-gold-accent font-bold">Subtitle Accent</label>
                                  <input
                                    type="text"
                                    value={srv.subtitle}
                                    onChange={(e) => {
                                      setDynamicServices(dynamicServices.map(x => x.id === srv.id ? { ...x, subtitle: e.target.value } : x));
                                    }}
                                    className="w-full text-xs px-3 py-2 border border-gold-dark/30 rounded text-champagne-light bg-[#1d0321]"
                                  />
                                </div>
                                <div>
                                  <label className="text-[9px] uppercase tracking-widest text-gold-accent font-bold">Image Placement URL</label>
                                  <input
                                    type="text"
                                    value={srv.image}
                                    onChange={(e) => {
                                      setDynamicServices(dynamicServices.map(x => x.id === srv.id ? { ...x, image: e.target.value } : x));
                                    }}
                                    className="w-full text-xs px-3 py-2 border border-gold-dark/30 rounded text-champagne-light bg-[#1d0321]"
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="text-[9px] uppercase tracking-widest text-gold-accent font-bold">Description Narrative</label>
                                <textarea
                                  value={srv.description}
                                  onChange={(e) => {
                                    setDynamicServices(dynamicServices.map(x => x.id === srv.id ? { ...x, description: e.target.value } : x));
                                  }}
                                  className="w-full text-xs px-3 py-2 border border-gold-dark/30 rounded text-champagne-light bg-[#1d0321]"
                                  rows={2}
                                />
                              </div>
                              <button
                                onClick={() => {
                                  setEditingServiceId(null);
                                  setTimeout(triggerConfigUpdated, 100);
                                }}
                                className="bg-gold-accent hover:bg-gold-light text-[#120214] text-[10px] uppercase font-bold px-3 py-1.5 rounded font-mono transition"
                              >
                                Save Changes
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between gap-4">
                              <div className="flex items-center gap-3">
                                <img src={resolveImgUrl(srv.image)} className="w-12 h-12 rounded object-cover shrink-0 border border-gold-dark/20" alt={srv.title} />
                                <div>
                                  <h5 className="font-serif text-sm text-gold-accent font-semibold">{srv.title}</h5>
                                  <p className="text-[11px] text-champagne-light/40 font-mono">Starts at ₨ {srv.priceStart.toLocaleString()}</p>
                                </div>
                              </div>
                              <div className="flex gap-3">
                                <button
                                  onClick={() => setEditingServiceId(srv.id)}
                                  className="text-xs font-bold text-gold-accent hover:text-white underline font-mono uppercase transition"
                                >
                                  Modify
                                </button>
                                <button
                                  onClick={() => handleDeleteService(srv.id)}
                                  className="text-xs text-red-400 hover:text-red-500 font-mono uppercase transition"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 5. PORTFOLIO & RANGES */}
                {activeCustomizerPane === 'highlights' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center bg-[#210226] p-3 rounded border border-gold-dark/15">
                      <div>
                        <h4 className="font-serif text-lg text-white font-bold mb-1">Portfolio & Birthday Package Ranges</h4>
                        <p className="text-xs text-champagne-light/50">Manage default packages, birthdays, Nikahs, decor, dinner & DJ sets.</p>
                      </div>
                      <button
                        onClick={handleAddNewHighlight}
                        className="bg-gold-accent hover:bg-gold-light text-plum-950 text-xs px-3 py-1.5 rounded font-bold font-sans uppercase tracking-wider flex items-center gap-1 transition"
                      >
                        <Plus className="w-3.5 h-3.5 stroke-[3]" /> Add Package
                      </button>
                    </div>

                    <div className="space-y-4">
                      {dynamicHighlights.map((high: any) => (
                        <div key={high.id} className="p-4 bg-[#1b031f]/55 border border-gold-dark/15 rounded-lg space-y-4">
                          {editingHighlightId === high.id ? (
                            <div className="space-y-3">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="text-[9px] uppercase tracking-widest text-gold-accent font-bold">Package Name / Title</label>
                                  <input
                                    type="text"
                                    value={high.title}
                                    onChange={(e) => {
                                      setDynamicHighlights(dynamicHighlights.map(x => x.id === high.id ? { ...x, title: e.target.value } : x));
                                    }}
                                    className="w-full text-xs px-3 py-2 border border-gold-dark/30 rounded text-champagne-light bg-[#1d0321]"
                                  />
                                </div>
                                <div>
                                  <label className="text-[9px] uppercase tracking-widest text-gold-accent font-bold">Price (₨)</label>
                                  <input
                                    type="number"
                                    value={high.price}
                                    onChange={(e) => {
                                      setDynamicHighlights(dynamicHighlights.map(x => x.id === high.id ? { ...x, price: Number(e.target.value) } : x));
                                    }}
                                    className="w-full text-xs px-3 py-2 border border-gold-dark/30 rounded text-champagne-light bg-[#1d0321]"
                                  />
                                </div>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="text-[9px] uppercase tracking-widest text-gold-accent font-bold">Category Class</label>
                                  <select
                                    value={high.category}
                                    onChange={(e) => {
                                      setDynamicHighlights(dynamicHighlights.map(x => x.id === high.id ? { ...x, category: e.target.value as any } : x));
                                    }}
                                    className="w-full text-xs px-3 py-2 border border-gold-dark/30 rounded text-champagne-light bg-[#1d0321]"
                                  >
                                    <option value="Birthday">Birthday</option>
                                    <option value="Nikah">Nikah</option>
                                    <option value="Wedding">Wedding</option>
                                    <option value="Office Decor">Office Decor</option>
                                  </select>
                                </div>
                                <div>
                                  <label className="text-[9px] uppercase tracking-widest text-gold-accent font-bold">Image URL</label>
                                  <input
                                    type="text"
                                    value={high.image}
                                    onChange={(e) => {
                                      setDynamicHighlights(dynamicHighlights.map(x => x.id === high.id ? { ...x, image: e.target.value } : x));
                                    }}
                                    className="w-full text-xs px-3 py-2 border border-gold-dark/30 rounded text-champagne-light bg-[#1d0321]"
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="text-[9px] uppercase tracking-widest text-gold-accent font-bold">Description</label>
                                <textarea
                                  value={high.description}
                                  onChange={(e) => {
                                    setDynamicHighlights(dynamicHighlights.map(x => x.id === high.id ? { ...x, description: e.target.value } : x));
                                  }}
                                  className="w-full text-xs px-3 py-2 border border-gold-dark/30 rounded text-champagne-light bg-[#1d0321]"
                                  rows={2}
                                />
                              </div>
                              <button
                                onClick={() => {
                                  setEditingHighlightId(null);
                                  setTimeout(triggerConfigUpdated, 100);
                                }}
                                className="bg-gold-accent hover:bg-gold-light text-[#120214] text-[10px] uppercase font-bold px-3 py-1.5 rounded font-mono transition"
                              >
                                Save Changes
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between gap-4">
                              <div className="flex items-center gap-3">
                                <img src={resolveImgUrl(high.image)} className="w-12 h-12 rounded object-cover shrink-0 border border-gold-dark/20" alt={high.title} />
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h5 className="font-serif text-sm text-gold-accent font-semibold">{high.title}</h5>
                                    <span className="text-[9px] uppercase bg-gold-accent/15 text-gold-accent px-1.5 py-0.5 rounded font-mono font-bold leading-none">{high.category}</span>
                                  </div>
                                  <p className="text-[11px] text-champagne-light/40 font-mono">₨ {high.price.toLocaleString()}</p>
                                </div>
                              </div>
                              <div className="flex gap-3">
                                <button
                                  onClick={() => setEditingHighlightId(high.id)}
                                  className="text-xs font-bold text-gold-accent hover:text-white underline font-mono uppercase transition"
                                >
                                  Modify
                                </button>
                                <button
                                  onClick={() => handleDeleteHighlight(high.id)}
                                  className="text-xs text-red-400 hover:text-red-500 font-mono uppercase transition"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 6. TESTIMONIALS MANAGER */}
                {activeCustomizerPane === 'testimonials' && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-serif text-lg text-white font-bold mb-1">Words of Patrons (Testimonials)</h4>
                      <p className="text-xs text-champagne-light/50">Manage dynamic client references and reviews shown on the landing page.</p>
                    </div>

                    <div className="space-y-4">
                      {dynamicTestimonials.map((t: any) => (
                        <div key={t.id} className="p-4 bg-[#1b031f]/55 border border-gold-dark/15 rounded space-y-2">
                          <div className="flex justify-between items-start gap-3">
                            <div>
                              <h5 className="font-serif text-sm text-gold-accent font-semibold">{t.name}</h5>
                              <p className="text-[10px] text-champagne-light/50 font-mono">{t.eventType} • {t.location}</p>
                            </div>
                            <button
                              onClick={() => {
                                setDynamicTestimonials(dynamicTestimonials.filter(x => x.id !== t.id));
                                setTimeout(triggerConfigUpdated, 100);
                              }}
                              className="text-red-400 hover:text-red-500 text-xs font-mono uppercase transition"
                            >
                              Delete
                            </button>
                          </div>
                          <p className="text-xs text-champagne-light/80 italic">"{t.content}"</p>
                        </div>
                      ))}
                    </div>

                    {/* Add Testimonial */}
                    <div className="border-t border-gold-dark/15 pt-6 space-y-4">
                      <div>
                        <h5 className="font-serif text-sm text-gold-accent font-bold uppercase tracking-wide">Incorporate New Review Card</h5>
                        <p className="text-[11px] text-champagne-light/50 font-mono">Ensure all reviews reflect Karachi coordinates.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase tracking-widest text-[#d4af37] font-bold block">Patron Name</label>
                          <input
                            type="text"
                            id="new-test-name"
                            placeholder="e.g. Sana & Imran"
                            className="w-full text-xs px-3 py-2 border border-gold-dark/30 rounded text-champagne-light bg-[#1d0321]"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase tracking-widest text-[#d4af37] font-bold block">Event Class</label>
                          <input
                            type="text"
                            id="new-test-event"
                            placeholder="e.g. Summer Nikah Ceremony"
                            className="w-full text-xs px-3 py-2 border border-gold-dark/30 rounded text-champagne-light bg-[#1d0321]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase tracking-widest text-[#d4af37] font-bold block">Execution Month/Year</label>
                          <input
                            type="text"
                            id="new-test-date"
                            placeholder="e.g. June 2026"
                            className="w-full text-xs px-3 py-2 border border-gold-dark/30 rounded text-champagne-light bg-[#1d0321]"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase tracking-widest text-[#d4af37] font-bold block">Karachi Location Coordinate</label>
                          <input
                            type="text"
                            id="new-test-loc"
                            placeholder="e.g. DHA Phase 6, Karachi"
                            defaultValue="DHA Phase 6, Karachi"
                            className="w-full text-xs px-3 py-2 border border-gold-dark/30 rounded text-champagne-light bg-[#1d0321]"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-widest text-[#d4af37] font-bold block">Patron Testimonial Body Quote</label>
                        <textarea
                          id="new-test-content"
                          rows={2}
                          placeholder="Quote details of our standard excellence..."
                          className="w-full text-xs px-3 py-2 border border-gold-dark/30 rounded text-champagne-light bg-[#1d0321]"
                        />
                      </div>

                      <button
                        onClick={() => {
                          const nameEl = document.getElementById('new-test-name') as HTMLInputElement;
                          const eventEl = document.getElementById('new-test-event') as HTMLInputElement;
                          const dateEl = document.getElementById('new-test-date') as HTMLInputElement;
                          const locEl = document.getElementById('new-test-loc') as HTMLInputElement;
                          const contentEl = document.getElementById('new-test-content') as HTMLTextAreaElement;

                          if (nameEl && nameEl.value && contentEl && contentEl.value) {
                            const newTest = {
                              id: 'test-' + Date.now(),
                              name: nameEl.value,
                              eventType: eventEl?.value || 'Private Curation',
                              date: dateEl?.value || 'June 2026',
                              location: locEl?.value || 'DHA Karachi',
                              content: contentEl.value,
                              rating: 5
                            };
                            setDynamicTestimonials([...dynamicTestimonials, newTest]);
                            nameEl.value = '';
                            if (eventEl) eventEl.value = '';
                            if (dateEl) dateEl.value = '';
                            if (contentEl) contentEl.value = '';
                            alert("Testimonial posted successfully!");
                            setTimeout(triggerConfigUpdated, 100);
                          } else {
                            alert("Name and Testimonial content are required fields!");
                          }
                        }}
                        className="bg-gold-accent hover:bg-gold-light text-plum-950 text-xs font-bold font-sans uppercase tracking-widest px-4 py-2 rounded transition"
                      >
                        Publish Testimonial Card
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        )}

      </main>

      {/* ----------------- POPUP DIALOG MODULES (MODALS) ----------------- */}
      <AnimatePresence>
        {/* ADD NEW CUSTOMER CLIENT MODAL */}
        {showAddCustomerModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-plum-950/85 backdrop-blur-sm"
              onClick={() => setShowAddCustomerModal(false)}
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="bg-white text-plum-950 w-full max-w-lg rounded-xl shadow-2xl overflow-hidden relative border border-gold-dark/25 z-10 max-h-[90vh] overflow-y-auto"
            >
              <div className="bg-plum-950 text-white p-5 flex justify-between items-center border-b border-gold-dark/20">
                <h4 className="font-serif text-lg text-gold-accent tracking-wider">File Brand New Client Profile</h4>
                <button onClick={() => setShowAddCustomerModal(false)} className="text-champagne-light/60 hover:text-white p-1 rounded-full hover:bg-plum-900">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddCustomerSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-[#15021a] font-bold block">First & Last Name*</label>
                    <input 
                      type="text"
                      placeholder="e.g. Ayesha Khan"
                      required
                      value={newCustomer.fullName}
                      onChange={(e) => setNewCustomer({...newCustomer, fullName: e.target.value})}
                      className="w-full text-xs px-3 py-2 border border-plum-950/25 rounded focus:border-gold-accent focus:outline-none focus:ring-1 focus:ring-gold-accent text-plum-950 bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-[#15021a] font-bold block">Phone Contact*</label>
                    <input 
                      type="text"
                      placeholder="e.g. +92 300 1234567"
                      required
                      value={newCustomer.phone}
                      onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                      className="w-full text-xs px-3 py-2 border border-plum-950/25 rounded focus:border-gold-accent focus:outline-none focus:ring-1 focus:ring-gold-accent text-plum-950 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-[#15021a] font-bold block">Email Address*</label>
                    <input 
                      type="email"
                      placeholder="e.g. client@gmail.com"
                      required
                      value={newCustomer.email}
                      onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                      className="w-full text-xs px-3 py-2 border border-plum-950/25 rounded focus:border-gold-accent focus:outline-none focus:ring-1 focus:ring-gold-accent text-plum-950 bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-[#15021a] font-bold block">Target Event Date</label>
                    <input 
                      type="date"
                      value={newCustomer.targetDate}
                      onChange={(e) => setNewCustomer({...newCustomer, targetDate: e.target.value})}
                      className="w-full text-xs px-3 py-2 border border-plum-950/25 rounded focus:border-gold-accent focus:outline-none focus:ring-1 focus:ring-gold-accent text-plum-950 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-[#15021a] font-bold block">DHA Location / Block*</label>
                    <input 
                      type="text"
                      placeholder="e.g. DHA Phase 3, Block Y, Karachi"
                      value={newCustomer.location}
                      onChange={(e) => setNewCustomer({...newCustomer, location: e.target.value})}
                      className="w-full text-xs px-3 py-2 border border-plum-950/25 rounded focus:border-gold-accent focus:outline-none focus:ring-1 focus:ring-gold-accent text-plum-950 bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-[#15021a] font-bold block">Lead Lifecycle Status</label>
                    <select
                      value={newCustomer.status}
                      onChange={(e) => setNewCustomer({...newCustomer, status: e.target.value as Customer['status']})}
                      className="w-full text-xs px-3 py-2 border border-plum-950/25 rounded focus:border-gold-accent focus:outline-none focus:ring-1 focus:ring-gold-accent text-plum-950 bg-white"
                    >
                      <option value="Served">Served (Completed Event)</option>
                      <option value="Potential">Potential (Active Negotiation)</option>
                      <option value="Window Shopping">Window Shopping</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex gap-3 text-xs justify-end border-t border-plum-950/5">
                  <button 
                    type="button" 
                    onClick={() => setShowAddCustomerModal(false)}
                    className="px-4 py-2 hover:bg-slate-100 rounded text-plum-950 font-bold tracking-wider"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-5 py-2 bg-plum-950 text-gold-accent hover:bg-plum-900 rounded font-bold tracking-widest uppercase shadow"
                  >
                    Save Record
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* ADD EVENT VENDOR MODAL */}
        {showAddVendorModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-plum-950/85 backdrop-blur-sm"
              onClick={() => setShowAddVendorModal(false)}
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="bg-white text-plum-950 w-full max-w-lg rounded-xl shadow-2xl overflow-hidden relative border border-gold-dark/25 z-10 max-h-[90vh] overflow-y-auto"
            >
              <div className="bg-plum-950 text-white p-5 flex justify-between items-center border-b border-gold-dark/20">
                <h4 className="font-serif text-lg text-gold-accent tracking-wider">Register Partner Supplier</h4>
                <button onClick={() => setShowAddVendorModal(false)} className="text-champagne-light/60 hover:text-white p-1 rounded-full hover:bg-plum-900">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddVendorSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-[#15021a] font-bold block">Company Name*</label>
                    <input 
                      type="text"
                      placeholder="e.g. Shalimar Caterers"
                      required
                      value={newVendor.companyName}
                      onChange={(e) => setNewVendor({...newVendor, companyName: e.target.value})}
                      className="w-full text-xs px-3 py-2 border border-plum-950/25 rounded focus:border-gold-accent focus:outline-none focus:ring-1 focus:ring-gold-accent text-plum-950 bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-[#15021a] font-bold block">Industry Category</label>
                    <select
                      value={newVendor.category}
                      onChange={(e) => setNewVendor({...newVendor, category: e.target.value as Vendor['category']})}
                      className="w-full text-xs px-3 py-2 border border-plum-950/25 rounded focus:border-gold-accent focus:outline-none focus:ring-1 focus:ring-gold-accent text-plum-950 bg-white"
                    >
                      <option value="Catering">Catering</option>
                      <option value="Decorators">Decorators</option>
                      <option value="Sound/DJ Music">Sound/DJ Music</option>
                      <option value="Photography">Photography</option>
                      <option value="Bid Boxes & Giveaways">Bid Boxes & Giveaways</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-[#15021a] font-bold block">Point of Contact*</label>
                    <input 
                      type="text"
                      placeholder="e.g. Muhammad Rizwan"
                      required
                      value={newVendor.contactPerson}
                      onChange={(e) => setNewVendor({...newVendor, contactPerson: e.target.value})}
                      className="w-full text-xs px-3 py-2 border border-plum-950/25 rounded focus:border-gold-accent focus:outline-none focus:ring-1 focus:ring-gold-accent text-plum-950 bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-[#15021a] font-bold block">Phone Contact*</label>
                    <input 
                      type="text"
                      placeholder="e.g. +92 300 8443221"
                      required
                      value={newVendor.phone}
                      onChange={(e) => setNewVendor({...newVendor, phone: e.target.value})}
                      className="w-full text-xs px-3 py-2 border border-plum-950/25 rounded focus:border-gold-accent focus:outline-none focus:ring-1 focus:ring-gold-accent text-plum-950 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-[#15021a] font-bold block">Base Rate Rate (₨)</label>
                    <input 
                      type="number"
                      placeholder="e.g. 350000"
                      value={newVendor.baseRate}
                      onChange={(e) => setNewVendor({...newVendor, baseRate: e.target.value})}
                      className="w-full text-xs px-3 py-2 border border-plum-950/25 rounded focus:border-gold-accent focus:outline-none focus:ring-1 focus:ring-gold-accent text-plum-950 bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-[#15021a] font-bold block">Pending Balance (₨)</label>
                    <input 
                      type="number"
                      placeholder="e.g. 120000"
                      value={newVendor.pendingBalance}
                      onChange={(e) => setNewVendor({...newVendor, pendingBalance: e.target.value})}
                      className="w-full text-xs px-3 py-2 border border-plum-950/25 rounded focus:border-gold-accent focus:outline-none focus:ring-1 focus:ring-gold-accent text-plum-950 bg-white"
                    />
                  </div>
                </div>

                <div className="pt-4 flex gap-3 text-xs justify-end border-t border-plum-950/5">
                  <button 
                    type="button" 
                    onClick={() => setShowAddVendorModal(false)}
                    className="px-4 py-2 hover:bg-slate-100 rounded text-plum-950 font-bold tracking-wider"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-5 py-2 bg-plum-950 text-gold-accent hover:bg-plum-900 rounded font-bold tracking-widest uppercase shadow"
                  >
                    Save Supplier
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* LOG REVIEW MODAL */}
        {showAddFeedbackModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-plum-950/85 backdrop-blur-sm"
              onClick={() => setShowAddFeedbackModal(false)}
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="bg-white text-plum-950 w-full max-w-lg rounded-xl shadow-2xl overflow-hidden relative border border-gold-dark/25 z-10 max-h-[90vh] overflow-y-auto"
            >
              <div className="bg-plum-950 text-white p-5 flex justify-between items-center border-b border-gold-dark/20">
                <h4 className="font-serif text-lg text-gold-accent tracking-wider">Log Review & Post-Event Feedback</h4>
                <button onClick={() => setShowAddFeedbackModal(false)} className="text-champagne-light/60 hover:text-white p-1 rounded-full hover:bg-plum-900">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddFeedbackSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-[#15021a] font-bold block">Client Name*</label>
                    <input 
                      type="text"
                      placeholder="e.g. Ayesha Khan"
                      required
                      value={newFeedback.customerName}
                      onChange={(e) => setNewFeedback({...newFeedback, customerName: e.target.value})}
                      className="w-full text-xs px-3 py-2 border border-plum-950/25 rounded focus:border-gold-accent focus:outline-none focus:ring-1 focus:ring-gold-accent text-plum-950 bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-[#15021a] font-bold block">Event Execution Date</label>
                    <input 
                      type="date"
                      value={newFeedback.eventDate}
                      onChange={(e) => setNewFeedback({...newFeedback, eventDate: e.target.value})}
                      className="w-full text-xs px-3 py-2 border border-plum-950/25 rounded focus:border-gold-accent focus:outline-none text-plum-950 bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-[#15021a] font-bold block">Client Experience Star Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewFeedback({...newFeedback, rating: star})}
                        className="p-1 focus:outline-none focus:ring-1 focus:ring-gold-accent rounded"
                      >
                        <Star className={`w-6 h-6 hover:scale-110 transition ${star <= newFeedback.rating ? 'text-gold-accent fill-gold-accent' : 'text-gray-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-[#15021a] font-bold block">Customer Testimonial Text*</label>
                  <textarea 
                    rows={2}
                    placeholder="Provide text details of client feedback and comments"
                    required
                    value={newFeedback.feedbackText}
                    onChange={(e) => setNewFeedback({...newFeedback, feedbackText: e.target.value})}
                    className="w-full text-xs px-3 py-2 border border-plum-950/25 rounded focus:border-gold-accent focus:outline-none focus:ring-1 focus:ring-gold-accent text-plum-950 bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-[#15021a] font-bold block">Planner Experience Notes (Logistical/Execution Challenges)</label>
                  <textarea 
                    rows={2}
                    placeholder="e.g. Logistical constraints, venue management issues, sound delays, etc."
                    value={newFeedback.internalNotes}
                    onChange={(e) => setNewFeedback({...newFeedback, internalNotes: e.target.value})}
                    className="w-full text-xs px-3 py-2 border border-plum-950/25 rounded focus:border-gold-accent focus:outline-none focus:ring-1 focus:ring-gold-accent text-plum-950 bg-white"
                  />
                </div>

                <div className="pt-4 flex gap-3 text-xs justify-end border-t border-plum-950/5">
                  <button 
                    type="button" 
                    onClick={() => setShowAddFeedbackModal(false)}
                    className="px-4 py-2 hover:bg-slate-100 rounded text-plum-950 font-bold tracking-wider"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-5 py-2 bg-plum-950 text-gold-accent hover:bg-plum-900 rounded font-bold tracking-widest uppercase shadow"
                  >
                    File Review
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* LOG EXPENSE/REVENUE MODAL */}
        {showAddLedgerModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-plum-950/85 backdrop-blur-sm"
              onClick={() => setShowAddLedgerModal(false)}
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="bg-white text-plum-950 w-full max-w-lg rounded-xl shadow-2xl overflow-hidden relative border border-gold-dark/25 z-10 max-h-[90vh] overflow-y-auto"
            >
              <div className="bg-plum-950 text-white p-5 flex justify-between items-center border-b border-gold-dark/20">
                <h4 className="font-serif text-lg text-gold-accent tracking-wider">Log Transaction (Expense/Revenue)</h4>
                <button onClick={() => setShowAddLedgerModal(false)} className="text-champagne-light/60 hover:text-white p-1 rounded-full hover:bg-plum-900">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddLedgerSubmit} className="p-6 space-y-4">
                
                {/* Transaction type switcher */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-[#15021a] font-bold block">Cashflow Flow Direction*</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setNewLedger({...newLedger, type: 'Expense'})}
                      className={`flex-1 py-2 text-xs uppercase tracking-widest font-mono font-bold rounded border transition ${
                        newLedger.type === 'Expense' ? 'bg-rose-550 border-rose-600 bg-rose-50 text-rose-800' : 'bg-white border-plum-950/15 text-plum-950/60'
                      }`}
                    >
                      Expense Ledger Outflow (-)
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewLedger({...newLedger, type: 'Revenue'})}
                      className={`flex-1 py-1.5 text-xs uppercase tracking-widest font-mono font-bold rounded border transition ${
                        newLedger.type === 'Revenue' ? 'bg-emerald-550 border-emerald-600 bg-emerald-50 text-emerald-800' : 'bg-white border-plum-950/15 text-plum-950/60'
                      }`}
                    >
                      Booking Cash Inflow (+)
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-[#15021a] font-bold block">Fiscal Year*</label>
                    <select
                      value={newLedger.year}
                      onChange={(e) => setNewLedger({...newLedger, year: Number(e.target.value)})}
                      className="w-full text-xs px-3 py-2 border border-plum-950/25 rounded focus:border-gold-accent focus:outline-none text-plum-950 bg-white"
                    >
                      <option value={2024}>2024</option>
                      <option value={2025}>2025</option>
                      <option value={2026}>2026</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-[#15021a] font-bold block">Month Tracker</label>
                    <select
                      value={newLedger.month}
                      onChange={(e) => setNewLedger({...newLedger, month: e.target.value})}
                      className="w-full text-xs px-3 py-2 border border-plum-950/25 rounded focus:border-gold-accent focus:outline-none text-plum-950 bg-white"
                    >
                      {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-[#15021a] font-bold block">Exact Date</label>
                    <input 
                      type="date"
                      value={newLedger.date}
                      onChange={(e) => setNewLedger({...newLedger, date: e.target.value})}
                      className="w-full text-xs px-3 py-2 border border-plum-950/25 rounded focus:border-gold-accent focus:outline-none text-plum-950 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {newLedger.type === 'Expense' ? (
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-[#15021a] font-bold block">Expense Sector Category</label>
                      <select
                        value={newLedger.category}
                        onChange={(e) => setNewLedger({...newLedger, category: e.target.value as LedgerEntry['category']})}
                        className="w-full text-xs px-3 py-2 border border-plum-950/25 rounded focus:border-gold-accent focus:outline-none text-plum-950 bg-white"
                      >
                        <option value="Employee Salaries">Employee Salaries</option>
                        <option value="Commissions (Event-Based)">Commissions (Event-Based)</option>
                        <option value="Commissions (Monthly)">Commissions (Monthly)</option>
                        <option value="Partner Vendor Payments">Partner Vendor Payments</option>
                        <option value="Operating Expenses (OpEx)">Operating Expenses (OpEx)</option>
                        <option value="Other">Other Expenses</option>
                      </select>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-[#15021a] font-bold block font-bold">Revenue Sector</label>
                      <input 
                        type="text"
                        disabled
                        value="Gross Client Booking"
                        className="w-full text-xs px-3 py-2 border border-plum-950/10 rounded text-plum-950/50 bg-slate-100"
                      />
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-[#15021a] font-bold block">Amount in PKR Rupees (₨)*</label>
                    <input 
                      type="number"
                      placeholder="e.g. 150000"
                      required
                      value={newLedger.amount}
                      onChange={(e) => setNewLedger({...newLedger, amount: e.target.value})}
                      className="w-full text-xs px-3 py-2 border border-plum-950/25 rounded focus:outline-none focus:border-gold-accent font-mono text-plum-950 bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-[#15021a] font-bold block">Transaction Description / Details*</label>
                  <input 
                    type="text"
                    placeholder="e.g. Sonic sound billing or VIP dinner ticket booking"
                    required
                    value={newLedger.description}
                    onChange={(e) => setNewLedger({...newLedger, description: e.target.value})}
                    className="w-full text-xs px-3 py-2 border border-plum-950/25 rounded focus:border-gold-accent focus:outline-none text-plum-950 bg-white"
                  />
                </div>

                <div className="pt-4 flex gap-3 text-xs justify-end border-t border-plum-950/5">
                  <button 
                    type="button" 
                    onClick={() => setShowAddLedgerModal(false)}
                    className="px-4 py-2 hover:bg-slate-100 rounded text-plum-950 font-bold tracking-wider"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-5 py-2 bg-plum-950 text-gold-accent hover:bg-plum-900 rounded font-bold tracking-widest uppercase shadow"
                  >
                    File Transaction
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
