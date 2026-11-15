import { useState } from 'react';
import { UtensilsCrossed } from 'lucide-react';

interface FoodImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
}

export function FoodImage({
  src,
  alt,
  className = 'w-full h-full object-cover',
  loading = 'lazy',
}: FoodImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#F2EBE1] to-[#E6DAC8] text-[#7A1C1C] p-4 text-center"
        role="img"
        aria-label={alt}
      >
        <UtensilsCrossed className="w-8 h-8 mb-2 opacity-70" aria-hidden="true" />
        <span className="text-xs font-medium text-[#5C534A] line-clamp-2 max-w-[180px]">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
