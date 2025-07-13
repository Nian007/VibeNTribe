import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth.tsx';
import { LinkedInService } from '../../services/linkedin';
import { LoadingSpinner } from '../ui/LoadingSpinner';

export const LinkedInCallback: React.FC = () => {
  const { login } = useAuth();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    handleCallback();
  }, []);

  const handleCallback = async () => {
    try {
      setStatus('loading');
      
      // Extract authorization code from URL
      const authData = LinkedInService.getAuthCodeFromUrl();
      
      if (!authData) {
        throw new Error('No authorization code found in URL');
      }

      // Exchange code for token and user data via our backend
      await login(authData.code);
      
      setStatus('success');
      
      // Redirect to onboarding or dashboard after a short delay
      setTimeout(() => {
        window.location.href = '/onboarding';
      }, 2000);
      
    } catch (error: any) {
      console.error('LinkedIn callback error:', error);
      setError(error.message || 'Authentication failed');
      setStatus('error');
      
      // Redirect to login page after error
      setTimeout(() => {
        window.location.href = '/login';
      }, 3000);
    }
  };

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <LoadingSpinner size="lg" color="white" className="mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-white mb-4">
              Connecting your LinkedIn account...
            </h2>
            <p className="text-white/80">
              Please wait while we set up your VibeNTribe profile
            </p>
          </motion.div>
        );

      case 'success':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
            </motion.div>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Welcome to VibeNTribe! 🎉
            </h2>
            <p className="text-white/80 mb-4">
              Your LinkedIn account has been successfully connected.
            </p>
            <p className="text-white/60 text-sm">
              Redirecting you to complete your travel profile...
            </p>
          </motion.div>
        );

      case 'error':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <XCircle className="w-16 h-16 text-red-400 mx-auto mb-6" />
            </motion.div>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Authentication Failed
            </h2>
            <p className="text-white/80 mb-4">
              {error || 'Something went wrong during the login process.'}
            </p>
            <p className="text-white/60 text-sm">
              Redirecting you back to the login page...
            </p>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 via-secondary-600 to-primary-800 flex items-center justify-center px-4">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl"
        >
          {renderContent()}
        </motion.div>
      </div>
    </div>
  );
};
