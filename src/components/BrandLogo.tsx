import React from 'react';

interface BrandLogoProps {
  variant?: 'dark' | 'light' | 'monochrome';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  monogramOnly?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'dark',
  size = 'md',
  showSubtitle = true,
  monogramOnly = false,
  className = '',
}) => {
  // Sizing definitions
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-14 h-14',
  };

  const textSizes = {
    sm: 'text-lg tracking-[0.2em]',
    md: 'text-xl tracking-[0.22em]',
    lg: 'text-2xl tracking-[0.25em]',
    xl: 'text-4xl tracking-[0.28em]',
  };

  const isLight = variant === 'light';
  const isMono = variant === 'monochrome';

  // Primary V geometric faceted emblem
  // Constructed with razor-sharp geometric facets representing precision cutting & strength
  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* V Emblem / Monogram */}
      <div className={`relative shrink-0 ${iconSizes[size]} flex items-center justify-center`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm transition-transform duration-300 hover:scale-105"
        >
          {/* Outer faceted geometric shield / V foundation */}
          <polygon
            points="50,92 12,28 32,28 50,66 68,28 88,28"
            fill={isMono ? (isLight ? '#111111' : '#FFFFFF') : '#123D2A'}
          />
          {/* Precision inner wing facet (Silver highlight) */}
          <polygon
            points="50,92 68,28 88,28 50,75"
            fill={isMono ? (isLight ? '#333333' : '#D1D5DB') : '#B8BEC3'}
            opacity="0.85"
          />
          {/* Upper chevron speed blade */}
          <polygon
            points="50,48 30,12 44,12 50,26 56,12 70,12"
            fill={isMono ? (isLight ? '#111111' : '#FFFFFF') : (isLight ? '#111111' : '#FFFFFF')}
          />
          {/* Subtle center apex diamond */}
          <polygon
            points="50,28 55,37 50,46 45,37"
            fill={isMono ? (isLight ? '#FFFFFF' : '#111111') : '#123D2A'}
          />
        </svg>
      </div>

      {/* Brand Wordmark & Subtitle */}
      {!monogramOnly && (
        <div className="flex flex-col">
          <span
            className={`font-heading font-extrabold leading-none ${textSizes[size]} ${
              isLight ? 'text-[#111111]' : 'text-white'
            }`}
          >
            VORQEN
          </span>
          {showSubtitle && (
            <span
              className={`text-[9px] uppercase font-semibold tracking-[0.25em] mt-1 ${
                isLight ? 'text-[#123D2A]' : 'text-[#B8BEC3]'
              }`}
            >
              SPORTS &bull; LEATHER &bull; SIALKOT
            </span>
          )}
        </div>
      )}
    </div>
  );
};
