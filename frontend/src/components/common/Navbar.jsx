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
  { id: 'new', label: 'Nouveautés', path: '/new' },
  { id: 'collection', label: 'Prêt-à-porter', path: '/categories' },
  { id: 'accessories', label: 'Accessoires', path: '/accessories' },
  { id: 'history', label: 'Notre Histoire', path: '/history' },
];

// Instagram Story Style Categories
const STORY_CATEGORIES = [
  { id: 'dresses', label: 'Robes Tendance', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=200&auto=format&fit=crop' },
  { id: 'tops', label: 'Les Essentiels', image: 'https://images.unsplash.com/photo-1551163943-3f6a855d1153?q=80&w=200&auto=format&fit=crop' },
  { id: 'outerwear', label: 'Vestes', image: 'https://geox-cdn.thron.com/delivery/public/thumbnail/geox/EC_W6520ET3340F5263_105/crzcqo/std/1024x1024/EC_AB105176_105.jpg' },
  { id: 'sale', label: 'Petits Prix', image: 'https://www.parfois.com/dw/image/v2/BBKR_PRD/on/demandware.static/-/Sites-parfois-master-catalog/default/dwb05f1261/images/hi-res/261/64/245007_BG_1y.jpg?sw=1000' },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false); 
  const [searchTerm, setSearchTerm] = useState('');
  
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
    setIsProfileMenuOpen(false);
    navigate('/login');
  };

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
        `}
      </style>

      {/* --- SEARCH OVERLAY --- */}
      <div className={`fixed inset-0 bg-white/95 backdrop-blur-sm z-[100] transition-opacity duration-300 ${isSearchOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="max-w-5xl mx-auto px-4 pt-16 h-full flex flex-col relative">
          <button onClick={closeSearch} className="absolute top-6 right-4 md:right-0 text-gray-500 hover:text-black transition-colors">
            <X size={28} strokeWidth={1.5} />
          </button>

          <div className="relative mt-12 border-b border-gray-300 pb-3">
            <Search size={24} strokeWidth={1.5} className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text"
              autoFocus={isSearchOpen}
              placeholder="Que recherchez-vous ?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent pl-10 pr-4 text-xl md:text-3xl font-serif text-black placeholder-gray-300 focus:outline-none"
            />
          </div>

          <div className="flex-1 overflow-y-auto py-8 hide-scrollbar">
            {searchTerm.length > 0 ? (
              <div>
                <h3 className="text-[10px] font-medium text-gray-400 uppercase tracking-[0.2em] mb-6">Résultats</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {searchResults.slice(0, 8).map((product) => (
                    <Link key={product._id || product.id} to={`/product/${product._id || product.id}`} onClick={closeSearch} className="group flex flex-col gap-3">
                      <div className="w-full aspect-[3/4] bg-gray-50 overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="flex flex-col">
                        <h4 className="text-black text-xs font-medium uppercase tracking-wide truncate">{product.name}</h4>
                        <p className="text-gray-500 text-xs mt-1">{product.price.toFixed(2)} €</p>
                      </div>
                    </Link>
                  ))}
                </div>
                {searchResults.length === 0 && (
                  <p className="text-gray-500 text-sm mt-4">Aucun résultat trouvé.</p>
                )}
              </div>
            ) : (
              <div>
                 <h3 className="text-[10px] font-medium text-gray-400 uppercase tracking-[0.2em] mb-6">Recherches Suggerées</h3>
                 <div className="flex flex-wrap gap-2">
                   {['Robes d\'été', 'Veste en Jean', 'Sacs à main', 'Nouveautés'].map((tag) => (
                     <button key={tag} onClick={() => setSearchTerm(tag)} className="px-4 py-2 border border-gray-200 text-gray-600 text-xs uppercase tracking-wider hover:border-black hover:text-black transition-colors">{tag}</button>
                   ))}
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- MAIN HEADER --- */}
      <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
        
        {/* Top Announcement Bar */}
        <div className="bg-black text-white text-[9px] font-medium tracking-[0.2em] uppercase flex items-center justify-center gap-2 py-2">
          <span>Livraison offerte dès 100€ d'achat</span>
          <span className="hidden sm:inline opacity-50">|</span>
          <span className="hidden sm:inline">Retours gratuits sous 14 jours</span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Nav Row */}
          <div className="flex justify-between items-center h-16 md:h-20 relative">
            
            {/* LEFT: Desktop Links & Mobile Menu Button */}
            <div className="flex-1 flex items-center">
              {/* Mobile Menu Icon */}
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-black p-2 -ml-2">
                {isMobileMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
              </button>

              {/* Desktop Links */}
              <nav className="hidden md:flex space-x-6 lg:space-x-8">
                {NAV_ITEMS.map((item) => (
                  <Link 
                    key={item.id} 
                    to={item.path} 
                    className={`text-[11px] uppercase tracking-[0.15em] transition-colors relative group py-2
                      ${isActive(item.path) ? 'text-black' : 'text-gray-500 hover:text-black'}
                    `}
                  >
                    {item.label}
                    <span className={`absolute bottom-0 left-0 h-[1px] bg-black transition-all duration-300 ${isActive(item.path) ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* CENTER: Logo */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Link to="/" className="block hover:opacity-70 transition-opacity">
                <img src={Logo} alt="So Chic Lady" className="h-10 md:h-14 w-auto object-contain" />
              </Link>
            </div>

            {/* RIGHT: Icons */}
            <div className="flex-1 flex items-center justify-end space-x-4 md:space-x-6">
              
              {/* AI Stylist */}
              <button className="hidden sm:flex items-center gap-1.5 text-gray-500 hover:text-[#E5A3B8] transition-colors">
                <Sparkles size={16} strokeWidth={1.5} />
                <span className="text-[10px] uppercase tracking-widest mt-0.5">AI Stylist</span>
              </button>

              {/* Search */}
              <button onClick={() => setIsSearchOpen(true)} className="text-black hover:opacity-60 transition-opacity p-1">
                <Search size={20} strokeWidth={1.5} />
              </button>
              
              {/* Account */}
              <div className="relative" onMouseEnter={() => setIsProfileMenuOpen(true)} onMouseLeave={() => setIsProfileMenuOpen(false)}>
                {userInfo ? (
                  <div className="text-black hover:opacity-60 transition-opacity p-1 cursor-pointer">
                    <User size={20} strokeWidth={1.5} />
                  </div>
                ) : (
                  <Link to="/login" className="text-black hover:opacity-60 transition-opacity p-1 block">
                    <User size={20} strokeWidth={1.5} />
                  </Link>
                )}

                {/* Account Dropdown */}
                {isProfileMenuOpen && userInfo && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-sm overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                      <p className="text-xs font-medium text-black truncate uppercase tracking-wider">{userInfo.name}</p>
                    </div>
                    <div className="py-1">
                      <Link to="/profile" className="block px-4 py-2 text-xs text-gray-600 hover:bg-gray-50 hover:text-black">Mon Profil</Link>
                      <Link to="/orders" className="block px-4 py-2 text-xs text-gray-600 hover:bg-gray-50 hover:text-black">Mes Commandes</Link>
                      {userInfo.isAdmin && (
                        <Link to="/admin/dashboard" className="block px-4 py-2 text-xs text-black font-medium hover:bg-gray-50 border-t border-gray-100 mt-1 pt-2">Espace Admin</Link>
                      )}
                    </div>
                    <button onClick={logoutHandler} className="block w-full text-left px-4 py-3 text-xs text-red-500 hover:bg-gray-50 border-t border-gray-100">Déconnexion</button>
                  </div>
                )}
              </div>
              
              {/* Cart */}
              <button onClick={() => dispatch(toggleCart())} className="text-black hover:opacity-60 transition-opacity p-1 relative">
                <ShoppingBag size={20} strokeWidth={1.5} />
                <span className="absolute -top-0.5 -right-1 bg-black text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {cartTotalQuantity || 0}
                </span>
              </button>
            </div>
            
          </div>
        </div>

        {/* --- BOTTOM ROW: Minimalist Story Categories --- */}
        <div className="border-t border-gray-100 bg-white hidden md:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center gap-12 py-3 overflow-x-auto hide-scrollbar">
              {STORY_CATEGORIES.map(category => (
                <Link key={category.id} to={`/categories?filter=${category.id}`} className="flex items-center gap-3 group shrink-0">
                  <div className="w-10 h-10 rounded-full border border-gray-200 p-0.5 group-hover:border-black transition-colors">
                    <img src={category.image} alt={category.label} className="w-full h-full rounded-full object-cover" />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-gray-500 group-hover:text-black transition-colors">
                    {category.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* --- MOBILE MENU DROPDOWN --- */}
      <div className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-300 md:hidden ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setIsMobileMenuOpen(false)}>
        {/* Clicking outside closes the menu */}
      </div>

      <div className={`fixed top-0 left-0 h-full w-[80%] max-w-sm bg-white z-50 shadow-xl transition-transform duration-300 ease-in-out md:hidden flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 flex justify-between items-center border-b border-gray-100">
          <span className="text-xs font-bold uppercase tracking-widest">Menu</span>
          <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-500"><X size={20} strokeWidth={1.5} /></button>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <nav className="flex flex-col space-y-1 px-4">
            {NAV_ITEMS.map((item) => (
              <Link 
                key={item.id}
                to={item.path} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-3 text-sm uppercase tracking-widest border-b border-gray-50 text-gray-800"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="px-4 mt-8">
            <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-4">Découvrir</p>
            <div className="flex flex-wrap gap-4">
               {STORY_CATEGORIES.map(category => (
                <Link key={`mob-${category.id}`} to={`/categories?filter=${category.id}`} onClick={() => setIsMobileMenuOpen(false)} className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-full border border-gray-200 p-0.5">
                    <img src={category.image} alt={category.label} className="w-full h-full rounded-full object-cover" />
                  </div>
                  <span className="text-[9px] uppercase tracking-wider text-gray-600 text-center w-16 truncate">{category.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-100 bg-gray-50 space-y-4">
          <button className="flex w-full items-center justify-center space-x-2 py-3 border border-black text-black text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
            <Sparkles size={14} />
            <span>IA Styliste</span>
          </button>
          
          {userInfo ? (
             <div className="flex justify-between items-center">
               <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="text-xs font-medium uppercase tracking-wider">Mon Compte</Link>
               <button onClick={logoutHandler} className="text-xs text-red-500 uppercase tracking-wider">Déconnexion</button>
             </div>
          ) : (
            <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider">
               <User size={16} /> Se connecter
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;