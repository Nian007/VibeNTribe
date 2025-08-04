import { VscSparkle } from "react-icons/vsc";
import { FaTwitter, FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <VscSparkle className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-white">VibeNTribe</span>
            </div>
            <p className="text-textSecondary mb-6">
              Connecting like-minded travelers to create unforgettable adventures together.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-textSecondary hover:text-primary transition-colors">
                <FaTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-textSecondary hover:text-primary transition-colors">
                <FaInstagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-textSecondary hover:text-primary transition-colors">
                <FaFacebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-textSecondary hover:text-primary transition-colors">
                <FaLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Company</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-textSecondary hover:text-primary transition-colors">About Us</a>
              </li>
              <li>
                <a href="#" className="text-textSecondary hover:text-primary transition-colors">Careers</a>
              </li>
              <li>
                <a href="#" className="text-textSecondary hover:text-primary transition-colors">Press</a>
              </li>
              <li>
                <a href="#" className="text-textSecondary hover:text-primary transition-colors">Blog</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Resources</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-textSecondary hover:text-primary transition-colors">Travel Guides</a>
              </li>
              <li>
                <a href="#" className="text-textSecondary hover:text-primary transition-colors">Safety Tips</a>
              </li>
              <li>
                <a href="#" className="text-textSecondary hover:text-primary transition-colors">Community Guidelines</a>
              </li>
              <li>
                <a href="#" className="text-textSecondary hover:text-primary transition-colors">FAQs</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Legal</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-textSecondary hover:text-primary transition-colors">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="text-textSecondary hover:text-primary transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-textSecondary hover:text-primary transition-colors">Cookie Policy</a>
              </li>
              <li>
                <a href="#" className="text-textSecondary hover:text-primary transition-colors">Accessibility</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-textSecondary text-sm">
            © {currentYear} VibeNTribe. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <select className="bg-surface border border-border text-textSecondary rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="en">English (US)</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
};
