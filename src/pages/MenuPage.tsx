import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Check, Search, X, ShoppingBag, ArrowRight } from 'lucide-react';
import {
  MENU_CATEGORIES,
  MENU_ITEMS,
  MenuCategory,
  formatPkr,
} from '../data/restaurantData';
import { useCart } from '../context/CartContext';
import { FoodImage } from '../components/FoodImage';

type CategoryFilter = 'All' | MenuCategory;

export function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart, recentlyAddedId, totalCount, subtotalPkr } = useCart();

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return MENU_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      if (!matchesCategory) return false;
      if (!query) return true;
      return (
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      );
    });
  }, [selectedCategory, searchQuery]);

  const groupedSections = useMemo(() => {
    if (selectedCategory !== 'All') {
      return [{ category: selectedCategory, items: filteredItems }];
    }
    return MENU_CATEGORIES.map((cat) => ({
      category: cat,
      items: filteredItems.filter((item) => item.category === cat),
    })).filter((group) => group.items.length > 0);
  }, [selectedCategory, filteredItems]);

  return (
    <>
      {/* Page Header */}
      <section className="bg-white border-b border-[#E5DDD0] py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <p className="text-sm font-semibold text-[#D9531E]">
                Freshly Prepared Daily
              </p>
              <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-[#1E1B18] mt-1 tracking-tight text-balance">
                Complete Restaurant Menu
              </h1>
              <p className="text-[#5C534A] mt-2 max-w-2xl">
                Explore all eight kitchen sections — from sizzling karahis and charcoal BBQ to Chinese woks, Zinger burgers, paratha rolls, tandoor breads, and desserts.
              </p>
            </div>

            {/* Search Box */}
            <div className="relative w-full lg:w-80 shrink-0">
              <Search
                className="w-4 h-4 text-[#7D7166] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dishes (e.g. Karahi, Tikka)..."
                aria-label="Search menu dishes"
                className="w-full pl-10 pr-9 py-2.5 text-sm bg-[#FAF6F0] border border-[#DFD3C3] rounded-xl text-[#1E1B18] placeholder:text-[#8A7E72] focus:outline-none focus:ring-2 focus:ring-[#D9531E] focus:border-transparent"
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
          </div>
        </div>
      </section>

      {/* Filters & Menu Grid */}
      <section className="py-8 sm:py-12 bg-[#FAF6F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter Tabs */}
          <div
            role="tablist"
            aria-label="Menu Categories"
            className="flex flex-wrap gap-2 pb-6 border-b border-[#E5DDD0]"
          >
            <button
              role="tab"
              type="button"
              aria-selected={selectedCategory === 'All'}
              onClick={() => setSelectedCategory('All')}
              className={`px-4 py-2.5 text-sm font-semibold rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9531E] ${
                selectedCategory === 'All'
                  ? 'bg-[#7A1C1C] text-white shadow-sm'
                  : 'bg-white text-[#3D352E] border border-[#E5DDD0] hover:border-[#D9531E] hover:text-[#D9531E]'
              }`}
            >
              All Categories ({MENU_ITEMS.length})
            </button>

            {MENU_CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2.5 text-sm font-semibold rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9531E] ${
                    isActive
                      ? 'bg-[#7A1C1C] text-white shadow-sm'
                      : 'bg-white text-[#3D352E] border border-[#E5DDD0] hover:border-[#D9531E] hover:text-[#D9531E]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Active Cart Helper Banner */}
          {totalCount > 0 && (
            <div className="mt-6 p-4 rounded-2xl bg-white border border-[#DFD3C3] flex flex-wrap items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#D9531E]/10 text-[#D9531E] flex items-center justify-center shrink-0">
                  <ShoppingBag className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-display text-sm font-bold text-[#1E1B18]">
                    {totalCount} {totalCount === 1 ? 'item' : 'items'} in your cart
                  </p>
                  <p className="text-xs text-[#5C534A] tabular-nums">
                    Current Subtotal: <strong className="text-[#7A1C1C]">{formatPkr(subtotalPkr)}</strong>
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                <Link
                  to="/cart"
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#7A1C1C] bg-[#FAF6F0] hover:bg-[#EFE7DB] border border-[#DFD3C3] rounded-xl transition-colors whitespace-nowrap"
                >
                  <span>View Cart ({totalCount})</span>
                </Link>
                <Link
                  to="/checkout"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#D9531E] hover:bg-[#BF4414] rounded-xl transition-colors whitespace-nowrap"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          )}

          {/* Dishes Display */}
          {filteredItems.length === 0 ? (
            <div className="mt-8 bg-white border border-[#E5DDD0] rounded-2xl p-10 text-center">
              <p className="font-display text-lg font-bold text-[#1E1B18]">
                No dishes matched &ldquo;{searchQuery}&rdquo;
              </p>
              <p className="text-sm text-[#5C534A] mt-1">
                Try clearing the search or switching back to All Categories.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="mt-4 px-5 py-2.5 text-sm font-semibold text-white bg-[#D9531E] hover:bg-[#BF4414] rounded-xl cursor-pointer"
              >
                Show Full Menu
              </button>
            </div>
          ) : (
            <div className="mt-8 space-y-12">
              {groupedSections.map((group) => (
                <div key={group.category}>
                  <div className="flex items-baseline justify-between gap-4 mb-5">
                    <h2 className="font-display text-2xl font-extrabold text-[#1E1B18]">
                      {group.category}
                    </h2>
                    <span className="text-sm text-[#5C534A] tabular-nums">
                      {group.items.length}{' '}
                      {group.items.length === 1 ? 'dish' : 'dishes'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {group.items.map((dish) => {
                      const isAdded = recentlyAddedId === dish.id;
                      return (
                        <article
                          key={dish.id}
                          className="flex flex-col sm:flex-row gap-4 p-4 bg-white rounded-2xl border border-[#E5DDD0] hover:shadow-sm transition-shadow"
                        >
                          <div className="w-full sm:w-36 h-48 sm:h-36 rounded-xl overflow-hidden bg-[#EFE7DB] shrink-0">
                            <FoodImage
                              src={dish.imageUrl}
                              alt={dish.imageAlt}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="flex-1 flex flex-col justify-between min-w-0">
                            <div>
                              <div className="flex items-start justify-between gap-3">
                                <h3 className="font-display text-lg font-bold text-[#1E1B18] leading-snug">
                                  {dish.name}
                                </h3>
                                <span className="font-display text-base font-extrabold text-[#7A1C1C] tabular-nums whitespace-nowrap shrink-0">
                                  {formatPkr(dish.pricePkr)}
                                </span>
                              </div>

                              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-[#5C534A]">
                                {dish.servingNote && <span>{dish.servingNote}</span>}
                                {dish.spiceLevel && (
                                  <>
                                    <span aria-hidden="true">·</span>
                                    <span className="font-medium text-[#7A1C1C]">
                                      {dish.spiceLevel}
                                    </span>
                                  </>
                                )}
                              </div>

                              <p className="mt-2 text-sm text-[#5C534A] leading-relaxed">
                                {dish.description}
                              </p>
                            </div>

                            <div className="mt-3 flex justify-end">
                              <button
                                type="button"
                                onClick={() =>
                                  addToCart({
                                    id: dish.id,
                                    name: dish.name,
                                    pricePkr: dish.pricePkr,
                                    imageUrl: dish.imageUrl,
                                  })
                                }
                                className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9531E] ${
                                  isAdded
                                    ? 'bg-[#7A1C1C] text-white'
                                    : 'bg-[#D9531E] hover:bg-[#BF4414] text-white'
                                }`}
                              >
                                {isAdded ? (
                                  <>
                                    <Check className="w-3.5 h-3.5" aria-hidden="true" />
                                    <span>Added to Cart</span>
                                  </>
                                ) : (
                                  <>
                                    <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                                    <span>Add to Cart</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
