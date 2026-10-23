import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { springFadeIn, slidePhotoVariants } from '../motion/variants';
import { cardInteractive, sectionIcon, sectionTitle } from '../lib/ui';

/**
 * Photos in: public/gallery/
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

function GalleryImage({ photo }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative w-full h-full">
      {/* Skeleton loader */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 z-10 animate-pulse bg-slate-200 dark:bg-slate-700/60" />
      )}

      <img
        src={photo.src}
        alt={photo.alt}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${hasError ? 'hidden' : 'block'}`}
      />

      {hasError && (
        <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-slate-500 dark:text-slate-300 px-2">
          {photo.label}
        </span>
      )}
    </div>
  );
}

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [direction, setDirection] = useState(0);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setSelectedIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  }, []);

  const goNext = useCallback(() => {
    setDirection(1);
    setSelectedIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  }, []);

  // Lightbox keyboard navigation (ArrowLeft, ArrowRight, Escape)
  useEffect(() => {
    if (selectedIndex === null) return;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedIndex(null);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selectedIndex, goPrev, goNext]);

  const currentPhoto = selectedIndex !== null ? photos[selectedIndex] : null;

  return (
    <>
      <motion.section
        id="gallery"
        className="mb-14"
        variants={springFadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <motion.div className="flex items-center gap-2 mb-4 group" variants={springFadeIn}>
          <Image className={sectionIcon} size={20} />
          <h3 className={sectionTitle}>Photo Gallery</h3>
        </motion.div>

        {/* Continuous auto-scrolling CSS marquee */}
        <div className="w-full overflow-x-hidden pl-7">
          <div className="gallery-marquee-track">
            {marqueePhotos.map((photo, index) => (
              <button
                key={`${photo.id}-${index}`}
                type="button"
                onClick={() => {
                  setDirection(0);
                  setSelectedIndex(index % photos.length);
                }}
                aria-label={`Open ${photo.alt}`}
                className={`gallery-marquee-item h-40 sm:h-44 shrink-0 overflow-hidden ${photo.color} ${cardInteractive} cursor-pointer p-0 text-left`}
              >
                <GalleryImage photo={photo} />
              </button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Lightbox Modal with directional sliding & arrow key navigation */}
      <AnimatePresence>
        {selectedIndex !== null && currentPhoto && (
          <motion.div
            className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelectedIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label={currentPhoto.alt}
          >
            <motion.div
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="relative z-10 flex flex-col items-center w-full max-w-[min(94vw,1000px)] max-h-[92vh] rounded-2xl bg-slate-900/90 border border-white/10 shadow-2xl p-4 overflow-hidden"
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with counter & close button */}
              <div className="flex items-center justify-between w-full pb-3 border-b border-white/10 shrink-0">
                <span className="text-sm font-medium text-slate-300">
                  {currentPhoto.alt}{' '}
                  <span className="text-xs text-slate-400">
                    ({selectedIndex + 1} / {photos.length})
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedIndex(null)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Main photo viewing area with slide + crossfade */}
              <div className="relative flex-1 w-full flex items-center justify-center my-3 overflow-hidden min-h-[300px] max-h-[68vh]">
                <AnimatePresence mode="popLayout" custom={direction} initial={false}>
                  <motion.img
                    key={currentPhoto.src}
                    src={currentPhoto.src}
                    alt={currentPhoto.alt}
                    custom={direction}
                    variants={slidePhotoVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="max-w-full max-h-[66vh] w-auto rounded-xl object-contain shadow-2xl border border-white/10"
                  />
                </AnimatePresence>

                {photos.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={goPrev}
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/85 hover:scale-110 active:scale-95 transition-all duration-200"
                      aria-label="Previous photo (Left Arrow)"
                    >
                      <ChevronLeft size={22} />
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/85 hover:scale-110 active:scale-95 transition-all duration-200"
                      aria-label="Next photo (Right Arrow)"
                    >
                      <ChevronRight size={22} />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Strip */}
              <div className="flex gap-2 overflow-x-auto pb-1 max-w-full shrink-0">
                {photos.map((photo, i) => (
                  <button
                    key={photo.id}
                    type="button"
                    onClick={() => {
                      setDirection(i > selectedIndex ? 1 : -1);
                      setSelectedIndex(i);
                    }}
                    className={`shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      i === selectedIndex
                        ? 'border-purple-400 ring-2 ring-purple-500/40 scale-105'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                    aria-label={`View photo ${i + 1}`}
                  >
                    <img
                      src={photo.src}
                      alt=""
                      className="w-16 h-12 object-cover"
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
