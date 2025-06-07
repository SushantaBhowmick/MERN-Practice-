import  { useEffect, useState } from "react";
import type { CartItem } from "../constant";
import { getCart } from "../api/cart";
import toast from "react-hot-toast";
import { checkOutSession } from "../api/payment";

const Checkout = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [address, setAddress] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      await getCart().then((res) => {
        setCartItems(res.cartItems);
        const totalAmount = res.cartItems.reduce(
          (sum: number, curr: CartItem) =>
            sum + curr.product.price * curr.quantity,
          0
        );
        setTotal(totalAmount);
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!address.trim()) return toast.error("Please enter a shipping address");
    try {
      const res = await checkOutSession(address);

      window.location.href = res.url;
    } catch (error) {
        console.log(error)
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 min-h-[550px]">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      {/* Cart Summary */}
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center gap-4 border-b pb-2">
            <img
              src={item.product.images[0]}
              alt={item.product.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div>
              <p className="font-medium">{item.product.name}</p>
              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
              <p className="text-sm font-semibold">
                ${item.product.price * item.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="mt-6 text-right font-semibold text-lg">
        Total: ${total.toFixed(2)}
      </div>

      {/* Address */}
      <div className="mt-6">
        <label htmlFor="address" className="font-semibold">
          Enter You Shipped Address
        </label>
        <textarea
          id="address"
          className=" w-full border p-3 rounded text-sm"
          rows={4}
          placeholder="Enter your shipping address..."
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      {/* Place Order */}
      <button
        className="mt-4 w-full py-3 px-6 bg-green-600 hover:bg-green-700 font-semibold text-white"
        onClick={handlePlaceOrder}
      >
        Place Order
      </button>
    </div>
  );
};

export default Checkout;
