import { VscSparkle } from "react-icons/vsc";
import { Button } from '@/components/ui/Button';
import { useScroll } from '@/hooks/useScroll';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onCtaClick: () => void;
}

export const Header = ({ onCtaClick }: HeaderProps) => {
  const scrolled = useScroll(50);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out",
        scrolled ? "bg-background/80 backdrop-blur-lg border-b border-border" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-2">
            <VscSparkle className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">VibeNTribe</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#stories" className="text-sm font-medium text-textSecondary hover:text-primary transition-colors">Stories</a>
            <a href="#how-it-works" className="text-sm font-medium text-textSecondary hover:text-primary transition-colors">How It Works</a>
            <a href="#community" className="text-sm font-medium text-textSecondary hover:text-primary transition-colors">Community</a>
          </nav>
          <div className="flex items-center">
            <Button onClick={onCtaClick} size="lg">
              Start Your Adventure
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
