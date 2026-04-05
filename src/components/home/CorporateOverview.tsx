import React from 'react';
import { motion } from 'motion/react';
import { Headphones, ChevronRight } from 'lucide-react';
import { Station, View } from '../../types';

interface CorporateOverviewProps {
  liveStations: Record<string, Station>;
  setView: (v: View) => void;
}

export const CorporateOverview = ({ liveStations, setView }: CorporateOverviewProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-32"
    >
      <div>
        <h2 className="text-4xl md:text-5xl font-black text-slate-800 dark:text-slate-100 mb-8 leading-tight tracking-tight mt-0">
          Connecting Communities, Empowering Voices.
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-10 text-lg leading-relaxed">
          Fairtalk Communications is more than a media company; we are the pulse of the regions we serve. Founded on the vision of cultural icons, we bridge the gap between tradition and urban lifestyle.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800 transition-colors"
          >
            <div className="text-3xl font-black text-[#F58220] mb-2">2016</div>
            <div className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase">Founded</div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800 transition-colors"
          >
            <div className="text-3xl font-black text-[#20388F] dark:text-[#F58220] mb-2">4M+</div>
            <div className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase">Audience Reach</div>
          </motion.div>
        </div>
        <button onClick={() => setView('about')} className="mt-12 flex items-center gap-2 font-bold text-[#20388F] dark:text-[#F58220] hover:text-[#F58220] dark:hover:text-[#20388F] transition-colors">
          Our Story <ChevronRight size={20} />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-6">
          <motion.div
            whileHover={{ y: -10 }}
            className="bg-blue-50 dark:bg-slate-900 h-64 rounded-lg overflow-hidden relative group"
          >
            <img src={liveStations.skyz.gallery[0]?.src ?? liveStations.skyz.image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#20388F]/80 to-transparent flex items-end p-6">
              <span className="text-white font-bold text-slate-100">Skyz Metro FM</span>
            </div>
          </motion.div>
          <div className="bg-slate-50 dark:bg-slate-900 h-48 rounded-lg flex items-center justify-center p-8 text-center italic text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-800 transition-colors">
            "Regional voices sound stronger when the studio looks and feels like the community it serves."
          </div>
        </div>
        <div className="space-y-6 pt-12">
          <motion.div
            whileHover={{ y: -10 }}
            className="bg-[#20388F] dark:bg-slate-900 h-48 rounded-lg flex flex-col justify-end p-6 text-white transition-colors"
          >
            <Headphones size={32} className="mb-4 text-[#F58220]" />
            <div className="font-bold text-slate-100">Digital Presence</div>
            <div className="text-xs text-white/60 dark:text-slate-400">Online Streaming</div>
          </motion.div>
          <motion.div
            whileHover={{ y: -10 }}
            className="bg-blue-50 dark:bg-slate-900 h-64 rounded-lg overflow-hidden relative group transition-colors"
          >
            <img src={liveStations.breeze.gallery[0]?.src ?? liveStations.breeze.image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#F58220]/80 to-transparent flex items-end p-6">
              <span className="text-white font-bold text-slate-100">Breeze FM</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
