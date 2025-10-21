import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  addItem,
  removeItem,
  updateQuantity,
} from '../store/slices/cartSlice.ts'
import { selectCartItems } from '../store/slices/cartSelectors'
import { useSelector } from 'react-redux'
import {
  selectProducts,
  selectProductsLoading,
  selectProductsError,
} from '../store/slices/productSelectors.ts'
import { fetchProducts } from '../store/slices/productSlice.ts'
import type { AppDispatch } from '../store'

interface IProductItem {
  id: number
  title: string
  description?: string
  price: number
  image: string
}

interface ICartItem extends IProductItem {
  quantity: number
}

const ProductsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const products = useSelector(selectProducts)
  const loading = useSelector(selectProductsLoading)
  const error = useSelector(selectProductsError)
  const cart = useSelector(selectCartItems)
  const [expandedProduct, setExpandedProduct] = useState<number | null>(null)
  const navigate = useNavigate()

  const handleAddToCart = (product: IProductItem) => {
    const cartItem: ICartItem = {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      image: product.image,
      quantity: 1,
    }
    dispatch(addItem(cartItem))
  }

  const handleRemoveFromCart = (id: number) => {
    const cartItem = cart.find((item) => item.id === id)
    if (cartItem) {
      const newQuantity = cartItem.quantity - 1
      if (newQuantity > 0) {
        dispatch(updateQuantity({ id, quantity: newQuantity }))
      } else {
        dispatch(removeItem(id))
      }
    }
  }

  const toggleDescription = (id: number) => {
    setExpandedProduct((prev) => (prev === id ? null : id))
  }

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 px-8 py-10">
      <h1 className="text-3xl font-semibold text-center mb-10">🛍 Products</h1>
      {loading && (
        <div className="flex justify-center items-center h-40">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="text-center py-10 text-red-600 font-semibold">
          Error loading products: {error}
        </div>
      )}
      {/* قائمة المنتجات */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => {
          const cartItem = cart.find((item) => item.id === product.id)
          const isExpanded = expandedProduct === product.id

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
                    e.stopPropagation()
                    handleAddToCart(product)
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
                    e.stopPropagation()
                    handleRemoveFromCart(product.id)
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
          )
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
          onClick={() => navigate('/cart')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Go to Cart
        </button>

        <button
          onClick={() => navigate('/')}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back to Welcome
        </button>
      </div>
    </div>
  )
}

export default ProductsPage
