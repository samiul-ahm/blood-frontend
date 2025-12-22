import React from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";

const Home = () => {
  const handleContactSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Message Sent!",
      text: "Thank you for reaching out. Our team will get back to you soon.",
      icon: "success",
      confirmButtonColor: "#ef4444",
    });

    e.target.reset();
  };
  return (
    <div className="space-y-20 max-w-7xl mx-auto">
      {/* Banner Section */}
      <section className="relative h-125 flex items-center justify-center bg-slate-900 text-white overflow-hidden rounded-2xl mx-4">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600 rounded-full blur-[120px] opacity-20 -mr-20 -mt-20"></div>

        <div className="relative text-center z-10 px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Life is in the <span className="text-red-500">Blood</span>. <br />
            Be a Hero, Save Lives.
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Connect with donors in your area and help bridge the gap in
            emergency blood shortages.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="btn btn-error btn-lg text-white px-8 border-none hover:scale-105 transition-transform"
            >
              Join as a Donor
            </Link>
            <Link
              to="/search"
              className="btn btn-outline btn-lg text-white hover:bg-white hover:text-slate-900 px-8 hover:scale-105 transition-transform"
            >
              Search Donors
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Section: How It Works */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
          <div className="w-20 h-1.5 bg-red-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card bg-base-100 shadow-xl border border-slate-100 hover:shadow-2xl transition-shadow">
            <div className="card-body items-center text-center">
              <div className="w-16 h-16 bg-red-100 flex items-center justify-center rounded-full mb-4">
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="card-title">Real-time Requests</h3>
              <p className="text-slate-500">
                Post and manage donation requests instantly when time is of the
                essence.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl border border-slate-100 hover:shadow-2xl transition-shadow">
            <div className="card-body items-center text-center">
              <div className="w-16 h-16 bg-red-100 flex items-center justify-center rounded-full mb-4">
                <span className="text-3xl">🛡️</span>
              </div>
              <h3 className="card-title">Verified Donors</h3>
              <p className="text-slate-500">
                Search through our database of verified blood donors filtered by
                location and group.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl border border-slate-100 hover:shadow-2xl transition-shadow">
            <div className="card-body items-center text-center">
              <div className="w-16 h-16 bg-red-100 flex items-center justify-center rounded-full mb-4">
                <span className="text-3xl">💳</span>
              </div>
              <h3 className="card-title">Direct Funding</h3>
              <p className="text-slate-500">
                Support our mission through secure payment gateways to help us
                maintain the platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="bg-slate-50 py-10 rounded-[3rem] px-10 shadow-inner">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2 space-y-8">
            <h2 className="text-4xl font-extrabold text-slate-800 leading-tight">
              Need Help? <br />
              <span className="text-red-600">Our team is here 24/7.</span>
            </h2>
            <p className="text-lg text-slate-600">
              Whether you are looking for rare blood groups or need technical
              assistance, don't hesitate to reach out to our support staff.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-5 p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="bg-red-100 p-3 rounded-full text-red-600">
                  📞
                </div>
                <span className="text-xl font-bold text-slate-700">
                  +880 1234 567 890
                </span>
              </div>
              <div className="flex items-center gap-5 p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="bg-red-100 p-3 rounded-full text-red-600">
                  📧
                </div>
                <span className="text-xl font-bold text-slate-700">
                  support@bloodbank.org
                </span>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            <div className="card bg-white shadow-2xl p-8 border border-slate-100">
              <h3 className="text-2xl font-bold mb-6 text-slate-800">
                Send us a Message
              </h3>

              <form className="space-y-4" onSubmit={handleContactSubmit}>
                <div className="form-control">
                  <label className="label block text-xs font-semibold uppercase text-slate-500">
                    Full Name
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="John Doe"
                    className="input input-bordered focus:border-red-500 bg-slate-50"
                  />
                </div>
                <div className="form-control">
                  <label className="label block text-xs font-semibold uppercase text-slate-500">
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="john@example.com"
                    className="input input-bordered focus:border-red-500 bg-slate-50"
                  />
                </div>
                <div className="form-control">
                  <label className="label block  text-xs font-semibold uppercase text-slate-500">
                    Message
                  </label>
                  <textarea
                    required
                    className="textarea textarea-bordered h-32 focus:border-red-500 bg-slate-50"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn btn-error text-white w-full shadow-lg mt-4"
                >
                  Submit Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
