import React, { useState } from "react";
import Footer from "../components/layout/Footer";
import { FaLeaf } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { login } from "../functions/auth";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [authData, setAuthData] = useState({
    email: "",
    password: "",
  });
  const { user } = useSelector((state) => state.auth);
  if(user && user.role === "Main Admin") return <Navigate to="/dashboard" />

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!authData.email || !authData.password) return toast.error("Please fill all the fields");
    try {
      await dispatch(login(authData, navigate));
    } catch (error) {
      toast.error(error.response.data.msg || "Login Failed");
    } finally {
      setAuthData({ email: "", password: "" });
    }
  };

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
        <form onSubmit={handleSubmit} className="rounded-4xl bg-white md:p-8 p-4 shadow-2xl w-full max-w-sm">
          <div>
            <label className="text-sm font-semibold text-amber-700">
              Email Address
            </label>
            <input
              type="email"
              required
              onChange={(e) => setAuthData({ ...authData, email: e.target.value })}
              value={authData.email}
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
              onChange={(e) => setAuthData({ ...authData, password: e.target.value })}
              value={authData.password}
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