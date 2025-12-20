import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";

const AllRequest = () => {
  const axiosInstance = useAxios();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);

  const limit = 6;
  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    setLoading(true);

    axiosInstance
      .get("/all-requests", {
        params: {
          page,
          limit,
        },
      })
      .then((res) => {
        setRequests(res.data.requests);
        setTotal(res.data.total);
      })
      .finally(() => setLoading(false));
  }, [page, axiosInstance]);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">
        All Blood Donation Requests
      </h2>

      {requests.length === 0 ? (
        <p className="text-center text-gray-500">No requests found</p>
      ) : (
        <>
          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((item) => (
              <div
                key={item._id}
                className="card bg-base-100 shadow-md border"
              >
                <div className="card-body">
                  <h2 className="card-title text-red-600">
                    Blood Group: {item.bloodGroup}
                  </h2>

                  <p>
                    <strong>Patient:</strong> {item.recipient_name}
                  </p>

                  <p>
                    <strong>District:</strong> {item.recipient_district}
                  </p>

                  <p>
                    <strong>Upazila:</strong> {item.recipient_upazilla}
                  </p>

                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(item.CreatedAt).toLocaleDateString()}
                  </p>

                  <p>
                    <strong>Hospital:</strong> {item.hospital}
                  </p>

                  <div className="card-actions justify-end">
                    <button className="btn btn-sm btn-primary">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              className="btn btn-outline btn-sm"
              disabled={page === 0}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </button>

            <span className="text-sm font-medium">
              Page {page + 1} of {totalPages}
            </span>

            <button
              className="btn btn-outline btn-sm"
              disabled={page === totalPages - 1}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AllRequest;
