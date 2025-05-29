import React from 'react';
import { motion } from 'framer-motion';

interface SocialLink {
  icon: string;
  url: string;
  label: string;
  platform: string;
}

interface SocialLinksProps {
  links: SocialLink[];
}

export const SocialLinks: React.FC<SocialLinksProps> = ({ links }) => {
  return (
    <motion.div 
      className="flex w-full items-center gap-[11px] max-md:gap-2 overflow-visible justify-center flex-wrap mt-6 max-md:mt-4 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      {links.map((link, index) => (
        <motion.div
          key={index}
          className="self-stretch flex min-h-[52px] max-md:min-h-[48px] flex-col items-stretch justify-center w-[52px] max-md:w-[48px] my-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.95 }}
          style={{ zIndex: 10 }}
        >
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-[52px] h-[52px] max-md:w-[48px] max-md:h-[48px] items-center overflow-visible justify-center rounded-xl max-md:rounded-lg bg-[rgba(21,21,21,1)] hover:bg-[rgba(31,31,31,1)] backdrop-blur-sm border border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.1)] transition-all duration-150 group relative"
            aria-label={link.label}
          >
            <img
              src={link.icon}
              alt={link.label}
              className="w-6 h-6 max-md:w-5 max-md:h-5 object-contain transition-all duration-150 group-hover:brightness-0 group-hover:invert"
            />
          </a>
        </motion.div>
      ))}
    </motion.div>
  );
};
