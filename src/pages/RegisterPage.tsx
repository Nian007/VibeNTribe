import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthForm } from '@/components/auth/AuthForm';
import { useAuth } from '@/hooks/useAuth';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSuccess = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 order-2 md:order-1">
        <div className="w-full max-w-md">
          <AuthForm mode="register" onSuccess={handleSuccess} />
        </div>
      </div>
      
      {/* Right Side - Image */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden md:block md:w-1/2 relative order-1 md:order-2"
      >
        <div className="absolute inset-0 bg-gradient-to-l from-primary/20 to-secondary/20 z-10"></div>
        <img 
          src="https://images.pexels.com/photos/5081918/pexels-photo-5081918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
          alt="Group of friends traveling" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center p-8 bg-black/40 backdrop-blur-sm rounded-lg max-w-md">
            <h2 className="text-3xl font-bold text-white mb-4">Join Our Community</h2>
            <p className="text-white/90">
              Create an account today and start connecting with travelers who share your vibe.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
