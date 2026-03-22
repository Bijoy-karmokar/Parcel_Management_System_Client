import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: payments = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !loading && !!user?.email, 
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
  });

  if (loading || isLoading) {
    return <p className="text-center py-6">Loading payments...</p>;
  }

  if (isError) {
    return (
      <p className="text-red-500 text-center">
        Failed to load payments.
      </p>
    );
  }

  if (payments.length === 0) {
    return <p className="text-center py-6">No payments found.</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Payment History</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Parcel ID</th>
              <th>Amount</th>
              <th>Transaction</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((p, i) => (
              <tr key={p._id}>
                <td>{i + 1}</td>
                <td>{p.parcelId}</td>
                <td>৳{p.amount}</td>
                <td>{p.transactionId}</td>
                <td>{new Date(p.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default PaymentHistory;
