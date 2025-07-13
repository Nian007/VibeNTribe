import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';
import { Chrome } from 'lucide-react';

export const LoginPage = () => {
  const handleLogin = async () => {
    // In a real app, this would be supabase.auth.signInWithOAuth({ provider: 'linkedin' })
    // For this demo, we'll simulate a login with a test user.
    const email = `testuser-${Date.now()}@example.com`;
    const password = 'password123';
    
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      console.error('Error signing up test user:', error);
      // Attempt to sign in if sign up fails (user might exist)
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) {
        console.error('Error signing in test user:', signInError);
        alert('Could not log in test user.');
      }
    } else {
      console.log('Test user created and logged in:', data.user);
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Sign in to find your Vibe and your Tribe
            </p>
          </div>
          <Button onClick={handleLogin} variant="outline" className="w-full">
            <Chrome className="mr-2 h-4 w-4" />
            Login with LinkedIn (Demo)
          </Button>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="https://images.pexels.com/photos/3769138/pexels-photo-3769138.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};
