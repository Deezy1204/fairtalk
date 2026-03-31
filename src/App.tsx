import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play, Pause, Radio,
  Headphones, Shield, Heart,
  MapPin, Facebook, Twitter, Instagram,
  ChevronRight, ChevronLeft, Star, Map, X,
  Newspaper, Users, Phone, ExternalLink,
  Clock, Calendar, Mic2, Sun, Moon,
  ArrowRight, Menu, ChevronDown, MessageCircle
} from 'lucide-react';
import skyz01 from '../skyz/1000012485.jpg.jpeg';
import skyz02 from '../skyz/1000033906.jpg.jpeg';
import skyz03 from '../skyz/1000034172.jpg.jpeg';
import skyz04 from '../skyz/1000170708.jpg.jpeg';
import skyz05 from '../skyz/1000038533.jpg.jpeg';
import skyz06 from '../skyz/1000038532.jpg.jpeg';
import skyz07 from '../skyz/1000038527.jpg.jpeg';
import skyz08 from '../skyz/1000038523.jpg.jpeg';
import breeze01 from '../breeze/WhatsApp Image 2026-03-28 at 6.49.55 AM.jpeg';
import breeze02 from '../breeze/WhatsApp Image 2026-03-28 at 6.49.54 AM.jpeg';
import breeze03 from '../breeze/WhatsApp Image 2026-03-28 at 6.49.54 AM (1).jpeg';
import breeze04 from '../breeze/WhatsApp Image 2026-03-28 at 6.49.53 AM.jpeg';
import breeze05 from '../breeze/WhatsApp Image 2026-03-28 at 6.49.55 AM.jpeg';
import breeze06 from '../breeze/WhatsApp Image 2026-03-28 at 6.49.52 AM.jpeg';

// --- Brand Colors (Derived from Logo) ---
// Orange: #F58220
// Blue: #20388F
// Dark: #1E293B (Slate 800)

// --- Types ---
type View = 'home' | 'stations' | 'about' | 'news' | 'contact' | 'skyz' | 'breeze';

interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
}

interface Station {
  id: string;
  name: string;
  freq: string;
  tagline: string;
  location: string;
  desc: string;
  image: string;
  streamUrl: string;
  gallery: GalleryImage[];
  shows: Show[];
  hosts: string[];
}

interface Show {
  name: string;
  time: string;
  host: string;
  desc: string;
}

const SKYZ_GALLERY: GalleryImage[] = [
  { src: skyz01, alt: 'Skyz Metro FM team portrait', caption: 'Studio team moments' },
  { src: skyz03, alt: 'Skyz Metro FM presenters in studio', caption: 'Bulawayo energy live' },
  { src: skyz04, alt: 'Skyz Metro FM event photo', caption: 'Community presence' },
  { src: skyz05, alt: 'Skyz Metro FM production scene', caption: 'Behind the desk' },
  { src: skyz06, alt: 'Skyz Metro FM broadcast session', caption: 'Live mic sessions' },
  { src: skyz07, alt: 'Skyz Metro FM talent photo', caption: 'Talent in focus' },
  { src: skyz08, alt: 'Skyz Metro FM team coverage image', caption: 'Regional storytelling' },
];

const BREEZE_GALLERY: GalleryImage[] = [
  { src: breeze01, alt: 'Breeze FM station image one', caption: 'Fresh morning broadcast' },
  { src: breeze02, alt: 'Breeze FM station image two', caption: 'Voices of the Falls' },
  { src: breeze03, alt: 'Breeze FM station image three', caption: 'Studio session snapshots' },
  { src: breeze04, alt: 'Breeze FM station image four', caption: 'Tourism town coverage' },
  { src: breeze05, alt: 'Breeze FM station image five', caption: 'Team moments on air' },
  { src: breeze06, alt: 'Breeze FM station image six', caption: 'Community radio in motion' },
];

// --- Data ---
const STATIONS: Record<string, Station> = {
  skyz: {
    id: 'skyz',
    name: "Skyz Metro FM",
    freq: "100.3 FM",
    tagline: "The Soul of Bulawayo",
    location: "Bulawayo, Zimbabwe",
    desc: "Bulawayo's first commercial radio station, focusing on urban culture, local news, and the heartbeat of Matabeleland.",
    image: SKYZ_GALLERY[0].src,
    streamUrl: "https://stream.zeno.fm/2634b6n4qy8uv",
    gallery: SKYZ_GALLERY,
    hosts: ["Taboka Nleya", "Possenti Sikosana", "Vusumuzi Zwane", "Charity Chikara"],
    shows: [
      { name: "The Morning Drive", time: "06:00 - 09:00", host: "Taboka Nleya", desc: "Start your day with the latest Bulawayo news and urban hits." },
      { name: "Urban Beats", time: "12:00 - 15:00", host: "Possenti Sikosana", desc: "The best in local and international urban music." },
      { name: "Matabeleland Today", time: "18:00 - 19:00", host: "Charity Chikara", desc: "In-depth regional news and community analysis." }
    ]
  },
  breeze: {
    id: 'breeze',
    name: "Breeze FM",
    freq: "91.2 FM",
    tagline: "Voices of the Falls",
    location: "Victoria Falls, Zimbabwe",
    desc: "Serving the resort town of Victoria Falls and the Hwange district with tourism updates, community news, and multi-lingual broadcasting.",
    image: BREEZE_GALLERY[0].src,
    streamUrl: "https://stream.zeno.fm/9p57qaykqy8uv",
    gallery: BREEZE_GALLERY,
    hosts: ["Timothy Hogo", "Stanley Dube", "Mkhenara"],
    shows: [
      { name: "Kusile on Breeze", time: "06:00 - 09:00", host: "Stanley Dube", desc: "The premier breakfast show for Victoria Falls and Hwange." },
      { name: "Tourism Weekly", time: "10:00 - 11:00", host: "Timothy Hogo", desc: "Updates from the tourism industry and river flow reports." },
      { name: "Agri Talk", time: "20:00 - 21:00", host: "Mkhenara", desc: "Empowering local farmers with agricultural insights." }
    ]
  }
};

