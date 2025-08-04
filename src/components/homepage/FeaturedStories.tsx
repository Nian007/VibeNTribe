import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/Card';

const stories = [
  {
    id: 1,
    title: 'Finding My Tribe in Bali',
    excerpt: 'How I connected with fellow digital nomads and found my community in the heart of Ubud.',
    author: 'Sarah Johnson',
    authorImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    image: 'https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: 'Oct 12, 2023',
    category: 'Solo Travel',
  },
  {
    id: 2,
    title: 'Backpacking Europe: The Ultimate Group Adventure',
    excerpt: 'Six strangers became lifelong friends during our three-month journey across 12 European countries.',
    author: 'Michael Chen',
    authorImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    image: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: 'Sep 28, 2023',
    category: 'Group Travel',
  },
  {
    id: 3,
    title: 'From Strangers to Business Partners',
    excerpt: 'We met on a surf trip in Costa Rica and now run an eco-tourism company together.',
    author: 'Elena Rodriguez',
    authorImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    image: 'https://images.pexels.com/photos/1974521/pexels-photo-1974521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: 'Aug 15, 2023',
    category: 'Adventure',
  },
];

export const FeaturedStories = () => {
  return (
    <section id="stories" className="py-24 bg-background">
      <div className="container px-4 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Featured Stories</h2>
          <p className="text-xl text-textSecondary max-w-2xl mx-auto">
            Real connections, real adventures. Discover how travelers found their tribe and created unforgettable memories.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden h-full hover:shadow-xl transition-shadow duration-300 group">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={story.image} 
                    alt={story.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 flex items-center">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                      <img 
                        src={story.authorImage} 
                        alt={story.author} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-2">
                      <p className="text-white text-sm font-medium">{story.author}</p>
                      <p className="text-white/70 text-xs">{story.date}</p>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-primary/90 text-white text-xs font-medium rounded-full">
                      {story.category}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-textSecondary mb-4">{story.excerpt}</p>
                  <a 
                    href="#" 
                    className="inline-flex items-center text-primary font-medium hover:underline"
                  >
                    Read full story
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <a 
            href="#" 
            className="inline-flex items-center text-primary font-medium text-lg hover:underline"
          >
            View all stories
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 ml-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
