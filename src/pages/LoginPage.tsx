import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';
import { Chrome } from 'lucide-react';

export const LoginPage = () => {
  const handleLogin = async () => {
    // Use a fixed test user for demo purposes
    const email = 'demo@vibeandtribe.com';
    const password = 'demopassword123';
    
    try {
      // First try to sign in with existing user
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });

      if (signInError && signInError.message === 'Invalid login credentials') {
        // If user doesn't exist, create them first
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({ 
          email, 
          password,
          options: {
            emailRedirectTo: undefined // Disable email confirmation for demo
          }
        });

        if (signUpError) {
          console.error('Error creating demo user:', signUpError);
          alert('Could not create demo user. Please check your Supabase configuration.');
          return;
        }

        // If signup was successful but user needs confirmation, try signing in anyway
        if (signUpData.user && !signUpData.session) {
          const { error: retrySignInError } = await supabase.auth.signInWithPassword({ 
            email, 
            password 
          });
          
          if (retrySignInError) {
            console.error('Demo user created but could not sign in:', retrySignInError);
            alert('Demo user created but email confirmation may be required. Please check your Supabase settings to disable email confirmation for development.');
            return;
          }
        }

        console.log('Demo user created and logged in successfully');
      } else if (signInError) {
        console.error('Unexpected sign in error:', signInError);
        alert('Could not sign in demo user: ' + signInError.message);
        return;
      } else {
        console.log('Demo user signed in successfully:', signInData.user);
      }
    } catch (error) {
      console.error('Unexpected error during login:', error);
      alert('An unexpected error occurred during login.');
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
          <div className="text-xs text-muted-foreground text-center">
            <p>Demo credentials: demo@vibeandtribe.com</p>
            <p>Note: If login fails, please disable email confirmation in your Supabase project settings</p>
          </div>
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