import React from 'react';
import { motion } from 'motion/react';
import { Station, View } from '../types';

interface StationsViewProps {
  setView: (v: View) => void;
  liveStations: Record<string, Station>;
}

export const StationsView = ({ setView, liveStations }: StationsViewProps) => (
  <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="text-center mb-16"
    >
      <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-5 tracking-tight transition-colors">Our Broadcasting Network</h1>
      <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed transition-colors">
        From the urban heart of Bulawayo to the thunderous falls of the Zambezi, our stations define the regional soundscape.
      </p>
    </motion.div>

    <div className="grid md:grid-cols-2 gap-12 mb-20">
      {Object.values(liveStations).map((station, idx) => (
        <motion.div
          key={station.id}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ y: -10 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: idx * 0.2 }}
          className="group relative rounded-3xl overflow-hidden shadow-2xl bg-slate-900 aspect-[4/5] md:aspect-[4/3] transition-all duration-500"
        >
          <img src={station.image} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-1000" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent p-8 flex flex-col justify-end">
            <div className="bg-[#F58220] text-white px-3 py-1 rounded-full text-xs font-bold w-fit mb-4 shadow-lg">
              {station.freq}
            </div>
            <h2 className="text-3xl font-black text-white mb-3 tracking-tighter">{station.name}</h2>
            <p className="text-white/70 text-sm mb-6 max-w-md">{station.desc}</p>
            <div className="flex gap-4">
              <button onClick={() => setView(station.id as View)} className="bg-white dark:bg-slate-800 text-[#20388F] dark:text-slate-100 px-6 py-2.5 rounded-full text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-700 transition-all shadow-xl">
                View Station
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);
