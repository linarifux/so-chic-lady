import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { useGetAiRecommendationsQuery } from '../../store/slices/aiApiSlice';

const CompleteTheLook = ({ productId }) => {
  // Call the AI backend!
  const { data: recommendations, isLoading, error } = useGetAiRecommendationsQuery(productId);

  if (isLoading) {
    return (
      <div className="mt-16 pt-12 border-t border-gray-100">
        <div className="flex items-center gap-2 mb-8">
          <Sparkles className="text-[#E5A3B8] animate-pulse" size={24} />
          <h2 className="text-xl font-serif text-gray-900">Notre Styliste IA compose une tenue...</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="animate-pulse flex flex-col gap-4">
              <div className="w-full aspect-[3/4] bg-gray-100 rounded-sm"></div>
              <div className="h-4 bg-gray-100 w-3/4 rounded-sm"></div>
              <div className="h-4 bg-gray-100 w-1/4 rounded-sm"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !recommendations || recommendations.length === 0) return null;

  return (
    <div className="mt-16 pt-12 border-t border-gray-100">
      <div className="flex items-center gap-2 mb-8">
        <Sparkles className="text-[#E5A3B8]" size={24} />
        <h2 className="text-2xl font-serif text-gray-900">Complétez le Look</h2>
      </div>
      
      <p className="text-sm text-gray-500 mb-8 uppercase tracking-widest">
        Sélectionné pour vous par notre IA
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {recommendations.map((product) => (
          <Link 
            key={product._id} 
            to={`/product/${product._id}`} 
            className="group flex flex-col gap-4"
          >
            <div className="w-full aspect-[3/4] bg-[#F8F8F8] overflow-hidden relative">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
            </div>
            <div className="flex flex-col">
              <h4 className="text-black text-sm font-medium uppercase tracking-wide group-hover:text-[#E5A3B8] transition-colors line-clamp-1">
                {product.name}
              </h4>
              <p className="text-gray-500 text-sm mt-1 font-serif italic">
                {product.price} €
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CompleteTheLook;