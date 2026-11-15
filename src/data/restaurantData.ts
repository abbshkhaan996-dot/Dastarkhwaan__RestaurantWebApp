import { FOOD_IMAGES } from './foodImages';

export interface DishItem {
  id: string;
  name: string;
  category: MenuCategory;
  description: string;
  pricePkr: number;
  servingNote?: string;
  spiceLevel?: 'Mild' | 'Medium' | 'Spicy';
  isPopular?: boolean;
  imageUrl: string;
  imageAlt: string;
}

export type MenuCategory =
  | 'Karahi & Handi'
  | 'BBQ'
  | 'Biryani & Rice'
  | 'Chinese'
  | 'Fast Food'
  | 'Paratha Rolls'
  | 'Tandoor'
  | 'Drinks & Desserts';

export interface DealPhoto {
  url: string;
  alt: string;
  caption?: string;
}

export interface DealItem {
  id: string;
  title: string;
  badgeText: string;
  subtitle: string;
  itemsIncluded: string[];
  originalPricePkr: number;
  dealPricePkr: number;
  servesText: string;
  accentTheme: 'orange' | 'maroon';
  images: DealPhoto[];
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category:
    | 'Dishes'
    | 'BBQ Preparation'
    | 'Karahi Cooking'
    | 'Dining Area'
    | 'Family Platters';
  caption: string;
  imageUrl: string;
  imageAlt: string;
}

export interface DemoReview {
  id: string;
  reviewerName: string;
  visitContext: string;
  rating: number;
  orderedItem: string;
  quote: string;
}

/**
 * Editable Restaurant Configuration
 * Update any contact details, WhatsApp number, branch address, or hours here.
 */
export const RESTAURANT_INFO = {
  brandName: 'DASTARKHWAN',
  heroHeading: 'Good Food. Great Taste. Every Time.',
  heroSubheading:
    'Enjoy your favourite Pakistani flavours, freshly prepared and served with love.',
  aboutHeading: 'Serving Good Food, Creating Great Memories.',
  city: 'Islamabad, Pakistan',
  address: 'Plot 14, Markaz F-7 (Jinnah Super), Islamabad, Pakistan',
  whatsappNumber: '923001234567', // Configurable international format without '+' for wa.me links
  displayPhone: '+92 300 123 4567',
  landlinePhone: '+92 51 265 4321',
  email: 'hello@dastarkhwan-demo.pk',
  openingHours: [
    { days: 'Monday – Thursday', hours: '12:00 PM – 11:30 PM' },
    { days: 'Friday', hours: '1:30 PM – 12:30 AM' },
    { days: 'Saturday – Sunday', hours: '12:00 PM – 12:30 AM' },
  ],
  socialLinks: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
  },
  heroImage: FOOD_IMAGES.heroSpread,
  aboutImage: FOOD_IMAGES.diningHall,
};

export interface PromoCodeConfig {
  code: string;
  label: string;
  percent?: number;
  flatPkr?: number;
}

/**
 * Editable Order & Delivery Configuration
 * Update deliveryFeePkr in one place to reflect across Cart, Order Online, and Checkout.
 */
export const ORDER_CONFIG = {
  deliveryFeePkr: 200,
  storageKey: 'dastarkhwan_cart_v1',
  promoCodes: {
    DASTARKHWAN10: {
      code: 'DASTARKHWAN10',
      label: '10% Welcome Demo Discount',
      percent: 10,
    },
    FAMILY250: {
      code: 'FAMILY250',
      label: 'PKR 250 Off Demo Discount',
      flatPkr: 250,
    },
  } as Record<string, PromoCodeConfig>,
};

export const MENU_CATEGORIES: MenuCategory[] = [
  'Karahi & Handi',
  'BBQ',
  'Biryani & Rice',
  'Chinese',
  'Fast Food',
  'Paratha Rolls',
  'Tandoor',
  'Drinks & Desserts',
];

