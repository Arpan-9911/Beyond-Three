import React, { useState } from 'react'
import DesktopHeader from '../components/layout/DesktopHeader'
import MobileHeader from '../components/layout/MobileHeader'
import Sidebar from '../components/layout/Sidebar'
import Footer from '../components/layout/Footer'
import { FaPlus, FaEdit, FaTrash, FaMapMarkerAlt, FaClock, FaRupeeSign } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { addTour, deleteTour, updateTour } from '../functions/tours'
import { toast } from 'react-toastify'
import RichTextEditor from "../components/editor/RichTextEditor";

const Tours = () => {
  const dispatch = useDispatch()
  const items = useSelector(state => state.tours)
  const emptyForm = {
    image: "",
    preview: "",
    title: { en: "", hi: "" },
    description: { en: "", hi: "" },
    location: { en: "", hi: "" },
    duration: "",
    price: "",
    highlights: { en: "", hi: "" }
  }

  const [showModal, setShowModal] = useState(false)
  const [editIndex, setEditIndex] = useState(null)
  const [form, setForm] = useState(emptyForm)

  const openAdd = () => {
    setForm(emptyForm)
    setEditIndex(null)
    setShowModal(true)
  }

  const openEdit = (index) => {
    setForm(items[index])
    setEditIndex(items[index]._id)
    setShowModal(true)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setForm(prev => ({
      ...prev,
      image: file,
      preview: URL.createObjectURL(file)
    }))
  }

  const handleSave = async () => {
    if(!form.title.en && !form.title.hi) return toast.error("Title is required in at least one language.");
    if(!form.description.en && !form.description.hi) return toast.error("Description is required in at least one language.");
    if(!form.location.en && !form.location.hi) return toast.error("Location is required in at least one language.");
    if(!form.highlights.en && !form.highlights.hi) return toast.error("Highlights are required in at least one language.");
    if(!form.duration) return toast.error("Duration is required.");
    if(!form.price) return toast.error("Price is required.");
    if(!form.image && editIndex === null) return toast.error("Image is required.");

    const formData = new FormData();
    formData.append("duration", form.duration)
    formData.append("price", form.price)
    formData.append("title", JSON.stringify(form.title))
    formData.append("description", JSON.stringify(form.description))
    formData.append("location", JSON.stringify(form.location))
    formData.append("highlights", JSON.stringify(form.highlights))
    if(form.image instanceof File) formData.append("image", form.image);

    try {
      if (editIndex !== null) {
        await dispatch(updateTour(editIndex, formData))
      } else {
        await dispatch(addTour(formData))
      }
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Failed to update tour");
    } finally {
      setShowModal(false)
      setForm(emptyForm)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this tour package?")) return;
    try {
      await dispatch(deleteTour(id))
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Failed to delete tour");
    }
  }

  const truncateText = (text, limit = 100) => {
    return text.length > limit ? text.substring(0, limit) + "..." : text
  }

  return (
    <div className='min-h-dvh flex bg-amber-100'>
      <div className='h-dvh sticky top-0 w-64 overflow-hidden max-md:hidden'>
        <Sidebar />
      </div>
      <div className='flex-1'>
        <div className='max-md:hidden'>
          <DesktopHeader heading={"Tours"} />
        </div>
        <div className='md:hidden'>
          <MobileHeader heading={"Tours"} />
        </div>
        <div className='min-h-[92.5dvh] p-4'>
          <div className='md:flex gap-4 justify-between items-center'>
            <div>
              <h1 className='text-xl font-bold'>Tour Packages</h1>
              <span className='text-amber-700'>
                Manage spiritual and wellness tour packages.
              </span>
            </div>
            <button onClick={openAdd}
              className='cursor-pointer flex gap-2 items-center bg-amber-700 text-white px-3 py-2 rounded-lg hover:bg-amber-800 transition max-md:mt-3'>
              <FaPlus />
              <span>Add Tour Package</span>
            </button>
          </div>

          {/* Tours Grid */}
          <div className='mt-6 grid sm:grid-cols-2 xl:grid-cols-3 gap-6'>
            {items.map((item, index) => (
              <div key={index} className='bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition'>
                <div className='h-44 w-full overflow-hidden relative'>
                  <img src={import.meta.env.VITE_UPLOADS + item.image} className='w-full h-full object-cover' alt={item.title.en} />
                  {item.price && (
                    <span className='absolute bottom-3 right-3 px-3 py-1 bg-amber-600 text-white text-sm font-semibold rounded-full flex items-center gap-1'>
                      <FaRupeeSign size={12} />{item.price}
                    </span>
                  )}
                </div>
                <div className='p-4'>
                  <div className='flex items-start justify-between gap-2'>
                    <div>
                      <h2 className='font-bold text-lg text-gray-800'>{item.title.en}</h2>
                      <h2 className='font-bold text-lg text-gray-800'>{item.title.hi}</h2>
                    </div>
                    <div className='flex gap-2 shrink-0'>
                      <button onClick={() => openEdit(index)} className='text-blue-600 hover:text-blue-800 cursor-pointer'>
                        <FaEdit size={14} />
                      </button>
                      <button onClick={() => handleDelete(item._id)} className='text-red-600 hover:text-red-800 cursor-pointer'>
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </div>
                  <p className='text-gray-600 text-sm mt-1'>{truncateText(item.description.en)}</p>
                  <p className='text-gray-600 text-sm mt-1'>{truncateText(item.description.hi)}</p>
                  <div className='mt-3 flex items-center gap-4 text-sm text-gray-500'>
                    {item.location.en && (
                      <div className='flex items-center gap-1'>
                        <FaMapMarkerAlt size={12} className='text-amber-600' />
                        <span>{item.location.en}</span>
                        <span>| {item.location.hi}</span>
                      </div>
                    )}
                    {item.duration && (
                      <div className='flex items-center gap-1'>
                        <FaClock size={12} className='text-amber-600' />
                        <span>{item.duration}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {items.length === 0 && (
            <div className='mt-12 text-center text-gray-500'>
              <FaMapMarkerAlt size={48} className='mx-auto text-gray-300 mb-4' />
              <p className='text-lg'>No tour packages yet.</p>
              <p className='text-sm'>Click "Add Tour Package" to create your first tour.</p>
            </div>
          )}
        </div>
        <Footer />
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-4xl p-6 w-full max-w-lg space-y-3 max-h-[90vh] overflow-y-auto hide-scrollbar'>
            <h2 className='font-bold text-lg'>
              {editIndex !== null ? "Edit Tour Package" : "Add Tour Package"}
            </h2>

            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Tour Image</label>
              <input type="file" accept="image/*"
                className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none'
                onChange={handleImageChange} />
            </div>
            {form.preview && (
              <img src={form.preview} className='h-40 w-full object-cover rounded-2xl' alt="Preview" />
            )}

            <div className='grid grid-cols-2 gap-3'>
              <div>
                <label className='text-sm text-gray-600 mb-1 block'>Duration</label>
                <input placeholder='e.g., 3 Days / 2 Nights'
                  className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none'
                  value={form.duration}
                  onChange={(e) => setForm({ ...form, duration: e.target.value })} />
              </div>
              <div>
                <label className='text-sm text-gray-600 mb-1 block'>Price (₹)</label>
                <input placeholder='e.g., 5000'
                  className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none'
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })} />
              </div>
            </div>

            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Title (English)</label>
              <input placeholder='Enter tour title in English'
                className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none'
                value={form.title.en}
                onChange={(e) => setForm({ ...form, title: { ...form.title, en: e.target.value } })} />
            </div>

            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Title (Hindi)</label>
              <input placeholder='टूर शीर्षक हिंदी में दर्ज करें'
                className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none'
                value={form.title.hi}
                onChange={(e) => setForm({ ...form, title: { ...form.title, hi: e.target.value } })} />
            </div>

            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Location (English)</label>
              <input placeholder='Enter tour location'
                className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none'
                value={form.location.en}
                onChange={(e) => setForm({ ...form, location: { ...form.location, en: e.target.value } })} />
            </div>

            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Location (Hindi)</label>
              <input placeholder='टूर स्थान हिंदी में दर्ज करें'
                className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none'
                value={form.location.hi}
                onChange={(e) => setForm({ ...form, location: { ...form.location, hi: e.target.value } })} />
            </div>

            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Description (English)</label>
              <RichTextEditor
                value={form.description.en}
                onChange={(html) =>
                  setForm({
                    ...form,
                    description: { ...form.description, en: html },
                  })
                }
              />
            </div>

            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Description (Hindi)</label>
              <RichTextEditor
                value={form.description.hi}
                onChange={(html) =>
                  setForm({
                    ...form,
                    description: { ...form.description, hi: html },
                  })
                }
              />
            </div>

            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Highlights (English)</label>
              <RichTextEditor
                value={form.highlights.en}
                onChange={(html) =>
                  setForm({
                    ...form,
                    highlights: { ...form.highlights, en: html },
                  })
                }
              />
            </div>

            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Highlights (Hindi)</label>
              <RichTextEditor
                value={form.highlights.hi}
                onChange={(html) =>
                  setForm({
                    ...form,
                    highlights: { ...form.highlights, hi: html },
                  })
                }
              />
            </div>

            <div className='flex justify-end gap-3 pt-2'>
              <button onClick={() => setShowModal(false)} className='px-4 py-2 border rounded-2xl cursor-pointer hover:bg-gray-200 transition'>
                Cancel
              </button>
              <button onClick={handleSave}
                className='cursor-pointer bg-amber-700 text-white px-4 py-2 rounded-2xl hover:bg-amber-800 transition active:scale-95'>
                {editIndex !== null ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Tours