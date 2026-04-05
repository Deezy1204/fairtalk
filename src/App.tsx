import React, { useState, useEffect, Suspense, lazy, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ref, onValue } from 'firebase/database';
import { rtdb } from './lib/firebase';
import { cn, getScheduleState } from './lib/utils';
import { X, Play } from 'lucide-react';
import { View, Show, GalleryImage, Station } from './types';
import { STATIONS, NAV_ITEMS } from './constants';

// --- Common Components ---
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { RadioPlayer } from './components/common/RadioPlayer';
import { ThemeToggle } from './components/common/ThemeToggle';
import { ImageLightbox } from './components/common/ImageLightbox';
import { BrandLogo } from './components/common/BrandLogo';

// --- Lazy Views ---
const HomeView = lazy(() => import('./components/home/HomeView').then(m => ({ default: m.HomeView })));
const StationsView = lazy(() => import('./components/StationsView').then(m => ({ default: m.StationsView })));
const StationDetailView = lazy(() => import('./components/StationDetail'));
const AboutView = lazy(() => import('./components/AboutView').then(m => ({ default: m.AboutView })));
const NewsView = lazy(() => import('./components/NewsView'));
const ContactView = lazy(() => import('./components/ContactView').then(m => ({ default: m.ContactView })));
const AdminLoginView = lazy(() => import('./components/AdminLoginView').then(m => ({ default: m.AdminLoginView })));
const AdminDashboardView = lazy(() => import('./components/AdminDashboard'));

// --- Loading Component ---
const ViewLoader = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
    <motion.div
      animate={{
        rotate: 360,
        scale: [1, 1.1, 1],
        borderRadius: ["20%", "50%", "20%"]
      }}
      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      className="w-12 h-12 border-4 border-[#F58220]/20 border-t-[#F58220] border-r-[#F58220] rounded-xl shadow-2xl"
    />
    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#F58220] animate-pulse">Syncing Reality...</p>
  </div>
);

