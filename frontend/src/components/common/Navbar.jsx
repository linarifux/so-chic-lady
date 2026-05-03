import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, Sparkles, User, ArrowRight } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCart } from '../../store/slices/cartSlice';
import { useGetProductsQuery } from '../../store/slices/productsApiSlice';
import { logout } from '../../store/slices/authSlice'; 

import Logo from '../../assets/logo.jpg';

const NAV_ITEMS = [
  { id: 'home', label: 'Accueil', path: '/' },
  { id: 'collection', label: 'Collection', path: '/categories' },
  { id: 'history', label: 'Notre Histoire', path: '/history' },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false); 
  const [searchTerm, setSearchTerm] = useState('');
  
  const location = useLocation();
  const navigate = useNavigate();

  // --- REDUX HOOKS ---
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth); 
  const dispatch = useDispatch();

  // --- SEARCH DATA ---
  const { data: products } = useGetProductsQuery();
  
  const searchResults = products?.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const isActive = (path) => location.pathname === path;

  // --- HANDLERS ---
  const closeSearch = () => setIsSearchOpen(false);

  const logoutHandler = () => {
    dispatch(logout());
    setIsProfileMenuOpen(false);
    navigate('/login');
  };

  // Close search and lock body scroll when overlay is open
  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setSearchTerm(''); 
    }
    
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsSearchOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isSearchOpen]);

  return (
    <>
      {/* --- SEARCH OVERLAY --- */}
      <div 
        className={`fixed inset-0 bg-white/95 backdrop-blur-md z-[100] transition-all duration-500 ease-in-out ${
          isSearchOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 pt-20 h-full flex flex-col relative">
          <button 
            onClick={closeSearch}
            className="absolute top-8 right-4 md:right-0 text-gray-400 hover:text-[#333333] transition-colors hover:rotate-90 duration-300"
          >
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
                <h3 className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-6">
                  Résultats ({searchResults.length})
                </h3>
                
                {searchResults.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {searchResults.slice(0, 6).map((product) => (
                      <Link 
                        key={product._id || product.id} 
                        to={`/product/${product._id || product.id}`}
                        onClick={closeSearch}
                        className="group flex items-start gap-4"
                      >
                        <div className="w-20 h-28 bg-gray-100 rounded-sm overflow-hidden shrink-0 relative">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        </div>
                        <div className="flex flex-col py-1">
                          <h4 className="text-[#333333] font-medium text-sm group-hover:text-[#E5A3B8] transition-colors leading-tight mb-1">
                            {product.name}
                          </h4>
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
                    <p className="text-gray-500 mt-2 font-light">Essayez d'utiliser d'autres mots-clés ou vérifiez l'orthographe.</p>
                  </div>
                )}
              </div>
            )}
            
            {searchTerm.length === 0 && (
              <div>
                 <h3 className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-6">Recherches Populaires</h3>
                 <div className="flex flex-wrap gap-3">
                   {['Robes d\'été', 'Veste en Jean', 'Sacs à main', 'Nouveautés'].map((tag) => (
                     <button 
                        key={tag}
                        onClick={() => setSearchTerm(tag)}
                        className="px-4 py-2 bg-gray-50 text-gray-600 rounded-full text-sm hover:bg-[#F8C8DC]/30 hover:text-[#333333] transition-colors"
                      >
                       {tag}
                     </button>
                   ))}
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- STICKY HEADER WRAPPER --- */}
      <header className="sticky top-0 z-50 w-full flex flex-col">
        
        {/* --- 1. ANNOUNCEMENT BAR --- */}
        <div className="bg-[#333333] text-white text-[10px] sm:text-xs font-medium tracking-[0.2em] uppercase text-center py-2.5 px-4 flex items-center justify-center gap-3">
          <span>✨ Livraison offerte dès 100€ d'achat</span>
          <span className="hidden md:inline text-[#E5A3B8]">•</span>
          <span className="hidden md:inline">Retours gratuits sous 14 jours</span>
        </div>

        {/* --- 2. STANDARD NAVBAR --- */}
        <nav className="w-full bg-[#FAFAFA]/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-24 md:h-28">
              
              {/* Left: Mobile Menu Button */}
              <div className="flex items-center md:hidden">
                <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                  className="text-[#333333] hover:text-[#E5A3B8] transition-colors focus:outline-none"
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>

              {/* Center/Left: Logo */}
              <div className="flex-shrink-0 flex items-center justify-center md:justify-start flex-1 md:flex-none">
                <Link to="/" className="text-2xl md:text-3xl font-serif font-bold text-[#333333] tracking-wider hover:opacity-80 transition-opacity">
                  <img src={Logo} alt="So Chic Lady Logo" className="h-20 md:h-24 w-auto" />
                </Link>
              </div>

              {/* Desktop Navigation */}
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
                    <span className={`absolute -bottom-1 left-0 h-[2px] bg-[#E5A3B8] transition-all duration-300 ${
                      isActive(item.path) ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></span>
                  </Link>
                ))}
              </div>

              {/* Right: Icons */}
              <div className="flex items-center space-x-5 text-[#333333]">
                <button className="hidden md:flex items-center space-x-1 text-sm bg-gradient-to-r from-[#F8C8DC] to-[#E5A3B8] text-[#333333] px-3 py-1.5 rounded-full hover:shadow-md hover:scale-105 transition-all duration-300 font-medium">
                  <Sparkles size={16} />
                  <span>AI Stylist</span>
                </button>
                
                <button onClick={() => setIsSearchOpen(true)} className="hover:text-[#E5A3B8] hover:scale-110 transition-all duration-200">
                  <Search size={22} />
                </button>
                
                {/* User Account Dropdown */}
                <div 
                  className="relative hidden sm:block"
                  onMouseEnter={() => setIsProfileMenuOpen(true)}
                  onMouseLeave={() => setIsProfileMenuOpen(false)}
                >
                  {userInfo ? (
                    <div className="flex items-center gap-1 cursor-pointer hover:text-[#E5A3B8] transition-colors py-2">
                      <User size={22} />
                      <span className="text-sm font-medium hidden lg:block">{userInfo.name.split(' ')[0]}</span>
                    </div>
                  ) : (
                    <Link to="/login" className="hover:text-[#E5A3B8] hover:scale-110 transition-all duration-200 flex py-2">
                      <User size={22} />
                    </Link>
                  )}

                  {/* Dropdown Menu */}
                  {isProfileMenuOpen && userInfo && (
                    <div className="absolute right-0 top-full w-56 bg-white border border-gray-100 shadow-xl rounded-sm overflow-hidden z-50">
                      <div className="px-4 py-3 border-b border-gray-50 bg-[#FAFAFA]">
                        <p className="text-sm font-medium text-[#333333] truncate">{userInfo.name}</p>
                        <p className="text-xs text-gray-500 truncate">{userInfo.email}</p>
                      </div>
                      
                      <div className="py-2">
                        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-600 hover:bg-[#F8C8DC]/20 hover:text-[#E5A3B8] transition-colors">
                          Mon Profil
                        </Link>
                        <Link to="/orders" className="block px-4 py-2 text-sm text-gray-600 hover:bg-[#F8C8DC]/20 hover:text-[#E5A3B8] transition-colors">
                          Mes Commandes
                        </Link>
                        
                        {/* ADMIN ONLY LINK */}
                        {userInfo.isAdmin && (
                          <Link to="/admin/dashboard" className="block px-4 py-2 text-sm font-medium text-[#333333] hover:bg-[#E5A3B8] hover:text-white transition-colors border-t border-gray-50 mt-1 pt-3">
                            Dashboard Admin
                          </Link>
                        )}
                      </div>
                      
                      <button 
                        onClick={logoutHandler}
                        className="block w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors border-t border-gray-100"
                      >
                        Se déconnecter
                      </button>
                    </div>
                  )}
                </div>
                
                <button 
                  onClick={() => dispatch(toggleCart())} 
                  className="hover:text-[#E5A3B8] hover:scale-110 transition-all duration-200 relative"
                >
                  <ShoppingBag size={22} />
                  <span className="absolute -top-1 -right-2 bg-[#333333] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                    {cartTotalQuantity || 0}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          <div 
            className={`md:hidden absolute w-full bg-white border-b border-gray-100 shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${
              isMobileMenuOpen ? 'max-h-screen opacity-100 visible' : 'max-h-0 opacity-0 invisible'
            }`}
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {/* User Info Mobile */}
              <div className="border-b border-gray-100 pb-4 mb-4">
                {userInfo ? (
                  <div>
                    <p className="text-sm font-medium text-[#333333]">Bonjour, {userInfo.name}</p>
                    <div className="flex flex-col mt-2 space-y-2">
                      <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="text-sm text-gray-600 hover:text-[#E5A3B8]">Mon Profil</Link>
                      {userInfo.isAdmin && (
                         <Link to="/admin/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-[#E5A3B8]">Dashboard Admin</Link>
                      )}
                      <button onClick={logoutHandler} className="text-sm text-left text-red-500">Se déconnecter</button>
                    </div>
                  </div>
                ) : (
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-[#E5A3B8] flex items-center gap-2">
                    <User size={18} /> Se connecter / Créer un compte
                  </Link>
                )}
              </div>

              {NAV_ITEMS.map((item) => (
                <Link 
                  key={item.id}
                  to={item.path} 
                  onClick={() => setIsMobileMenuOpen(false)}
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
      </header>
    </>
  );
};

export default Navbar;