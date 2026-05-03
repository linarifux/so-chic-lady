import { Link } from 'react-router-dom';
import { Home, ShoppingBag } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#FAFAFA] px-4 text-center">
      {/* Abstract background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#F8C8DC] rounded-full mix-blend-multiply filter blur-[100px] opacity-30 pointer-events-none"></div>

      <div className="z-10 space-y-6">
        <h1 className="text-8xl md:text-9xl font-serif text-[#F8C8DC] font-bold drop-shadow-sm">404</h1>
        <h2 className="text-3xl md:text-4xl font-serif text-[#333333]">Oups ! Page introuvable.</h2>
        <p className="text-gray-500 max-w-md mx-auto text-lg font-light">
          Il semblerait que cette tenue ne soit plus dans notre garde-robe. Retournons à la collection.
        </p>
        
        <div className="pt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            to="/" 
            className="bg-[#333333] text-white px-6 py-3 rounded-none hover:bg-black transition-colors flex items-center justify-center gap-2 text-sm uppercase tracking-widest"
          >
            <Home size={18} />
            Retour à l'accueil
          </Link>
          <Link 
            to="/categories" 
            className="border border-[#333333] text-[#333333] px-6 py-3 rounded-none hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm uppercase tracking-widest"
          >
            <ShoppingBag size={18} />
            Voir la collection
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;