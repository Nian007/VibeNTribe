import { motion } from 'framer-motion';
import { Button } from './Button';
import { X, Mail, Linkedin } from 'lucide-react';
import { FcGoogle } from "react-icons/fc"; // Corrected import

interface RegistrationModalProps {
  onClose: () => void;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', damping: 25, stiffness: 200 } },
  exit: { opacity: 0, y: 50, scale: 0.95, transition: { duration: 0.2 } },
};

export const RegistrationModal = ({ onClose }: RegistrationModalProps) => {
  const handleAction = (action: string) => alert(`Prototype action: ${action}`);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={onClose}
    >
      <motion.div
        className="relative bg-surface rounded-lg shadow-xl w-full max-w-md m-4 p-8 border border-border"
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-textSecondary hover:text-white"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Join the Adventure</h2>
          <p className="mt-2 text-textSecondary">Create an account to find your vibe and your tribe.</p>
        </div>

        <div className="mt-8 space-y-4">
          <Button onClick={() => handleAction('Sign up with Google')} variant="outline" className="w-full text-lg py-6">
            <FcGoogle className="mr-3 h-6 w-6" />
            Sign up with Google
          </Button>
          <Button onClick={() => handleAction('Sign up with Email')} variant="outline" className="w-full text-lg py-6">
            <Mail className="mr-3 h-6 w-6 text-primary" />
            Sign up with Email
          </Button>
          <Button variant="outline" className="w-full text-lg py-6" disabled>
            <Linkedin className="mr-3 h-6 w-6 text-gray-500" />
            <span className="text-gray-500">Sign up with LinkedIn</span>
            <span className="ml-2 text-xs bg-gray-600 text-gray-300 px-2 py-1 rounded-full">Coming Soon</span>
          </Button>
        </div>

        <p className="mt-8 text-xs text-textSecondary text-center">
          By signing up, you agree to our <a href="#" className="underline hover:text-primary">Terms of Service</a> and <a href="#" className="underline hover:text-primary">Privacy Policy</a>.
        </p>
      </motion.div>
    </motion.div>
  );
};
