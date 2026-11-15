import { useState, useEffect, useCallback, useMemo } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { GALLERY_IMAGES, GalleryPhoto } from '../data/restaurantData';
import { FoodImage } from '../components/FoodImage';

type GalleryFilter = 'All' | GalleryPhoto['category'];

const GALLERY_FILTERS: GalleryFilter[] = [
  'All',
  'Dishes',
  'Karahi Cooking',
  'BBQ Preparation',
  'Family Platters',
  'Dining Area',
];

export function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<GalleryFilter>('All');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const visiblePhotos = useMemo(() => {
    if (selectedCategory === 'All') return GALLERY_IMAGES;
    return GALLERY_IMAGES.filter((photo) => photo.category === selectedCategory);
  }, [selectedCategory]);

  const closeModal = useCallback(() => setSelectedIndex(null), []);

  const showPrev = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === null
        ? null
        : (prev - 1 + visiblePhotos.length) % visiblePhotos.length
    );
  }, [visiblePhotos.length]);

  const showNext = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === null ? null : (prev + 1) % visiblePhotos.length
    );
  }, [visiblePhotos.length]);

  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, closeModal, showPrev, showNext]);

  const activePhoto =
    selectedIndex !== null ? visiblePhotos[selectedIndex] ?? null : null;

  return (
    <>
      {/* Page Header */}
      <section className="bg-[#FAF6F0] border-b border-[#E5DDD0] py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-[#D9531E]">
            Inside Our Kitchen &amp; Dining Hall
          </p>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-[#1E1B18] mt-1 tracking-tight text-balance">
            Food &amp; Restaurant Gallery
          </h1>
          <p className="text-[#5C534A] mt-2 max-w-2xl">
            Real photography from our kitchen and dining room — click any photo to enlarge and browse full-screen.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-10 sm:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter Tabs */}
          <div
            role="tablist"
            aria-label="Gallery Categories"
            className="flex flex-wrap gap-2 pb-6 border-b border-[#E5DDD0]"
          >
            {GALLERY_FILTERS.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setSelectedIndex(null);
                  }}
                  className={`px-4 py-2 text-sm font-semibold rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#7A1C1C] text-white'
                      : 'bg-[#FAF6F0] text-[#3D352E] border border-[#E5DDD0] hover:border-[#D9531E] hover:text-[#D9531E]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {visiblePhotos.map((photo, index) => (
              <button
                key={photo.id}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#EFE7DB] border border-[#E5DDD0] text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9531E]"
              >
                <FoodImage
                  src={photo.imageUrl}
                  alt={photo.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-85 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" aria-hidden="true" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <span className="text-[11px] font-medium text-[#FFB07A] block">
                    {photo.category}
                  </span>
                  <span className="font-display text-base font-bold text-white block mt-0.5">
                    {photo.title}
                  </span>
                  <span className="text-xs text-white/80 block mt-0.5 line-clamp-1">
                    {photo.caption}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.title}
          onClick={closeModal}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-[#1E1B18] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
          >
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close enlarged photo"
              className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>

            <div className="relative aspect-[16/10] w-full bg-black">
              <FoodImage
                src={activePhoto.imageUrl}
                alt={activePhoto.imageAlt}
                className="w-full h-full object-contain"
              />

              {visiblePhotos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={showPrev}
                    aria-label="Previous photo"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    onClick={showNext}
                    aria-label="Next photo"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <ChevronRight className="w-5 h-5" aria-hidden="true" />
                  </button>
                </>
              )}
            </div>

            <div className="p-5 sm:p-6 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <p className="text-xs font-medium text-[#FFB07A]">
                  {activePhoto.category}
                </p>
                <h2 className="font-display text-lg font-bold mt-0.5">
                  {activePhoto.title}
                </h2>
                <p className="text-sm text-white/75 mt-1">{activePhoto.caption}</p>
              </div>
              <span className="text-xs text-white/60 tabular-nums shrink-0">
                {(selectedIndex ?? 0) + 1} / {visiblePhotos.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
