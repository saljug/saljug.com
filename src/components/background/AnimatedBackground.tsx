import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export const AnimatedBackground: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      };

      if (gridRef.current) {
        const offsetX = (mouseRef.current.x - 0.5) * 20;
        const offsetY = (mouseRef.current.y - 0.5) * 20;
        gridRef.current.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Animated Grid */}
      <div 
        ref={gridRef}
        className="absolute inset-0 opacity-[0.08] transition-transform duration-700 ease-out"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Static Floating Stars */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => {
          const baseX = Math.random() * 100;
          const baseY = Math.random() * 100;
          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white opacity-[0.10]"
              style={{
                left: `${baseX}%`,
                top: `${baseY}%`,
                clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                boxShadow: '0 0 3px rgba(255,255,255,0.5)',
              }}
              animate={{
                x: [-5, 5, -5],
                y: [-5, 5, -5],
                opacity: [0.10, 0.25, 0.10],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 8 + Math.random() * 6,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut"
              }}
            />
          );
        })}
      </div>

      {/* Subtle Gradient Overlay */}
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        animate={{
          background: [
            'linear-gradient(45deg, rgba(255,255,255,0.02) 0%, transparent 50%, rgba(255,255,255,0.01) 100%)',
            'linear-gradient(135deg, rgba(255,255,255,0.01) 0%, transparent 50%, rgba(255,255,255,0.02) 100%)',
            'linear-gradient(225deg, rgba(255,255,255,0.02) 0%, transparent 50%, rgba(255,255,255,0.01) 100%)',
            'linear-gradient(315deg, rgba(255,255,255,0.01) 0%, transparent 50%, rgba(255,255,255,0.02) 100%)',
            'linear-gradient(45deg, rgba(255,255,255,0.02) 0%, transparent 50%, rgba(255,255,255,0.01) 100%)'
          ]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
}; 