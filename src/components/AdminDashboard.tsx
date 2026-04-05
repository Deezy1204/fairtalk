import React, { useState, useRef, useMemo } from 'react';
import { cn, calculateDuration } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { ref, push, remove, update } from 'firebase/database';
import { rtdb } from '../lib/firebase';
import { supabase } from '../lib/supabase';
import {
  Radio, Users, X, ChevronRight, Upload, Trash2,
  Clock, Plus, LayoutGrid, Image as ImageIcon,
  LogOut, MonitorPlay, Sparkles, Pencil
} from 'lucide-react';
import { Show, GalleryImage, View } from '../types';

interface AdminDashboardProps {
  setView: (v: View) => void;
  dbShows: Show[];
  dbGallery: GalleryImage[];
}

const AdminDashboardView = ({ setView, dbShows, dbGallery }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState<'shows' | 'gallery'>('shows');
  const [mediaVaultTab, setMediaVaultTab] = useState<'view' | 'upload'>('view');
  const [formData, setFormData] = useState({ name: '', desc: '', station: 'skyz' });
  const [showModal, setShowModal] = useState(false);
  const [editingShow, setEditingShow] = useState<Show | null>(null);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  
  const [startTime, setStartTime] = useState('08:00');
  const [startPeriod, setStartPeriod] = useState<'AM' | 'PM'>('AM');
  const [endTime, setEndTime] = useState('10:00');
  const [endPeriod, setEndPeriod] = useState<'AM' | 'PM'>('AM');

  const [hostChips, setHostChips] = useState<string[]>([]);
  const [hostInput, setHostInput] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [fileProgresses, setFileProgresses] = useState<Record<string, number>>({});
  const [uploadStation, setUploadStation] = useState<'skyz' | 'breeze'>('skyz');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openAddModal = () => {
    setFormData({ name: '', desc: '', station: 'skyz' });
    setSelectedDays([]);
    setStartTime('08:00');
    setStartPeriod('AM');
    setEndTime('10:00');
    setEndPeriod('AM');
    setHostChips([]);
    setHostInput('');
    setEditingShow(null);
    setShowModal(true);
  };

  const openEditModal = (show: Show) => {
    setFormData({ name: show.name, desc: show.desc, station: (show as any).station || 'skyz' });
    setHostChips(show.hosts || []);
    
    const [daysPart, timesPart] = show.time.split(' | ');
    if (timesPart) {
      setStartTime(show.startTime || '08:00');
      setStartPeriod(show.startPeriod || 'AM');
      setEndTime(show.endTime || '10:00');
      setEndPeriod(show.endPeriod || 'AM');

      if (daysPart.includes('Everyday')) setSelectedDays(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']);
      else setSelectedDays(daysPart.split(',').map(d => d.trim()));
    }
    setEditingShow(show);
    setShowModal(true);
  };

  const handleSaveShow = async () => {
    const dayStr = selectedDays.length === 7 ? 'Everyday' : selectedDays.join(', ');
    const displayTime = `${startTime}${startPeriod} - ${endTime}${endPeriod}`;
    const timeStr = `${dayStr} | ${displayTime}`;

    const newShow = { 
      ...formData, 
      time: timeStr, 
      hosts: hostChips,
      startTime,
      startPeriod,
      endTime,
      endPeriod,
      days: selectedDays.length === 7 ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] : selectedDays
    };

    if (editingShow?.id) await update(ref(rtdb, `shows/${editingShow.id}`), newShow);
    else await push(ref(rtdb, 'shows'), newShow);
    setShowModal(false);
  };

  const handleDeleteShow = async (id: string) => {
    if (confirm('Delete this show?')) {
      try {
        await remove(ref(rtdb, `shows/${id}`));
      } catch (e) {
        console.error("Delete failed:", e);
        alert("Failed to delete show.");
      }
    }
  };

  const handleUploadAll = async () => {
    if (uploadedFiles.length === 0) return;
    setIsUploading(true);
    const folder = uploadStation;
    for (const file of uploadedFiles) {
      const fileName = `${folder}/${Math.random().toString(36).slice(2)}_${file.name}`;
      const { data, error } = await (supabase.storage.from('Images') as any).upload(fileName, file, {
        onUploadProgress: (p: any) => setFileProgresses(prev => ({ ...prev, [file.name]: Math.round((p.loaded / p.total) * 100) }))
      });
      if (data) {
        const { data: { publicUrl } } = supabase.storage.from('Images').getPublicUrl(fileName);
        await push(ref(rtdb, 'gallery'), { src: publicUrl, caption: file.name.split('.')[0], alt: file.name, station: uploadStation });
      } else if (error) {
        console.error("Upload error:", error);
      }
    }
    setUploadedFiles([]);
    setFileProgresses({});
    setIsUploading(false);
    setMediaVaultTab('view');
  };

  const handleDeleteImage = async (id: string) => {
    if (confirm('Permanently remove this media asset?')) {
      await remove(ref(rtdb, `gallery/${id}`));
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 font-sans selection:bg-[#F58220]/30">
      {/* Background Aurora Effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#F58220]/5 blur-[120px] rounded-full animate-pulse delay-700" />
      </div>

      <div className="relative z-10 max-w-[100rem] mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 h-[calc(100vh-4rem)]">
        
        {/* Sidebar - Glassmorphism */}
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-neutral-900/40 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] p-8 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-3 mb-12 px-2">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                <Sparkles size={24} className="text-black" />
              </div>
            </div>
            
            <nav className="space-y-2">
              {[
                { id: 'shows', label: 'Broadcasts', icon: MonitorPlay },
                { id: 'gallery', label: 'Media Vault', icon: ImageIcon }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    "w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold transition-all relative group overflow-hidden",
                    activeTab === tab.id ? "text-white bg-white/10" : "text-neutral-500 hover:text-neutral-200 hover:bg-white/5"
                  )}
                >
                  {activeTab === tab.id && (
                    <motion.div layoutId="sidebarActive" className="absolute left-0 w-1.5 h-1/2 bg-[#F58220] rounded-full" />
                  )}
                  <tab.icon size={20} className={cn("transition-colors", activeTab === tab.id ? "text-[#F58220]" : "text-neutral-600 group-hover:text-neutral-400")} />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <button 
            onClick={() => setView('home')}
            className="flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold text-neutral-500 hover:text-red-400 hover:bg-red-400/5 transition-all group"
          >
            <LogOut size={20} className="group-hover:translate-x-1 transition-transform" /> Sign Out
          </button>
        </motion.div>

        {/* Content Area */}
        <main className="bg-neutral-900/40 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl">
          <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar relative">
            
            <AnimatePresence mode="wait">
              {activeTab === 'shows' ? (
                <motion.div 
                  key="shows"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-12"
                >
                  <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div>
                      <h2 className="text-4xl font-black tracking-tight mb-2">Show Manager</h2>
                      <p className="text-neutral-500 font-medium tracking-tight">Streamline your station's broadcasting lifecycle.</p>
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={openAddModal}
                      className="bg-white text-black px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_50px_rgba(255,255,255,0.25)] transition-all flex items-center gap-3"
                    >
                      <Plus size={18} /> New Broadcast
                    </motion.button>
                  </header>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dbShows.map((show, idx) => (
                      <motion.div
                        key={show.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        className="group bg-white/5 border border-white/5 p-6 rounded-3xl hover:bg-white/10 transition-all duration-500 relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-[#F58220]/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        <div className="flex justify-between items-start mb-6">
                          <span className="px-3 py-1 rounded-full bg-white/5 text-[9px] font-black uppercase tracking-widest text-[#F58220]">
                            {show.station === 'skyz' ? 'Skyz Metro' : 'Breeze FM'}
                          </span>
                          <div className="flex gap-2">
                             <button onClick={(e) => { e.stopPropagation(); openEditModal(show); }} className="p-2 text-neutral-500 hover:text-white transition-colors relative z-30 cursor-pointer"><Pencil size={16} /></button>
                             <button onClick={(e) => { e.stopPropagation(); show.id && handleDeleteShow(show.id); }} className="p-2 text-neutral-500 hover:text-red-400 transition-colors relative z-30 cursor-pointer"><Trash2 size={16} /></button>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold mb-4 tracking-tight group-hover:text-[#F58220] transition-colors">{show.name}</h3>
                        <div className="space-y-3 mb-6">
                          <div className="flex items-center gap-3 text-neutral-500 text-xs font-bold">
                            <Clock size={14} className="text-neutral-700" /> {show.time}
                          </div>
                          {show.startTime && show.endTime && (
                            <div className="flex items-center gap-3 text-neutral-500 text-[10px] font-black uppercase tracking-widest">
                              <MonitorPlay size={12} className="text-neutral-700" /> Runtime: {calculateDuration(show.startTime, show.startPeriod || 'AM', show.endTime, show.endPeriod || 'AM')}
                            </div>
                          )}
                          <div className="flex items-center gap-3 text-neutral-500 text-xs font-bold">
                            <Users size={14} className="text-neutral-700" /> {show.hosts?.slice(0, 2).join(', ')}{show.hosts?.length > 2 ? '...' : ''}
                          </div>
                        </div>
                        <p className="text-neutral-600 text-xs font-medium leading-relaxed italic line-clamp-2">{show.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="gallery"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-12"
                >
                  <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div>
                      <h2 className="text-4xl font-black tracking-tight mb-2">Media Vault</h2>
                      <p className="text-neutral-500 font-medium tracking-tight">Curate the visual identity of your stations.</p>
                    </div>
                    <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5">
                      <button onClick={() => setMediaVaultTab('view')} className={cn("px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all", mediaVaultTab === 'view' ? "bg-white text-black shadow-xl" : "text-neutral-500 hover:text-white")}>Gallery</button>
                      <button onClick={() => setMediaVaultTab('upload')} className={cn("px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all", mediaVaultTab === 'upload' ? "bg-white text-black shadow-xl" : "text-neutral-500 hover:text-white")}>Upload</button>
                    </div>
                  </header>

                  <AnimatePresence mode="wait">
                    {mediaVaultTab === 'upload' ? (
                      <motion.div key="upload" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="space-y-8">
                        {/* Modern Dropzone */}
                        <div 
                          onClick={() => fileInputRef.current?.click()}
                          className="group relative h-96 rounded-[3rem] border-2 border-dashed border-white/5 bg-white/5 hover:bg-white/[0.08] hover:border-white/20 transition-all flex flex-col items-center justify-center cursor-pointer overflow-hidden"
                        >
                           <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-white/10 transition-all">
                              <Upload size={32} className="text-[#F58220]" />
                           </div>
                           <p className="font-black text-2xl tracking-tight">Drop your media hub</p>
                           <p className="text-neutral-500 text-xs uppercase tracking-widest font-black mt-4">or browse files to upload</p>
                           <input ref={fileInputRef} type="file" multiple className="hidden" accept="image/*" onChange={e => setUploadedFiles(prev => [...prev, ...Array.from(e.target.files || [])])} />
                        </div>

                        {/* Dynamic Upload Queue */}
                        <AnimatePresence>
                          {uploadedFiles.length > 0 && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-6">
                              <div className="flex items-center justify-between px-4">
                                <div className="flex items-center gap-4">
                                  {(['skyz', 'breeze'] as const).map(s => (
                                    <button key={s} onClick={() => setUploadStation(s)} className={cn("text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-full transition-all border", uploadStation === s ? "bg-[#F58220] text-black border-[#F58220]" : "bg-white/5 text-neutral-500 border-white/5 hover:border-white/10")}>{s === 'skyz' ? 'Skyz Metro' : 'Breeze FM'}</button>
                                  ))}
                                </div>
                                <button onClick={handleUploadAll} disabled={isUploading} className="text-xs font-black uppercase bg-white text-black px-8 py-4 rounded-2xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 shadow-2xl">Confirm {uploadedFiles.length} Uploads</button>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {uploadedFiles.map((file, i) => (
                                  <div key={i} className="bg-white/5 rounded-3xl p-5 flex items-center gap-4 relative overflow-hidden group border border-white/5">
                                    <div className="w-14 h-14 rounded-xl bg-neutral-800 flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                      <p className="text-xs font-black truncate uppercase tracking-wider">{file.name}</p>
                                      <div className="mt-3 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                         <motion.div initial={{ width: 0 }} animate={{ width: `${fileProgresses[file.name] || 0}%` }} className="h-full bg-[#F58220]" />
                                      </div>
                                    </div>
                                    <button onClick={() => setUploadedFiles(prev => prev.filter((_, idx) => idx !== i))} className="p-3 text-neutral-600 hover:text-red-400 transition-colors relative z-30 cursor-pointer"><Trash2 size={16}/></button>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ) : (
                      <motion.div key="view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {dbGallery.map((img, i) => (
                          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.02 }} key={img.id} className="relative aspect-square rounded-[2.5rem] overflow-hidden group border border-white/5 shadow-xl">
                             <img src={img.src} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" loading="lazy" />
                             <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                <button onClick={(e) => { e.stopPropagation(); img.id && handleDeleteImage(img.id); }} className="bg-white text-black p-4 rounded-full hover:scale-110 active:scale-90 transition-all shadow-2xl relative z-30 cursor-pointer"><Trash2 size={20}/></button>
                             </div>
                             <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/50 backdrop-blur-md rounded-xl text-[9px] font-black uppercase tracking-widest text-white border border-white/10">{img.station}</div>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Modern Modal - Framer Motion */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)} className="absolute inset-0 bg-black/80 backdrop-blur-2xl" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative bg-[#111] border border-white/10 rounded-[3rem] w-full max-w-2xl p-10 md:p-14 shadow-[0_0_100px_rgba(0,0,0,1)] max-h-[90vh] overflow-y-auto custom-scrollbar">
              <header className="flex justify-between items-start mb-10">
                <div>
                  <h3 className="text-3xl font-black tracking-tight mb-2 uppercase">{editingShow ? 'Refine Broadcast' : 'Deploy New Show'}</h3>
                  <p className="text-neutral-500 font-medium text-sm">Configure station telemetry and scheduling.</p>
                </div>
                <button onClick={() => setShowModal(false)} className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors"><X size={20}/></button>
              </header>

              <div className="space-y-8">
                <div className="grid grid-cols-2 gap-4">
                   {(['skyz', 'breeze'] as const).map(s => (
                     <button key={s} onClick={() => setFormData({...formData, station: s})} className={cn("py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all border", formData.station === s ? "bg-white text-black border-white shadow-[0_0_30px_rgba(255,255,255,0.1)]" : "bg-white/5 text-neutral-500 border-white/5 hover:border-white/10")}>{s === 'skyz' ? 'Skyz Metro' : 'Breeze FM'}</button>
                   ))}
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 ml-4">Campaign Name</label>
                  <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#F58220]/50 transition-colors font-bold" placeholder="E.g. The Mid-Day Pulse" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 ml-4">Launch Time</label>
                    <div className="flex gap-2">
                      <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} className="flex-1 bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#F58220]/50 transition-colors font-mono font-bold" />
                      <select value={startPeriod} onChange={e => setStartPeriod(e.target.value as any)} className="bg-white/5 border border-white/5 rounded-2xl px-4 py-4 text-white font-black text-[10px] outline-none">
                        <option value="AM" className="bg-[#111]">AM</option>
                        <option value="PM" className="bg-[#111]">PM</option>
                      </select>
                    </div>
                   </div>
                   <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 ml-4">Sign Off</label>
                    <div className="flex gap-2">
                      <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} className="flex-1 bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#F58220]/50 transition-colors font-mono font-bold" />
                      <select value={endPeriod} onChange={e => setEndPeriod(e.target.value as any)} className="bg-white/5 border border-white/5 rounded-2xl px-4 py-4 text-white font-black text-[10px] outline-none">
                        <option value="AM" className="bg-[#111]">AM</option>
                        <option value="PM" className="bg-[#111]">PM</option>
                      </select>
                    </div>
                   </div>
                </div>

                <div className="space-y-4">
                   <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 ml-4">Deployment Schedule</label>
                   <div className="flex flex-wrap gap-2">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                         <button key={d} onClick={() => setSelectedDays(prev => prev.includes(d) ? prev.filter(day => day !== d) : [...prev, d])} className={cn("px-4 py-2 rounded-xl text-[10px] font-bold transition-all border", selectedDays.includes(d) ? "bg-[#F58220] text-black border-[#F58220]" : "bg-white/5 text-neutral-500 border-white/5 hover:border-white/10")}>{d}</button>
                      ))}
                      <button onClick={() => setSelectedDays(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])} className="px-4 py-2 rounded-xl text-[10px] font-bold bg-white text-black">Everyday</button>
                   </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 ml-4">The On-Air Team</label>
                  <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex flex-wrap gap-2 focus-within:border-[#F58220]/50 transition-colors">
                    {hostChips.map((h, i) => (
                      <span key={i} className="bg-white/10 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center gap-3">{h} <X size={12} className="cursor-pointer hover:text-red-400" onClick={() => setHostChips(prev => prev.filter((_, idx) => idx !== i))} /></span>
                    ))}
                    <input type="text" value={hostInput} onChange={e => setHostInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && hostInput) { setHostChips([...hostChips, hostInput]); setHostInput(''); } }} className="bg-transparent text-white outline-none flex-1 min-w-[120px] text-xs font-bold" placeholder="Press Enter to add voice..." />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 ml-4">Creative Direction</label>
                  <textarea value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})} className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#F58220]/50 transition-colors min-h-[120px] resize-none font-medium italic text-sm" placeholder="Define the creative vision..." />
                </div>

                <button onClick={handleSaveShow} className="w-full bg-white text-black font-black uppercase tracking-[0.2em] py-6 rounded-[2rem] hover:scale-[1.02] active:scale-98 transition-all shadow-[0_0_50px_rgba(255,255,255,0.1)] mt-4">Save Configuration</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboardView;
