import React, { useState, useEffect } from "react";
import DesktopHeader from "../components/layout/DesktopHeader";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";
import { FaFolder, FaPlus, FaTrash, FaSave } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { saveHeading, saveImages, saveQuotes } from "../functions/heroCarousel";

const defaultSections = [
  { _id: "1", name: { en: "Heading", hi: "मुख्य शीर्षक" } },
  { _id: "2", name: { en: "Images", hi: "चित्र" } },
  { _id: "3", name: { en: "Quotes", hi: "उद्धरण" } },
];

const HeroCarousel = () => {
  const dispatch = useDispatch();
  const hero = useSelector((state) => state.hero);

  const [sections] = useState(defaultSections);
  const [activeSection, setActiveSection] = useState("1");

  // Local states
  const [heading, setHeading] = useState({ en: "", hi: "" });
  const [images, setImages] = useState(Array(5).fill(null));
  const [quotes, setQuotes] = useState([
    { title: { en: "", hi: "" }, desc: { en: "", hi: "" } },
  ]);

  // Sync Redux hero to local state
  useEffect(() => {
    if (hero) {
      setHeading(hero.heading || { en: "", hi: "" });
      setQuotes(
        hero.quotes?.length
          ? hero.quotes
          : [{ title: { en: "", hi: "" }, desc: { en: "", hi: "" } }],
      );
      setImages(() => {
        const existing =
          hero.images?.map((url) => ({
            file: null,
            preview: import.meta.env.VITE_UPLOADS + url,
          })) || [];
        while (existing.length < 5) existing.push(null);
        return existing.slice(0, 5);
      });
    }
  }, [hero]);

  /* ================= HANDLERS ================= */

  const handleSave = async () => {
    try {
      if (activeSection === "1") {
        await dispatch(saveHeading({ heading }));
      } else if (activeSection === "2") {
        const formData = new FormData();

        // Collect indexes of new files
        const newFilesIndexes = [];

        images.forEach((img, idx) => {
          if (img?.file) {
            formData.append("images", img.file); // file
            newFilesIndexes.push(idx); // track slot
          }
        });

        // Send JSON arrays as strings
        formData.append("imageIndexes", JSON.stringify(newFilesIndexes));

        // Send existing images paths
        const existingPaths = images.map((img) =>
          img && !img.file
            ? img.preview.replace(import.meta.env.VITE_UPLOADS, "")
            : null,
        );
        formData.append("existingImages", JSON.stringify(existingPaths));

        await dispatch(saveImages(formData));
      } else if (activeSection === "3") {
        await dispatch(saveQuotes({ quotes }));
      }
    } catch (err) {
      toast.error(err.response?.data?.msg || "Something went wrong");
    }
  };

  const handleImageChange = (index, file) => {
    if (!file) return;
    const updated = [...images];
    updated[index] = { file, preview: URL.createObjectURL(file) };
    setImages(updated);
  };

  const addQuote = () => {
    setQuotes([
      ...quotes,
      { title: { en: "", hi: "" }, desc: { en: "", hi: "" } },
    ]);
  };

  const removeQuote = (index) => {
    setQuotes(quotes.filter((_, i) => i !== index));
  };

  const inputClass =
    "w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none";
  const textareaClass =
    "w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none resize-none";

  /* ================= RENDER SECTIONS ================= */

  const renderHeading = () => (
    <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
      <div className="flex justify-between items-center border-b pb-2">
        <h2 className="font-bold text-lg">Hero Heading</h2>
        <button
          onClick={handleSave}
          className="flex gap-2 items-center bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition text-sm"
        >
          <FaSave size={14} /> Save
        </button>
      </div>
      <div>
        <label className="text-sm text-gray-600 mb-1 block">
          Heading (English)
        </label>
        <input
          className={inputClass}
          value={heading.en}
          onChange={(e) => setHeading({ ...heading, en: e.target.value })}
        />
      </div>
      <div>
        <label className="text-sm text-gray-600 mb-1 block">
          Heading (Hindi)
        </label>
        <input
          className={inputClass}
          value={heading.hi}
          onChange={(e) => setHeading({ ...heading, hi: e.target.value })}
        />
      </div>
    </div>
  );

  const renderImages = () => (
    <div className="bg-white rounded-3xl shadow-xl p-8 space-y-8 border border-amber-100">
      <div className="flex justify-between items-center border-b border-amber-100 pb-4">
        <div>
          <h2 className="font-bold text-xl text-gray-800">Hero Images</h2>
          <p className="text-sm text-gray-500 mt-1">
            Upload exactly 5 high-quality images for hero collage.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="flex gap-2 items-center bg-amber-700 text-white px-5 py-2.5 rounded-xl hover:bg-amber-800 transition text-sm shadow-md active:scale-95"
        >
          <FaSave size={14} /> Save Changes
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {images.map((img, index) => (
          <div
            key={index}
            className="relative group h-48 rounded-2xl overflow-hidden transition-all duration-300"
          >
            {img ? (
              <>
                <img
                  src={img.preview}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-3">
                  <label className="cursor-pointer bg-white text-amber-700 px-4 py-1.5 rounded-lg text-xs font-semibold shadow hover:bg-amber-100 transition">
                    Change
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(e) =>
                        handleImageChange(index, e.target.files[0])
                      }
                    />
                  </label>
                  <button
                    onClick={() => {
                      const updated = [...images];
                      updated[index] = null;
                      setImages(updated);
                    }}
                    className="bg-red-600 text-white px-4 py-1.5 rounded-lg text-xs font-semibold shadow hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </>
            ) : (
              <label className="flex flex-col items-center justify-center h-full border-2 border-dashed border-amber-300 rounded-2xl cursor-pointer bg-amber-50 hover:bg-amber-100 transition-all text-center p-6">
                <div className="text-amber-600 text-4xl font-light mb-2">+</div>
                <p className="text-sm font-medium text-gray-700">
                  Upload Image {index + 1}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Click to choose file
                </p>
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => handleImageChange(index, e.target.files[0])}
                />
              </label>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderQuotes = () => (
    <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
      <div className="flex justify-between items-center border-b pb-2">
        <h2 className="font-bold text-lg">Hero Quotes</h2>
        <div className="flex gap-3">
          <button
            onClick={addQuote}
            className="flex gap-2 items-center bg-amber-600 text-white px-3 py-1.5 rounded-lg text-sm"
          >
            <FaPlus size={12} /> Add
          </button>
          <button
            onClick={handleSave}
            className="flex gap-2 items-center bg-amber-700 text-white px-4 py-2 rounded-lg text-sm"
          >
            <FaSave size={14} /> Save
          </button>
        </div>
      </div>
      {quotes.map((quote, index) => (
        <div key={index} className="bg-gray-50 rounded-xl p-4 space-y-3">
          <div className="flex justify-end">
            <button onClick={() => removeQuote(index)} className="text-red-600">
              <FaTrash size={14} />
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              placeholder="Title (English)"
              className={inputClass}
              value={quote.title.en}
              onChange={(e) => {
                const updated = [...quotes];
                updated[index].title.en = e.target.value;
                setQuotes(updated);
              }}
            />
            <input
              placeholder="Title (Hindi)"
              className={inputClass}
              value={quote.title.hi}
              onChange={(e) => {
                const updated = [...quotes];
                updated[index].title.hi = e.target.value;
                setQuotes(updated);
              }}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <textarea
              rows={3}
              placeholder="Description (English)"
              className={textareaClass}
              value={quote.desc.en}
              onChange={(e) => {
                const updated = [...quotes];
                updated[index].desc.en = e.target.value;
                setQuotes(updated);
              }}
            />
            <textarea
              rows={3}
              placeholder="Description (Hindi)"
              className={textareaClass}
              value={quote.desc.hi}
              onChange={(e) => {
                const updated = [...quotes];
                updated[index].desc.hi = e.target.value;
                setQuotes(updated);
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "1":
        return renderHeading();
      case "2":
        return renderImages();
      case "3":
        return renderQuotes();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-dvh flex bg-amber-100">
      <div className="h-dvh sticky top-0 w-64 max-md:hidden">
        <Sidebar />
      </div>

      <div className="flex-1">
        <DesktopHeader heading="Hero Section" />

        <div className="min-h-[92.5dvh] p-4">
          <div className="flex gap-6 max-lg:flex-col">
            {/* Sections Sidebar */}
            <div className="lg:w-64 shrink-0">
              <h2 className="text-amber-700 font-semibold uppercase tracking-wide text-sm mb-4">
                Sections
              </h2>
              <div className="space-y-2">
                {sections.map((sec) => (
                  <button
                    key={sec._id}
                    onClick={() => setActiveSection(sec._id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition ${activeSection === sec._id ? "bg-amber-600 text-white shadow-lg" : "bg-white hover:bg-amber-50 text-gray-700"}`}
                  >
                    <FaFolder size={18} />
                    <div className="flex flex-col text-xs text-left">
                      <span>{sec.name.en}</span>
                      <span>{sec.name.hi}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">{renderContent()}</div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default HeroCarousel;
