import React from 'react';
import { Station, View } from '../../types';
import { Hero } from './Hero';
import { CorporateOverview } from './CorporateOverview';
import { NewsSnippet } from './NewsSnippet';

interface HomeViewProps {
  setView: (v: View) => void;
  playStation: (id: string) => void;
  liveStations: Record<string, Station>;
}

export const HomeView = ({ setView, playStation, liveStations }: HomeViewProps) => {
  return (
    <div className="relative">
      {/* Hero Section (Fixed) */}
      <Hero 
        station={liveStations['skyz']} 
        onPlay={() => playStation('skyz')} 
        setView={setView}
      />

      {/* Spacer for Fixed Hero */}
      <div className="h-[100svh] pointer-events-none" />

      {/* Scrollable Content Layer */}
      <div id="corporate-section" className="relative z-10 bg-white dark:bg-black transition-colors duration-500 mt-0 pt-12 lg:pt-20 pb-24 shadow-[0_-50px_100px_rgba(0,0,0,0.1)]">
        <CorporateOverview liveStations={liveStations} setView={setView} />
        <NewsSnippet setView={setView} />
      </div>
    </div>
  );
};
