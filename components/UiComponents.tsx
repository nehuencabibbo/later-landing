import React from 'react';
import { motion } from 'framer-motion';

export const Button: React.FC<{ children: React.ReactNode; primary?: boolean; onClick?: () => void; className?: string }> = ({ children, primary = false, onClick, className = '' }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-8 py-3 rounded-full font-bold text-sm tracking-wide transition-all duration-300 ${
        primary
          ? 'bg-gradient-to-r from-brand-600 to-red-600 text-white shadow-[0_0_20px_rgba(225,29,72,0.5)] hover:shadow-[0_0_30px_rgba(225,29,72,0.7)] border border-transparent'
          : 'bg-transparent border border-white/20 text-white hover:bg-white/10 hover:border-white/40'
      } ${className}`}
    >
      {children}
    </motion.button>
  );
};

export const SectionTitle: React.FC<{ children: React.ReactNode; subtitle?: string }> = ({ children, subtitle }) => {
  return (
    <div className="mb-16 text-center">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 mb-4 py-2 px-4"
      >
        {children}
      </motion.h2>
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-neutral-400 max-w-xl mx-auto text-lg"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export const GradientBlob: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`absolute blur-[120px] opacity-30 pointer-events-none rounded-full bg-brand-600 mix-blend-screen ${className}`} />
);

export const LaterLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 60 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logo_grad" x1="0" y1="0" x2="60" y2="80" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#e11d48"/>
        <stop offset="100%" stopColor="#9f1239"/>
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.3"/>
      </filter>
    </defs>
    
    <g filter="url(#shadow)">
      {/* Main Body with Folded Corner cutout */}
      <path 
        d="M0 5C0 2.2 2.2 0 5 0H42L60 18V75C60 77.8 57.8 80 55 80H5C2.2 80 0 77.8 0 75V5Z" 
        fill="url(#logo_grad)"
      />
      
      {/* The dovetail cut at bottom */}
      <path d="M0 80 L30 65 L60 80 V80 H0 V80 Z" fill="#000" fillOpacity="0.01" style={{ mixBlendMode: 'destination-out' as any }} />
      <path d="M0 80 L30 65 L60 80" fill="none" /> {/* Just to ensure shape helps visualization */}

      {/* Folded Corner */}
      <path d="M42 0 V18 H60 L42 0Z" fill="white" fillOpacity="0.2" />
      <path d="M42 18 L60 18 L42 0" fill="black" fillOpacity="0.1" />

      {/* Stitching */}
      <path d="M8 8 V65" stroke="white" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.4" />
      <path d="M52 22 V65" stroke="white" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.4" />
      <path d="M8 8 H38" stroke="white" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.4" />

      {/* :A Symbol */}
      <g transform="translate(12, 58)">
         <circle cx="0" cy="0" r="1.5" fill="white" />
         <circle cx="0" cy="5" r="1.5" fill="white" />
         <path d="M8 5L11 -3L14 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
         <path d="M9.5 2.5H12.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    </g>
  </svg>
);