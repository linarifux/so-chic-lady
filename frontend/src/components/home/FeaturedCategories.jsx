import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const FEATURED_CATEGORIES = [
  {
    id: 'tops',
    title: 'Hauts & Tuniques',
    image: 'https://images.unsplash.com/photo-1551163943-3f6a855d1153?q=80&w=800&auto=format&fit=crop', 
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

const FeaturedCategories = () => {
  return (
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
            <Link key={category.id} to={category.link} className="group block relative overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-500">
              <div className="aspect-[3/4] w-full overflow-hidden bg-gray-200">
                <img 
                  src={category.image} 
                  alt={category.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-2xl font-serif text-white mb-2 drop-shadow-md">{category.title}</h3>
                <span className="text-white/90 text-sm tracking-wider uppercase flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                  Explorer <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;