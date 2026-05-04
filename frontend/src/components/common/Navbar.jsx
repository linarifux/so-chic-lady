import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, Sparkles, User, ArrowRight } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCart } from '../../store/slices/cartSlice';
import { useGetProductsQuery } from '../../store/slices/productsApiSlice';
import { logout } from '../../store/slices/authSlice'; 

import Logo from '../../assets/logo.jpg';

// Main Navigation Items
const NAV_ITEMS = [
  { id: 'new', label: 'Nouveautés', path: '/categories', highlight: true },
  { id: 'collection', label: 'Prêt-à-porter', path: '/categories' },
  { id: 'accessories', label: 'Accessoires', path: '/categories?filter=accessories' },
  { id: 'history', label: 'Notre Histoire', path: '/history' },
];

// Instagram Story Style Categories
const STORY_CATEGORIES = [
  { id: 'dresses', label: 'Robes Tendance', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=200&auto=format&fit=crop' },
  { id: 'tops', label: 'Les Essentiels', image: 'https://images.unsplash.com/photo-1551163943-3f6a855d1153?q=80&w=200&auto=format&fit=crop' },
  { id: 'outerwear', label: 'Vestes', image: 'https://images.unsplash.com/photo-1551028719-01c1eb562145?q=80&w=200&auto=format&fit=crop' },
  { id: 'sale', label: 'Petits Prix', image: 'https://images.unsplash.com/photo-1434389678869-ae408358488c?q=80&w=200&auto=format&fit=crop' },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false); 
  const [searchTerm, setSearchTerm] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  // --- REDUX HOOKS ---
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth); 
  const dispatch = useDispatch();
  const { data: products } = useGetProductsQuery();
  
  const searchResults = products?.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const isActive = (path) => location.pathname === path;
  const closeSearch = () => setIsSearchOpen(false);

  const logoutHandler = () => {
    dispatch(logout());
    setIsProfileMenuOpen(false);
    navigate('/login');
  };

  // --- OPTIMIZED SCROLL LISTENER ---
  useEffect(() => {
    const handleScroll = () => {
      // Small 30px threshold prevents accidental trigger on a tiny mouse bump
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close search and lock body scroll
  useEffect(() => {
    if (isSearchOpen) document.body.style.overflow = 'hidden';
    else {
      document.body.style.overflow = 'unset';
      setSearchTerm(''); 
    }
    const handleEsc = (e) => { if (e.key === 'Escape') setIsSearchOpen(false); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isSearchOpen]);

  return (
    <>
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          /* Optimized bezier curve for buttery smooth height/layout changes */
          .header-transition {
            transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
          }
        `}
      </style>

      {/* --- SPACER (CRUCIAL FOR PREVENTING SHAKE) --- */}
      {/* Takes up the exact space of the unscrolled header to maintain layout flow */}
      <div className="w-full shrink-0 h-[246px] md:h-[330px]" aria-hidden="true" />

      {/* --- SEARCH OVERLAY --- */}
      <div className={`fixed inset-0 bg-white/95 backdrop-blur-md z-[100] transition-all duration-500 ease-in-out ${isSearchOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="max-w-4xl mx-auto px-4 pt-20 h-full flex flex-col relative">
          <button onClick={closeSearch} className="absolute top-8 right-4 md:right-0 text-gray-400 hover:text-[#333333] transition-colors hover:rotate-90 duration-300">
            <X size={32} />
          </button>

          <div className="relative mt-10 md:mt-20 border-b-2 border-gray-200 pb-4 group focus-within:border-[#E5A3B8] transition-colors duration-300">
            <Search size={28} className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#E5A3B8] transition-colors" />
            <input 
              type="text"
              autoFocus={isSearchOpen}
              placeholder="Rechercher une pièce, une couleur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent pl-12 pr-4 text-2xl md:text-5xl font-serif text-[#333333] placeholder-gray-300 focus:outline-none"
            />
          </div>

          <div className="flex-1 overflow-y-auto py-10 hide-scrollbar">
            {searchTerm.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-6">Résultats ({searchResults.length})</h3>
                {searchResults.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {searchResults.slice(0, 6).map((product) => (
                      <Link key={product._id || product.id} to={`/product/${product._id || product.id}`} onClick={closeSearch} className="group flex items-start gap-4">
                        <div className="w-20 h-28 bg-gray-100 rounded-sm overflow-hidden shrink-0 relative">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        </div>
                        <div className="flex flex-col py-1">
                          <h4 className="text-[#333333] font-medium text-sm group-hover:text-[#E5A3B8] transition-colors leading-tight mb-1">{product.name}</h4>
                          <p className="text-gray-500 text-sm mb-2">{product.price.toFixed(2)} €</p>
                          <span className="text-xs text-[#333333] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-2 group-hover:translate-x-0 duration-300">
                            Voir le produit <ArrowRight size={12} />
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-2xl font-serif text-gray-400">Aucun résultat trouvé pour "{searchTerm}"</p>
                  </div>
                )}
              </div>
            )}
            
            {searchTerm.length === 0 && (
              <div>
                 <h3 className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-6">Recherches Populaires</h3>
                 <div className="flex flex-wrap gap-3">
                   {['Robes d\'été', 'Veste en Jean', 'Sacs à main', 'Nouveautés'].map((tag) => (
                     <button key={tag} onClick={() => setSearchTerm(tag)} className="px-4 py-2 bg-gray-50 text-gray-600 rounded-full text-sm hover:bg-[#F8C8DC]/30 hover:text-[#333333] transition-colors">{tag}</button>
                   ))}
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- FIXED HEADER (No longer sticky to prevent Layout Thrashing) --- */}
      <header className={`fixed top-0 z-50 w-full flex flex-col bg-white header-transition ${isScrolled ? 'shadow-md' : 'shadow-sm border-b border-gray-100'}`}>
        
        {/* --- 1. ANNOUNCEMENT BAR --- */}
        <div className={`bg-[#333333] text-white text-[10px] sm:text-xs font-medium tracking-[0.2em] uppercase flex items-center justify-center gap-3 w-full header-transition origin-top overflow-hidden
          ${isScrolled ? 'h-0 opacity-0 py-0' : 'h-[40px] opacity-100 py-2'}
        `}>
          <span>✨ Livraison offerte dès 100€ d'achat</span>
          <span className="hidden md:inline text-[#E5A3B8]">•</span>
          <span className="hidden md:inline">Retours gratuits sous 14 jours</span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative">
          
          {/* --- 2. TOP BAR (Logo & Icons) --- */}
          <div className={`flex justify-between items-center relative header-transition ${isScrolled ? 'h-[64px]' : 'h-[96px] md:h-[112px]'}`}>
            
            {/* Left: Mobile Menu & AI Stylist */}
            <div className="flex items-center flex-1 z-20">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-[#333333] hover:text-[#E5A3B8] transition-colors">
                {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
              
              <button className={`hidden md:flex items-center space-x-2 text-sm bg-gray-50 text-[#333333] px-4 py-2 rounded-full hover:bg-[#F8C8DC]/20 hover:text-[#E5A3B8] font-medium group header-transition
                ${isScrolled ? 'opacity-0 invisible -translate-x-4' : 'opacity-100 visible translate-x-0'}
              `}>
                <Sparkles size={16} className="group-hover:rotate-12 transition-transform" />
                <span className="uppercase tracking-widest text-[10px]">AI Stylist</span>
              </button>
            </div>

            {/* Center: Interactive Logo */}
            <div className={`absolute top-1/2 -translate-y-1/2 z-20 origin-center md:origin-left header-transition
              ${isScrolled 
                ? 'md:left-0 md:translate-x-0 md:scale-[0.65] left-1/2 -translate-x-1/2 scale-[0.80]' 
                : 'left-1/2 -translate-x-1/2 scale-100'
              }`}
            >
              <Link to="/" className="hover:opacity-80 transition-opacity block">
                <img src={Logo} alt="So Chic Lady Logo" className="h-14 md:h-20 w-auto object-contain" />
              </Link>
            </div>

            {/* DYNAMIC CENTER: Nav Menu (Fades in when scrolled) */}
            <div className={`hidden md:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 space-x-8 z-10 header-transition
              ${isScrolled ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-4 invisible'}
            `}>
              {NAV_ITEMS.map((item) => (
                <Link key={`scrolled-${item.id}`} to={item.path} className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${item.highlight ? 'text-[#E5A3B8]' : 'text-[#333333] hover:text-[#E5A3B8]'}`}>
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Right: Icons with Text */}
            <div className="flex items-center justify-end flex-1 space-x-6 md:space-x-8 text-[#333333] z-20">
              
              {/* Search */}
              <button onClick={() => setIsSearchOpen(true)} className="flex flex-col items-center group">
                <Search size={22} className="group-hover:text-[#E5A3B8] transition-colors" strokeWidth={1.5} />
                {/* using whitespace-nowrap and exact height prevents text jitter */}
                <span className={`hidden md:block text-[9px] uppercase tracking-widest text-gray-500 group-hover:text-[#333333] header-transition origin-top overflow-hidden whitespace-nowrap
                  ${isScrolled ? 'h-0 opacity-0 mt-0' : 'h-[16px] opacity-100 mt-1'}
                `}>Recherche</span>
              </button>
              
              {/* Account Dropdown */}
              <div className="relative" onMouseEnter={() => setIsProfileMenuOpen(true)} onMouseLeave={() => setIsProfileMenuOpen(false)}>
                {userInfo ? (
                  <div className="flex flex-col items-center cursor-pointer group">
                    <User size={22} className="group-hover:text-[#E5A3B8] transition-colors" strokeWidth={1.5} />
                    <span className={`hidden md:block text-[9px] uppercase tracking-widest text-gray-500 group-hover:text-[#333333] header-transition origin-top overflow-hidden whitespace-nowrap
                      ${isScrolled ? 'h-0 opacity-0 mt-0' : 'h-[16px] opacity-100 mt-1'}
                    `}>Compte</span>
                  </div>
                ) : (
                  <Link to="/login" className="flex flex-col items-center group">
                    <User size={22} className="group-hover:text-[#E5A3B8] transition-colors" strokeWidth={1.5} />
                    <span className={`hidden md:block text-[9px] uppercase tracking-widest text-gray-500 group-hover:text-[#333333] header-transition origin-top overflow-hidden whitespace-nowrap
                      ${isScrolled ? 'h-0 opacity-0 mt-0' : 'h-[16px] opacity-100 mt-1'}
                    `}>Compte</span>
                  </Link>
                )}

                {isProfileMenuOpen && userInfo && (
                  <div className="absolute right-0 top-full mt-4 w-56 bg-white border border-gray-100 shadow-2xl rounded-sm overflow-hidden z-50">
                    <div className="px-4 py-4 border-b border-gray-50 bg-[#FAFAFA]">
                      <p className="text-sm font-medium text-[#333333] truncate">{userInfo.name}</p>
                      <p className="text-xs text-gray-500 truncate">{userInfo.email}</p>
                    </div>
                    <div className="py-2">
                      <Link to="/profile" className="block px-4 py-2 text-sm text-gray-600 hover:bg-[#F8C8DC]/20 hover:text-[#E5A3B8]">Mon Profil</Link>
                      <Link to="/orders" className="block px-4 py-2 text-sm text-gray-600 hover:bg-[#F8C8DC]/20 hover:text-[#E5A3B8]">Mes Commandes</Link>
                      {userInfo.isAdmin && (
                        <Link to="/admin/dashboard" className="block px-4 py-2 text-sm font-medium text-[#333333] hover:bg-[#E5A3B8] hover:text-white border-t border-gray-50 mt-1 pt-3">Dashboard Admin</Link>
                      )}
                    </div>
                    <button onClick={logoutHandler} className="block w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 border-t border-gray-100">Se déconnecter</button>
                  </div>
                )}
              </div>
              
              {/* Cart */}
              <button onClick={() => dispatch(toggleCart())} className="flex flex-col items-center relative group">
                <div className="relative">
                  <ShoppingBag size={22} className="group-hover:text-[#E5A3B8] transition-colors" strokeWidth={1.5} />
                  <span className="absolute -top-1.5 -right-2 bg-[#E5A3B8] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartTotalQuantity || 0}
                  </span>
                </div>
                <span className={`hidden md:block text-[9px] uppercase tracking-widest text-gray-500 group-hover:text-[#333333] header-transition origin-top overflow-hidden whitespace-nowrap
                  ${isScrolled ? 'h-0 opacity-0 mt-0' : 'h-[16px] opacity-100 mt-1'}
                `}>Panier</span>
              </button>
            </div>
          </div>

          {/* --- 3. MIDDLE BAR (Navigation Links) --- */}
          <div className={`hidden md:flex justify-center items-center space-x-10 header-transition origin-top overflow-hidden
            ${isScrolled ? 'h-0 opacity-0' : 'h-[48px] opacity-100'}
          `}>
            {NAV_ITEMS.map((item) => (
              <Link 
                key={item.id} 
                to={item.path} 
                className={`text-sm font-bold uppercase tracking-widest transition-colors duration-300 ${
                  item.highlight ? 'text-[#E5A3B8] hover:text-[#333333]' : 'text-[#333333] hover:text-[#E5A3B8]'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link to="/categories" className="text-gray-400 hover:text-[#333333] tracking-widest font-bold">...</Link>
          </div>

          {/* --- 4. BOTTOM BAR (Stories) --- */}
          <div className={`flex overflow-x-auto hide-scrollbar justify-start md:justify-center gap-6 md:gap-10 snap-x header-transition origin-top overflow-hidden
            ${isScrolled ? 'h-0 opacity-0 pt-0 pb-0' : 'h-[110px] md:h-[130px] opacity-100 pt-2 pb-6'}
          `}>
            {STORY_CATEGORIES.map(category => (
              <Link key={category.id} to={`/categories?filter=${category.id}`} className="flex flex-col items-center gap-3 group shrink-0 snap-start cursor-pointer">
                <div className="w-[60px] h-[60px] md:w-[68px] md:h-[68px] rounded-full p-[2px] bg-gradient-to-tr from-gray-200 to-gray-300 group-hover:from-[#F8C8DC] group-hover:to-[#E5A3B8] transition-all duration-300 shadow-sm">
                  <div className="w-full h-full rounded-full border-[3px] border-white overflow-hidden bg-white">
                    <img src={category.image} alt={category.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </div>
                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-[#333333] group-hover:text-[#E5A3B8] transition-colors text-center w-20 md:w-24 leading-tight">
                  {category.label}
                </span>
              </Link>
            ))}
          </div>

        </div>

        {/* --- MOBILE MENU DROPDOWN --- */}
        <div className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${isMobileMenuOpen ? 'max-h-screen opacity-100 visible' : 'max-h-0 opacity-0 invisible'}`}>
          <div className="px-4 pt-4 pb-8 space-y-2">
            
            <div className="border-b border-gray-100 pb-4 mb-4">
              {userInfo ? (
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest text-[#333333]">Bonjour, {userInfo.name}</p>
                  <div className="flex flex-col mt-3 space-y-3">
                    <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-gray-600 hover:text-[#E5A3B8]">Mon Profil</Link>
                    {userInfo.isAdmin && <Link to="/admin/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold text-[#E5A3B8]">Dashboard Admin</Link>}
                    <button onClick={logoutHandler} className="text-sm font-medium text-left text-red-500">Se déconnecter</button>
                  </div>
                </div>
              ) : (
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest text-[#E5A3B8] flex items-center gap-2">
                  <User size={18} /> Se connecter / Créer un compte
                </Link>
              )}
            </div>

            {NAV_ITEMS.map((item) => (
              <Link 
                key={item.id}
                to={item.path} 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block py-3 font-bold uppercase tracking-widest border-b border-gray-50 transition-colors ${
                  item.highlight ? 'text-[#E5A3B8]' : 'text-[#333333] hover:text-[#E5A3B8]'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <button className="flex w-full items-center space-x-3 py-4 text-[#E5A3B8] font-bold uppercase tracking-widest transition-opacity mt-4 bg-gray-50 justify-center rounded-sm">
              <Sparkles size={18} />
              <span>Demander à l'IA Styliste</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;