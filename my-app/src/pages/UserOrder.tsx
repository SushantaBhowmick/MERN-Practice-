import { useEffect, useState } from "react";
import { getUserOrders } from "../api/order";
import type { Order } from "../constant";

const UserOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getUserOrders();
        setOrders(res.orders);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div className="text-center mt-8">Loading orders...</div>;

  if (orders.length === 0)
    return <div className="text-center mt-8">No orders yet.</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto min-h-[550px]">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="p-4 border rounded-lg shadow-md bg-white space-y-2"
          >
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-500">Order ID: #{order.id}</p>
                <p className="text-sm text-gray-500">
                  Date: {(new Date(order.createdAt), "dd MMM yyyy")}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm">
                  Status:{" "}
                  <span className="font-semibold capitalize">
                    {order.status}
                  </span>
                </p>
                <p className="text-sm">
                  Payment:{" "}
                  <span
                    className={`font-semibold ${
                      order.paymentStatus === "paid"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </p>
              </div>
            </div>

            <div className="border-t pt-3">
              <ul className="text-sm space-y-1">
                {order.items.map((item) => (
                  <li key={item.id}>
                    <span className="font-medium">{item.product.name}</span> ×{" "}
                    {item.quantity} — ${item.price}
                  </li>
                ))}
              </ul>
              <p className="mt-2 font-semibold">Total: ${order.total}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserOrders;
