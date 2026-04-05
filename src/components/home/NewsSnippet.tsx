import React from 'react';
import { motion } from 'motion/react';
import { Clock, ExternalLink } from 'lucide-react';
import { View } from '../../types';

interface NewsSnippetProps {
  setView: (v: View) => void;
}

export const NewsSnippet = ({ setView }: NewsSnippetProps) => {
  return (
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
  );
};
