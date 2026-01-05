import { useState } from "react";
import Swal from "sweetalert2";
import { useQuery} from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PendingRiders = () => {
  const axiosSecure = useAxiosSecure();
  

  // Modal state
  const [selectedRider, setSelectedRider] = useState(null);
  const [actionType, setActionType] = useState("");

  // Fetch pending riders
  const { data: riders = [], isLoading } = useQuery({
    queryKey: ["pendingRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/pending");
      return res.data;
    },
    refetchInterval: 5000, // optional: auto-refetch every 5s
  });

  // Update rider status
  const handleStatusUpdate = async () => {
  if (!selectedRider) return;

  try {
    console.log("URL",`/riders/${selectedRider._id}`);
    
  await axiosSecure.patch(`/riders/${selectedRider._id}`, { status: actionType });

    Swal.fire({
      icon: "success",
      title: `Rider ${actionType}`,
      timer: 1200,
      showConfirmButton: false,
    });

    setSelectedRider(null); 
  } catch (err) {
    console.log(err);
    Swal.fire("Error", "Failed to update rider", "error");
  }
};


  if (isLoading) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Pending Rider Applications
      </h2>

      {/* Table */}
      <div className="overflow-x-auto bg-base-100 shadow rounded-lg">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Region</th>
              <th>District</th>
              <th>Bike</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, index) => (
              <tr key={rider._id}>
                <td>{index + 1}</td>
                <td>{rider.name}</td>
                <td>{rider.phone}</td>
                <td>{rider.region}</td>
                <td>{rider.district}</td>
                <td>
                  {rider.bikeModel} ({rider.bikeYear})
                </td>
                <td>
                  <span className="badge badge-warning">{rider.status}</span>
                </td>
                <td className="text-center space-x-2">
                  <label
                    htmlFor="rider-modal"
                    className="btn btn-xs btn-success"
                    onClick={() => {
                      setSelectedRider(rider);
                      setActionType("active");
                    }}
                  >
                    Approve
                  </label>
                  <label
                    htmlFor="rider-modal"
                    className="btn btn-xs btn-error"
                    onClick={() => {
                      setSelectedRider(rider);
                      setActionType("rejected");
                    }}
                  >
                    Reject
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {riders.length === 0 && (
          <p className="text-center py-6 text-gray-500">
            No pending riders found
          </p>
        )}
      </div>

      {/* ================= Modal ================= */}
      <input type="checkbox" id="rider-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="rider-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => setSelectedRider(null)}
          >
            ✕
          </label>

          {selectedRider && (
            <>
              <h3 className="text-lg font-bold mb-4">
                {actionType === "active" ? "Approve" : "Reject"} Rider
              </h3>
              <p>
                <strong>Name:</strong> {selectedRider.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedRider.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedRider.phone}
              </p>
              <p>
                <strong>Region:</strong> {selectedRider.region}
              </p>
              <p>
                <strong>District:</strong> {selectedRider.district}
              </p>
              <p>
                <strong>Bike:</strong> {selectedRider.bikeModel} (
                {selectedRider.bikeYear})
              </p>

              <div className="modal-action">
                <button
                  className={`btn ${
                    actionType === "active" ? "btn-success" : "btn-error"
                  }`}
                  onClick={handleStatusUpdate}
                >
                  Confirm {actionType === "active" ? "Approve" : "Reject"}
                </button>
                <label
                  htmlFor="rider-modal"
                  className="btn btn-outline"
                  onClick={() => setSelectedRider(null)}
                >
                  Cancel
                </label>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PendingRiders;
