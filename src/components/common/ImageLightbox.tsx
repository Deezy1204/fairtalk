import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { GalleryImage } from '../types';

interface ImageLightboxProps {
  image: GalleryImage | null;
  onClose: () => void;
}

export const ImageLightbox = ({ image, onClose }: ImageLightboxProps) => {
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
              <div className="text-sm text-white/40 tracking-widest uppercase font-black">Fairtalk Gallery</div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
