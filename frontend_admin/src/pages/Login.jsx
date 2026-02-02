import React from "react";
import Footer from "../components/layout/Footer";
import { FaLeaf } from "react-icons/fa";

const Login = () => {
  return (
    <div className="bg-linear-to-b from-amber-700 to-yellow-400">
      <div className="min-h-dvh p-4 flex flex-col items-center justify-center gap-4">
        <div className="bg-yellow-400 p-4 rounded-2xl shadow-lg">
          <FaLeaf className="text-4xl text-amber-700" />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-extrabold tracking-wide text-white">
            Admin Login
          </h1>
          <h2 className="text-sm tracking-widest font-semibold uppercase text-yellow-200 mt-1">
            Beyond Three
          </h2>
        </div>
        <form className="rounded-4xl bg-white md:p-8 p-4 shadow-2xl w-full max-w-sm">
          <div>
            <label className="text-sm font-semibold text-amber-700">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="admin@example.com"
              className="w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>
          <div className="mt-4">
            <label className="text-sm font-semibold text-amber-700">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="w-full cursor-pointer bg-amber-700 text-white py-3 rounded-2xl font-bold text-lg hover:bg-amber-800 transition shadow-lg active:scale-90"
            >
              Login
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Login;