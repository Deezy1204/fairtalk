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
type View = 'home' | 'stations' | 'about' | 'news' | 'contact' | 'skyz' | 'breeze' | 'admin_login' | 'admin_dashboard';

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
    streamUrl: "https://radio.garden/api/ara/content/listen/gSEALGs7/channel.mp3",
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
    // Navbar activates when the corporate section's 'Our Story' button enters the top of the viewport
    const target = document.getElementById('corporate-section');
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(entry.isIntersecting),
      { root: null, rootMargin: '0px 0px -90% 0px', threshold: 0 }
    );
    observer.observe(target);
    return () => observer.disconnect();
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

      <div className="hidden lg:flex flex-1 justify-center pl-48 xl:pl-64 gap-16 xl:gap-24 text-black dark:text-white">
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
                    onClick={() => playStation('skyz')}
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
      <div id="corporate-section" className="relative z-10 bg-white dark:bg-black transition-colors duration-500 mt-[50svh] lg:mt-[45vh] pt-12 lg:pt-20 pb-24 shadow-[0_-50px_100px_rgba(0,0,0,0.1)]">

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

        {/* Radio Frequencies Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-6 md:px-12 mb-32"
        >
          <div className="bg-gradient-to-br from-slate-900 to-black rounded-[2rem] p-8 md:p-16 relative overflow-hidden shadow-2xl">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-[#20388F]/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-[#F58220]/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3"></div>

            <div className="relative z-10 grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tight">
                  Tune In To The <br />Heartbeat.
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed mb-8">
                  Experience premium broadcasting across the region. Connect with us on our frequencies to stay updated, entertained, and in sync with the community.
                </p>
                <div className="flex gap-4">
                  <span className="flex items-center gap-2 text-white font-bold bg-white/10 px-5 py-3 rounded-full backdrop-blur-sm border border-white/10 shadow-sm">
                    <Radio size={20} className="text-[#F58220]" /> Your Premium Stations
                  </span>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {/* Skyz Metro FM */}
                <div className="group relative bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors shadow-lg">
                  <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 text-white/5 pointer-events-none transition-transform duration-700 group-hover:scale-110">
                    <Radio size={120} />
                  </div>
                  <div className="relative z-10">
                    <div className="text-[#F58220] font-black uppercase tracking-widest text-xs mb-4">Bulawayo</div>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-6xl font-black text-white tracking-tighter">100.3</span>
                      <span className="text-xl font-bold text-white/50 tracking-widest">FM</span>
                    </div>
                    <div className="text-white font-bold text-lg">Skyz Metro FM</div>
                  </div>
                </div>

                {/* Breeze FM */}
                <div className="group relative bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors mt-0 sm:mt-12 shadow-lg">
                  <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 text-white/5 pointer-events-none transition-transform duration-700 group-hover:scale-110">
                    <Radio size={120} />
                  </div>
                  <div className="relative z-10">
                    <div className="text-[#20388F] sm:dark:text-[#F58220] font-black uppercase tracking-widest text-xs mb-4">Victoria Falls</div>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-6xl font-black text-white tracking-tighter">91.2</span>
                      <span className="text-xl font-bold text-white/50 tracking-widest">FM</span>
                    </div>
                    <div className="text-white font-bold text-lg">Breeze FM</div>
                  </div>
                </div>
              </div>
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
  const [selectedNews, setSelectedNews] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Simulated fetched data from skyzmetroradio.co.zw and breezefm.co.zw
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      setNews([
        {
          id: 1,
          source: "Skyz Metro FM",
          url: "https://skyzmetroradio.co.zw/2026/03/27/imiklomelo-kadakamela-partners-highlanders-for-centenary-celebrations/",
          category: "ARTS",
          title: "Imiklomelo kaDakamela Partners Highlanders for Centenary Celebrations",
          date: "March 27, 2026",
          excerpt: "The Imiklomelo kaDakamela Festival will this year partner with Highlanders Football Club as part of the club’s 100-year celebrations...",
          content: "The Imiklomelo kaDakamela Festival will this year partner with Highlanders Football Club as part of the club’s 100-year celebrations, in a move organisers say will add significance to the cultural event and broaden its appeal. Preparations for the festival are progressing smoothly, with organisers expressing confidence in delivering a successful event.",
          image: STATIONS.skyz.gallery[3]?.src || STATIONS.skyz.image
        },
        {
          id: 2,
          source: "Breeze FM",
          url: "https://breezefm.co.zw/empowering-the-future-ministry-of-tourism-launches-provincial-structures-for-women-and-youth/",
          category: "NEWS",
          title: "Ministry of Tourism Launches Provincial Structures for Women and Youth",
          date: "March 16, 2026",
          excerpt: "In a significant move to formalize and decentralize the tourism sector, the Ministry of Tourism held a provincial workshop in Victoria Falls.",
          content: "VICTORIA FALLS – In a significant move to formalize and decentralize the tourism sector, the Ministry of Tourism and Hospitality Industry held a high-stakes provincial workshop today, March 16, at the Kasambabezi Lodge. ​The one-day exercise, part of a broader nationwide mandate, successfully established the executive leadership for both the Women in Tourism and Youth structures.",
          image: STATIONS.breeze.gallery[1]?.src || STATIONS.breeze.image
        },
        {
          id: 3,
          source: "Skyz Metro FM",
          url: "https://skyzmetroradio.co.zw/2025/07/06/two-suspects-in-ecobank-heist-arrested-in-south-africa/",
          category: "NEWS",
          title: "Two Suspects in Ecobank Heist Arrested in South Africa",
          date: "July 6, 2025",
          excerpt: "The Zimbabwe Republic Police has confirmed the arrest of two key suspects linked to the US$4 million Ecobank armed robbery that shocked Bulawayo.",
          content: "The Zimbabwe Republic Police (ZRP) has confirmed the arrest of two key suspects linked to the US$4 million Ecobank armed robbery that shocked Bulawayo in October last year. Abraham Temayi Vumbunu and Elijah Temayi Vumbunu were arrested on 5 July in South Africa in connection with the high-profile heist.",
          image: STATIONS.skyz.gallery[4]?.src || STATIONS.skyz.image
        },
        {
          id: 4,
          source: "Breeze FM",
          url: "https://breezefm.co.zw/cimas-and-smilestar-foundation-bring-smiles-to-rural-zimbabwe/",
          category: "COMMUNITY",
          title: "Cimas and Smilestar Foundation Bring Smiles to Rural Zimbabwe",
          date: "March 13, 2026",
          excerpt: "The Smilestar Foundation, in partnership with Cimas Health Group and Victoria Falls Safari Lodge, has launched its free dental outreach program.",
          content: "VICTORIA FALLS, Zimbabwe – The Smilestar Foundation, in partnership with Cimas Health Group and Victoria Falls Safari Lodge, has launched its second annual free dental outreach program in Zimbabwe. The initiative, which began on March 9 at Mkhosana Clinic, has already provided critical dental care to over 700 patients in its first three days.",
          image: STATIONS.breeze.gallery[3]?.src || STATIONS.breeze.image
        }
      ]);
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (selectedNews) {
    return (
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-24 min-h-screen">
        <button onClick={() => setSelectedNews(null)} className="flex items-center gap-2 text-slate-500 hover:text-[#F58220] transition-colors font-bold mb-8 group">
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to News Hub
        </button>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-black bg-[#20388F]/10 dark:bg-[#F58220]/10 text-[#20388F] dark:text-[#F58220] px-3 py-1.5 rounded uppercase tracking-widest">{selectedNews.category}</span>
            <span className="text-sm text-slate-400 dark:text-slate-500 font-medium">{selectedNews.date}</span>
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-auto flex items-center gap-1.5">
              Source: <a href={selectedNews.url} target="_blank" rel="noreferrer" className="text-[#F58220] hover:underline flex items-center gap-1.5 bg-[#F58220]/10 px-3 py-1 rounded-full">{selectedNews.source} <ExternalLink size={14} /></a>
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 dark:text-slate-100 leading-tight tracking-tight">
            {selectedNews.title}
          </h1>
          <div className="w-full h-64 md:h-96 rounded-3xl overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800 relative">
            <img src={selectedNews.image} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            <p className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-200 indent-0 mb-8 border-l-4 border-[#F58220] pl-6 py-2 bg-slate-50 dark:bg-slate-900 rounded-r-lg">{selectedNews.excerpt}</p>
            <p>{selectedNews.content}</p>
            <div className="mt-12 p-6 bg-[#20388F]/5 dark:bg-[#F58220]/5 rounded-xl border border-[#20388F]/10 dark:border-[#F58220]/10 flex items-center gap-4">
              <Radio size={24} className="text-[#20388F] dark:text-[#F58220] flex-shrink-0" />
              <p className="m-0 font-bold text-slate-700 dark:text-slate-300 text-sm">For more breaking news, tune in to <span className="text-[#F58220]">{selectedNews.source}</span> on air or stream live online.</p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <BrandLogo className="mb-6" />
        <h1 className="text-5xl font-black text-slate-800 dark:text-slate-100 mb-4 tracking-tight transition-colors">Fairtalk News Hub</h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg transition-colors">
          Aggregating the definitive voice of the regions from <a href="https://skyzmetroradio.co.zw" target="_blank" rel="noreferrer" className="text-[#20388F] dark:text-[#F58220] font-bold hover:underline transition-colors">skyzmetroradio.co.zw</a> and <a href="https://breezefm.co.zw/" target="_blank" rel="noreferrer" className="text-[#20388F] dark:text-[#F58220] font-bold hover:underline transition-colors">breezefm.co.zw</a>
        </p>
      </motion.div>

      <div className="max-w-4xl space-y-12 relative min-h-[300px]">
        {loading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 gap-5 pt-20">
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="w-10 h-10 border-4 border-[#20388F]/20 dark:border-[#F58220]/20 border-t-[#20388F] dark:border-t-[#F58220] border-r-[#20388F] dark:border-r-[#F58220] rounded-full shadow-lg" />
            <p className="font-bold text-sm uppercase tracking-widest animate-pulse">Pulling feeds from network...</p>
          </div>
        ) : (
          <div className="space-y-10">
            {news.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group flex flex-col md:flex-row gap-8 bg-white dark:bg-slate-900 p-4 md:p-5 rounded-2xl hover:shadow-2xl transition-all border border-slate-100 dark:border-slate-800 cursor-pointer"
                onClick={() => setSelectedNews(item)}
              >
                <div className="w-full md:w-72 h-48 md:h-auto md:min-h-[220px] rounded-xl overflow-hidden flex-shrink-0 relative shadow-inner">
                  <img src={item.image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-full border border-white/20 uppercase tracking-wider drop-shadow-xl z-10">
                    Via {item.source}
                  </div>
                </div>
                <div className="flex-1 py-2 pr-4 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-black bg-[#20388F]/10 dark:bg-[#F58220]/10 text-[#20388F] dark:text-[#F58220] px-3 py-1.5 rounded uppercase tracking-widest">{item.category}</span>
                    <span className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">{item.date}</span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-4 group-hover:text-[#F58220] transition-colors leading-snug">{item.title}</h2>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6 transition-colors line-clamp-2">{item.excerpt}</p>
                  <button className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[#20388F] dark:text-slate-200 group-hover:text-[#F58220] transition-colors mt-auto">
                    Open Full Story <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ContactView = () => (
  <div className="max-w-4xl mx-auto px-6 md:px-12 py-20">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h1 className="text-5xl font-black text-slate-800 dark:text-slate-100 mb-4 tracking-tight transition-colors">Connect With Us</h1>
      <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto transition-colors">
        Whether you're looking to advertise, share a story, or join our team, we're just a message away.
      </p>
    </motion.div>

    <div className="bg-slate-50 dark:bg-slate-900 p-8 md:p-12 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xl transition-colors duration-500">
      <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-8 text-center transition-colors">Our Contacts</h2>

      <div className="space-y-6 mb-12">
        {/* Accordion 1: Skyz Metro FM */}
        <details className="group bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 open:shadow-md transition-all">
          <summary className="flex items-center justify-between p-5 md:p-6 font-black text-xl cursor-pointer text-slate-800 dark:text-slate-100 select-none">
            Skyz Metro FM
            <span className="text-black dark:text-white group-open:rotate-180 transition-transform"><ChevronDown size={24} /></span>
          </summary>
          <div className="px-5 md:px-6 pb-6 space-y-5 text-sm md:text-base text-slate-600 dark:text-slate-300">
            <div className="flex gap-4 items-start border-b border-slate-100 dark:border-slate-700 pb-5">
              <MapPin size={24} className="text-black dark:text-white flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-bold mb-1 text-slate-800 dark:text-slate-100">Headquarters</div>
                <p className="leading-relaxed">9th Floor, Pioneer House Corner 8th Avenue and Fife Street<br />Bulawayo, Zimbabwe</p>
                <div className="mt-3 flex items-center gap-2 font-bold text-black dark:text-white"><Phone size={16} /> +263 9 881 100</div>
              </div>
            </div>
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-700 pb-3">
              <span className="font-bold">Marketing</span>
              <a href="#" className="font-medium hover:underline text-black dark:text-white">Contact Marketing</a>
            </div>
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-700 pb-3">
              <span className="font-bold">Administration</span>
              <a href="#" className="font-medium hover:underline text-black dark:text-white">Contact Admin</a>
            </div>
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-700 pb-3">
              <span className="font-bold flex items-center gap-2"><Mic2 size={16} /> Studio</span>
              <a href="tel:+263774460100" className="font-medium hover:underline text-black dark:text-white">+263 77 446 0100</a>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-bold">Technical</span>
              <a href="#" className="font-medium hover:underline text-black dark:text-white">Contact Tech</a>
            </div>
          </div>
        </details>

        {/* Accordion 2: Breeze FM */}
        <details className="group bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 open:shadow-md transition-all">
          <summary className="flex items-center justify-between p-5 md:p-6 font-black text-xl cursor-pointer text-slate-800 dark:text-slate-100 select-none">
            Breeze FM
            <span className="text-black dark:text-white group-open:rotate-180 transition-transform"><ChevronDown size={24} /></span>
          </summary>
          <div className="px-5 md:px-6 pb-6 space-y-5 text-sm md:text-base text-slate-600 dark:text-slate-300">
            <div className="flex gap-4 items-start border-b border-slate-100 dark:border-slate-700 pb-5">
              <MapPin size={24} className="text-black dark:text-white flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-bold mb-1 text-slate-800 dark:text-slate-100">Victoria Falls Studio</div>
                <p className="leading-relaxed">Victoria Falls<br />Zimbabwe</p>
                <div className="mt-3 flex items-center gap-2 font-bold text-black dark:text-white"><Phone size={16} /> +263 13 42100</div>
              </div>
            </div>
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-700 pb-3">
              <span className="font-bold">Administration</span>
              <a href="#" className="font-medium hover:underline text-black dark:text-white">Contact Admin</a>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-bold flex items-center gap-2"><Mic2 size={16} /> Studio</span>
              <a href="#" className="font-medium hover:underline text-black dark:text-white">Contact Studio</a>
            </div>
          </div>
        </details>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <a
          href="https://whatsapp.com/channel/0029VaLvGjK9Gv7XF08UfE1p"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-black text-white dark:bg-white dark:text-black py-3 px-6 rounded-lg font-bold hover:scale-[1.02] transition-transform shadow-md flex items-center justify-center gap-2 text-sm"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg>
          Skyz WhatsApp Channel
        </a>
        <a
          href="https://whatsapp.com/channel/0029VaadoCxKbYMWUzg1ld1o"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-black text-white dark:bg-white dark:text-black py-3 px-6 rounded-lg font-bold hover:scale-[1.02] transition-transform shadow-md flex items-center justify-center gap-2 text-sm"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg>
          Breeze WhatsApp Channel
        </a>
        <a
          href="https://wa.me/263774460100"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 border-2 border-slate-200 dark:border-slate-700 hover:border-black dark:hover:border-white text-black dark:text-white py-3 px-6 rounded-lg font-bold hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center justify-center gap-2 text-sm"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg>
          App the Studio
        </a>
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
  setIsPlayerVisible,
  playStation
}: {
  isPlaying: boolean;
  setIsPlaying: (p: boolean) => void;
  activeStationId: string;
  setActiveStationId: (id: string) => void;
  isPlayerVisible: boolean;
  setIsPlayerVisible: (v: boolean) => void;
  playStation: (id: string) => void;
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
      } catch (e) { }
    }

    // Default return if no exact time match (safe fallback for sparse schedule arrays)
    return {
      currentShow: station.shows[0],
      nextShow: station.shows[1] || station.shows[0]
    };
  };

  const calculateRunTime = (timeStr: string) => {
    if (timeStr === "AutoDJ") return "--";
    const [start, end] = timeStr.split(' - ');
    if (!start || !end) return "--";
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
        className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] max-w-5xl bg-white dark:bg-black rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.3)] border border-black/10 dark:border-white/10 z-[150] overflow-hidden"
      >
        <div className="flex flex-row items-center justify-between p-4 md:p-6 gap-3 md:gap-6 border-b border-black/10 dark:border-white/10">
          {/* Cover & Info */}
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

            <div className="flex flex-col min-w-0 justify-center">
              <div className="inline-flex items-center gap-1.5 mb-1 sm:mb-2">
                <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]' : 'bg-slate-400'}`}></span>
                <span className="text-black dark:text-white text-[9px] sm:text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">{isPlaying ? 'Live on Air' : 'Radio Ready'}</span>
              </div>
              <h3 className="text-black dark:text-white font-black text-base sm:text-xl md:text-2xl truncate leading-tight tracking-tight">{station.name}</h3>
              <p className="text-black/50 dark:text-white/50 text-[10px] sm:text-xs md:text-sm truncate font-bold uppercase tracking-wider mt-0.5">{station.freq} • {station.location}</p>
            </div>
          </div>

          {/* Controls */}
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

        {/* Quick Switch (Scrollable Row) */}
        <div className="flex overflow-x-auto gap-2 px-4 md:px-6 py-3 border-b border-black/10 dark:border-white/10 scrollbar-hide">
          {Object.values(STATIONS).map((s) => (
            <button
              key={s.id}
              onClick={() => playStation(s.id)}
              className={`flex-shrink-0 text-[10px] sm:text-xs px-5 py-2 rounded-full font-black tracking-widest uppercase transition-all hover:scale-105 active:scale-95 ${activeStationId === s.id ? 'bg-black dark:bg-white text-white dark:text-black shadow-lg' : 'bg-black/5 dark:bg-white/5 text-black/60 dark:text-white/60 hover:bg-black/10 dark:hover:bg-white/10'}`}
            >
              {s.name}
            </button>
          ))}
        </div>

        {/* Schedule Extension Segment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 p-4 md:p-6 bg-black/[0.03] dark:bg-white/[0.03] rounded-b-2xl max-h-[45vh] lg:max-h-[55vh] overflow-y-auto">
          {/* Current Show */}
          <div className="flex items-center gap-3 md:gap-4 bg-white dark:bg-black p-3 md:p-4 rounded-xl border border-black/10 dark:border-white/10 shadow-sm relative overflow-hidden group">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-black dark:bg-white"></div>
            <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-black dark:text-white flex-shrink-0">
              <Mic2 size={20} className="md:w-6 md:h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 md:gap-2 mb-1">
                <span className="bg-black/10 dark:bg-white/10 text-black dark:text-white text-[9px] md:text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded text-nowrap">Now Playing</span>
                <span className="text-black/50 dark:text-white/50 text-[10px] md:text-xs font-bold">{currentShow.time}</span>
              </div>
              <h4 className="font-bold text-black dark:text-white text-sm md:text-base truncate">{currentShow.name}</h4>
              <p className="text-black/50 dark:text-white/50 text-xs md:text-sm truncate mt-0.5">with {currentShow.host}</p>
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
                <span className="text-black/50 dark:text-white/50 text-[10px] md:text-xs font-bold">{nextShow.time.split(' - ')[0]} • Run Time: {calculateRunTime(nextShow.time)}</span>
              </div>
              <h4 className="font-bold text-black dark:text-white text-sm md:text-base truncate">{nextShow.name}</h4>
              <p className="text-black/50 dark:text-white/50 text-xs md:text-sm truncate mt-0.5">with {nextShow.host}</p>
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

// --- Admin Views ---

const AdminLoginView = ({ setView }: { setView: (v: View) => void }) => (
  <div className="min-h-[80vh] flex items-center justify-center px-6">
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 w-full max-w-md">
      <div className="flex justify-center mb-8">
        <BrandLogo compact />
      </div>
      <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 text-center mb-8">Admin Portal</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Username</label>
          <input type="text" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-[#F58220]" placeholder="admin" />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Password</label>
          <input type="password" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-[#F58220]" placeholder="••••••••" />
        </div>
        <button onClick={() => setView('admin_dashboard')} className="w-full bg-[#F58220] hover:bg-[#F58220]/90 text-white font-black py-4 rounded-xl transition-colors shadow-lg shadow-[#F58220]/20">Login to Dashboard</button>
      </div>
    </motion.div>
  </div>
);

const AdminDashboardView = ({ setView }: { setView: (v: View) => void }) => {
  const [activeTab, setActiveTab] = useState<'shows' | 'gallery'>('shows');
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-32 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-2">Platform Admin</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage your radio shows, schedules, and gallery images.</p>
        </div>
        <button onClick={() => setView('home')} className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors bg-slate-100 dark:bg-slate-800 px-6 py-3 rounded-full">
          <X size={16} /> Logout
        </button>
      </div>

      <div className="flex gap-4 border-b border-slate-200 dark:border-slate-800 mb-8 overflow-x-auto pb-2">
        <button onClick={() => setActiveTab('shows')} className={`text-sm font-black uppercase tracking-widest px-4 py-2 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'shows' ? 'border-[#F58220] text-[#F58220]' : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'}`}>Manage Shows</button>
        <button onClick={() => setActiveTab('gallery')} className={`text-sm font-black uppercase tracking-widest px-4 py-2 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'gallery' ? 'border-[#F58220] text-[#F58220]' : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'}`}>Gallery Manager</button>
      </div>

      {activeTab === 'shows' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Live Shows</h2>
            <button className="bg-[#20388F] text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-[#20388F]/90 transition-colors shadow-lg shadow-[#20388F]/20">+ Add New Show</button>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm overflow-x-auto">
            <table className="w-full text-left min-w-[600px]">
              <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs font-black uppercase tracking-widest">
                <tr>
                  <th className="px-6 py-4">Station</th>
                  <th className="px-6 py-4">Show Name</th>
                  <th className="px-6 py-4">Host</th>
                  <th className="px-6 py-4">Schedule</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-[#F58220]">Skyz Metro FM</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-800 dark:text-slate-200">The Morning Drive</td>
                  <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">Taboka Nleya</td>
                  <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">06:00 - 09:00</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[#20388F] dark:text-[#F58220] text-xs font-bold mr-4 hover:underline">Edit</button>
                    <button className="text-red-500 text-xs font-bold hover:underline">Delete</button>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-[#20388F] dark:text-[#F58220]">Breeze FM</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-800 dark:text-slate-200">Kusile on Breeze</td>
                  <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">Stanley Dube</td>
                  <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">06:00 - 09:00</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[#20388F] dark:text-[#F58220] text-xs font-bold mr-4 hover:underline">Edit</button>
                    <button className="text-red-500 text-xs font-bold hover:underline">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {activeTab === 'gallery' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Image Gallery</h2>
            <button className="bg-[#20388F] text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-[#20388F]/90 transition-colors shadow-lg shadow-[#20388F]/20">+ Upload Image</button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-2xl relative group overflow-hidden border border-slate-200 dark:border-slate-700">
              <img src={STATIONS.skyz.gallery[0].src} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-4 gap-4 backdrop-blur-sm">
                <p className="text-white text-xs font-bold text-center translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{STATIONS.skyz.gallery[0].caption}</p>
                <div className="flex gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                  <button className="text-white bg-white/20 p-2 rounded-full hover:bg-white/40 backdrop-blur-md transition-colors text-xs font-bold uppercase border border-white/20">Edit</button>
                  <button className="text-white bg-red-500/80 p-2 rounded-full hover:bg-red-500 backdrop-blur-md transition-colors text-xs font-bold uppercase border border-white/20">Del</button>
                </div>
              </div>
            </div>
            <div className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-2xl relative group overflow-hidden border border-slate-200 dark:border-slate-700">
              <img src={STATIONS.breeze.gallery[1].src} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-4 gap-4 backdrop-blur-sm">
                <p className="text-white text-xs font-bold text-center translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{STATIONS.breeze.gallery[1].caption}</p>
                <div className="flex gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                  <button className="text-white bg-white/20 p-2 rounded-full hover:bg-white/40 backdrop-blur-md transition-colors text-xs font-bold uppercase border border-white/20">Edit</button>
                  <button className="text-white bg-red-500/80 p-2 rounded-full hover:bg-red-500 backdrop-blur-md transition-colors text-xs font-bold uppercase border border-white/20">Del</button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
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
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
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
            className="fixed inset-0 bg-white dark:bg-black z-[200] flex flex-col md:hidden"
          >
            <div className="flex justify-between items-center gap-4 p-4 sm:p-6 border-b border-black/10 dark:border-white/10">
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
            {view === 'admin_login' && <AdminLoginView setView={setView} />}
            {view === 'admin_dashboard' && <AdminDashboardView setView={setView} />}
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
        playStation={playStation}
      />

      <ThemeToggle theme={theme} setTheme={setTheme} />
      <ImageLightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
    </div>
  );
}
