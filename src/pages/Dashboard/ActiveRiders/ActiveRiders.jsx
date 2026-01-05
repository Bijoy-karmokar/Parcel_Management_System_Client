import { useState } from "react";
import Swal from "sweetalert2";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ActiveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [searchTerm, setSearchTerm] = useState("");

  // Fetch active riders
  const { data: riders = [], isLoading } = useQuery({
    queryKey: ["activeRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/active");
      return res.data;
    },
    refetchOnWindowFocus: false,
  });

  // Deactivate rider
  const handleDeactivate = async (rider) => {
    try {
      if (!rider._id) throw new Error("Rider ID missing");

      // Update status to "pending"
      await axiosSecure.patch(`/riders/${rider._id}`, { status: "pending" });

      Swal.fire({
        icon: "success",
        title: "Rider deactivated",
        timer: 1200,
        showConfirmButton: false,
      });

      // Update local cache immediately to remove rider from UI
     queryClient.setQueryData(["activeRiders"], (oldData = []) =>
  oldData.filter((r) => r._id !== rider._id)
);


    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to deactivate rider", "error");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // Filter riders based on search term
  const filteredRiders = riders.filter((rider) =>
    [rider.name, rider.email, rider.phone]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Active Riders</h2>

      {/* Search input */}
      <div className="mb-4 text-center">
        <input
          type="text"
          placeholder="Search by name, email or phone..."
          className="input input-bordered w-full md:w-1/2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-base-100 shadow rounded-lg">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Region</th>
              <th>District</th>
              <th>Bike</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRiders.map((rider, index) => (
              <tr key={rider._id}>
                <td>{index + 1}</td>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.phone}</td>
                <td>{rider.region}</td>
                <td>{rider.district}</td>
                <td>
                  {rider.bikeModel} ({rider.bikeYear})
                </td>
                <td>
                  <span className="badge badge-success">{rider.status}</span>
                </td>
                <td className="text-center">
                  <button
                    className="btn btn-xs btn-warning"
                    onClick={() => handleDeactivate(rider)}
                  >
                    Deactivate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredRiders.length === 0 && (
          <p className="text-center py-6 text-gray-500">
            No active riders found
          </p>
        )}
      </div>
    </div>
  );
};

export default ActiveRiders;
