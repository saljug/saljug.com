import React from 'react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

interface YouTubeSectionProps {
  videoUrl?: string;
  videoTitle?: string;
  videoThumbnail?: string;
  isVisible?: boolean;
}

export const YouTubeSection: React.FC<YouTubeSectionProps> = ({ 
  videoUrl = "#", 
  videoTitle = "Latest Video",
  videoThumbnail,
  isVisible = true
}) => {
  if (!isVisible) {
    return null;
  }

  return (
    <motion.section 
      className="w-full font-medium mt-8 max-md:max-w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 2.0 }}
    >
      <div className="flex w-full items-center gap-[40px_100px] justify-between flex-wrap max-md:max-w-full">
        <motion.h2 
          className="text-white text-xl self-stretch my-auto bg-gradient-to-r from-white to-gray-300 bg-clip-text"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 2.1 }}
        >
          Latest Video
        </motion.h2>
        <motion.a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="self-stretch flex items-center gap-2 text-base text-[rgba(118,118,118,1)] my-auto hover:text-white transition-colors duration-300 group"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 2.1 }}
          whileHover={{ scale: 1.05 }}
        >
          <span className="self-stretch my-auto">View All</span>
          <Icon
            icon="solar:arrow-right-outline"
            className="w-4 h-4 transition-all duration-300 group-hover:translate-x-1"
          />
        </motion.a>
      </div>
      <motion.div 
        className="bg-[rgba(21,21,21,1)] backdrop-blur-sm border border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.1)] flex min-h-[315px] w-full mt-[18px] rounded-3xl max-md:max-w-full overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-[0_8px_32px_rgba(139,92,246,0.1)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2.2 }}
        whileHover={{ scale: 1.02 }}
        onClick={() => window.open(videoUrl, '_blank')}
      >
        {videoThumbnail ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <img 
              src={videoThumbnail} 
              alt={videoTitle}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-300">
              <div className="bg-red-600 rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                <Icon icon="solar:play-bold" className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <Icon 
                icon="solar:videocamera-record-bold" 
                className="w-16 h-16 text-[rgba(118,118,118,1)] mx-auto mb-4 group-hover:text-white transition-colors duration-300" 
              />
              <p className="text-[rgba(118,118,118,1)] text-lg group-hover:text-white transition-colors duration-300">
                Latest video coming soon
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </motion.section>
  );
};
