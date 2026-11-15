import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Flame,
  Utensils,
  Clock,
  Users,
  Plus,
  Check,
  Star,
  Info,
  Sparkles,
} from 'lucide-react';
import {
  RESTAURANT_INFO,
  POPULAR_DISHES,
  SPECIAL_DEALS,
  DEMO_REVIEWS,
  DishItem,
  DealItem,
  formatPkr,
} from '../data/restaurantData';
import { useCart } from '../context/CartContext';
import { FoodImage } from '../components/FoodImage';
import { DealCard } from '../components/DealCard';

const HIGHLIGHTS = [
  {
    icon: Flame,
    title: 'Live Charcoal BBQ',
    detail: 'Freshly skewered & grilled over glowing embers',
  },
  {
    icon: Utensils,
    title: 'Cooked Per Order',
    detail: 'Hot karahis & handis made from scratch',
  },
  {
    icon: Users,
    title: 'Family Dining Hall',
    detail: 'Warm, spacious seating in F-7 Islamabad',
  },
  {
    icon: Clock,
    title: 'Fast Takeaway & Delivery',
    detail: 'Quick counter pickup & online ordering',
  },
];

export function HomePage() {
  const { addToCart, recentlyAddedId } = useCart();

  const handleAddDish = (dish: DishItem) => {
    addToCart({
      id: dish.id,
      name: dish.name,
      pricePkr: dish.pricePkr,
      imageUrl: dish.imageUrl,
    });
  };

  const handleAddDeal = (deal: DealItem) => {
    addToCart({
      id: deal.id,
      name: `${deal.title} (Deal)`,
      pricePkr: deal.dealPricePkr,
      imageUrl: deal.images[0].url,
    });
  };

  const featuredDeal = SPECIAL_DEALS[0];
  const previewDeals = SPECIAL_DEALS.slice(1, 3);

  return (
    <>
      {/* 1. Hero Section */}
      <section className="relative bg-[#FAF6F0] border-b border-[#E5DDD0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Left Content Column */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <p className="text-sm font-semibold text-[#7A1C1C] tracking-wide mb-3">
                Authentic Pakistani Kitchen &amp; BBQ · {RESTAURANT_INFO.city}
              </p>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-[#1E1B18] leading-[1.1] tracking-tight text-balance">
                {RESTAURANT_INFO.heroHeading}
              </h1>

              <p className="mt-5 text-lg sm:text-xl text-[#5C534A] leading-relaxed max-w-xl">
                {RESTAURANT_INFO.heroSubheading}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <Link
                  to="/menu"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-[#D9531E] hover:bg-[#BF4414] rounded-xl shadow-sm transition-all whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#D9531E]"
                >
                  <span>View Full Menu</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>

                <Link
                  to="/deals"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-base font-semibold text-[#1E1B18] bg-white hover:bg-[#F2EBE1] border border-[#DFD3C3] rounded-xl transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#D9531E]"
                >
                  <Sparkles className="w-4 h-4 text-[#D9531E]" aria-hidden="true" />
                  <span>Explore Deals</span>
                </Link>

                <Link
                  to="/order"
                  className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-white bg-[#7A1C1C] hover:bg-[#5E1414] rounded-xl shadow-sm transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#7A1C1C]"
                >
                  Order Now
                </Link>
              </div>

              <div className="mt-8 pt-6 border-t border-[#E5DDD0] flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#5C534A]">
                <span className="font-medium text-[#1E1B18]">
                  Open Daily 12:00 PM – 12:30 AM
                </span>
                <span aria-hidden="true">·</span>
                <span>Karahi, Biryani, BBQ &amp; Rolls</span>
                <span aria-hidden="true">·</span>
                <span>100% Zabiha Halal</span>
              </div>
            </div>

            {/* Right Food Photography Showcase */}
            <div className="lg:col-span-6">
              <div className="relative h-72 sm:h-96 lg:h-full min-h-[380px] rounded-2xl overflow-hidden shadow-md border border-[#E5DDD0] bg-[#EFE7DB]">
                <FoodImage
                  src={RESTAURANT_INFO.heroImage.url}
                  alt={RESTAURANT_INFO.heroImage.alt}
                  loading="eager"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent p-5 sm:p-6">
                  <p className="text-xs font-medium text-white/85">
                    House Signature Spread
                  </p>
                  <p className="font-display text-lg sm:text-xl font-bold text-white mt-0.5">
                    Freshly Simmered Karahi, Steaming Biryani &amp; Warm Naan
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 4-Column Highlights Row Below Split */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {HIGHLIGHTS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-[#E5DDD0]"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#D9531E]/10 text-[#D9531E] flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-display text-sm font-bold text-[#1E1B18]">
                      {item.title}
                    </h2>
                    <p className="text-xs text-[#5C534A] mt-0.5 leading-snug">
                      {item.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Restaurant Introduction Strip */}
      <section className="py-12 sm:py-14 bg-white border-b border-[#E5DDD0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAF6F0] rounded-2xl border border-[#E5DDD0] p-6 sm:p-8">
            <div className="lg:col-span-5 h-64 sm:h-72 rounded-xl overflow-hidden bg-[#EFE7DB] border border-[#E5DDD0]">
              <FoodImage
                src={RESTAURANT_INFO.aboutImage.url}
                alt={RESTAURANT_INFO.aboutImage.alt}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="lg:col-span-7">
              <p className="text-sm font-semibold text-[#D9531E]">
                Welcome to {RESTAURANT_INFO.brandName}
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#1E1B18] mt-1 tracking-tight text-balance">
                {RESTAURANT_INFO.aboutHeading}
              </h2>
              <p className="mt-3 text-base text-[#3D352E] leading-relaxed">
                Born from a love for lively Pakistani dining tables, Dastarkhwan brings together the comforting warmth of home-style cooking and the energy of an open charcoal grill and sizzling karahi wok.
              </p>
              <p className="mt-2.5 text-sm text-[#5C534A] leading-relaxed">
                From quick student paratha rolls and office lunch biryani to evening family karahi feasts, our kitchen serves honest portions made fresh every single day.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#7A1C1C] hover:bg-[#5E1414] rounded-xl transition-colors"
                >
                  <span>Read Our Story</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link
                  to="/gallery"
                  className="text-sm font-semibold text-[#D9531E] hover:text-[#BF4414] underline underline-offset-4"
                >
                  Explore Photo Gallery
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Selected Popular Dishes */}
      <section className="py-14 sm:py-16 lg:py-20 bg-[#FAF6F0] border-b border-[#E5DDD0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-sm font-semibold text-[#D9531E]">
                Most Ordered Favourites
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#1E1B18] mt-1 tracking-tight text-balance">
                Popular Dishes
              </h2>
              <p className="text-[#5C534A] mt-2 max-w-2xl">
                Crafted daily with whole spices, fresh farm cuts, and traditional recipes loved by families and regulars alike.
              </p>
            </div>
            <Link
              to="/menu"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#7A1C1C] hover:text-[#D9531E] underline underline-offset-4 whitespace-nowrap shrink-0"
            >
              <span>View Full Menu</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {POPULAR_DISHES.map((dish) => {
              const isAdded = recentlyAddedId === dish.id;
              return (
                <article
                  key={dish.id}
                  className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-[#E5DDD0] hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-[#EFE7DB]">
                    <FoodImage
                      src={dish.imageUrl}
                      alt={dish.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                    />
                  </div>

                  <div className="p-5 sm:p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-xs text-[#5C534A] mb-1.5">
                      <span>{dish.category}</span>
                      {dish.servingNote && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>{dish.servingNote}</span>
                        </>
                      )}
                      {dish.spiceLevel && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="font-medium text-[#7A1C1C]">
                            {dish.spiceLevel}
                          </span>
                        </>
                      )}
                    </div>

                    <h3 className="font-display text-xl font-bold text-[#1E1B18]">
                      {dish.name}
                    </h3>

                    <p className="mt-2 text-sm text-[#5C534A] leading-relaxed flex-1">
                      {dish.description}
                    </p>

                    <div className="mt-5 pt-4 border-t border-[#E5DDD0] flex items-center justify-between gap-4">
                      <span className="font-display text-lg font-extrabold text-[#7A1C1C] tabular-nums">
                        {formatPkr(dish.pricePkr)}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleAddDish(dish)}
                        className={`inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9531E] ${
                          isAdded
                            ? 'bg-[#7A1C1C] text-white'
                            : 'bg-[#D9531E] hover:bg-[#BF4414] text-white'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4" aria-hidden="true" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" aria-hidden="true" />
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
      </section>

      {/* 4. Preview of Special Deals */}
      <section className="py-14 sm:py-16 lg:py-20 bg-white border-b border-[#E5DDD0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-sm font-semibold text-[#D9531E]">
                Great Value Combos &amp; Platters
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#1E1B18] mt-1 tracking-tight text-balance">
                Special Deals Preview
              </h2>
              <p className="text-[#5C534A] mt-2 max-w-2xl">
                Family feasts, squad combos, and live charcoal BBQ deals bundled to save more on every gathering.
              </p>
            </div>
            <Link
              to="/deals"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#7A1C1C] hover:text-[#D9531E] underline underline-offset-4 whitespace-nowrap shrink-0"
            >
              <span>Explore Deals</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <DealCard
            deal={featuredDeal}
            featured
            isAdded={recentlyAddedId === featuredDeal.id}
            onOrderDeal={handleAddDeal}
          />

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {previewDeals.map((deal) => (
              <DealCard
                key={deal.id}
                deal={deal}
                isAdded={recentlyAddedId === deal.id}
                onOrderDeal={handleAddDeal}
              />
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/deals"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-[#D9531E] hover:bg-[#BF4414] rounded-xl shadow-sm transition-colors"
            >
              <span>Explore All 5 Special Deals</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              to="/order"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-[#7A1C1C] bg-[#FAF6F0] hover:bg-[#EFE7DB] border border-[#DFD3C3] rounded-xl transition-colors"
            >
              <span>Go to Order Online</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Guest Impressions */}
      <section className="py-14 sm:py-16 lg:py-20 bg-[#FAF6F0] border-b border-[#E5DDD0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-sm font-semibold text-[#D9531E]">
                Guest Impressions
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#1E1B18] mt-1 tracking-tight text-balance">
                What Guests Love About Us
              </h2>
            </div>

            <div className="inline-flex items-center gap-2 text-xs text-[#5C534A] bg-white border border-[#E5DDD0] rounded-lg px-3 py-2 self-start md:self-auto">
              <Info className="w-4 h-4 text-[#7A1C1C] shrink-0" aria-hidden="true" />
              <span>Fictional sample testimonials shown for portfolio demonstration.</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DEMO_REVIEWS.map((review) => (
              <article
                key={review.id}
                className="flex flex-col justify-between p-6 bg-white rounded-2xl border border-[#E5DDD0]"
              >
                <div>
                  <div
                    className="flex items-center gap-1 text-[#D9531E] mb-3"
                    aria-label={`${review.rating} out of 5 stars`}
                  >
                    {Array.from({ length: review.rating }).map((_, idx) => (
                      <Star
                        key={idx}
                        className="w-4 h-4 fill-current"
                        aria-hidden="true"
                      />
                    ))}
                  </div>

                  <p className="text-sm text-[#3D352E] leading-relaxed">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E5DDD0]">
                  <p className="font-display text-sm font-bold text-[#1E1B18]">
                    {review.reviewerName}
                  </p>
                  <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-xs text-[#5C534A]">
                    <span>{review.visitContext}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#7A1C1C] font-medium">
                      {review.orderedItem}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Bottom Call to Action Banner */}
      <section className="py-14 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-r from-[#D9531E] to-[#B83E10] text-white p-7 sm:p-10 lg:p-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-md">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-wider text-white/85">
                Dine-In · Takeaway · Delivery
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold mt-1.5 text-balance">
                Craving Sizzling Karahi or Charcoal BBQ Tonight?
              </h2>
              <p className="mt-2 text-sm sm:text-base text-white/90">
                Build your order online in seconds, check out our combo deals, or visit our family dining hall in F-7 Markaz, Islamabad.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                to="/order"
                className="px-6 py-3.5 text-sm font-bold text-[#7A1C1C] bg-white hover:bg-[#FAF6F0] rounded-xl shadow-sm transition-colors whitespace-nowrap"
              >
                Order Now
              </Link>
              <Link
                to="/contact"
                className="px-5 py-3.5 text-sm font-bold text-white bg-[#7A1C1C] hover:bg-[#5E1414] rounded-xl shadow-sm transition-colors whitespace-nowrap"
              >
                Visit &amp; Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
