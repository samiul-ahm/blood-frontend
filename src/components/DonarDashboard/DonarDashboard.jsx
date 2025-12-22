import { Link } from "react-router";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const DonorDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axiosSecure
      .get("/my-request?size=3&page=0")
      .then(res => setRequests(res.data.request));
  }, [axiosSecure]);

  return (
    <div>
      <h2 className="text-2xl font-bold  text-center mb-10">
        Welcome, {user?.displayName}
      </h2>

      {requests.length > 0 && (
        <>
          <h3 className="text-xl font-semibold mb-3">
            My Recent Donation Requests
          </h3>

          <table className="table w-full">
            <thead>
              <tr>
                <th>Recipient</th>
                <th>Location</th>
                <th>Date</th>
                <th>Blood</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {requests.map((req,index) => (
                <tr key={index}>
                  <td>{req.recipient_name}</td>
                  <td>
                    {req.recipient_district}, {req.recipient_upazilla}
                  </td>
                  <td>{req.createdAt}</td>
                  <td>{req.bloodGroup}</td>
                  <td>{req.donation_status}</td>
                  <td className="space-x-2">
                    <Link to={`/request/${req._id}`} className="btn btn-xs btn-neutral">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Link to="/dashboard/my-request" className="btn mt-4 mx-auto btn-neutral">
            View My All Requests
          </Link>
        </>
      )}
    </div>
  );
};

export default DonorDashboard;
