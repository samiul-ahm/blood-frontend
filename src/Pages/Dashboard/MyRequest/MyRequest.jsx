import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyRequest = () => {
  const [itemsPerPage, setIemsPerPage] = useState(10);
  const [myRequest, setMyRequest] = useState([]);
  const [totalRequest, setTotalRequest] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get(`/my-request?page=${currentPage - 1}&size=${itemsPerPage}`)
      .then((res) => {
        setMyRequest(res.data.request);
        setTotalRequest(res.data.totalRequest);
      });
  }, [axiosSecure, currentPage, itemsPerPage]);

  const numberOfPages = Math.ceil(totalRequest / itemsPerPage);

  //   console.log(myRequest, totalRequest);
  //   console.log(numberOfPages);

  const pages = [...Array(numberOfPages).keys()].map((e) => e + 1);
  //   console.log(pages);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNext = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold text-center mb-8">My request</h2>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Hospital</th>
              <th>Blood Group</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {myRequest.map((request, index) => (
              <tr key={index}>
                <th>{(currentPage - 1) * itemsPerPage + index + 1}</th>
                <td>{request.requester_name}</td>
                <td>{request.hospital}</td>
                <td>{request.bloodGroup}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex gap-2 my-10 justify-center">
        <button onClick={handlePrev} className="join-item btn btn-outline">
          Previous
        </button>

        {pages.map((page) => (
          <button
            className={`btn ${
              page === currentPage ? "bg-[#435585] text-white" : ""
            }`}
            onClick={() => {
              setCurrentPage(page);
            }}
          >
            {page}
          </button>
        ))}
        <button onClick={handleNext} className="join-item btn btn-outline">
          Next
        </button>
      </div>
    </div>
  );
};

export default MyRequest;
