import React from 'react';
import { motion } from 'motion/react';
import { View } from '../types';
import { BrandLogo } from './common/BrandLogo';

interface AdminLoginProps {
  setView: (v: View) => void;
}

export const AdminLoginView = ({ setView }: AdminLoginProps) => (
  <div className="min-h-[80vh] flex items-center justify-center px-6">
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-black p-8 md:p-12 rounded-[2rem] shadow-2xl border border-black/10 dark:border-white/10 w-full max-w-md relative overflow-hidden text-black dark:text-white">
      <div className="flex justify-center mb-8">
        <BrandLogo compact />
      </div>
      <h2 className="text-2xl font-black text-center mb-8">Admin Portal</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold opacity-60 mb-2 font-mono uppercase tracking-widest text-[10px]">User Email</label>
          <input type="text" className="w-full bg-transparent border border-black/10 dark:border-white/10 rounded-xl px-5 py-4 text-black dark:text-white outline-none focus:border-[#F58220] transition-colors font-bold" placeholder="User Email" />
        </div>
        <div>
          <label className="block text-sm font-bold opacity-60 mb-2 font-mono uppercase tracking-widest text-[10px]">Password</label>
          <input type="password" className="w-full bg-transparent border border-black/10 dark:border-white/10 rounded-xl px-5 py-4 text-black dark:text-white outline-none focus:border-[#F58220] transition-colors font-bold" placeholder="••••••••" />
        </div>
        <button onClick={() => setView('admin_dashboard')} className="w-full bg-black dark:bg-white text-white dark:text-black font-black py-5 rounded-[2rem] transition-all shadow-xl hover:scale-[1.02] active:scale-98 uppercase tracking-[0.2em] text-[10px] mt-4">Initiate Session</button>
      </div>
    </motion.div>
  </div>
);
