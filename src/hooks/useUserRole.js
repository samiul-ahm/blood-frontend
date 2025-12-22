import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useUserRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [role, setRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get(`/users/role/${user.email}`)
      .then(res => {
        setRole(res.data.role);
      })
      .finally(() => setRoleLoading(false));
  }, [user, axiosSecure]);

  return { role, roleLoading };
};

export default useUserRole;
