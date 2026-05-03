import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCart, removeFromCart, getTotals, addToCart, decreaseCart } from '../../store/slices/cartSlice';
import { X, Trash2, ArrowRight, ShoppingBag, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartSidebar = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Recalculate totals whenever the cart items change
  useEffect(() => {
    dispatch(getTotals());
  }, [cart.cartItems, dispatch]);

  return (
    <>
      {/* Dark Overlay Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          cart.isCartOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        onClick={() => dispatch(toggleCart())}
      ></div>

      {/* Slide-out Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[70] shadow-2xl transform transition-transform duration-500 ease-in-out flex flex-col ${
          cart.isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-[#FAFAFA]">
          <h2 className="text-xl font-serif text-[#333333] flex items-center gap-2">
            <ShoppingBag size={20} />
            Votre Panier ({cart.cartTotalQuantity})
          </h2>
          <button 
            onClick={() => dispatch(toggleCart())} 
            className="text-gray-400 hover:text-[#333333] transition-colors p-2 -mr-2"
          >
            <X size={24} />
          </button>
        </div>

        {/* Cart Items Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
              <ShoppingBag size={48} className="text-gray-200" />
              <p className="font-light">Votre panier est tristement vide.</p>
              <button 
                onClick={() => dispatch(toggleCart())}
                className="text-[#E5A3B8] underline hover:text-[#333333] transition-colors text-sm"
              >
                Continuer mes achats
              </button>
            </div>
          ) : (
            cart.cartItems.map((item) => (
              <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 group">
                <div className="w-20 h-24 bg-gray-100 rounded-sm overflow-hidden shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-medium text-[#333333] leading-tight pr-4">{item.name}</h3>
                      <button 
                        onClick={() => dispatch(removeFromCart({ id: item.id, selectedSize: item.selectedSize }))}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Taille: {item.selectedSize}</p>
                  </div>
                  
                  {/* Updated Quantity Controls & Price */}
                  <div className="flex justify-between items-end mt-2">
                    
                    <div className="flex items-center border border-gray-200 rounded-sm w-20 h-7">
                      <button 
                        onClick={() => dispatch(decreaseCart({ id: item.id, selectedSize: item.selectedSize }))}
                        className="w-1/3 flex items-center justify-center text-gray-500 hover:text-[#333333] transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-1/3 text-center text-xs font-medium text-[#333333]">
                        {item.cartQuantity}
                      </span>
                      <button 
                        onClick={() => dispatch(addToCart({ product: item, size: item.selectedSize }))}
                        className="w-1/3 flex items-center justify-center text-gray-500 hover:text-[#333333] transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <span className="text-sm font-medium text-[#333333]">
                      {(item.price * item.cartQuantity).toFixed(2)} €
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Checkout */}
        {cart.cartItems.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-[#FAFAFA] space-y-4">
            <div className="flex justify-between text-[#333333] mb-4">
              <span className="font-medium">Sous-total</span>
              <span className="font-medium text-lg">{cart.cartTotalAmount.toFixed(2)} €</span>
            </div>
            <p className="text-xs text-gray-500 text-center mb-4">
              Taxes incluses. Frais de port calculés à l'étape suivante.
            </p>
            <button className="w-full bg-[#333333] text-white py-4 text-sm uppercase tracking-widest font-medium hover:bg-[#E5A3B8] hover:text-[#333333] transition-colors flex items-center justify-center gap-2 shadow-lg">
              Commander <ArrowRight size={18} />
            </button>
            <div className="text-center pt-2">
               <Link 
                  to="/categories" 
                  onClick={() => dispatch(toggleCart())}
                  className="text-xs text-gray-500 underline hover:text-[#E5A3B8] transition-colors"
                >
                 Continuer mes achats
               </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;