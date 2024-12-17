import React from 'react';
import { Logo } from './Logo';
import { LanguageSelector } from './LanguageSelector';
import { SocialLinks } from './SocialLinks';

export function Navbar() {
  return (
    <nav className="bg-background text-white border-b border-gray-800">
      <div className="max-w-[2000px] mx-auto px-4 h-16 flex items-center justify-between">
        <Logo />
        <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6">
          <LanguageSelector />
          <SocialLinks />
        </div>
      </div>
    </nav>
  );
}