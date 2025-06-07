import { useEffect, useState } from "react";
import type { CartItem } from "../constant";
import toast from "react-hot-toast";
import { getCart, removeCartItem, updateCartIem } from "../api/cart";
import { ArrowRight, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      await getCart().then((res) => {
        setItems(res.cartItems);
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = async (itemId: number, newQty: number) => {
    if (newQty < 1) return;
    try {
      await updateCartIem(itemId, newQty);
      toast.success("Update cart item");
      fetchCart();
    } catch (error) {
      console.error("Update failed", error);
      toast.error("Faild to update cart item");
    }
  };

  const handleRemove = async (itemId: number) => {
    try {
      await removeCartItem(itemId);
      toast.success("Remove Cart Item");
      fetchCart();
    } catch (error) {
      console.error("remove failed", error);
      toast.error("Faild to Remove cart item");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">My Cart</h1>
      {items.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border-b pb-3"
            >
              <img
                src={item.product.images[0]}
                className="w-20 h-20 object-cover"
              />
              <input
                type="number"
                value={item.quantity}
                min={1}
                onChange={(e) =>
                  handleQuantityChange(item.id, parseInt(e.target.value))
                }
                className="w-16 border rounded px-2 py-1"
              />
              <div className="flex-1 flex items-center gap-5">
                <div>
                  <h2 className="font-semibold">{item.product.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    ${item.product.price} × {item.quantity}
                  </p>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-500 text-sm ml-2"
                >
                  <Trash2Icon />
                </button>
              </div>
              <div className="font-bold">
                ${(item.product.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-end">
        <Link
        to={'/checkout'}
          className="mt-6 flex px-6 py-3 bg-green-600 hover:bg-green-700 font-semibold text-white rounded-lg"
        >
          Checkout <ArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default Cart;
