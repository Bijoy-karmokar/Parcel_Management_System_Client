import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "./../../../hooks/useAuth";

const CheckoutForm = () => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [error, setError] = useState("");

  // Fetch parcel info
  const { data: parcelInfo, isLoading, isError } = useQuery({
    queryKey: ["parcel", parcelId],
    enabled: !!parcelId,
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  const amount = parcelInfo?.cost || 0;

  if (isLoading) return <span className="loading loading-bars loading-xl"></span>;
  if (isError || !parcelInfo?._id)
    return <p className="text-red-500 text-center">Parcel not found</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

   try {
    // 1️⃣ Create payment intent
    const { data } = await axiosSecure.post("/create-payment-intent", {
      amount,
      parcelId,
      userEmail: user.email,
    });
    const clientSecret = data.clientSecret;

    // 2️⃣ Confirm Stripe payment
    const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card, billing_details: { name: user.displayName, email: user.email } },
    });

    if (stripeError) {
      setError(stripeError.message);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      // 3️⃣ Save payment in DB
      await axiosSecure.post("/payments", {
        parcelId,
        userEmail: user.email,
        amount,
        transactionId: paymentIntent.id,
      });

      Swal.fire("Success!", "Payment completed successfully!", "success");
      navigate("/dashboard/myParcels")
    }
  } catch (err) {
    console.error(err);
    setError("Payment failed. Please try again.");
  }
  };

  return (
    <form
      className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto"
      onSubmit={handleSubmit}
    >
      <CardElement className="p-2 border rounded" />
      <button
        className="btn btn-primary text-black w-full"
        type="submit"
        disabled={!stripe}
      >
        Pay ৳{amount}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default CheckoutForm;
