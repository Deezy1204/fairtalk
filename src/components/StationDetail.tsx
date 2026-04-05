import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Users, MapPin, Radio, X, Sparkles, MonitorPlay } from 'lucide-react';
import { Station, GalleryImage } from '../types';
import { calculateDuration } from '../lib/utils';

interface StationDetailProps {
  station: Station;
  playStation: (id: string) => void;
  onImageSelect: (image: GalleryImage) => void;
}

const StationDetailView = ({ station, playStation, onImageSelect }: StationDetailProps) => {
  const [activeTab, setActiveTab] = useState<'schedule' | 'gallery'>('schedule');
  const nextShowId = (station as any).nextShow?.id;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-12 py-12 md:py-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="relative mb-20 md:mb-32">
        <div className="relative h-[40vh] md:h-[60vh] rounded-[2rem] md:rounded-[4rem] overflow-hidden shadow-2xl">
          <img
            src={station.image}
            alt={station.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="px-4 py-1.5 rounded-full bg-[#F58220] text-black text-[10px] font-bold uppercase tracking-widest">{station.freq}</span>
                <span className="text-white/60 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                  <MapPin size={14} /> {station.location}
                </span>
              </div>
              <h1 className="text-5xl md:text-8xl font-black text-white mb-6 uppercase tracking-tight">{station.name}</h1>
              <p className="text-white/70 text-lg md:text-xl max-w-2xl font-medium leading-relaxed italic">
                "{station.tagline}"
              </p>
            </motion.div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => playStation(station.id)}
          className="absolute bottom-0 right-8 md:right-16 translate-y-1/2 w-24 h-24 md:w-32 md:h-32 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center shadow-2xl z-20 group border-4 border-white dark:border-black"
        >
          <Radio size={40} className="group-hover:animate-pulse" />
        </motion.button>
      </div>

      <div className="mb-16">
        <div className="flex gap-12 border-b border-black/5 dark:border-white/10 mb-16">
          <button
            onClick={() => setActiveTab('schedule')}
            className={`pb-5 text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] transition-all relative ${activeTab === 'schedule' ? 'text-black dark:text-white' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
          >
            Program Schedule
            {activeTab === 'schedule' && (
              <motion.div layoutId="activeDetailTab" className="absolute bottom-0 left-0 right-0 h-1 bg-black dark:bg-white" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`pb-5 text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] transition-all relative ${activeTab === 'gallery' ? 'text-black dark:text-white' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
          >
            Gallery
            {activeTab === 'gallery' && (
              <motion.div layoutId="activeDetailTab" className="absolute bottom-0 left-0 right-0 h-1 bg-black dark:bg-white" />
            )}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'schedule' ? (
            <motion.div
              key="schedule"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="space-y-24"
            >
              <section>
                <div className="flex items-end justify-between mb-12">
                  <h3 className="text-3xl font-black text-black dark:text-white flex items-center gap-3">
                    <Clock size={32} className="text-[#F58220]" /> Show Times
                  </h3>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Sorted by broadcast sequence
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {station.shows.length > 0 ? (
                    station.shows.map((show, i) => (
                      <motion.div
                        key={show.id || i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className={`bg-slate-50 dark:bg-neutral-900 border ${show.isLive ? 'border-[#F58220] ring-1 ring-[#F58220]/20' : 'border-slate-100 dark:border-neutral-800'} p-8 rounded-[2rem] group hover:border-[#F58220]/30 transition-all duration-500 relative overflow-hidden`}
                      >
                        {show.isLive && (
                          <div className="absolute top-0 right-0 px-6 py-2 bg-[#F58220] text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-bl-2xl flex items-center gap-2 z-10 shadow-lg">
                            <span className="w-2 h-2 bg-black rounded-full animate-pulse" />
                            LIVE NOW
                          </div>
                        )}
                        {!show.isLive && show.id === nextShowId && (
                          <div className="absolute top-0 right-0 px-6 py-2 bg-black dark:bg-white text-white dark:text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-bl-2xl z-10">
                            COMING UP NEXT
                          </div>
                        )}

                        <div className="flex flex-col gap-6">
                          <div className="flex justify-between items-start">
                            <span className="text-[10px] font-black text-[#F58220] uppercase tracking-widest bg-[#F58220]/10 px-3 py-1 rounded-full">
                              {show.time}
                            </span>
                            {!show.isLive && (
                              <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-black/20 dark:text-white/20">
                                <Radio size={20} />
                              </div>
                            )}
                          </div>
                          <div>
                            <h4 className="text-2xl font-black text-black dark:text-white mb-3 group-hover:text-[#F58220] transition-colors">{show.name}</h4>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {show.hosts?.map((h, hi) => (
                                <span key={hi} className="text-xs font-bold text-slate-500 dark:text-neutral-400 flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#F58220]" /> {h}
                                </span>
                              ))}
                            </div>
                            {show.startTime && show.endTime && (
                              <div className="flex items-center gap-2 text-[#20388F] dark:text-[#F58220] text-[10px] font-black uppercase tracking-widest bg-blue-500/5 dark:bg-[#F58220]/5 w-fit px-3 py-1.5 rounded-lg border border-blue-500/10 dark:border-[#F58220]/10">
                                <MonitorPlay size={12} /> Running Time: {calculateDuration(show.startTime, show.startPeriod || 'AM', show.endTime, show.endPeriod || 'AM')}
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-slate-500 dark:text-neutral-500 leading-relaxed font-medium line-clamp-2 italic">
                            {show.desc || "No description provided for this session."}
                          </p>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-20 bg-slate-50 dark:bg-neutral-900/50 rounded-[3rem] border-2 border-dashed border-black/5 dark:border-white/5">
                      <p className="text-slate-400 font-bold uppercase tracking-widest">No shows scheduled yet</p>
                    </div>
                  )}
                </div>
              </section>

              <section>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                   <div>
                      <h3 className="text-3xl font-black text-black dark:text-white mb-4 flex items-center gap-3">
                        <Users size={32} className="text-[#F58220]" /> On-Air Team
                      </h3>
                      <p className="text-slate-500 dark:text-neutral-500 font-medium max-w-xl">Meet the voices that bring the station to life every day.</p>
                   </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-8">
                  {station.hosts.map((host, i) => (
                    <motion.div
                      key={host}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="group relative"
                    >
                      <div className="aspect-square rounded-3xl bg-slate-50 dark:bg-neutral-900 border border-slate-100 dark:border-neutral-800 flex flex-col items-center justify-center p-6 transition-all duration-500 group-hover:bg-black dark:group-hover:bg-white group-hover:border-transparent group-hover:-translate-y-2 group-hover:shadow-2xl">
                        <div className="w-16 h-16 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-2xl font-black text-black dark:text-white group-hover:bg-white/20 dark:group-hover:bg-black/10 group-hover:text-white dark:group-hover:text-black mb-4 transition-colors">
                          {host.charAt(0)}
                        </div>
                        <span className="font-black text-xs uppercase tracking-widest text-center text-slate-800 dark:text-neutral-200 group-hover:text-white dark:group-hover:text-black transition-colors">{host}</span>
                        <div className="mt-2 w-0 group-hover:w-8 h-1 bg-[#F58220] rounded-full transition-all duration-500" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            </motion.div>
          ) : (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
            >
              <h3 className="text-3xl font-black text-black dark:text-white mb-12 flex items-center gap-3">
                <Radio size={32} className="text-[#F58220]" /> Station Gallery
              </h3>
              {station.gallery.length > 0 ? (
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                  {station.gallery.map((image, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      className="relative rounded-[2rem] overflow-hidden cursor-zoom-in group shadow-xl border border-transparent hover:border-[#F58220]/50 transition-all duration-700"
                      onClick={() => onImageSelect(image)}
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-auto transition-transform duration-1000 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 scale-75 group-hover:scale-100 transition-transform duration-500">
                          <X size={32} className="rotate-45" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-40 bg-slate-50 dark:bg-neutral-900/50 rounded-[3rem] border-2 border-dashed border-black/5 dark:border-white/5">
                  <div className="w-24 h-24 bg-slate-100 dark:bg-white/10 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-300 dark:text-neutral-700">
                    <Radio size={48} />
                  </div>
                  <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">No media uploads yet</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StationDetailView;