export const POPULAR_DISHES: DishItem[] = [
  {
    id: 'pop-chicken-karahi',
    name: 'Chicken Karahi',
    category: 'Karahi & Handi',
    description:
      'Freshly cooked chicken wok-tossed over high flame with vine-ripened tomatoes, green chillies, ginger juliennes, and crushed black pepper.',
    pricePkr: 2150,
    servingNote: 'Full Wok · Serves 3–4',
    spiceLevel: 'Medium',
    isPopular: true,
    imageUrl: FOOD_IMAGES.chickenKarahiWok.url,
    imageAlt: FOOD_IMAGES.chickenKarahiWok.alt,
  },
  {
    id: 'pop-chicken-biryani',
    name: 'Chicken Biryani',
    category: 'Biryani & Rice',
    description:
      'Long-grain aged basmati layered with spiced chicken, caramelized onions, saffron milk, fresh mint, and slow-steamed in dum style.',
    pricePkr: 790,
    servingNote: 'Full Plate · With Raita',
    spiceLevel: 'Spicy',
    isPopular: true,
    imageUrl: FOOD_IMAGES.chickenBiryani.url,
    imageAlt: FOOD_IMAGES.chickenBiryani.alt,
  },
  {
    id: 'pop-mutton-handi',
    name: 'Mutton Handi',
    category: 'Karahi & Handi',
    description:
      'Tender mutton simmered with roasted garlic, yogurt, rich spiced gravy, and freshly ground garam masala.',
    pricePkr: 2850,
    servingNote: 'Clay Handi · Serves 3',
    spiceLevel: 'Medium',
    isPopular: true,
    imageUrl: FOOD_IMAGES.muttonHandiCurry.url,
    imageAlt: FOOD_IMAGES.muttonHandiCurry.alt,
  },
  {
    id: 'pop-chicken-tikka',
    name: 'Chicken Tikka',
    category: 'BBQ',
    description:
      'Quarter chicken marinated overnight in yogurt, Kashmiri chilli, and lemon, grilled over glowing charcoal for smoky char marks.',
    pricePkr: 650,
    servingNote: 'Leg or Chest · With Lime',
    spiceLevel: 'Medium',
    isPopular: true,
    imageUrl: FOOD_IMAGES.chickenTikkaLeg.url,
    imageAlt: FOOD_IMAGES.chickenTikkaLeg.alt,
  },
  {
    id: 'pop-seekh-kebab',
    name: 'Seekh Kebab',
    category: 'BBQ',
    description:
      'Hand-minced beef seasoned with toasted cumin, fresh coriander, and green chillies, skewered and roasted over live coals.',
    pricePkr: 980,
    servingNote: '4 Skewers · With Tamarind Dip',
    spiceLevel: 'Spicy',
    isPopular: true,
    imageUrl: FOOD_IMAGES.seekhKebab.url,
    imageAlt: FOOD_IMAGES.seekhKebab.alt,
  },
  {
    id: 'pop-bbq-platter',
    name: 'BBQ Platter',
    category: 'BBQ',
    description:
      'Generous sharing platter featuring charcoal Chicken Tikka, Beef Seekh Kebabs, Chicken Boti, fresh salad, and hot Roghni naan.',
    pricePkr: 3450,
    servingNote: 'Sharing Platter · Serves 4',
    spiceLevel: 'Medium',
    isPopular: true,
    imageUrl: FOOD_IMAGES.bbqPlatterClassic.url,
    imageAlt: FOOD_IMAGES.bbqPlatterClassic.alt,
  },
];

