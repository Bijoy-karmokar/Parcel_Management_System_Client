import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PendingRiders = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedRider, setSelectedRider] = useState(null);


  const {isLoading, data:riders=[],refetch}=useQuery({
     queryKey:['pending-riders'],
     queryFn: async()=>{
       const res = await axiosSecure.get("/riders/pending");
       return res.data;
     }
  })

  if(isLoading){
    return "loading...."
  }
  // Approve / Reject rider
  const updateStatus = async (id, status) => {
    try {
      await axiosSecure.patch(`/riders/${id}`, { status });

      // update UI instantly
      refetch();

      Swal.fire("Success!", `Rider ${status}`, "success");
    } catch (error) {
      Swal.fire("Error!", "Action failed", "error");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Pending Rider Applications
      </h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Region</th>
              <th>District</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {riders.map((rider) => (
              <tr key={rider._id}>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.phone}</td>
                <td>{rider.region}</td>
                <td>{rider.district}</td>
                <td>
                  <span
                    className={`badge ${
                      rider.status === "approved"
                        ? "badge-success"
                        : rider.status === "rejected"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {rider.status}
                  </span>
                </td>

                <td className="space-x-2">
                  <button
                    className="btn btn-xs btn-info"
                    onClick={() => setSelectedRider(rider)}
                  >
                    View
                  </button>

                  {rider.status === "pending" && (
                    <>
                      <button
                        className="btn btn-xs btn-success"
                        onClick={() =>
                          updateStatus(rider._id, "approved")
                        }
                      >
                        Approve
                      </button>

                      <button
                        className="btn btn-xs btn-error"
                        onClick={() =>
                          updateStatus(rider._id, "rejected")
                        }
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Rider Details Modal */}
      {selectedRider && (
        <dialog open className="modal">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-lg mb-3">
              Rider Information
            </h3>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <p><b>Name:</b> {selectedRider.name}</p>
              <p><b>Email:</b> {selectedRider.email}</p>
              <p><b>Phone:</b> {selectedRider.phone}</p>
              <p><b>Region:</b> {selectedRider.region}</p>
              <p><b>District:</b> {selectedRider.district}</p>
              <p><b>NID:</b> {selectedRider.nid}</p>
              <p><b>License:</b> {selectedRider.drivingLicense}</p>
              <p><b>Bike Reg:</b> {selectedRider.bikeRegNo}</p>
              <p><b>Bike Model:</b> {selectedRider.bikeModel}</p>
              <p><b>Bike Year:</b> {selectedRider.bikeYear}</p>
              <p className="col-span-2">
                <b>About:</b> {selectedRider.about}
              </p>
            </div>

            <div className="modal-action">
              <button
                className="btn"
                onClick={() => setSelectedRider(null)}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default PendingRiders;
