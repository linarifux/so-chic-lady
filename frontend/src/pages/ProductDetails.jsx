import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronRight, Heart, Sparkles, Truck, RefreshCw, 
  Minus, Plus, Star, PlayCircle, HelpCircle, Ruler, Info
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { useGetProductDetailsQuery, useGetProductsQuery } from '../store/slices/productsApiSlice';
import NotFoundPage from './NotFoundPage';

const ProductDetails = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();

  // Fetch current product
  const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);
  
  // Fetch ALL products for "Related" and "Buy With It" sections
  const { data: allProducts } = useGetProductsQuery();

  // --- COMPONENT STATE ---
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  // Reset states when URL changes (user clicks a related product)
  useEffect(() => {
    if (product && product.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
    setQuantity(1);
    setIsWishlisted(false);
    setActiveTab('description');
  }, [product, productId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E5A3B8]"></div>
      </div>
    );
  }

  if (error || !product) return <NotFoundPage />;

  // --- CROSS-SELLING LOGIC ---
  // Get 4 related products (excluding the current one)
  const relatedProducts = allProducts?.filter(p => p._id !== productId).slice(0, 4) || [];
  // Get 1 complementary product for "Buy with it"
  const buyWithItProduct = allProducts?.find(p => p._id !== productId && p.category !== product.category);

  // --- ACTIONS ---
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Veuillez sélectionner une taille avant d'ajouter au panier.");
      return;
    }
    
    const productToAdd = { ...product, id: product._id || product.id };

    // Since our original cartSlice hardcoded quantity to 1, we will loop the dispatch 
    // to safely add the correct quantity without breaking your existing Redux logic!
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart({ product: productToAdd, size: selectedSize }));
    }
  };

  const toggleWishlist = () => setIsWishlisted(!isWishlisted);
  const increaseQty = () => setQuantity(prev => prev + 1);
  const decreaseQty = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-8 tracking-wide uppercase">
          <Link to="/" className="hover:text-[#333333]">Accueil</Link>
          <ChevronRight size={12} />
          <Link to="/categories" className="hover:text-[#333333]">Collection</Link>
          <ChevronRight size={12} />
          <span className="text-[#333333] font-medium truncate max-w-[200px]">{product.name}</span>
        </nav>

        {/* --- MAIN HERO SECTION --- */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 mb-20">
          
          {/* Left: Image Gallery */}
          <div className="space-y-4 sticky top-28 h-fit">
            <div className="aspect-[3/4] w-full bg-gray-100 overflow-hidden relative group rounded-sm shadow-sm">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              {/* Optional: Add hover zoom effect here later */}
            </div>
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              <img src={product.image} className="aspect-[3/4] object-cover cursor-pointer border-2 border-[#333333] rounded-sm" alt="thumb 1" />
              {product.hoverImage && (
                <img src={product.hoverImage} className="aspect-[3/4] object-cover cursor-pointer opacity-60 hover:opacity-100 transition-opacity rounded-sm border border-transparent" alt="thumb 2" />
              )}
            </div>
          </div>

          {/* Right: Product Details & Cart Actions */}
          <div className="flex flex-col pt-2">
            
            {/* Title & Reviews Summary */}
            <div className="mb-4">
              <h1 className="text-3xl md:text-4xl font-serif text-[#333333] mb-3 leading-tight">{product.name}</h1>
              <div className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer hover:text-[#E5A3B8]" onClick={() => setActiveTab('reviews')}>
                <div className="flex text-yellow-400"><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/></div>
                <span>(12 Avis)</span>
              </div>
            </div>

            <p className="text-2xl text-[#333333] mb-6 font-medium">{product.price.toFixed(2)} €</p>
            <div className="w-full h-[1px] bg-gray-200 mb-6"></div>

            <p className="text-gray-600 leading-relaxed font-light mb-8">
              {product.description}
            </p>

            {/* Size Selector */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-[#333333] uppercase tracking-wider">Taille</span>
                <button onClick={() => setActiveTab('size')} className="text-xs text-gray-500 underline hover:text-[#E5A3B8] flex items-center gap-1 transition-colors">
                  <Ruler size={14} /> Guide des tailles
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 flex items-center justify-center border text-sm transition-all duration-300 rounded-sm ${
                      selectedSize === size 
                        ? 'border-[#333333] bg-[#333333] text-white shadow-md' 
                        : 'border-gray-300 text-gray-600 hover:border-[#333333]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              
              {/* Quantity Selector */}
              <div className="flex items-center justify-between border border-gray-300 w-full sm:w-32 h-14 px-4 rounded-sm">
                <button onClick={decreaseQty} className="text-gray-500 hover:text-[#333333]"><Minus size={18} /></button>
                <span className="font-medium text-[#333333]">{quantity}</span>
                <button onClick={increaseQty} className="text-gray-500 hover:text-[#333333]"><Plus size={18} /></button>
              </div>

              {/* Add to Cart */}
              <button 
                disabled={!product.inStock}
                onClick={handleAddToCart}
                className="flex-1 bg-[#333333] text-white h-14 text-sm uppercase tracking-widest font-medium hover:bg-[#E5A3B8] hover:text-[#333333] transition-all disabled:opacity-50 disabled:cursor-not-allowed rounded-sm shadow-md"
              >
                {product.inStock ? 'Ajouter au panier' : 'Épuisé'}
              </button>

              {/* Wishlist Button */}
              <button 
                onClick={toggleWishlist}
                className={`w-14 h-14 border flex items-center justify-center rounded-sm transition-all ${
                  isWishlisted ? 'border-[#E5A3B8] bg-[#F8C8DC]/20' : 'border-gray-300 hover:border-[#E5A3B8]'
                }`}
                title="Ajouter à la wishlist"
              >
                <Heart size={20} className={isWishlisted ? 'fill-[#E5A3B8] text-[#E5A3B8]' : 'text-gray-500 hover:text-[#E5A3B8]'} />
              </button>
            </div>

            {/* AI Call to Action */}
            <div className="bg-[#F8C8DC]/10 p-4 border border-[#F8C8DC]/30 flex items-start gap-4 mb-8 rounded-sm">
              <div className="bg-white p-2 rounded-full text-[#E5A3B8] shadow-sm"><Sparkles size={18} /></div>
              <div>
                <h4 className="text-[#333333] font-medium text-sm">IA Styliste Privée</h4>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">Besoin d'aide ? Demandez à notre IA comment accessoiriser cette pièce pour votre prochaine soirée.</p>
              </div>
            </div>

            {/* --- BUY WITH IT SECTION --- */}
            {buyWithItProduct && (
              <div className="mb-8 p-4 border border-gray-200 rounded-sm bg-white shadow-sm">
                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Complétez le look</h4>
                <div className="flex items-center gap-4">
                  <img src={buyWithItProduct.image} alt={buyWithItProduct.name} className="w-16 h-20 object-cover rounded-sm" />
                  <div className="flex-1">
                    <Link to={`/product/${buyWithItProduct._id}`} className="text-sm font-medium text-[#333333] hover:text-[#E5A3B8]">{buyWithItProduct.name}</Link>
                    <p className="text-xs text-gray-500 mt-1">{buyWithItProduct.price.toFixed(2)} €</p>
                  </div>
                  <Link to={`/product/${buyWithItProduct._id}`} className="text-xs border border-[#333333] text-[#333333] px-3 py-2 rounded-sm hover:bg-[#333333] hover:text-white transition-colors">
                    Voir
                  </Link>
                </div>
              </div>
            )}

            {/* Trust Badges */}
            <div className="border-t border-gray-200">
              <div className="py-4 flex items-center gap-3 text-sm text-[#333333]"><Truck size={18} className="text-[#E5A3B8]" /> Livraison offerte dès 100€</div>
              <div className="border-t border-gray-100 py-4 flex items-center gap-3 text-sm text-[#333333]"><RefreshCw size={18} className="text-[#E5A3B8]" /> Retours sous 14 jours</div>
            </div>

          </div>
        </div>

        {/* --- TABS SECTION (Desc, Size, FAQ, Reviews, Video) --- */}
        <div className="mb-24 border-t border-gray-200 pt-10">
          
          {/* Tab Headers */}
          <div className="flex flex-wrap gap-6 md:gap-12 border-b border-gray-200 pb-4 mb-8">
            {[
              { id: 'description', label: 'Détails', icon: <Info size={16}/> },
              { id: 'size', label: 'Guide des Tailles', icon: <Ruler size={16}/> },
              { id: 'faq', label: 'FAQ', icon: <HelpCircle size={16}/> },
              { id: 'reviews', label: 'Avis (12)', icon: <Star size={16}/> },
              { id: 'video', label: 'Vidéo', icon: <PlayCircle size={16}/> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 text-sm font-medium uppercase tracking-wider transition-colors pb-4 -mb-4 border-b-2 ${
                  activeTab === tab.id ? 'text-[#333333] border-[#E5A3B8]' : 'text-gray-400 border-transparent hover:text-[#E5A3B8]'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-[200px]">
            
            {/* Description Tab */}
            {activeTab === 'description' && (
              <div className="max-w-3xl text-gray-600 font-light leading-relaxed space-y-4">
                <p>{product.description}</p>
                <p>Créée pour les femmes qui aiment allier confort et élégance, cette pièce est un indispensable de la saison. Conçue avec des matériaux soigneusement sélectionnés, elle vous accompagnera du matin jusqu'au soir avec style.</p>
                <ul className="list-disc pl-5 mt-4 space-y-2 text-sm">
                  <li>Lavage en machine à 30°C délicat.</li>
                  <li>Ne pas utiliser de sèche-linge.</li>
                  <li>Repassage doux à l'envers.</li>
                </ul>
              </div>
            )}

            {/* Size Guide Tab */}
            {activeTab === 'size' && (
              <div className="max-w-2xl">
                <h3 className="text-lg font-serif text-[#333333] mb-4">Comment prendre vos mensurations ?</h3>
                <p className="text-sm text-gray-500 mb-6 font-light">Utilisez un mètre ruban souple. Mesurez votre tour de poitrine à l'endroit le plus fort, votre taille au creux de votre abdomen, et vos hanches à l'endroit le plus large.</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-gray-600 border-collapse">
                    <thead>
                      <tr className="bg-gray-100 uppercase tracking-widest text-xs">
                        <th className="p-3 font-medium">Taille</th>
                        <th className="p-3 font-medium">Poitrine (cm)</th>
                        <th className="p-3 font-medium">Taille (cm)</th>
                        <th className="p-3 font-medium">Hanches (cm)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100"><td className="p-3 font-medium text-[#333333]">S (36)</td><td className="p-3">82 - 86</td><td className="p-3">62 - 66</td><td className="p-3">88 - 92</td></tr>
                      <tr className="border-b border-gray-100"><td className="p-3 font-medium text-[#333333]">M (38)</td><td className="p-3">86 - 90</td><td className="p-3">66 - 70</td><td className="p-3">92 - 96</td></tr>
                      <tr className="border-b border-gray-100"><td className="p-3 font-medium text-[#333333]">L (40)</td><td className="p-3">90 - 94</td><td className="p-3">70 - 74</td><td className="p-3">96 - 100</td></tr>
                      <tr><td className="p-3 font-medium text-[#333333]">XL (42)</td><td className="p-3">94 - 98</td><td className="p-3">74 - 78</td><td className="p-3">100 - 104</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* FAQ Tab */}
            {activeTab === 'faq' && (
              <div className="max-w-3xl space-y-6">
                {[
                  { q: "Quels sont les délais de livraison ?", a: "Les commandes sont expédiées sous 24 à 48h. La livraison prend ensuite 2 à 4 jours ouvrés." },
                  { q: "Puis-je retourner cet article ?", a: "Oui, vous disposez de 14 jours après réception pour nous retourner l'article dans son état d'origine." },
                  { q: "Comment taille cet article ?", a: "Cet article taille normalement. Si vous hésitez entre deux tailles, nous vous conseillons de prendre la taille au-dessus." }
                ].map((item, idx) => (
                  <div key={idx} className="border-b border-gray-200 pb-4">
                    <h4 className="font-medium text-[#333333] mb-2">{item.q}</h4>
                    <p className="text-sm text-gray-600 font-light leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="max-w-3xl">
                <div className="flex items-center gap-6 mb-8 bg-gray-50 p-6 rounded-sm">
                  <div className="text-center">
                    <span className="text-5xl font-serif text-[#333333]">4.8</span>
                    <div className="flex text-yellow-400 mt-2 justify-center"><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/></div>
                    <span className="text-xs text-gray-500 mt-1 block">Sur 12 avis</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 font-light italic">"Nos clientes adorent cette pièce. 95% recommandent de la prendre dans votre taille habituelle."</p>
                  </div>
                </div>

                {/* Mock Reviews List */}
                <div className="space-y-6">
                  {[
                    { name: "Sophie M.", date: "Il y a 2 jours", comment: "Superbe qualité, la coupe est parfaite ! Reçu très rapidement dans un joli colis." },
                    { name: "Camille D.", date: "La semaine dernière", comment: "J'hésitais sur la taille, j'ai demandé à l'IA qui m'a super bien conseillée. Résultat : ça me va comme un gant." }
                  ].map((review, idx) => (
                    <div key={idx} className="border-b border-gray-100 pb-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="font-medium text-[#333333] block">{review.name}</span>
                          <div className="flex text-yellow-400 mt-1"><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/></div>
                        </div>
                        <span className="text-xs text-gray-400">{review.date}</span>
                      </div>
                      <p className="text-sm text-gray-600 font-light">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Video Tab */}
            {activeTab === 'video' && (
              <div className="max-w-2xl relative group cursor-pointer overflow-hidden rounded-sm bg-black">
                <img src={product.image} alt="Video thumbnail" className="w-full aspect-video object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <PlayCircle size={64} className="text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 drop-shadow-lg" />
                  <span className="text-white font-medium tracking-widest uppercase text-sm mt-4 drop-shadow-md">Voir porté en vidéo</span>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* --- RELATED PRODUCTS GRID --- */}
        {relatedProducts.length > 0 && (
          <div className="pt-10 border-t border-gray-200">
            <div className="flex justify-between items-end mb-8">
              <h2 className="text-2xl font-serif text-[#333333]">Vous aimerez aussi</h2>
              <Link to="/categories" className="text-sm font-medium text-gray-500 hover:text-[#E5A3B8] uppercase tracking-wider">Voir tout</Link>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((related) => (
                <Link key={related._id} to={`/product/${related._id}`} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-3 rounded-sm">
                    <img src={related.image} alt={related.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    {!related.inStock && (
                      <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 text-[10px] uppercase tracking-widest font-medium shadow-sm">Épuisé</div>
                    )}
                  </div>
                  <h3 className="text-[#333333] text-sm font-medium group-hover:text-[#E5A3B8] transition-colors truncate">{related.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">{related.price.toFixed(2)} €</p>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProductDetails;