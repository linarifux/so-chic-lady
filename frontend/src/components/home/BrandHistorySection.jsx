const BrandHistorySection = () => {
  return (
    <section className="py-24 bg-[#333333] text-white relative overflow-hidden">
      <div className="absolute right-0 top-0 w-1/2 h-full bg-[#E5A3B8] opacity-5 mix-blend-overlay"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <h2 className="text-3xl md:text-5xl font-serif text-[#F8C8DC]">Depuis 2018</h2>
          <p className="text-gray-300 font-light text-lg leading-relaxed">
            So Chic Lady est née d'une passion pour la mode féminine et de l'envie de créer un espace où chaque femme peut trouver des pièces qui reflètent sa personnalité unique.
          </p>
          <p className="text-gray-300 font-light text-lg leading-relaxed">
            Située au cœur de Pissos, notre boutique n'est pas seulement un lieu de vente, mais un véritable espace de conseil et d'échange. Nous croyons que le style doit être fun, accessible, et surtout, qu'il doit vous ressembler.
          </p>
          <div className="pt-4 border-t border-gray-700">
            <p className="font-serif italic text-xl text-gray-400">
              "Rejoignez la team So Chic Lady ✨💋"
            </p>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-square bg-gray-800 p-2 shadow-2xl border border-gray-700 transform md:rotate-3 transition-transform hover:rotate-0 duration-500">
            <img 
              src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=800&auto=format&fit=crop" 
              alt="Inside So Chic Lady Boutique" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandHistorySection;