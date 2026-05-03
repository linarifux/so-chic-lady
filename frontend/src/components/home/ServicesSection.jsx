import { Heart, Sparkles, ShoppingBag } from 'lucide-react';

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

const ServicesSection = () => {
  return (
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
  );
};

export default ServicesSection;