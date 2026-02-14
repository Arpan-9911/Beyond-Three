import React, { useState } from "react";
import DesktopHeader from "../components/layout/DesktopHeader";
import MobileHeader from "../components/layout/MobileHeader";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";
import {
  FaPlus,
  FaTrash,
  FaFolder,
  FaImage,
  FaVideo,
  FaPlay,
  FaShareAlt,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addMedia, deleteMedia } from "../functions/media";

const Media = () => {
  const dispatch = useDispatch();
  const tabs = [
    { id: "image", name: "Images", icon: <FaImage /> },
    { id: "video", name: "Videos", icon: <FaVideo /> },
    { id: "social", name: "Social", icon: <FaShareAlt /> },
  ];
  const [activeTab, setActiveTab] = useState("image");
  const items = useSelector((state) => state.media);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    file: "",
    preview: "",
    type: "image",
    title: "",
    url: "",
    platform: "",
  });

  const openAdd = () => {
    setForm({
      file: "",
      preview: "",
      type: activeTab,
      title: "",
      url: "",
      platform: "",
    });
    setShowModal(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm({
      ...form,
      file,
      preview: URL.createObjectURL(file),
      type: file.type.startsWith("video/") ? "video" : "image",
    });
  };

  const handleSave = async () => {
    if (activeTab !== "social" && !form.file)
      return toast.error("Please select a file.");
    if (activeTab === "social" && (!form.url || !form.platform))
      return toast.error("Please fill in all fields.");
    const formData = new FormData();
    formData.append("file", form.file);
    formData.append("type", form.type);
    formData.append("title", form.title);
    formData.append("url", form.url);
    formData.append("platform", form.platform);
    try {
      await dispatch(addMedia(formData));
    } catch (err) {
      toast.error(err?.response?.data?.msg || "Failed to add media.");
    } finally {
      setShowModal(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this media?")) return;
    try {
      await dispatch(deleteMedia(id));
    } catch (err) {
      toast.error(err?.response?.data?.msg || "Failed to delete media.");
    }
  };
  const currentItems = items.filter((i) => i.type === activeTab);

  return (
    <div className="min-h-dvh flex bg-amber-100">
      <div className="h-dvh sticky top-0 w-64 overflow-hidden max-md:hidden">
        <Sidebar />
      </div>
      <div className="flex-1">
        <div className="max-md:hidden">
          <DesktopHeader heading={"Media Library"} />
        </div>
        <div className="md:hidden">
          <MobileHeader heading={"Media Library"} />
        </div>
        <div className="min-h-[92.5dvh] p-4">
          <div className="flex gap-6 max-lg:flex-col">
            <div className="lg:w-64 shrink-0">
              <h2 className="text-amber-700 font-semibold uppercase tracking-wide text-sm mb-4">
                Media Type
              </h2>
              <div className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition cursor-pointer ${
                      activeTab === tab.id
                        ? "bg-amber-600 text-white shadow-lg"
                        : "bg-white hover:bg-amber-50 text-gray-700"
                    }`}
                  >
                    {tab.icon}
                    <span className="font-medium">{tab.name}</span>
                    {activeTab === tab.id && (
                      <span className="ml-auto w-2 h-2 bg-white rounded-full"></span>
                    )}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
                <h1 className="text-2xl font-bold capitalize">
                  {activeTab} Library
                </h1>
                <button
                  onClick={openAdd}
                  className="cursor-pointer flex gap-2 items-center bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition"
                >
                  <FaPlus />
                  Add Media
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
                {currentItems.map((item) => (
                  <div
                    key={item._id}
                    className="relative bg-white rounded-3xl overflow-hidden shadow hover:shadow-lg transition"
                  >
                    {/* DELETE BUTTON — TOP RIGHT (NO OVERLAY) */}
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="absolute cursor-pointer top-2 right-2 z-10 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow"
                    >
                      <FaTrash size={12} />
                    </button>

                    <div className="aspect-square overflow-hidden">
                      {/* IMAGE */}
                      {item.type === "image" && (
                        <img
                          src={import.meta.env.VITE_UPLOADS + item.file}
                          className="w-full h-full object-cover"
                        />
                      )}

                      {/* VIDEO — FULLY PLAYABLE */}
                      {item.type === "video" && (
                        <video
                          src={import.meta.env.VITE_UPLOADS + item.file}
                          className="w-full h-full object-cover"
                          controls
                        />
                      )}

                      {/* SOCIAL CARD */}
                      {item.type === "social" && (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-amber-50 text-center p-3 gap-1">
                          <FaShareAlt className="text-xl text-amber-600" />

                          {/* PLATFORM */}
                          <p className="text-xs font-semibold text-gray-800">
                            {item.platform}
                          </p>

                          {/* TITLE */}
                          {item.title && (
                            <p className="text-xs text-gray-700 font-medium">
                              {item.title}
                            </p>
                          )}

                          {/* LINK */}
                          {item.url && (
                            <a
                              href={item.url}
                              target="_blank"
                              className="text-[10px] text-blue-600 break-all"
                            >
                              {item.url}
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {currentItems.length === 0 && (
                <div className="mt-12 text-center text-gray-500">
                  <FaFolder size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-lg">No media in this section.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>

      {/* MODAL — SAME STYLE AS BLOGS */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-4xl p-6 w-full max-w-lg space-y-3">
            <h2 className="font-bold text-lg">Add Media</h2>
            {activeTab !== "social" && (
              <input
                type="file"
                className="w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl"
                onChange={handleFileChange}
              />
            )}
            {activeTab === "social" && (
              <>
                <input
                  placeholder="Platform"
                  className="w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl"
                  value={form.platform}
                  onChange={(e) =>
                    setForm({ ...form, platform: e.target.value })
                  }
                />
                <input
                  placeholder="URL"
                  className="w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl"
                  value={form.url}
                  onChange={(e) => setForm({ ...form, url: e.target.value })}
                />
                <input
                  placeholder="Title"
                  className="w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded-2xl"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-amber-700 text-white px-4 py-2 rounded-2xl"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Media;
