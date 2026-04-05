import React from 'react';
import { MapPin, Phone } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { View } from '../../types';

interface FooterProps {
  setView: (v: View) => void;
}

export const Footer = ({ setView }: FooterProps) => (
  <footer className="bg-white dark:bg-black text-slate-900 dark:text-white py-16 px-6 md:px-12 border-t border-slate-100 dark:border-neutral-900 transition-colors duration-500">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-1">
        <div className="mb-6">
          <BrandLogo className="w-full max-w-[320px]" />
        </div>
        <p className="text-slate-600 dark:text-neutral-500 text-sm leading-relaxed mb-6">
          Zimbabwe's leading regional media group, connecting communities through Skyz Metro FM and Breeze FM.
        </p>
      </div>
      <div>
        <h4 className="font-bold mb-6 text-slate-800 dark:text-neutral-100">Quick Links</h4>
        <ul className="space-y-4 text-sm text-slate-600 dark:text-neutral-500">
          <li><button onClick={() => setView('home')} className="hover:text-[#20388F] dark:hover:text-[#F58220] transition-colors">Home</button></li>
          <li><button onClick={() => setView('about')} className="hover:text-[#20388F] dark:hover:text-[#F58220] transition-colors">About Fairtalk</button></li>
          <li><button onClick={() => setView('news')} className="hover:text-[#20388F] dark:hover:text-[#F58220] transition-colors">Latest News</button></li>
          <li><button onClick={() => setView('contact')} className="hover:text-[#20388F] dark:hover:text-[#F58220] transition-colors">Contact & Advertising</button></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-6 text-slate-800 dark:text-neutral-100">Our Stations</h4>
        <ul className="space-y-4 text-sm text-slate-600 dark:text-neutral-500">
          <li><button onClick={() => setView('skyz')} className="hover:text-[#20388F] dark:hover:text-[#F58220] transition-colors">Skyz Metro FM (Bulawayo)</button></li>
          <li><button onClick={() => setView('breeze')} className="hover:text-[#20388F] dark:hover:text-[#F58220] transition-colors">Breeze FM (Vic Falls)</button></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-6 text-slate-800 dark:text-neutral-100">Contact Us</h4>
        <div className="space-y-4 text-sm text-slate-600 dark:text-neutral-500">
          <div className="flex gap-3">
            <MapPin size={18} className="text-[#F58220] flex-shrink-0" />
            <p>9th Floor, Pioneer House Corner 8th Avenue and Fife Street, Bulawayo, Zimbabwe</p>
          </div>
          <div className="flex gap-3">
            <Phone size={18} className="text-[#F58220] flex-shrink-0" />
            <p>+263 9 881 100</p>
          </div>
        </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto border-t border-slate-100 dark:border-neutral-900 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
      <div>&copy; {new Date().getFullYear()} Fairtalk Communications. All Rights Reserved.</div>
      <div>
        <button onClick={() => setView('admin_login')} className="hover:text-slate-800 dark:hover:text-slate-300 transition-colors uppercase tracking-widest font-black text-[10px]">Admin Area</button>
      </div>
    </div>

    {/* Huge FAIR TALK Gradient Bottom */}
    <div className="w-full overflow-hidden flex justify-center mt-12 pt-6 pointer-events-none">
      <h1 className="text-[14vw] leading-[0.8] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-slate-200/80 to-transparent dark:from-neutral-800/80 dark:to-transparent select-none whitespace-nowrap">
        FAIRTALK
      </h1>
    </div>
  </footer>
);
