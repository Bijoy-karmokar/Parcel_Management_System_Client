import React, { useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const TrackParcel = () => {
  const { parcelId: paramId } = useParams();
  const axiosSecure = useAxiosSecure();
  const [trackId, setTrackId] = useState(paramId || "");

  const { data: trackingInfo, refetch, isLoading, isError } = useQuery({
    queryKey: ["tracking", trackId],
    enabled: !!trackId,
    queryFn: async () => {
      const res = await axiosSecure.get(`/tracking/${trackId}`);
      return res.data;
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (trackId) {
      refetch();
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Track Your Parcel</h2>

      <form className="mb-6" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter Track ID"
          value={trackId}
          onChange={(e) => setTrackId(e.target.value)}
          className="input input-bordered mr-2"
        />
        <button type="submit" className="btn btn-primary">
          Track
        </button>
      </form>

      {isLoading && <p>Loading tracking info...</p>}
      {isError && <p className="text-red-500">Failed to fetch tracking info.</p>}

      {trackingInfo && trackingInfo.updates?.length > 0 && (
        <div className="space-y-2">
          {trackingInfo.updates
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map((update, idx) => (
              <div
                key={idx}
                className="p-4 border rounded shadow-sm flex justify-between"
              >
                <div>
                  <p className="font-semibold">{update.status}</p>
                  <p className="text-sm text-gray-500">{update.location}</p>
                </div>
                <div className="text-gray-400 text-sm">
                  {new Date(update.date).toLocaleString()}
                </div>
              </div>
            ))}
        </div>
      )}

      {trackingInfo && trackingInfo.updates?.length === 0 && (
        <p>No updates yet for this parcel.</p>
      )}
    </div>
  );
};

export default TrackParcel;
