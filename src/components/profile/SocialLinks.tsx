import React from 'react';
import { motion } from 'framer-motion';
import { BlurFade } from '@/components/ui/blur-fade';

interface SocialLink {
  icon: string;
  url: string;
  label: string;
  platform: string;
}

interface SocialLinksProps {
  links: SocialLink[];
  iconSize?: number;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({ links, iconSize = 20 }) => {
  return (
    <BlurFade delay={0.2} duration={0.4} inView={false}>
      <div className="flex items-center gap-5 sm:gap-6">
        {links.map((link, index) => (
          <motion.a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="social-icon-link flex items-center justify-center"
            whileTap={{ scale: 0.92 }}
          >
            <img
              src={link.icon}
              alt={link.label}
              width={iconSize}
              height={iconSize}
              className="social-icon-img block"
              style={{ width: iconSize, height: iconSize, objectFit: 'contain' }}
            />
          </motion.a>
        ))}
      </div>
    </BlurFade>
  );
};
