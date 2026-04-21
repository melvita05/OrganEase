import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const submitHandler = async () => {
    if (!email) {
      setError("Email is required");
      setMessage("");
      return;
    }

    try {
      setMessage("Password reset link has been sent to your email");
      setError("");
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
      setMessage("");
    }
  };

  return (
    <Fragment>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
          {/* Heading */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">
              Forgot Password
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Enter your registered email to receive a reset link
            </p>
          </div>

          {/* Alerts */}
          {message && (
            <div className="mb-4 px-4 py-3 rounded-lg bg-green-100 text-green-700 text-sm border border-green-300">
              {message}
            </div>
          )}

          {error && (
            <div className="mb-4 px-4 py-3 rounded-lg bg-red-100 text-red-700 text-sm border border-red-300">
              {error}
            </div>
          )}

          {/* Form */}
          <div className="space-y-5">
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700 mb-2"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                placeholder="Enter your email"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                  setMessage("");
                }}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 transition"
              />
            </div>

            {/* Button */}
            <button
              onClick={submitHandler}
              className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-lg font-semibold transition duration-200"
            >
              Send Reset Link
            </button>

            {/* Back Link */}
            <div className="text-center">
              <Link
                to="/signup"
                className="text-gray-600 hover:text-gray-900 text-sm font-medium transition"
              >
                ← Go Back to Signup
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ForgotPassword;