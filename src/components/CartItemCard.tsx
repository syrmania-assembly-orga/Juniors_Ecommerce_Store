import React from "react";
import { useDispatch } from "react-redux";
import { updateQuantity, removeItem } from "../features/cart/cartSlice";

interface Props {
  item: {
    id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
  };
}

const CartItemCard: React.FC<Props> = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex border-b py-4 items-center gap-4">
      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover" />
      <div className="flex-1 text-left">
        <h3 className="font-semibold">{item.name}</h3>
        <p>${item.price.toFixed(2)}</p>
        <div className="flex items-center mt-2 gap-2">
          <button
            onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
            className="px-2 border rounded"
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button
            onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
            className="px-2 border rounded"
          >
            +
          </button>
          <button
            onClick={() => dispatch(removeItem(item.id))}
            className="ml-4 text-red-500"
          >
            Remove
          </button>
        </div>
      </div>
      <div className="font-bold">
        ${(item.price * item.quantity).toFixed(2)}
      </div>
    </div>
  );
};

export default CartItemCard;