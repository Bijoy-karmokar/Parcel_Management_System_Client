import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MakeAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [searchEmail, setSearchEmail] = useState("");
  const [email, setEmail] = useState("");

  /* 🔍 Search user */
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["searched-user", email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/search?email=${email}`);
      return res.data;
    },
    retry: false,
  });

  /* 🔁 Role Update Mutation */
  const roleMutation = useMutation({
    mutationFn: async ({ id, role }) => {
      return axiosSecure.patch(`/users/role/${id}`, { role });
    },
    onSuccess: () => {
      Swal.fire("Success!", "User role updated", "success");
      queryClient.invalidateQueries(["searched-user", email]);
    },
    onError: () => {
      Swal.fire("Error!", "Failed to update role", "error");
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setEmail(searchEmail);
  };

  const handleRoleChange = (role) => {
    Swal.fire({
      title: "Are you sure?",
      text: `This user will be ${role === "admin" ? "an Admin" : "a User"}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        roleMutation.mutate({ id: user._id, role });
      }
    });
  };

  return (
    <div className="min-w-4xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Admin Control</h2>

      {/* 🔍 Search */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          type="email"
          placeholder="Enter user email"
          className="input input-bordered w-full"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          required
        />
        <button className="btn btn-primary text-black">Search</button>
      </form>

      {/* ⏳ Loading */}
      {isLoading && <p className="text-center">Searching...</p>}

      {/* ❌ Error */}
      {isError && (
        <p className="text-red-500 text-center">
          {error?.response?.data?.message || "User not found"}
        </p>
      )}

      {/* 👤 User Card */}
      {user && (
        <div className="border rounded-lg p-4 space-y-2">
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Joined:</strong>{" "}
            {new Date(user.created_at).toDateString()}
          </p>
          <p>
            <strong>Role:</strong>{" "}
            <span
              className={`badge ${
                user.role === "admin"
                  ? "badge-success"
                  : "badge-secondary"
              }`}
            >
              {user.role || "user"}
            </span>
          </p>

          {/* 🔘 Action Buttons */}
          {user.role === "admin" ? (
            <button
              onClick={() => handleRoleChange("user")}
              className="btn btn-error w-full mt-3"
              disabled={roleMutation.isLoading}
            >
              Remove Admin
            </button>
          ) : (
            <button
              onClick={() => handleRoleChange("admin")}
              className="btn btn-success w-full mt-3"
              disabled={roleMutation.isLoading}
            >
              Make Admin
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MakeAdmin;