export const MENU_ITEMS: DishItem[] = [
  // Karahi & Handi
  {
    id: 'kh-chicken-karahi',
    name: 'Special Lahori Chicken Karahi',
    category: 'Karahi & Handi',
    description:
      'Bone-in chicken cooked to order with tomatoes, crushed black pepper, green chillies, and fresh coriander.',
    pricePkr: 2150,
    servingNote: '1 Kg Full',
    spiceLevel: 'Medium',
    isPopular: true,
    imageUrl: FOOD_IMAGES.pakistaniKarahiPan.url,
    imageAlt: FOOD_IMAGES.pakistaniKarahiPan.alt,
  },
  {
    id: 'kh-shinwari-mutton-karahi',
    name: 'Shinwari Mutton Karahi',
    category: 'Karahi & Handi',
    description:
      'Traditional Peshawar-style bone-in mutton tossed with rock salt, ripe tomatoes, and green chillies.',
    pricePkr: 3400,
    servingNote: '1 Kg Full',
    spiceLevel: 'Medium',
    isPopular: true,
    imageUrl: FOOD_IMAGES.shinwariMuttonKarahi.url,
    imageAlt: FOOD_IMAGES.shinwariMuttonKarahi.alt,
  },
  {
    id: 'kh-mutton-handi',
    name: 'Dastarkhwan Mutton Handi',
    category: 'Karahi & Handi',
    description:
      'Slow-cooked tender mutton cuts simmered in a velvety spiced onion, tomato, and yogurt gravy.',
    pricePkr: 2850,
    servingNote: 'Full Handi',
    spiceLevel: 'Medium',
    imageUrl: FOOD_IMAGES.muttonHandiCurry.url,
    imageAlt: FOOD_IMAGES.muttonHandiCurry.alt,
  },
  {
    id: 'kh-makhni-handi',
    name: 'Chicken Makhni Handi',
    category: 'Karahi & Handi',
    description:
      'Boneless chicken simmered with cultured butter, fresh cream, roasted cumin, and mild aromatic spices.',
    pricePkr: 1950,
    servingNote: 'Full Handi',
    spiceLevel: 'Mild',
    isPopular: true,
    imageUrl: FOOD_IMAGES.chickenMakhani.url,
    imageAlt: FOOD_IMAGES.chickenMakhani.alt,
  },
  {
    id: 'kh-achari-handi',
    name: 'Chicken Achari Handi',
    category: 'Karahi & Handi',
    description:
      'Authentic clay-pot chicken cooked with tangy pickling spices, fresh ginger juliennes, cream swirl, and green chillies.',
    pricePkr: 1890,
    servingNote: 'Clay Pot · Full',
    spiceLevel: 'Spicy',
    imageUrl: FOOD_IMAGES.chickenHandiClayPot.url,
    imageAlt: FOOD_IMAGES.chickenHandiClayPot.alt,
  },
  {
    id: 'kh-daal-tadka',
    name: 'Dastarkhwan Special Daal Tadka',
    category: 'Karahi & Handi',
    description:
      'Slow-simmered golden yellow lentils finished with sizzling cumin, garlic, and whole red chilli tempering.',
    pricePkr: 950,
    servingNote: 'Full Bowl',
    spiceLevel: 'Mild',
    imageUrl: FOOD_IMAGES.daalTadka.url,
    imageAlt: FOOD_IMAGES.daalTadka.alt,
  },

  // BBQ
  {
    id: 'bbq-chicken-tikka',
    name: 'Charcoal Chicken Tikka',
    category: 'BBQ',
    description:
      'Smoky quarter chicken marinated in yogurt and crushed spices, flame-charred and served with onions and lime.',
    pricePkr: 650,
    servingNote: '1 Piece (Leg / Chest)',
    spiceLevel: 'Medium',
    isPopular: true,
    imageUrl: FOOD_IMAGES.chickenTikkaPlate.url,
    imageAlt: FOOD_IMAGES.chickenTikkaPlate.alt,
  },
  {
    id: 'bbq-seekh-kebab',
    name: 'Beef Seekh Kebab',
    category: 'BBQ',
    description:
      'Juicy minced beef skewers seasoned with herbs and charcoal-grilled over glowing embers.',
    pricePkr: 980,
    servingNote: '4 Skewers',
    spiceLevel: 'Spicy',
    isPopular: true,
    imageUrl: FOOD_IMAGES.seekhKebab.url,
    imageAlt: FOOD_IMAGES.seekhKebab.alt,
  },
  {
    id: 'bbq-tikka-boti',
    name: 'Chicken Tikka Boti',
    category: 'BBQ',
    description:
      'Tender boneless chicken cubes marinated in red chilli, cumin, and yogurt, served sizzling with mint chutney and raita.',
    pricePkr: 1150,
    servingNote: '12 Pieces · With Chutney',
    spiceLevel: 'Medium',
    isPopular: true,
    imageUrl: FOOD_IMAGES.chickenTikkaBoti.url,
    imageAlt: FOOD_IMAGES.chickenTikkaBoti.alt,
  },
  {
    id: 'bbq-reshmi-kebab',
    name: 'Chicken Reshmi Kebab',
    category: 'BBQ',
    description:
      'Silky minced chicken skewers blended with coriander, fried onions, and subtle spices served with fresh salad.',
    pricePkr: 1050,
    servingNote: '4 Skewers',
    spiceLevel: 'Mild',
    imageUrl: FOOD_IMAGES.reshmiKebab.url,
    imageAlt: FOOD_IMAGES.reshmiKebab.alt,
  },
  {
    id: 'bbq-platter',
    name: 'Dastarkhwan BBQ Platter',
    category: 'BBQ',
    description:
      'Chicken Tikka leg, Beef Seekh Kebabs, Chicken Boti, fresh salad, and warm sesame Roghni naan.',
    pricePkr: 3450,
    servingNote: 'Serves 4',
    spiceLevel: 'Medium',
    imageUrl: FOOD_IMAGES.bbqPlatterClassic.url,
    imageAlt: FOOD_IMAGES.bbqPlatterClassic.alt,
  },

  // Biryani & Rice
  {
    id: 'br-chicken-biryani',
    name: 'Karachi Spicy Chicken Biryani',
    category: 'Biryani & Rice',
    description:
      'Aromatic long-grain basmati rice layered with spiced masala chicken, herbs, and saffron.',
    pricePkr: 790,
    servingNote: 'Full Plate',
    spiceLevel: 'Spicy',
    isPopular: true,
    imageUrl: FOOD_IMAGES.chickenBiryani.url,
    imageAlt: FOOD_IMAGES.chickenBiryani.alt,
  },
  {
    id: 'br-chicken-pulao',
    name: 'Lahori Chicken Yakhni Pulao',
    category: 'Biryani & Rice',
    description:
      'Fragrant basmati rice cooked in slow-simmered chicken stock with whole spices and fresh mint leaves.',
    pricePkr: 850,
    servingNote: 'Full Plate',
    spiceLevel: 'Mild',
    isPopular: true,
    imageUrl: FOOD_IMAGES.chickenPulao.url,
    imageAlt: FOOD_IMAGES.chickenPulao.alt,
  },

  // Chinese
  {
    id: 'ch-chowmein',
    name: 'Special Chicken Chow Mein',
    category: 'Chinese',
    description:
      'Wok-tossed noodles with egg strips, capsicum, cabbage, and savoury dark soy glaze.',
    pricePkr: 1090,
    servingNote: 'Serves 2',
    spiceLevel: 'Medium',
    isPopular: true,
    imageUrl: FOOD_IMAGES.chickenChowMein.url,
    imageAlt: FOOD_IMAGES.chickenChowMein.alt,
  },
  {
    id: 'ch-manchurian',
    name: 'Chicken Manchurian',
    category: 'Chinese',
    description:
      'Crispy chicken bites simmered in a bold garlic, soy, and spiced tomato glaze topped with shredded cabbage.',
    pricePkr: 1190,
    servingNote: 'Full Bowl',
    spiceLevel: 'Medium',
    isPopular: true,
    imageUrl: FOOD_IMAGES.chickenManchurian.url,
    imageAlt: FOOD_IMAGES.chickenManchurian.alt,
  },
  {
    id: 'ch-hakka-noodles',
    name: 'Stir-Fried Hakka Noodles',
    category: 'Chinese',
    description:
      'High-flame stir-fried noodles tossed with carrots, bell peppers, onions, and cracked black pepper.',
    pricePkr: 980,
    servingNote: 'Full Plate',
    spiceLevel: 'Mild',
    imageUrl: FOOD_IMAGES.hakkaNoodles.url,
    imageAlt: FOOD_IMAGES.hakkaNoodles.alt,
  },
  {
    id: 'ch-prawn-fried-rice',
    name: 'Prawn & Egg Fried Rice',
    category: 'Chinese',
    description:
      'Wok-fried jasmine rice tossed with tender prawns, scrambled egg, spring onions, and sesame oil.',
    pricePkr: 1390,
    servingNote: 'Full Bowl',
    spiceLevel: 'Mild',
    imageUrl: FOOD_IMAGES.prawnFriedRice.url,
    imageAlt: FOOD_IMAGES.prawnFriedRice.alt,
  },

  // Fast Food
  {
    id: 'ff-zinger',
    name: 'Crispy Zinger Burger & Fries',
    category: 'Fast Food',
    description:
      'Crunchy golden fried chicken thigh fillet with crisp lettuce, mayo, and thick-cut fries.',
    pricePkr: 720,
    servingNote: 'With Fries',
    spiceLevel: 'Medium',
    isPopular: true,
    imageUrl: FOOD_IMAGES.zingerBurger.url,
    imageAlt: FOOD_IMAGES.zingerBurger.alt,
  },
  {
    id: 'ff-beef-burger',
    name: 'Classic Grilled Beef Burger',
    category: 'Fast Food',
    description:
      'Seared beef patty topped with cheddar cheese, tomato, lettuce, and crispy seasoned fries.',
    pricePkr: 850,
    servingNote: 'With Fries',
    spiceLevel: 'Mild',
    imageUrl: FOOD_IMAGES.beefBurgerTray.url,
    imageAlt: FOOD_IMAGES.beefBurgerTray.alt,
  },
  {
    id: 'ff-double-cheeseburger',
    name: 'Cheeseburger & Fries Basket',
    category: 'Fast Food',
    description:
      'Chargrilled burger with cheddar cheese, red onions, and a generous basket of golden fries.',
    pricePkr: 920,
    servingNote: 'With Basket Fries',
    spiceLevel: 'Mild',
    imageUrl: FOOD_IMAGES.cheeseburgerBasket.url,
    imageAlt: FOOD_IMAGES.cheeseburgerBasket.alt,
  },
  {
    id: 'ff-crispy-box',
    name: 'Crispy Fried Chicken & Zinger Box',
    category: 'Fast Food',
    description:
      'Sharing box packed with crispy zinger sliders, sauced fries, and crunchy spiced chicken tenders.',
    pricePkr: 1650,
    servingNote: 'Sharing Box · Serves 2–3',
    spiceLevel: 'Medium',
    imageUrl: FOOD_IMAGES.friedChickenBox.url,
    imageAlt: FOOD_IMAGES.friedChickenBox.alt,
  },

  // Paratha Rolls
  {
    id: 'pr-tikka-roll',
    name: 'Chicken Tikka Paratha Roll',
    category: 'Paratha Rolls',
    description:
      'Toasted flatbread wrapped around smoky chicken tikka strips, crisp veggies, and spiced garlic sauce.',
    pricePkr: 460,
    servingNote: 'Single Roll',
    spiceLevel: 'Spicy',
    isPopular: true,
    imageUrl: FOOD_IMAGES.chickenParathaRoll.url,
    imageAlt: FOOD_IMAGES.chickenParathaRoll.alt,
  },
  {
    id: 'pr-malai-roll',
    name: 'Malai Boti Mayo Garlic Roll',
    category: 'Paratha Rolls',
    description:
      'Juicy creamy chicken malai boti wrapped hot and freshly sliced with house garlic mayo.',
    pricePkr: 520,
    servingNote: 'Single Roll',
    spiceLevel: 'Mild',
    isPopular: true,
    imageUrl: FOOD_IMAGES.malaiBotiRoll.url,
    imageAlt: FOOD_IMAGES.malaiBotiRoll.alt,
  },
  {
    id: 'pr-tawa-paratha',
    name: 'Flaky Tawa Paratha with Yogurt',
    category: 'Paratha Rolls',
    description:
      'Hand-rolled layered whole-wheat paratha pan-crisped in ghee and served with cool plain yogurt.',
    pricePkr: 190,
    servingNote: '1 Piece',
    spiceLevel: 'Mild',
    imageUrl: FOOD_IMAGES.tawaParatha.url,
    imageAlt: FOOD_IMAGES.tawaParatha.alt,
  },

  // Tandoor
  {
    id: 'td-roghni-naan',
    name: 'Sesame Roghni Naan Basket',
    category: 'Tandoor',
    description:
      'Pillow-soft clay-oven naans brushed with melted butter and baked fresh to order.',
    pricePkr: 240,
    servingNote: 'Basket of 2',
    imageUrl: FOOD_IMAGES.roghniNaanBasket.url,
    imageAlt: FOOD_IMAGES.roghniNaanBasket.alt,
  },
  {
    id: 'td-garlic-naan',
    name: 'Garlic & Coriander Butter Naan',
    category: 'Tandoor',
    description:
      'Freshly baked tandoori naan topped with roasted garlic butter and chopped green coriander.',
    pricePkr: 140,
    servingNote: '1 Piece',
    isPopular: true,
    imageUrl: FOOD_IMAGES.garlicNaanCurry.url,
    imageAlt: FOOD_IMAGES.garlicNaanCurry.alt,
  },

  // Drinks & Desserts
  {
    id: 'dd-mango-lassi',
    name: 'Fresh Mango Lassi',
    category: 'Drinks & Desserts',
    description:
      'Chilled creamy yogurt blended with sweet Pakistani mangoes and topped with fresh mango cubes.',
    pricePkr: 390,
    servingNote: 'Tall Glass',
    isPopular: true,
    imageUrl: FOOD_IMAGES.mangoLassiGlasses.url,
    imageAlt: FOOD_IMAGES.mangoLassiGlasses.alt,
  },
  {
    id: 'dd-mango-pitcher',
    name: 'Family Mango Shake Pitcher',
    category: 'Drinks & Desserts',
    description:
      'Chilled pitcher of fresh seasonal Sindhri mango juice blended to share at the table.',
    pricePkr: 980,
    servingNote: '1 Litre Pitcher',
    imageUrl: FOOD_IMAGES.mangoPitcher.url,
    imageAlt: FOOD_IMAGES.mangoPitcher.alt,
  },
  {
    id: 'dd-soft-drink',
    name: 'Chilled Cola Soft Drink',
    category: 'Drinks & Desserts',
    description:
      'Ice-cold carbonated cola served with a chilled glass over ice.',
    pricePkr: 160,
    servingNote: '330ml Can',
    imageUrl: FOOD_IMAGES.softDrinkCola.url,
    imageAlt: FOOD_IMAGES.softDrinkCola.alt,
  },
  {
    id: 'dd-mint-raita',
    name: 'Fresh Mint & Cucumber Raita',
    category: 'Drinks & Desserts',
    description:
      'Whipped yogurt blended with fresh garden mint, coriander, roasted cumin, and diced cucumber.',
    pricePkr: 180,
    servingNote: 'Side Bowl',
    imageUrl: FOOD_IMAGES.mintRaita.url,
    imageAlt: FOOD_IMAGES.mintRaita.alt,
  },
  {
    id: 'dd-gulab-jamun',
    name: 'Warm Gulab Jamun',
    category: 'Drinks & Desserts',
    description:
      'Soft golden khoya dumplings soaked in fragrant rosewater and saffron sugar syrup.',
    pricePkr: 360,
    servingNote: '3 Pieces',
    isPopular: true,
    imageUrl: FOOD_IMAGES.gulabJamun.url,
    imageAlt: FOOD_IMAGES.gulabJamun.alt,
  },
  {
    id: 'dd-shahi-kheer',
    name: 'Matka Shahi Kheer',
    category: 'Drinks & Desserts',
    description:
      'Slow-thickened milk rice pudding garnished with crushed almonds, pistachios, and green cardamom.',
    pricePkr: 340,
    servingNote: 'Ceramic Bowl',
    imageUrl: FOOD_IMAGES.shahiKheer.url,
    imageAlt: FOOD_IMAGES.shahiKheer.alt,
  },
];

