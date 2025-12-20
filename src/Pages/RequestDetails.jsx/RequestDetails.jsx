import { useParams } from "react-router";
import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";

const RequestDetails = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    axiosInstance
      .get(`/requests/${id}`)
      .then((res) => setRequest(res.data))
      .finally(() => setLoading(false));
  }, [id, axiosInstance]);

  const handleDonate = () => {
    setUpdating(true);
    axiosInstance
      .patch(`/requests/${id}/status`, { status: "in progress" })
      .then(() => {
        setRequest((prev) => ({ ...prev, donation_status: "in progress" }));
      })
      .finally(() => setUpdating(false));
  };

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!request) {
    return <p className="text-center mt-10">Request not found</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="card bg-base-100 shadow-lg border">
        <div className="card-body w-3xl">
          <h2 className="card-title text-red-600 text-2xl">
            Blood Group: {request.bloodGroup}
          </h2>

          <div className="flex justify-between">
            <div>
              <p>
                <strong>Patient Name:</strong> {request.recipient_name}
              </p>
              <p>
                <strong>District:</strong> {request.recipient_district}
              </p>
              <p>
                <strong>Upazila:</strong> {request.recipient_upazilla}
              </p>
            </div>
            <div>
              <p>
                <strong>Hospital:</strong> {request.hospital}
              </p>
              <p>
                <strong>Required Date:</strong> {request.required_date}
              </p>

              <p className="mt-4">
                <strong>Status: {}</strong> {request.donation_status}
              </p>
            </div>
          </div>
          <button
            className="text-white btn bg-red-600 w-32 mx-auto mt-4"
            onClick={handleDonate}
            disabled={updating || request.donation_status === "in progress"}
          >
            {request.donation_status === "in progress"
              ? "In Progress"
              : updating
              ? "Updating..."
              : "Donate"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestDetails;
