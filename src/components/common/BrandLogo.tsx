import React from 'react';

export const BrandLogo = ({ className = '', compact = false }: { className?: string; compact?: boolean }) => (
  <div className={`inline-flex items-center ${className}`}>
    <img
      src="/logo.png"
      alt="FairTalk Communications"
      className={`${compact ? 'h-12 sm:h-16' : 'h-20 sm:h-24 md:h-28'} w-auto object-contain transition-all`}
    />
  </div>
);
