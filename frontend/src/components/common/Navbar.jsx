import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, Sparkles, User, ArrowRight, ChevronRight, LogOut, UserCircle, PackageSearch } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCart } from '../../store/slices/cartSlice';
import { useGetProductsQuery } from '../../store/slices/productsApiSlice';
import { logout } from '../../store/slices/authSlice'; 

import Logo from '../../assets/logo.jpg';

// Main Navigation Items
const NAV_ITEMS = [
  { id: 'new', label: 'Nouveautés', path: '/new' },
  { id: 'collection', label: 'Prêt-à-porter', path: '/categories' },
  { id: 'accessories', label: 'Accessoires', path: '/accessories' },
  { id: 'history', label: 'Notre Histoire', path: '/history' },
];

// Instagram Story Style Categories
const STORY_CATEGORIES = [
  { id: 'dresses', label: 'Robes', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=200&auto=format&fit=crop' },
  { id: 'tops', label: 'Essentiels', image: 'https://images.unsplash.com/photo-1551163943-3f6a855d1153?q=80&w=200&auto=format&fit=crop' },
  { id: 'outerwear', label: 'Vestes', image: 'https://geox-cdn.thron.com/delivery/public/thumbnail/geox/EC_W6520ET3340F5263_105/crzcqo/std/1024x1024/EC_AB105176_105.jpg' },
  { id: 'sale', label: 'Outlet', image: 'https://www.parfois.com/dw/image/v2/BBKR_PRD/on/demandware.static/-/Sites-parfois-master-catalog/default/dwb05f1261/images/hi-res/261/64/245007_BG_1y.jpg?sw=1000' },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

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
    navigate('/login');
  };

  // Scroll effect for Glassmorphism
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Search overlay body lock
  useEffect(() => {
    if (isSearchOpen || isMobileMenuOpen) document.body.style.overflow = 'hidden';
    else {
      document.body.style.overflow = 'unset';
      setSearchTerm(''); 
    }
    const handleEsc = (e) => { if (e.key === 'Escape') setIsSearchOpen(false); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isSearchOpen, isMobileMenuOpen]);

  return (
    <>
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}
      </style>

      {/* --- SEARCH FULL-SCREEN OVERLAY --- */}
      <div className={`fixed inset-0 bg-white/95 backdrop-blur-xl z-[100] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isSearchOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className={`max-w-6xl mx-auto px-4 sm:px-6 h-full flex flex-col relative transition-transform duration-700 delay-100 ${isSearchOpen ? 'translate-y-0' : '-translate-y-8'}`}>
          
          <button onClick={closeSearch} className="absolute top-8 right-4 md:right-8 text-gray-400 hover:text-black hover:rotate-90 transition-all duration-300">
            <X size={32} strokeWidth={1} />
          </button>

          <div className="relative mt-24 md:mt-32 border-b border-gray-200 pb-4">
            <Search size={28} strokeWidth={1.25} className="absolute left-0 top-1/2 -translate-y-1/2 text-black/40" />
            <input 
              type="text"
              autoFocus={isSearchOpen}
              placeholder="Rechercher une pièce..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent pl-12 pr-4 text-3xl md:text-6xl font-serif text-black placeholder-gray-200 focus:outline-none tracking-tight"
            />
          </div>

          <div className="flex-1 overflow-y-auto py-12 hide-scrollbar">
            {searchTerm.length > 0 ? (
              <div className="animate-fade-in">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-[10px] font-medium text-gray-400 uppercase tracking-[0.25em]">Résultats ({searchResults.length})</h3>
                  <Link to="/categories" onClick={closeSearch} className="text-[10px] font-medium text-black uppercase tracking-[0.2em] border-b border-black pb-0.5 hover:text-[#E5A3B8] hover:border-[#E5A3B8] transition-colors">Tout voir</Link>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-10">
                  {searchResults.slice(0, 5).map((product) => (
                    <Link key={product._id || product.id} to={`/product/${product._id || product.id}`} onClick={closeSearch} className="group flex flex-col gap-4">
                      <div className="w-full aspect-[3/4] bg-[#F8F8F8] overflow-hidden relative">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
                      </div>
                      <div className="flex flex-col">
                        <h4 className="text-black text-xs font-medium uppercase tracking-wide truncate group-hover:text-[#E5A3B8] transition-colors">{product.name}</h4>
                        <p className="text-gray-500 text-xs mt-1 font-serif italic">{product.price.toFixed(2)} €</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-12">
                 <div>
                   <h3 className="text-[10px] font-medium text-gray-400 uppercase tracking-[0.25em] mb-6">Tendances Actuelles</h3>
                   <div className="flex flex-wrap gap-3">
                     {['Robes d\'été', 'Veste en Jean', 'Sacs à main', 'Nouveautés'].map((tag) => (
                       <button key={tag} onClick={() => setSearchTerm(tag)} className="px-5 py-2.5 border border-gray-200 rounded-full text-black text-[10px] uppercase tracking-wider hover:border-black transition-all hover:bg-black hover:text-white">{tag}</button>
                     ))}
                   </div>
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- MAIN HEADER --- */}
      <header className={`fixed top-0 z-40 w-full transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100' : 'bg-white border-b border-gray-100'}`}>
        
        {/* Top Announcement Bar */}
        <div className="bg-[#1A1A1A] text-white text-[9px] font-medium tracking-[0.25em] uppercase flex items-center justify-center gap-3 py-2.5">
          <span>Livraison offerte dès 100€ d'achat</span>
          <span className="hidden sm:inline text-[#E5A3B8] opacity-60">|</span>
          <span className="hidden sm:inline">Retours gratuits sous 14 jours</span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            
            {/* LEFT: Mobile Menu Button & Desktop Links */}
            <div className="flex-1 flex items-center h-full">
              <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden text-black p-2 -ml-2 hover:text-[#E5A3B8] transition-colors">
                <Menu size={24} strokeWidth={1.25} />
              </button>

              <nav className="hidden md:flex space-x-8 h-full items-center">
                {NAV_ITEMS.map((item) => (
                  <Link 
                    key={item.id} 
                    to={item.path} 
                    className={`h-full flex items-center text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors relative group
                      ${isActive(item.path) ? 'text-black' : 'text-gray-500 hover:text-black'}
                    `}
                  >
                    {item.label}
                    <span className={`absolute bottom-0 left-0 h-[2px] bg-black transition-all duration-300 ease-out ${isActive(item.path) ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* CENTER: Logo */}
            <div className="shrink-0 flex justify-center items-center">
              <Link to="/" className="block hover:opacity-80 transition-opacity transform hover:scale-[1.02] duration-300">
                <img src={Logo} alt="So Chic Lady" className="h-10 md:h-14 w-auto object-contain" />
              </Link>
            </div>

            {/* RIGHT: Icons */}
            <div className="flex-1 flex items-center justify-end space-x-5 md:space-x-7 h-full">
              
              {/* AI Stylist */}
              <button className="hidden lg:flex items-center gap-2 text-gray-400 hover:text-[#E5A3B8] transition-colors group">
                <Sparkles size={16} strokeWidth={1.5} className="group-hover:animate-pulse" />
                <span className="text-[9px] font-bold uppercase tracking-widest mt-0.5">AI Stylist</span>
              </button>

              <div className="w-[1px] h-4 bg-gray-200 hidden lg:block"></div>

              {/* Search */}
              <button onClick={() => setIsSearchOpen(true)} className="text-black hover:text-[#E5A3B8] transition-colors p-1">
                <Search size={22} strokeWidth={1.25} />
              </button>
              
              {/* Account / Profile (ROCK SOLID HOVER FIX) */}
              <div className="relative group h-full flex items-center">
                {userInfo ? (
                  <Link to="/profile" className="text-black hover:text-[#E5A3B8] transition-colors p-1">
                    <User size={22} strokeWidth={1.25} />
                  </Link>
                ) : (
                  <Link to="/login" className="text-black hover:text-[#E5A3B8] transition-colors p-1 block">
                    <User size={22} strokeWidth={1.25} />
                  </Link>
                )}

                {/* Dropdown Menu - Triggered entirely by CSS group-hover */}
                {userInfo && (
                  <div className="absolute right-[-10px] top-full pt-4 opacity-0 invisible translate-y-3 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] z-50">
                    <div className="w-64 bg-white/80 backdrop-blur-xl border border-gray-100/50 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] rounded-2xl overflow-hidden p-2">
                      
                      {/* User Header */}
                      <div className="px-4 py-4 mb-2 bg-[#FAFAFA] rounded-xl flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white text-sm font-serif">
                          {userInfo.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-xs font-bold text-black truncate uppercase tracking-widest">{userInfo.name}</p>
                          <p className="text-[10px] text-gray-500 truncate mt-0.5">{userInfo.email}</p>
                        </div>
                      </div>

                      {/* Links */}
                      <div className="space-y-1">
                        <Link to="/profile" className="flex items-center gap-3 px-4 py-2.5 text-xs text-gray-600 font-medium hover:bg-[#F8F8F8] hover:text-black rounded-lg transition-colors">
                          <UserCircle size={16} strokeWidth={1.5} /> Mon Profil
                        </Link>
                        <Link to="/orders" className="flex items-center gap-3 px-4 py-2.5 text-xs text-gray-600 font-medium hover:bg-[#F8F8F8] hover:text-black rounded-lg transition-colors">
                          <PackageSearch size={16} strokeWidth={1.5} /> Mes Commandes
                        </Link>
                        {userInfo.isAdmin && (
                          <div className="pt-1 mt-1 border-t border-gray-100">
                            <Link to="/admin/dashboard" className="flex items-center gap-3 px-4 py-2.5 text-xs text-black font-bold uppercase tracking-wider hover:bg-[#F8C8DC]/20 rounded-lg transition-colors">
                              <Sparkles size={16} strokeWidth={1.5} className="text-[#E5A3B8]" /> Espace Admin
                            </Link>
                          </div>
                        )}
                      </div>

                      {/* Logout */}
                      <div className="pt-1 mt-1 border-t border-gray-100">
                        <button onClick={logoutHandler} className="flex w-full items-center gap-3 px-4 py-2.5 text-xs text-red-500 font-medium hover:bg-red-50 rounded-lg transition-colors">
                          <LogOut size={16} strokeWidth={1.5} /> Déconnexion
                        </button>
                      </div>

                    </div>
                  </div>
                )}
              </div>
              
              {/* Cart */}
              <button onClick={() => dispatch(toggleCart())} className="text-black hover:text-[#E5A3B8] transition-colors p-1 relative group">
                <ShoppingBag size={22} strokeWidth={1.25} />
                {cartTotalQuantity > 0 && (
                  <span className="absolute 0 -right-1 top-0 min-w-[16px] h-[16px] px-1 bg-[#E5A3B8] text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm transition-transform group-hover:scale-110">
                    {cartTotalQuantity}
                  </span>
                )}
              </button>
            </div>
            
          </div>
        </div>

        {/* --- BOTTOM ROW: Stories (Desktop Only) --- */}
        <div className={`hidden md:block transition-all duration-300 ${isScrolled ? 'h-0 opacity-0 overflow-hidden' : 'h-[80px] opacity-100 border-t border-gray-50 bg-[#FAFAFA]'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
            <div className="flex justify-center items-center h-full gap-16 overflow-x-auto hide-scrollbar">
              {STORY_CATEGORIES.map(category => (
                <Link key={category.id} to={`/categories?filter=${category.id}`} className="flex items-center gap-3 group shrink-0">
                  <div className="w-11 h-11 rounded-full p-[2px] border border-gray-300 group-hover:border-[#E5A3B8] transition-colors duration-300">
                    <img src={category.image} alt={category.label} className="w-full h-full rounded-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                  </div>
                  <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-500 group-hover:text-black transition-colors">
                    {category.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Spacer to push content below fixed header */}
      <div className={`w-full transition-all duration-300 ${isScrolled ? 'h-[90px] md:h-[105px]' : 'h-[90px] md:h-[185px]'}`}></div>

      {/* --- MOBILE DRAWER MENU --- */}
      <div className={`fixed inset-0 z-[110] transition-opacity duration-500 md:hidden ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
        
        {/* Drawer */}
        <div className={`absolute top-0 left-0 h-full w-[85%] max-w-[320px] bg-white shadow-2xl flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          
          <div className="p-5 flex justify-between items-center border-b border-gray-100">
            <img src={Logo} alt="So Chic" className="h-8 object-contain" />
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-400 hover:text-black bg-gray-50 rounded-full transition-colors">
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-8">
            <nav className="flex flex-col space-y-6">
              {NAV_ITEMS.map((item) => (
                <Link 
                  key={item.id}
                  to={item.path} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-semibold uppercase tracking-[0.2em] text-black hover:text-[#E5A3B8] transition-colors flex justify-between items-center group"
                >
                  {item.label}
                  <ChevronRight size={16} className="text-gray-300 group-hover:text-[#E5A3B8] group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </nav>

            <div className="mt-12 pt-8 border-t border-gray-100">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">Découvrir</p>
              <div className="grid grid-cols-2 gap-4">
                 {STORY_CATEGORIES.map(category => (
                  <Link key={`mob-${category.id}`} to={`/categories?filter=${category.id}`} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-full border border-gray-200 overflow-hidden shrink-0">
                      <img src={category.image} alt={category.label} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300" />
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-gray-600 font-medium group-hover:text-black transition-colors">{category.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-gray-100 bg-[#FAFAFA] space-y-4">
            <button className="flex w-full items-center justify-center space-x-2 py-3.5 bg-black text-white rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-[#E5A3B8] transition-colors shadow-lg shadow-black/10">
              <Sparkles size={14} />
              <span>IA Styliste Personnelle</span>
            </button>
            
            {userInfo ? (
               <div className="flex justify-between items-center px-2">
                 <div className="flex items-center gap-2">
                   <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold">
                     {userInfo.name.charAt(0)}
                   </div>
                   <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="text-[10px] font-bold uppercase tracking-wider hover:text-[#E5A3B8] transition-colors">Mon Compte</Link>
                 </div>
                 <button onClick={logoutHandler} className="text-gray-400 hover:text-red-500 transition-colors" title="Déconnexion">
                    <LogOut size={16} />
                 </button>
               </div>
            ) : (
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-wider hover:text-[#E5A3B8] transition-colors py-2">
                 <User size={16} strokeWidth={1.5} /> Se connecter / Créer un compte
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;