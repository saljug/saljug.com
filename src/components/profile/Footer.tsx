import React from 'react';
import { BlurFade } from '@/components/ui/blur-fade';

interface SocialLink {
  icon: string;
  url: string;
  label: string;
  platform: string;
}

interface FooterProps {
  socialLinks: SocialLink[];
  copyrightName?: string;
}

export const Footer: React.FC<FooterProps> = ({
  socialLinks,
  copyrightName = 'Saljug Mahmudlu',
}) => {
  const year = new Date().getFullYear();

  return (
    <BlurFade delay={0.1} duration={0.4} inView={true} inViewMargin="-80px">
      <footer
        className="flex items-center justify-between"
        style={{
          minHeight: 115,
          borderTop: '1px solid #171717',
        }}
      >
        {/* Social icons */}
        <div className="flex items-center" style={{ gap: 24 }}>
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="social-icon-link flex items-center justify-center"
            >
              <img
                src={link.icon}
                alt={link.label}
                width={20}
                height={20}
                className="social-icon-img block"
                style={{ width: 20, height: 20, objectFit: 'contain' }}
              />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <span
          style={{
            fontSize: 12,
            lineHeight: '16px',
            color: '#747474',
            fontFamily: '"Google Sans Flex", system-ui, sans-serif',
            fontWeight: 400,
          }}
        >
          © {year} {copyrightName}
        </span>
      </footer>
    </BlurFade>
  );
};