export const SPECIAL_DEALS: DealItem[] = [
  {
    id: 'deal-family',
    title: 'Family Deal',
    badgeText: 'Best Seller · Save PKR 750',
    subtitle:
      'Our classic family dinner spread combining karahi, biryani, cool mint raita, and chilled cola.',
    itemsIncluded: [
      '1 Full Chicken Karahi (1 Kg)',
      '2 Full Chicken Biryani Plates',
      '1 Fresh Mint Raita Bowl',
      'Chilled 1.5L Soft Drink',
    ],
    originalPricePkr: 4650,
    dealPricePkr: 3900,
    servesText: 'Serves 4–5',
    accentTheme: 'orange',
    images: [
      {
        url: FOOD_IMAGES.pakistaniKarahiPan.url,
        alt: FOOD_IMAGES.pakistaniKarahiPan.alt,
        caption: 'Full Chicken Karahi',
      },
      {
        url: FOOD_IMAGES.chickenBiryani.url,
        alt: FOOD_IMAGES.chickenBiryani.alt,
        caption: 'Chicken Biryani',
      },
      {
        url: FOOD_IMAGES.mintRaita.url,
        alt: FOOD_IMAGES.mintRaita.alt,
        caption: 'Mint Raita',
      },
      {
        url: FOOD_IMAGES.softDrinkCola.url,
        alt: FOOD_IMAGES.softDrinkCola.alt,
        caption: 'Chilled Soft Drink',
      },
    ],
  },
  {
    id: 'deal-friends',
    title: "Friends' Combo",
    badgeText: 'Student & Squad Favourite · Save PKR 470',
    subtitle:
      'Built for campus hangouts and late-evening cravings with crispy zinger burgers and paratha rolls.',
    itemsIncluded: [
      '2 Crispy Zinger Burgers with Fries',
      '2 Chicken Tikka Paratha Rolls',
      '2 Chilled Soft Drinks',
    ],
    originalPricePkr: 2680,
    dealPricePkr: 2210,
    servesText: 'Serves 4',
    accentTheme: 'maroon',
    images: [
      {
        url: FOOD_IMAGES.zingerBurger.url,
        alt: FOOD_IMAGES.zingerBurger.alt,
        caption: 'Crispy Zinger Burgers',
      },
      {
        url: FOOD_IMAGES.chickenParathaRoll.url,
        alt: FOOD_IMAGES.chickenParathaRoll.alt,
        caption: 'Chicken Paratha Rolls',
      },
    ],
  },
  {
    id: 'deal-bbq-special',
    title: 'BBQ Special',
    badgeText: 'Live Charcoal Grill · Save PKR 590',
    subtitle:
      'Authentic charcoal platter with Chicken Tikka, Seekh Kebabs, Chicken Boti, fresh salad, and Roghni naan.',
    itemsIncluded: [
      '2 Charcoal Chicken Tikka Pieces',
      '4 Beef Seekh Kebabs',
      '8 Boneless Chicken Boti Pieces',
      '2 Roghni Naans + Fresh Garden Salad',
    ],
    originalPricePkr: 3690,
    dealPricePkr: 3100,
    servesText: 'Serves 3–4',
    accentTheme: 'orange',
    images: [
      {
        url: FOOD_IMAGES.bbqPlatterClassic.url,
        alt: FOOD_IMAGES.bbqPlatterClassic.alt,
        caption: 'Full Charcoal BBQ Platter',
      },
    ],
  },
  {
    id: 'deal-weekend',
    title: 'Weekend Deal',
    badgeText: 'Fri – Sun Offer · Save PKR 680',
    subtitle:
      'Creamy Chicken Makhani and hot garlic naan paired with steaming biryani and traditional Shahi Kheer.',
    itemsIncluded: [
      '1 Full Chicken Makhni Handi',
      '4 Garlic & Coriander Naans',
      '2 Plates Chicken Biryani',
      '2 Matka Shahi Kheer Desserts',
    ],
    originalPricePkr: 4580,
    dealPricePkr: 3900,
    servesText: 'Serves 4',
    accentTheme: 'maroon',
    images: [
      {
        url: FOOD_IMAGES.garlicNaanCurry.url,
        alt: FOOD_IMAGES.garlicNaanCurry.alt,
        caption: 'Handi & Garlic Naan',
      },
      {
        url: FOOD_IMAGES.shahiKheer.url,
        alt: FOOD_IMAGES.shahiKheer.alt,
        caption: 'Matka Shahi Kheer',
      },
    ],
  },
  {
    id: 'deal-dastarkhwan-platter',
    title: 'Dastarkhwan Special Platter',
    badgeText: 'Signature House Feast · Save PKR 950',
    subtitle:
      'Our flagship celebration spread uniting Mutton Karahi, assorted charcoal kebabs, and fresh mango shake.',
    itemsIncluded: [
      'Half Shinwari Mutton Karahi',
      'Assorted Seekh Kebabs & Chicken Tikka Boti Platter',
      '4 Sesame Roghni Naans + Fries',
      '1 Family Mango Shake Pitcher',
    ],
    originalPricePkr: 6450,
    dealPricePkr: 5500,
    servesText: 'Serves 5–6',
    accentTheme: 'orange',
    images: [
      {
        url: FOOD_IMAGES.bbqKebabPlatter.url,
        alt: FOOD_IMAGES.bbqKebabPlatter.alt,
        caption: 'Assorted Charcoal Kebabs',
      },
      {
        url: FOOD_IMAGES.shinwariMuttonKarahi.url,
        alt: FOOD_IMAGES.shinwariMuttonKarahi.alt,
        caption: 'Mutton Karahi',
      },
      {
        url: FOOD_IMAGES.mangoPitcher.url,
        alt: FOOD_IMAGES.mangoPitcher.alt,
        caption: 'Fresh Mango Pitcher',
      },
    ],
  },
];

