import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { LinkedInService } from '@/services/linkedin';
import { useAuth } from '@/hooks/useAuth';

export const LinkedInCallback = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { loginWithLinkedIn } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the code and state from URL
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const state = urlParams.get('state');

        if (!code || !state) {
          throw new Error('Invalid callback parameters');
        }

        // Process the callback
        const result = await LinkedInService.handleCallback(code, state);
        
        if (!result.success) {
          throw new Error(result.error || 'Authentication failed');
        }

        // Complete the login process
        await loginWithLinkedIn();
        
        // Redirect to dashboard
        navigate('/dashboard');
      } catch (err) {
        console.error('LinkedIn callback error:', err);
        setError(err instanceof Error ? err.message : 'Authentication failed');
        
        // Redirect to login page after a delay
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    };

    handleCallback();
  }, [navigate, loginWithLinkedIn]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center p-8"
      >
        {error ? (
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-error/20 text-error">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18"></path>
                <path d="M6 6l12 12"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white">Authentication Failed</h2>
            <p className="text-textSecondary">{error}</p>
            <p className="text-textSecondary">Redirecting to login page...</p>
          </div>
        ) : (
          <div className="space-y-4">
            <Loader2 className="w-16 h-16 text-primary animate-spin mx-auto" />
            <h2 className="text-2xl font-bold text-white">Authenticating with LinkedIn</h2>
            <p className="text-textSecondary">Please wait while we complete the authentication process...</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};
