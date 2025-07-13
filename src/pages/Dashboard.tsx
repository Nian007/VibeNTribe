import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('is_onboarded')
          .eq('id', user.id)
          .single();
        
        if (error) console.error('Error fetching profile', error);
        else if (data && !data.is_onboarded) {
          navigate('/onboarding');
        } else {
          setProfile(data);
        }
      }
    };
    fetchProfile();
  }, [user, navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      <h1 className="text-4xl font-bold mb-4">Welcome to VibeNTribe!</h1>
      <p className="text-muted-foreground mb-8">You are successfully onboarded.</p>
      <p className="text-sm text-muted-foreground mb-2">Logged in as: {user?.email}</p>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};
