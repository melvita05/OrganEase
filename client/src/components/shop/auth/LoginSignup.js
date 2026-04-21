import React, { Fragment, useContext } from "react";
import Login from "./Login";
import Signup from "./Signup";
import { LayoutContext } from "../index";

const LoginSignup = () => {
  const { data, dispatch } = useContext(LayoutContext);

  const loginSignupModalToggle = () =>
    data.loginSignupModal
      ? dispatch({ type: "loginSignupModalToggle", payload: false })
      : dispatch({ type: "loginSignupModalToggle", payload: true });

  return (
    <Fragment>
      {/* Black Overlay */}
      <div
        onClick={() => loginSignupModalToggle()}
        className={`${
          data.loginSignupModal ? "" : "hidden"
        } fixed top-0 z-40 w-full h-screen bg-black opacity-50 cursor-pointer`}
      ></div>

      {/* Modal */}
      <section
        className={`${
          data.loginSignupModal ? "" : "hidden"
        } fixed z-40 inset-0 flex items-center justify-center overflow-auto px-4 py-8`}
      >
        <div className="relative w-full max-w-4xl">
          {/* Close Button */}
          <div className="absolute top-4 right-4 z-50">
            <svg
              onClick={() => {
                loginSignupModalToggle();
                dispatch({ type: "loginSignupError", payload: false });
              }}
              className="w-7 h-7 cursor-pointer text-gray-700 hover:text-black"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {/* Only show one modern design */}
          <div className="rounded-2xl overflow-hidden">
            <Login />
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default LoginSignup;