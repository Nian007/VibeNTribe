import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/Card';

const testimonials = [
  {
    id: 1,
    quote: "I was nervous about traveling solo, but VibeNTribe connected me with the most amazing group of people. We're still friends a year later!",
    name: "Jessica T.",
    location: "New York, USA",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    trip: "Southeast Asia Backpacking",
  },
  {
    id: 2,
    quote: "Found my hiking buddy through VibeNTribe. We've now conquered 5 mountain trails together. The matching algorithm is spot on!",
    name: "Marcus L.",
    location: "Vancouver, Canada",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    trip: "Patagonia Trek",
  },
  {
    id: 3,
    quote: "As a photographer, I wanted to travel with people who wouldn't mind waiting for the perfect shot. Found exactly that on VibeNTribe!",
    name: "Aisha K.",
    location: "London, UK",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    trip: "Iceland Photography Tour",
  },
];

export const CommunitySpotlight = () => {
  return (
    <section id="community" className="py-24 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container px-4 mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Community Spotlight</h2>
          <p className="text-xl text-textSecondary max-w-2xl mx-auto">
            Hear from travelers who found their tribe and created unforgettable memories together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-surface border-border hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-white">{testimonial.name}</h3>
                      <p className="text-textSecondary text-sm">{testimonial.location}</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary/30">
                      <path d="M9.33333 21.3333C7.86667 21.3333 6.61667 20.8167 5.58333 19.7833C4.55 18.75 4.03333 17.5 4.03333 16.0333C4.03333 14.5667 4.55 13.3167 5.58333 12.2833C6.61667 11.25 7.86667 10.7333 9.33333 10.7333C9.33333 7.26667 10.5 4.56667 12.8333 2.63333C15.1667 0.7 18.0333 0 21.4333 0.533333L23.3333 4.33333C21.2667 4.2 19.5 4.7 18.0333 5.83333C16.5667 6.96667 15.8333 8.56667 15.8333 10.6333V10.7333H21.3333C22.8 10.7333 24.05 11.25 25.0833 12.2833C26.1167 13.3167 26.6333 14.5667 26.6333 16.0333C26.6333 17.5 26.1167 18.75 25.0833 19.7833C24.05 20.8167 22.8 21.3333 21.3333 21.3333H9.33333ZM9.33333 17.3333H21.3333C21.6 17.3333 21.8333 17.2333 22.0333 17.0333C22.2333 16.8333 22.3333 16.6 22.3333 16.3333C22.3333 16.0667 22.2333 15.8333 22.0333 15.6333C21.8333 15.4333 21.6 15.3333 21.3333 15.3333H9.33333C9.06667 15.3333 8.83333 15.4333 8.63333 15.6333C8.43333 15.8333 8.33333 16.0667 8.33333 16.3333C8.33333 16.6 8.43333 16.8333 8.63333 17.0333C8.83333 17.2333 9.06667 17.3333 9.33333 17.3333Z" fill="currentColor"/>
                    </svg>
                  </div>
                  
                  <p className="text-white mb-6 italic">"{testimonial.quote}"</p>
                  
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm text-primary font-medium">Trip: {testimonial.trip}</p>
                  </div>
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
          className="mt-16 text-center"
        >
          <a 
            href="#" 
            className="inline-flex items-center text-primary font-medium text-lg hover:underline"
          >
            Read more stories
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
