import React, { useEffect, useState } from "react";
import DesktopHeader from "../components/layout/DesktopHeader";
import MobileHeader from "../components/layout/MobileHeader";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";
import { FaCalendarCheck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { changeStatusAppointment, getAppointments } from "../functions/appointment";
import { toast } from "react-toastify";

const Appointments = () => {
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.appointment);
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    dispatch(getAppointments());
  }, [dispatch]);

  const updateStatus = async (id, status) => {
    try {
      await dispatch(changeStatusAppointment(id, { status }));
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to update appointment status");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-blue-100 text-blue-700 border-blue-500";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-500";
      default:
        return "bg-yellow-100 text-yellow-700 border-yellow-500";
    }
  };

  const filteredAppointments =
    filterStatus === "all"
      ? appointments
      : appointments.filter((a) => a.status === filterStatus);

  const statusCounts = {
    all: appointments ? appointments.length : 0,
    pending: appointments ? appointments.filter((a) => a.status === "pending").length : 0,
    completed: appointments ? appointments.filter((a) => a.status === "completed").length : 0,
    cancelled: appointments ? appointments.filter((a) => a.status === "cancelled").length : 0,
  };

  return (
    <div className="min-h-dvh flex bg-amber-100">
      {/* Sidebar */}
      <div className='h-dvh sticky top-0 w-64 overflow-hidden max-md:hidden'>
        <Sidebar />
      </div>

      <div className="flex-1 overflow-hidden">
        {/* Headers */}
        <div className="max-md:hidden">
          <DesktopHeader heading={"Appointments"} />
        </div>
        <div className="md:hidden">
          <MobileHeader heading={"Appointments"} />
        </div>

        {/* Content */}
        <div className="min-h-[92.5dvh] p-4">
          <div>
            <h1 className="text-xl font-bold">Appointment Management</h1>
            <span className="text-amber-700">
              Track and update appointment status.
            </span>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mt-6">
            {["all", "pending", "completed", "cancelled"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`md:px-4 px-2 py-2 rounded-lg font-medium max-md:text-xs transition capitalize ${
                  filterStatus === status
                    ? "bg-amber-700 text-white"
                    : "bg-white hover:bg-amber-50"
                }`}
              >
                {status} ({statusCounts[status]})
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="mt-6 bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full max-md:text-xs text-nowrap">
                <thead className="bg-amber-300 border-b">
                  <tr>
                    <th className="text-left p-2">Client</th>
                    <th className="text-left p-2">Contact</th>
                    <th className="text-left p-2">Date & Time</th>
                    <th className="text-left p-2">Notes</th>
                    <th className="text-left p-2">Status</th>
                    <th className="text-left p-2">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {appointments && filteredAppointments.map((appointment) => (
                    <tr
                      key={appointment._id}
                      className="hover:bg-gray-100 transition"
                    >
                      {/* Client Name */}
                      <td className="p-2">
                        <p className="font-medium">{appointment.name}</p>
                      </td>

                      {/* Contact */}
                      <td className="p-2">
                        <p className="text-sm">{appointment.phone}</p>
                        <p className="text-xs text-gray-500">{appointment.email}</p>
                      </td>

                      {/* Date & Time */}
                      <td className="p-2">
                        <p className="text-sm">{formatDate(appointment.date)}</p>
                        <p className="text-xs text-gray-500">{appointment.time}</p>
                      </td>

                      {/* Notes */}
                      <td className="p-2">
                        <p className="text-sm text-gray-600">
                          {appointment.notes || "-"}
                        </p>
                      </td>

                      {/* Status */}
                      <td className="p-2">
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full border capitalize ${getStatusColor(
                            appointment.status
                          )}`}
                        >
                          {appointment.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="p-2">
                        <div className="flex gap-2">
                          {appointment.status !== "pending" && (
                            <button
                              onClick={() => updateStatus(appointment._id, "pending")}
                              className="px-2 py-1 text-xs rounded-lg border bg-yellow-100 text-yellow-700 border-yellow-500 hover:bg-yellow-200 cursor-pointer transition"
                            >
                              Pending
                            </button>
                          )}

                          {appointment.status !== "completed" && (
                            <button
                              onClick={() => updateStatus(appointment._id, "completed")}
                              className="px-2 py-1 text-xs rounded-lg border bg-blue-100 text-blue-700 border-blue-500 hover:bg-blue-200 cursor-pointer transition"
                            >
                              Complete
                            </button>
                          )}

                          {appointment.status !== "cancelled" && (
                            <button
                              onClick={() => updateStatus(appointment._id, "cancelled")}
                              className="px-2 py-1 text-xs rounded-lg border bg-red-100 text-red-700 border-red-500 hover:bg-red-200 cursor-pointer transition"
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {(!appointments || filteredAppointments.length === 0) && (
              <div className="p-8 text-center text-gray-500">
                <FaCalendarCheck
                  size={48}
                  className="mx-auto text-gray-300 mb-4"
                />
                <p className="text-lg">No appointments found.</p>
              </div>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Appointments;
