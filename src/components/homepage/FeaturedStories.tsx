import { motion } from 'framer-motion';
import { Heart, MessageSquare } from 'lucide-react';

const stories = [
  {
    id: 1,
    title: "Solo Backpacking Through the Andes",
    author: "Alex Johnson",
    image: "https://images.pexels.com/photos/3889854/pexels-photo-3889854.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    likes: 1200,
    comments: 89,
  },
  {
    id: 2,
    title: "A Culinary Journey in Marrakesh",
    author: "Samira Khan",
    image: "https://images.pexels.com/photos/2404370/pexels-photo-2404370.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    likes: 2300,
    comments: 154,
  },
  {
    id: 3,
    title: "Finding Paradise in the Philippines",
    author: "Chris Lee",
    image: "https://images.pexels.com/photos/307008/pexels-photo-307008.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    likes: 1800,
    comments: 112,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: 'easeOut'
    },
  }),
};

export const FeaturedStories = () => {
  return (
    <section id="stories" className="py-20 sm:py-32 bg-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white">Featured Travel Stories</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-textSecondary">Get inspired by adventures from our growing community.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story, i) => (
            <motion.div
              key={story.id}
              className="bg-background rounded-lg overflow-hidden shadow-lg group cursor-pointer"
              onClick={() => alert(`Navigate to story: "${story.title}"`)}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <div className="relative">
                <img src={story.image} alt={story.title} className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-bold text-white">{story.title}</h3>
                  <p className="text-sm text-slate-300">by {story.author}</p>
                </div>
              </div>
              <div className="p-6 flex justify-end items-center space-x-4 text-textSecondary">
                <div className="flex items-center space-x-1">
                  <Heart className="w-5 h-5" />
                  <span>{story.likes}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageSquare className="w-5 h-5" />
                  <span>{story.comments}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
