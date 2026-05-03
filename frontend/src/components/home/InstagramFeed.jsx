import { FiInstagram, FiHeart, FiMessageCircle } from 'react-icons/fi';

// Placeholder images - in the future, these can be replaced by real API data
const INSTAGRAM_POSTS = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop",
    likes: 124,
    comments: 12
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?q=80&w=800&auto=format&fit=crop",
    likes: 89,
    comments: 5
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop",
    likes: 256,
    comments: 24
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=800&auto=format&fit=crop",
    likes: 142,
    comments: 8
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop",
    likes: 312,
    comments: 45
  }
];

const InstagramFeed = () => {
  return (
    <section className="py-20 bg-white border-y border-gray-100 overflow-hidden">
      
      {/* Header */}
      <div className="text-center mb-12 px-4">
        <a 
          href="https://www.instagram.com/sochicladypissos" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 text-[#333333] hover:text-[#E5A3B8] transition-colors group mb-4"
        >
          <FiInstagram size={28} className="group-hover:scale-110 transition-transform" />
          <h2 className="text-2xl md:text-3xl font-serif tracking-wide">@sochicladypissos</h2>
        </a>
        <p className="text-gray-500 font-light text-sm tracking-widest uppercase">
          Rejoignez-nous sur Instagram pour des looks quotidiens
        </p>
      </div>

      {/* Edge-to-Edge Grid Container */}
      <div className="w-full">
        {/* Mobile: 2 columns, Tablet: 3 columns, Desktop: 5 columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {INSTAGRAM_POSTS.map((post) => (
            <a 
              key={post.id}
              href="https://www.instagram.com/sochicladypissos" 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative aspect-square group overflow-hidden bg-gray-100 block"
            >
              {/* Image */}
              <img 
                src={post.image} 
                alt="Instagram post by So Chic Lady" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              
              {/* Dark Overlay (Appears on Hover) */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 text-white backdrop-blur-sm">
                
                {/* Likes count */}
                <div className="flex items-center gap-2 font-medium">
                  <FiHeart size={20} className="fill-white" />
                  <span>{post.likes}</span>
                </div>
                
                {/* Comments count */}
                <div className="flex items-center gap-2 font-medium">
                  <FiMessageCircle size={20} className="fill-white" />
                  <span>{post.comments}</span>
                </div>
                
              </div>
            </a>
          ))}
        </div>
      </div>
      
    </section>
  );
};

export default InstagramFeed;