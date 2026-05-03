import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Heart, Sparkles, Truck, RefreshCw } from 'lucide-react';
import { PRODUCTS } from '../utils/mockData';
import NotFoundPage from './NotFoundPage';

const ProductDetails = () => {
  const { id } = useParams(); // Get ID from URL
  const product = PRODUCTS.find(p => p.id === id); // Fetch mock data
  const [selectedSize, setSelectedSize] = useState('');

  // If product isn't found, show the 404 page we built earlier
  if (!product) return <NotFoundPage />;

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-8 tracking-wide uppercase">
          <Link to="/" className="hover:text-[#333333]">Accueil</Link>
          <ChevronRight size={12} />
          <Link to="/categories" className="hover:text-[#333333]">Collection</Link>
          <ChevronRight size={12} />
          <span className="text-[#333333] font-medium">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-[3/4] w-full bg-gray-100 overflow-hidden relative">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              <img src={product.image} className="aspect-[3/4] object-cover cursor-pointer border border-[#333333]" alt="thumb" />
              <img src={product.hoverImage} className="aspect-[3/4] object-cover cursor-pointer opacity-70 hover:opacity-100 transition-opacity" alt="thumb" />
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="flex flex-col pt-4">
            <h1 className="text-3xl md:text-4xl font-serif text-[#333333] mb-2">{product.name}</h1>
            <p className="text-xl text-gray-600 mb-6">{product.price.toFixed(2)} €</p>

            <div className="w-full h-[1px] bg-gray-200 mb-6"></div>

            <p className="text-gray-600 leading-relaxed font-light mb-8">
              {product.description}
            </p>

            {/* Size Selector */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-[#333333] uppercase tracking-wider">Taille</span>
                <button className="text-xs text-gray-500 underline hover:text-[#E5A3B8]">Guide des tailles</button>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 flex items-center justify-center border text-sm transition-all duration-300 ${
                      selectedSize === size 
                        ? 'border-[#333333] bg-[#333333] text-white' 
                        : 'border-gray-300 text-gray-600 hover:border-[#333333]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-10">
              <button 
                disabled={!product.inStock}
                className="flex-1 bg-[#333333] text-white py-4 text-sm uppercase tracking-widest font-medium hover:bg-[#E5A3B8] hover:text-[#333333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {product.inStock ? 'Ajouter au panier' : 'Épuisé'}
              </button>
              <button className="w-14 h-14 border border-gray-300 flex items-center justify-center text-gray-500 hover:text-[#E5A3B8] hover:border-[#E5A3B8] transition-colors">
                <Heart size={20} />
              </button>
            </div>

            {/* AI Call to Action */}
            <div className="bg-[#F8C8DC]/20 p-4 border border-[#F8C8DC]/50 flex items-start gap-4 mb-8">
              <div className="bg-white p-2 rounded-full text-[#E5A3B8]">
                <Sparkles size={18} />
              </div>
              <div>
                <h4 className="text-[#333333] font-medium text-sm">Hésitante ?</h4>
                <p className="text-xs text-gray-600 mt-1">Demandez à notre IA Styliste si cette pièce s'accorde avec votre morphologie ou vos événements.</p>
              </div>
            </div>

            {/* Accordeon details (Static for now) */}
            <div className="border-t border-gray-200">
              <div className="py-4 flex items-center gap-3 text-sm text-[#333333]">
                <Truck size={18} className="text-gray-400" /> Livraison gratuite dès 100€
              </div>
              <div className="border-t border-gray-200 py-4 flex items-center gap-3 text-sm text-[#333333]">
                <RefreshCw size={18} className="text-gray-400" /> Retours possibles sous 14 jours
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;