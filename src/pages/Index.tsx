import React from 'react';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { SocialLinks } from '@/components/profile/SocialLinks';
import { VenturesList } from '@/components/profile/VenturesList';
import { Footer } from '@/components/profile/Footer';

const socialLinks = [
  {
    icon: '/icons/twitter.svg',
    url: 'https://x.com/SaljugMahmudlu',
    label: 'X (Twitter)',
    platform: 'twitter',
  },
  {
    icon: '/icons/instagram.svg',
    url: 'https://instagram.com/saljugmahmudlu',
    label: 'Instagram',
    platform: 'instagram',
  },
  {
    icon: '/icons/linkedin.svg',
    url: 'https://www.linkedin.com/in/saljug/',
    label: 'LinkedIn',
    platform: 'linkedin',
  },
  {
    icon: '/icons/producthunt.svg',
    url: 'https://www.producthunt.com/@saljug',
    label: 'Product Hunt',
    platform: 'producthunt',
  },
];

const ventures = [
  {
    title: 'Adject',
    description: 'AI studio for ad creatives, photoshoots, and brand visuals.',
    icon: '/adject-logo.png',
    iconBg: '#0540F2',
    url: 'https://adject.ai',
  },
];

export default function Index() {
  return (
    <div
      className="flex min-h-screen flex-col"
      style={{ background: '#0A0A0A' }}
    >
      <main
        className="mx-auto flex flex-1 flex-col"
        style={{
          maxWidth: 576,
          paddingTop: 64,
          paddingBottom: 64,
          paddingLeft: 24,
          paddingRight: 24,
          gap: 64,
        }}
      >
        {/* Profile info block */}
        <div className="flex flex-col" style={{ gap: 28 }}>
          <ProfileHeader
            name="saljug mahmudlu"
            subtitle="co-founder & ceo @ adject"
          />
          <SocialLinks links={socialLinks} iconSize={20} />
        </div>

        {/* Startups */}
        <VenturesList ventures={ventures} sectionLabel="Startups" />
      </main>

      {/* Footer at bottom */}
      <div className="mx-auto w-full" style={{ maxWidth: 576, paddingLeft: 24, paddingRight: 24 }}>
        <Footer socialLinks={socialLinks} copyrightName="Saljug Mahmudlu" />
      </div>
    </div>
  );
}
