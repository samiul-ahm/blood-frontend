import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
// import useAxios from "../../../hooks/useAxios";
import useAxiosSecure from "../../../hooks/UseAxiosSecure";

const AddRequest = () => {
  const { user } = useContext(AuthContext);

  const [upazillas, setUpazillas] = useState([]);
  const [districts, setDistricts] = useState([]);

  const [district, setDistrict] = useState("");
  const [upazilla, setUpazilla] = useState("");

  // const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axios.get("/upazilla.json").then((res) => {
      setUpazillas(res.data.upazilas || []);
    });
    axios.get("/district.json").then((res) => {
      setDistricts(res.data.districts || []);
    });
  }, []);

  const handleRequest = (e) => {
    e.preventDefault();
    const form = e.target;

    const requester_name = form.requester_name.value;
    const requester_email = form.requester_email.value;
    const recipient_name = form.recipient_name.value;
    const recipient_district = district;
    const recipient_upazilla = upazilla;
    const hospital = form.hospital_name.value;
    const full_address = form.full_address.value;
    const bloodGroup = form.bloodGroup.value;
    const donationDate = form.date.value;
    const donationTime = form.time.value;
    const requestMessage = form.message.value;

    const formData = {
      requester_name,
      requester_email,
      recipient_name,
      recipient_district,
      recipient_upazilla,
      hospital,
      full_address,
      bloodGroup,
      donationDate,
      donationTime,
      requestMessage,
      donation_status: "pending",
    };

    axiosSecure
      .post("/requests", formData)
      .then((res) => {
        alert(res.data.insertedId);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form
        onSubmit={handleRequest}
        className="max-w-4xl mx-auto mt-3 grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        {/* Requester Name */}
        <div>
          <label className="block mb-1 font-medium">Requester Name</label>
          <input
            type="text"
            name="requester_name"
            readOnly
            value={user?.displayName}
            className="w-full px-4 py-2 border rounded bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Requester Email */}
        <div>
          <label className="block mb-1 font-medium">Requester Email</label>
          <input
            type="email"
            name="requester_email"
            readOnly
            value={user?.email}
            className="w-full px-4 py-2 border rounded bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Recipient Name */}
        <div>
          <label className="block mb-1 font-medium">Recipient Name</label>
          <input
            type="text"
            name="recipient_name"
            placeholder="Recipient full name"
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        {/* Blood Group */}

        <div>
          <label className=" block mb-1 font-medium">Blood Group</label>
          <select
            name="bloodGroup"
            className=" w-full px-4 py-2 border rounded"
            required
          >
            <option value="" disabled>Select blood group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        {/* District */}
        <div>
          <label className="block mb-1 font-medium">District</label>
          <select
            value={district} required
            onChange={(e) => setDistrict(e.target.value)}
            name="recepient_district"
            className="w-full px-4 py-2 border rounded"
          >
            <option value="">Select District</option>

            {districts.map((district) => (
              <option
                value={district?.name}
                key={district.id}
                className="input"
              >
                {district?.name}
              </option>
            ))}
          </select>
        </div>

        {/* Upazila */}
        <div>
          <label className="block mb-1 font-medium">Upazila</label>
          <select
            value={upazilla}
            name="recepient_upazilla"
            onChange={(e) => setUpazilla(e.target.value)} required
            className="w-full px-4 py-2 border rounded"
          >
            <option value="">Select your upazila</option>

            {upazillas.map((upazila) => (
              <option value={upazila?.name} key={upazila.id} className="input">
                {upazila?.name}
              </option>
            ))}
          </select>
        </div>

        {/* Hospital Name */}
        <div className="md:col-span-2">
          <label className="block mb-1 font-medium">Hospital Name</label>
          <input
            type="text"
            name="hospital_name"
            placeholder="Dhaka Medical College Hospital"
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        {/* Full Address */}
        <div className="md:col-span-2">
          <label className="block mb-1 font-medium">Full Address</label>
          <input
            type="text"
            name="full_address"
            placeholder="Zahir Raihan Rd, Dhaka"
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        {/* Donation Date */}
        <div>
          <label className="block mb-1 font-medium">Donation Date</label>
          <input
            name="date"
            type="date"
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        {/* Donation Time */}
        <div>
          <label className="block mb-1 font-medium">Donation Time</label>
          <input
            name="time"
            type="time"
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        {/* Request Message */}
        <div className="md:col-span-2">
          <label className="block mb-1 font-medium">Request Message</label>
          <textarea
            name="message"
            rows="4"
            placeholder="Explain why blood is needed..."
            className="w-full px-4 py-2 border rounded"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded font-medium hover:bg-red-700 transition"
          >
            Request Donation
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRequest;
