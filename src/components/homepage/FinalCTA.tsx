import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

interface FinalCTAProps {
  onCtaClick: () => void;
}

export const FinalCTA = ({ onCtaClick }: FinalCTAProps) => {
  return (
    <section className="py-24 bg-gradient-to-br from-primary/20 via-background to-secondary/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container px-4 mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Find Your Travel Tribe?
          </h2>
          <p className="text-xl text-textSecondary mb-10 max-w-2xl mx-auto">
            Join thousands of travelers who've found their perfect companions. Your next adventure is just a click away.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button onClick={onCtaClick} size="xl" className="min-w-[200px]">
              Start Your Journey
            </Button>
            <Button variant="outline" size="xl" className="min-w-[200px]">
              Learn More
            </Button>
          </div>
          
          <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="flex items-center">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-background overflow-hidden"
                  >
                    <img 
                      src={`https://images.pexels.com/photos/${1000000 + i * 10000}/pexels-photo-${1000000 + i * 10000}.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&dpr=1`} 
                      alt={`User ${i}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="ml-4">
                <p className="text-white font-medium">Join 10,000+ travelers</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <div className="ml-2">
                <p className="text-white font-medium">4.9 star rating</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
