import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FiSliders, FiChevronDown } from 'react-icons/fi';
import { PRODUCTS } from '../utils/mockData';

const CategoryPage = () => {
  const [sortBy, setSortBy] = useState('newest');
  // Store selected categories in an array. If empty, show all.
  const [activeCategories, setActiveCategories] = useState([]);

  // Filter categories map for the sidebar
  const filterOptions = [
    { id: 'tops', label: 'Hauts & Tuniques' },
    { id: 'dresses', label: 'Robes' },
    { id: 'outerwear', label: 'Vestes & Manteaux' },
    { id: 'accessories', label: 'Accessoires' },
  ];

  const handleCategoryToggle = (categoryId) => {
    setActiveCategories((prev) => 
      prev.includes(categoryId) 
        ? prev.filter(c => c !== categoryId) 
        : [...prev, categoryId]
    );
  };

  // Derive the displayed products based on selected filters
  const displayedProducts = useMemo(() => {
    let filtered = PRODUCTS;
    if (activeCategories.length > 0) {
      filtered = PRODUCTS.filter(product => activeCategories.includes(product.category));
    }
    
    // Sort logic (can be expanded later)
    if (sortBy === 'price-low') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [activeCategories, sortBy]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24">
      
      {/* Category Header */}
      <div className="bg-[#F8C8DC]/20 py-16 text-center border-b border-gray-100 transition-colors duration-500 hover:bg-[#F8C8DC]/30">
        <h1 className="text-4xl md:text-5xl font-serif text-[#333333] mb-4 tracking-wide">La Collection</h1>
        <p className="text-gray-600 font-light max-w-xl mx-auto px-4">
          Découvrez notre sélection de pièces tendances, fun et féminines. Révélez votre style avec So Chic Lady.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar / Filters (Desktop) */}
          <aside className="hidden lg:block w-64 shrink-0 space-y-8">
            <div className="sticky top-28">
              <h3 className="font-serif text-lg text-[#333333] mb-6 flex items-center gap-2">
                <FiSliders size={18} /> Filtres
              </h3>
              <div className="space-y-4 border-t border-gray-200 pt-6">
                {filterOptions.map(option => (
                   <label key={option.id} className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer hover:text-[#E5A3B8] transition-colors group">
                    <div className={`w-4 h-4 border rounded flex items-center justify-center transition-colors ${activeCategories.includes(option.id) ? 'bg-[#333333] border-[#333333]' : 'border-gray-300 group-hover:border-[#E5A3B8]'}`}>
                        {activeCategories.includes(option.id) && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                    </div>
                    <input 
                      type="checkbox" 
                      className="hidden" 
                      checked={activeCategories.includes(option.id)}
                      onChange={() => handleCategoryToggle(option.id)}
                    /> 
                    {option.label}
                 </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Product Area */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 pb-4 border-b border-gray-100 gap-4">
              <span className="text-sm text-gray-500 font-medium">
                {displayedProducts.length} produit{displayedProducts.length !== 1 ? 's' : ''}
              </span>
              
              <div className="relative group cursor-pointer">
                 <div className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#333333] transition-colors">
                  Trier par : 
                  <span className="font-medium">
                    {sortBy === 'newest' ? 'Nouveautés' : sortBy === 'price-low' ? 'Prix croissant' : 'Prix décroissant'}
                  </span> 
                  <FiChevronDown size={16} className="group-hover:rotate-180 transition-transform duration-300" />
                </div>
                {/* Custom Select Dropdown (Visible on hover for simplicity in this example) */}
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 shadow-xl rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-30 overflow-hidden">
                    <div onClick={() => setSortBy('newest')} className="px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer">Nouveautés</div>
                    <div onClick={() => setSortBy('price-low')} className="px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer">Prix: croissant</div>
                    <div onClick={() => setSortBy('price-high')} className="px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer">Prix: décroissant</div>
                </div>
              </div>
            </div>

            {/* Empty State */}
            {displayedProducts.length === 0 && (
                <div className="text-center py-20 text-gray-500">
                    <p className="text-lg font-serif">Aucun produit ne correspond à ces filtres.</p>
                    <button onClick={() => setActiveCategories([])} className="mt-4 text-[#E5A3B8] underline">Réinitialiser les filtres</button>
                </div>
            )}

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {displayedProducts.map((product) => (
                <Link key={product.id} to={`/product/${product.id}`} className="group flex flex-col">
                  {/* Image Container */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4 rounded-sm shadow-sm hover:shadow-md transition-shadow duration-300">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-0 absolute inset-0 z-10"
                    />
                    <img 
                      src={product.hoverImage} 
                      alt={`${product.name} hover`} 
                      className="w-full h-full object-cover absolute inset-0 z-0 scale-105"
                    />
                    
                    {/* Out of Stock Badge */}
                    {!product.inStock && (
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] uppercase tracking-widest font-medium z-20 shadow-sm rounded-sm">
                        Épuisé
                      </div>
                    )}

                    {/* Quick Add overlay */}
                    <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-20">
                      <button className="w-full bg-white/95 backdrop-blur-md text-[#333333] py-3 text-sm uppercase tracking-widest font-medium hover:bg-[#333333] hover:text-white transition-colors rounded-sm shadow-lg">
                        Voir Produit
                      </button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="flex flex-col">
                    <h3 className="text-[#333333] font-medium group-hover:text-[#E5A3B8] transition-colors text-base">{product.name}</h3>
                    <p className="text-gray-500 text-sm mt-1 tracking-wide">{product.price.toFixed(2)} €</p>
                  </div>
                </Link>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;