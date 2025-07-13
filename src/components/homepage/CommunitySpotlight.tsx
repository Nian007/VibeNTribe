import { motion } from 'framer-motion';

const images = [
  "https://images.pexels.com/photos/1658967/pexels-photo-1658967.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1534057/pexels-photo-1534057.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/238622/pexels-photo-238622.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=600",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', damping: 15, stiffness: 100 } },
};

export const CommunitySpotlight = () => {
  return (
    <section id="community" className="py-20 sm:py-32 bg-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white">Community Spotlight</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-textSecondary">Destinations our members are exploring right now.</p>
        </div>
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {images.map((src, index) => (
            <motion.div
              key={index}
              className="aspect-square rounded-lg overflow-hidden shadow-lg group"
              variants={imageVariants}
              whileHover={{ scale: 1.05, zIndex: 10, transition: { duration: 0.2 } }}
            >
              <img src={src} alt={`Community photo ${index + 1}`} className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
