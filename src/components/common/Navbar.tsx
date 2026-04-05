import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, Play } from 'lucide-react';
import { View, Station } from '../../types';
import { BrandLogo } from './BrandLogo';
import { NAV_ITEMS } from '../../constants';

interface NavbarProps {
  setView: (v: View) => void;
  currentView: View;
  playStation: (id: string) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (o: boolean) => void;
}

export const Navbar = ({
  setView,
  currentView,
  playStation,
  isMenuOpen,
  setIsMenuOpen,
}: NavbarProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[150] bg-transparent px-6 md:px-12 py-4 flex justify-between items-center transition-all duration-500">
      <div className="flex items-center">
        <button onClick={() => setView('home')} className="hover:scale-105 active:scale-95 transition-transform">
          <BrandLogo compact className="max-w-[140px] md:max-w-[170px]" />
        </button>
      </div>

      <div className="flex-grow" />

      <div className="flex items-center gap-4 md:gap-8">
        <div className="hidden lg:flex items-center gap-8 mr-8">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.view}
              onClick={() => setView(item.view)}
              className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all relative py-2 ${currentView === item.view ? 'text-black dark:text-white' : 'text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white'}`}
            >
              {item.label}
              {currentView === item.view && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F58220] rounded-full"
                />
              )}
            </button>
          ))}
        </div>

        <button
          onClick={() => setView('stations')}
          className="bg-black dark:bg-white text-white dark:text-black px-6 md:px-8 py-2.5 rounded-full flex items-center gap-2.5 text-[9px] md:text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl"
        >
          Stations <ArrowRight size={16} />
        </button>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 text-black dark:text-white bg-black/5 dark:bg-white/5 rounded-full"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
};