// --- Constants ---
const NAV_ITEMS: { label: string, view: View }[] = [
  { label: 'Home', view: 'home' },
  { label: 'About Us', view: 'about' },
  { label: 'News', view: 'news' },
  { label: 'Contact', view: 'contact' },
];

// --- Components ---

const BrandLogo = ({ className = '', compact = false }: { className?: string; compact?: boolean }) => (
  <div className={`inline-flex items-center ${className}`}>
    <img
      src="/logo.png"
      alt="FairTalk Communications"
      className={`${compact ? 'h-12 sm:h-16' : 'h-20 sm:h-24 md:h-28'} w-auto object-contain transition-all`}
    />
  </div>
);

const Navbar = ({
  setView,
  currentView,
  playStation,
  isMenuOpen,
  setIsMenuOpen
}: {
  setView: (v: View) => void,
  currentView: View,
  playStation: (id: string) => void,
  isMenuOpen: boolean,
  setIsMenuOpen: (o: boolean) => void
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Navbar activates exactly when the Content layer (at 40vh) hits the top
    const handleScroll = () => setScrolled(window.scrollY > (window.innerHeight * 0.4) - 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] px-6 md:px-12 py-4 md:py-6 flex justify-between items-center transition-all duration-500 ${scrolled ? 'bg-white/90 dark:bg-black/90 backdrop-blur-md py-3 md:py-4 shadow-sm ring-1 ring-black/5' : 'bg-transparent'}`}>
      <div className="w-1/3 flex justify-start">
        <img
          src="/logo.png"
          className="h-12 md:h-[72px] object-contain cursor-pointer active:scale-95 transition-transform"
          alt="Fairtalk Logo"
          onClick={() => setView('home')}
        />
      </div>

      <div className="hidden lg:flex flex-1 justify-center gap-24 text-black dark:text-white">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.view}
            onClick={() => setView(item.view)}
            className={`nav-link text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap transition-all hover:opacity-100 ${currentView === item.view ? 'opacity-100 border-b-2 border-black dark:border-white pb-1' : 'opacity-40'}`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="w-1/3 flex justify-end items-center gap-4">
        <button
          onClick={() => setView('stations')}
          className="bg-black dark:bg-white text-white dark:text-black px-6 md:px-8 py-2.5 rounded-full flex items-center gap-2.5 text-[9px] md:text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl"
        >
          Stations <ArrowRight size={16} />
        </button>

        {/* Mobile Toggle */}
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

const Footer = ({ setView }: { setView: (v: View) => void }) => (
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
    
    <div className="max-w-7xl mx-auto border-t border-slate-100 dark:border-neutral-900 mt-16 pt-8 text-center text-xs text-slate-500">
      &copy; {new Date().getFullYear()} Fairtalk Communications. All Rights Reserved.
    </div>

    {/* Huge FAIR TALK Gradient Bottom */}
    <div className="w-full overflow-hidden flex justify-center mt-12 pt-6 pointer-events-none">
      <h1 className="text-[14vw] leading-[0.8] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-slate-200/80 to-transparent dark:from-neutral-800/80 dark:to-transparent select-none whitespace-nowrap">
        FAIR TALK
      </h1>
    </div>
  </footer>
);

const HomeView = ({ setView, playStation }: { setView: (v: View) => void, playStation: (id: string) => void }) => {
  return (
    <div className="relative overflow-visible">
      
      {/* Sticky Hero Layer: Pinned in the background, anchored at the top */}
      <div className="sticky top-0 z-0 h-[100svh] w-full flex items-start bg-white dark:bg-black transition-colors duration-500 px-6 md:px-12 pt-32 lg:pt-0 overflow-hidden lg:overflow-visible">
        <div className="max-w-[1500px] mx-auto flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-5 items-start w-full">
          
          {/* Left Column: Image Container (4/12 of the grid) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "circOut" }}
            className="relative lg:col-span-4 w-full -left-[50px] lg:left-0 hidden lg:block"
          >
            <div className="relative group/hero z-[110]">
              <div className="hero-image-container glow-cyan w-full max-w-[280px] aspect-[1/2] lg:h-[520px] relative mx-auto lg:ml-24 xl:ml-32 bg-slate-100 dark:bg-slate-900 overflow-hidden rounded-b-[6rem] shadow-2xl">
                <img 
                  src="/heroimage.jpg" 
                  className="w-full h-full object-cover transition-all duration-1000" 
                  alt="Radio Studio" 
                />
              </div>

              {/* Overlapping Play Button - Half on, Half off */}
              <div className="absolute bottom-0 lg:ml-24 xl:ml-32 left-0 lg:left-0 translate-x-[-50%] translate-y-[50%] z-20 pointer-events-none">
                 <motion.div 
                   animate={{ scale: [1, 1.05, 1] }}
                   transition={{ duration: 4, repeat: Infinity }}
                   className="w-32 h-32 md:w-44 md:h-44 rounded-full border border-black/10 dark:border-white/20 flex items-center justify-center backdrop-blur-xl bg-white/10 dark:bg-black/20 shadow-2xl relative"
                 >
                   {/* Spinning Circular Text */}
                   <motion.div
                     animate={{ rotate: 360 }}
                     transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                     className="absolute inset-0 z-0 p-1"
                   >
                     <svg viewBox="0 0 100 100" className="w-full h-full">
                       <path
                         id="textPath"
                         d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
                         fill="none"
                       />
                       <text className="text-[6.5px] font-black uppercase tracking-[0.14em] fill-black/60 dark:fill-white/60">
                         <textPath href="#textPath" startOffset="0%">
                           Stream Skyz Metro FM & Breeze FM • Stream Skyz Metro FM & Breeze FM • 
                         </textPath>
                       </text>
                     </svg>
                   </motion.div>

                   <motion.button 
                     whileHover={{ scale: 1.1 }}
                     whileTap={{ scale: 0.9 }}
                     onClick={() => playStation('skyz')} 
                     className="w-14 h-14 md:w-20 md:h-20 bg-white dark:bg-white text-black rounded-full flex items-center justify-center shadow-2xl pointer-events-auto cursor-pointer relative z-10"
                   >
                     <Play className="text-black fill-black ml-1" size={28} />
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
                FAIR TALK
              </p>
              
              <h1 className="text-[1.25rem] sm:text-[1.75rem] md:text-[2.5rem] lg:text-[3rem] xl:text-[3.6rem] leading-[1] font-black tracking-normal mb-6 text-black dark:text-white uppercase whitespace-nowrap">
                COMM<br />
                UNICATIONS
              </h1>

              <p className="text-base md:text-lg text-black/60 dark:text-white/60 max-w-none leading-relaxed mb-8 md:mb-10 font-medium z-20 relative bg-white/50 dark:bg-black/50 lg:bg-transparent p-4 lg:p-0 rounded-xl lg:rounded-none backdrop-blur-sm lg:backdrop-blur-none border border-black/5 lg:border-transparent dark:border-white/5">
                Is a pioneering force in Zimbabwe's broadcasting industry, owning the popular <strong>Skyz Metro FM</strong> in Bulawayo and <strong>Breeze FM</strong> in Victoria Falls. We are dedicated to bringing diverse voices and fresh perspectives to the media landscape.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <button 
                  onClick={() => setView('stations')}
                  className="bg-black dark:bg-white text-white dark:text-black px-5 py-2.5 rounded-full flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl group"
                >
                  Stations <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
                </button>
                <button 
                  onClick={() => playStation('skyz')} 
                  className="lg:hidden bg-[#F58220] hover:bg-[#F58220]/90 text-white px-5 py-2.5 rounded-full flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(245,130,32,0.5)]"
                >
                  <Play size={14} fill="currentColor" /> Live Radio
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scrollable Content Layer */}
      <div className="relative z-10 bg-white dark:bg-black transition-colors duration-500 mt-[50svh] lg:mt-[45vh] pt-12 lg:pt-20 pb-24 shadow-[0_-50px_100px_rgba(0,0,0,0.1)]">
        
        {/* Corporate Overview */}
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
                <img src={STATIONS.skyz.gallery[2]?.src ?? STATIONS.skyz.image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
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
                <img src={STATIONS.breeze.gallery[2]?.src ?? STATIONS.breeze.image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#F58220]/80 to-transparent flex items-end p-6">
                  <span className="text-white font-bold text-slate-100">Breeze FM</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* News Snippet */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="bg-slate-50 dark:bg-slate-900/50 py-32 px-6 md:px-12 transition-all"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-4 transition-colors">Latest from Fairtalk News</h2>
                <p className="text-slate-500 dark:text-slate-400 transition-colors">Breaking stories from Matabeleland and Victoria Falls.</p>
              </div>
              <button onClick={() => setView('news')} className="text-[#20388F] dark:text-[#F58220] font-bold flex items-center gap-1 hover:underline transition-colors">
                View all news <ExternalLink size={16} />
              </button>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-all cursor-pointer group">
                  <div className="text-xs font-bold text-[#F58220] mb-3">REGIONAL NEWS</div>
                  <h3 className="font-bold text-lg mb-3 leading-snug text-slate-800 dark:text-slate-100 group-hover:text-[#20388F] dark:group-hover:text-[#F58220] transition-colors">
                    {i === 1 ? "Fairtalk Communications Announces 2026 Strategic Growth Initiative" : 
                     i === 2 ? "Skyz Metro FM celebrates 8 years of broadcasting in Bulawayo" : 
                     "Breeze FM expands transmission reach to Hwange rural areas"}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 mb-4">
                    Stay updated with the latest corporate developments and regional milestones from our stations.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
                    <Clock size={12} /> March 29, 2026
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const StationsView = ({ setView }: { setView: (v: View) => void }) => (
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
      {Object.values(STATIONS).map((station, idx) => (
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

const StationDetailView = ({ station, playStation, onImageSelect }: { station: Station, playStation: (id: string) => void, onImageSelect: (image: GalleryImage) => void }) => (
  <div className="pb-20">
    {/* Header */}
    <div className="relative h-screen min-h-[500px] bg-slate-800 dark:bg-slate-950 overflow-hidden transition-colors duration-500">
      <img src={station.image} className="absolute inset-0 w-full h-full object-cover opacity-50" />
      <div className="absolute inset-0 flex items-center px-6 md:px-12">
        <div className="max-w-4xl">
          <div className="bg-[#F58220] text-white px-4 py-1 rounded-full text-xs font-bold w-fit mb-4">{station.freq}</div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter mb-4">{station.name}</h1>
          <p className="text-lg text-white/90 font-medium italic mb-8">"{station.tagline}"</p>
          <button
            onClick={() => playStation(station.id)}
            className="bg-[#20388F] text-white px-10 py-4 rounded-full font-bold hover:bg-[#1a2d73] transition-all shadow-xl flex items-center gap-2"
          >
            <Play size={20} fill="currentColor" /> Listen Live
          </button>
        </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 md:mt-20 grid lg:grid-cols-3 gap-10 md:gap-16">
      {/* Main Info */}
      <div className="lg:col-span-2 space-y-20">
        <section>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-8">
            <div>
              <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-3 transition-colors">
                <Star className="text-[#F58220]" /> {station.name} Gallery
              </h2>
              <p className="text-slate-500 dark:text-slate-400 max-w-2xl transition-colors">
                A visual snapshot of the presenters, studio atmosphere, and community energy shaping {station.name}.
              </p>
            </div>
            <div className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">
              {station.gallery.length} photos
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3 auto-rows-[160px] sm:auto-rows-[180px]">
            {station.gallery.map((image, index) => (
              <motion.button
                key={image.src}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                onClick={() => onImageSelect(image)}
                type="button"
                className={`group relative overflow-hidden rounded-[28px] border border-slate-100 bg-slate-50 shadow-sm dark:border-slate-800 dark:bg-slate-900 ${index === 0 ? 'md:col-span-2 md:row-span-2 min-h-[280px]' : index === station.gallery.length - 1 && station.gallery.length % 2 === 0 ? 'md:col-span-2' : ''
                  } text-left cursor-zoom-in`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="text-[11px] font-black uppercase tracking-[0.3em] text-white/60">
                    {station.id === 'skyz' ? 'Skyz Metro FM' : 'Breeze FM'}
                  </div>
                  <div className="mt-2 text-lg font-bold text-white">{image.caption}</div>
                  <div className="mt-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
                    Tap to view full size
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-8 flex items-center gap-3 transition-colors">
            <Clock className="text-[#F58220]" /> Program Schedule
          </h2>
          <div className="space-y-4">
            {station.shows.map((show, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-slate-50 dark:bg-slate-900 p-6 rounded-lg border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:bg-white dark:hover:bg-slate-800 hover:shadow-md transition-all"
              >
                <div>
                  <div className="text-[#20388F] dark:text-[#F58220] font-bold text-sm mb-1 transition-colors">{show.time}</div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-1 transition-colors">{show.name}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm transition-colors">{show.desc}</p>
                </div>
                <div className="flex items-center gap-3 bg-white dark:bg-slate-950 px-4 py-2 rounded-lg border border-slate-100 dark:border-slate-800 group-hover:border-[#20388F]/30 dark:group-hover:border-[#F58220]/30 transition-colors">
                  <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 dark:text-slate-500 transition-colors">
                    <Mic2 size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase transition-colors">Host</div>
                    <div className="text-sm font-bold text-slate-700 dark:text-slate-200 transition-colors">{show.host}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-8 flex items-center gap-3 transition-colors">
            <Users className="text-[#F58220]" /> The On-Air Team
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {station.hosts.map((host, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center group cursor-pointer"
              >
                <div className="aspect-square bg-slate-50 dark:bg-slate-900 rounded-lg mb-4 overflow-hidden border-2 border-transparent group-hover:border-[#20388F] dark:group-hover:border-[#F58220] transition-all">
                  <div className="w-full h-full flex items-center justify-center text-slate-300 dark:text-slate-600 transition-colors">
                    <Users size={40} />
                  </div>
                </div>
                <h4 className="font-bold text-slate-800 dark:text-slate-100 transition-colors">{host}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 transition-colors">Broadcaster</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* Sidebar */}
      <div className="space-y-10">
        <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-lg border border-slate-100 dark:border-slate-800 transition-colors">
          <h3 className="font-black text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2 transition-colors">
            <MapPin size={20} className="text-[#F58220]" /> Station Location
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed transition-colors">
            {station.id === 'skyz' ?
              "Broadcasting live from the heart of the City of Kings, Skyz Metro FM serves Bulawayo and the surrounding Matabeleland regions." :
              "Broadcasting from the majestic Victoria Falls, Breeze FM serves the Hwange district and the resort town's vibrant tourism community."
            }
          </p>
          <div className="flex items-center gap-2 text-sm font-bold text-[#20388F] dark:text-[#F58220] cursor-pointer hover:underline transition-colors">
            <Map size={16} /> View coverage map
          </div>
        </div>

        <div className="bg-[#20388F] dark:bg-slate-900 p-8 rounded-lg text-white shadow-xl transition-colors duration-500">
          <div className="flex justify-center mb-6">
            <BrandLogo compact className="w-full max-w-[260px] justify-center border-white/15 bg-white/10 dark:border-slate-700/80 dark:bg-slate-950/80" />
          </div>
          <h3 className="font-black mb-4 text-center text-slate-100">Advertise With Us</h3>
          <p className="text-white/80 dark:text-slate-400 text-sm mb-6 leading-relaxed text-center transition-colors">
            Connect your brand with the most engaged audience in the region. We offer customized advertising slots and sponsorships.
          </p>
          <button className="w-full bg-[#F58220] py-3 rounded-full font-bold text-sm hover:bg-[#d9721b] transition-colors shadow-lg">
            Get Rate Card
          </button>
        </div>
      </div>
    </div>
  </div>
);

const AboutView = () => (
  <div className="max-w-5xl mx-auto px-6 md:px-12 py-20 space-y-24">
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="text-center"
    >
      <div className="flex justify-center mb-12">
        <BrandLogo className="mx-auto" />
      </div>
      <h1 className="text-6xl font-black text-slate-800 dark:text-slate-100 mb-8 tracking-tighter transition-colors">Our Legacy</h1>
      <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl mx-auto transition-colors">
        Fairtalk Communications was built on the foundation of authentic storytelling. Co-founded by the legendary cultural pioneer <strong>Cont Mhlanga</strong>, our mission has always been to represent the voices of Zimbabwe's vibrant regions.
      </p>
    </motion.section>

    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="grid md:grid-cols-2 gap-16 items-center"
    >
      <div className="aspect-[4/5] bg-slate-50 dark:bg-slate-900 rounded-lg overflow-hidden relative shadow-xl border border-slate-100 dark:border-slate-800 transition-colors">
        <div className="absolute inset-0 flex items-center justify-center text-slate-200 dark:text-slate-800 transition-colors">
          <Users size={80} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-slate-900 to-transparent text-white">
          <h4 className="font-bold text-xl text-slate-100">Cont Mhlanga</h4>
          <p className="text-sm opacity-80 text-slate-300">Founder & Cultural Icon</p>
        </div>
      </div>
      <div className="space-y-8">
        <h2 className="text-4xl font-black text-slate-800 dark:text-slate-100 transition-colors">A Vision for Local Voices</h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed transition-colors">
          Before Skyz Metro FM, Bulawayo lacked a dedicated commercial radio voice. Our launch in 2016 broke new ground, providing a platform for local artists, Ndebele culture, and community-driven news.
        </p>
        <div className="space-y-4">
          <motion.div
            whileHover={{ x: 10 }}
            className="flex gap-4 items-start"
          >
            <div className="w-10 h-10 rounded-full bg-[#F58220]/10 flex items-center justify-center text-[#F58220] flex-shrink-0"><Shield size={20} /></div>
            <div>
              <h4 className="font-bold text-slate-800 dark:text-slate-100 transition-colors">Cultural Integrity</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 transition-colors">Preserving and promoting the languages and traditions of the region.</p>
            </div>
          </motion.div>
          <motion.div
            whileHover={{ x: 10 }}
            className="flex gap-4 items-start"
          >
            <div className="w-10 h-10 rounded-full bg-[#20388F]/10 flex items-center justify-center text-[#20388F] dark:text-[#F58220] flex-shrink-0 transition-colors"><Headphones size={20} /></div>
            <div>
              <h4 className="font-bold text-slate-800 dark:text-slate-100 transition-colors">Media Excellence</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 transition-colors">Delivering high-quality broadcasting with state-of-the-art technology.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>

    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="bg-slate-50 dark:bg-slate-900 p-12 rounded-lg border border-slate-100 dark:border-slate-800 text-center shadow-sm transition-colors duration-500"
    >
      <h3 className="text-2xl font-black text-[#20388F] dark:text-[#F58220] mb-4 transition-colors">Innovation & Growth</h3>
      <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto transition-colors">
        Fairtalk Communications continues to expand its reach and innovate in the digital media space, bringing cutting-edge broadcasting solutions to the Matabeleland and Victoria Falls regions.
      </p>
    </motion.section>
  </div>
);

const NewsView = () => {
  const news = [
    {
      id: 1,
      category: "CORPORATE",
      title: "Fairtalk Communications Outlines 5-Year Digital Transformation Roadmap",
      date: "March 25, 2026",
      excerpt: "The media group is set to invest heavily in streaming technologies and interactive digital platforms to better serve its growing global audience.",
      image: "/images/corporate_growth.png"
    },
    {
      id: 2,
      category: "REGIONAL",
      title: "Skyz Metro FM Announces 2026 'Soul of the City' Music Awards",
      date: "March 20, 2026",
      excerpt: "Bulawayo's premier radio station is set to honor local artists who have dominated the airwaves over the past year.",
      image: "/images/music_awards.png"
    },
    {
      id: 3,
      category: "TOURISM",
      title: "Breeze FM to Host Victoria Falls Tourism Symposium",
      date: "March 15, 2026",
      excerpt: "In partnership with local stakeholders, Breeze FM will lead a discussion on the future of sustainable tourism in the Hwange district.",
      image: "/images/vic_falls_tourism.png"
    },
    {
      id: 4,
      category: "COMMUNITY",
      title: "Fairtalk News Expands Coverage in Matabeleland South",
      date: "March 10, 2026",
      excerpt: "New transmission infrastructure brings clear signals and local reporting to communities in Gwanda and Filabusi.",
      image: "/images/community_radio.png"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <BrandLogo className="mb-6" />
        <h1 className="text-5xl font-black text-slate-800 dark:text-slate-100 mb-4 tracking-tight transition-colors">Fairtalk News</h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg transition-colors">The definitive voice of the regions.</p>
      </motion.div>

      <div className="max-w-4xl space-y-12">
        <div className="space-y-12">
          {news.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group flex flex-col md:flex-row gap-8 bg-white dark:bg-slate-900 p-4 rounded-lg hover:shadow-xl transition-all border border-transparent hover:border-slate-100 dark:hover:border-slate-800"
            >
              <div className="w-full md:w-64 h-48 rounded-lg overflow-hidden flex-shrink-0">
                <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="flex-1 py-2">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] font-black bg-[#20388F]/10 dark:bg-[#F58220]/10 text-[#20388F] dark:text-[#F58220] px-2 py-1 rounded uppercase tracking-widest">{item.category}</span>
                  <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">{item.date}</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4 group-hover:text-[#F58220] transition-colors">{item.title}</h2>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6 transition-colors">{item.excerpt}</p>
                <button className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-[#20388F] dark:hover:text-[#F58220] transition-colors">
                  Read Full Story <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ContactView = () => (
  <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-20"
    >
      <h1 className="text-5xl font-black text-slate-800 dark:text-slate-100 mb-4 tracking-tight transition-colors">Connect With Us</h1>
      <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto transition-colors">
        Whether you're looking to advertise, share a story, or join our team, we're just a message away.
      </p>
    </motion.div>

    <div className="grid lg:grid-cols-2 gap-20">
      <div>
        <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-10 transition-colors">Our Offices</h2>
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex gap-6"
          >
            <div className="w-14 h-14 bg-slate-50 dark:bg-slate-900 rounded-lg flex items-center justify-center text-[#20388F] dark:text-[#F58220] flex-shrink-0 border border-slate-100 dark:border-slate-800 transition-colors">
              <MapPin size={28} />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-2 transition-colors">Bulawayo (HQ)</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed transition-colors">
                9th Floor, Pioneer House Corner 8th Avenue and Fife Street, Bulawayo, Zimbabwe
              </p>
              <p className="mt-4 font-bold text-[#F58220]">+263 9 881 100</p>
            </div>
          </motion.div>

          <div className="flex gap-6">
            <div className="w-14 h-14 bg-slate-50 dark:bg-slate-900 rounded-lg flex items-center justify-center text-[#20388F] dark:text-[#F58220] flex-shrink-0 border border-slate-100 dark:border-slate-800 transition-colors">
              <MapPin size={28} />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-2 transition-colors">Victoria Falls</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed transition-colors">
                Victoria Falls<br />
                Zimbabwe
              </p>
              <p className="mt-4 font-bold text-[#F58220]">+263 13 42100</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-slate-900 p-10 md:p-12 rounded-lg border border-slate-100 dark:border-slate-800 shadow-sm transition-colors duration-500">
        <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-8 transition-colors">Department Contacts</h2>
        
        <div className="space-y-4 mb-10">
          {/* Accordion 1: Skyz Metro FM */}
          <details className="group bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700 open:shadow-md transition-all">
            <summary className="flex items-center justify-between p-4 font-bold text-lg cursor-pointer text-slate-800 dark:text-slate-100 select-none">
              Skyz Metro FM
              <span className="text-[#F58220] group-open:rotate-180 transition-transform"><ChevronDown size={20} /></span>
            </summary>
            <div className="px-5 pb-5 space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-700 pb-2">
                <span className="font-bold">Marketing</span>
                <a href="#" className="text-[#20388F] dark:text-[#F58220] font-medium hover:underline">Contact Marketing</a>
              </div>
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-700 pb-2">
                <span className="font-bold">Administration</span>
                <a href="#" className="text-[#20388F] dark:text-[#F58220] font-medium hover:underline">Contact Admin</a>
              </div>
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-700 pb-2">
                <span className="font-bold">Studio</span>
                <a href="tel:+263774460100" className="text-[#20388F] dark:text-[#F58220] font-medium hover:underline">+263 77 446 0100</a>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold">Technical</span>
                <a href="#" className="text-[#20388F] dark:text-[#F58220] font-medium hover:underline">Contact Tech</a>
              </div>
            </div>
          </details>

          {/* Accordion 2: Breeze FM */}
          <details className="group bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700 open:shadow-md transition-all">
            <summary className="flex items-center justify-between p-4 font-bold text-lg cursor-pointer text-slate-800 dark:text-slate-100 select-none">
              Breeze FM
              <span className="text-[#F58220] group-open:rotate-180 transition-transform"><ChevronDown size={20} /></span>
            </summary>
            <div className="px-5 pb-5 space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-700 pb-2">
                <span className="font-bold">Administration</span>
                <a href="#" className="text-[#20388F] dark:text-[#F58220] font-medium hover:underline">Contact Admin</a>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold">Studio</span>
                <a href="#" className="text-[#20388F] dark:text-[#F58220] font-medium hover:underline">Contact Studio</a>
              </div>
            </div>
          </details>
        </div>

        <div className="space-y-4">
          <a
            href="https://whatsapp.com/channel/0029VaLvGjK9Gv7XF08UfE1p"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#25D366] text-white py-4 rounded-lg font-bold hover:bg-[#20bd5a] transition-all shadow-lg flex items-center justify-center gap-2"
          >
            Join Skyz Metro FM WhatsApp Channel <ExternalLink size={18} />
          </a>
          <a
            href="https://wa.me/263774460100"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-slate-800 dark:bg-white text-white dark:text-slate-900 py-4 rounded-lg font-bold hover:scale-[1.02] transition-all shadow-lg flex items-center justify-center gap-2"
          >
            App the Studio: +263 77 446 0100 <MessageCircle size={18} />
          </a>
        </div>
      </div>
    </div>
  </div>
);

const RadioPlayer = ({
  isPlaying,
  setIsPlaying,
  activeStationId,
  setActiveStationId,
  isPlayerVisible,
  setIsPlayerVisible
}: {
  isPlaying: boolean;
  setIsPlaying: (p: boolean) => void;
  activeStationId: string;
  setActiveStationId: (id: string) => void;
  isPlayerVisible: boolean;
  setIsPlayerVisible: (v: boolean) => void;
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    if (!isPlayerVisible) return;
    const timer = setInterval(() => setCurrentTime(new Date()), 60000); // update every minute clock
    return () => clearInterval(timer);
  }, [isPlayerVisible]);

  if (!isPlayerVisible) return null;
  const station = STATIONS[activeStationId] || STATIONS.skyz;

  const getCurrentAndNextShow = () => {
    const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

    // Map time to find current show
    for (let i = 0; i < station.shows.length; i++) {
        const show = station.shows[i];
        if (!show.time || !show.time.includes(' - ')) continue;
        const [startStr, endStr] = show.time.split(' - ');
        
        try {
          const [startH, startM] = startStr.split(':').map(Number);
          const [endH, endM] = endStr.split(':').map(Number);
          const startMins = startH * 60 + startM;
          let endMins = endH * 60 + endM;
          if (endMins < startMins) endMins += 24 * 60; // Overnight wrap-around

          if (currentMinutes >= startMins && currentMinutes < endMins) {
             return {
                currentShow: show, 
                nextShow: station.shows[i + 1] || station.shows[0]
             };
          }
        } catch(e) {}
    }

    // Default return if no exact time match (safe fallback for sparse schedule arrays)
    return {
       currentShow: station.shows[0],
       nextShow: station.shows[1] || station.shows[0]
    };
  };

  const calculateRunTime = (timeStr: string) => {
     if(timeStr === "AutoDJ") return "--";
     const [start, end] = timeStr.split(' - ');
     if(!start || !end) return "--";
     try {
       const [sh, sm] = start.split(':').map(Number);
       const [eh, em] = end.split(':').map(Number);
       let mins = (eh * 60 + em) - (sh * 60 + sm);
       if (mins < 0) mins += 24 * 60;
       const hrs = Math.floor(mins / 60);
       const remMins = mins % 60;
       return `${hrs}h ${remMins > 0 ? remMins + 'm' : ''}`;
     } catch (e) {
       return '--';
     }
  };

  const { currentShow, nextShow } = getCurrentAndNextShow();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] max-w-5xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.4)] border border-white/20 dark:border-slate-700 z-[150] overflow-hidden transition-all duration-500"
      >
        <div className="flex flex-col md:flex-row items-center p-5 md:p-6 gap-6 md:gap-8 border-b border-slate-100 dark:border-slate-800">
          {/* Cover/Logo with Pulse */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden flex-shrink-0 shadow-lg border border-slate-200 dark:border-white/10">
            <img src={station.image} className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'scale-110' : 'scale-100'}`} />
            {isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <div className="flex gap-1.5 items-end h-10">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-2 bg-[#F58220] rounded-full"
                      animate={{ height: ['20%', '100%', '40%', '80%', '20%'] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Info & Status */}
          <div className="flex-1 text-center md:text-left min-w-0">
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1.5 rounded-full bg-[#F58220]/10 border border-[#F58220]/20">
              <span className={`w-2.5 h-2.5 rounded-full ${isPlaying ? 'bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]' : 'bg-slate-400'}`}></span>
              <span className="text-[#F58220] text-xs font-black uppercase tracking-[0.2em]">{isPlaying ? 'Live on Air' : 'Radio Ready'}</span>
            </div>
            <h3 className="text-slate-800 dark:text-slate-100 font-black text-2xl truncate leading-tight tracking-tight mt-1 mb-1">{station.name}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm truncate font-bold uppercase tracking-wider">{station.freq} • {station.location}</p>

            {/* Quick Switch */}
            <div className="flex gap-3 mt-4 justify-center md:justify-start">
              {Object.values(STATIONS).map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveStationId(s.id)}
                  className={`text-[10px] sm:text-xs px-5 py-2 rounded-full font-black tracking-widest uppercase transition-all hover:scale-105 active:scale-95 ${activeStationId === s.id ? 'bg-[#20388F] dark:bg-[#F58220] text-white shadow-lg' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                >
                  {s.id}
                </button>
              ))}
            </div>
          </div>

          {/* Player Logic Visual */}
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <div className="flex flex-col items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#20388F] dark:bg-[#F58220] text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-2xl group"
              >
                {isPlaying ? <Pause size={36} fill="currentColor" /> : <Play size={36} fill="currentColor" className="ml-1.5" />}
              </button>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Play / Pause</span>
            </div>

            <button
              onClick={() => setIsPlayerVisible(false)}
              className="w-12 h-12 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all border border-transparent hover:border-red-200/50"
            >
              <X size={24} />
            </button>
          </div>
        </div>
        
        {/* Schedule Extension Segment */}
        <div className="grid md:grid-cols-2 gap-4 p-5 md:p-6 bg-slate-50/50 dark:bg-slate-900/50 rounded-b-2xl">
           {/* Current Show */}
           <div className="flex items-center gap-4 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm relative overflow-hidden group">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#20388F] dark:bg-[#F58220]"></div>
              <div className="w-14 h-14 rounded-full bg-blue-50 dark:bg-slate-700 flex items-center justify-center text-[#20388F] dark:text-[#F58220] flex-shrink-0">
                <Mic2 size={24} />
              </div>
              <div className="flex-1 min-w-0">
                 <div className="flex flex-wrap items-center gap-2 mb-1.5">
                   <span className="bg-[#20388F]/10 dark:bg-[#F58220]/10 text-[#20388F] dark:text-[#F58220] text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded text-nowrap">Now Playing</span>
                   <span className="text-slate-500 dark:text-slate-400 text-xs font-bold">{currentShow.time}</span>
                 </div>
                 <h4 className="font-bold text-slate-800 dark:text-slate-100 text-base truncate">{currentShow.name}</h4>
                 <p className="text-slate-500 dark:text-slate-400 text-sm truncate mt-0.5">with {currentShow.host}</p>
              </div>
           </div>
           
           {/* Next Show */}
           <div className="flex items-center gap-4 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm opacity-90 hover:opacity-100 transition-opacity group">
              <div className="w-14 h-14 rounded-full bg-slate-50 dark:bg-slate-700/50 flex items-center justify-center text-slate-400 dark:text-slate-500 flex-shrink-0">
                <Clock size={24} />
              </div>
              <div className="flex-1 min-w-0">
                 <div className="flex flex-wrap items-center gap-2 mb-1.5">
                   <span className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded text-nowrap">Up Next</span>
                   <span className="text-slate-500 dark:text-slate-400 text-xs font-bold">{nextShow.time.split(' - ')[0]} • Run Time: {calculateRunTime(nextShow.time)}</span>
                 </div>
                 <h4 className="font-bold text-slate-800 dark:text-slate-100 text-base truncate">{nextShow.name}</h4>
                 <p className="text-slate-500 dark:text-slate-400 text-sm truncate mt-0.5">with {nextShow.host}</p>
              </div>
           </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const ImageLightbox = ({ image, onClose }: { image: GalleryImage | null; onClose: () => void }) => {
  useEffect(() => {
    if (!image) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [image, onClose]);

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[260] bg-slate-950/92 px-4 py-6 sm:px-6 sm:py-8"
          onClick={onClose}
        >
          <div className="mx-auto flex h-full max-w-6xl flex-col">
            <div className="mb-4 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur hover:bg-white/15 transition-colors"
                aria-label="Close image viewer"
              >
                <X size={22} />
              </button>
            </div>
            <motion.div
              initial={{ scale: 0.96, y: 18 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.98, y: 12 }}
              transition={{ duration: 0.22 }}
              className="flex flex-1 items-center justify-center overflow-hidden rounded-[28px] border border-white/10 bg-black/40 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="max-h-full max-w-full object-contain"
              />
            </motion.div>
            <div className="pt-4 text-center">
              <div className="text-lg font-bold text-white">{image.caption}</div>
              <div className="text-sm text-white/60">{image.alt}</div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Theme Toggle ---

const ThemeToggle = ({ theme, setTheme }: { theme: 'dark' | 'light', setTheme: (t: 'dark' | 'light') => void }) => (
  <button
    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    className="fixed bottom-4 right-4 md:bottom-10 md:right-10 z-[100] p-3 md:p-4 rounded-full bg-white dark:bg-slate-800 shadow-2xl border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:scale-110 transition-all active:scale-95 group"
    aria-label="Toggle Theme"
  >
    {theme === 'dark' ? <Sun size={24} className="group-hover:rotate-45 transition-transform md:w-7 md:h-7" /> : <Moon size={24} className="group-hover:-rotate-12 transition-transform md:w-7 md:h-7" />}
  </button>
);

// --- Main App ---

export default function App() {
  const [view, setView] = useState<View>('home');
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const [activeStationId, setActiveStationId] = useState('skyz');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

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
    return () => {
      audio.pause();
      audio.src = "";
    };
  }, [audio]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [theme]);

  return (
    <div className={`min-h-screen font-sans selection:bg-[#F58220] selection:text-white transition-colors duration-500 ${theme === 'dark' ? 'dark bg-black text-slate-100' : 'bg-white text-slate-900'}`}>
      <Navbar
        setView={setView}
        currentView={view}
        playStation={playStation}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white dark:bg-slate-950 z-[200] flex flex-col md:hidden"
          >
            <div className="flex justify-between items-center gap-4 p-4 sm:p-6 border-b border-slate-100 dark:border-slate-800">
              <BrandLogo compact className="max-w-[180px] sm:max-w-[220px]" />
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors"
              >
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
                  <span className={`text-4xl sm:text-5xl font-black block transition-all ${view === item.view ? 'text-[#F58220] translate-x-4' : 'text-slate-800 dark:text-slate-100 group-hover:translate-x-2'}`}>
                    {item.label}
                  </span>
                </motion.button>
              ))}
            </div>

            <div className="p-6 sm:p-10 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <button
                onClick={() => { playStation('skyz'); setIsMenuOpen(false); }}
                className="w-full bg-[#20388F] text-white py-4 sm:py-5 rounded-lg text-base sm:text-lg font-bold flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-transform"
              >
                <Play fill="currentColor" /> Listen Live Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {view === 'home' && <HomeView setView={setView} playStation={playStation} />}
            {view === 'stations' && <StationsView setView={setView} />}
            {view === 'skyz' && <StationDetailView station={STATIONS.skyz} playStation={playStation} onImageSelect={setSelectedImage} />}
            {view === 'breeze' && <StationDetailView station={STATIONS.breeze} playStation={playStation} onImageSelect={setSelectedImage} />}
            {view === 'about' && <AboutView />}
            {view === 'news' && <NewsView />}
            {view === 'contact' && <ContactView />}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer setView={setView} />

      <RadioPlayer
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        activeStationId={activeStationId}
        setActiveStationId={setActiveStationId}
        isPlayerVisible={isPlayerVisible}
        setIsPlayerVisible={setIsPlayerVisible}
      />

      <ThemeToggle theme={theme} setTheme={setTheme} />
      <ImageLightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
    </div>
  );
}
