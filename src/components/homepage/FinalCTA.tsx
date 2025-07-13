import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

interface FinalCTAProps {
  onCtaClick: () => void;
}

export const FinalCTA = ({ onCtaClick }: FinalCTAProps) => {
  return (
    <section className="py-20 sm:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="relative rounded-lg bg-gradient-to-r from-primary to-accent p-12 text-center overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white">Ready to Find Your Tribe?</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-foreground/80">
              Your next adventure is just a click away. Join a community of passionate travelers today.
            </p>
            <div className="mt-10">
              <Button onClick={onCtaClick} size="xl" variant="secondary" className="group bg-white text-primary-foreground hover:bg-slate-200">
                Start Your Adventure
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
