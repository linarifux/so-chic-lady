import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Sparkles, ShoppingBag, Heart, Clock, Phone } from 'lucide-react';

// --- Data Arrays for easy management ---

const SERVICES = [
  {
    id: 1,
    icon: <Heart size={24} className="text-[#E5A3B8]" />,
    title: "Conseils Personnalisés",
    description: "La mode avec cœur, le conseil avec sincérité. Je vous propose un accompagnement sur-mesure pour sublimer votre image."
  },
  {
    id: 2,
    icon: <Sparkles size={24} className="text-[#E5A3B8]" />,
    title: "IA Styliste Privée",
    description: "Une expérience moderne. Discutez avec notre intelligence artificielle pour dénicher la tenue parfaite pour votre prochaine occasion."
  },
  {
    id: 3,
    icon: <ShoppingBag size={24} className="text-[#E5A3B8]" />,
    title: "Envoi de Commandes",
    description: "Retrouvez la collection en point de vente ou profitez de l'envoi possible de vos commandes directement chez vous."
  }
];

const FEATURED_CATEGORIES = [
  {
    id: 'tops',
    title: 'Hauts & Tuniques',
    image: 'https://images.unsplash.com/photo-1551163943-3f6a855d1153?q=80&w=800&auto=format&fit=crop', // Placeholder Unsplash image
    link: '/categories?filter=tops'
  },
  {
    id: 'dresses',
    title: 'Robes',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop',
    link: '/categories?filter=dresses'
  },
  {
    id: 'accessories',
    title: 'Accessoires',
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=800&auto=format&fit=crop',
    link: '/categories?filter=accessories'
  }
];

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#FAFAFA]">
        {/* Soft Abstract Background Elements */}
        <div className="absolute top-[-10%] right-[-5%] w-[30rem] h-[30rem] bg-[#F8C8DC] rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[25rem] h-[25rem] bg-[#E5A3B8] rounded-full mix-blend-multiply filter blur-[100px] opacity-20"></div>

        <div className="text-center z-10 px-4 space-y-8 max-w-4xl mx-auto">
          <p className="text-xs md:text-sm font-semibold tracking-[0.3em] text-gray-500 uppercase">
            Boutique de Mode • Pissos, France
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-[#333333] leading-[1.1] tracking-tight">
            Révélez votre <span className="italic text-[#E5A3B8] font-light">style</span>, <br /> 
            sublimez votre image.
          </h1>
          <p className="text-gray-600 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            Pour toutes celles qui veulent du style, du fun et du chic. Découvrez des looks tendances et féminins conçus pour vous mettre en valeur.
          </p>
          
          <div className="pt-6 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 items-center">
            <Link 
              to="/categories" 
              className="group bg-[#333333] text-white px-8 py-4 rounded-none hover:bg-[#E5A3B8] hover:text-[#333333] transition-all duration-300 flex items-center justify-center gap-3 text-sm uppercase tracking-widest font-medium w-full sm:w-auto shadow-lg"
            >
              Découvrir la Collection 
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <button className="group flex items-center gap-2 text-[#333333] hover:text-[#E5A3B8] transition-colors text-sm uppercase tracking-widest font-medium py-4 px-2">
              <Sparkles size={18} className="group-hover:animate-spin-slow" />
              Essayer l'IA Styliste
            </button>
          </div>
        </div>
      </section>

      {/* ================= BRAND GOALS & SERVICES ================= */}
      <section className="py-24 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-serif text-[#333333]">Notre Promesse</h2>
            <div className="w-16 h-[1px] bg-[#E5A3B8] mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
            {SERVICES.map((service) => (
              <div key={service.id} className="flex flex-col items-center space-y-5 p-6 group">
                <div className="w-16 h-16 bg-[#FAFAFA] rounded-full flex items-center justify-center group-hover:bg-[#F8C8DC]/30 group-hover:scale-110 transition-all duration-500 shadow-sm">
                  {service.icon}
                </div>
                <h3 className="text-xl font-serif text-[#333333]">{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-xs text-center">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURED CATEGORIES ================= */}
      <section className="py-24 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-serif text-[#333333]">La Collection</h2>
              <div className="w-16 h-[1px] bg-[#E5A3B8]"></div>
            </div>
            <Link to="/categories" className="text-sm uppercase tracking-widest text-gray-500 hover:text-[#333333] flex items-center gap-2 transition-colors">
              Voir tout <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_CATEGORIES.map((category) => (
              <Link key={category.id} to={category.link} className="group block relative overflow-hidden">
                <div className="aspect-[3/4] w-full overflow-hidden bg-gray-200">
                  <img 
                    src={category.image} 
                    alt={category.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                </div>
                {/* Overlay Text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform">
                  <h3 className="text-2xl font-serif text-white mb-2">{category.title}</h3>
                  <span className="text-white/80 text-sm tracking-wider uppercase flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                    Explorer <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BRAND HISTORY ================= */}
      <section className="py-24 bg-[#333333] text-white relative overflow-hidden">
        {/* Background Decor */}
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
              {/* Replace with actual boutique image later */}
              <img 
                src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=800&auto=format&fit=crop" 
                alt="Inside So Chic Lady Boutique" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= STORE LOCATION & MAP ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            
            {/* Store Information */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-3xl font-serif text-[#333333] mb-4">Venez nous voir</h2>
                <p className="text-gray-600 leading-relaxed">
                  Découvrez nos collections en direct et profitez de conseils personnalisés en point de vente.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-[#FAFAFA] p-3 rounded-full text-[#333333]">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#333333]">Adresse</h4>
                    <p className="text-gray-600 text-sm mt-1">
                      11 route de Sore,<br />
                      Tabac Presse Cadeaux,<br />
                      40410 Pissos, France
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#FAFAFA] p-3 rounded-full text-[#333333]">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#333333]">Horaires</h4>
                    <p className="text-gray-600 text-sm mt-1">Ouvert aujourd'hui dès 7h00</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#FAFAFA] p-3 rounded-full text-[#333333]">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#333333]">Contact</h4>
                    <p className="text-gray-600 text-sm mt-1">+33 5 58 08 90 54</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="lg:col-span-3 h-[400px] w-full bg-gray-100 border border-gray-200 shadow-inner relative overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2856.7827828069357!2d-0.7831154235221971!3d44.27339737107775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd53db7cf17b9619%3A0x7d025bfa1be4eec2!2sSo%20Chic%20Lady!5e0!3m2!1sen!2sbd!4v1714890635293!5m2!1sen!2sbd" 
                className="absolute inset-0 w-full h-full border-0" 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="So Chic Lady Map Location"
              ></iframe>
            </div>
            
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;