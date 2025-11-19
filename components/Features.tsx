import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from './UiComponents';
import { BellRing, Laptop, Zap, Share2, Shuffle, ArrowRight } from 'lucide-react';
import { FeatureProps } from '../types';

const FeatureCard: React.FC<FeatureProps & { index: number; className?: string }> = ({ title, description, icon, index, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`p-8 rounded-3xl bg-neutral-900/50 border border-neutral-800 backdrop-blur-sm hover:bg-neutral-800/50 hover:border-brand-500/30 transition-colors group flex flex-col relative overflow-hidden ${className}`}
    >
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-white/5 shadow-lg">
        <div className="text-brand-500 group-hover:text-brand-400 transition-colors">
          {icon}
        </div>
      </div>
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      <p className="text-neutral-400 leading-relaxed text-lg">{description}</p>
      
      {/* Decorative gradient shine for larger cards */}
      {className.includes('col-span') && (
         <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-brand-600/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-brand-600/20 transition-colors" />
      )}
    </motion.div>
  );
};

const Features: React.FC = () => {
  const features = [
    {
      title: "Browser Extension",
      description: "One click to save from Chrome, Safari, or Firefox. It instantly syncs to your phone so you can close that tab guilt-free.",
      icon: <Laptop size={28} />,
      className: "md:col-span-1"
    },
    {
      title: "Smart Notifications",
      description: "Don't let bookmarks rot. Set a reminder for 'Tonight' or 'Next Weekend' and we'll ping you when the time is right.",
      icon: <BellRing size={28} />,
      className: "md:col-span-1"
    },
    {
      title: "Instant Sync",
      description: "What you save on desktop appears on mobile instantly. The seamless bridge between your work and leisure devices.",
      icon: <Zap size={28} />,
      className: "md:col-span-1"
    },
    {
      title: "Share Sheet Integration",
      description: "On mobile? Just tap 'Share' and select Later. We'll parse the content and queue a reminder for you.",
      icon: <Share2 size={28} />,
      className: "md:col-span-1"
    },
    {
      title: "Randomizer Widget",
      description: "Analysis paralysis? Add our floating widget to your home screen. Tap it to instantly open a random bookmark you've been meaning to read. It's serendipity, on demand.",
      icon: <Shuffle size={28} />,
      className: "md:col-span-2" // Spans 2 columns to be bigger
    }
  ];

  return (
    <section id="features" className="py-24 relative bg-neutral-950">
      <div className="container mx-auto px-6">
        <SectionTitle subtitle="A complete system to manage your digital attention.">
          Capture. Sync. Remind.
        </SectionTitle>
        
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <FeatureCard key={i} index={i} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;