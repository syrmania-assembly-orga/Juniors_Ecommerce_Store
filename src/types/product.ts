export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string; // optional field if product page wants it
  category?: string;
}
