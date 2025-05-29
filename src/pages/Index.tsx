import React from 'react';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { SocialLinks } from '@/components/profile/SocialLinks';
import { CTALink } from '@/components/profile/CTALink';
import { VenturesList } from '@/components/profile/VenturesList';
import { AboutMe } from '@/components/profile/AboutMe';
import { YouTubeSection } from '@/components/profile/YouTubeSection';
import { NewsletterSection } from '@/components/profile/NewsletterSection';
import { Footer } from '@/components/profile/Footer';

const socialLinks = [
  { 
    icon: '/x.svg', 
    url: 'https://x.com/SaljugMahmudlu', 
    label: 'X (Twitter)',
    platform: 'twitter'
  },
  { 
    icon: '/insta.svg', 
    url: 'https://instagram.com/saljugmahmudlu', 
    label: 'Instagram',
    platform: 'instagram'
  },
  { 
    icon: '/linkedin.svg', 
    url: 'https://www.linkedin.com/in/saljug/', 
    label: 'LinkedIn',
    platform: 'linkedin'
  },
  { 
    icon: '/youtube.svg', 
    url: 'https://youtube.com/@saljugmahmudlu', 
    label: 'YouTube',
    platform: 'youtube'
  },
  { 
    icon: '/product hunt.svg', 
    url: 'https://www.producthunt.com/@saljug', 
    label: 'Product Hunt',
    platform: 'producthunt'
  },
];

const ventures = [
  {
    title: 'LinkStash',
    description: 'Save and organize your favorite links with ease',
    icon: '/linkstash.png',
    url: 'https://chromewebstore.google.com/detail/ddbofibekoclogkfacijfpaadbldmpgj?utm_source=item-share-cb',
  },
  {
    title: 'MahmFormula',
    description: 'Rev up your passion for F1',
    icon: '/mahmformula.png',
    url: 'https://mahmformula.com',
  },
];

const aboutMeData = {
  bio: [
    "I am a designpreneur who turns design ideas into SaaS businesses. As the founder of MahmFormula.com, I've driven over 30 million views and sold to customers in 20+ countries (Asia, Africa, N&S America, Europe, and Australia)",
    "I also created productivity extension that saves your links to never lose again.",
    "I love \"creating\""
  ],
  skills: [
    { name: 'Figma', icon: 'solar:figma-bold' },
    { name: 'Photoshop', icon: '/photoshop.png' },
    { name: 'Premiere Pro', icon: '/premiere.png' },
    { name: 'UI Design', icon: 'solar:pallete-2-bold' },
    { name: 'Branding', icon: 'solar:bookmark-bold' },
  ],
  currentFocus: [
    "Building AI-powered productivity tools that integrate seamlessly into daily workflows",
    "Exploring the intersection of browser extensions and artificial intelligence",
    "Creating educational content about startup building and product development",
    "Mentoring aspiring entrepreneurs and sharing lessons learned from my journey"
  ]
};

export default function Index() {
  return (
    <div className="bg-black overflow-hidden">
      <main className="flex w-full flex-col items-center justify-center p-4 max-md:max-w-full">
        <div className="flex w-full max-w-[1440px] flex-col overflow-visible items-center pt-[70px] pb-4 px-4 max-md:max-w-full">
          <div className="flex w-[560px] max-w-full flex-col items-stretch overflow-visible">
            <ProfileHeader
              name="Saljug Mahmudlu"
              description="i create useful stuffs for everyone"
              website="saljug.com"
              avatarUrl="/profile.jpg"
            />
            
            <SocialLinks links={socialLinks} />

            <div className="w-full mt-8 max-md:max-w-full">
              <CTALink
                title="Get Free Framer Template"
                subtitle="Professional landing page template"
                icon="solar:download-bold"
                href="https://framer.com/templates"
                isVisible={false}
              />
            </div>

            <VenturesList ventures={ventures} />

            <AboutMe 
              bio={aboutMeData.bio}
              skills={aboutMeData.skills}
              currentFocus={aboutMeData.currentFocus}
              showCurrentFocus={false}
            />

            <YouTubeSection 
              videoUrl="https://youtube.com/@saljugmahmudlu"
              videoTitle="Latest insights on startup building"
              isVisible={false}
            />

            <NewsletterSection />

            <Footer />
          </div>
        </div>
      </main>
    </div>
  );
}
