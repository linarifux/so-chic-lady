import { Truck, ShieldCheck, RefreshCw, Clock } from 'lucide-react';

const TrustBadges = () => {
  return (
    <section className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center justify-center p-4 hover:-translate-y-1 transition-transform duration-300">
            <Truck size={28} strokeWidth={1.5} className="text-[#E5A3B8] mb-3" />
            <h4 className="text-sm font-medium text-[#333333] uppercase tracking-wider mb-1">Livraison Offerte</h4>
            <p className="text-xs text-gray-500 font-light">Pour toute commande &gt; 100€</p>
          </div>
          <div className="flex flex-col items-center justify-center p-4 border-l border-gray-100 hidden md:flex hover:-translate-y-1 transition-transform duration-300">
            <RefreshCw size={28} strokeWidth={1.5} className="text-[#E5A3B8] mb-3" />
            <h4 className="text-sm font-medium text-[#333333] uppercase tracking-wider mb-1">Retours Faciles</h4>
            <p className="text-xs text-gray-500 font-light">14 jours pour changer d'avis</p>
          </div>
          <div className="flex flex-col items-center justify-center p-4 border-l md:border-gray-100 hover:-translate-y-1 transition-transform duration-300">
            <ShieldCheck size={28} strokeWidth={1.5} className="text-[#E5A3B8] mb-3" />
            <h4 className="text-sm font-medium text-[#333333] uppercase tracking-wider mb-1">Paiement Sécurisé</h4>
            <p className="text-xs text-gray-500 font-light">CB, Visa, Mastercard, PayPal</p>
          </div>
          <div className="flex flex-col items-center justify-center p-4 border-l border-gray-100 hidden md:flex hover:-translate-y-1 transition-transform duration-300">
            <Clock size={28} strokeWidth={1.5} className="text-[#E5A3B8] mb-3" />
            <h4 className="text-sm font-medium text-[#333333] uppercase tracking-wider mb-1">Expédition Rapide</h4>
            <p className="text-xs text-gray-500 font-light">Votre colis préparé sous 24h</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;