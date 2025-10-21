export interface IProductItem {
  id: number
  title: string
  price: number
  image: string
  description?: string // optional field if product page wants it
  category?: string
}
