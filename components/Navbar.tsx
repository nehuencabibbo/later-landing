import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Bookmark } from 'lucide-react';
import { Button } from './UiComponents';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth'}); }}>
          <Bookmark className="w-8 h-8 text-brand-600 group-hover:text-brand-500 transition-colors fill-current" />
          <span className="text-xl font-bold tracking-tight text-white">Later</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {['Features', 'How it works', 'Pricing', 'FAQ'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(/ /g, '-')}`} className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">
              {item}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <Button primary onClick={scrollToPricing} className="!px-6 !py-2 !text-xs">Get Started</Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 w-full bg-neutral-900 border-b border-neutral-800 p-6 md:hidden flex flex-col gap-4 shadow-2xl"
        >
          {['Features', 'How it works', 'Pricing', 'FAQ'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(/ /g, '-')}`} 
              className="text-lg font-medium text-neutral-300 hover:text-brand-500" 
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <Button primary onClick={scrollToPricing} className="w-full">Get Started</Button>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;