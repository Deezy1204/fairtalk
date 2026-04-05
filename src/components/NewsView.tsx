import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ExternalLink, Radio, ArrowRight } from 'lucide-react';
import { BrandLogo } from './common/BrandLogo';

const NewsView = () => {
  const [selectedNews, setSelectedNews] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNews([
        {
          id: 1,
          source: "Skyz Metro FM",
          url: "https://skyzmetroradio.co.zw/2026/03/06/academies-urged-to-nurture-zimbabwes-future-football-stars/",
          category: "SPORTS",
          title: "Academies Urged to Nurture Zimbabwe’s Future Football Stars",
          date: "March 6, 2026",
          excerpt: "Youth football clubs directly impact developing talent and keeping young people away from the growing pandemic of drugs and substance abuse...",
          content: "Youth football clubs in the city have been encouraged to play a stronger role in developing talent and keeping young people away from the growing pandemic of drugs and substance abuse. Football academies can change the trajectory of talented youth and provide positive avenues.",
          image: "https://skyzmetroradio.co.zw/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-06-at-13.06.29.jpeg"
        },
        {
          id: 2,
          source: "Breeze FM",
          url: "https://breezefm.co.zw/un-tourism-and-zimbabwe-join-forces-to-drive-sustainability-and-womens-leadership-in-africa/",
          category: "NATIONAL NEWS",
          title: "UN Tourism and Zimbabwe Join Forces to Drive Sustainability and Women’s Leadership in Africa",
          date: "April 2, 2026",
          excerpt: "With just weeks to go before two landmark UN Tourism events, Zimbabwe has been declared fully ready to host the 23rd UN Tourism Committee...",
          content: "VICTORIA FALLS, Zimbabwe – With just weeks to go before two landmark UN Tourism events, Zimbabwe has been declared fully ready to host the 23rd UN Tourism Committee on Tourism and Sustainability (CTS) Meeting and the 2nd UN Tourism Regional Congress on Women Empowerment in Tourism in Africa.",
          image: "https://breezefm.co.zw/wp-content/uploads/2026/03/FB_IMG_1772720289293-1024x683.jpg"
        },
        {
          id: 3,
          source: "Breeze FM",
          url: "https://breezefm.co.zw/cimas-dental-outreach-transforms-oral-health-access-in-matabeleland/",
          category: "HEALTH",
          title: "Cimas Dental Outreach Transforms Oral Health Access in Matabeleland",
          date: "April 2, 2026",
          excerpt: "More than 1000 people across Zimbabwe’s Matabeleland region recently benefited from a life-changing two-week long dental outreach programme...",
          content: "More than 1000 people across Zimbabwe’s Matabeleland region recently benefited from a life-changing two-week long dental outreach programme led by Cimas Health Group, through its dental unit in a strong demonstration of corporate commitment to community health and wellness.",
          image: "https://breezefm.co.zw/wp-content/uploads/2026/04/IMG-20260402-WA0016.jpg"
        },
        {
          id: 4,
          source: "Skyz Metro FM",
          url: "https://skyzmetroradio.co.zw/2026/03/27/imiklomelo-kadakamela-partners-highlanders-for-centenary-celebrations/",
          category: "ARTS",
          title: "Imiklomelo kaDakamela Partners Highlanders for Centenary Celebrations",
          date: "March 27, 2026",
          excerpt: "The Imiklomelo kaDakamela Festival will this year partner with Highlanders Football Club as part of the club’s 100-year celebrations...",
          content: "The Imiklomelo kaDakamela Festival will this year partner with Highlanders Football Club as part of the club’s 100-year celebrations, in a move organisers say will add significance to the cultural event and broaden its appeal. Preparations for the festival are progressing smoothly, with organisers expressing confidence in delivering a successful event.",
          image: "https://skyzmetroradio.co.zw/wp-content/uploads/2026/03/649873592_122176310696837764_7371612983026079113_n.jpg"
        }
      ]);
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (selectedNews) {
    return (
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-24 min-h-screen">
        <button onClick={() => { setSelectedNews(null); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="flex items-center gap-2 text-slate-500 hover:text-[#F58220] transition-colors font-bold mb-8 group">
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
            <img src={selectedNews.image} className="w-full h-full object-cover" loading="lazy" />
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
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
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
            <p className="font-bold text-sm uppercase tracking-widest animate-pulse">Gathering regional updates...</p>
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
                  <img src={item.image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-full border border-white/20 uppercase tracking-wider z-10">
                    Via {item.source}
                  </div>
                </div>
                <div className="flex-1 py-2 pr-4 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-black bg-[#20388F]/10 dark:bg-[#F58220]/10 text-[#20388F] dark:text-[#F58220] px-3 py-1.5 rounded uppercase tracking-widest">{item.category}</span>
                    <span className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">{item.date}</span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-4 group-hover:text-[#F58220] transition-colors leading-snug">{item.title}</h2>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6 line-clamp-2">{item.excerpt}</p>
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

export default NewsView;
