import React, { Fragment, useState } from "react";

const ContactUs = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    success: "",
    error: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
      success: "",
      error: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!data.name || !data.email || !data.subject || !data.message) {
      return setData({
        ...data,
        error: "All fields are required",
        success: "",
      });
    }

    // You can later connect this to backend API
    setData({
      name: "",
      email: "",
      subject: "",
      message: "",
      success: "Your message has been sent successfully!",
      error: "",
    });
  };

  return (
    <Fragment>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-6xl grid md:grid-cols-2 bg-white shadow-2xl rounded-3xl overflow-hidden">
          
          {/* Left Side */}
          <div className="bg-gray-900 text-white p-10 flex flex-col justify-center">
            <div className="mb-6">
              <div className="w-16 h-16 rounded-full bg-white text-gray-900 flex items-center justify-center text-3xl shadow-lg mb-4">
                📞
              </div>
              <h2 className="text-4xl font-bold mb-3">Contact Us</h2>
              <p className="text-gray-300 leading-relaxed">
                Have questions about organ donation, hospital registration, or organ requests?
                We’re here to help you. Reach out to the OrganEase support team anytime.
              </p>
            </div>

            <div className="space-y-5 mt-6">
              <div className="flex items-start space-x-4">
                <div className="text-2xl">📍</div>
                <div>
                  <h4 className="font-semibold text-lg">Address</h4>
                  <p className="text-gray-300 text-sm">
                    OrganEase Support Center, Medical Hub, India
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="text-2xl">📧</div>
                <div>
                  <h4 className="font-semibold text-lg">Email</h4>
                  <p className="text-gray-300 text-sm">support@organease.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="text-2xl">📱</div>
                <div>
                  <h4 className="font-semibold text-lg">Phone</h4>
                  <p className="text-gray-300 text-sm">+91 98765 43210</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Form */}
          <div className="p-8 md:p-10 bg-white">
            <div className="mb-8">
              <h3 className="text-3xl font-bold text-gray-800">Send a Message</h3>
              <p className="text-gray-500 mt-2 text-sm">
                Fill out the form below and we’ll get back to you soon.
              </p>
            </div>

            {data.success && (
              <div className="mb-4 px-4 py-3 rounded-lg bg-green-100 text-green-700 text-sm border border-green-300">
                {data.success}
              </div>
            )}

            {data.error && (
              <div className="mb-4 px-4 py-3 rounded-lg bg-red-100 text-red-700 text-sm border border-red-300">
                {data.error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-800"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-800"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  value={data.subject}
                  onChange={handleChange}
                  placeholder="Enter subject"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-800"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  rows="5"
                  value={data.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-800 resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-xl font-semibold transition duration-200 shadow-md"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ContactUs;