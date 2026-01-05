import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const BeARider = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const warehouses = useLoaderData() || [];

  const [selectedRegion, setSelectedRegion] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // UNIQUE REGION LIST
  const regions = [...new Set(warehouses.map((w) => w.region))];

  // FILTER DISTRICTS BY REGION (UNIQUE)
  const districts = [
    ...new Set(
      warehouses
        .filter((w) => w.region === selectedRegion)
        .map((w) => w.district)
    ),
  ];

  const onSubmit = (data) => {
    const riderApplication = {
      ...data,
      name: user?.displayName,
      email: user?.email,
      status: "pending",
      appliedAt: new Date(),
    };

    axiosSecure
      .post("/riders", riderApplication)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
          icon: "success",
          title: "Application Submitted",
          text: "Your rider request is under review",
          timer: 1500,
          showConfirmButton: false,
        });
        reset();
        }
      })
      .catch((error) => {
        console.log(error.message);
         Swal.fire("Error", "Something went wrong!", "error");
      });

    console.log("Rider Application:", riderApplication);
    reset();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-6">
            Apply as a Rider
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            {/* NAME */}
            <div className="form-control">
              <label className="label font-semibold">Name</label>
              <input
                type="text"
                value={user?.displayName || ""}
                readOnly
                className="input input-bordered bg-gray-100"
              />
            </div>

            {/* EMAIL */}
            <div className="form-control">
              <label className="label font-semibold">Email</label>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="input input-bordered bg-gray-100"
              />
            </div>

            {/* PHONE */}
            <div className="form-control">
              <label className="label font-semibold">Phone Number</label>
              <input
                type="tel"
                placeholder="01XXXXXXXXX"
                className="input input-bordered"
                {...register("phone", { required: "Phone is required" })}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
            </div>

            {/* NID */}
            <div className="form-control">
              <label className="label font-semibold">NID Number</label>
              <input
                type="text"
                className="input input-bordered"
                {...register("nid", { required: "NID is required" })}
              />
            </div>

            {/* DRIVING LICENSE */}
            <div className="form-control">
              <label className="label font-semibold">
                Driving License Number
              </label>
              <input
                type="text"
                className="input input-bordered"
                {...register("license", { required: "License is required" })}
              />
            </div>

            {/* REGION */}
            <div className="form-control">
              <label className="label font-semibold">Region</label>
              <select
                className="select select-bordered"
                {...register("region", { required: true })}
                onChange={(e) => setSelectedRegion(e.target.value)}
              >
                <option value="">Select Region</option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>

            {/* DISTRICT */}
            <div className="form-control">
              <label className="label font-semibold">District</label>
              <select
                className="select select-bordered"
                {...register("district", { required: true })}
                disabled={!selectedRegion}
              >
                <option value="">Select District</option>
                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>

            {/* BIKE INFO */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="form-control">
                <label className="label font-semibold">
                  Bike Registration No
                </label>
                <input
                  className="input input-bordered"
                  {...register("bikeReg", { required: true })}
                />
              </div>

              <div className="form-control">
                <label className="label font-semibold">
                  Bike Brand & Model
                </label>
                <input
                  className="input input-bordered"
                  {...register("bikeModel", { required: true })}
                />
              </div>

              <div className="form-control">
                <label className="label font-semibold">Bike Year</label>
                <input
                  type="number"
                  className="input input-bordered"
                  {...register("bikeYear", {
                    required: true,
                    min: 2000,
                  })}
                />
              </div>
            </div>

            {/* ABOUT */}
            <div className="form-control">
              <label className="label font-semibold">
                Tell us about yourself
              </label>
              <textarea
                className="textarea textarea-bordered"
                {...register("about", { required: true })}
              ></textarea>
            </div>

            {/* SUBMIT */}
            <div className="form-control mt-4">
              <button className="btn btn-primary w-full">
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BeARider;
