import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, Sparkles, User } from 'lucide-react';

// Define your navigation items here. 
// Adding a new menu item is now as simple as adding an object to this array.
const NAV_ITEMS = [
  { id: 'home', label: 'Accueil', path: '/' },
  { id: 'collection', label: 'Collection', path: '/categories' },
  { id: 'history', label: 'Notre Histoire', path: '/history' },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Helper function to check if a link is the current active route
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#FAFAFA]/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Left: Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="text-[#333333] hover:text-[#E5A3B8] transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Center/Left: Logo */}
          <div className="flex-shrink-0 flex items-center justify-center md:justify-start flex-1 md:flex-none">
            <Link to="/" className="text-2xl md:text-3xl font-serif font-bold text-[#333333] tracking-wider hover:opacity-80 transition-opacity">
              So Chic <span className="text-[#F8C8DC]">Lady</span>
            </Link>
          </div>

          {/* Desktop Navigation - Dynamically Rendered */}
          <div className="hidden md:flex space-x-8 items-center flex-1 justify-center font-medium text-sm tracking-wide">
            {NAV_ITEMS.map((item) => (
              <Link 
                key={item.id} 
                to={item.path} 
                className={`relative uppercase transition-colors duration-300 group ${
                  isActive(item.path) ? 'text-[#E5A3B8]' : 'text-gray-600 hover:text-[#333333]'
                }`}
              >
                {item.label}
                {/* Interactive Animated Underline */}
                <span className={`absolute -bottom-1 left-0 h-[2px] bg-[#E5A3B8] transition-all duration-300 ${
                  isActive(item.path) ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
            ))}
          </div>

          {/* Right: Icons */}
          <div className="flex items-center space-x-5 text-[#333333]">
            {/* AI Assistant Button (Kept separate because of unique styling/behavior) */}
            <button className="hidden md:flex items-center space-x-1 text-sm bg-gradient-to-r from-[#F8C8DC] to-[#E5A3B8] text-[#333333] px-3 py-1.5 rounded-full hover:shadow-md hover:scale-105 transition-all duration-300 font-medium">
              <Sparkles size={16} />
              <span>AI Stylist</span>
            </button>
            <button className="hover:text-[#E5A3B8] hover:scale-110 transition-all duration-200"><Search size={22} /></button>
            <button className="hover:text-[#E5A3B8] hover:scale-110 transition-all duration-200 hidden sm:block"><User size={22} /></button>
            <button className="hover:text-[#E5A3B8] hover:scale-110 transition-all duration-200 relative">
              <ShoppingBag size={22} />
              <span className="absolute -top-1 -right-2 bg-[#333333] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-sm">0</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown - Dynamically Rendered */}
      <div 
        className={`md:hidden absolute w-full bg-white border-b border-gray-100 shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100 visible' : 'max-h-0 opacity-0 invisible'
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-2">
          {NAV_ITEMS.map((item) => (
            <Link 
              key={item.id}
              to={item.path} 
              onClick={() => setIsMobileMenuOpen(false)} // Auto-close menu on click
              className={`block py-3 font-medium border-b border-gray-50 transition-colors ${
                isActive(item.path) ? 'text-[#E5A3B8]' : 'text-gray-700 hover:text-[#333333] hover:pl-2'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <button className="flex w-full items-center space-x-2 py-3 text-[#E5A3B8] font-medium hover:opacity-80 transition-opacity mt-2">
            <Sparkles size={18} />
            <span>Demander à l'IA Styliste</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;