export default function App() {
  // --- Routing Logic ---
  const getInitialView = (): View => {
    const path = window.location.pathname.replace('/', '') as View;
    if (path && (NAV_ITEMS.some(n => n.view === path) || ['skyz', 'breeze', 'admin_login', 'admin_dashboard'].includes(path))) {
      return path;
    }
    return 'home';
  };

  const [view, setViewInternal] = useState<View>(getInitialView());

  const setView = useCallback((v: View) => {
    setViewInternal(v);
    window.history.pushState({}, '', `/${v}`);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace('/', '') as View;
      setViewInternal(path || 'home');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeStationId, setActiveStationId] = useState('skyz');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [dbShows, setDbShows] = useState<Show[]>([]);
  const [dbGallery, setDbGallery] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [audio] = useState(new Audio());

  const playStation = (id: string) => {
    const station = STATIONS[id];
    if (!station) return;

    if (activeStationId === id && isPlaying) {
      setIsPlaying(false);
      audio.pause();
    } else {
      setActiveStationId(id);
      setIsPlaying(true);
      setIsPlayerVisible(true);
      audio.src = station.streamUrl;
      audio.load();
      audio.play().catch(e => console.error("Playback error:", e));
    }
  };

  useEffect(() => {
    if (isPlaying) {
      audio.play().catch(e => console.error("Playback error:", e));
    } else {
      audio.pause();
    }
  }, [isPlaying, audio]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  useEffect(() => {
    const showsRef = ref(rtdb, 'shows');
    const galleryRef = ref(rtdb, 'gallery');

    const unsubShows = onValue(showsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const showsList = Object.entries(data).map(([id, val]: [string, any]) => ({ ...val, id }));
        setDbShows(showsList);
      }
      setLoading(false);
    });

    const unsubGallery = onValue(galleryRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const galleryList = Object.entries(data).map(([id, val]: [string, any]) => ({ ...val, id }));
        setDbGallery(galleryList);
      }
    });

    return () => {
      unsubShows();
      unsubGallery();
      audio.pause();
      audio.src = "";
    };
  }, [audio]);

  const liveStations: Record<string, Station> = React.useMemo(() => {
    const updated = { ...STATIONS };

    Object.keys(updated).forEach(id => {
      const schedule = getScheduleState(dbShows, id);

      updated[id] = {
        ...updated[id],
        shows: schedule.shows,
        gallery: dbGallery.filter(img => img.station === id),
        hosts: Array.from(new Set(schedule.shows.flatMap(s => s.hosts || [])))
      };
      
      // Inject meta info for UI
      (updated[id] as any).currentShow = schedule.currentShow;
      (updated[id] as any).nextShow = schedule.nextShow;
    });
    return updated;
  }, [dbShows, dbGallery]);

  return (
    <div className={`min-h-screen transition-colors duration-500 overflow-x-hidden ${theme === 'dark' ? 'bg-black text-white dark' : 'bg-white text-slate-900'}`}>

      {!['admin_dashboard'].includes(view) && (
        <Navbar
          setView={setView}
          currentView={view}
          playStation={playStation}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
      )}

      {view === 'admin_dashboard' && (
        <div className="fixed top-0 left-0 right-0 z-[150] px-6 md:px-12 py-4 flex justify-between items-center transition-all duration-500 pointer-events-none">
          <button onClick={() => setView('home')} className="hover:scale-105 active:scale-95 transition-transform pointer-events-auto">
            <BrandLogo compact className="max-w-[140px] md:max-w-[170px]" />
          </button>
        </div>
      )}

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[200] bg-white dark:bg-black flex flex-col pt-24"
          >
            <div className="flex justify-between items-center px-6 sm:px-10 mb-8 sm:mb-12">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-neutral-500 transition-colors">Navigation Hub</span>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors">
                <X size={32} />
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 space-y-6 sm:space-y-8">
              {NAV_ITEMS.map((item, idx) => (
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                  key={item.view}
                  onClick={() => { setView(item.view); setIsMenuOpen(false); }}
                  className="text-left group"
                >
                  <span className={`text-4xl sm:text-5xl font-black block transition-all ${view === item.view ? 'text-black dark:text-white translate-x-4' : 'text-black/40 dark:text-white/40 group-hover:translate-x-2 group-hover:text-black dark:group-hover:text-white'}`}>
                    {item.label}
                  </span>
                </motion.button>
              ))}
            </div>

            <div className="p-6 sm:p-10 border-t border-black/10 dark:border-white/10">
              <button
                onClick={() => { playStation('skyz'); setIsMenuOpen(false); }}
                className="w-full bg-black dark:bg-white text-white dark:text-black py-4 sm:py-5 rounded-full text-base sm:text-lg font-black flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-transform"
              >
                <Play fill="currentColor" /> Listen Live Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className={cn("transition-all duration-500", view === 'admin_dashboard' ? "pt-0" : "pt-24 lg:pt-0")}>
        <Suspense fallback={<ViewLoader />}>
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {view === 'home' && <HomeView setView={setView} playStation={playStation} liveStations={liveStations} />}
              {view === 'stations' && <StationsView setView={setView} liveStations={liveStations} />}
              {view === 'skyz' && <StationDetailView station={liveStations.skyz} playStation={playStation} onImageSelect={setSelectedImage} />}
              {view === 'breeze' && <StationDetailView station={liveStations.breeze} playStation={playStation} onImageSelect={setSelectedImage} />}
              {view === 'about' && <AboutView />}
              {view === 'news' && <NewsView />}
              {view === 'contact' && <ContactView />}
              {view === 'admin_login' && <AdminLoginView setView={setView} />}
              {view === 'admin_dashboard' && <AdminDashboardView setView={setView} dbShows={dbShows} dbGallery={dbGallery} />}
            </motion.div>
          </AnimatePresence>
        </Suspense>
      </main>

      {!['admin_login', 'admin_dashboard'].includes(view) && (
        <div className="relative z-20">
          <Footer setView={setView} />
        </div>
      )}

      <RadioPlayer
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        activeStationId={activeStationId}
        setActiveStationId={setActiveStationId}
        isPlayerVisible={isPlayerVisible}
        setIsPlayerVisible={setIsPlayerVisible}
        playStation={playStation}
        liveStations={liveStations}
      />

      {!['admin_dashboard'].includes(view) && <ThemeToggle theme={theme} setTheme={setTheme} />}
      <ImageLightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
    </div>
  );
}
