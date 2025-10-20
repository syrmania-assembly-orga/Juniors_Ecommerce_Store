import { Link } from 'react-router-dom';

const EmptyCart = () => (
  <div className="text-center py-20">
    <h2 className="text-xl font-semibold mb-4">Your Cart is Empty</h2>
    <Link to="/" className="text-blue-600 hover:underline">
      Continue Shopping
    </Link>
  </div>
);

export default EmptyCart;
