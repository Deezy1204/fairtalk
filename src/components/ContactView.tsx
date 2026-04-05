import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, ChevronDown, Mic2 } from 'lucide-react';

export const ContactView = () => (
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
          WhatsApp the Studio
        </a>
      </div>
    </div>
  </div>
);
