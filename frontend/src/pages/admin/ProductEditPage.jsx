import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Save } from 'lucide-react';
import { 
  useGetProductDetailsQuery, 
  useUpdateProductMutation 
} from '../../store/slices/productsApiSlice';

const ProductEditPage = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  // Component State for the form fields
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [hoverImage, setHoverImage] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [sizes, setSizes] = useState('');
  const [inStock, setInStock] = useState(true);

  // Fetch the current product data
  const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);
  
  // Bring in the update mutation
  const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();

  // Populate the form when the product data loads
  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setHoverImage(product.hoverImage || '');
      setCategory(product.category);
      setDescription(product.description);
      setSizes(product.sizes.join(', ')); // Convert array to comma-separated string
      setInStock(product.inStock);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        name,
        price,
        image,
        hoverImage,
        category,
        description,
        sizes: sizes.split(',').map(s => s.trim()), // Convert string back to array
        inStock,
      }).unwrap();
      
      alert('Produit mis à jour avec succès !');
      navigate('/admin/dashboard'); // Go back to dashboard
    } catch (err) {
      alert('Erreur lors de la mise à jour.');
      console.error(err);
    }
  };

  if (isLoading) return <div className="text-center py-20">Chargement...</div>;
  if (error) return <div className="text-center py-20 text-red-500">Erreur de chargement.</div>;

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        <Link to="/admin/dashboard" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#E5A3B8] transition-colors mb-6">
          <ChevronLeft size={16} /> Retour au Dashboard
        </Link>

        <div className="bg-white p-8 shadow-sm border border-gray-100 rounded-sm">
          <h1 className="text-2xl font-serif text-[#333333] mb-8 border-b border-gray-100 pb-4">Modifier le Produit</h1>

          <form onSubmit={submitHandler} className="space-y-6">
            
            {/* Name & Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 uppercase tracking-widest text-xs mb-2">Nom du produit</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full border border-gray-300 px-4 py-3 focus:border-[#E5A3B8] focus:outline-none rounded-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 uppercase tracking-widest text-xs mb-2">Prix (€)</label>
                <input type="number" step="0.01" value={price} onChange={(e) => setPrice(Number(e.target.value))} required className="w-full border border-gray-300 px-4 py-3 focus:border-[#E5A3B8] focus:outline-none rounded-sm" />
              </div>
            </div>

            {/* Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 uppercase tracking-widest text-xs mb-2">URL Image Principale</label>
                <input type="text" value={image} onChange={(e) => setImage(e.target.value)} required className="w-full border border-gray-300 px-4 py-3 focus:border-[#E5A3B8] focus:outline-none rounded-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 uppercase tracking-widest text-xs mb-2">URL Image au Survol (Optionnel)</label>
                <input type="text" value={hoverImage} onChange={(e) => setHoverImage(e.target.value)} className="w-full border border-gray-300 px-4 py-3 focus:border-[#E5A3B8] focus:outline-none rounded-sm" />
              </div>
            </div>

            {/* Category & Sizes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 uppercase tracking-widest text-xs mb-2">Catégorie</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} required className="w-full border border-gray-300 px-4 py-3 focus:border-[#E5A3B8] focus:outline-none rounded-sm bg-white">
                  <option value="tops">Hauts & Tuniques</option>
                  <option value="dresses">Robes</option>
                  <option value="outerwear">Vestes & Manteaux</option>
                  <option value="accessories">Accessoires</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 uppercase tracking-widest text-xs mb-2">Tailles (séparées par une virgule)</label>
                <input type="text" value={sizes} onChange={(e) => setSizes(e.target.value)} placeholder="Ex: S, M, L, XL" required className="w-full border border-gray-300 px-4 py-3 focus:border-[#E5A3B8] focus:outline-none rounded-sm" />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 uppercase tracking-widest text-xs mb-2">Description</label>
              <textarea rows="4" value={description} onChange={(e) => setDescription(e.target.value)} required className="w-full border border-gray-300 px-4 py-3 focus:border-[#E5A3B8] focus:outline-none rounded-sm"></textarea>
            </div>

            {/* In Stock Checkbox */}
            <div className="flex items-center gap-3 pt-2">
              <input type="checkbox" id="inStock" checked={inStock} onChange={(e) => setInStock(e.target.checked)} className="w-5 h-5 accent-[#333333]" />
              <label htmlFor="inStock" className="text-sm font-medium text-[#333333] cursor-pointer">Produit en stock et disponible à la vente</label>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-gray-100">
              <button type="submit" disabled={loadingUpdate} className="flex items-center justify-center gap-2 w-full md:w-auto bg-[#333333] text-white px-8 py-4 uppercase tracking-widest text-sm font-medium hover:bg-[#E5A3B8] hover:text-[#333333] transition-colors rounded-sm shadow-sm disabled:opacity-50">
                {loadingUpdate ? 'Enregistrement...' : <><Save size={18} /> Enregistrer les modifications</>}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductEditPage;