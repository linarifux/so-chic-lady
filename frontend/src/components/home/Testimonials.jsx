import { Star } from 'lucide-react';

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "Camille L.",
      text: "La qualité des tissus est incroyable. J'ai reçu ma robe en 48h et elle est encore plus belle en vrai que sur les photos. Le service client est adorable.",
      item: "Robe d'Été Bohème"
    },
    {
      id: 2,
      name: "Sophie M.",
      text: "Le guide des tailles est super précis. Je cherchais une tenue élégante pour le bureau et j'ai trouvé mon bonheur. Je recommanderai !",
      item: "Veste en Jean Classique"
    },
    {
      id: 3,
      name: "Julie D.",
      text: "Une très belle découverte ! L'IA m'a conseillé un haut que je n'aurais pas osé acheter, et finalement c'est ma pièce préférée de la saison.",
      item: "Tunique à Pois Rétro"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-serif text-[#333333] mb-4">Elles l'ont adoré</h2>
        <p className="text-gray-500 font-light mb-16 max-w-2xl mx-auto">
          Vos retours sont notre plus belle récompense. Découvrez ce que nos clientes pensent de la collection.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {reviews.map((review) => (
            <div key={review.id} className="bg-[#FAFAFA] p-8 border border-gray-100 rounded-sm flex flex-col justify-between">
              <div>
                <div className="flex text-yellow-400 mb-4">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                </div>
                <p className="text-gray-600 font-light italic leading-relaxed mb-6">
                  "{review.text}"
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-[#333333]">{review.name}</p>
                <p className="text-xs text-gray-400 mt-1">À propos de : <span className="text-[#E5A3B8]">{review.item}</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;