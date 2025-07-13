import { motion } from 'framer-motion';
import { UserPlus, Sparkles, Send } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    title: "Create Your Profile",
    description: "Tell us about your travel style, interests, and what you're looking for in a travel partner.",
  },
  {
    icon: Sparkles,
    title: "Find Your Vibe",
    description: "Our smart algorithm matches you with like-minded travelers and curated group trips.",
  },
  {
    icon: Send,
    title: "Start Your Adventure",
    description: "Connect, plan, and embark on unforgettable journeys with your new-found tribe.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 sm:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white">How It Works</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-textSecondary">Three simple steps to your next great adventure.</p>
        </div>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          {steps.map((step, index) => (
            <motion.div key={index} className="flex flex-col items-center" variants={itemVariants}>
              <div className="flex items-center justify-center h-20 w-20 rounded-full bg-primary/10 border-2 border-primary/30 mb-6">
                <step.icon className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
              <p className="text-textSecondary max-w-xs">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
