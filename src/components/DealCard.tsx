import { Check, ShoppingBag } from 'lucide-react';
import { DealItem, DealPhoto, formatPkr } from '../data/restaurantData';
import { FoodImage } from './FoodImage';

interface DealPhotoCollageProps {
  images: DealPhoto[];
  className?: string;
}

function DealPhotoCollage({ images, className = '' }: DealPhotoCollageProps) {
  if (images.length === 1) {
    const img = images[0];
    return (
      <div className={`relative w-full h-full overflow-hidden bg-[#EFE7DB] ${className}`}>
        <FoodImage src={img.url} alt={img.alt} className="w-full h-full object-cover" />
      </div>
    );
  }

  if (images.length === 2) {
    return (
      <div className={`grid grid-cols-2 gap-1 w-full h-full bg-[#E5DDD0] ${className}`}>
        {images.map((img) => (
          <div key={img.url} className="relative overflow-hidden bg-[#EFE7DB]">
            <FoodImage src={img.url} alt={img.alt} className="w-full h-full object-cover" />
            {img.caption && (
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-2.5 py-2 text-[11px] font-semibold text-white">
                {img.caption}
              </span>
            )}
          </div>
        ))}
      </div>
    );
  }

  if (images.length === 3) {
    return (
      <div className={`grid grid-cols-2 grid-rows-2 gap-1 w-full h-full bg-[#E5DDD0] ${className}`}>
        <div className="relative row-span-2 overflow-hidden bg-[#EFE7DB]">
          <FoodImage
            src={images[0].url}
            alt={images[0].alt}
            className="w-full h-full object-cover"
          />
          {images[0].caption && (
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-2.5 py-2 text-[11px] font-semibold text-white">
              {images[0].caption}
            </span>
          )}
        </div>
        {images.slice(1, 3).map((img) => (
          <div key={img.url} className="relative overflow-hidden bg-[#EFE7DB]">
            <FoodImage src={img.url} alt={img.alt} className="w-full h-full object-cover" />
            {img.caption && (
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-2 py-1.5 text-[11px] font-semibold text-white">
                {img.caption}
              </span>
            )}
          </div>
        ))}
      </div>
    );
  }

  // 4 photos: crisp 2x2 grid showing every item in the combo
  return (
    <div className={`grid grid-cols-2 grid-rows-2 gap-1 w-full h-full bg-[#E5DDD0] ${className}`}>
      {images.slice(0, 4).map((img) => (
        <div key={img.url} className="relative overflow-hidden bg-[#EFE7DB]">
          <FoodImage src={img.url} alt={img.alt} className="w-full h-full object-cover" />
          {img.caption && (
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-2 py-1.5 text-[11px] font-semibold text-white">
              {img.caption}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

interface DealCardProps {
  deal: DealItem;
  featured?: boolean;
  isAdded: boolean;
  onOrderDeal: (deal: DealItem) => void;
}

export function DealCard({
  deal,
  featured = false,
  isAdded,
  onOrderDeal,
}: DealCardProps) {
  const isOrange = deal.accentTheme === 'orange';
  const savings = deal.originalPricePkr - deal.dealPricePkr;

  if (featured) {
    return (
      <article className="rounded-2xl overflow-hidden bg-gradient-to-r from-[#7A1C1C] to-[#9B261E] text-white shadow-md">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-5 h-72 sm:h-80 lg:h-auto min-h-[290px]">
            <DealPhotoCollage images={deal.images} />
          </div>

          <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#FFD5B8]">
                <span>{deal.badgeText}</span>
                <span aria-hidden="true">·</span>
                <span>{deal.servesText}</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-extrabold mt-2">
                {deal.title}
              </h3>

              <p className="mt-2 text-white/85 text-sm sm:text-base max-w-xl">
                {deal.subtitle}
              </p>

              <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm text-white/95">
                {deal.itemsIncluded.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check
                      className="w-4 h-4 text-[#FFB07A] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-7 pt-5 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-2xl sm:text-3xl font-extrabold tabular-nums">
                  {formatPkr(deal.dealPricePkr)}
                </span>
                <span className="text-sm text-white/65 line-through tabular-nums">
                  {formatPkr(deal.originalPricePkr)}
                </span>
              </div>

              <button
                type="button"
                onClick={() => onOrderDeal(deal)}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold text-[#7A1C1C] bg-white hover:bg-[#FAF6F0] rounded-xl shadow-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" aria-hidden="true" />
                    <span>Added to Cart</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" aria-hidden="true" />
                    <span>Add Deal to Cart</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="flex flex-col bg-[#FAF6F0] rounded-2xl overflow-hidden border border-[#E5DDD0] hover:shadow-md transition-shadow">
      <div
        className={`px-5 py-2.5 flex items-center justify-between gap-3 text-xs font-bold text-white ${
          isOrange ? 'bg-[#D9531E]' : 'bg-[#7A1C1C]'
        }`}
      >
        <span>{deal.badgeText}</span>
        <span className="tabular-nums">Save {formatPkr(savings)}</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 flex-1">
        <div className="sm:col-span-5 h-56 sm:h-auto min-h-[220px]">
          <DealPhotoCollage images={deal.images} />
        </div>

        <div className="sm:col-span-7 p-5 flex flex-col justify-between">
          <div>
            <div className="text-xs font-medium text-[#5C534A]">
              {deal.servesText}
            </div>
            <h3 className="font-display text-xl font-bold text-[#1E1B18] mt-0.5">
              {deal.title}
            </h3>
            <p className="text-xs text-[#5C534A] mt-1 leading-relaxed">
              {deal.subtitle}
            </p>

            <ul className="mt-3 space-y-1.5 text-xs text-[#3D352E]">
              {deal.itemsIncluded.map((item) => (
                <li key={item} className="flex items-start gap-1.5">
                  <Check
                    className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                      isOrange ? 'text-[#D9531E]' : 'text-[#7A1C1C]'
                    }`}
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5 pt-3.5 border-t border-[#E5DDD0] flex items-center justify-between gap-3">
            <div>
              <span className="font-display text-lg font-extrabold text-[#7A1C1C] tabular-nums block">
                {formatPkr(deal.dealPricePkr)}
              </span>
              <span className="text-xs text-[#7D7166] line-through tabular-nums">
                {formatPkr(deal.originalPricePkr)}
              </span>
            </div>

            <button
              type="button"
              onClick={() => onOrderDeal(deal)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9531E] ${
                isAdded
                  ? 'bg-[#1E1B18]'
                  : isOrange
                    ? 'bg-[#D9531E] hover:bg-[#BF4414]'
                    : 'bg-[#7A1C1C] hover:bg-[#5E1414]'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Added</span>
                </>
              ) : (
                <span>Add Deal to Cart</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
