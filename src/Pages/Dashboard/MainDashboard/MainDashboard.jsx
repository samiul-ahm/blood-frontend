import AdminDashboard from "../../../components/AdminDashboard/AdminDashboard";
import DonorDashboard from "../../../components/DonarDashboard/DonarDashboard";
import useUserRole from "../../../hooks/useUserRole";

const MainDashboard = () => {
  const { role, roleLoading } = useUserRole();

  if (roleLoading) {
    return <p className="text-center mt-10">Loading dashboard...</p>;
  }

  if (role === "donar") {
    return <DonorDashboard />;
  }

  if (role === "admin" || role === "volunteer") {
    return <AdminDashboard />;
  }

  return <p>Unauthorized</p>;
};

export default MainDashboard;
