import { useSelector } from 'react-redux';
import { selectCartItems } from '../store/slices/cartSelectors';
import { Link } from 'react-router-dom';
import CartItemCard from '../components/CartItemCard';
import CartSummary from '../components/CartSummary';

const CartPage = () => {
  const cart = useSelector(selectCartItems);

  if (cart.length === 0)
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold mb-4">Your Cart is Empty</h2>
        <Link to="/" className="text-blue-600 hover:underline">
          Continue Shopping
        </Link>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto mt-10 grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
        {cart.map((item, idx) => (
          <CartItemCard key={`${item.id}-${idx}`} item={item} />
        ))}
      </div>
      <CartSummary />
    </div>
  );
};

export default CartPage;