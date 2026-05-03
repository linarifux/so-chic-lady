import { MapPin, Clock, Phone } from 'lucide-react';

const StoreLocation = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          
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

          <div className="lg:col-span-3 h-[400px] w-full bg-gray-100 border border-gray-200 shadow-inner relative overflow-hidden">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2855.1049068868892!2d-0.7814779!3d44.3077938!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd545b28ceae1ca1%3A0x2881f2d79bbe435e!2sSo%20Chic%20Lady!5e0!3m2!1sen!2sbd!4v1777786488991!5m2!1sen!2sbd" 
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
  );
};

export default StoreLocation;