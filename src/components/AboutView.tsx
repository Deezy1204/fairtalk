import React from 'react';
import { motion } from 'motion/react';
import { Users, Shield, Headphones } from 'lucide-react';
import { BrandLogo } from './common/BrandLogo';

export const AboutView = () => (
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