export const GALLERY_IMAGES: GalleryPhoto[] = [
  {
    id: 'gal-1',
    title: 'Sizzling Chicken Karahi',
    category: 'Karahi Cooking',
    caption: 'Prepared fresh per order over roaring flame with tomatoes, green chillies, and ginger.',
    imageUrl: FOOD_IMAGES.chickenKarahiWok.url,
    imageAlt: FOOD_IMAGES.chickenKarahiWok.alt,
  },
  {
    id: 'gal-2',
    title: 'Live Charcoal BBQ Grill',
    category: 'BBQ Preparation',
    caption: 'Marinated chicken pieces seared directly over natural charcoal embers.',
    imageUrl: FOOD_IMAGES.bbqCharcoalGrill.url,
    imageAlt: FOOD_IMAGES.bbqCharcoalGrill.alt,
  },
  {
    id: 'gal-3',
    title: 'Charcoal Boti Skewers',
    category: 'BBQ Preparation',
    caption: 'Spiced skewers roasting slowly over glowing coals for authentic smokiness.',
    imageUrl: FOOD_IMAGES.bbqSkewersCoal.url,
    imageAlt: FOOD_IMAGES.bbqSkewersCoal.alt,
  },
  {
    id: 'gal-4',
    title: 'Traditional BBQ Sharing Platter',
    category: 'Family Platters',
    caption: 'Chicken tikka, beef seekh kebabs, chicken boti, and warm Roghni naan on one plate.',
    imageUrl: FOOD_IMAGES.bbqPlatterClassic.url,
    imageAlt: FOOD_IMAGES.bbqPlatterClassic.alt,
  },
  {
    id: 'gal-5',
    title: 'Warm Family Dining Hall',
    category: 'Dining Area',
    caption: 'Comfortable, welcoming indoor seating built for families and evening dinners.',
    imageUrl: FOOD_IMAGES.diningHall.url,
    imageAlt: FOOD_IMAGES.diningHall.alt,
  },
  {
    id: 'gal-6',
    title: 'Fragrant Dum Biryani',
    category: 'Dishes',
    caption: 'Steaming saffron-kissed basmati rice layered with spiced tender chicken.',
    imageUrl: FOOD_IMAGES.chickenBiryani.url,
    imageAlt: FOOD_IMAGES.chickenBiryani.alt,
  },
  {
    id: 'gal-7',
    title: 'Clay-Pot Chicken Handi',
    category: 'Karahi Cooking',
    caption: 'Rich handi curry finished with cream, fresh ginger juliennes, and green chillies.',
    imageUrl: FOOD_IMAGES.chickenHandiClayPot.url,
    imageAlt: FOOD_IMAGES.chickenHandiClayPot.alt,
  },
  {
    id: 'gal-8',
    title: 'Curries & Fresh Tandoori Naan',
    category: 'Family Platters',
    caption: 'Creamy curry paired with garlic coriander naan straight out of the tandoor.',
    imageUrl: FOOD_IMAGES.garlicNaanCurry.url,
    imageAlt: FOOD_IMAGES.garlicNaanCurry.alt,
  },
  {
    id: 'gal-9',
    title: 'Welcoming Table Seating',
    category: 'Dining Area',
    caption: 'Spacious table arrangements ready for lunch rushes and weekend family outings.',
    imageUrl: FOOD_IMAGES.diningTables.url,
    imageAlt: FOOD_IMAGES.diningTables.alt,
  },
  {
    id: 'gal-10',
    title: 'Assorted Kebab Feast',
    category: 'Dishes',
    caption: 'Skewered beef and chicken kebabs with grilled peppers, fries, and flatbread.',
    imageUrl: FOOD_IMAGES.bbqKebabPlatter.url,
    imageAlt: FOOD_IMAGES.bbqKebabPlatter.alt,
  },
];

