import React, { useState, useEffect } from "react";
import DesktopHeader from "../components/layout/DesktopHeader";
import MobileHeader from "../components/layout/MobileHeader";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { updateAdmin } from "../functions/auth";
import { toast } from "react-toastify";

const Profile = () => {
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.auth?.user);

  const [form, setForm] = useState({
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [show, setShow] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [loading, setLoading] = useState(false);

  // ✅ Pre-fill email from backend
  useEffect(() => {
    if (admin) {
      setForm((prev) => ({
        ...prev,
        email: admin.email || "",
      }));
    }
  }, [admin]);

  const toggle = (field) => {
    setShow((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email && !form.newPassword) return toast.error("Nothing to update");
    if (form.newPassword && form.newPassword !== form.confirmPassword) return toast.error("Passwords do not match");
    setLoading(true);

    try {
      updateAdmin(
        {
          email: form.email,
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        }
      )
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-dvh flex bg-amber-100">
      {/* Sidebar */}
      <div className="h-dvh sticky top-0 w-64 max-md:hidden">
        <Sidebar />
      </div>

      <div className="flex-1">
        {/* Header */}
        <div className="max-md:hidden">
          <DesktopHeader heading={"Settings"} />
        </div>
        <div className="md:hidden">
          <MobileHeader heading={"Settings"} />
        </div>

        {/* Content */}
        <div className="min-h-[92dvh] flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl p-8 space-y-6">

            {/* Title */}
            <div>
              <h1 className="text-2xl font-bold">Account Settings</h1>
              <p className="text-gray-500 text-sm">
                Update your email and password securely.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email */}
              <div>
                <label className="text-sm text-gray-600 flex items-center gap-2 mb-1">
                  <FaEnvelope className="text-amber-600" />
                  Email Address
                </label>

                {/* Current email */}
                <p className="text-xs text-gray-400 mb-1">
                  Current: {admin?.email}
                </p>

                <input
                  type="email"
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />
              </div>

              {/* Current Password */}
              <div>
                <label className="text-sm text-gray-600 flex items-center gap-2 mb-1">
                  <FaLock className="text-amber-600" />
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={show.current ? "text" : "password"}
                    placeholder="Enter current password"
                    className="w-full px-4 py-2 pr-10 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
                    value={form.currentPassword}
                    onChange={(e) =>
                      setForm({ ...form, currentPassword: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    onClick={() => toggle("current")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {show.current ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="text-sm text-gray-600 flex items-center gap-2 mb-1">
                  <FaLock className="text-amber-600" />
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={show.new ? "text" : "password"}
                    placeholder="Leave blank to keep current password"
                    className="w-full px-4 py-2 pr-10 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
                    value={form.newPassword}
                    onChange={(e) =>
                      setForm({ ...form, newPassword: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    onClick={() => toggle("new")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {show.new ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="text-sm text-gray-600 flex items-center gap-2 mb-1">
                  <FaLock className="text-amber-600" />
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={show.confirm ? "text" : "password"}
                    placeholder="Confirm new password"
                    className="w-full px-4 py-2 pr-10 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
                    value={form.confirmPassword}
                    onChange={(e) =>
                      setForm({ ...form, confirmPassword: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    onClick={() => toggle("confirm")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {show.confirm ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-700 text-white py-2.5 rounded-xl hover:bg-amber-800 transition font-medium"
              >
                {loading ? "Updating..." : "Update Settings"}
              </button>
            </form>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Profile;