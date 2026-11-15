import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { SPECIAL_DEALS, DealItem, formatPkr } from '../data/restaurantData';
import { useCart } from '../context/CartContext';
import { DealCard } from '../components/DealCard';

export function DealsPage() {
  const { addToCart, recentlyAddedId, totalCount, subtotalPkr } = useCart();

  const handleOrderDeal = (deal: DealItem) => {
    addToCart({
      id: deal.id,
      name: `${deal.title} (Deal)`,
      pricePkr: deal.dealPricePkr,
      imageUrl: deal.images[0].url,
    });
  };

  const [featuredDeal, ...otherDeals] = SPECIAL_DEALS;

  return (
    <>
      {/* Page Header */}
      <section className="bg-[#FAF6F0] border-b border-[#E5DDD0] py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[#D9531E]">
                Value Combos, BBQ Deals &amp; Family Spreads
              </p>
              <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-[#1E1B18] mt-1 tracking-tight text-balance">
                Special Deals &amp; Platters
              </h1>
              <p className="text-[#5C534A] mt-2 max-w-2xl">
                Every combo shows exactly what is served on the table alongside matched photography and clear PKR savings.
              </p>
            </div>

            {totalCount > 0 && (
              <Link
                to="/cart"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold text-white bg-[#7A1C1C] hover:bg-[#5E1414] rounded-xl shadow-sm transition-colors whitespace-nowrap shrink-0"
              >
                <ShoppingBag className="w-4 h-4" aria-hidden="true" />
                <span>
                  View Cart ({totalCount} · {formatPkr(subtotalPkr)})
                </span>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Deals Showcase */}
      <section className="py-10 sm:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Family Deal */}
          <DealCard
            deal={featuredDeal}
            featured
            isAdded={recentlyAddedId === featuredDeal.id}
            onOrderDeal={handleOrderDeal}
          />

          {/* Remaining Deals Grid */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7">
            {otherDeals.map((deal) => (
              <DealCard
                key={deal.id}
                deal={deal}
                isAdded={recentlyAddedId === deal.id}
                onOrderDeal={handleOrderDeal}
              />
            ))}
          </div>

          {/* Bottom Link to Order / Full Menu */}
          <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#FAF6F0] border border-[#E5DDD0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-xl font-bold text-[#1E1B18]">
                Want to Customize With Extra Naans, Kebabs, or Mango Lassi?
              </h2>
              <p className="text-sm text-[#5C534A] mt-1">
                Pair any Special Deal with individual dishes from our full menu before checking out.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                to="/menu"
                className="px-5 py-2.5 text-sm font-semibold text-[#7A1C1C] bg-white hover:bg-[#EFE7DB] border border-[#DFD3C3] rounded-xl transition-colors whitespace-nowrap"
              >
                Browse Full Menu
              </Link>
              <Link
                to="/cart"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold text-white bg-[#D9531E] hover:bg-[#BF4414] rounded-xl transition-colors whitespace-nowrap"
              >
                <span>View My Cart</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
