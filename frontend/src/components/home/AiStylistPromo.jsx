import { Sparkles } from 'lucide-react';

const AiStylistPromo = () => {
  return (
    <section className="py-20 bg-[#F8C8DC]/20 relative overflow-hidden">
      {/* Decorative background circle */}
      <div className="absolute top-1/2 right-10 transform -translate-y-1/2 w-64 h-64 bg-white/40 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-[#E5A3B8] font-medium tracking-widest uppercase text-xs mb-4">
            <Sparkles size={16} /> Exclusivité So Chic
          </div>
          <h2 className="text-3xl md:text-5xl font-serif text-[#333333] mb-6 leading-tight">
            Indécise ? Demandez à votre Styliste IA Privée.
          </h2>
          <p className="text-gray-600 font-light leading-relaxed mb-8 text-lg">
            Décrivez l'événement, votre morphologie ou le style recherché, et laissez notre intelligence artificielle vous composer la tenue parfaite parmi notre collection.
          </p>
          <button className="bg-[#333333] text-white px-8 py-4 font-medium uppercase tracking-widest text-sm hover:bg-[#E5A3B8] hover:text-[#333333] transition-colors rounded-sm shadow-lg flex items-center gap-3">
            <Sparkles size={18} /> Lancer l'assistant style
          </button>
        </div>
        
        <div className="hidden md:block w-72">
          {/* Mockup of a chat bubble interaction */}
          <div className="bg-white p-6 rounded-2xl shadow-xl rounded-br-sm border border-gray-100">
            <p className="text-sm text-gray-600 italic">
              "J'ai un mariage en plein été à Bordeaux, je suis de morphologie en A. Que me conseilles-tu ?"
            </p>
          </div>
          <div className="bg-[#333333] text-white p-6 rounded-2xl shadow-xl rounded-tl-sm mt-4 ml-8 relative">
            <div className="absolute -top-3 -left-3 bg-[#E5A3B8] text-white p-2 rounded-full">
               <Sparkles size={16} />
            </div>
            <p className="text-sm font-light">
              "Pour un mariage estival et votre morphologie, je vous recommande la <strong>Robe d'Été Bohème</strong>. Sa coupe empire mettra votre buste en valeur..."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiStylistPromo;