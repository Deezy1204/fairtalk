import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, X, Mic2, Clock, MonitorPlay } from 'lucide-react';
import { Station } from '../../types';
import { calculateDuration } from '../../lib/utils';

interface RadioPlayerProps {
  isPlaying: boolean;
  setIsPlaying: (p: boolean) => void;
  activeStationId: string;
  setActiveStationId: (id: string) => void;
  isPlayerVisible: boolean;
  setIsPlayerVisible: (v: boolean) => void;
  playStation: (id: string) => void;
  liveStations: Record<string, Station>;
}

export const RadioPlayer = ({
  isPlaying,
  setIsPlaying,
  activeStationId,
  isPlayerVisible,
  setIsPlayerVisible,
  playStation,
  liveStations
}: RadioPlayerProps) => {
  if (!isPlayerVisible) return null;

  const station = liveStations[activeStationId] || liveStations.skyz;
  const currentShow = (station as any).currentShow;
  const nextShow = (station as any).nextShow;

  const placeholder = { name: "No Show Scheduled", time: "--", hosts: ["AutoDJ"] };
  const displayCurrent = currentShow || placeholder;
  const displayNext = nextShow || placeholder;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] max-w-5xl bg-white dark:bg-black rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.3)] border border-black/10 dark:border-white/10 z-[150] overflow-hidden"
      >
        <div className="flex flex-row items-center justify-between p-4 md:p-6 gap-3 md:gap-6 border-b border-black/10 dark:border-white/10">
          <div className="flex items-center gap-3 sm:gap-4 md:gap-6 min-w-0 flex-1">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-28 lg:h-28 rounded-xl overflow-hidden flex-shrink-0 shadow-lg border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
              <img src={activeStationId === 'skyz' ? '/skyzlogo.png' : '/breezelogo.png'} className={`w-full h-full object-contain p-2 transition-transform duration-700 ${isPlaying ? 'scale-110' : 'scale-100'}`} />
              {isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <div className="flex gap-1 sm:gap-1.5 items-end h-6 sm:h-10">
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 sm:w-2 bg-white rounded-full"
                        animate={{ height: ['20%', '100%', '40%', '80%', '20%'] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col min-w-0 justify-center text-black dark:text-white">
              <div className="inline-flex items-center gap-1.5 mb-1 sm:mb-2">
                <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]' : 'bg-slate-400'}`}></span>
                <span className="text-[9px] sm:text-[10px] md:text-xs font-black uppercase tracking-[0.2em] opacity-60 transition-opacity">{isPlaying ? 'Live on Air' : 'Radio Ready'}</span>
              </div>
              <h3 className="font-black text-base sm:text-xl md:text-2xl truncate leading-tight tracking-tight">{station.name}</h3>
              <p className="opacity-50 text-[10px] sm:text-xs md:text-sm truncate font-bold uppercase tracking-wider mt-0.5">{station.freq} • {station.location}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 md:gap-6 flex-shrink-0">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl md:shadow-2xl group flex-shrink-0"
            >
              {isPlaying ? <Pause size={18} fill="currentColor" className="sm:w-6 sm:h-6 md:w-9 md:h-9" /> : <Play size={18} fill="currentColor" className="ml-1 sm:w-6 sm:h-6 md:w-9 md:h-9" />}
            </button>
            <button
              onClick={() => setIsPlayerVisible(false)}
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all border border-transparent hover:border-black/10 dark:hover:border-white/10 flex-shrink-0"
            >
              <X size={20} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>

        <div className="flex overflow-x-auto gap-2 px-4 md:px-6 py-3 border-b border-black/10 dark:border-white/10 scrollbar-hide">
          {Object.values(liveStations).map((s) => (
            <button
              key={s.id}
              onClick={() => playStation(s.id)}
              className={`flex-shrink-0 text-[10px] sm:text-xs px-5 py-2 rounded-full font-black tracking-widest uppercase transition-all hover:scale-105 active:scale-95 ${activeStationId === s.id ? 'bg-black dark:bg-white text-white dark:text-black shadow-lg' : 'bg-black/5 dark:bg-white/5 text-black/60 dark:text-white/60 hover:bg-black/10 dark:hover:bg-white/10'}`}
            >
              {s.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 p-4 md:p-6 bg-black/[0.03] dark:bg-white/[0.03] rounded-b-2xl max-h-[45vh] lg:max-h-[55vh] overflow-y-auto">
          {/* Current Show */}
          <div className="flex items-center gap-3 md:gap-4 bg-white dark:bg-black p-3 md:p-4 rounded-xl border border-black/10 dark:border-white/10 shadow-sm relative overflow-hidden group">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#F58220]"></div>
            <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-black dark:text-white flex-shrink-0">
              <Mic2 size={20} className="md:w-6 md:h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 md:gap-2 mb-1">
                <span className="bg-[#F58220]/10 text-[#F58220] text-[9px] md:text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded text-nowrap flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-[#F58220] rounded-full animate-pulse" />
                  Now Playing
                </span>
                <span className="text-black/50 dark:text-white/50 text-[10px] md:text-xs font-bold">{displayCurrent.time}</span>
              </div>
              <h4 className="font-bold text-black dark:text-white text-sm md:text-base truncate">{displayCurrent.name}</h4>
              <p className="text-black/50 dark:text-white/50 text-xs md:text-sm truncate mt-0.5 uppercase tracking-wide font-medium">with {displayCurrent.hosts?.join(', ')}</p>
              {displayCurrent.startTime && displayCurrent.endTime && (
                <div className="mt-2 flex items-center gap-1.5 text-[9px] font-black text-[#F58220] uppercase tracking-widest bg-[#F58220]/5 w-fit px-2 py-1 rounded border border-[#F58220]/10">
                  <MonitorPlay size={10} /> Runtime: {calculateDuration(displayCurrent.startTime, displayCurrent.startPeriod || 'AM', displayCurrent.endTime, displayCurrent.endPeriod || 'AM')}
                </div>
              )}
            </div>
          </div>

          {/* Next Show */}
          <div className="flex items-center gap-3 md:gap-4 bg-white dark:bg-black p-3 md:p-4 rounded-xl border border-black/10 dark:border-white/10 shadow-sm opacity-80 hover:opacity-100 transition-opacity group">
            <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-black/40 dark:text-white/40 flex-shrink-0">
              <Clock size={20} className="md:w-6 md:h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 md:gap-2 mb-1">
                <span className="bg-black/5 dark:bg-white/5 text-black/70 dark:text-white/70 text-[9px] md:text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded text-nowrap">Up Next</span>
                <span className="text-black/50 dark:text-white/50 text-[10px] md:text-xs font-bold">
                  {displayNext.startTime}{displayNext.startPeriod}
                </span>
              </div>
              <h4 className="font-bold text-black dark:text-white text-sm md:text-base truncate">{displayNext.name}</h4>
              <p className="text-black/50 dark:text-white/50 text-xs md:text-sm truncate mt-0.5 font-medium">with {displayNext.hosts?.join(', ')}</p>
              {displayNext.startTime && displayNext.endTime && (
                <div className="mt-2 flex items-center gap-1.5 text-[9px] font-black text-black/40 dark:text-white/40 uppercase tracking-widest bg-black/5 dark:bg-white/5 w-fit px-2 py-1 rounded">
                  Run Time: {calculateDuration(displayNext.startTime, displayNext.startPeriod || 'AM', displayNext.endTime, displayNext.endPeriod || 'AM')}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
