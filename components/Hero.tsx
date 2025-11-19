import React from 'react';
import { motion } from 'framer-motion';
import { Button, GradientBlob } from './UiComponents';
import { ArrowRight, Smartphone, Monitor, Globe } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full h-screen flex items-center overflow-hidden">
      {/* Gradient Backgrounds */}
      <GradientBlob className="top-[-10%] left-[-10%] w-[500px] h-[500px] opacity-20 bg-brand-800" />
      <GradientBlob className="bottom-[-10%] right-[-10%] w-[600px] h-[600px] opacity-10 bg-purple-900" />

      <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center h-full">
        {/* Text Content */}
        <div className="text-left pt-20">
          
          {/* New Top Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-sm font-medium text-neutral-300 mb-8 hover:bg-white/10 transition-colors cursor-default"
          >
             <div className="flex gap-2 items-center border-r border-white/10 pr-3 mr-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                </span>
                <span className="text-white tracking-wide text-xs uppercase font-bold">Live Sync</span>
             </div>
             <span className="flex items-center gap-2 text-xs text-neutral-400">
                Available on iOS, Android & Chrome
             </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tight mb-6"
          >
            Don't just save it.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-600">Remind me Later.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-neutral-400 mb-8 max-w-lg leading-relaxed"
          >
            The bookmark manager that nags you (politely). Save links via our <strong>browser extension</strong>, sync to your phone instantly, and get notified when it's time to read.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button primary className="flex items-center justify-center gap-2 group">
              Get Extension & App <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button className="flex items-center justify-center gap-2">
              View How it Works
            </Button>
          </motion.div>
          
          {/* Trust / Platform Icons */}
          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.8, duration: 1 }}
             className="mt-12 flex items-center gap-6 text-neutral-600"
          >
             <div className="flex items-center gap-2" title="Mobile App">
                <Smartphone size={20} />
                <span className="text-xs font-semibold uppercase tracking-wider">Mobile</span>
             </div>
             <div className="w-1 h-1 bg-neutral-800 rounded-full" />
             <div className="flex items-center gap-2" title="Desktop Extension">
                <Monitor size={20} />
                <span className="text-xs font-semibold uppercase tracking-wider">Desktop</span>
             </div>
             <div className="w-1 h-1 bg-neutral-800 rounded-full" />
             <div className="flex items-center gap-2" title="Web Dashboard">
                <Globe size={20} />
                <span className="text-xs font-semibold uppercase tracking-wider">Web</span>
             </div>
          </motion.div>
        </div>

        {/* The Right side is empty in DOM because the Canvas is fixed in background */}
        <div className="hidden md:block h-full w-full pointer-events-none"></div>
      </div>
    </section>
  );
};

export default Hero;