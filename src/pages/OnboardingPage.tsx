import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Calendar } from '@/components/ui/Calendar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup';
import { Label } from '@/components/ui/Label';
import { DateRange } from 'react-day-picker';
import { addDays, format } from 'date-fns';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';

type GroupPreference = 'mixed' | 'couples' | 'girls-only';

const steps = [
  { id: 1, title: 'Select Your Travel Dates', component: DateStep },
  { id: 2, title: 'Choose Your Vibe', component: VibeStep },
  { id: 3, title: 'You\'re All Set!', component: ConfirmationStep },
];

export function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [dates, setDates] = useState<DateRange | undefined>({ from: new Date(), to: addDays(new Date(), 7) });
  const [preference, setPreference] = useState<GroupPreference>('mixed');
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleNext = () => setCurrentStep(s => Math.min(s + 1, steps.length));
  const handlePrev = () => setCurrentStep(s => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    if (!user || !dates?.from || !dates?.to || !preference) {
      alert('Please complete all fields.');
      return;
    }

    // 1. Update profile with preference and onboarding status
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ group_preference: preference, is_onboarded: true })
      .eq('id', user.id);

    if (profileError) {
      console.error('Error updating profile:', profileError);
      return alert('Failed to save your preferences.');
    }

    // 2. Clear old travel periods
    const { error: deleteError } = await supabase
      .from('travel_periods')
      .delete()
      .eq('user_id', user.id);
    
    if (deleteError) {
        console.error('Error clearing old dates:', deleteError);
    }

    // 3. Insert new travel period
    const { error: periodError } = await supabase
      .from('travel_periods')
      .insert({
        user_id: user.id,
        start_date: format(dates.from, 'yyyy-MM-dd'),
        end_date: format(dates.to, 'yyyy-MM-dd'),
      });

    if (periodError) {
      console.error('Error saving travel dates:', periodError);
      return alert('Failed to save your travel dates.');
    }
    
    // TODO: Trigger backend to find matches and send notification
    
    handleNext();
  };

  const CurrentComponent = steps[currentStep - 1].component;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(to_bottom,white_5%,transparent_90%)]"></div>
      <div className="z-10 w-full max-w-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-card/50 backdrop-blur-xl border border-border rounded-lg p-8 shadow-2xl shadow-primary/10"
          >
            <h2 className="text-3xl font-bold text-center mb-2 text-primary">{steps[currentStep - 1].title}</h2>
            <div className="my-8">
              <CurrentComponent dates={dates} setDates={setDates} preference={preference} setPreference={setPreference} />
            </div>
            <div className="flex justify-between items-center">
              {currentStep > 1 && currentStep < steps.length ? (
                <Button variant="ghost" onClick={handlePrev}>Back</Button>
              ) : <div />}
              {currentStep < steps.length - 1 && (
                <Button onClick={handleNext}>Next</Button>
              )}
              {currentStep === steps.length - 1 && (
                <Button onClick={handleSubmit}>Complete Onboarding</Button>
              )}
              {currentStep === steps.length && (
                <Button onClick={() => navigate('/dashboard')} className="w-full">Go to Dashboard</Button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function DateStep({ dates, setDates }: { dates?: DateRange, setDates: (d?: DateRange) => void }) {
  return (
    <div className="flex flex-col items-center">
      <p className="text-muted-foreground text-center mb-6">When are you free to travel? Select a date range.</p>
      <Calendar
        mode="range"
        selected={dates}
        onSelect={setDates}
        className="rounded-md border"
        numberOfMonths={2}
      />
    </div>
  );
}

function VibeStep({ preference, setPreference }: { preference: GroupPreference, setPreference: (p: GroupPreference) => void }) {
  return (
    <div className="flex flex-col items-center">
      <p className="text-muted-foreground text-center mb-6">What kind of group are you looking for?</p>
      <RadioGroup defaultValue={preference} onValueChange={setPreference} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(['mixed', 'couples', 'girls-only'] as GroupPreference[]).map(p => (
          <div key={p}>
            <RadioGroupItem value={p} id={p} className="sr-only" />
            <Label htmlFor={p} className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer transition-colors">
              <span className="text-lg font-semibold capitalize">{p.replace('-', ' ')}</span>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}

function ConfirmationStep() {
  return (
    <div className="text-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="text-6xl mb-4 mx-auto w-fit"
      >
        🎉
      </motion.div>
      <p className="text-muted-foreground">
        Awesome! We'll notify you via WhatsApp as soon as we find matching travelers for your dates.
      </p>
    </div>
  );
}
