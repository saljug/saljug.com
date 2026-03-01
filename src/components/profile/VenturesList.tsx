import React from 'react';
import { motion } from 'framer-motion';
import { BlurFade } from '@/components/ui/blur-fade';

interface Venture {
  title: string;
  description: string;
  icon?: string;
  iconBg?: string;
  url: string;
}

interface VenturesListProps {
  ventures: Venture[];
  sectionLabel?: string;
}

export const VenturesList: React.FC<VenturesListProps> = ({
  ventures,
  sectionLabel = 'Startups',
}) => {
  return (
    <BlurFade delay={0} duration={0.45} inView={true} inViewMargin="-48px">
      <section className="flex flex-col" style={{ gap: 24 }}>
        <span
          className="font-semibold uppercase tracking-wider"
          style={{
            fontSize: 12,
            lineHeight: '16px',
            color: '#747474',
            fontFamily: '"Google Sans Flex", system-ui, sans-serif',
            letterSpacing: '0.06em',
          }}
        >
          {sectionLabel}
        </span>

        <div className="flex flex-col gap-3">
          {ventures.map((venture, index) => (
            <BlurFade
              key={index}
              delay={index * 0.08}
              duration={0.4}
              inView={true}
              inViewMargin="-32px"
            >
              <motion.a
                href={venture.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl transition-colors duration-150"
                style={{ padding: 14, background: '#121212' }}
                whileHover={{ backgroundColor: '#181818' }}
                whileTap={{ scale: 0.99 }}
              >
                {/* Icon */}
                <div
                  className="flex-shrink-0 flex items-center justify-center overflow-hidden"
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 6,
                    background: venture.iconBg ?? '#1a1a1a',
                  }}
                >
                  {venture.icon && (
                    <img
                      src={venture.icon}
                      alt={venture.title}
                      className="w-full h-full object-cover"
                      style={{ borderRadius: 6 }}
                    />
                  )}
                </div>

                {/* Text */}
                <div className="flex flex-col" style={{ gap: 2 }}>
                  <span
                    className="font-medium"
                    style={{
                      fontSize: 16,
                      lineHeight: '24px',
                      color: '#ffffff',
                      fontFamily: '"Google Sans Flex", system-ui, sans-serif',
                    }}
                  >
                    {venture.title}
                  </span>
                  <span
                    className="font-normal line-clamp-2"
                    style={{
                      fontSize: 14,
                      lineHeight: '20px',
                      color: '#747474',
                      fontFamily: '"Google Sans Flex", system-ui, sans-serif',
                    }}
                  >
                    {venture.description}
                  </span>
                </div>
              </motion.a>
            </BlurFade>
          ))}
        </div>
      </section>
    </BlurFade>
  );
};
