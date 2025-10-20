import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleGoProduct = () => {
    navigate('/products');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-5 text-[#FFFFF0]">
      <h1 className="text-2xl sm:text-3xl font-semibold  mb-6">
        Welcome to Juniors Ecommerce Store 🛍️
      </h1>

      <button
        onClick={handleGoProduct}
        className="
          mt-4 px-6 py-2 rounded-md border-none
          bg-yellow-50 text-[#f6ac29] font-medium
          cursor-pointer shadow-none
          transition-all duration-300
          hover:shadow-[0_0_19px_#eee]
        "
      >
        Start Shopping
      </button>
    </div>
  );
};

export default HomePage;
