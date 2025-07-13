import React from 'react';
import { motion } from 'framer-motion';
import { Users, Heart, UserCheck } from 'lucide-react';
import { Card } from '../ui/Card';

interface GroupPreferenceSelectorProps {
  selectedPreferences: Array<'mixed' | 'couples' | 'girls_only'>;
  onPreferenceChange: (preferences: Array<'mixed' | 'couples' | 'girls_only'>) => void;
}

export const GroupPreferenceSelector: React.FC<GroupPreferenceSelectorProps> = ({
  selectedPreferences,
  onPreferenceChange,
}) => {
  const preferences = [
    {
      id: 'mixed' as const,
      title: 'Mixed Groups',
      description: 'Travel with diverse groups of all genders and backgrounds',
      icon: Users,
      color: 'from-blue-400 to-purple-500',
      benefits: ['Diverse perspectives', 'Varied interests', 'Great networking'],
    },
    {
      id: 'couples' as const,
      title: 'Couples Only',
      description: 'Join other couples for romantic getaways and double dates',
      icon: Heart,
      color: 'from-pink-400 to-red-500',
      benefits: ['Romantic atmosphere', 'Couple activities', 'Shared experiences'],
    },
    {
      id: 'girls_only' as const,
      title: 'Girls Only',
      description: 'Connect with fellow female travelers for safe, fun adventures',
      icon: UserCheck,
      color: 'from-purple-400 to-pink-500',
      benefits: ['Safe environment', 'Strong bonds', 'Empowering experiences'],
    },
  ];

  const handlePreferenceToggle = (preferenceId: 'mixed' | 'couples' | 'girls_only') => {
    const isSelected = selectedPreferences.includes(preferenceId);
    
    if (isSelected) {
      // Remove preference
      const updated = selectedPreferences.filter(p => p !== preferenceId);
      onPreferenceChange(updated);
    } else {
      // Add preference
      onPreferenceChange([...selectedPreferences, preferenceId]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {preferences.map((preference, index) => {
          const isSelected = selectedPreferences.includes(preference.id);
          
          return (
            <motion.div
              key={preference.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card
                variant="glass"
                className={`
                  cursor-pointer transition-all duration-300 h-full
                  ${isSelected 
                    ? 'ring-2 ring-yellow-400 bg-white/20 scale-105' 
                    : 'hover:bg-white/15 hover:scale-102'
                  }
                `}
                onClick={() => handlePreferenceToggle(preference.id)}
              >
                <div className="text-center space-y-4">
                  {/* Icon */}
                  <div className={`
                    w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${preference.color} 
                    flex items-center justify-center transform transition-transform duration-300
                    ${isSelected ? 'scale-110' : ''}
                  `}>
                    <preference.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-semibold text-white">
                    {preference.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-white/80 text-sm leading-relaxed">
                    {preference.description}
                  </p>
                  
                  {/* Benefits */}
                  <div className="space-y-2">
                    {preference.benefits.map((benefit, benefitIndex) => (
                      <div
                        key={benefitIndex}
                        className="flex items-center justify-center text-white/70 text-xs"
                      >
                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2" />
                        {benefit}
                      </div>
                    ))}
                  </div>
                  
                  {/* Selection Indicator */}
                  <div className={`
                    w-6 h-6 mx-auto rounded-full border-2 transition-all duration-300
                    ${isSelected 
                      ? 'bg-yellow-400 border-yellow-400' 
                      : 'border-white/30'
                    }
                  `}>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-full h-full flex items-center justify-center"
                      >
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </motion.div>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
      
      {/* Selection Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center"
      >
        {selectedPreferences.length > 0 ? (
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
            <p className="text-white/80 text-sm mb-2">
              You'll be matched with travelers who prefer:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {selectedPreferences.map((pref) => {
                const preference = preferences.find(p => p.id === pref);
                return (
                  <span
                    key={pref}
                    className="bg-yellow-400/20 text-yellow-300 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {preference?.title}
                  </span>
                );
              })}
            </div>
          </div>
        ) : (
          <p className="text-white/60 text-sm">
            Select one or more travel group preferences to continue
          </p>
        )}
      </motion.div>
    </div>
  );
};
