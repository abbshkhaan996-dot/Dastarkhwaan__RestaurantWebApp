import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  ReactNode,
} from 'react';
import { ORDER_CONFIG, PromoCodeConfig } from '../data/restaurantData';

export interface CartItem {
  id: string;
  name: string;
  pricePkr: number;
  quantity: number;
  imageUrl: string;
}

interface PersistedCartState {
  items: CartItem[];
  promoCode: string | null;
}

interface CartContextValue {
  items: CartItem[];
  totalCount: number;
  subtotalPkr: number;
  deliveryFeePkr: number;
  discountPkr: number;
  totalPayablePkr: number;
  appliedPromo: PromoCodeConfig | null;
  recentlyAddedId: string | null;
  addToCart: (item: {
    id: string;
    name: string;
    pricePkr: number;
    imageUrl: string;
  }) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  applyPromoCode: (rawCode: string) => { ok: boolean; message: string };
  removePromoCode: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function loadStoredCart(): PersistedCartState {
  if (typeof window === 'undefined') {
    return { items: [], promoCode: null };
  }
  try {
    const raw = window.localStorage.getItem(ORDER_CONFIG.storageKey);
    if (!raw) return { items: [], promoCode: null };
    const parsed = JSON.parse(raw) as Partial<PersistedCartState>;
    const validItems = Array.isArray(parsed.items)
      ? parsed.items.filter(
          (entry): entry is CartItem =>
            Boolean(entry) &&
            typeof entry.id === 'string' &&
            typeof entry.name === 'string' &&
            typeof entry.pricePkr === 'number' &&
            entry.pricePkr > 0 &&
            typeof entry.quantity === 'number' &&
            entry.quantity > 0 &&
            typeof entry.imageUrl === 'string'
        )
      : [];
    const validPromo =
      typeof parsed.promoCode === 'string' &&
      ORDER_CONFIG.promoCodes[parsed.promoCode.toUpperCase()]
        ? parsed.promoCode.toUpperCase()
        : null;
    return { items: validItems, promoCode: validPromo };
  } catch {
    return { items: [], promoCode: null };
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [initialState] = useState<PersistedCartState>(() => loadStoredCart());
  const [items, setItems] = useState<CartItem[]>(initialState.items);
  const [promoCode, setPromoCode] = useState<string | null>(
    initialState.promoCode
  );
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    try {
      const payload: PersistedCartState = { items, promoCode };
      window.localStorage.setItem(
        ORDER_CONFIG.storageKey,
        JSON.stringify(payload)
      );
    } catch {
      // Ignore storage quota or private browsing write errors
    }
  }, [items, promoCode]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const addToCart = (item: {
    id: string;
    name: string;
    pricePkr: number;
    imageUrl: string;
  }) => {
    setItems((prev) => {
      const existing = prev.find((entry) => entry.id === item.id);
      if (existing) {
        return prev.map((entry) =>
          entry.id === item.id
            ? { ...entry, quantity: entry.quantity + 1 }
            : entry
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });

    setRecentlyAddedId(item.id);
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }
    timerRef.current = window.setTimeout(() => {
      setRecentlyAddedId(null);
    }, 1400);
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((entry) =>
          entry.id === id
            ? { ...entry, quantity: entry.quantity + delta }
            : entry
        )
        .filter((entry) => entry.quantity > 0)
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((entry) => entry.id !== id));
  };

  const clearCart = () => {
    setItems([]);
    setPromoCode(null);
  };

  const applyPromoCode = (rawCode: string): { ok: boolean; message: string } => {
    const normalized = rawCode.trim().toUpperCase();
    if (!normalized) {
      return { ok: false, message: 'Please enter a promo code.' };
    }
    const found = ORDER_CONFIG.promoCodes[normalized];
    if (!found) {
      return {
        ok: false,
        message: 'Invalid code. Try DASTARKHWAN10 or FAMILY250.',
      };
    }
    setPromoCode(found.code);
    return { ok: true, message: `Applied: ${found.label}` };
  };

  const removePromoCode = () => {
    setPromoCode(null);
  };

  const totalCount = items.reduce((sum, entry) => sum + entry.quantity, 0);
  const subtotalPkr = items.reduce(
    (sum, entry) => sum + entry.pricePkr * entry.quantity,
    0
  );
  const deliveryFeePkr = items.length > 0 ? ORDER_CONFIG.deliveryFeePkr : 0;
  const appliedPromo = promoCode
    ? ORDER_CONFIG.promoCodes[promoCode] ?? null
    : null;

  let discountPkr = 0;
  if (items.length > 0 && appliedPromo) {
    if (appliedPromo.percent) {
      discountPkr = Math.round((subtotalPkr * appliedPromo.percent) / 100);
    } else if (appliedPromo.flatPkr) {
      discountPkr = Math.min(subtotalPkr, appliedPromo.flatPkr);
    }
  }

  const totalPayablePkr = Math.max(
    0,
    subtotalPkr + deliveryFeePkr - discountPkr
  );

  return (
    <CartContext.Provider
      value={{
        items,
        totalCount,
        subtotalPkr,
        deliveryFeePkr,
        discountPkr,
        totalPayablePkr,
        appliedPromo,
        recentlyAddedId,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        applyPromoCode,
        removePromoCode,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
