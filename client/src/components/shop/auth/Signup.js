import React, { Fragment, useState } from "react";
import { signupReq } from "./fetchApi";
import { Link } from "react-router-dom";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
    phone: "",
    address: "",
    error: {},
    loading: false,
    success: false,
  });

  const alert = (msg, type) => (
    <div
      className={`text-sm mt-1 ${
        type === "red" ? "text-red-500" : "text-green-500"
      }`}
    >
      {msg}
    </div>
  );

  const formSubmit = async () => {
    setData({ ...data, loading: true });

    if (data.cPassword !== data.password) {
      return setData({
        ...data,
        loading: false,
        error: {
          cPassword: "Password doesn't match",
          password: "Password doesn't match",
        },
      });
    }

    try {
      let responseData = await signupReq({
        name: data.name,
        email: data.email,
        password: data.password,
        cPassword: data.cPassword,
        phone: data.phone,
        address: data.address,
      });

      if (responseData.error) {
        setData({
          ...data,
          loading: false,
          error: responseData.error,
          password: "",
          cPassword: "",
        });
      } else if (responseData.success) {
        setData({
          success: responseData.success,
          name: "",
          email: "",
          password: "",
          cPassword: "",
          phone: "",
          address: "",
          loading: false,
          error: {},
        });
      }
    } catch (error) {
      console.log(error);
      setData({
        ...data,
        loading: false,
      });
    }
  };

  return (
    <Fragment>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-3">
              <div className="w-14 h-14 bg-gray-800 text-white rounded-full flex items-center justify-center text-2xl shadow-md">
                🏥
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-800">
              Register Hospital
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Create your OrganEase hospital account
            </p>
          </div>

          {data.success && (
            <div className="mb-5 px-4 py-3 rounded-lg bg-green-100 text-green-700 text-sm border border-green-300">
              {data.success}
            </div>
          )}

          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              formSubmit();
            }}
          >
            <div className="flex flex-col">
              <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-2">
                Hospital Name <span className="text-red-500">*</span>
              </label>
              <input
                onChange={(e) =>
                  setData({
                    ...data,
                    success: false,
                    error: {},
                    name: e.target.value,
                  })
                }
                value={data.name}
                type="text"
                id="name"
                placeholder="Enter hospital name"
                className={`px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 transition ${
                  data.error.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {data.error?.name && alert(data.error.name, "red")}
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div className="flex flex-col">
                <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  onChange={(e) =>
                    setData({
                      ...data,
                      success: false,
                      error: {},
                      email: e.target.value,
                    })
                  }
                  value={data.email}
                  type="email"
                  id="email"
                  placeholder="Enter email"
                  className={`px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 transition ${
                    data.error.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {data.error?.email && alert(data.error.email, "red")}
              </div>

              <div className="flex flex-col">
                <label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  onChange={(e) =>
                    setData({
                      ...data,
                      success: false,
                      error: {},
                      phone: e.target.value,
                    })
                  }
                  value={data.phone}
                  type="text"
                  id="phone"
                  placeholder="Enter phone number"
                  className={`px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 transition ${
                    data.error.phone ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {data.error?.phone && alert(data.error.phone, "red")}
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="address" className="text-sm font-medium text-gray-700 mb-2">
                Address <span className="text-red-500">*</span>
              </label>
              <textarea
                onChange={(e) =>
                  setData({
                    ...data,
                    success: false,
                    error: {},
                    address: e.target.value,
                  })
                }
                value={data.address}
                id="address"
                rows="3"
                placeholder="Enter hospital address"
                className={`px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 transition ${
                  data.error.address ? "border-red-500" : "border-gray-300"
                }`}
              />
              {data.error?.address && alert(data.error.address, "red")}
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div className="flex flex-col">
                <label htmlFor="password" className="text-sm font-medium text-gray-700 mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  onChange={(e) =>
                    setData({
                      ...data,
                      success: false,
                      error: {},
                      password: e.target.value,
                    })
                  }
                  value={data.password}
                  type="password"
                  id="password"
                  placeholder="Enter password"
                  className={`px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 transition ${
                    data.error.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {data.error?.password && alert(data.error.password, "red")}
              </div>

              <div className="flex flex-col">
                <label htmlFor="cPassword" className="text-sm font-medium text-gray-700 mb-2">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  onChange={(e) =>
                    setData({
                      ...data,
                      success: false,
                      error: {},
                      cPassword: e.target.value,
                    })
                  }
                  value={data.cPassword}
                  type="password"
                  id="cPassword"
                  placeholder="Confirm password"
                  className={`px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 transition ${
                    data.error.cPassword ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {data.error?.cPassword && alert(data.error.cPassword, "red")}
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
              <div className="flex items-center">
                <input type="checkbox" id="rememberMe" className="mr-2 h-4 w-4" />
                <label htmlFor="rememberMe" className="text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <Link
                className="text-sm text-gray-600 hover:text-gray-900 transition"
                to="/forgot-password"
              >
                Forgot your password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={data.loading}
              className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-lg font-semibold transition duration-200"
            >
              {data.loading ? "Creating Account..." : "Create Account"}
            </button>

            <div className="text-center text-sm text-gray-600 pt-2">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-gray-800 hover:underline"
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Signup;