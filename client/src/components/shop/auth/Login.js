import React, { Fragment, useState, useContext } from "react";
import { loginReq } from "./fetchApi";
import { LayoutContext } from "../index";
import { Link } from "react-router-dom";

const Login = () => {
  const { data: layoutData, dispatch: layoutDispatch } = useContext(LayoutContext);

  const [data, setData] = useState({
    email: "",
    password: "",
    error: false,
    loading: false,
  });

  const alert = (msg) => (
    <div className="text-sm mt-1 text-red-500">{msg}</div>
  );

  const formSubmit = async () => {
    setData({ ...data, loading: true });

    try {
      let responseData = await loginReq({
        email: data.email,
        password: data.password,
      });

      if (responseData.error) {
        setData({
          ...data,
          loading: false,
          error: responseData.error,
          password: "",
        });
      } else if (responseData.token) {
        setData({
          email: "",
          password: "",
          loading: false,
          error: false,
        });
        localStorage.setItem("jwt", JSON.stringify(responseData));
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
      setData({
        ...data,
        loading: false,
        error: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <Fragment>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-3">
              <div className="w-14 h-14 bg-gray-800 text-white rounded-full flex items-center justify-center text-2xl shadow-md">
                🔐
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Login</h2>
            <p className="text-gray-500 text-sm mt-2">
              Sign in to access your OrganEase account
            </p>
          </div>

          {/* Alert */}
          {layoutData.loginSignupError && (
            <div className="mb-5 px-4 py-3 rounded-lg bg-red-100 text-red-700 text-sm border border-red-300">
              You need to login to request organs. Don’t have an account? Create a new one.
            </div>
          )}

          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              formSubmit();
            }}
          >
            {/* Email */}
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2">
                Username or Email Address <span className="text-red-500">*</span>
              </label>
              <input
                onChange={(e) => {
                  setData({ ...data, email: e.target.value, error: false });
                  layoutDispatch({ type: "loginSignupError", payload: false });
                }}
                value={data.email}
                type="text"
                id="email"
                placeholder="Enter your email"
                className={`px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 transition ${
                  data.error ? "border-red-500" : "border-gray-300"
                }`}
              />
              {data.error && alert(data.error)}
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label htmlFor="password" className="text-sm font-medium text-gray-700 mb-2">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                onChange={(e) => {
                  setData({ ...data, password: e.target.value, error: false });
                  layoutDispatch({ type: "loginSignupError", payload: false });
                }}
                value={data.password}
                type="password"
                id="password"
                placeholder="Enter your password"
                className={`px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 transition ${
                  data.error ? "border-red-500" : "border-gray-300"
                }`}
              />
              {data.error && alert(data.error)}
            </div>

            {/* Remember + Forgot */}
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
                Lost your password?
              </Link>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={data.loading}
              className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-lg font-semibold transition duration-200"
            >
              {data.loading ? "Logging in..." : "Login"}
            </button>

            {/* Register link */}
            <div className="text-center text-sm text-gray-600 pt-2">
              Don’t have an account?{" "}
              <Link to="/signup" className="font-medium text-gray-800 hover:underline">
                Register Hospital
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;