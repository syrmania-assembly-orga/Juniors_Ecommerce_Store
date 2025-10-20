import type { RootState } from '..';

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartCount = (state: RootState) => {
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
};
export const selectCartTotal = (state: RootState) =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
