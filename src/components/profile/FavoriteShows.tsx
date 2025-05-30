import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

interface Show {
  title: string;
  type: 'Movie' | 'Series';
  coverUrl: string;
}

const favoriteShows: Show[] = [
  {
    title: 'Silicon Valley',
    type: 'Series',
    coverUrl: '/assets/siliconvalley.avif'
  },
  {
    title: 'Suits',
    type: 'Series',
    coverUrl: '/assets/suits.jpg'
  },
  {
    title: 'Super Pumped',
    type: 'Series',
    coverUrl: '/assets/superpumped.jpg'
  },
  {
    title: 'The Playlist',
    type: 'Series',
    coverUrl: '/assets/theplaylist.jpg'
  },
  {
    title: 'Tetris',
    type: 'Movie',
    coverUrl: '/assets/tetris.jpg'
  },
  {
    title: 'The Founder',
    type: 'Movie',
    coverUrl: '/assets/thefounder.jpg'
  }
];

export const FavoriteShows: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollPosition = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
  };

  // Calculate scroll distance for 3 movies at a time
  // Each movie: w-32 (128px) + gap-4 (16px) = 144px per movie
  // For 3 movies: 3 × 144px = 432px
  const scrollDistance = 432;

  const scrollLeft = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: -scrollDistance, behavior: 'smooth' });
    setTimeout(checkScrollPosition, 300);
  };

  const scrollRight = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: scrollDistance, behavior: 'smooth' });
    setTimeout(checkScrollPosition, 300);
  };

  return (
    <motion.section 
      className="w-full mt-8 max-md:mt-6 max-md:max-w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 2.4 }}
    >
      <div className="flex items-center justify-between mb-[18px] max-md:mb-4 px-4 max-md:px-0">
        <motion.h2 
          className="text-white text-xl max-md:text-lg font-medium"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 2.5 }}
        >
          Favorite Shows & Movies
        </motion.h2>
      </div>

      <motion.div 
        className="relative bg-[rgba(21,21,21,1)] backdrop-blur-sm border border-[rgba(255,255,255,0.05)] rounded-3xl max-md:rounded-2xl overflow-hidden p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 2.6 }}
      >
        {/* Container with navigation arrows */}
        <div className="relative">
          {/* Left Navigation Arrow */}
          {canScrollLeft && (
            <button
              onClick={scrollLeft}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-black/80 hover:bg-black/90 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            >
              <Icon icon="solar:arrow-left-bold" className="text-white text-sm" />
            </button>
          )}
          
          {/* Right Navigation Arrow */}
          {canScrollRight && (
            <button
              onClick={scrollRight}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-black/80 hover:bg-black/90 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            >
              <Icon icon="solar:arrow-right-bold" className="text-white text-sm" />
            </button>
          )}
          
          {/* Smooth edge gradients - larger and more seamless */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[rgba(21,21,21,1)] via-[rgba(21,21,21,0.7)] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[rgba(21,21,21,1)] via-[rgba(21,21,21,0.7)] to-transparent z-10 pointer-events-none" />
          
          {/* Horizontal Slider with padding for complete visibility */}
          <div 
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 pl-6 pr-6"
            onScroll={checkScrollPosition}
          >
            {favoriteShows.map((show, index) => (
              <motion.div
                key={show.title}
                className="group relative flex-shrink-0 w-32 aspect-[2/3] bg-[rgba(255,255,255,0.03)] rounded-xl overflow-hidden border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.2)] transition-all duration-300"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 2.7 + index * 0.1 }}
              >
                {/* Cover Image */}
                <div className="absolute inset-0">
                  <img
                    src={show.coverUrl}
                    alt={show.title}
                    className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div class="flex items-center justify-center h-full bg-gradient-to-br from-gray-800 to-gray-900">
                            <div class="text-center p-3">
                              <div class="text-white text-sm font-medium text-center">${show.title}</div>
                            </div>
                          </div>
                        `;
                      }
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}; 