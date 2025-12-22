import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUserRole from "../../hooks/useUserRole";

const AllDonationRequests = () => {
  const [requests, setRequests] = useState([]);
  const axiosSecure = useAxiosSecure();
  const { role } = useUserRole();

  useEffect(() => {
    axiosSecure
      .get("/all-requests")
      .then((res) => setRequests(res.data.requests));
  }, [axiosSecure]);

  const handleStatusChange = async (id, newStatus) => {
    const res = await axiosSecure.patch(`/requests/${id}/status`, {
      status: newStatus,
    });
    if (res.data.message) {
      Swal.fire("Success", "Status updated", "success");
      // Refresh data
    }
  };

  return (
    <div className="p-6 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">All Blood Donation Requests</h2>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Recipient</th>
            <th>Location</th>
            <th>Date/Time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req._id}>
              <td>{req.recipient_name}</td>
              <td>
                {req.recipient_district}, {req.recipient_upazilla}
              </td>
              <td>
                {req.donation_date} at {req.donation_time}
              </td>
              <td>
                <select
                  className="select select-bordered select-sm"
                  defaultValue={req.donation_status}
                  onChange={(e) => handleStatusChange(req._id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="inprogress">In Progress</option>
                  <option value="done">Done</option>
                  <option value="canceled">Canceled</option>
                </select>
              </td>
              <td>
                {/* Only Admin can Delete/Edit */}
                {role === "admin" ? (
                  <div className="flex gap-2">
                    <button className="btn btn-xs btn-info">Edit</button>
                    <button className="btn btn-xs btn-error">Delete</button>
                  </div>
                ) : (
                  <span className="text-xs italic text-gray-400">
                    View Only
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllDonationRequests;
