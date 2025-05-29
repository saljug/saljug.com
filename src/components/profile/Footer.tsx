import React from 'react';
import { motion } from 'framer-motion';

export const Footer: React.FC = () => {
  return (
    <motion.footer 
      className="flex flex-col items-center mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 2.6 }}
    >
      <div className="self-center flex w-[140px] max-w-full items-stretch justify-center py-4">
        <motion.div 
          className="min-h-0 w-[140px] border-[rgba(118,118,118,1)] border-solid border-[1px] opacity-30"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 2.7 }}
        />
      </div>
      <motion.div 
        className="self-center flex items-center gap-6 text-base font-medium justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.8 }}
      >
        <div className="self-stretch flex gap-1 my-auto">
          <span className="text-[rgba(118,118,118,1)]">Made by</span>
          <a 
            href="https://x.com/SaljugMahmudlu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-200 transition-colors duration-200"
          >
            Saljug Mahmudlu
          </a>
        </div>
      </motion.div>
    </motion.footer>
  );
};
