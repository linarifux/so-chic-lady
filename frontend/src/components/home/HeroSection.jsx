import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop", // Main arch image
  "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=600&auto=format&fit=crop",  // Overlapping floating image
];

const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#FAFAFA] border-b border-gray-100">
      
      {/* 
        Self-contained animations for that robust, modern feel.
        We are adding floating effects and smooth slide-ups.
      */}
      <style>
        {`
          @keyframes float-slow {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          @keyframes float-fast {
            0%, 100% { transform: translateY(0px) rotate(2deg); }
            50% { transform: translateY(-15px) rotate(-1deg); }
          }
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-float-slow {
            animation: float-slow 6s ease-in-out infinite;
          }
          .animate-float-fast {
            animation: float-fast 4s ease-in-out infinite;
          }
          .animate-spin-slow {
            animation: spin-slow 12s linear infinite;
          }
        `}
      </style>

      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-[#F8C8DC]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-[#E5A3B8]/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 py-12 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* LEFT: Typography & CTAs */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 max-w-2xl mx-auto lg:mx-0 relative z-20">
            
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full bg-white shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#E5A3B8] animate-pulse"></span>
              <span className="text-xs font-bold tracking-widest uppercase text-[#333333]">Nouvelle Collection</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-serif text-[#333333] leading-[1.05] tracking-tight">
              Révélez votre <br />
              <div className="relative inline-block mt-2">
                <span className="relative z-10 italic font-light text-[#E5A3B8] pr-4">allure.</span>
                {/* Decorative swoosh behind the text */}
                <div className="absolute bottom-2 left-0 w-full h-4 bg-[#F8C8DC]/40 -z-10 -rotate-2"></div>
              </div>
            </h1>

            <p className="text-gray-500 text-lg md:text-xl font-light max-w-lg leading-relaxed">
              Pour toutes celles qui veulent du style, du chic et de l'élégance. Découvrez des pièces tendances conçues pour vous mettre en valeur.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4">
              <Link 
                to="/categories" 
                className="group bg-[#333333] text-white px-8 py-4 flex items-center justify-center gap-3 text-sm uppercase tracking-widest font-bold w-full sm:w-auto shadow-lg hover:bg-[#E5A3B8] hover:text-[#333333] transition-colors duration-300 rounded-sm"
              >
                La Collection 
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <button className="group flex items-center justify-center gap-2 bg-white text-[#333333] border border-gray-200 hover:border-[#E5A3B8] hover:bg-[#F8C8DC]/10 transition-all duration-300 text-sm uppercase tracking-widest font-bold py-4 px-8 rounded-sm w-full sm:w-auto shadow-sm">
                <Sparkles size={18} className="text-[#E5A3B8] group-hover:scale-110 transition-transform" />
                Essayer l'IA
              </button>
            </div>
          </div>

          {/* RIGHT: Modern Image Collage with Shapes */}
          <div className="relative h-[60vh] lg:h-[75vh] w-full mt-10 lg:mt-0 flex items-center justify-center pointer-events-none">
            
            {/* Main Arch Image */}
            <div className="absolute right-[10%] lg:right-0 w-[65%] md:w-[55%] h-[80%] rounded-t-full overflow-hidden shadow-2xl border-4 border-white animate-float-slow z-10">
              <img 
                src={HERO_IMAGES[0]} 
                alt="Mode Élégante" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Overlapping Offset Image */}
            <div className="absolute left-[5%] lg:-left-[10%] bottom-[10%] w-[50%] md:w-[45%] h-[55%] rounded-sm overflow-hidden shadow-2xl border-4 border-white animate-float-fast z-20">
              <img 
                src={HERO_IMAGES[1]} 
                alt="Détail Boutique" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Decorative Rotating Element */}
            <div className="absolute top-[15%] left-[20%] lg:left-[5%] z-30 animate-spin-slow">
              <svg width="80" height="80" viewBox="0 0 100 100" className="text-[#E5A3B8] opacity-80 fill-current">
                <path d="M50 0L53.5 35L85.5 14.5L65 46.5L100 50L65 53.5L85.5 85.5L53.5 65L50 100L46.5 65L14.5 85.5L35 53.5L0 50L35 46.5L14.5 14.5L46.5 35L50 0Z" />
              </svg>
            </div>

            {/* Small Floating Circle */}
            <div className="absolute bottom-[25%] right-[0%] w-24 h-24 rounded-full border border-[#E5A3B8] border-dashed animate-spin-slow z-0"></div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;