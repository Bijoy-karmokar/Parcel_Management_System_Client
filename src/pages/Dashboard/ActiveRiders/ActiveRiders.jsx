import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ActiveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");

  // ✅ Fetch active riders
  const { data: riders = [], refetch, isLoading } = useQuery({
    queryKey: ["activeRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/active");
      return res.data;
    },
  });

  // ✅ Search filter
  const filteredRiders = riders.filter((rider) =>
    [rider.name, rider.email, rider.phone]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // ✅ Deactivate rider
  const handleDeactivate = async (id) => {
    const confirm = await Swal.fire({
      title: "Deactivate Rider?",
      text: "This rider will no longer receive deliveries",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Deactivate",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.patch(`/riders/${id}`, {
        status: "deactivated",
      });

      Swal.fire("Success", "Rider deactivated", "success");
      refetch();
    } catch (error) {
      Swal.fire("Error", "Failed to deactivate rider", "error");
    }
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Active Riders</h2>

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search by name, email or phone"
        className="input input-bordered w-full md:w-1/3 mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 📊 Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Region</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredRiders.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No active riders found
                </td>
              </tr>
            ) : (
              filteredRiders.map((rider, index) => (
                <tr key={rider._id}>
                  <td>{index + 1}</td>
                  <td>{rider.name}</td>
                  <td>{rider.email}</td>
                  <td>{rider.phone}</td>
                  <td>
                    {rider.region}, {rider.district}
                  </td>
                  <td>
                    <span className="badge badge-success">
                      Active
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeactivate(rider._id)}
                      className="btn btn-xs btn-error"
                    >
                      Deactivate
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveRiders;
