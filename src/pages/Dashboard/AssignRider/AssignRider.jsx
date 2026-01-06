import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AssignRider = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [district, setDistrict] = useState("");
  const [riders, setRiders] = useState([]);
  const [ridersLoading, setRidersLoading] = useState(false);

  // ✅ Load assignable parcels
  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["assignableParcels"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcels?payment_status=paid&delivery_status=not_collected"
      );
      return res.data;
    },
  });

  // ✅ Open modal & load riders by district
  const openAssignModal = async (parcel) => {
    setSelectedParcel(parcel);
    setDistrict(parcel.senderAddress); // matching district
    setRiders([]);
    setRidersLoading(true);

    try {
      const res = await axiosSecure.get("/riders/available", {
        params: {
          district: parcel.senderAddress,
        },
      });
      setRiders(res.data);
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Failed to load riders", "error");
    } finally {
      setRidersLoading(false);
      // open modal after data fetch
      document.getElementById("assignRiderModal").showModal();
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
      <h2 className="text-2xl font-bold mb-6">Assign Rider to Parcels</h2>

      {/* ================= TABLE ================= */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Phone</th>
              <th>District</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <td>{index + 1}</td>
                <td>{parcel.senderName}</td>
                <td>{parcel.receiverName}</td>
                <td>{parcel.receiverContact}</td>
                <td>{parcel.senderAddress}</td>
                <td>৳{parcel.cost}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => openAssignModal(parcel)}
                  >
                    Assign Rider
                  </button>
                </td>
              </tr>
            ))}

            {parcels.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-6">
                  No parcels available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ================= MODAL ================= */}
      <dialog id="assignRiderModal" className="modal">
        <div className="modal-box max-w-3xl">
          <h3 className="font-bold text-lg mb-4">
            Assign Rider (District: {district})
          </h3>

          {ridersLoading ? (
            <div className="text-center">
              <span className="loading loading-spinner"></span>
            </div>
          ) : riders.length === 0 ? (
            <p className="text-center text-red-500">
              No riders available in this district
            </p>
          ) : (
            <table className="table table-sm w-full">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {riders.map((rider) => (
                  <tr key={rider._id}>
                    <td>{rider.name}</td>
                    <td>{rider.email}</td>
                    <td>{rider.phone}</td>
                    <td>
                      <button
                        className="btn btn-xs btn-success"
                        onClick={async () => {
                          try {
                            await axiosSecure.patch(
                              `/parcels/assign-rider/${selectedParcel._id}`,
                              {
                                riderId: rider._id,
                              }
                            );
                            Swal.fire(
                              "Success",
                              `Rider ${rider.name} assigned!`,
                              "success"
                            );
                            document.getElementById("assignRiderModal").close();
                          } catch (error) {
                            console.error(error);
                            Swal.fire(
                              "Error",
                              "Failed to assign rider",
                              "error"
                            );
                          }
                        }}
                      >
                        Assign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignRider;
