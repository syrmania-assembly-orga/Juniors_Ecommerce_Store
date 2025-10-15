import React from "react";
import { useSelector } from "react-redux";
import { selectCartTotal } from "../features/cart/cartSelectors";

const CartSummary: React.FC = () => {
  const total = useSelector(selectCartTotal);
  const tax = total * 0.08;

  return (
    <div className="border p-4 rounded-lg shadow-md bg-white">
      <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
      <div className="flex justify-between">
        <span>Subtotal:</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span>Tax (8%):</span>
        <span>${tax.toFixed(2)}</span>
      </div>
      <hr className="my-2" />
      <div className="flex justify-between font-bold text-lg">
        <span>Total:</span>
        <span>${(total + tax).toFixed(2)}</span>
      </div>
      <button className="w-full mt-4 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded">
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartSummary;
