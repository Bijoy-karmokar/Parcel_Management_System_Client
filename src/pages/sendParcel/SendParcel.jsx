import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { calculateCost } from "../../utils/CalculateCost";
import { useLoaderData } from "react-router";
import useAuth from './../../hooks/useAuth';

// Utility function to generate a simple transactionId
const generateTransactionId = () => {
  return 'TXN-' + Math.random().toString(36).substr(2, 9).toUpperCase();
};

const SendParcel = () => {
  const warehouses = useLoaderData() || []; 
  const { user } = useAuth();
  
  const {
    register,
    handleSubmit,
    watch,
    reset,
  } = useForm();

  const parcelType = watch("type");

  // Unique regions
  const regions = [...new Set(warehouses.map(w => w.region))];

  const [senderDistricts, setSenderDistricts] = useState([]);
  const [receiverDistricts, setReceiverDistricts] = useState([]);

  // Handle region change
  const handleSenderRegion = (region) => {
    const districts = warehouses
      .filter(w => w.region === region)
      .map(w => w.district);
    setSenderDistricts(districts);
  };

  const handleReceiverRegion = (region) => {
    const districts = warehouses
      .filter(w => w.region === region)
      .map(w => w.district);
    setReceiverDistricts(districts);
  };

  // Submit
  const onSubmit = async (data) => {
    const cost = calculateCost({
      type: data.type,
      weight: data.weight,
      senderCenter: data.senderDistrict,
      receiverCenter: data.receiverDistrict,
    });

    const transactionId = generateTransactionId(); // generate transaction ID

    const previewHtml = `
      <div style="text-align:left">
        <h4>📦 Parcel Info</h4>
        <p><b>Type:</b> ${data.type}</p>
        <p><b>Title:</b> ${data.title}</p>
        <p><b>Weight:</b> ${data.weight || "N/A"}</p>
        <hr/>
        <h4>🚚 Sender Info</h4>
        <p><b>Name:</b> ${data.senderName}</p>
        <p><b>Contact:</b> ${data.senderContact}</p>
        <p><b>Region:</b> ${data.senderRegion}</p>
        <p><b>Service Center:</b> ${data.senderDistrict}</p>
        <p><b>Address:</b> ${data.senderAddress}</p>
        <p><b>Instruction:</b> ${data.pickupInstruction}</p>
        <hr/>
        <h4>📍 Receiver Info</h4>
        <p><b>Name:</b> ${data.receiverName}</p>
        <p><b>Contact:</b> ${data.receiverContact}</p>
        <p><b>Region:</b> ${data.receiverRegion}</p>
        <p><b>Service Center:</b> ${data.receiverDistrict}</p>
        <p><b>Address:</b> ${data.receiverAddress}</p>
        <p><b>Instruction:</b> ${data.deliveryInstruction}</p>
        <hr/>
        <h4>💰 Transaction ID: ${transactionId}</h4>
        <h3>Total Cost: ৳${cost}</h3>
      </div>
    `;

    const result = await Swal.fire({
      title: "Confirm Parcel",
      html: previewHtml,
      showCancelButton: true,
      confirmButtonText: "Confirm",
      width: 700,
    });

    if (result.isConfirmed) {
      const finalData = {
        ...data,
        created_by: user.email,
        payment_status: "unpaid",
        delivery_status: "not_collected",
        transactionId, // add transactionId
        cost,
        creation_date: new Date().toISOString(),
      };

      await fetch("http://localhost:5000/parcels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });

      Swal.fire("Success!", "Parcel submitted successfully!", "success");
      reset();
    }
  };

  return (
    <section className="py-16 bg-base-200">
      <div className="max-w-6xl mx-auto bg-base-100 p-8 rounded shadow">
        <h2 className="text-3xl font-bold text-center">Send Parcel</h2>
        <p className="text-center mb-10">Door to Door Delivery System</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          {/* ================= PARCEL INFO ================= */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Parcel Info</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <select {...register("type", { required: true })} className="select select-bordered">
                <option value="">Parcel Type</option>
                <option value="document">Document</option>
                <option value="non-document">Non Document</option>
              </select>
              <input {...register("title", { required: true })} placeholder="Parcel Title" className="input input-bordered" />
              {parcelType === "non-document" && (
                <input type="number" {...register("weight")} placeholder="Weight (kg)" className="input input-bordered" />
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ================= SENDER INFO ================= */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Sender Info</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <input defaultValue="John Doe" {...register("senderName", { required: true })} className="input input-bordered" />
                <input {...register("senderContact", { required: true })} placeholder="Contact" className="input input-bordered" />
                <select {...register("senderRegion", { required: true })} onChange={(e) => handleSenderRegion(e.target.value)} className="select select-bordered">
                  <option value="">Select Region</option>
                  {regions.map(r => <option key={r}>{r}</option>)}
                </select>
                <select {...register("senderDistrict", { required: true })} className="select select-bordered">
                  <option value="">Service Center</option>
                  {senderDistricts.map(d => <option key={d}>{d}</option>)}
                </select>
                <input {...register("senderAddress", { required: true })} placeholder="Address" className="input input-bordered" />
                <input {...register("pickupInstruction", { required: true })} placeholder="Pickup Instruction" className="input input-bordered" />
              </div>
            </div>

            {/* ================= RECEIVER INFO ================= */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Receiver Info</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <input {...register("receiverName", { required: true })} placeholder="Name" className="input input-bordered" />
                <input {...register("receiverContact", { required: true })} placeholder="Contact" className="input input-bordered" />
                <select {...register("receiverRegion", { required: true })} onChange={(e) => handleReceiverRegion(e.target.value)} className="select select-bordered">
                  <option value="">Select Region</option>
                  {regions.map(r => <option key={r}>{r}</option>)}
                </select>
                <select {...register("receiverDistrict", { required: true })} className="select select-bordered">
                  <option value="">Service Center</option>
                  {receiverDistricts.map(d => <option key={d}>{d}</option>)}
                </select>
                <input {...register("receiverAddress", { required: true })} placeholder="Address" className="input input-bordered" />
                <input {...register("deliveryInstruction", { required: true })} placeholder="Delivery Instruction" className="input input-bordered" />
              </div>
            </div>
          </div>

          <button className="btn btn-primary w-full">Submit Parcel</button>
        </form>
      </div>
    </section>
  );
};

export default SendParcel;