export const DEMO_REVIEWS: DemoReview[] = [
  {
    id: 'rev-1',
    reviewerName: 'Bilal Tariq',
    visitContext: 'Sample Family Dinner · Islamabad',
    rating: 5,
    orderedItem: 'Chicken Karahi & Seekh Kebabs',
    quote:
      'The Chicken Karahi tastes genuinely fresh with real tomato and ginger balance, and the Roghni naan stayed soft till the last bite. Great place to bring parents and kids.',
  },
  {
    id: 'rev-2',
    reviewerName: 'Ayesha Siddiqui',
    visitContext: 'Sample University Hangout · F-7 Markaz',
    rating: 5,
    orderedItem: "Friends' Combo & Paratha Rolls",
    quote:
      "Our go-to weekend spot after classes. The Paratha Rolls and Friends' Combo are filling, budget-friendly, and come out piping hot without long waits.",
  },
  {
    id: 'rev-3',
    reviewerName: 'Hamza Qureshi',
    visitContext: 'Sample Takeaway Order · G-6',
    rating: 5,
    orderedItem: 'Dastarkhwan BBQ Platter',
    quote:
      'Ordered the BBQ Platter for guests at home. Everything arrived neatly packed, the smoky charcoal aroma filled the room, and the portions easily fed four people.',
  },
];

export function formatPkr(amount: number): string {
  return `PKR ${amount.toLocaleString('en-PK')}`;
}
