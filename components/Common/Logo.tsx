import React from 'react';
import Image from 'next/image';

interface LogoProps {
  size?: 'sm' | 'lg';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'lg', 
  className = '' 
}) => {
  // Image paths defined internally
  const imageSources = {
    sm: '/images/Buildspace-sm.png',
    lg: '/images/Buildspace-lg.png'
  };

  // Container dimensions based on size
  const containerDimensions = {
    sm: 'w-[20px] h-[40px]',
    lg: 'w-[160px] h-[48px]'
  };

  return (
    <div className={`relative ${containerDimensions[size]} ${className}`}>
      <Image
        src={imageSources[size]}
        alt="Buildspace Logo"
        fill
        sizes={size === 'sm' ? '120px' : '160px'}
        className="object-contain"
        priority
      />
    </div>
  );
};

export default Logo;