import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { HeroSection } from '@/components/homepage/HeroSection';
import { FeaturedStories } from '@/components/homepage/FeaturedStories';
import { HowItWorks } from '@/components/homepage/HowItWorks';
import { CommunitySpotlight } from '@/components/homepage/CommunitySpotlight';
import { FinalCTA } from '@/components/homepage/FinalCTA';
import { Footer } from '@/components/layout/Footer';
import { RegistrationModal } from '@/components/ui/RegistrationModal';

export const HomePage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => {
    // For now, redirect directly to login instead of showing modal
    navigate('/login');
  };
  const closeModal = () => setModalOpen(false);

  return (
    <div className="bg-background w-full">
      <Header onCtaClick={openModal} />
      <main>
        <HeroSection onCtaClick={openModal} />
        <FeaturedStories />
        <HowItWorks />
        <CommunitySpotlight />
        <FinalCTA onCtaClick={openModal} />
      </main>
      <Footer />
      <AnimatePresence>
        {isModalOpen && <RegistrationModal onClose={closeModal} />}
      </AnimatePresence>
    </div>
  );
};
