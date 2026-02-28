import React, { useEffect, useState } from "react";
import DesktopHeader from "../components/layout/DesktopHeader";
import MobileHeader from "../components/layout/MobileHeader";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";
import {
  FaUser,
  FaCheck,
  FaTimes,
  FaEye,
  FaProjectDiagram,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  allParticipations,
  approveParticipation,
  rejectParticipation,
} from "../functions/projects";

const Detail = ({ label, value }) => (
  <div>
    <p className="text-gray-500 m-0 leading-tight">{label}</p>
    <p className="font-medium wrap-break-words m-0 text-sm">{value || "-"}</p>
  </div>
);

const Join = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("project");
  const projectParticipations = useSelector(
    (state) => state.projectParticipations,
  );
  const [volunteers] = useState([]);
  const [members] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    dispatch(allParticipations());
  }, [dispatch]);

  const currentRequests =
    activeTab === "project"
      ? projectParticipations
      : activeTab === "volunteer"
        ? volunteers
        : members;

  const viewRequest = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  const approveRequest = async (id) => {
    await dispatch(approveParticipation(id));
  };

  const rejectRequest = async (id) => {
    await dispatch(rejectParticipation(id));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700 border-green-300";
      case "rejected":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-dvh flex bg-amber-100">
      <div className="h-dvh sticky top-0 w-64 max-md:hidden">
        <Sidebar />
      </div>

      <div className="flex-1">
        <div className="max-md:hidden">
          <DesktopHeader heading={"Join Us Requests"} />
        </div>
        <div className="md:hidden">
          <MobileHeader heading={"Join Us Requests"} />
        </div>

        <div className="min-h-[92.5dvh] p-6">
          <h1 className="text-2xl font-bold">Join Us Requests</h1>
          <p className="text-amber-700 mb-6">
            Manage project participation, volunteer, and member requests.
          </p>

          {/* ================= Tabs ================= */}
          <div className="flex gap-3 flex-wrap mb-6">
            <button
              onClick={() => setActiveTab("project")}
              className={`px-5 py-2 rounded-xl font-semibold ${
                activeTab === "project"
                  ? "bg-amber-700 text-white"
                  : "bg-white hover:bg-amber-50"
              }`}
            >
              Project Participations ({projectParticipations.length})
            </button>

            <button
              onClick={() => setActiveTab("volunteer")}
              className={`px-5 py-2 rounded-xl font-semibold ${
                activeTab === "volunteer"
                  ? "bg-amber-700 text-white"
                  : "bg-white hover:bg-amber-50"
              }`}
            >
              Volunteers ({volunteers.length})
            </button>

            <button
              onClick={() => setActiveTab("member")}
              className={`px-5 py-2 rounded-xl font-semibold ${
                activeTab === "member"
                  ? "bg-amber-700 text-white"
                  : "bg-white hover:bg-amber-50"
              }`}
            >
              Members ({members.length})
            </button>
          </div>

          {/* ================= Table ================= */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-amber-300 border-b">
                  <tr>
                    <th className="py-2 px-4 text-left">Name</th>
                    <th className="py-2 px-4 text-left">Project</th>
                    <th className="py-2 px-4 text-left">Email</th>
                    <th className="py-2 px-4 text-left">Mobile</th>
                    <th className="py-2 px-4 text-left">Applied On</th>
                    <th className="py-2 px-4 text-left">Status</th>
                    <th className="py-2 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRequests.map((request) => (
                    <tr key={request._id} className="hover:bg-amber-200/60">
                      <td className="py-2 px-4 flex items-center gap-2">
                        <FaUser className="text-amber-600" />
                        {request.name}
                      </td>
                      <td className="py-2 px-4">
                        <FaProjectDiagram className="inline mr-2 text-gray-400" />
                        {request.projectId.title.en ||
                          request.projectId.title.hi}
                      </td>
                      <td className="py-2 px-4">{request.email}</td>
                      <td className="py-2 px-4">{request.mobile}</td>
                      <td className="py-2 px-4">
                        {formatDate(request.createdAt)}
                      </td>
                      <td className="py-2 px-4">
                        <span
                          className={`px-3 py-1 rounded-full border text-xs font-semibold ${getStatusColor(
                            request.status,
                          )}`}
                        >
                          {request.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-2 px-4 flex gap-3">
                        <button
                          onClick={() => viewRequest(request)}
                          className="text-blue-600 hover:text-blue-800 cursor-pointer"
                        >
                          <FaEye />
                        </button>
                        {request.status === "new" && (
                          <>
                            <button
                              onClick={() => approveRequest(request._id)}
                              className="text-green-600 hover:text-green-800 cursor-pointer"
                            >
                              <FaCheck />
                            </button>
                            <button
                              onClick={() => rejectRequest(request._id)}
                              className="text-red-600 hover:text-red-800 cursor-pointer"
                            >
                              <FaTimes />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {currentRequests.length === 0 && (
              <div className="p-10 text-center text-gray-500">
                No requests found.
              </div>
            )}
          </div>
        </div>

        <Footer />
      </div>

      {/* ================= Modal ================= */}
      {showModal && selectedRequest && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 w-full max-w-2xl space-y-4 max-h-[90vh] overflow-y-auto hide-scrollbar">
            <h2 className="text-xl font-bold">Project Participation Details</h2>
            <div className="grid md:grid-cols-2 gap-x-4 gap-y-1">
              <div>
                <p className="text-gray-500 m-0 leading-tight">Project</p>
                <p className="font-medium m-0 text-sm">
                  {selectedRequest.projectId?.title?.en ||
                    selectedRequest.projectId?.title ||
                    "-"}
                </p>
              </div>
              <div>
                <p className="text-gray-500 m-0 leading-tight">Applied On</p>
                <p className="font-medium m-0 text-sm">
                  {formatDate(selectedRequest.createdAt)}
                </p>
              </div>
              <Detail label="Name" value={selectedRequest.name} />
              <Detail label="Age" value={selectedRequest.age} />
              <Detail label="Gender" value={selectedRequest.gender} />
              <Detail label="Gotra" value={selectedRequest.gotra} />
              <Detail label="Blood Group" value={selectedRequest.bloodGroup} />
              <Detail label="Mobile" value={selectedRequest.mobile} />
              <Detail label="Email" value={selectedRequest.email} />
              <Detail label="Address" value={selectedRequest.address} />
              <Detail label="Father Name" value={selectedRequest.fatherName} />
              <Detail label="Mother Name" value={selectedRequest.motherName} />
              <Detail label="Education" value={selectedRequest.education} />
              <Detail label="Occupation" value={selectedRequest.occupation} />
              <Detail label="Approval" value={selectedRequest.approval ? "Yes" : "No"} />
              <Detail label="Reason" value={selectedRequest.reason} />
              <Detail label="Declaration Accepted" value={selectedRequest.declaration ? "Yes" : "No"} />
              <Detail label="Status" value={selectedRequest.status?.toUpperCase()} />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded-xl hover:bg-gray-100 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Join;
