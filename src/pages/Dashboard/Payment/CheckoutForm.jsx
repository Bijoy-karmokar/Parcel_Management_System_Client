import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();
  console.log(parcelId);

  const [error, setError] = useState(" ");

  const {
    data: parcelInfo,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['parcels', parcelId],
    enabled: !!parcelId,
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  console.log(parcelInfo);
  console.log(parcelId);

  const amount = parcelInfo?.cost || 0;

  if (isPending) {
    return <span className="loading loading-bars loading-xl"></span>;
  }
  if (isError || !parcelInfo?._id) {
  return <p className="text-red-500 text-center">Parcel not found</p>;
}
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      console.log("paymentMethod", paymentMethod);
    }
  };
  return (
    <form
      className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto"
      onSubmit={handleSubmit}
    >
      <CardElement className="p-2 border rounded"></CardElement>
      <button className="btn btn-primary text-black w-full" type="submit" disabled={!stripe}>
        Pay ${amount}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default CheckoutForm;
