import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  isCartOpen: false,
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // 1. Open or close the slide-out cart UI
    toggleCart(state) {
      state.isCartOpen = !state.isCartOpen;
    },
    
    // 2. Add item to cart
    addToCart(state, action) {
      const { product, size } = action.payload;
      
      // Check if this exact product AND size is already in the cart
      const existingIndex = state.cartItems.findIndex(
        (item) => item.id === product.id && item.selectedSize === size
      );

      if (existingIndex >= 0) {
        // If it exists, just increase the quantity
        state.cartItems[existingIndex].cartQuantity += 1;
      } else {
        // If it doesn't exist, add it to the array with a quantity of 1
        const tempProduct = { ...product, selectedSize: size, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
      }
      
      // Automatically pop open the cart so the user sees it was added
      state.isCartOpen = true; 
    },

    // 3. Decrease item quantity
    decreaseCart(state, action) {
      const { id, selectedSize } = action.payload;
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === id && item.selectedSize === selectedSize
      );

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        // If quantity is 1 and they decrease, remove it entirely
        state.cartItems = state.cartItems.filter(
          (item) => !(item.id === id && item.selectedSize === selectedSize)
        );
      }
    },

    // 4. Remove item completely (regardless of quantity)
    removeFromCart(state, action) {
      const { id, selectedSize } = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => !(item.id === id && item.selectedSize === selectedSize)
      );
    },

    // 5. Empty the entire cart
    clearCart(state) {
      state.cartItems = [];
    },

    // 6. Calculate total price and total items
    getTotals(state) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        { total: 0, quantity: 0 }
      );
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
  },
});

export const { 
  toggleCart, 
  addToCart, 
  decreaseCart, 
  removeFromCart, 
  clearCart, 
  getTotals 
} = cartSlice.actions;

export default cartSlice.reducer;