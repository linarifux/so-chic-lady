import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

// High-end fashion placeholder images
const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop", // Classic fashion
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop", // High-end boutique feel
  "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop"  // Elegant coats/dresses
];

const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);

  // Auto-play slider logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000); // Changes image every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[85vh] md:h-[90vh] flex items-center justify-center overflow-hidden bg-[#1A1A1A]">
      
      {/* Background Images with Crossfade */}
      {HERO_IMAGES.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentImage ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Subtle dark gradient overlay to ensure text is always readable regardless of the image */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60 z-10"></div> 
          <img 
            src={img} 
            alt="So Chic Lady Collection" 
            className="w-full h-full object-cover object-center transform scale-105 motion-safe:animate-[slowZoom_20s_ease-in-out_infinite]" 
          />
        </div>
      ))}

      {/* Abstract Soft Brand Shapes Overlay */}
      <div className="absolute top-[-10%] right-[-5%] w-[30rem] h-[30rem] bg-[#F8C8DC] rounded-full mix-blend-overlay filter blur-[120px] opacity-40 z-20 pointer-events-none"></div>

      {/* Main Content */}
      <div className="relative z-30 text-center px-4 space-y-8 max-w-4xl mx-auto mt-10">
        <p className="text-xs md:text-sm font-semibold tracking-[0.3em] text-[#F8C8DC] uppercase drop-shadow-md">
          Boutique de Mode • Pissos, France
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-[1.1] tracking-tight drop-shadow-lg">
          Révélez votre <span className="italic text-[#E5A3B8] font-light">style</span>, <br /> 
          sublimez votre image.
        </h1>
        <p className="text-gray-200 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed drop-shadow-md">
          Pour toutes celles qui veulent du style, du fun et du chic. Découvrez des looks tendances et féminins conçus pour vous mettre en valeur.
        </p>
        
        <div className="pt-8 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 items-center">
          {/* Primary CTA */}
          <Link 
            to="/categories" 
            className="group bg-white text-[#1A1A1A] px-8 py-4 rounded-none hover:bg-[#E5A3B8] transition-all duration-300 flex items-center justify-center gap-3 text-sm uppercase tracking-widest font-medium w-full sm:w-auto shadow-2xl"
          >
            Découvrir la Collection 
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          
          {/* Secondary CTA (Glassmorphism) */}
          <button className="group flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 text-sm uppercase tracking-widest font-medium py-4 px-8 rounded-none w-full sm:w-auto shadow-2xl">
            <Sparkles size={18} className="text-[#F8C8DC] group-hover:animate-pulse" />
            Essayer l'IA Styliste
          </button>
        </div>
      </div>

      {/* Slider Indicators (Bottom Center) */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30 flex gap-3">
        {HERO_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index === currentImage ? 'bg-white w-10' : 'bg-white/40 w-4 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;