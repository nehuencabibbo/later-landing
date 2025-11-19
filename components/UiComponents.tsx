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
        className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 mb-4 py-2"
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