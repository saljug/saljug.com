import React from 'react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

interface Venture {
  title: string;
  description: string;
  icon: string;
  url: string;
}

interface VenturesListProps {
  ventures: Venture[];
}

export const VenturesList: React.FC<VenturesListProps> = ({ ventures }) => {
  return (
    <motion.section 
      className="w-full mt-8 max-md:mt-6 max-md:max-w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <motion.h2 
        className="text-white text-xl max-md:text-lg font-medium max-md:max-w-full px-4 max-md:px-0"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
      >
        Ventures
      </motion.h2>
      <div className="w-full mt-[18px] max-md:mt-4 max-md:max-w-full">
        {ventures.map((venture, index) => (
          <motion.a
            key={index}
            href={venture.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`bg-[rgba(21,21,21,1)] hover:bg-[rgba(31,31,31,1)] backdrop-blur-sm border border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.1)] transition-all duration-200 flex min-h-20 max-md:min-h-16 w-full items-center gap-[30px] max-md:gap-4 overflow-hidden justify-between flex-wrap pl-2 pr-6 max-md:pl-3 max-md:pr-4 rounded-3xl max-md:rounded-2xl max-md:max-w-full max-md:pr-5 group hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] ${
              index > 0 ? 'mt-3 max-md:mt-2' : ''
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 + index * 0.1 }}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="self-stretch flex min-w-60 max-md:min-w-0 items-center gap-6 max-md:gap-4 my-auto max-md:max-w-full flex-1">
              <div className="aspect-[1] w-16 h-16 max-md:w-12 max-md:h-12 self-stretch shrink-0 my-auto rounded-2xl max-md:rounded-xl bg-[rgba(31,31,31,1)] flex items-center justify-center group-hover:bg-[rgba(41,41,41,1)] transition-colors duration-200 p-1">
                <img
                  src={venture.icon}
                  alt={venture.title}
                  className="w-full h-full object-cover rounded-xl max-md:rounded-lg transition-all duration-200"
                />
              </div>
              <div className="self-stretch flex min-w-60 max-md:min-w-0 flex-col items-stretch justify-center w-[386px] max-md:w-auto my-auto flex-1 overflow-hidden">
                <div className="text-white text-xl max-md:text-lg font-bold group-hover:text-gray-200 transition-colors duration-200 truncate" title={venture.title}>
                  {venture.title}
                </div>
                <div className="text-[rgba(118,118,118,1)] text-base max-md:text-sm font-normal mt-1 group-hover:text-gray-300 transition-colors duration-200 truncate max-md:line-clamp-2" title={venture.description}>
                  {venture.description}
                </div>
              </div>
            </div>
            <Icon
              icon="solar:external-link-outline"
              className="w-6 h-6 max-md:w-5 max-md:h-5 text-[rgba(118,118,118,1)] group-hover:text-white transition-all duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 flex-shrink-0"
            />
          </motion.a>
        ))}
      </div>
    </motion.section>
  );
};
