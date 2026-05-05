import { useState, useEffect } from 'react';
import { useGetStoreConfigQuery, useUpdateStoreConfigMutation } from '../../store/slices/configApiSlice';
import { Sparkles, Save, Info } from 'lucide-react';

const StoreConfigPage = () => {
  const { data: config, isLoading, error, refetch } = useGetStoreConfigQuery();
  const [updateConfig, { isLoading: isUpdating }] = useUpdateStoreConfigMutation();

  const [formData, setFormData] = useState({
    returnPolicy: '',
    shippingInfo: '',
    currentPromotions: '',
    storeHours: '',
  });

  const [message, setMessage] = useState('');

  // Populate form when data loads
  useEffect(() => {
    if (config) {
      setFormData({
        returnPolicy: config.returnPolicy,
        shippingInfo: config.shippingInfo,
        currentPromotions: config.currentPromotions,
        storeHours: config.storeHours,
      });
    }
  }, [config]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateConfig(formData).unwrap();
      setMessage('✅ Configuration et IA Styliste mises à jour avec succès !');
      refetch();
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('❌ Erreur lors de la mise à jour.');
    }
  };

  if (isLoading) return <div className="p-8 text-center text-gray-500">Chargement de la configuration...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Erreur de chargement des paramètres.</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8 border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-serif font-bold text-gray-900 flex items-center gap-2">
          Paramètres de la Boutique & IA
          <Sparkles className="text-[#E5A3B8]" size={24} />
        </h1>
        <p className="text-gray-500 mt-2 text-sm">
          Modifiez les règles opérationnelles ici. Votre IA Styliste s'adaptera automatiquement à ces nouvelles règles en temps réel.
        </p>
      </div>

      {message && (
        <div className={`p-4 mb-6 text-sm font-medium rounded-sm ${message.includes('✅') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {message}
        </div>
      )}

      <form onSubmit={submitHandler} className="space-y-6 bg-white p-6 md:p-8 rounded-sm shadow-sm border border-gray-100">
        
        {/* Promotions */}
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
            Promotions Actuelles
          </label>
          <div className="flex gap-2 mb-2 items-start text-xs text-gray-500">
            <Info size={14} className="mt-0.5 text-blue-400 shrink-0" />
            <p>L'IA utilisera ce texte si un client demande s'il y a des soldes ou des réductions.</p>
          </div>
          <textarea
            name="currentPromotions"
            value={formData.currentPromotions}
            onChange={handleChange}
            rows="2"
            className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors"
            placeholder="Ex: BLACK FRIDAY -30% sur tout le site !"
          />
        </div>

        {/* Shipping */}
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
            Politique de Livraison
          </label>
          <textarea
            name="shippingInfo"
            value={formData.shippingInfo}
            onChange={handleChange}
            rows="2"
            className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors"
          />
        </div>

        {/* Returns */}
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
            Politique de Retour
          </label>
          <textarea
            name="returnPolicy"
            value={formData.returnPolicy}
            onChange={handleChange}
            rows="2"
            className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors"
          />
        </div>

        {/* Store Hours */}
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
            Horaires de la Boutique Physique
          </label>
          <textarea
            name="storeHours"
            value={formData.storeHours}
            onChange={handleChange}
            rows="2"
            className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors"
          />
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            disabled={isUpdating}
            className="flex items-center gap-2 bg-black text-white px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-[#E5A3B8] hover:text-black transition-colors disabled:opacity-50"
          >
            {isUpdating ? 'Sauvegarde...' : 'Enregistrer'}
            <Save size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default StoreConfigPage;