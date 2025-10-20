// ...existing code...
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ICartItem } from '../../types/cart';

interface ICartState {
  items: ICartItem[];
  total: number;
}

const loadCart = (): ICartItem[] => { 
  try { return JSON.parse(localStorage.getItem("cart")||"[]") } catch { return [] } 
};
const saveCart = (items: ICartItem[]) => localStorage.setItem("cart", JSON.stringify(items));

const initialItems = loadCart();
const initialState: ICartState = {
  items: initialItems,
  total: initialItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    addItem: (state, action: PayloadAction<ICartItem>) => {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) existing.quantity += action.payload.quantity;
      else state.items.push(action.payload);
      saveCart(state.items);
    },
    
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const {id, quantity} = action.payload;
      if(quantity <= 0) {
        state.items = state.items.filter((item) => item.id !== id);
      }else{
        const existing = state.items.find((item) => item.id === id);
        if(existing) {
          existing.quantity = quantity;
        }
      }
      saveCart(state.items);
    },

    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveCart(state.items);
    },
    
    clearCart: (state) => {
      state.items = [];
      saveCart([]);
    },
    
  },
});

export const { addItem, updateQuantity, removeItem, clearCart, /* calcTotal */ } = cartSlice.actions;
export default cartSlice.reducer;