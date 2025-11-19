import React, { Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Scene from './components/ThreeScene';
import { Button, SectionTitle, GradientBlob } from './components/UiComponents';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const PricingCard: React.FC<{ plan: string; price: string; features: string[]; highlight?: boolean }> = ({ plan, price, features, highlight }) => (
  <motion.div 
    initial={{ y: 50, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true }}
    className={`p-8 rounded-3xl flex flex-col relative ${highlight ? 'bg-neutral-900 border-2 border-brand-600 shadow-[0_0_40px_rgba(225,29,72,0.2)]' : 'bg-neutral-900/50 border border-neutral-800'}`}
  >
    {highlight && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Most Popular</div>}
    <h3 className="text-2xl font-bold mb-2">{plan}</h3>
    <div className="text-4xl font-black mb-6">{price}<span className="text-lg font-medium text-neutral-500">/mo</span></div>
    <ul className="space-y-4 mb-8 flex-1">
      {features.map((f, i) => (
        <li key={i} className="flex items-center gap-3 text-neutral-300">
          <div className="w-5 h-5 rounded-full bg-brand-900/50 flex items-center justify-center text-brand-500">
            <Check size={12} strokeWidth={3} />
          </div>
          {f}
        </li>
      ))}
    </ul>
    <Button primary={highlight} className="w-full justify-center">Choose {plan}</Button>
  </motion.div>
);

function App() {
  return (
    <div className="bg-black min-h-screen text-white selection:bg-brand-500 selection:text-white">
      <Navbar />
      
      {/* Fixed Background 3D Scene */}
      {/* We use suspense fallback to ensure smooth loading, though primitives load instantly */}
      <Suspense fallback={null}>
        <div className="fixed inset-0 z-0 pointer-events-none">
           <Scene />
        </div>
      </Suspense>

      <main className="relative z-10">
        <Hero />
        
        {/* Gradient Transition */}
        <div className="h-32 bg-gradient-to-b from-transparent to-neutral-950 pointer-events-none" />
        
        <Features />

        {/* How It Works Section */}
        <section id="how-it-works" className="py-32 bg-neutral-950 relative overflow-hidden">
           <GradientBlob className="right-0 top-1/2 translate-x-1/2 bg-indigo-900 w-[800px] h-[800px]" />
           
           <div className="container mx-auto px-6 relative">
             <SectionTitle subtitle="A seamless workflow from browser to brain.">
               Save. Sync. Solve.
             </SectionTitle>
             
             <div className="grid md:grid-cols-3 gap-8 mt-16 relative">
                {/* Connecting Line */}
                <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-brand-900 to-transparent" />

                {[
                  { step: "01", title: "Save Anywhere", desc: "Use the Browser Extension on desktop or the Share Sheet on mobile. One tap, safe and sound." },
                  { step: "02", title: "Set a Context", desc: "Pick 'Read this Weekend' or 'Remind me at 8 PM'. The app handles the scheduling." },
                  { step: "03", title: "Get Notified", desc: "Your phone pings you at the perfect time. Open it to read, even when offline." }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    className="relative z-10 text-center"
                  >
                    <div className="w-24 h-24 mx-auto bg-neutral-900 border-4 border-black rounded-full flex items-center justify-center text-3xl font-black text-brand-600 shadow-xl mb-6 relative">
                      {item.step}
                      {/* Pulse Effect */}
                      <div className="absolute inset-0 rounded-full border border-brand-500/30 animate-ping opacity-20" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                    <p className="text-neutral-400 max-w-xs mx-auto">{item.desc}</p>
                  </motion.div>
                ))}
             </div>
           </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-24 bg-black relative">
          <div className="container mx-auto px-6">
             <SectionTitle subtitle="Invest in your productivity.">
               Simple Pricing
             </SectionTitle>

             <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
               <PricingCard 
                 plan="Basic" 
                 price="$0" 
                 features={["Unlimited Bookmarks", "Chrome Extension", "Mobile App", "Daily Reminder Digest"]} 
               />
               <PricingCard 
                 plan="Pro" 
                 price="$4.99" 
                 highlight 
                 features={["Everything in Basic", "Unlimited Push Notifications", "AI Auto-Scheduling", "Permanent Library Backup", "Priority Support"]} 
               />
             </div>
          </div>
        </section>

        {/* CTA Footer */}
        <section className="py-32 relative overflow-hidden">
           <div className="absolute inset-0 bg-brand-900/20"></div>
           <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
           
           <div className="container mx-auto px-6 relative z-10 text-center">
             <motion.h2 
               initial={{ scale: 0.9, opacity: 0 }}
               whileInView={{ scale: 1, opacity: 1 }}
               className="text-5xl md:text-7xl font-black mb-8 tracking-tighter"
             >
               Never forget a link again.
             </motion.h2>
             <p className="text-xl text-neutral-300 mb-10 max-w-2xl mx-auto">
               Download the extension and mobile app today.
             </p>
             <Button primary className="text-lg px-10 py-4 shadow-xl">
               Start Using Later
             </Button>
             <p className="mt-6 text-sm text-neutral-500">Available on iOS, Android, Chrome, and Safari</p>
           </div>
        </section>

        {/* Footer */}
        <footer className="bg-neutral-950 border-t border-neutral-900 py-12 text-center md:text-left">
          <div className="container mx-auto px-6 grid md:grid-cols-4 gap-8">
             <div>
               <h4 className="font-bold text-xl mb-4 flex items-center justify-center md:justify-start gap-2">
                 <div className="w-6 h-6 bg-brand-600 rounded-md"></div> Later
               </h4>
               <p className="text-neutral-500 text-sm">
                 The smart bookmark manager that reminds you to actually consume your content.
               </p>
             </div>
             <div>
               <h4 className="font-bold mb-4 text-white">Product</h4>
               <ul className="space-y-2 text-sm text-neutral-500">
                 <li><a href="#" className="hover:text-brand-500">Browser Extension</a></li>
                 <li><a href="#" className="hover:text-brand-500">Mobile App</a></li>
                 <li><a href="#" className="hover:text-brand-500">Pricing</a></li>
               </ul>
             </div>
             <div>
               <h4 className="font-bold mb-4 text-white">Company</h4>
               <ul className="space-y-2 text-sm text-neutral-500">
                 <li><a href="#" className="hover:text-brand-500">About</a></li>
                 <li><a href="#" className="hover:text-brand-500">Blog</a></li>
                 <li><a href="#" className="hover:text-brand-500">Careers</a></li>
               </ul>
             </div>
             <div>
               <h4 className="font-bold mb-4 text-white">Legal</h4>
               <ul className="space-y-2 text-sm text-neutral-500">
                 <li><a href="#" className="hover:text-brand-500">Privacy</a></li>
                 <li><a href="#" className="hover:text-brand-500">Terms</a></li>
               </ul>
             </div>
          </div>
          <div className="mt-12 pt-8 border-t border-neutral-900 text-center text-neutral-600 text-sm">
            © {new Date().getFullYear()} Later App Inc. All rights reserved.
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;