import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      toast.success("Payment successful! Your order has been placed.");
    }
  }, [sessionId]);

  return (
    <div className="max-w-2xl mx-auto p-6 text-center">
      <h2 className="text-3xl font-bold mb-4 text-green-600">Payment Successful</h2>
      <p className="text-lg">Thank you for your purchase! You will receive an order confirmation soon.</p>
    </div>
  );
};

export default PaymentSuccess
