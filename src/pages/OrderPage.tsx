import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  Check,
  Minus,
  Trash2,
  ShoppingCart,
  MessageCircle,
  Info,
  Search,
  X,
  ArrowRight,
} from 'lucide-react';
import {
  MENU_CATEGORIES,
  MENU_ITEMS,
  SPECIAL_DEALS,
  RESTAURANT_INFO,
  MenuCategory,
  formatPkr,
} from '../data/restaurantData';
import { useCart } from '../context/CartContext';
import { FoodImage } from '../components/FoodImage';

type OrderBrowseTab = 'All' | 'Special Deals' | MenuCategory;

export function OrderPage() {
  const {
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
  } = useCart();

  const [activeTab, setActiveTab] = useState<OrderBrowseTab>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [whatsappNotice, setWhatsappNotice] = useState<string | null>(null);

  const catalogEntries = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const dishEntries = MENU_ITEMS.map((dish) => ({
      id: dish.id,
      name: dish.name,
      category: dish.category as OrderBrowseTab,
      description: dish.description,
      servingNote: dish.servingNote ?? '',
      pricePkr: dish.pricePkr,
      imageUrl: dish.imageUrl,
      imageAlt: dish.imageAlt,
    }));

    const dealEntries = SPECIAL_DEALS.map((deal) => ({
      id: deal.id,
      name: `${deal.title} (Deal)`,
      category: 'Special Deals' as OrderBrowseTab,
      description: deal.itemsIncluded.join(' · '),
      servingNote: deal.servesText,
      pricePkr: deal.dealPricePkr,
      imageUrl: deal.images[0].url,
      imageAlt: deal.images[0].alt,
    }));

    const combined =
      activeTab === 'Special Deals'
        ? dealEntries
        : activeTab === 'All'
          ? [...dealEntries, ...dishEntries]
          : dishEntries.filter((entry) => entry.category === activeTab);

    if (!query) return combined;

    return combined.filter(
      (entry) =>
        entry.name.toLowerCase().includes(query) ||
        entry.description.toLowerCase().includes(query) ||
        String(entry.category).toLowerCase().includes(query)
    );
  }, [activeTab, searchQuery]);

  const getItemQuantityInCart = (id: string) =>
    items.find((entry) => entry.id === id)?.quantity ?? 0;

  const buildWhatsAppUrl = () => {
    const base = `https://wa.me/${RESTAURANT_INFO.whatsappNumber}`;
    if (items.length === 0) {
      return `${base}?text=${encodeURIComponent(
        `Assalam-o-Alaikum ${RESTAURANT_INFO.brandName}, I would like to place a food order.`
      )}`;
    }

    const itemLines = items
      .map(
        (item) =>
          `- ${item.quantity}x ${item.name} (${formatPkr(item.pricePkr * item.quantity)})`
      )
      .join('\n');

    const discountLine =
      discountPkr > 0
        ? `\nDiscount (${appliedPromo?.code ?? 'Promo'}): - ${formatPkr(discountPkr)}`
        : '';

    const message = `Assalam-o-Alaikum ${RESTAURANT_INFO.brandName} (Demo Order),\n\nItems:\n${itemLines}\n\nSubtotal: ${formatPkr(subtotalPkr)}\nDelivery Fee: ${formatPkr(deliveryFeePkr)}${discountLine}\nTotal Payable: ${formatPkr(totalPayablePkr)}`;

    return `${base}?text=${encodeURIComponent(message)}`;
  };

  const handleWhatsAppOrder = () => {
    setWhatsappNotice(
      `Prepared itemized WhatsApp message for configurable demo number (${RESTAURANT_INFO.displayPhone}). This is a portfolio demonstration — no real restaurant order was sent.`
    );
  };

  return (
    <>
      {/* Page Header */}
      <section className="bg-white border-b border-[#E5DDD0] py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[#D9531E]">
                Quick Online Ordering
              </p>
              <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-[#1E1B18] mt-1 tracking-tight">
                Order Online
              </h1>
              <p className="text-[#5C534A] mt-2 max-w-2xl">
                Add dishes and combos directly to your cart, review live pricing with delivery charges, or proceed to your full cart and checkout.
              </p>
            </div>

            <div className="inline-flex items-start gap-2 text-xs text-[#7A1C1C] bg-[#FAF6F0] border border-[#DFD3C3] rounded-xl px-3.5 py-2.5 max-w-sm">
              <Info className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
              <span>
                <strong>Demo Notice:</strong> Portfolio ordering simulator only. Orders are not transmitted to a live restaurant kitchen.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Two-Column Ordering Interface */}
      <section className="py-8 sm:py-12 bg-[#FAF6F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Menu & Deals Selector */}
            <div className="lg:col-span-7 space-y-6">
              {/* Search & Category Tabs */}
              <div className="bg-white rounded-2xl border border-[#E5DDD0] p-4 sm:p-5 space-y-4">
                <div className="relative">
                  <Search
                    className="w-4 h-4 text-[#7D7166] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    aria-hidden="true"
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search dishes or deals to add..."
                    aria-label="Search items to order"
                    className="w-full pl-10 pr-9 py-2.5 text-sm bg-[#FAF6F0] border border-[#DFD3C3] rounded-xl text-[#1E1B18] placeholder:text-[#8A7E72] focus:outline-none focus:ring-2 focus:ring-[#D9531E]"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      aria-label="Clear search"
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#7D7166] hover:text-[#1E1B18] cursor-pointer"
                    >
                      <X className="w-4 h-4" aria-hidden="true" />
                    </button>
                  )}
                </div>

                <div
                  role="tablist"
                  aria-label="Order Menu Categories"
                  className="flex flex-wrap gap-2"
                >
                  {(['All', 'Special Deals', ...MENU_CATEGORIES] as OrderBrowseTab[]).map(
                    (tab) => {
                      const isActive = activeTab === tab;
                      return (
                        <button
                          key={tab}
                          role="tab"
                          type="button"
                          aria-selected={isActive}
                          onClick={() => setActiveTab(tab)}
                          className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                            isActive
                              ? 'bg-[#7A1C1C] text-white'
                              : 'bg-[#FAF6F0] text-[#3D352E] border border-[#E5DDD0] hover:border-[#D9531E] hover:text-[#D9531E]'
                          }`}
                        >
                          {tab}
                        </button>
                      );
                    }
                  )}
                </div>
              </div>

              {/* Items List */}
              {catalogEntries.length === 0 ? (
                <div className="bg-white rounded-2xl border border-[#E5DDD0] p-8 text-center">
                  <p className="font-display text-base font-bold text-[#1E1B18]">
                    No items found for &ldquo;{searchQuery}&rdquo;
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setActiveTab('All');
                    }}
                    className="mt-3 px-4 py-2 text-xs font-semibold text-white bg-[#D9531E] rounded-lg cursor-pointer"
                  >
                    Reset Filter
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {catalogEntries.map((entry) => {
                    const qtyInCart = getItemQuantityInCart(entry.id);
                    const isJustAdded = recentlyAddedId === entry.id;
                    return (
                      <article
                        key={entry.id}
                        className="flex flex-col bg-white rounded-2xl border border-[#E5DDD0] overflow-hidden hover:shadow-sm transition-shadow"
                      >
                        <div className="flex gap-3.5 p-4 flex-1">
                          <div className="w-24 h-24 rounded-xl overflow-hidden bg-[#EFE7DB] shrink-0">
                            <FoodImage
                              src={entry.imageUrl}
                              alt={entry.imageAlt}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-[11px] font-semibold text-[#D9531E] block">
                              {entry.category}
                            </span>
                            <h2 className="font-display text-base font-bold text-[#1E1B18] leading-snug mt-0.5">
                              {entry.name}
                            </h2>
                            <p className="text-xs text-[#5C534A] mt-1 line-clamp-2">
                              {entry.description}
                            </p>
                          </div>
                        </div>

                        <div className="px-4 py-3 bg-[#FAF6F0] border-t border-[#E5DDD0] flex items-center justify-between gap-3">
                          <span className="font-display text-base font-extrabold text-[#7A1C1C] tabular-nums">
                            {formatPkr(entry.pricePkr)}
                          </span>

                          {qtyInCart > 0 ? (
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => updateQuantity(entry.id, -1)}
                                aria-label={`Decrease ${entry.name} quantity`}
                                className="w-8 h-8 rounded-lg border border-[#DFD3C3] bg-white hover:bg-[#EFE7DB] flex items-center justify-center text-[#1E1B18] cursor-pointer"
                              >
                                <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                              </button>
                              <span className="w-6 text-center text-xs font-bold tabular-nums">
                                {qtyInCart}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(entry.id, 1)}
                                aria-label={`Increase ${entry.name} quantity`}
                                className="w-8 h-8 rounded-lg bg-[#D9531E] hover:bg-[#BF4414] text-white flex items-center justify-center cursor-pointer"
                              >
                                <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() =>
                                addToCart({
                                  id: entry.id,
                                  name: entry.name,
                                  pricePkr: entry.pricePkr,
                                  imageUrl: entry.imageUrl,
                                })
                              }
                              className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white rounded-lg transition-colors cursor-pointer ${
                                isJustAdded
                                  ? 'bg-[#7A1C1C]'
                                  : 'bg-[#D9531E] hover:bg-[#BF4414]'
                              }`}
                            >
                              {isJustAdded ? (
                                <>
                                  <Check className="w-3.5 h-3.5" aria-hidden="true" />
                                  <span>Added</span>
                                </>
                              ) : (
                                <>
                                  <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                                  <span>Add to Cart</span>
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Right Column: Live Cart Summary + Navigation to /cart & /checkout */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-5">
              <div className="bg-white rounded-2xl border border-[#E5DDD0] p-5 sm:p-6 shadow-sm">
                <div className="flex items-center justify-between gap-3 pb-4 border-b border-[#E5DDD0]">
                  <Link
                    to="/cart"
                    className="flex items-center gap-2.5 group"
                  >
                    <ShoppingCart
                      className="w-5 h-5 text-[#D9531E]"
                      aria-hidden="true"
                    />
                    <h2 className="font-display text-xl font-bold text-[#1E1B18] group-hover:text-[#D9531E] transition-colors">
                      Your Cart ({totalCount})
                    </h2>
                  </Link>
                  {items.length > 0 && (
                    <button
                      type="button"
                      onClick={clearCart}
                      className="text-xs font-semibold text-[#7A1C1C] hover:underline cursor-pointer"
                    >
                      Clear Cart
                    </button>
                  )}
                </div>

                {items.length === 0 ? (
                  <div className="py-10 text-center">
                    <p className="text-sm font-semibold text-[#1E1B18]">
                      Your cart is currently empty.
                    </p>
                    <p className="text-xs text-[#5C534A] mt-1">
                      Click &ldquo;Add to Cart&rdquo; on any dish or deal to begin your order.
                    </p>
                  </div>
                ) : (
                  <>
                    <ul className="divide-y divide-[#F0E9DF] max-h-72 overflow-y-auto">
                      {items.map((item) => (
                        <li
                          key={item.id}
                          className="py-3.5 flex items-center gap-3"
                        >
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#EFE7DB] shrink-0">
                            <FoodImage
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-[#1E1B18] truncate">
                              {item.name}
                            </p>
                            <p className="text-xs text-[#5C534A] tabular-nums">
                              {formatPkr(item.pricePkr)} &times; {item.quantity} ={' '}
                              <strong className="text-[#7A1C1C]">
                                {formatPkr(item.pricePkr * item.quantity)}
                              </strong>
                            </p>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, -1)}
                              aria-label={`Decrease ${item.name} quantity`}
                              className="w-7 h-7 rounded-md border border-[#E5DDD0] bg-[#FAF6F0] hover:bg-[#EFE7DB] flex items-center justify-center text-[#1E1B18] cursor-pointer"
                            >
                              <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                            </button>
                            <span className="w-6 text-center text-xs font-bold tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, 1)}
                              aria-label={`Increase ${item.name} quantity`}
                              className="w-7 h-7 rounded-md border border-[#E5DDD0] bg-[#FAF6F0] hover:bg-[#EFE7DB] flex items-center justify-center text-[#1E1B18] cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                            </button>
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              aria-label={`Remove ${item.name}`}
                              className="w-7 h-7 rounded-md text-[#7D7166] hover:text-[#7A1C1C] flex items-center justify-center cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>

                    {/* Price Calculation Summary */}
                    <dl className="mt-3 pt-4 border-t border-[#E5DDD0] space-y-2 text-sm">
                      <div className="flex items-center justify-between text-[#5C534A]">
                        <dt>Subtotal</dt>
                        <dd className="font-semibold text-[#1E1B18] tabular-nums">
                          {formatPkr(subtotalPkr)}
                        </dd>
                      </div>
                      <div className="flex items-center justify-between text-[#5C534A]">
                        <dt>Delivery Fee</dt>
                        <dd className="font-semibold text-[#1E1B18] tabular-nums">
                          {formatPkr(deliveryFeePkr)}
                        </dd>
                      </div>
                      {discountPkr > 0 && (
                        <div className="flex items-center justify-between text-[#1D8A4E]">
                          <dt>
                            Discount
                            {appliedPromo ? ` (${appliedPromo.code})` : ''}
                          </dt>
                          <dd className="font-semibold tabular-nums">
                            &minus; {formatPkr(discountPkr)}
                          </dd>
                        </div>
                      )}
                      <div className="flex items-center justify-between pt-2 border-t border-[#F0E9DF]">
                        <dt className="font-display font-bold text-[#1E1B18]">
                          Total Payable
                        </dt>
                        <dd className="font-display text-xl font-extrabold text-[#7A1C1C] tabular-nums">
                          {formatPkr(totalPayablePkr)}
                        </dd>
                      </div>
                    </dl>

                    <div className="mt-5 space-y-2.5">
                      <Link
                        to="/checkout"
                        className="w-full inline-flex items-center justify-center gap-2 py-3.5 text-sm font-bold text-white bg-[#D9531E] hover:bg-[#BF4414] rounded-xl shadow-sm transition-colors"
                      >
                        <span>Proceed to Checkout</span>
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </Link>

                      <Link
                        to="/cart"
                        className="w-full inline-flex items-center justify-center gap-2 py-3 text-sm font-semibold text-[#7A1C1C] bg-[#FAF6F0] hover:bg-[#EFE7DB] border border-[#DFD3C3] rounded-xl transition-colors"
                      >
                        <ShoppingCart className="w-4 h-4" aria-hidden="true" />
                        <span>View Full Cart ({totalCount})</span>
                      </Link>

                      <a
                        href={buildWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleWhatsAppOrder}
                        className="w-full inline-flex items-center justify-center gap-2 py-3 text-sm font-bold text-white bg-[#1D8A4E] hover:bg-[#166E3E] rounded-xl shadow-sm transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" aria-hidden="true" />
                        <span>
                          Order via WhatsApp ({RESTAURANT_INFO.displayPhone})
                        </span>
                      </a>
                    </div>

                    {whatsappNotice && (
                      <div className="mt-3 p-3 rounded-xl bg-[#FAF6F0] border border-[#E5DDD0] text-xs text-[#3D352E] flex items-start gap-2">
                        <Info
                          className="w-4 h-4 text-[#D9531E] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{whatsappNotice}</span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
