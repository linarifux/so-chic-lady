import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { FiMail, FiMapPin, FiArrowRight } from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1A1A1A] text-gray-300 pt-20 pb-10 mt-auto border-t-4 border-[#F8C8DC]">
      {/* max-w-7xl and mx-auto keep the whole block centered on the screen */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid Section: grid-cols-2 creates two rows of two items on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 sm:gap-x-8 lg:gap-8 mb-16 text-left">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-5">
            <Link to="/" className="inline-block text-2xl md:text-3xl font-serif font-bold text-white tracking-wider break-words">
              So Chic <span className="text-[#F8C8DC]">Lady</span>
            </Link>
            <p className="text-xs md:text-sm text-gray-400 leading-relaxed pr-2">
              Pour toutes celles qui veulent du style, du fun et du chic 🎀. Découvrez nos looks en boutique à Pissos et rejoignez la team.
            </p>
            <div className="flex space-x-3 md:space-x-4">
              <a 
                href="https://www.facebook.com/SoChicLadyPissos" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#333333] flex items-center justify-center text-white hover:bg-[#E5A3B8] hover:text-[#1A1A1A] transition-all duration-300 shrink-0"
                aria-label="Facebook"
              >
                <FaFacebook size={16} />
              </a>
              <a 
                href="https://www.instagram.com/sochicladypissos" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#333333] flex items-center justify-center text-white hover:bg-[#E5A3B8] hover:text-[#1A1A1A] transition-all duration-300 shrink-0"
                aria-label="Instagram"
              >
                <FaInstagram size={16} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-serif text-base md:text-lg mb-4 md:mb-6 tracking-wide">Navigation</h4>
            <ul className="space-y-3 md:space-y-4 text-xs md:text-sm">
              <li>
                <Link to="/" className="hover:text-[#E5A3B8] transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-[#E5A3B8] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-[#E5A3B8] transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-[#E5A3B8] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Collection
                </Link>
              </li>
              <li>
                <Link to="/history" className="hover:text-[#E5A3B8] transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-[#E5A3B8] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Notre Histoire
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#E5A3B8] transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-[#E5A3B8] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Contactez-nous
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Support */}
          <div>
            <h4 className="text-white font-serif text-base md:text-lg mb-4 md:mb-6 tracking-wide">Service Client</h4>
            <ul className="space-y-3 md:space-y-4 text-xs md:text-sm">
              <li>
                <Link to="/shipping" className="hover:text-[#E5A3B8] transition-colors">Livraisons & Retours</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-[#E5A3B8] transition-colors">FAQ</Link>
              </li>
              <li>
                <Link to="/cgv" className="hover:text-[#E5A3B8] transition-colors">CGV</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-[#E5A3B8] transition-colors">Confidentialité</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="text-white font-serif text-base md:text-lg mb-4 md:mb-6 tracking-wide">Restez Connectée</h4>
            <p className="text-xs md:text-sm text-gray-400 mb-4 pr-2">
              Inscrivez-vous pour recevoir nos nouveautés et conseils.
            </p>
            <form className="relative flex w-full" onSubmit={(e) => e.preventDefault()}>
              <div className="absolute inset-y-0 left-0 pl-2.5 md:pl-3 flex items-center pointer-events-none">
                <FiMail size={14} className="text-gray-500" />
              </div>
              <input 
                type="email" 
                placeholder="Votre email" 
                className="w-full bg-[#333333] text-white text-xs md:text-sm rounded-none py-2.5 md:py-3 pl-8 md:pl-10 pr-10 md:pr-12 focus:outline-none focus:ring-1 focus:ring-[#F8C8DC] transition-all border border-transparent focus:border-[#F8C8DC]"
                required
              />
              <button 
                type="submit" 
                className="absolute inset-y-0 right-0 px-2 md:px-3 flex items-center bg-[#E5A3B8] text-[#1A1A1A] hover:bg-[#F8C8DC] transition-colors"
                aria-label="S'inscrire"
              >
                <FiArrowRight size={16} />
              </button>
            </form>
            <div className="mt-6 flex items-start gap-2 md:gap-3 text-xs md:text-sm text-gray-400">
              <FiMapPin size={16} className="text-[#E5A3B8] shrink-0 mt-0.5" />
              <p>11 route de Sore,<br/> 40410 Pissos, France</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Uses items-start on mobile to keep text left-aligned instead of centered */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs text-gray-500 text-left">
          <p>&copy; {currentYear} So Chic Lady. Tous droits réservés.</p>
          <p className="flex items-center gap-1">
            Créé avec <span className="text-[#E5A3B8]">♥</span> pour la mode.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;