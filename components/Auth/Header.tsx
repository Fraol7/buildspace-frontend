"use client";
import React from 'react';
import Logo from '../Common/Logo';
import Link from 'next/link';

const Header = () => {
  return (
    <header className='sticky top-0 z-50 w-full bg-transparent backdrop-blur-sm shadow-xs'>
      {/* Main Header Content */}
      <div className='flex flex-row justify-between items-center h-16 px-4 md:px-8 py-4'>
        <div className='flex items-center gap-4'>
          <Link href="/landing-page" className='focus:outline-none'>
            {/* Responsive Logo */}
            <div className='hidden md:block'>
              <Logo size="lg"/>
            </div>
            <div className='md:hidden'>
              <Logo size="sm"/>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;