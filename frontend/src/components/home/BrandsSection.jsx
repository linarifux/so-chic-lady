const BrandsSection = () => {
  const brands = [
    "VOGUE", "ELLE", "MARIE CLAIRE", "COSMOPOLITAN", "HARPER'S BAZAAR", "L'OFFICIEL", "VANITY FAIR"
  ];

  return (
    <section className="py-24 bg-[#FAFAFA] border-y border-gray-100 overflow-hidden relative flex flex-col justify-center">
      
      {/* 
        Self-contained CSS for the Marquee animation and text-outline effect.
        This keeps your component modular without needing global config changes!
      */}
      <style>
        {`
          @keyframes scroll-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes scroll-right {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          .animate-marquee-left {
            animation: scroll-left 40s linear infinite;
          }
          .animate-marquee-right {
            animation: scroll-right 40s linear infinite;
          }
          .text-outline {
            -webkit-text-stroke: 1px #d1d5db; /* Tailwind gray-300 */
            color: transparent;
          }
          .text-outline:hover {
            -webkit-text-stroke: 1px #333333;
            color: #333333;
          }
        `}
      </style>

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <p className="text-xs text-[#E5A3B8] uppercase tracking-[0.3em] font-medium mb-2">
          Approuvé par l'industrie
        </p>
        <h2 className="text-3xl md:text-4xl font-serif text-[#333333]">
          Nos Inspirations & Partenaires
        </h2>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full flex flex-col gap-6 md:gap-10">
        
        {/* Track 1: Moving Left */}
        <div className="flex w-max animate-marquee-left hover:[animation-play-state:paused] cursor-pointer">
          {/* We render the array twice to create a seamless infinite loop */}
          {[...Array(2)].map((_, i) => (
            <div key={`left-${i}`} className="flex items-center justify-around w-max">
              {brands.map((brand, index) => (
                <div key={`${i}-${index}`} className="flex items-center px-8 md:px-16 group">
                  <span className="text-6xl md:text-8xl font-serif font-bold text-outline transition-all duration-300 group-hover:scale-105">
                    {brand}
                  </span>
                  <span className="mx-8 md:mx-16 text-[#E5A3B8] opacity-50 text-3xl md:text-5xl">✦</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Track 2: Moving Right */}
        <div className="flex w-max animate-marquee-right hover:[animation-play-state:paused] cursor-pointer">
          {[...Array(2)].map((_, i) => (
            <div key={`right-${i}`} className="flex items-center justify-around w-max">
              {/* Reverse the array so the second row looks visually distinct */}
              {[...brands].reverse().map((brand, index) => (
                <div key={`reverse-${i}-${index}`} className="flex items-center px-8 md:px-16 group">
                  <span className="text-6xl md:text-8xl font-serif font-bold text-outline transition-all duration-300 group-hover:scale-105">
                    {brand}
                  </span>
                  <span className="mx-8 md:mx-16 text-[#E5A3B8] opacity-50 text-3xl md:text-5xl">✦</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        
        {/* Gradient overlays to create a smooth fade-in/fade-out on the screen edges */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-64 bg-gradient-to-r from-[#FAFAFA] to-transparent pointer-events-none z-10"></div>
        <div className="absolute inset-y-0 right-0 w-24 md:w-64 bg-gradient-to-l from-[#FAFAFA] to-transparent pointer-events-none z-10"></div>
      </div>
      
    </section>
  );
};

export default BrandsSection;