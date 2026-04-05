import React from 'react';
import { motion } from 'motion/react';
import { Play, ArrowRight, Radio } from 'lucide-react';
import { Station, View } from '../../types';

interface HeroProps {
  station: Station;
  onPlay: () => void;
  setView: (v: View) => void;
}

export const Hero = ({ station, onPlay, setView }: HeroProps) => {
  return (
    <div className="fixed inset-0 z-0 h-[100svh] w-full flex items-start bg-white dark:bg-black transition-colors duration-500 px-6 md:px-12 pt-32 lg:pt-0 overflow-hidden lg:overflow-visible">
      <div className="max-w-[1500px] mx-auto flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-5 items-start w-full">

        {/* Left Column: Image Container (4/12 of the grid) */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "circOut" }}
          className="relative lg:col-span-4 w-full -left-[50px] lg:left-0 hidden lg:block"
        >
          <div className="relative group/hero z-[110]">
            <div className="hero-image-container glow-cyan w-full max-w-[260px] aspect-[1/2] lg:h-[483px] relative mx-auto lg:ml-36 xl:ml-48 bg-slate-100 dark:bg-slate-900 overflow-hidden rounded-b-[6rem] shadow-2xl">
              <img
                src="/heroimage.jpg"
                className="w-full h-full object-cover transition-all duration-1000"
                alt="Radio Studio"
              />
            </div>

            {/* Overlapping Play Button - Half on, Half off */}
            <div className="absolute bottom-0 lg:ml-24 xl:ml-32 left-0 lg:left-0 translate-x-[calc(-50%+8px)] translate-y-[calc(50%-10px)] z-20 pointer-events-none">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-[166px] h-[166px] md:w-[228px] md:h-[228px] rounded-full border border-black/10 dark:border-white/20 flex items-center justify-center bg-black dark:bg-white shadow-2xl relative"
              >
                {/* Non-Spinning Circular Text */}
                <motion.div
                  className="absolute inset-0 z-0 p-1"
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path
                      id="textPath"
                      d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
                      fill="none"
                    />
                    <text className="text-[6.5px] font-black uppercase tracking-[0.14em] fill-white/70 dark:fill-black/70">
                      <textPath href="#textPath" startOffset="0%">
                        Stream Skyz Metro FM & Breeze FM • Stream Skyz Metro FM & Breeze FM •
                      </textPath>
                    </text>
                  </svg>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onPlay}
                  className="w-[72px] h-[72px] md:w-[104px] md:h-[104px] bg-white dark:bg-black text-black dark:text-white rounded-full flex items-center justify-center shadow-2xl pointer-events-auto cursor-pointer relative z-10"
                >
                  <Play className="fill-black dark:fill-white ml-1.5 md:ml-2 w-8 h-8 md:w-12 md:h-12" />
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Hero Content (8/12 of the grid, padded to clear navbar) */}
        <div className="lg:col-span-8 px-0 lg:px-0 pt-0 lg:pt-32 z-10 w-full relative">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-spaced text-xl md:text-2xl font-black text-black/40 dark:text-white/40 mb-1 md:mb-2 tracking-[0.95em] xl:tracking-[1.2rem] uppercase leading-none">
              FAIRTALK
            </p>
            <h1 className="text-[1.25rem] sm:text-[1.75rem] md:text-[2.5rem] lg:text-[3rem] xl:text-[3.6rem] leading-[1] font-black tracking-normal mb-6 text-black dark:text-white uppercase whitespace-nowrap pb-2">
              COMMUNICATIONS
            </h1>

            <p className="text-base md:text-lg text-black/60 dark:text-white/60 max-w-none leading-relaxed mb-8 md:mb-10 font-medium z-20 relative bg-white/50 dark:bg-black/50 lg:bg-transparent p-4 lg:p-0 rounded-xl lg:rounded-none backdrop-blur-sm lg:backdrop-blur-none">
              Is a pioneering force in Zimbabwe's broadcasting industry, owning the popular <strong>Skyz Metro FM</strong> in Bulawayo and <strong>Breeze FM</strong> in Victoria Falls. We are dedicated to bringing diverse voices and fresh perspectives to the media landscape.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-12">
              <button
                onClick={() => setView('stations')}
                className="bg-black dark:bg-white text-white dark:text-black px-5 py-2.5 rounded-full flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl group"
              >
                Stations <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
              </button>
              <button
                onClick={onPlay}
                className="lg:hidden bg-[#F58220] hover:bg-[#F58220]/90 text-white px-5 py-2.5 rounded-full flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(245,130,32,0.5)]"
              >
                <Play size={14} fill="currentColor" /> Live Radio
              </button>
            </div>

            {/* Compact Tune In Section (Restored Design) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 to-black p-6 md:p-8 shadow-2xl border border-white/5"
            >
              {/* Background Accents */}
              <div className="absolute top-0 right-0 w-[20rem] h-[20rem] bg-[#20388F]/20 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/3"></div>
              <div className="absolute bottom-0 left-0 w-[20rem] h-[20rem] bg-[#F58220]/20 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/3"></div>

              <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-4 leading-tight tracking-tight">
                    Tune In To The <br />Heartbeat.
                  </h2>
                  <div className="flex gap-4">
                    <span className="flex items-center gap-2 text-white text-[10px] font-bold bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10 shadow-sm">
                      <Radio size={14} className="text-[#F58220]" /> Your Premium Stations
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Skyz Metro FM */}
                  <div className="group relative bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-xl hover:bg-white/10 transition-colors shadow-lg overflow-hidden">
                    <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 text-white/5 pointer-events-none transition-transform duration-700 group-hover:scale-110">
                      <Radio size={60} />
                    </div>
                    <div className="relative z-10">
                      <div className="text-[#F58220] font-black uppercase tracking-widest text-[8px] mb-2">Bulawayo</div>
                      <div className="flex items-baseline gap-1 mb-1">
                        <span className="text-3xl font-black text-white tracking-tighter">100.3</span>
                        <span className="text-[10px] font-bold text-white/50 tracking-widest">FM</span>
                      </div>
                      <div className="text-white font-bold text-[10px] truncate">Skyz Metro FM</div>
                    </div>
                  </div>

                  {/* Breeze FM */}
                  <div className="group relative bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-xl hover:bg-white/10 transition-colors shadow-lg overflow-hidden">
                    <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 text-white/5 pointer-events-none transition-transform duration-700 group-hover:scale-110">
                      <Radio size={60} />
                    </div>
                    <div className="relative z-10">
                      <div className="text-[#20388F] dark:text-[#F58220] font-black uppercase tracking-widest text-[8px] mb-2">Vic Falls</div>
                      <div className="flex items-baseline gap-1 mb-1">
                        <span className="text-3xl font-black text-white tracking-tighter">91.2</span>
                        <span className="text-[10px] font-bold text-white/50 tracking-widest">FM</span>
                      </div>
                      <div className="text-white font-bold text-[10px] truncate">Breeze FM</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
