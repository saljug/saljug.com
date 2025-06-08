import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

interface NewsletterSectionProps {
  isVisible?: boolean;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className={`fixed right-4 top-4 max-md:right-2 max-md:top-2 z-50 max-w-sm max-md:max-w-xs p-4 max-md:p-3 rounded-xl backdrop-blur-sm border shadow-lg ${
        type === 'success' 
          ? 'bg-green-900/90 border-green-700/50 text-green-100' 
          : 'bg-red-900/90 border-red-700/50 text-red-100'
      }`}
    >
      <div className="flex items-start gap-3 max-md:gap-2">
        <Icon 
          icon={type === 'success' ? 'solar:check-circle-bold' : 'solar:close-circle-bold'} 
          className="w-5 h-5 max-md:w-4 max-md:h-4 mt-0.5 flex-shrink-0"
        />
        <div className="flex-1">
          <p className="text-sm max-md:text-xs font-medium">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-current/70 hover:text-current transition-colors duration-200"
        >
          <Icon icon="solar:close-square-outline" className="w-4 h-4 max-md:w-3 max-md:h-3" />
        </button>
      </div>
    </motion.div>
  );
};

export const NewsletterSection: React.FC<NewsletterSectionProps> = ({ isVisible = true }) => {
  if (!isVisible) {
    return null;
  }

  const [email, setEmail] = useState('');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000); // Auto-close after 4 seconds
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if email is empty
    if (!email.trim()) {
      showNotification('Please enter your email address', 'error');
      return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showNotification('Please enter a valid email address', 'error');
      return;
    }
    
    // Handle newsletter subscription
    console.log('Subscribe:', email);
    showNotification('Successful! Thank you for subscribing to our newsletter.', 'success');
    setEmail(''); // Clear the input after successful subscription
  };

  return (
    <>
      <AnimatePresence>
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}
      </AnimatePresence>
      
      <motion.section 
        className="flex w-full flex-col items-stretch mt-8 max-md:mt-6 max-md:max-w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2.3 }}
      >
        <div className="bg-[rgba(21,21,21,1)] backdrop-blur-sm border border-[rgba(255,255,255,0.05)] rounded-3xl max-md:rounded-2xl p-6 max-md:p-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.4 }}
          >
            <h2 className="text-white text-xl max-md:text-lg font-bold leading-none flex items-center gap-2">
              <Icon icon="solar:letter-bold" className="w-6 h-6 max-md:w-5 max-md:h-5 text-white" />
          Subscribe to newsletter
        </h2>
            <p className="text-[rgba(118,118,118,1)] text-base max-md:text-sm font-medium leading-none mt-3 max-md:mt-2">
              Subscribe for exclusive updates, resources and more!
        </p>
          </motion.div>
          <motion.form
        onSubmit={handleSubmit}
            className="flex w-full gap-2.5 max-md:gap-2 text-sm text-white font-medium whitespace-nowrap leading-none flex-wrap mt-5 max-md:mt-4 max-md:max-w-full"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.5 }}
      >
            <div className="relative flex-1 min-w-60 max-md:min-w-full max-md:w-full">
              <Icon 
                icon="solar:letter-outline" 
                className="absolute left-4 max-md:left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 max-md:w-4 max-md:h-4 text-[rgba(118,118,118,1)]" 
              />
        <input
          type="email"
          placeholder="name@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[rgba(31,31,31,1)] border border-[rgba(255,255,255,0.05)] focus:border-[rgba(255,255,255,0.2)] min-h-[52px] max-md:min-h-[48px] overflow-hidden pl-12 max-md:pl-10 pr-4 max-md:pr-3 py-[21px] max-md:py-[18px] rounded-[10px] transition-all duration-200 focus:outline-none text-sm max-md:text-xs"
        />
            </div>
            <motion.button
          type="submit"
              className="self-stretch bg-[rgba(31,31,31,1)] hover:bg-[rgba(41,41,41,1)] border border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.1)] min-h-[52px] max-md:min-h-[48px] overflow-hidden w-[146px] max-md:w-full max-md:min-w-[120px] px-[18px] max-md:px-4 py-[21px] max-md:py-[18px] rounded-[10px] transition-all duration-200 flex items-center justify-center gap-2 group text-sm max-md:text-xs"
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Subscribe</span>
              <Icon 
                icon="solar:arrow-right-outline" 
                className="w-4 h-4 max-md:w-3 max-md:h-3 transition-transform duration-200 group-hover:translate-x-1" 
              />
            </motion.button>
          </motion.form>
        </div>
      </motion.section>
    </>
  );
};
