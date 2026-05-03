import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

import { FiMail, FiMapPin , FiArrowRight} from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1A1A1A] text-gray-300 pt-20 pb-10 mt-auto border-t-4 border-[#F8C8DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-6">
            <Link to="/" className="inline-block text-3xl font-serif font-bold text-white tracking-wider">
              So Chic <span className="text-[#F8C8DC]">Lady</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed pr-4">
              Pour toutes celles qui veulent du style, du fun et du chic 🎀. Découvrez nos looks en boutique à Pissos et rejoignez la team.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/SoChicLadyPissos" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#333333] flex items-center justify-center text-white hover:bg-[#E5A3B8] hover:text-[#1A1A1A] transition-all duration-300"
                aria-label="Facebook"
              >
                <FaFacebook size={18} />
              </a>
              <a 
                href="https://www.instagram.com/sochicladypissos" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#333333] flex items-center justify-center text-white hover:bg-[#E5A3B8] hover:text-[#1A1A1A] transition-all duration-300"
                aria-label="Instagram"
              >
                <FaInstagram size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-serif text-lg mb-6 tracking-wide">Navigation</h4>
            <ul className="space-y-4 text-sm">
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
            <h4 className="text-white font-serif text-lg mb-6 tracking-wide">Service Client</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link to="/shipping" className="hover:text-[#E5A3B8] transition-colors">Livraisons & Retours</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-[#E5A3B8] transition-colors">FAQ</Link>
              </li>
              <li>
                <Link to="/cgv" className="hover:text-[#E5A3B8] transition-colors">Conditions Générales de Vente</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-[#E5A3B8] transition-colors">Politique de Confidentialité</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="text-white font-serif text-lg mb-6 tracking-wide">Restez Connectée</h4>
            <p className="text-sm text-gray-400 mb-4">
              Inscrivez-vous à notre newsletter pour recevoir nos dernières nouveautés et conseils mode.
            </p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail size={16} className="text-gray-500" />
              </div>
              <input 
                type="email" 
                placeholder="Votre adresse email" 
                className="w-full bg-[#333333] text-white text-sm rounded-none py-3 pl-10 pr-12 focus:outline-none focus:ring-1 focus:ring-[#F8C8DC] transition-all border border-transparent focus:border-[#F8C8DC]"
                required
              />
              <button 
                type="submit" 
                className="absolute inset-y-0 right-0 px-3 flex items-center bg-[#E5A3B8] text-[#1A1A1A] hover:bg-[#F8C8DC] transition-colors"
                aria-label="S'inscrire"
              >
                <FiArrowRight size={16} />
              </button>
            </form>
            <div className="mt-6 flex items-start gap-3 text-sm text-gray-400">
              <FiMapPin size={18} className="text-[#E5A3B8] shrink-0 mt-0.5" />
              <p>11 route de Sore,<br/> 40410 Pissos, France</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
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