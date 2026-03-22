import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const PendingDeliveries = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // ✅ Load rider parcels
  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["riderParcels", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/rider/parcels?email=${user.email}`
      );
      return res.data;
    },
  });

  // ✅ Update parcel status
  const handleStatusUpdate = async (parcelId, status) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `Change parcel status to "${status}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axiosSecure.patch(`/parcels/${parcelId}/status`, {
        status,
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", "Status updated successfully", "success");
        refetch();
      }
    } catch (error) {
        console.log(error);
        
      Swal.fire("Error", "Failed to update status", "error");
    }
  };

  if (isLoading) {
    return (
      <div className="text-center mt-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Pending Deliveries</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Parcel</th>
              <th>Receiver</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <td>{index + 1}</td>
                <td>{parcel.title}</td>
                <td>{parcel.receiverName}</td>
                <td>{parcel.receiverContact}</td>
                <td>{parcel.receiverAddress}</td>
                <td>
                  <span className="badge badge-info">
                    {parcel.delivery_status}
                  </span>
                </td>
                <td>
                  {parcel.delivery_status === "rider_assigned" && (
                    <button
                      onClick={() =>
                        handleStatusUpdate(parcel._id, "in-transit")
                      }
                      className="btn btn-xs btn-primary"
                    >
                      Picked Up
                    </button>
                  )}

                  {parcel.delivery_status === "in-transit" && (
                    <button
                      onClick={() =>
                        handleStatusUpdate(parcel._id, "delivered")
                      }
                      className="btn btn-xs btn-success"
                    >
                      Delivered
                    </button>
                  )}
                </td>
              </tr>
            ))}

            {parcels.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-6">
                  No pending deliveries
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingDeliveries;
