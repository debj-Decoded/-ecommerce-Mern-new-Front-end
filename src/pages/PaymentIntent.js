import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";
import "./Stripe.css";
import { currentOrder } from "../features/order/orderSlice";
import { useSelector } from "react-redux";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
// const stripePromise = loadStripe("pk_test_51Og7yBSBRLWCmKMo4eIwT9icodIFi88SmOzPTww2PJNpdILdkq0P329u8eDWcVYPtBQT8rP1yOXIBHxQrx7Z5D5H00Vd8DWR0U");
const stripePromise = loadStripe("pk_test_51Og7yBSBRLWCmKMo4eIwT9icodIFi88SmOzPTww2PJNpdILdkq0P329u8eDWcVYPtBQT8rP1yOXIBHxQrx7Z5D5H00Vd8DWR0U");

export default function PaymentIntent() {
  const [clientSecret, setClientSecret] = useState("");
    
  const currentorder = useSelector(currentOrder)
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:8080/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ totalAmount: currentorder.totalAmount }),
      // body: JSON.stringify({ items: currentorder.items }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="Stripe">
      {clientSecret && (
        <Elements   stripe={stripePromise} options={{ clientSecret }}>
          <CheckOutForm />
        </Elements>
      )}
    </div>
  );
}