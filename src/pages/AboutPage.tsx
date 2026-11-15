import { Link } from 'react-router-dom';
import { ArrowRight, Flame, HeartHandshake, Leaf, UtensilsCrossed, Clock } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { FOOD_IMAGES } from '../data/foodImages';
import { FoodImage } from '../components/FoodImage';

const QUALITY_PILLARS = [
  {
    icon: Flame,
    title: 'Hand-Ground Spices',
    description:
      'Every karahi masala, seekh kebab mix, and biryani blend is roasted and ground in-house each morning for unmistakable aroma.',
  },
  {
    icon: Leaf,
    title: 'Fresh Daily Produce & Zabiha Halal Meat',
    description:
      'We source fresh halal poultry, mutton, and market vegetables every morning — never frozen curries or pre-cooked bases.',
  },
  {
    icon: HeartHandshake,
    title: 'Warm Family Hospitality',
    description:
      'Attentive table service, generous sharing portions, and comfortable family seating welcoming guests from lunch till late dinner.',
  },
];

const ATMOSPHERE_FEATURES = [
  {
    title: 'Family Dining Hall',
    detail:
      'Well-lit, spacious seating designed for multi-generational family dinners, weekend get-togethers, and office lunches.',
  },
  {
    title: 'Open Tandoor & Live Charcoal Grill',
    detail:
      'Fresh sesame Roghni naan comes piping hot from our clay tandoor while seekh kebabs and tikka char over live coals.',
  },
  {
    title: 'Friendly Squad & Student Zone',
    detail:
      'Casual booth tables for campus friends sharing Zinger combos, paratha rolls, chow mein, and chilled mango lassis.',
  },
];

export function AboutPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-[#FAF6F0] border-b border-[#E5DDD0] py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-[#D9531E]">
            About {RESTAURANT_INFO.brandName}
          </p>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-[#1E1B18] mt-1 tracking-tight text-balance">
            {RESTAURANT_INFO.aboutHeading}
          </h1>
          <p className="mt-3 text-base sm:text-lg text-[#5C534A] max-w-2xl">
            Honest Pakistani flavours, welcoming service, and freshly cooked food shared around warm tables in {RESTAURANT_INFO.city}.
          </p>
        </div>
      </section>

      {/* Restaurant Introduction & Our Story */}
      <section className="py-12 sm:py-16 bg-white border-b border-[#E5DDD0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            <div className="lg:col-span-6">
              <div className="h-72 sm:h-96 lg:h-full min-h-[360px] rounded-2xl overflow-hidden border border-[#E5DDD0] shadow-sm bg-[#EFE7DB]">
                <FoodImage
                  src={FOOD_IMAGES.diningHall.url}
                  alt={FOOD_IMAGES.diningHall.alt}
                  loading="eager"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col justify-center">
              <p className="text-sm font-semibold text-[#7A1C1C]">Our Story</p>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#1E1B18] mt-1 tracking-tight">
                A Neighbourhood Kitchen Built Around the Pakistani Dastarkhwan
              </h2>

              <p className="mt-4 text-base text-[#3D352E] leading-relaxed">
                Born from a love for lively Pakistani dining tables, Dastarkhwan brings together the comforting warmth of home-style cooking and the unmistakable energy of an open charcoal grill and sizzling karahi wok.
              </p>

              <p className="mt-3 text-base text-[#5C534A] leading-relaxed">
                In Pakistani culture, the &ldquo;dastarkhwan&rdquo; is more than a table — it is where families pause busy schedules, friends celebrate milestones, and guests are always welcomed with warmth and generous plates.
              </p>

              <p className="mt-3 text-base text-[#5C534A] leading-relaxed">
                Whether you are stopping by for a quick chicken tikka paratha roll between classes, picking up steaming biryani for the office, or gathering relatives around a Sunday BBQ platter, our kitchen delivers honest portions, fresh ingredients, and reliable taste every single day.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3.5">
                <Link
                  to="/menu"
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#D9531E] hover:bg-[#BF4414] rounded-xl transition-colors"
                >
                  <span>Explore Our Menu</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link
                  to="/deals"
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#7A1C1C] bg-[#FAF6F0] hover:bg-[#EFE7DB] border border-[#DFD3C3] rounded-xl transition-colors"
                >
                  <span>View Family Deals</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Food Quality & Hospitality */}
      <section className="py-12 sm:py-16 bg-[#FAF6F0] border-b border-[#E5DDD0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-sm font-semibold text-[#D9531E]">
              Food Quality &amp; Hospitality
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#1E1B18] mt-1 tracking-tight">
              What Goes Into Every Dish We Serve
            </h2>
            <p className="mt-2 text-[#5C534A]">
              Great taste starts long before the wok hits the flame. Here is how our chefs keep every meal consistent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {QUALITY_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <article
                  key={pillar.title}
                  className="bg-white rounded-2xl border border-[#E5DDD0] p-6"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#D9531E]/10 text-[#D9531E] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-[#1E1B18]">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#5C534A] leading-relaxed">
                    {pillar.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Restaurant Atmosphere */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <p className="text-sm font-semibold text-[#D9531E]">
                Restaurant Atmosphere
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#1E1B18] mt-1 tracking-tight text-balance">
                Comfortable, Lively &amp; Welcoming for Every Occasion
              </h2>
              <p className="mt-3 text-base text-[#5C534A] leading-relaxed">
                Designed to feel inviting rather than stiff, our dining space blends clean modern comfort with the lively hum of a beloved Pakistani restaurant.
              </p>

              <div className="mt-6 space-y-4">
                {ATMOSPHERE_FEATURES.map((item) => (
                  <div
                    key={item.title}
                    className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E5DDD0]"
                  >
                    <h3 className="font-display text-base font-bold text-[#7A1C1C]">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-[#5C534A] leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-7 p-4 rounded-xl bg-[#FAF6F0] border border-[#E5DDD0] flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#D9531E] shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-xs font-semibold text-[#7A1C1C]">
                      Open Every Day
                    </p>
                    <p className="text-sm font-medium text-[#1E1B18]">
                      12:00 PM – 12:30 AM · {RESTAURANT_INFO.address}
                    </p>
                  </div>
                </div>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#7A1C1C] hover:text-[#D9531E] underline underline-offset-4"
                >
                  <UtensilsCrossed className="w-4 h-4" aria-hidden="true" />
                  <span>Directions &amp; Contact</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 aspect-[16/10] rounded-2xl overflow-hidden border border-[#E5DDD0] bg-[#EFE7DB]">
                <FoodImage
                  src={FOOD_IMAGES.diningTables.url}
                  alt={FOOD_IMAGES.diningTables.alt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#E5DDD0] bg-[#EFE7DB]">
                <FoodImage
                  src={FOOD_IMAGES.bbqCharcoalGrill.url}
                  alt={FOOD_IMAGES.bbqCharcoalGrill.alt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#E5DDD0] bg-[#EFE7DB]">
                <FoodImage
                  src={FOOD_IMAGES.chickenKarahiWok.url}
                  alt={FOOD_IMAGES.chickenKarahiWok.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
