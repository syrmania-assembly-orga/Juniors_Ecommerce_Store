import type { Product } from './product';

export interface ICartItem extends Product {
  quantity: number;
}
