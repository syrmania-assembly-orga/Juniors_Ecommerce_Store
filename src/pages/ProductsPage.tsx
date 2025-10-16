import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

interface IProductItem {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

interface ICartItem extends IProductItem {quantity: number;
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<IProductItem[]>([]);
  const [cart, setCart] = useState<ICartItem[]>([]);
  const [expandedProduct, setExpandedProduct] = useState<number | null>(null);

  const navigate = useNavigate(); 

 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://fakestoreapi.com/products");
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product: IProductItem) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {return prev.map((item) =>item.id === product.id ?{ ...item, quantity: item.quantity + 1 }:item);}
       else { 
        return [...prev, { ...product, quantity: 1 }]; }});};

  const handleRemoveFromCart = (id: number) => {
    setCart((prev) => {const existing = prev.find((item) => item.id === id);

      if (existing && existing.quantity > 1){return prev.map((item) =>item.id === id ?{ ...item, quantity: item.quantity - 1 }:item);}
       else {
        return prev.filter((item) => item.id !== id);}});};

  const toggleDescription = (id: number) => {
    setExpandedProduct((prev) => (prev === id ? null : id));};

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 px-8 py-10">
      <h1 className="text-3xl font-semibold text-center mb-10">
        🛍 Products
      </h1>

      {/* قائمة المنتجات */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => {
          const cartItem = cart.find((item) => item.id === product.id);
          const isExpanded = expandedProduct === product.id;

          return (
            <div
              key={product.id}
              className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
              onClick={() => toggleDescription(product.id)}
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-contain mb-4"
              />
              <h2 className="font-semibold text-lg mb-2">{product.title}</h2>
              <p className="font-bold text-[#FEA405] mb-3">${product.price}</p>

              
              <div className="flex justify-center items-center gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                  className="bg-green-500 text-white rounded-full w-10 h-10 flex justify-center items-center text-xl hover:bg-green-600"
                >
                  +
                </button>

                <span className="text-lg font-semibold">
                  {cartItem ? cartItem.quantity : 0}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFromCart(product.id);
                  }}
                  className="bg-red-500 text-white rounded-full w-10 h-10 flex justify-center items-center text-xl hover:bg-red-600"
                >
                  −
                </button>
              </div>

              {isExpanded && (
                <p className="text-sm text-gray-600 mt-4 border-t pt-3">
                  {product.description}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-10 bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">🧺 Cart</h2>
        {cart.length === 0 ? (
          <p>No items in cart yet.</p>
        ) : (
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between mb-2">
                <span>
                  {item.title} x {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      
      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={() => navigate("/cart")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Go to Cart
        </button>
        
        <button
          onClick={() => navigate("/welcome")}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back to Welcome
        </button>
      </div>
    </div>
  );
};

export default ProductsPage;