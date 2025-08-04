import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, User, Settings, Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { useAuth } from '@/hooks/useAuth';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-surface border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <span className="text-xl font-bold text-white">VibeNTribe</span>
            </div>
            
            <div className="hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-textSecondary h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search for travelers or destinations..."
                  className="w-96 h-10 pl-10 pr-4 rounded-md bg-background border border-border text-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="relative text-textSecondary hover:text-white transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full text-white text-xs flex items-center justify-center">
                  3
                </span>
              </button>
              
              <div className="relative group">
                <button className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-border">
                    {user.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-primary/20 flex items-center justify-center text-primary">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <span className="text-white hidden md:inline-block">{user.name}</span>
                </button>
                
                <div className="absolute right-0 mt-2 w-48 bg-surface border border-border rounded-md shadow-lg overflow-hidden z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="py-2">
                    <a href="#" className="flex items-center px-4 py-2 text-sm text-white hover:bg-primary/10 transition-colors">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </a>
                    <a href="#" className="flex items-center px-4 py-2 text-sm text-white hover:bg-primary/10 transition-colors">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </a>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center px-4 py-2 text-sm text-white hover:bg-primary/10 transition-colors w-full text-left"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <Button>Find Travel Companions</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-white">Profile Completion</h3>
                  <span className="text-primary font-bold">65%</span>
                </div>
                <div className="mt-4 h-2 bg-background rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '65%' }}></div>
                </div>
                <p className="mt-4 text-textSecondary text-sm">
                  Complete your profile to get better matches.
                </p>
                <Button variant="link" className="mt-2 p-0 h-auto">
                  Complete Profile
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-white">Upcoming Trips</h3>
                  <span className="bg-primary/20 text-primary text-xs font-medium px-2 py-1 rounded-full">
                    2 Trips
                  </span>
                </div>
                <p className="mt-4 text-textSecondary text-sm">
                  You have upcoming trips to Bali and Tokyo.
                </p>
                <Button variant="link" className="mt-2 p-0 h-auto">
                  View Trips
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-white">Messages</h3>
                  <span className="bg-primary/20 text-primary text-xs font-medium px-2 py-1 rounded-full">
                    5 New
                  </span>
                </div>
                <p className="mt-4 text-textSecondary text-sm">
                  You have 5 unread messages from your travel companions.
                </p>
                <Button variant="link" className="mt-2 p-0 h-auto">
                  View Messages
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-white mb-4">Recommended Travel Companions</h2>
                  
                  <div className="space-y-6">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-start space-x-4 pb-6 border-b border-border last:border-0 last:pb-0">
                        <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                          <img 
                            src={`https://images.pexels.com/photos/${1000000 + i * 10000}/pexels-photo-${1000000 + i * 10000}.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&dpr=1`} 
                            alt={`User ${i}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium text-white">Alex Johnson</h3>
                            <div className="flex items-center">
                              <span className="text-yellow-400 text-sm mr-1">95%</span>
                              <span className="text-textSecondary text-xs">match</span>
                            </div>
                          </div>
                          <p className="text-textSecondary text-sm mt-1">
                            Photography enthusiast, hiker, foodie
                          </p>
                          <div className="flex items-center mt-2 space-x-2">
                            <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                              Bali
                            </span>
                            <span className="bg-secondary/10 text-secondary text-xs px-2 py-1 rounded-full">
                              Oct 15-30
                            </span>
                          </div>
                          <div className="mt-3 flex space-x-2">
                            <Button size="sm" variant="default">Connect</Button>
                            <Button size="sm" variant="outline">View Profile</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 text-center">
                    <Button variant="link">View All Matches</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-white mb-4">Your Next Trip</h2>
                  
                  <div className="relative rounded-lg overflow-hidden mb-4">
                    <img 
                      src="https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                      alt="Bali" 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-xl font-bold text-white">Bali, Indonesia</h3>
                      <p className="text-white/80 text-sm">October 15-30, 2023</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-textSecondary">Travel Companions</span>
                      <span className="text-white">3 confirmed</span>
                    </div>
                    
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="w-10 h-10 rounded-full border-2 border-background overflow-hidden"
                        >
                          <img 
                            src={`https://images.pexels.com/photos/${1000000 + i * 10000}/pexels-photo-${1000000 + i * 10000}.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&dpr=1`} 
                            alt={`User ${i}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                      <div className="w-10 h-10 rounded-full border-2 border-background bg-primary/20 flex items-center justify-center text-primary text-xs">
                        +2
                      </div>
                    </div>
                    
                    <Button className="w-full">Trip Details</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-white mb-4">Travel Preferences</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-white font-medium mb-2">Interests</h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                          Photography
                        </span>
                        <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                          Hiking
                        </span>
                        <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                          Food
                        </span>
                        <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                          Culture
                        </span>
                        <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                          +3 more
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-white font-medium mb-2">Travel Style</h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-secondary/10 text-secondary text-xs px-2 py-1 rounded-full">
                          Adventure
                        </span>
                        <span className="bg-secondary/10 text-secondary text-xs px-2 py-1 rounded-full">
                          Budget
                        </span>
                        <span className="bg-secondary/10 text-secondary text-xs px-2 py-1 rounded-full">
                          Spontaneous
                        </span>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      Edit Preferences
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};
