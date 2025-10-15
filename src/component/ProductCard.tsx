import React from 'react';

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
};

const ProductCard: React.FC<Product> = ({
  name,
  description,
  price,
  image,
  quantity,
  onAdd,
  onRemove,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition duration-300">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
      <p className="text-sm text-gray-600 mb-2">{description}</p>
      <p className="text-[#FEA405] font-bold mb-3">${price}</p>

      <div className="flex flex-col gap-2">
        <button
          onClick={onAdd}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-[#FEA405] text-white rounded hover:bg-yellow-500 transition"
        >
          ➕ Add to Cart
        </button>

        <button
          onClick={onRemove}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          ➖ Remove from Cart
        </button>

        <p className="text-sm text-gray-700 text-center">
          In Cart: {quantity}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;