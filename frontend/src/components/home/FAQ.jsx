import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0); // The first question is open by default

  const faqs = [
    {
      question: "Quels sont les délais d'expédition et de livraison ?",
      answer: "Toute commande passée avant midi est expédiée le jour même. Les délais de livraison varient ensuite de 48h à 72h via Colissimo, et de 3 à 5 jours via Mondial Relay."
    },
    {
      question: "Comment fonctionne l'IA Styliste ?",
      answer: "Notre IA Styliste analyse vos besoins (morphologie, événement, préférences) et pioche dans notre base de données en direct pour vous créer la tenue idéale. Cliquez simplement sur le bouton 'AI Stylist' dans le menu pour commencer à discuter avec elle !"
    },
    {
      question: "Puis-je retourner un article s'il ne me convient pas ?",
      answer: "Bien sûr ! Vous disposez de 14 jours après la réception de votre commande pour nous renvoyer l'article dans son état d'origine, avec son étiquette. Le remboursement sera effectué sous 7 jours."
    },
    {
      question: "Où se trouve votre boutique physique ?",
      answer: "Notre cœur bat à Pissos, dans les Landes. Nous serons ravies de vous y accueillir pour des conseils personnalisés, du mardi au samedi."
    },
    {
      question: "Comment choisir ma taille ?",
      answer: "La majorité de nos pièces taillent normalement. Vous trouverez un guide des tailles détaillé sur chaque page produit. Si vous hésitez entre deux tailles, notre IA Styliste est là pour vous guider !"
    }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-[#FAFAFA] border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-[#333333] mb-4">Questions Fréquentes</h2>
          <p className="text-gray-500 font-light">
            Tout ce que vous devez savoir avant de valider votre commande.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`bg-white border transition-colors duration-300 rounded-sm ${
                openIndex === index ? 'border-[#E5A3B8] shadow-sm' : 'border-gray-200'
              }`}
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none"
              >
                <span className={`font-medium text-sm md:text-base ${openIndex === index ? 'text-[#333333]' : 'text-gray-600'}`}>
                  {faq.question}
                </span>
                <span className={`ml-4 shrink-0 transition-transform duration-300 ${openIndex === index ? 'text-[#E5A3B8] rotate-180' : 'text-gray-400'}`}>
                  {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </span>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6 text-gray-500 font-light text-sm md:text-base leading-relaxed border-t border-gray-50 pt-4">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQ;