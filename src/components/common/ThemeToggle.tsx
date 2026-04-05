import React from 'react';
import { motion } from 'motion/react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  theme: 'dark' | 'light';
  setTheme: (t: 'dark' | 'light') => void;
}

export const ThemeToggle = ({ theme, setTheme }: ThemeToggleProps) => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    className="fixed top-24 right-6 md:right-12 z-[140] w-12 h-12 rounded-full bg-white dark:bg-black text-black dark:text-white border border-black/10 dark:border-white/10 flex items-center justify-center shadow-xl backdrop-blur-xl transition-all"
  >
    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
  </motion.button>
);
