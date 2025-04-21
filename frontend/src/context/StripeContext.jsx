import React, { createContext, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const StripeContext = createContext(null);

export const StripeProvider = ({ children }) => {
  return (
    <StripeContext.Provider value={stripePromise}>
      {children}
    </StripeContext.Provider>
  );
};

export const useStripeContext = () => {
  return useContext(StripeContext);
};
