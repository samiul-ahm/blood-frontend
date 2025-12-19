import React, { useEffect, useState } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axiosSecure.get("/users").then((res) => {
      setUsers(res.data);
    });
  }, [axiosSecure]);

  console.log(users);

  //   const handleStatus = (email, status) => {
  //     axiosSecure.patch(`/update/user/status?email=${email}&status=${status}`)
  //     .then(res=>{
  //         console.log(res.data);
  //     })
  //   };

  const handleStatus = (email, status) => {
    axiosSecure
      .patch(`/update/user/status?email=${email}&status=${status}`)
      .then(() => {
        setUsers((prev) =>
          prev.map((user) =>
            user.email === email ? { ...user, status } : user
          )
        );
      });
  };

  return (
    <div>
      <h2 className="text-lg text-center mb-5">All Users</h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>User Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="space-y-2">
            {/* row 1 */}
            {users?.map((user, index) => (
              <tr key={index} className="shadow-sm">
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user?.mainPhotoUrl}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user?.name}</div>
                      <div className="text-sm opacity-50">{user?.email}</div>
                    </div>
                  </div>
                </td>
                <td>{user?.role}</td>
                <td>{user?.status}</td>
                <th className="flex gap-2">
                  {user?.status == "active" ? (
                    <button
                      onClick={() => handleStatus(user?.email, "blocked")}
                      className="btn btn-error btn-xs"
                    >
                      Block
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStatus(user?.email, "active")}
                      className="btn btn-success btn-xs"
                    >
                      Active
                    </button>
                  )}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
