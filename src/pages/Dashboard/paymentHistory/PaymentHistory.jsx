import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch user payments
  const { data: payments = [], isLoading, isError } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center py-6">Loading payments...</p>;
  if (isError) return <p className="text-red-500 text-center">Failed to load payments.</p>;
  if (payments.length === 0) return <p className="text-center py-6">No payments found.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Payment History</h2>
      <div className="overflow-x-auto bg-base-100 rounded shadow">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Parcel ID</th>
              <th>Amount (৳)</th>
              <th>Transaction ID</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id}>
                <td>{index + 1}</td>
                <td>{payment.parcelId}</td>
                <td>৳{payment.amount}</td>
                <td>{payment.transactionId}</td>
                <td>{new Date(payment.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
