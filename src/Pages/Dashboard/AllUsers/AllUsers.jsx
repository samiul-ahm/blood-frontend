// import React, { useEffect, useState } from "react";
// import { AuthContext } from "../../../provider/AuthProvider";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";

// const AllUsers = () => {
//   const axiosSecure = useAxiosSecure();
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     axiosSecure.get("/users").then((res) => {
//       setUsers(res.data);
//     });
//   }, [axiosSecure]);

//   console.log(users);

//   //   const handleStatus = (email, status) => {
//   //     axiosSecure.patch(`/update/user/status?email=${email}&status=${status}`)
//   //     .then(res=>{
//   //         console.log(res.data);
//   //     })
//   //   };

//   const handleStatus = (email, status) => {
//     axiosSecure
//       .patch(`/update/user/status?email=${email}&status=${status}`)
//       .then(() => {
//         setUsers((prev) =>
//           prev.map((user) =>
//             user.email === email ? { ...user, status } : user
//           )
//         );
//       });
//   };

//   return (
//     <div>
//       <h2 className="text-lg text-center mb-5">All Users</h2>
//       <div className="overflow-x-auto">
//         <table className="table">
//           {/* head */}
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Role</th>
//               <th>User Status</th>
//               <th></th>
//             </tr>
//           </thead>
//           <tbody className="space-y-2">
//             {/* row 1 */}
//             {users?.map((user, index) => (
//               <tr key={index} className="shadow-sm">
//                 <td>
//                   <div className="flex items-center gap-3">
//                     <div className="avatar">
//                       <div className="mask mask-squircle h-12 w-12">
//                         <img
//                           src={user?.mainPhotoUrl}
//                           alt="Avatar Tailwind CSS Component"
//                         />
//                       </div>
//                     </div>
//                     <div>
//                       <div className="font-bold">{user?.name}</div>
//                       <div className="text-sm opacity-50">{user?.email}</div>
//                     </div>
//                   </div>
//                 </td>
//                 <td>{user?.role}</td>
//                 <td>{user?.status}</td>
//                 <th className="flex gap-2">
//                   {user?.status == "active" ? (
//                     <button
//                       onClick={() => handleStatus(user?.email, "blocked")}
//                       className="btn btn-error btn-xs"
//                     >
//                       Block
//                     </button>
//                   ) : (
//                     <button
//                       onClick={() => handleStatus(user?.email, "active")}
//                       className="btn btn-success btn-xs"
//                     >
//                       Active
//                     </button>
//                   )}
//                 </th>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AllUsers;
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState(""); // For status filtering

  useEffect(() => {
    axiosSecure.get("/users").then((res) => {
      setUsers(res.data);
    });
  }, [axiosSecure]);

  // Handle Block/Unblock
  const handleStatus = (email, status) => {
    axiosSecure
      .patch(`/update/user/status?email=${email}&status=${status}`)
      .then(() => {
        setUsers((prev) =>
          prev.map((user) =>
            user.email === email ? { ...user, status } : user
          )
        );
        Swal.fire("Updated!", `User status is now ${status}`, "success");
      });
  };

  // NEW: Handle Role Change (Make Volunteer/Admin)
  const handleRole = (email, role) => {
    axiosSecure
      .patch(`/users/role/${email}`, { role }) // Match the backend route we'll create
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          setUsers((prev) =>
            prev.map((user) =>
              user.email === email ? { ...user, role } : user
            )
          );
          Swal.fire("Success!", `User is now a ${role}`, "success");
        }
      });
  };

  // Filter logic
  const filteredUsers = filter 
    ? users.filter(user => user.status === filter) 
    : users;

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold text-center mb-5">Manage All Users</h2>
      
      {/* Filtering UI */}
      <div className="flex justify-end mb-4">
        <select 
          className="select select-bordered select-sm"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="table">
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers?.map((user) => (
              <tr key={user._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-10 w-10">
                        <img src={user?.mainPhotoUrl} alt="Avatar" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user?.name}</div>
                      <div className="text-xs opacity-50">{user?.email}</div>
                    </div>
                  </div>
                </td>
                <td className="capitalize font-semibold">{user?.role}</td>
                <td>
                  <span className={`badge badge-sm ${user.status === 'active' ? 'badge-success' : 'badge-error text-white'}`}>
                    {user?.status}
                  </span>
                </td>
                <td className="flex flex-wrap gap-1">
                  {/* Block/Unblock */}
                  {user?.status === "active" ? (
                    <button onClick={() => handleStatus(user?.email, "blocked")} className="btn btn-error btn-xs text-white">Block</button>
                  ) : (
                    <button onClick={() => handleStatus(user?.email, "active")} className="btn btn-success btn-xs text-white">Unblock</button>
                  )}

                  {/* Role Management */}
                  {user?.role === "donar" && (
                    <button onClick={() => handleRole(user?.email, "volunteer")} className="btn btn-warning btn-xs">Make Volunteer</button>
                  )}
                  
                  {user?.role !== "admin" && (
                    <button onClick={() => handleRole(user?.email, "admin")} className="btn btn-primary btn-xs">Make Admin</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;