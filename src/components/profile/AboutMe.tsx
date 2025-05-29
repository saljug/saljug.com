import React from 'react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

interface Skill {
  name: string;
  icon: string;
}

interface AboutMeProps {
  bio: string[];
  skills: Skill[];
  currentFocus: string[];
  showCurrentFocus?: boolean;
}

export const AboutMe: React.FC<AboutMeProps> = ({ bio, skills, currentFocus, showCurrentFocus = true }) => {
  return (
    <motion.section 
      className="w-full mt-8 max-md:mt-6 max-md:max-w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.2 }}
    >
      <motion.h2 
        className="text-white text-xl max-md:text-lg font-medium max-md:max-w-full px-4 max-md:px-0"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1.3 }}
      >
        About Me
      </motion.h2>
      
      <div className="w-full mt-[18px] max-md:mt-4 max-md:max-w-full space-y-6 max-md:space-y-4">
        {/* Bio Section */}
        <motion.div 
          className="bg-[rgba(21,21,21,1)] backdrop-blur-sm border border-[rgba(255,255,255,0.05)] rounded-3xl max-md:rounded-2xl p-6 max-md:p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.4 }}
        >
          {bio.map((paragraph, index) => (
            <motion.p
              key={index}
              className="text-[rgba(184,184,184,1)] text-base max-md:text-sm leading-relaxed mb-4 last:mb-0 max-md:mb-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.5 + index * 0.1 }}
            >
              {paragraph}
            </motion.p>
          ))}
        </motion.div>

        {/* Skills Section */}
        <motion.div 
          className="bg-[rgba(21,21,21,1)] backdrop-blur-sm border border-[rgba(255,255,255,0.05)] rounded-3xl max-md:rounded-2xl p-6 max-md:p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.6 }}
        >
          <h3 className="text-white text-lg max-md:text-base font-semibold mb-4 max-md:mb-3 flex items-center gap-2">
            <Icon icon="solar:star-bold" className="w-5 h-5 max-md:w-4 max-md:h-4 text-white" />
            Skills & Expertise
          </h3>
          <div className="flex flex-wrap gap-3 max-md:gap-2">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2 bg-[rgba(31,31,31,1)] hover:bg-[rgba(41,41,41,1)] px-4 max-md:px-3 py-2 max-md:py-1.5 rounded-xl max-md:rounded-lg border border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.1)] transition-all duration-200 group"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1.7 + index * 0.05 }}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
              >
                {skill.icon.startsWith('/') ? (
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className="w-4 h-4 max-md:w-3 max-md:h-3 object-contain transition-all duration-200 group-hover:brightness-0 group-hover:invert flex-shrink-0"
                  />
                ) : (
                  <Icon 
                    icon={skill.icon} 
                    className="w-4 h-4 max-md:w-3 max-md:h-3 text-[rgba(118,118,118,1)] group-hover:text-white transition-colors duration-200 flex-shrink-0" 
                  />
                )}
                <span className="text-[rgba(184,184,184,1)] text-sm max-md:text-xs group-hover:text-white transition-colors duration-200 truncate max-w-[100px] max-md:max-w-[80px]" title={skill.name}>
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Current Focus Section - Conditionally rendered */}
        {showCurrentFocus && (
          <motion.div 
            className="bg-[rgba(21,21,21,1)] backdrop-blur-sm border border-[rgba(255,255,255,0.05)] rounded-3xl max-md:rounded-2xl p-6 max-md:p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.8 }}
          >
            <h3 className="text-white text-lg max-md:text-base font-semibold mb-4 max-md:mb-3 flex items-center gap-2">
              <Icon icon="solar:target-bold" className="w-5 h-5 max-md:w-4 max-md:h-4 text-white" />
              Current Focus
            </h3>
            <ul className="space-y-2 max-md:space-y-1.5">
              {currentFocus.map((focus, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-3 max-md:gap-2 text-[rgba(184,184,184,1)]"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.9 + index * 0.1 }}
                >
                  <Icon 
                    icon="solar:arrow-right-outline" 
                    className="w-4 h-4 max-md:w-3 max-md:h-3 text-white mt-0.5 flex-shrink-0" 
                  />
                  <span className="text-sm max-md:text-xs leading-relaxed">{focus}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}; 