import type React from "react"
import type { Product } from "../../constant";
import { addToCart } from "../../api/cart";
import toast from "react-hot-toast";

interface ProductCardProps {
  product: Product;
}

const productCard:React.FC<ProductCardProps> = ({product}) => {

  const handleAddTocart=async()=>{
    try {
      await addToCart(product.id)
      toast.success("Item addded to cart")
    } catch (error) {
      console.log(error)
      toast.error("Failed to add to cart")
    }
  }


  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col justify-between">
      <img
        src={product.images?.[0] || "/placeholder.jpg"}
        alt={product.name}
        className="w-full h-48 object-cover rounded-lg"
      />
      <div className="mt-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-500 text-sm truncate">{product.description}</p>
        <p className="text-green-600 font-bold mt-2">${product.price}</p>
        <button
          onClick={handleAddTocart}
          className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default productCard
