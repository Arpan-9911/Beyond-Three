import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DesktopHeader from "../components/layout/DesktopHeader";
import MobileHeader from "../components/layout/MobileHeader";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";
import { FaUser, FaCheck, FaTimes, FaStar, FaRegStar } from "react-icons/fa";
import { allReviews, approveReview, rejectReview } from "../functions/review";

const Reviews = () => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.review);
  const [activeTab, setActiveTab] = useState("pending");

  useEffect(() => {
    allReviews(dispatch);
  }, [dispatch]);

  const renderStars = (rating) => (
    <div className="flex gap-1 mt-1">
      {[1, 2, 3, 4, 5].map((star) =>
        star <= rating ? (
          <FaStar key={star} className="text-amber-500" size={14} />
        ) : (
          <FaRegStar key={star} className="text-amber-500" size={14} />
        )
      )}
    </div>
  );

  const filteredReviews = reviews.filter(
    (r) => r.status === activeTab
  );

  return (
    <div className="min-h-dvh flex bg-amber-100">
      <div className="h-dvh sticky top-0 w-64 max-md:hidden">
        <Sidebar />
      </div>
      <div className="flex-1">
        <div className="max-md:hidden">
          <DesktopHeader heading={"Reviews"} />
        </div>
        <div className="md:hidden">
          <MobileHeader heading={"Reviews"} />
        </div>
        <div className="min-h-[92.5dvh] p-4 space-y-6">
          <div>
            <h1 className="text-xl font-bold">Review Moderation</h1>
            <p className="text-amber-700 text-sm">
              Approve or reject user submitted reviews.
            </p>
          </div>

          {/* ================= Tabs ================= */}
          <div className="flex gap-3">
            {["pending", "approved", "rejected"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-xl font-semibold text-sm transition ${
                  activeTab === tab
                    ? tab === "pending"
                      ? "bg-yellow-500 text-white"
                      : tab === "approved"
                      ? "bg-green-600 text-white"
                      : "bg-red-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)} (
                {reviews.filter((r) => r.status === tab).length})
              </button>
            ))}
          </div>

          {/* ================= Reviews List ================= */}
          <div className="space-y-4">
            {filteredReviews.length === 0 && (
              <p className="text-gray-500 text-sm">
                No reviews in this section.
              </p>
            )}
            {filteredReviews.map((review) => (
              <div
                key={review._id}
                className="bg-white rounded-2xl shadow-lg p-4"
              >
                <div className="flex items-start gap-4 max-sm:flex-col">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                    <FaUser className="text-amber-500" size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start max-sm:flex-col gap-2">
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {review.name?.en}
                        </h3>
                        <p className="text-xs text-gray-400">
                          {review.name?.hi} •{" "}
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                        {renderStars(review.stars)}
                      </div>
                      {activeTab === "pending" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => dispatch(approveReview(review._id))}
                            className="flex items-center gap-1 bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-green-700 transition"
                          >
                            <FaCheck size={12} />
                            Accept
                          </button>
                          <button
                            onClick={() => dispatch(rejectReview(review._id))}
                            className="flex items-center gap-1 bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-red-700 transition"
                          >
                            <FaTimes size={12} />
                            Reject
                          </button>
                        </div>
                      )}
                    </div>

                    <p className="text-gray-700 text-sm mt-2">
                      {review.text?.en}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      {review.text?.hi}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Reviews;