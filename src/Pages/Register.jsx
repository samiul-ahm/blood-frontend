import React, { use, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import { useEffect } from "react";

const Register = () => {
  const [upazillas, setUpazillas] = useState([]);
  const [districts, setDistricts] = useState([]);

  const [district, setDistrict] = useState('');
  const [upazilla, setUpazilla] = useState('');

  useEffect(() => {
    axios.get("./upazilla.json").then((res) => {
      setUpazillas(res.data.upazilas);
    });
    axios.get("./district.json").then((res) => {
      setDistricts(res.data.districts);
    });
  }, []);

  // console.log(districts, upazillas);

  const { createUser, setUser, updateUser } = use(AuthContext);

  const [nameError, setNameError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;

    const email = form.email.value;
    const photo = form.photo;
    const file = photo.files[0];
    const bloodGroup = form.bloodGroup.value;
    const password = form.password.value;

    if (name.length < 5) {
      setNameError("Name Should be at least 6 character");
      return;
    } else {
      setNameError("");
    }

    const upperCase = /[A-Z]/;
    const lowerCase = /[a-z]/;

    if (!upperCase.test(password)) {
      return alert("Need an Uppercase");
    }
    if (!lowerCase.test(password)) {
      return alert("Need a lowercase");
    }

    console.log({ name, email, password, photo });

    const res = await axios.post(
      `https://api.imgbb.com/1/upload?expiration=600&key=65be08a10a7a8d8e12d37df6d7197e6f`,
      { image: file },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(res.data);

    const mainPhotoUrl = res.data.data.display_url;

    const formData = {
      name,
      email,
      mainPhotoUrl,
      password,
      bloodGroup,
      district,
      upazilla
    };

    console.log(formData);

    if (res.data.success == true) {
      createUser(email, password)
        .then((result) => {
          const user = result.user;
          console.log(user);
          updateUser({ displayName: name, photoURL: mainPhotoUrl })
            .then(() => {
              setUser({ ...user, displayName: name, photoURL: photo });
              axios
                .post("http://localhost:5000/users", formData)
                .then((res) => {
                  console.log(res.data);
                })
                .catch((err) => {
                  console.log(err);
                });
              navigate("/");
            })
            .catch((error) => {
              console.log(error);
              setUser(user);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorCode, errorMessage);
          // ..
        });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl p-12">
        <h2 className="text-center font-semibold text-2xl">
          Register your Account
        </h2>
        <form onSubmit={handleRegister} className="card-body">
          <fieldset className="fieldset">
            {/* Name */}
            <label className="label">Name</label>
            <input
              name="name"
              type="text"
              className="input"
              placeholder="your name"
              required
            />

            {nameError && <p className="text-sm text-error">{nameError}</p>}

            {/* email */}
            <label className="label">Email</label>
            <input
              name="email"
              type="email"
              className="input"
              placeholder="Email"
              required
            />

            {/* photourl */}
            <label className="label">Photo url</label>
            <input
              name="photo"
              type="file"
              className="input"
              placeholder="upload your photo"
              required
            />

            {/* blood group */}
            <label className="label">Blood Group</label>
            <select name="bloodGroup" defaultValue="Select your Blood grooup" className="select" required>
              <option disabled  >Select blood group</option>
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
            <select onChange={(e)=>setDistrict(e.target.value)}
              defaultValue="select your district"
              className="select appearance-none"
            >
              <option disabled defaultValue="select your district">Select your district</option>

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


            {/* upazilla */}

            <label className="label">Select your upazilla</label>
            <select onChange={(e)=>setUpazilla(e.target.value)}
              defaultValue="select your district"
              className="select appearance-none"
            >
              <option disabled defaultValue="select your upazilla">Select your  upazila</option>

              {upazillas.map((upazila) => (
                <option
                  value={upazila?.name}
                  key={upazila.id}
                  className="input"
                >
                  {upazila?.name}
                </option>
              ))}
            </select>

            {/* password */}
            <label className="label">Password</label>
            <input
              name="password"
              type="password"
              className="input"
              placeholder="Password"
              required
            />
            <button type="submit" className="btn btn-secondary mt-4">
              Register
            </button>
            <p className="font-semibold text-center mt-2">
              Already have an account?
              <Link to="/login" className="text-secondary ml-1">
                Login
              </Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Register;
