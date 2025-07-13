import { VscSparkle } from "react-icons/vsc";

export const Footer = () => {
  const links = ["About", "Careers", "Press", "Contact", "Terms", "Privacy"];
  return (
    <footer className="bg-surface border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-8 md:mb-0">
            <VscSparkle className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold text-foreground">VibeNTribe</span>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8 md:mb-0">
            {links.map(link => (
              <a key={link} href="#" className="text-sm text-textSecondary hover:text-primary transition-colors">
                {link}
              </a>
            ))}
          </div>
          <p className="text-sm text-textSecondary">&copy; {new Date().getFullYear()} VibeNTribe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
