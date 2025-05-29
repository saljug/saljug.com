import React from 'react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

interface CTALinkProps {
  title: string;
  subtitle: string;
  icon: string;
  href?: string;
  onClick?: () => void;
  isVisible?: boolean;
}

export const CTALink: React.FC<CTALinkProps> = ({
  title,
  subtitle,
  icon,
  href,
  onClick,
  isVisible = true
}) => {
  if (!isVisible) {
    return null;
  }

  const content = (
    <>
      <div className="self-stretch flex min-w-60 items-center gap-6 my-auto">
        <div className="aspect-[1] w-16 h-16 self-stretch shrink-0 my-auto rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center group-hover:from-purple-400 group-hover:to-blue-400 transition-all duration-200">
          <Icon
            icon={icon}
            className="w-8 h-8 text-white"
          />
        </div>
        <div className="self-stretch flex flex-col items-stretch justify-center my-auto">
          <div className="text-white text-xl font-bold group-hover:text-gray-200 transition-colors duration-200">
            {title}
          </div>
          <div className="text-[rgba(118,118,118,1)] text-base font-normal mt-1 group-hover:text-gray-300 transition-colors duration-200">
            {subtitle}
          </div>
        </div>
      </div>
      <Icon
        icon="solar:external-link-outline"
        className="w-6 h-6 text-[rgba(118,118,118,1)] group-hover:text-white transition-all duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
      />
    </>
  );

  const commonClasses = "bg-[rgba(21,21,21,1)] hover:bg-[rgba(31,31,31,1)] backdrop-blur-sm border border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.1)] transition-all duration-200 flex min-h-20 w-full items-center gap-[40px_100px] overflow-hidden justify-between flex-wrap pl-2 pr-6 rounded-3xl max-md:max-w-full max-md:pr-5 group hover:shadow-[0_8px_32px_rgba(0,0,0,0.2)]";

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={commonClasses}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        whileHover={{ y: -3, transition: { duration: 0.2 } }}
        whileTap={{ scale: 0.98 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={commonClasses}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.7 }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </motion.button>
  );
};
