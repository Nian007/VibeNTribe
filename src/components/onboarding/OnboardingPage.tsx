import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { DateRangePicker } from './DateRangePicker';
import { GroupPreferenceSelector } from './GroupPreferenceSelector';
import { useAuth } from '../../hooks/useAuth';
import { ApiService } from '../../services/api';
import { OnboardingData, DateRange } from '../../types';

type OnboardingStep = 'dates' | 'preferences' | 'complete';

export const OnboardingPage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('dates');
  const [isLoading, setIsLoading] = useState(false);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    travelDates: [],
    groupPreferences: [],
  });

  const steps = [
    { id: 'dates', title: 'Travel Dates', icon: Calendar },
    { id: 'preferences', title: 'Group Preferences', icon: Users },
    { id: 'complete', title: 'Complete', icon: Check },
  ];

  const handleDateSelection = (dates: DateRange[]) => {
    setOnboardingData(prev => ({
      ...prev,
      travelDates: dates,
    }));
  };

  const handlePreferenceSelection = (preferences: Array<'mixed' | 'couples' | 'girls_only'>) => {
    setOnboardingData(prev => ({
      ...prev,
      groupPreferences: preferences,
    }));
  };

  const handleNext = () => {
    if (currentStep === 'dates') {
      setCurrentStep('preferences');
    } else if (currentStep === 'preferences') {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep === 'preferences') {
      setCurrentStep('dates');
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      
      // Submit onboarding data to backend
      await ApiService.submitOnboarding(onboardingData);
      
      // Update user as onboarded
      if (user) {
        updateUser({ isOnboarded: true });
      }
      
      setCurrentStep('complete');
      
      // Redirect to dashboard after completion
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 3000);
      
    } catch (error) {
      console.error('Onboarding submission error:', error);
      alert('Failed to complete onboarding. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const canProceed = () => {
    if (currentStep === 'dates') {
      return onboardingData.travelDates.length > 0;
    }
    if (currentStep === 'preferences') {
      return onboardingData.groupPreferences.length > 0;
    }
    return false;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'dates':
        return (
          <motion.div
            key="dates"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                When are you planning to travel?
              </h2>
              <p className="text-white/80 text-lg">
                Select your available travel dates. You can choose multiple date ranges.
              </p>
            </div>
            
            <DateRangePicker
              selectedDates={onboardingData.travelDates}
              onDateChange={handleDateSelection}
            />
          </motion.div>
        );

      case 'preferences':
        return (
          <motion.div
            key="preferences"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                What's your travel vibe?
              </h2>
              <p className="text-white/80 text-lg">
                Choose your preferred group types. You can select multiple options.
              </p>
            </div>
            
            <GroupPreferenceSelector
              selectedPreferences={onboardingData.groupPreferences}
              onPreferenceChange={handlePreferenceSelection}
            />
          </motion.div>
        );

      case 'complete':
        return (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <Check className="w-12 h-12 text-white" />
            </motion.div>
            
            <h2 className="text-3xl font-bold text-white mb-4">
              Welcome to VibeNTribe! 🎉
            </h2>
            <p className="text-white/80 text-lg mb-6">
              Your profile is complete! We're now finding your perfect travel matches.
            </p>
            <p className="text-white/60">
              Redirecting you to your dashboard...
            </p>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 via-secondary-600 to-primary-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-bold text-white">
                Complete Your Profile
              </h1>
              <div className="text-white/60">
                {user?.firstName} {user?.lastName}
              </div>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center space-x-8 mb-8">
              {steps.map((step, index) => {
                const isActive = step.id === currentStep;
                const isCompleted = steps.findIndex(s => s.id === currentStep) > index;
                
                return (
                  <div key={step.id} className="flex items-center">
                    <div className={`
                      flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300
                      ${isActive 
                        ? 'bg-white text-primary-600 border-white' 
                        : isCompleted 
                          ? 'bg-green-500 text-white border-green-500'
                          : 'bg-transparent text-white/60 border-white/30'
                      }
                    `}>
                      <step.icon className="w-5 h-5" />
                    </div>
                    <span className={`
                      ml-3 font-medium transition-colors duration-300
                      ${isActive ? 'text-white' : 'text-white/60'}
                    `}>
                      {step.title}
                    </span>
                    {index < steps.length - 1 && (
                      <div className={`
                        w-16 h-0.5 mx-6 transition-colors duration-300
                        ${isCompleted ? 'bg-green-500' : 'bg-white/30'}
                      `} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-4xl w-full">
            <Card variant="glass" padding="lg" className="min-h-[500px]">
              <AnimatePresence mode="wait">
                {renderStepContent()}
              </AnimatePresence>
              
              {/* Navigation Buttons */}
              {currentStep !== 'complete' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex justify-between items-center mt-8 pt-8 border-t border-white/20"
                >
                  <Button
                    variant="ghost"
                    onClick={handleBack}
                    disabled={currentStep === 'dates'}
                    className="text-white/80 hover:text-white"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  
                  <Button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    isLoading={isLoading}
                    className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white"
                  >
                    {currentStep === 'preferences' ? 'Complete Profile' : 'Continue'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};