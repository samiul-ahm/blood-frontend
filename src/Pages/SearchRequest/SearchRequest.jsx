import axios from "axios";
import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { useNavigate } from "react-router";

const SearchRequest = () => {
  const [upazillas, setUpazillas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const navigate = useNavigate(); 

  const [district, setDistrict] = useState("");
  const [upazilla, setUpazilla] = useState("");
  const [search, setSearch] = useState([]);
  const axiosInstance = useAxios();

  useEffect(() => {
    axios.get("./upazilla.json").then((res) => {
      setUpazillas(res.data.upazilas);
    });
    axios.get("./district.json").then((res) => {
      setDistricts(res.data.districts);
    });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const bloodGroup = e.target.bloodGroup.value;
    console.log(bloodGroup);
    // axiosInstance.get(`/search-requests?bloodGroup=${bloodGroup}&district=${district}&upazilla=${upazilla}`)
    // .then(res=>{
    //     console.log(res.data);
    // })
    axiosInstance
      .get("/search-requests", {
        params: {
          bloodGroup,
          district,
          upazilla,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setSearch(res.data);
      });
  };

  return (
    <div className="max-w-6xl mx-auto mt-16">
      <form onSubmit={handleSearch} action="" className="fieldset flex ">
        <label className="label">Blood Group</label>
        <select
          name="bloodGroup"
          defaultValue="Select your Blood grooup"
          className="select"
          required
        >
          <option disabled>Select blood group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>

        {/* districts */}
        <label className="label">Select your district</label>
        <select
          onChange={(e) => setDistrict(e.target.value)}
          defaultValue="select your district"
          className="select appearance-none"
        >
          <option disabled defaultValue="select your district">
            Select your district
          </option>

          {districts.map((district) => (
            <option value={district?.name} key={district.id} className="input">
              {district?.name}
            </option>
          ))}
        </select>

        {/* upazilla */}

        <label className="label">Select your upazilla</label>
        <select
          onChange={(e) => setUpazilla(e.target.value)}
          defaultValue="select your district"
          className="select appearance-none"
        >
          <option disabled defaultValue="select your upazilla">
            Select your upazila
          </option>

          {upazillas.map((upazila) => (
            <option value={upazila?.name} key={upazila.id} className="input">
              {upazila?.name}
            </option>
          ))}
        </select>
        <button type="submit" className="btn">
          search
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {search.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">
            No requests found
          </p>
        ) : (
          search.map((item) => (
            <div key={item._id} className="card bg-base-100 shadow-lg border">
              <div className="card-body">
                <h2 className="card-title text-red-600">
                  Blood Group: {item.bloodGroup}
                </h2>

                <p>
                  <span className="font-semibold">District:</span>{" "}
                  {item.recipient_district}
                </p>

                <p>
                  <span className="font-semibold">Upazila:</span>{" "}
                  {item.recipient_upazilla}
                </p>

                <p>
                  <span className="font-semibold">Patient Name:</span>{" "}
                  {item.patient_name}
                </p>

                <p>
                  <span className="font-semibold">Required Date:</span>{" "}
                  {item.required_date}
                </p>

                <div className="card-actions justify-end mt-4">
                  <button  onClick={() => navigate(`/request/${item._id}`)}  className="btn btn-sm btn-primary">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchRequest;
