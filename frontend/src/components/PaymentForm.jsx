import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

export default function PaymentForm({ amount, onClose }) {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const res = await axios.post(
          "http://localhost:3000/api/payment/create-payment-intent",
          { amount: amount * 100 }
        );
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        setError("Failed to initialize payment.");
      }
    };
    createPaymentIntent();
  }, [amount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      console.log(result.error.message);
      setError(result.error.message);
    } else if (result.paymentIntent.status === "succeeded") {
      console.log("5");
      alert("Payment successful!");
      onClose();
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="p-3 border rounded-md" />
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        {loading ? "Processing..." : "Pay"}
      </button>
    </form>
  );
}
