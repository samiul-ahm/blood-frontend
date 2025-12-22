import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
// import { FaUsers, FaHandHoldingHeart, FaDonate } from "react-icons/fa";

const AdminDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalFunding: 0,
    totalRequests: 0,
  });

  useEffect(() => {
    axiosSecure.get("/admin-stats")
      .then(res => setStats(res.data))
      .catch(err => console.error("Error fetching stats:", err));
  }, [axiosSecure]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user?.displayName}! </h1>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Users */}
        <div className="bg-white shadow-lg rounded-xl p-6 flex items-center space-x-4 border-l-4 border-blue-500">
          <div className="p-3 bg-blue-100 rounded-full">
            {/* <FaUsers className="text-blue-500 text-2xl" /> */}
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Users</p>
            <h2 className="text-2xl font-bold">{stats.totalUsers}</h2>
          </div>
        </div>

        {/* Total Funding */}
        <div className="bg-white shadow-lg rounded-xl p-6 flex items-center space-x-4 border-l-4 border-green-500">
          <div className="p-3 bg-green-100 rounded-full">
            {/* <FaHandHoldingHeart className="text-green-500 text-2xl" /> */}
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Funding</p>
            <h2 className="text-2xl font-bold">${stats.totalFunding}</h2>
          </div>
        </div>

        {/* Total Requests */}
        <div className="bg-white shadow-lg rounded-xl p-6 flex items-center space-x-4 border-l-4 border-red-500">
          <div className="p-3 bg-red-100 rounded-full">
            {/* <FaDonate className="text-red-500 text-2xl" /> */}
          </div>
          <div>
            <p className="text-gray-500 text-sm">Donation Requests</p>
            <h2 className="text-2xl font-bold">{stats.totalRequests}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;