import { toast } from "react-hot-toast";
import { useEffect } from "react";

const PaymentCancel = () => {
  useEffect(() => {
    toast.error("Payment canceled. Please try again.");
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 text-center">
      <h2 className="text-3xl font-bold mb-4 text-red-600">Payment Canceled</h2>
      <p className="text-lg">It looks like your payment was canceled. You can try again from your cart.</p>
    </div>
  );
};

export default PaymentCancel
