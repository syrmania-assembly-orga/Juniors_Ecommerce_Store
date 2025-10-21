import type { IProductItem } from './product'

export interface ICartItem extends IProductItem {
  quantity: number
}
