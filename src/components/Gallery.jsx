import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, X } from 'lucide-react';
import { fadeInUp } from '../motion/variants';
import { cardInteractive, sectionIcon, sectionTitle } from '../lib/ui';

/**
 * Add your photos to: public/gallery/
 * Recommended filenames (jpg, png, or webp):
 *   gallery-1.jpg … gallery-5.jpg
 */
const photos = [
  {
    id: 1,
    src: '/gallery/gallery-1.jpg',
    alt: 'Gallery photo 1',
    label: 'Photo 1',
    color: 'bg-rose-100 dark:bg-slate-800',
  },
  {
    id: 2,
    src: '/gallery/gallery-2.jpg',
    alt: 'Gallery photo 2',
    label: 'Photo 2',
    color: 'bg-orange-100 dark:bg-slate-800',
  },
  {
    id: 3,
    src: '/gallery/gallery-3.jpg',
    alt: 'Gallery photo 3',
    label: 'Photo 3',
    color: 'bg-emerald-100 dark:bg-slate-800',
  },
  {
    id: 4,
    src: '/gallery/gallery-4.jpg',
    alt: 'Gallery photo 4',
    label: 'Photo 4',
    color: 'bg-cyan-100 dark:bg-slate-800',
  },
  {
    id: 5,
    src: '/gallery/gallery-5.jpg',
    alt: 'Gallery photo 5',
    label: 'Photo 5',
    color: 'bg-fuchsia-100 dark:bg-slate-800',
  },
];

const marqueePhotos = [...photos, ...photos];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!selectedImage) return;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedImage(null);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selectedImage]);

  const selectedPhoto = photos.find((p) => p.src === selectedImage);

  return (
    <>
      <motion.section className="mb-14" variants={fadeInUp}>
        <motion.div className="flex items-center gap-2 mb-4 group" variants={fadeInUp}>
          <Image className={sectionIcon} size={20} />
          <h3 className={sectionTitle}>Photo Gallery</h3>
        </motion.div>

        <div className="w-full overflow-x-hidden pl-7">
          <div className="gallery-marquee-track">
            {marqueePhotos.map((photo, index) => (
              <button
                key={`${photo.id}-${index}`}
                type="button"
                onClick={() => setSelectedImage(photo.src)}
                aria-label={`Open ${photo.alt}`}
                className={`gallery-marquee-item h-40 sm:h-44 shrink-0 overflow-hidden ${photo.color} ${cardInteractive} cursor-pointer p-0 text-left`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.nextElementSibling;
                    if (fallback) fallback.classList.remove('hidden');
                  }}
                />
                <span className="hidden w-full h-full flex items-center justify-center text-sm font-medium text-slate-500 dark:text-slate-300 px-2">
                  {photo.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </motion.section>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelectedImage(null)}
            role="dialog"
            aria-modal="true"
            aria-label={selectedPhoto?.alt ?? 'Gallery image preview'}
          >
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="relative z-10 flex flex-col items-center max-w-[95vw] max-h-[90vh]"
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 sm:top-0 sm:-right-12 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium border border-white/20 transition-colors duration-300"
                aria-label="Close gallery image"
              >
                <X size={18} />
                Close
              </button>

              <img
                src={selectedImage}
                alt={selectedPhoto?.alt ?? 'Gallery preview'}
                className="max-w-full max-h-[85vh] w-auto rounded-xl shadow-2xl border border-white/10 object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
