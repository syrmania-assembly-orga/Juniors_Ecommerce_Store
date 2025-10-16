import { useDispatch } from 'react-redux';
import { updateQuantity, removeItem } from '../features/cart/cartSlice';
import type { ICartItem } from '../types/cart';

const CartItemCard = ({ item }: { item: ICartItem }) => {
  
  const dispatch = useDispatch();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
  };

  const handleRemove = () => {
    dispatch(removeItem(item.id));
  };

  return (
    <div className="flex border-b py-4 items-center gap-4">
      <img src={item.image} alt={item.name} className="w-20 h-20" />
      <div className="flex-1 text-left">
        <h3 className="font-semibold">{item.name}</h3>
        <p>${item.price.toFixed(2)}</p>
        <div className="flex items-center mt-2 gap-2">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="px-2 border rounded"
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="px-2 border rounded"
          >
            +
          </button>
          <button
            onClick={() => handleRemove()}
            className="ml-4 text-red-500"
          >
            Remove
          </button>
        </div>
      </div>
      <div className="font-semibold">${(item.price * item.quantity).toFixed(2)}</div>
    </div>
  );
};

export default CartItemCard;
