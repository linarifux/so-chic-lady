import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useGetProductsQuery } from '../../store/slices/productsApiSlice';

const TrendingNow = () => {
  const { data: products, isLoading } = useGetProductsQuery();
  const featuredProducts = products?.slice(0, 4) || [];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-[#E5A3B8] font-medium tracking-widest uppercase text-xs mb-3">
              <Sparkles size={14} /> Notre Sélection
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-[#333333] mb-4">Pièces Tendances</h2>
            <p className="text-gray-500 font-light text-lg">
              Les coups de cœur incontournables de la saison, plébiscités par nos clientes.
            </p>
          </div>
          <Link 
            to="/categories" 
            className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-[#333333] hover:text-[#E5A3B8] uppercase tracking-widest transition-all group"
          >
            Voir la collection <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center py-32">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E5A3B8]"></div>
          </div>
        ) : (
          /* Products Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <Link key={product._id} to={`/product/${product._id}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden bg-[#F8F8F8] mb-6 rounded-sm shadow-sm">
                  
                  {/* Default Image */}
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                      product.hoverImage ? 'group-hover:opacity-0' : 'group-hover:scale-105'
                    }`} 
                  />
                  
                  {/* Hover Image (if available in DB) */}
                  {product.hoverImage && (
                    <img 
                      src={product.hoverImage} 
                      alt={`${product.name} lifestyle`} 
                      className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out transform scale-105 group-hover:scale-100" 
                    />
                  )}
                  
                  {/* Status Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
                    {!product.inStock ? (
                      <span className="bg-white/95 backdrop-blur-sm px-3 py-1.5 text-[10px] uppercase tracking-widest font-semibold shadow-sm text-red-500">
                        Épuisé
                      </span>
                    ) : (
                      <span className="bg-[#333333] text-white px-3 py-1.5 text-[10px] uppercase tracking-widest font-medium shadow-sm">
                        Tendance
                      </span>
                    )}
                  </div>

                  {/* Hover Reveal Button */}
                  <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] z-20 hidden md:block">
                    <button className="w-full bg-white/95 backdrop-blur-md text-[#333333] py-4 text-sm uppercase tracking-widest font-medium shadow-xl hover:bg-[#333333] hover:text-white transition-colors duration-300">
                      Découvrir la pièce
                    </button>
                  </div>
                </div>
                
                {/* Product Info (Centered for editorial look) */}
                <div className="flex flex-col items-center text-center px-2">
                  <h3 className="text-[#333333] font-medium group-hover:text-[#E5A3B8] transition-colors text-base mb-1">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 text-sm tracking-wide font-light">
                    {product.price.toFixed(2)} €
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
        
        {/* Mobile View All Button */}
        <div className="mt-12 flex justify-center md:hidden">
           <Link 
            to="/categories" 
            className="inline-flex items-center justify-center gap-3 border border-[#333333] text-[#333333] px-8 py-4 w-full text-sm uppercase tracking-widest font-medium hover:bg-[#333333] hover:text-white transition-colors"
          >
            Toute la collection <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrendingNow;