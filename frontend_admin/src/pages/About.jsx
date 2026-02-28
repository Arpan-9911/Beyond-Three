import React, { useEffect, useState } from "react";
import DesktopHeader from "../components/layout/DesktopHeader";
import MobileHeader from "../components/layout/MobileHeader";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";
import {
  FaSave,
  FaPlus,
  FaTrash,
  FaEdit,
  FaFolder,
  FaFileAlt,
  FaQuestionCircle,
  FaDownload,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  updateFounder,
  updateMethodology,
  updateWhoWeAre,
  updateMissionVision,
  addDocument,
  deleteDocument,
  addFaq,
  updateFaq,
  deleteFaq,
} from "../functions/about";
import RichTextEditor from "../components/editor/RichTextEditor";


const categories = [
  { _id: "1", name: { en: "Founder", hi: "संस्थापक" } },
  { _id: "2", name: { en: "Who We Are", hi: "हमारे बारे में" } },
  { _id: "3", name: { en: "Methodology", hi: "पद्धधती" } },
  { _id: "4", name: { en: "Mission & Vision", hi: "मिशन और दृष्टिकोण" } },
  { _id: "5", name: { en: "Legal Documents", hi: "कानूनी दस्तावेज़" } },
  { _id: "6", name: { en: "FAQs", hi: "सामान्य प्रश्न" } },
];

const About = () => {
  const [activeCategory, setActiveCategory] = useState("1");
  const about = useSelector((state) => state.about);
  const dispatch = useDispatch();

  const [founderData, setFounderData] = useState({
    image: "",
    imagePreview: "",
    name: { en: "", hi: "" },
    title: { en: "", hi: "" },
    description: { en: "", hi: "" },
    backendImage: "",
  });
  const [whoWeAreData, setWhoWeAreData] = useState({
    description: { en: "", hi: "" },
  });
  const [methodologyData, setMethodologyData] = useState({
    description: { en: "", hi: "" },
  });
  const [missionVisionData, setMissionVisionData] = useState({
    mission: { en: "", hi: "" },
    vision: { en: "", hi: "" },
  });
  const [documents, setDocuments] = useState([]);
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    if (about) {
      setFounderData({
        image: "",
        imagePreview: about.founder?.image || "",
        backendImage: about.founder?.image || "",
        name: {
          en: about.founder?.name?.en || "",
          hi: about.founder?.name?.hi || "",
        },
        title: {
          en: about.founder?.title?.en || "",
          hi: about.founder?.title?.hi || "",
        },
        description: {
          en: about.founder?.description?.en || "",
          hi: about.founder?.description?.hi || "",
        },
      });
      setMethodologyData({
        description: {
          en: about.methodology?.description?.en || "",
          hi: about.methodology?.description?.hi || "",
        },
      });
      setWhoWeAreData({
        description: {
          en: about.whoWeAre?.description?.en || "",
          hi: about.whoWeAre?.description?.hi || "",
        },
      });
      setMissionVisionData({
        mission: {
          en: about.missionVision?.mission?.en || "",
          hi: about.missionVision?.mission?.hi || "",
        },
        vision: {
          en: about.missionVision?.vision?.en || "",
          hi: about.missionVision?.vision?.hi || "",
        },
      });
      setDocuments(about.documents || []);
      setFaqs(about.faqs || []);
    }
  }, [about]);

  const [showDocModal, setShowDocModal] = useState(false);
  const [docForm, setDocForm] = useState({
    title: { en: "", hi: "" },
    file: null,
  });
  const [showFaqModal, setShowFaqModal] = useState(false);
  const [editFaqIndex, setEditFaqIndex] = useState(null);
  const [faqForm, setFaqForm] = useState({
    question: { en: "", hi: "" },
    answer: { en: "", hi: "" },
  });

  // --- Founder Handlers ---
  const handleFounderImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFounderData({
      ...founderData,
      image: file,
      imagePreview: URL.createObjectURL(file),
    });
  };

  // --- Document Handlers ---
  const openAddDoc = () => {
    setDocForm({ title: { en: "", hi: "" }, file: null });
    setShowDocModal(true);
  };

  const handleSaveDoc = async () => {
    if (!docForm.title.en.trim() && !docForm.title.hi.trim()) return toast.error("Either English or Hindi title is required");
    if (!docForm.file) return toast.error("Document is required");

    const formData = new FormData();
    formData.append("title", JSON.stringify(docForm.title));
    formData.append("document", docForm.file);
    try {
      await dispatch(addDocument(formData));
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Failed to add document");
    } finally {
      setShowDocModal(false);
      setDocForm({ title: { en: "", hi: "" }, file: null });
    }
  };


  const handleDeleteDoc = async (id) => {
    if (!window.confirm("Delete this document?")) return;
    try {
      await dispatch(deleteDocument(id));
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Failed to delete document");
    }
  };

  // --- FAQ Handlers ---
  const openAddFaq = () => {
    setFaqForm({ question: { en: "", hi: "" }, answer: { en: "", hi: "" } });
    setEditFaqIndex(null);
    setShowFaqModal(true);
  };

  const openEditFaq = (index) => {
    setFaqForm(faqs[index]);
    setEditFaqIndex(index);
    setShowFaqModal(true);
  };

  const handleSaveFaq = async () => {
    if (!faqForm.question.en.trim()) return toast.error("Question (English) is required");
    try {
      if (editFaqIndex !== null) {
        await dispatch(updateFaq(editFaqIndex, faqForm));
      } else {
        await dispatch(addFaq(faqForm));
      }

      setShowFaqModal(false);
      setEditFaqIndex(null);
      setFaqForm({
        question: { en: "", hi: "" },
        answer: { en: "", hi: "" },
      });
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Failed to save FAQ");
    }
  };

  const handleDeleteFaq = async (id) => {
    if (!window.confirm("Delete this FAQ?")) return;
    try {
      await dispatch(deleteFaq(id));
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Failed to delete FAQ");
    }
  };

  const handleSave = async () => {
    try {
      if (activeCategory === "1") {
        const formData = new FormData();
        formData.append("name", JSON.stringify(founderData.name));
        formData.append("title", JSON.stringify(founderData.title));
        formData.append("description", JSON.stringify(founderData.description));
        if (founderData.image) {
          formData.append("image", founderData.image);
        }
        await dispatch(updateFounder(formData));
      }
      if (activeCategory === "2") {
        await dispatch(updateWhoWeAre(whoWeAreData));
      }
      if (activeCategory === "3") {
        await dispatch(updateMethodology(methodologyData));
      }
      if (activeCategory === "4") {
        await dispatch(updateMissionVision(missionVisionData));
      }
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Update failed");
    }
  };

  const inputClass = "w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none";
  const textareaClass = "w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none resize-none";
  const modalInputClass = "w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none";

  // --- Render Content for Active Category ---
  const renderContent = () => {
    switch (activeCategory) {
      case "1":
        return renderFounder();
      case "2":
        return renderWhoWeAre();
      case "3":
        return renderMethodology();
      case "4":
        return renderMissionVision();
      case "5":
        return renderLegalDocuments();
      case "6":
        return renderFaqs();
      default:
        return renderCustomCategory();
    }
  };

  const renderFounder = () => (
    <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
      <div className="flex justify-between items-center border-b pb-2">
        <h2 className="font-bold text-lg">Founder Details</h2>
        <button
          onClick={handleSave}
          className="cursor-pointer flex gap-2 items-center bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition text-sm"
        >
          <FaSave size={14} />
          <span>Save</span>
        </button>
      </div>

      {/* Image Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-sm mx-auto">
        {/* Current Backend Image */}
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-600 mb-1">Current Image</span>
          <div className="w-full aspect-square border border-dashed border-gray-300 rounded-xl flex items-center justify-center overflow-hidden bg-gray-50">
            {founderData.backendImage ? (
              <img
                src={import.meta.env.VITE_UPLOADS + founderData.backendImage}
                alt="Current Founder"
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-gray-400 text-center p-2">
                No image from backend
              </span>
            )}
          </div>
        </div>

        {/* New Image Upload */}
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-600 mb-1">New Image</span>
          <div className="w-full aspect-square border border-dashed border-gray-300 rounded-xl flex items-center justify-center overflow-hidden bg-gray-50 relative">
            {!founderData.imagePreview ? (
              <label className="cursor-pointer flex flex-col items-center justify-center h-full w-full text-gray-400 hover:text-amber-600 transition">
                <div className="flex flex-col items-center gap-2">
                  <FaPlus size={24} />
                  <span>Select Image</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFounderImageChange}
                />
              </label>
            ) : (
              <div className="relative w-full h-full">
                <img
                  src={!founderData.image ? import.meta.env.VITE_UPLOADS + founderData.imagePreview : founderData.imagePreview}
                  alt="Preview"
                  className="object-cover w-full h-full"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    onClick={() =>
                      setFounderData({
                        ...founderData,
                        image: null,
                        imagePreview: "",
                      })
                    }
                    className="bg-red-600 text-white px-2 py-1 text-xs rounded-full hover:bg-red-700 transition"
                  >
                    Remove
                  </button>
                  <label className="bg-blue-600 text-white px-2 py-1 text-xs rounded-full cursor-pointer hover:bg-blue-700 transition">
                    Change
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFounderImageChange}
                    />
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Name */}
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="text-sm text-gray-600 mb-1 block">
            Name (English)
          </label>
          <input
            className={inputClass}
            value={founderData.name.en}
            onChange={(e) =>
              setFounderData({
                ...founderData,
                name: { ...founderData.name, en: e.target.value },
              })
            }
          />
        </div>
        <div>
          <label className="text-sm text-gray-600 mb-1 block">
            Name (Hindi)
          </label>
          <input
            className={inputClass}
            value={founderData.name.hi}
            onChange={(e) =>
              setFounderData({
                ...founderData,
                name: { ...founderData.name, hi: e.target.value },
              })
            }
          />
        </div>
      </div>

      {/* Title */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-600 mb-1 block">
            Title (English)
          </label>
          <input
            className={inputClass}
            value={founderData.title.en}
            onChange={(e) =>
              setFounderData({
                ...founderData,
                title: { ...founderData.title, en: e.target.value },
              })
            }
          />
        </div>
        <div>
          <label className="text-sm text-gray-600 mb-1 block">
            Title (Hindi)
          </label>
          <input
            className={inputClass}
            value={founderData.title.hi}
            onChange={(e) =>
              setFounderData({
                ...founderData,
                title: { ...founderData.title, hi: e.target.value },
              })
            }
          />
        </div>
      </div>

      {/* Description */}
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        <div>
          <label className="text-sm text-gray-600 mb-1 block">
            Description (English)
          </label>
          <RichTextEditor
            value={founderData.description.en}
            onChange={(html) =>
              setFounderData({
                ...founderData,
                description: { ...founderData.description, en: html },
              })
            }
          />
        </div>
        <div>
          <label className="text-sm text-gray-600 mb-1 block">
            Description (Hindi)
          </label>
          <RichTextEditor
            value={founderData.description.hi}
            onChange={(html) =>
              setFounderData({
                ...founderData,
                description: { ...founderData.description, hi: html },
              })
            }
          />
        </div>
      </div>
    </div>
  );

  const renderWhoWeAre = () => (
    <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
      <div className="flex justify-between items-center border-b pb-2">
        <h2 className="font-bold text-lg">Who We Are</h2>
        <button
          onClick={handleSave}
          className="cursor-pointer flex gap-2 items-center bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition text-sm"
        >
          <FaSave size={14} />
          <span>Save</span>
        </button>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        <div>
          <label className="text-sm text-gray-600 mb-1 block">
            Description (English)
          </label>
          <RichTextEditor
            value={whoWeAreData.description.en}
            onChange={(html) =>
              setWhoWeAreData({
                ...whoWeAreData,
                description: { ...whoWeAreData.description, en: html },
              })
            }
          />
        </div>
        <div>
          <label className="text-sm text-gray-600 mb-1 block">
            Description (Hindi)
          </label>
          <RichTextEditor
            value={whoWeAreData.description.hi}
            onChange={(html) =>
              setWhoWeAreData({
                ...whoWeAreData,
                description: { ...whoWeAreData.description, hi: html },
              })
            }
          />
        </div>
      </div>
    </div>
  );

  const renderMethodology = () => (
    <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
      <div className="flex justify-between items-center border-b pb-2">
        <h2 className="font-bold text-lg">Values</h2>
        <button
          onClick={handleSave}
          className="cursor-pointer flex gap-2 items-center bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition text-sm"
        >
          <FaSave size={14} />
          <span>Save</span>
        </button>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        <div>
          <label className="text-sm text-gray-600 mb-1 block">
            Description (English)
          </label>
          <RichTextEditor
            value={methodologyData.description.en}
            onChange={(html) =>
              setMethodologyData({
                ...methodologyData,
                description: { ...methodologyData.description, en: html },
              })
            }
          />
        </div>
        <div>
          <label className="text-sm text-gray-600 mb-1 block">
            Description (Hindi)
          </label>
          <RichTextEditor
            value={methodologyData.description.hi}
            onChange={(html) =>
              setMethodologyData({
                ...methodologyData,
                description: { ...methodologyData.description, hi: html },
              })
            }
          />
        </div>
      </div>
    </div>
  );

  const renderMissionVision = () => (
    <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
      <div className="flex justify-between items-center border-b pb-2">
        <h2 className="font-bold text-lg">Mission & Vision</h2>
        <button
          onClick={handleSave}
          className="cursor-pointer flex gap-2 items-center bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition text-sm"
        >
          <FaSave size={14} />
          <span>Save</span>
        </button>
      </div>
      <div>
        <label className="text-sm text-gray-600 mb-1 block">
          Mission (English)
        </label>
        <textarea
          rows={4}
          className={textareaClass}
          value={missionVisionData.mission.en}
          onChange={(e) =>
            setMissionVisionData({
              ...missionVisionData,
              mission: { ...missionVisionData.mission, en: e.target.value },
            })
          }
        />
      </div>
      <div>
        <label className="text-sm text-gray-600 mb-1 block">
          Mission (Hindi)
        </label>
        <textarea
          rows={4}
          className={textareaClass}
          value={missionVisionData.mission.hi}
          onChange={(e) =>
            setMissionVisionData({
              ...missionVisionData,
              mission: { ...missionVisionData.mission, hi: e.target.value },
            })
          }
        />
      </div>
      <div>
        <label className="text-sm text-gray-600 mb-1 block">
          Vision (English)
        </label>
        <textarea
          rows={4}
          className={textareaClass}
          value={missionVisionData.vision.en}
          onChange={(e) =>
            setMissionVisionData({
              ...missionVisionData,
              vision: { ...missionVisionData.vision, en: e.target.value },
            })
          }
        />
      </div>
      <div>
        <label className="text-sm text-gray-600 mb-1 block">
          Vision (Hindi)
        </label>
        <textarea
          rows={4}
          className={textareaClass}
          value={missionVisionData.vision.hi}
          onChange={(e) =>
            setMissionVisionData({
              ...missionVisionData,
              vision: { ...missionVisionData.vision, hi: e.target.value },
            })
          }
        />
      </div>
    </div>
  );

  const renderLegalDocuments = () => (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <h2 className="font-bold text-lg">Legal Documents</h2>
        <button
          onClick={openAddDoc}
          className="cursor-pointer flex gap-2 items-center bg-amber-700 text-white px-3 py-1.5 rounded-lg hover:bg-amber-800 transition text-sm"
        >
          <FaPlus size={12} />
          <span>Add Document</span>
        </button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((doc, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-xl p-4 flex gap-3 items-start"
          >
            <div className="bg-amber-100 text-amber-700 p-2.5 rounded-full shrink-0">
              <FaFileAlt size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm truncate">{doc.title.en}</h3>
              <p className="text-xs text-gray-500 truncate">{doc.title.hi}</p>
              <div className="flex gap-2 mt-2">
                <a href={import.meta.env.VITE_UPLOADS + doc.url} target="_blank">
                  <FaDownload size={14} />
                </a>
                <button
                  onClick={() => handleDeleteDoc(index)}
                  className="text-red-600 cursor-pointer"
                >
                  <FaTrash size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {documents.length === 0 && (
        <p className="text-gray-400 text-sm text-center py-4">
          No documents added yet.
        </p>
      )}
    </div>
  );

  const renderFaqs = () => (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <h2 className="font-bold text-lg">FAQs</h2>
        <button
          onClick={openAddFaq}
          className="cursor-pointer flex gap-2 items-center bg-amber-700 text-white px-3 py-1.5 rounded-lg hover:bg-amber-800 transition text-sm"
        >
          <FaPlus size={12} />
          <span>Add FAQ</span>
        </button>
      </div>
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="flex gap-2 items-start flex-1 min-w-0">
                <FaQuestionCircle className="text-amber-600 mt-1 shrink-0" />
                <div className="min-w-0">
                  <h3 className="font-semibold text-sm">{faq.question.en}</h3>
                  <p className="text-xs text-gray-500">{faq.question.hi}</p>
                  <p className="text-sm text-gray-600 mt-1">{faq.answer.en}</p>
                  <p className="text-sm text-gray-600">{faq.answer.hi}</p>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => openEditFaq(index)}
                  className="text-blue-600 cursor-pointer"
                >
                  <FaEdit size={14} />
                </button>
                <button
                  onClick={() => handleDeleteFaq(index)}
                  className="text-red-600 cursor-pointer"
                >
                  <FaTrash size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {faqs.length === 0 && (
        <p className="text-gray-400 text-sm text-center py-4">
          No FAQs added yet.
        </p>
      )}
    </div>
  );

  const renderCustomCategory = () => {
    const cat = categories.find((c) => c._id === activeCategory);
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="font-bold text-lg">
            {cat?.name.en || "Custom Section"}
          </h2>
          <button
            onClick={handleSave}
            className="cursor-pointer flex gap-2 items-center bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition text-sm"
          >
            <FaSave size={14} />
            <span>Save</span>
          </button>
        </div>
        <p className="text-gray-400 text-sm text-center py-8">
          This is a custom category. Content management will be available after
          backend integration.
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-dvh flex bg-amber-100">
      <div className="h-dvh sticky top-0 w-64 overflow-hidden max-md:hidden">
        <Sidebar />
      </div>
      <div className="flex-1">
        <div className="max-md:hidden">
          <DesktopHeader heading={"About Us"} />
        </div>
        <div className="md:hidden">
          <MobileHeader heading={"About Us"} />
        </div>
        <div className="min-h-[92.5dvh] p-4">
          <div className="flex gap-6 max-lg:flex-col">
            {/* Categories Sidebar */}
            <div className="lg:w-64 shrink-0">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-amber-700 font-semibold uppercase tracking-wide text-sm">
                  Sections
                </h2>
              </div>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat._id}
                    onClick={() => setActiveCategory(cat._id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition cursor-pointer ${
                      activeCategory === cat._id
                        ? "bg-amber-600 text-white shadow-lg"
                        : "bg-white hover:bg-amber-50 text-gray-700"
                    }`}
                  >
                    <FaFolder size={18} />
                    <div className="flex flex-col text-xs text-left">
                      <span className="font-medium">{cat.name.en}</span>
                      <span className="font-medium">{cat.name.hi}</span>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                      {activeCategory === cat._id && (
                        <span className="w-2 h-2 bg-white rounded-full"></span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">{renderContent()}</div>
          </div>
        </div>
        <Footer />
      </div>

      {/* Document Modal */}
      {showDocModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-4xl p-6 w-full max-w-md space-y-3">
            <h2 className="font-bold text-lg">Add Document</h2>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">
                Title (English)
              </label>
              <input
                placeholder="Enter document title"
                className={modalInputClass}
                value={docForm.title.en}
                onChange={(e) =>
                  setDocForm({
                    ...docForm,
                    title: { ...docForm.title, en: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">
                Title (Hindi)
              </label>
              <input
                placeholder="दस्तावेज़ शीर्षक दर्ज करें"
                className={modalInputClass}
                value={docForm.title.hi}
                onChange={(e) =>
                  setDocForm({
                    ...docForm,
                    title: { ...docForm.title, hi: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">
                PDF File
              </label>
              <input
                type="file"
                accept=".pdf"
                className={modalInputClass}
                onChange={(e) =>
                  setDocForm({ ...docForm, file: e.target.files[0] || null })
                }
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowDocModal(false)}
                className="px-4 py-2 border rounded-2xl cursor-pointer hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveDoc}
                className="cursor-pointer bg-amber-700 text-white px-4 py-2 rounded-2xl hover:bg-amber-800 transition active:scale-95"
              >Add</button>
            </div>
          </div>
        </div>
      )}

      {/* FAQ Modal */}
      {showFaqModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-4xl p-6 w-full max-w-md space-y-3 max-h-[90vh] overflow-y-auto">
            <h2 className="font-bold text-lg">
              {editFaqIndex !== null ? "Edit FAQ" : "Add FAQ"}
            </h2>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">
                Question (English)
              </label>
              <input
                placeholder="Enter question"
                className={modalInputClass}
                value={faqForm.question.en}
                onChange={(e) =>
                  setFaqForm({
                    ...faqForm,
                    question: { ...faqForm.question, en: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">
                Question (Hindi)
              </label>
              <input
                placeholder="प्रश्न दर्ज करें"
                className={modalInputClass}
                value={faqForm.question.hi}
                onChange={(e) =>
                  setFaqForm({
                    ...faqForm,
                    question: { ...faqForm.question, hi: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">
                Answer (English)
              </label>
              <textarea
                rows={3}
                placeholder="Enter answer"
                className="w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none resize-none"
                value={faqForm.answer.en}
                onChange={(e) =>
                  setFaqForm({
                    ...faqForm,
                    answer: { ...faqForm.answer, en: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">
                Answer (Hindi)
              </label>
              <textarea
                rows={3}
                placeholder="उत्तर दर्ज करें"
                className="w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none resize-none"
                value={faqForm.answer.hi}
                onChange={(e) =>
                  setFaqForm({
                    ...faqForm,
                    answer: { ...faqForm.answer, hi: e.target.value },
                  })
                }
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowFaqModal(false)}
                className="px-4 py-2 border rounded-2xl cursor-pointer hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveFaq}
                className="cursor-pointer bg-amber-700 text-white px-4 py-2 rounded-2xl hover:bg-amber-800 transition active:scale-95"
              >
                {editFaqIndex !== null ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
