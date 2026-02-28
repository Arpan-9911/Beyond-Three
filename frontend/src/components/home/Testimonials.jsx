import React, { useEffect, useState } from "react";
import { FaStar, FaQuoteRight } from "react-icons/fa";
import { useLanguage } from "../../context/LanguageContext";
import { useSelector, useDispatch } from "react-redux";
import { getReviews, addReview } from "../../functions/index"
import { toast } from "react-toastify";

const Testimonials = () => {
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: { en: "", hi: "" },
    text: { en: "", hi: "" },
    stars: 5,
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getReviews());
  }, [dispatch]);

  const testimonials = useSelector((state) => state.review)?.filter((review) => review.status === "approved") || [];
  const testimonialData = {
    title: {
      en: "User Experiences",
      hi: "उपयोगकर्ता अनुभव",
    },
    subtitle: {
      en: "Thousands have transformed their lifestyles",
      hi: "हज़ारों ने अपनी जीवनशैली बदली है",
    },
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({
      name: { en: "", hi: "" },
      text: { en: "", hi: "" },
      stars: 5,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.name.en && !formData.name.hi) return toast.error("Please enter name");
    if(!formData.text.en && !formData.text.hi) return toast.error("Please enter text");
    if(!formData.stars || (formData.stars < 1 || formData.stars > 5)) return toast.error("Please enter rating");
    const data = {
      name: JSON.stringify(formData.name),
      text: JSON.stringify(formData.text),
      stars: formData.stars
    };
    try {
      await dispatch(addReview(data));
      handleClose();
    } catch (error) {
      toast.error(error.response?.data?.msg || "Failed to add review");
    }
  };

  return (
    <>
      <section className="bg-amber-100">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-700">
              {testimonialData.title[lang]}
            </h2>
            <button
              onClick={() => setOpen(true)}
              className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2 rounded-full shadow transition"
            >
              + Add
            </button>
          </div>
          <p className="text-gray-600 mb-8">{testimonialData.subtitle[lang]}</p>
          <div
            className="overflow-x-scroll overflow-y-visible cursor-grab hide-scrollbar"
            onMouseDown={(e) => {
              const slider = e.currentTarget;
              slider.style.cursor = "grabbing";
              const startX = e.pageX - slider.offsetLeft;
              const scrollLeft = slider.scrollLeft;

              const onMouseMove = (e) => {
                const x = e.pageX - slider.offsetLeft;
                const walk = x - startX;
                slider.scrollLeft = scrollLeft - walk;
              };

              const onMouseUp = () => {
                slider.style.cursor = "grab";
                window.removeEventListener("mousemove", onMouseMove);
                window.removeEventListener("mouseup", onMouseUp);
              };

              window.addEventListener("mousemove", onMouseMove);
              window.addEventListener("mouseup", onMouseUp);
            }}
          >
            <div className="flex gap-4 md:gap-8 pb-4">
              {testimonials.map((item) => (
                <div
                  key={item._id}
                  className="min-w-60 md:min-w-80 border-t-3 border-yellow-500 bg-white p-6 rounded-4xl shadow-md hover:shadow-lg transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex gap-1">
                        {[...Array(item.stars)].map((_, i) => (
                          <FaStar key={i} className="text-yellow-500 text-lg" />
                        ))}
                      </div>
                      <FaQuoteRight className="text-yellow-100 text-4xl" />
                    </div>
                    <p className="text-gray-700 italic mb-4 leading-relaxed">
                      {item?.text?.[lang] || item?.text?.en || item?.text?.hi || ""}
                    </p>
                  </div>
                  <h4 className="font-bold text-amber-800">
                    {item?.name?.[lang] || item?.name?.en || item?.name?.hi || ""}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-amber-700 mb-4">
              Add Testimonial
            </h3>
            <input
              type="text"
              value={formData.name.en}
              onChange={(e) => setFormData({ ...formData, name: { ...formData.name, en: e.target.value } })}
              placeholder="Name (English)"
              className="w-full mb-2 px-4 py-2 border rounded-full"
            />
            <input
              type="text"
              value={formData.name.hi}
              onChange={(e) => setFormData({ ...formData, name: { ...formData.name, hi: e.target.value } })}
              placeholder="नाम (हिंदी)"
              className="w-full mb-3 px-4 py-2 border rounded-full"
            />
            <textarea
              value={formData.text.en}
              onChange={(e) => setFormData({ ...formData, text: { ...formData.text, en: e.target.value } })}
              placeholder="Testimonial (English)"
              className="w-full mb-2 px-4 py-2 border rounded-xl"
              rows="3"
            />
            <textarea
              value={formData.text.hi}
              onChange={(e) => setFormData({ ...formData, text: { ...formData.text, hi: e.target.value } })}
              placeholder="प्रशंसापत्र (हिंदी)"
              className="w-full mb-3 px-4 py-2 border rounded-xl"
              rows="3"
            />
            <select
              value={formData.stars}
              onChange={(e) =>
                setFormData({ ...formData, stars: Number(e.target.value) })
              }
              className="w-full mb-4 px-4 py-2 border rounded-full"
            >
              {[...Array(5)].map((_, i) => (
                <option value={i + 1} key={i}>
                  {i + 1} Stars
                </option>
              ))}
            </select>
            <div className="flex justify-end gap-3">
              <button
                onClick={handleClose}
                className="px-4 py-2 rounded-full border"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-amber-600 text-white px-5 py-2 rounded-full">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Testimonials;
