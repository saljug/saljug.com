import React from 'react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

interface ProfileHeaderProps {
  name: string;
  description: string;
  website: string;
  avatarUrl: string;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  description,
  website,
  avatarUrl,
}) => {
  return (
    <motion.header 
      className="flex w-[560px] max-w-full flex-col items-stretch"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.img
        src={avatarUrl}
        alt={name}
        className="aspect-[1] object-cover w-[120px] h-[120px] max-md:w-[100px] max-md:h-[100px] self-center max-w-full rounded-3xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
        whileHover={{ y: -3 }}
        transition={{ duration: 0.15 }}
      />
      <div className="self-center flex w-[520px] max-w-full flex-col items-center mt-6 max-md:mt-4 px-4">
        <motion.h1 
          className="text-white text-[32px] max-md:text-[28px] font-bold text-center max-w-full"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {name}
        </motion.h1>
        <motion.p 
          className="text-[rgba(118,118,118,1)] text-2xl max-md:text-xl font-medium text-center mt-4 max-md:mt-3 max-w-full px-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <span className="md:hidden">
            i create useful things<br />for everyone
          </span>
          <span className="hidden md:inline">
            {description}
          </span>
        </motion.p>
        <motion.a 
          href="https://saljug.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-xl max-md:text-lg text-[rgba(118,118,118,1)] font-medium whitespace-nowrap text-center justify-center mt-4 max-md:mt-3 hover:text-white transition-colors duration-200 group max-w-full"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ y: -2 }}
        >
          <Icon
            icon="solar:link-outline"
            className="w-5 h-5 max-md:w-4 max-md:h-4 group-hover:text-white transition-colors duration-200 flex-shrink-0"
          />
          <span className="self-stretch my-auto truncate max-w-[200px] max-md:max-w-[150px]" title={website}>
            {website}
          </span>
        </motion.a>
      </div>
    </motion.header>
  );
};
