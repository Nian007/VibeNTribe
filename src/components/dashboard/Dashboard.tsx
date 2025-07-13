import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Calendar, 
  MapPin, 
  Bell, 
  Settings, 
  LogOut,
  Heart,
  MessageCircle,
  Plane,
  Star
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { useAuth } from '../../hooks/useAuth.tsx';
import { ApiService } from '../../services/api';
import { Match } from '../../types';
import { formatDateRange } from '../../utils/dateUtils';

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'matches' | 'profile' | 'notifications'>('matches');

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {
    try {
      setIsLoading(true);
      const matchResponse = await ApiService.getMatches();
      setMatches(matchResponse.matches);
    } catch (error) {
      console.error('Failed to load matches:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptMatch = async (matchId: string) => {
    try {
      await ApiService.acceptMatch(matchId);
      // Refresh matches
      loadMatches();
    } catch (error) {
      console.error('Failed to accept match:', error);
    }
  };

  const handleDeclineMatch = async (matchId: string) => {
    try {
      await ApiService.declineMatch(matchId);
      // Refresh matches
      loadMatches();
    } catch (error) {
      console.error('Failed to decline match:', error);
    }
  };

  const renderMatches = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      );
    }

    if (matches.length === 0) {
      return (
        <div className="text-center py-12">
          <Plane className="w-16 h-16 text-white/40 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            No matches yet
          </h3>
          <p className="text-white/60">
            We're working on finding your perfect travel companions!
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {matches.map((match, index) => (
          <motion.div
            key={match.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card variant="glass">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white">
                      Travel Match Found!
                    </h3>
                    <div className="flex items-center text-yellow-400">
                      <Star className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">
                        {Math.round(match.compatibilityScore)}% match
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    {match.commonDates.map((date, dateIndex) => (
                      <div key={dateIndex} className="flex items-center text-white/80 text-sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        {formatDateRange(date.startDate, date.endDate)}
                        {date.destination && (
                          <>
                            <MapPin className="w-4 h-4 ml-4 mr-1" />
                            {date.destination}
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {match.status === 'pending' && (
                    <div className="flex space-x-3">
                      <Button
                        size="sm"
                        onClick={() => handleAcceptMatch(match.id)}
                        className="bg-green-500 hover:bg-green-600"
                      >
                        <Heart className="w-4 h-4 mr-2" />
                        Accept
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeclineMatch(match.id)}
                        className="border-white/30 text-white hover:bg-white/10"
                      >
                        Pass
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white/80 hover:text-white"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Message
                      </Button>
                    </div>
                  )}
                  
                  {match.status === 'accepted' && (
                    <div className="flex items-center text-green-400 text-sm">
                      <Heart className="w-4 h-4 mr-2" />
                      Match accepted! Start planning your trip together.
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    );
  };

  const renderProfile = () => (
    <Card variant="glass">
      <div className="text-center">
        <div className="w-24 h-24 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-2xl font-bold text-white">
            {user?.firstName?.[0]}{user?.lastName?.[0]}
          </span>
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-2">
          {user?.firstName} {user?.lastName}
        </h2>
        
        <p className="text-white/80 mb-6">
          {user?.email}
        </p>
        
        <div className="space-y-4">
          <Button variant="outline" className="w-full border-white/30 text-white">
            <Settings className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
          
          <Button variant="outline" className="w-full border-white/30 text-white">
            <Calendar className="w-4 h-4 mr-2" />
            Update Travel Dates
          </Button>
          
          <Button 
            variant="ghost" 
            onClick={logout}
            className="w-full text-red-400 hover:text-red-300 hover:bg-red-500/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </Card>
  );

  const renderNotifications = () => (
    <Card variant="glass">
      <div className="text-center py-12">
        <Bell className="w-16 h-16 text-white/40 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">
          No notifications
        </h3>
        <p className="text-white/60">
          We'll notify you when we find new travel matches!
        </p>
      </div>
    </Card>
  );

  const tabs = [
    { id: 'matches', label: 'Matches', icon: Users },
    { id: 'profile', label: 'Profile', icon: Settings },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 via-secondary-600 to-primary-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Plane className="w-8 h-8 text-white" />
              <h1 className="text-2xl font-bold text-white">
                VibeNTribe
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-white/80">
                Welcome back, {user?.firstName}!
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="text-white/80 hover:text-white"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto p-6">
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card variant="glass">
                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`
                        w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200
                        ${activeTab === tab.id
                          ? 'bg-white/20 text-white'
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                        }
                      `}
                    >
                      <tab.icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'matches' && renderMatches()}
                {activeTab === 'profile' && renderProfile()}
                {activeTab === 'notifications' && renderNotifications()}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
