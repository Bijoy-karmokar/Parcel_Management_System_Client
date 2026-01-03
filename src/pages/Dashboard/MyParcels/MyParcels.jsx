import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const MyParcels = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data:parcels=[],isLoading,refetch} = useQuery({
        queryKey:["my-parcels",user.email],
        queryFn:async()=>{
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            return res.data;
        }
    })
    // console.log(parcels);

    const handleView = (parcel) => {
    Swal.fire({
      title: "Parcel Details",
      html: `
        <div style="text-align:left">
          <p><b>Title:</b> ${parcel.title}</p>
          <p><b>Type:</b> ${parcel.type}</p>
          <p><b>Weight:</b> ${parcel.weight || "N/A"}</p>
          <hr/>
          <p><b>Sender:</b> ${parcel.senderDistrict}</p>
          <p><b>Receiver:</b> ${parcel.receiverDistrict}</p>
          <p><b>Cost:</b> ৳${parcel.cost}</p>
          <p><b>Payment:</b> ${parcel.payment_status}</p>
          <p><b>Status:</b> ${parcel.delivery_status}</p>
        </div>
      `,
      width: 600,
    });
  };

  /* ---------- PAY ---------- */
  const handlePay = (parcel) => {
    Swal.fire({
      title: "Confirm Payment",
      text: `Pay ৳${parcel.cost} for "${parcel.title}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Pay Now",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/parcels/pay/${parcel._id}`)
          .then(() => {
            Swal.fire("Success", "Payment completed", "success");
          
          });
      }
    });
  };

  /* ---------- DELETE ---------- */
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This parcel will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
            // console.log(res.data);
            if(res.data.deletedCount){
                Swal.fire("Deleted!", "Parcel removed.", "success");
            }
        });
      }
      refetch();
    });
  };
    
    return (
        <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Parcels</h2>

      <div className="overflow-x-auto bg-base-100 rounded shadow">
        <table className="table table-zebra">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Type</th>
              <th>Cost</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <td>{index + 1}</td>

                <td>{parcel.title}</td>

                <td>
                  <span
                    className={`badge ${
                      parcel.type === "document"
                        ? "badge-info"
                        : "badge-secondary"
                    }`}
                  >
                    {parcel.type}
                  </span>
                </td>

                <td>৳{parcel.cost}</td>

                <td>
                  <span
                    className={`badge ${
                      parcel.payment_status === "paid"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {parcel.payment_status}
                  </span>
                </td>

                <td>
                  <span className="badge badge-outline">
                    {parcel.delivery_status}
                  </span>
                </td>

                <td className="space-x-2">
                  <button
                    className="btn btn-xs btn-info"
                    onClick={() => handleView(parcel)}
                  >
                    View
                  </button>

                  {parcel.payment_status === "unpaid" && (
                    <button
                      className="btn btn-xs btn-success"
                      onClick={() => handlePay(parcel)}
                    >
                      Pay
                    </button>
                  )}

                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => handleDelete(parcel._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {parcels.length === 0 && (
          <p className="text-center p-6 text-gray-500">
            No parcels found
          </p>
        )}
      </div>
    </div>
    );
};

export default MyParcels;