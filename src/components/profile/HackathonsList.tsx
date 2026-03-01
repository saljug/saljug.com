import React from 'react';
import { motion } from 'framer-motion';
import { BlurFade } from '@/components/ui/blur-fade';

interface Hackathon {
    title: string;
    date: string;
    icon?: string;
    iconBg?: string;
    url?: string;
}

interface HackathonsListProps {
    hackathons: Hackathon[];
    sectionLabel?: string;
}

export const HackathonsList: React.FC<HackathonsListProps> = ({
    hackathons,
    sectionLabel = 'Hackathons',
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
                    {hackathons.map((hackathon, index) => {
                        const Content = (
                            <motion.div
                                className="flex items-center gap-3 rounded-2xl p-3 transition-colors duration-150 sm:gap-4 sm:p-[14px]"
                                style={{ background: '#121212' }}
                                whileHover={{ backgroundColor: '#181818' }}
                                whileTap={{ scale: hackathon.url ? 0.99 : 1 }}
                            >
                                {/* Icon */}
                                <div
                                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-[6px] sm:h-12 sm:w-12 bg-white"
                                    style={{ background: hackathon.iconBg ?? '#fff' }}
                                >
                                    {hackathon.icon && (
                                        <img
                                            src={hackathon.icon}
                                            alt={hackathon.title}
                                            className="w-full h-full object-contain p-[2px]"
                                            style={{ borderRadius: 6 }}
                                        />
                                    )}
                                </div>

                                {/* Text */}
                                <div className="flex flex-col" style={{ gap: 2 }}>
                                    <span
                                        className="font-medium"
                                        style={{
                                            fontSize: 14,
                                            lineHeight: '20px',
                                            color: '#ffffff',
                                            fontFamily: '"Google Sans Flex", system-ui, sans-serif',
                                        }}
                                    >
                                        {hackathon.title}
                                    </span>
                                    <span
                                        className="font-normal"
                                        style={{
                                            fontSize: 13,
                                            lineHeight: '18px',
                                            color: '#747474',
                                            fontFamily: '"Google Sans Flex", system-ui, sans-serif',
                                        }}
                                    >
                                        {hackathon.date}
                                    </span>
                                </div>
                            </motion.div>
                        );

                        return (
                            <BlurFade
                                key={index}
                                delay={index * 0.08}
                                duration={0.4}
                                inView={true}
                                inViewMargin="-32px"
                            >
                                {hackathon.url ? (
                                    <a href={hackathon.url} target="_blank" rel="noopener noreferrer" className="block w-full">
                                        {Content}
                                    </a>
                                ) : (
                                    Content
                                )}
                            </BlurFade>
                        );
                    })}
                </div>
            </section>
        </BlurFade>
    );
};
