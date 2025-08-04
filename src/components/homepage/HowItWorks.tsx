import { motion } from 'framer-motion';
import { UserPlus, Search, Calendar, MapPin } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    title: 'Create Your Profile',
    description: 'Sign up and build your traveler profile with your preferences, interests, and travel style.',
    color: 'bg-primary',
  },
  {
    icon: Search,
    title: 'Find Your Tribe',
    description: 'Our algorithm matches you with like-minded travelers based on your compatibility.',
    color: 'bg-secondary',
  },
  {
    icon: Calendar,
    title: 'Plan Together',
    description: 'Connect, chat, and plan your adventure with your new travel companions.',
    color: 'bg-accent',
  },
  {
    icon: MapPin,
    title: 'Experience Together',
    description: 'Meet up and create unforgettable memories on your journey together.',
    color: 'bg-success',
  },
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-surface">
      <div className="container px-4 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-xl text-textSecondary max-w-2xl mx-auto">
            Finding your perfect travel companions has never been easier. Follow these simple steps to get started.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="bg-background border border-border rounded-lg p-8 h-full hover:border-primary/50 transition-colors duration-300 group">
                <div className={`w-16 h-16 ${step.color} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-textSecondary">
                  {step.description}
                </p>
                
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 left-full transform -translate-y-1/2 -translate-x-1/2 w-12 h-12 text-textSecondary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </div>
                )}
              </div>
              
              {index < steps.length - 1 && (
                <div className="lg:hidden flex justify-center my-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-textSecondary">
                    <path d="M12 5v14"></path>
                    <path d="M19 12l-7 7-7-7"></path>
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
