import React from 'react';
import { BlurFade } from '@/components/ui/blur-fade';
import { TextAnimate } from '@/components/ui/text-animate';

interface ProfileHeaderProps {
  name: string;
  subtitle: string;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name, subtitle }) => {
  return (
    <header className="flex flex-col items-start gap-7">
      <BlurFade delay={0} duration={0.4} inView={false}>
        <img
          src="/selcuk.png"
          alt={name}
          className="w-12 h-12 object-cover rounded-[12px]"
          style={{ display: 'block' }}
        />
      </BlurFade>

      <TextAnimate
        animation="blurInUp"
        by="character"
        as="h1"
        delay={0.08}
        duration={0.6}
        startOnView={false}
        once
        className="text-white font-bold leading-none tracking-tight"
        style={{ fontSize: 48, lineHeight: '48px', fontFamily: '"Google Sans Flex", system-ui, sans-serif' }}
      >
        {name}
      </TextAnimate>

      <TextAnimate
        animation="blurInUp"
        by="character"
        as="p"
        delay={0.2}
        duration={0.5}
        startOnView={false}
        once
        className="font-medium"
        style={{ fontSize: 20, lineHeight: '28px', color: '#747474', fontFamily: '"Google Sans Flex", system-ui, sans-serif' }}
      >
        {subtitle}
      </TextAnimate>
    </header>
  );
};
