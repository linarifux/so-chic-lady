import { Link } from 'react-router-dom';
import { FiHeart, FiStar, FiMapPin, FiArrowRight } from 'react-icons/fi';

const BrandHistory = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      
      {/* 1. Elegant Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-[#1A1A1A]">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop" 
            alt="So Chic Lady Boutique Interior" 
            className="w-full h-full object-cover grayscale opacity-80"
          />
        </div>
        
        {/* Soft Pink Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-[#F8C8DC] rounded-full mix-blend-overlay filter blur-[150px] opacity-60 z-10 pointer-events-none"></div>

        <div className="relative z-20 text-center px-4 max-w-3xl mx-auto mt-10">
          <p className="text-xs md:text-sm font-semibold tracking-[0.3em] text-[#F8C8DC] uppercase mb-4">
            Notre Histoire
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-tight drop-shadow-md">
            Plus qu'une boutique, <br/>
            <span className="italic text-[#E5A3B8] font-light">une passion.</span>
          </h1>
        </div>
      </section>

      {/* 2. The Origins (Text Left, Image Right) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-2">
                <span className="h-[1px] w-12 bg-[#E5A3B8]"></span>
                <span className="text-sm font-medium text-[#E5A3B8] tracking-widest uppercase">Les Débuts</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-[#333333]">Née à Pissos en 2018</h2>
              <p className="text-gray-600 font-light text-lg leading-relaxed">
                Tout a commencé avec une idée simple : offrir aux femmes de notre région un espace dédié à la mode où le conseil et la bienveillance sont rois. So Chic Lady n'a jamais été conçue comme un simple magasin de vêtements, mais comme un lieu d'échange et de partage.
              </p>
              <p className="text-gray-600 font-light text-lg leading-relaxed">
                Installée au 11 route de Sore, notre boutique a rapidement trouvé son public : des femmes qui cherchent du style, du fun et du chic, sans compromis sur la qualité de l'accueil.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] bg-gray-100 overflow-hidden rounded-sm shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop" 
                  alt="Fashion details" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                />
              </div>
              {/* Decorative Accent */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#F8C8DC]/30 rounded-full filter blur-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Philosophy (Full Width Quote/Values) */}
      <section className="py-24 bg-[#FAFAFA] border-y border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <FiStar className="mx-auto text-[#E5A3B8] text-4xl" />
          <h2 className="text-2xl md:text-4xl font-serif text-[#333333] leading-relaxed">
            "La mode avec cœur, le conseil avec sincérité. Mon objectif est de vous proposer un accompagnement sur-mesure pour sublimer votre image et révéler votre véritable style."
          </h2>
          <p className="font-medium text-gray-500 tracking-widest uppercase text-sm">
            — La Fondatrice, So Chic Lady
          </p>
        </div>
      </section>

      {/* 4. The Evolution & AI (Image Left, Text Right) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 relative">
              <div className="aspect-square bg-gray-100 overflow-hidden rounded-sm shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop" 
                  alt="Modern boutique evolution" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                />
              </div>
              {/* Decorative Accent */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#E5A3B8]/20 rounded-full filter blur-2xl -z-10"></div>
            </div>
            
            <div className="order-1 md:order-2 space-y-6">
              <div className="flex items-center gap-4 mb-2">
                <span className="h-[1px] w-12 bg-[#E5A3B8]"></span>
                <span className="text-sm font-medium text-[#E5A3B8] tracking-widest uppercase">L'Évolution</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-[#333333]">Une Boutique Tournée vers l'Avenir</h2>
              <p className="text-gray-600 font-light text-lg leading-relaxed">
                Aujourd'hui, So Chic Lady franchit une nouvelle étape en alliant le charme de notre boutique physique à l'innovation numérique. Nous avons repensé notre présence en ligne pour vous offrir la même qualité de conseil, où que vous soyez.
              </p>
              <div className="bg-[#FAFAFA] p-6 border-l-4 border-[#F8C8DC] mt-6">
                <p className="text-[#333333] font-medium mb-2 flex items-center gap-2">
                  <FiHeart className="text-[#E5A3B8]" /> L'Intelligence Artificielle à votre service
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Notre nouvelle plateforme intègre une IA Styliste Privée. Formée sur nos collections et nos valeurs, elle est là pour vous guider, vous inspirer et trouver la tenue parfaite de jour comme de nuit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Bottom Call to Action */}
      <section className="py-20 bg-[#333333] text-center">
        <div className="max-w-2xl mx-auto px-4 space-y-8">
          <h2 className="text-3xl md:text-4xl font-serif text-white">Faites partie de l'histoire.</h2>
          <p className="text-gray-300 font-light text-lg">
            Rejoignez la team So Chic Lady. Découvrez nos dernières pièces et laissez-vous inspirer.
          </p>
          <div className="flex justify-center pt-4">
            <Link 
              to="/categories" 
              className="group bg-[#E5A3B8] text-[#1A1A1A] px-8 py-4 rounded-none hover:bg-[#F8C8DC] transition-colors flex items-center justify-center gap-3 text-sm uppercase tracking-widest font-medium shadow-lg"
            >
              Voir la Collection 
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default BrandHistory;