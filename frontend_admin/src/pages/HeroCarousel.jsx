import React, { useState } from 'react'
import DesktopHeader from '../components/layout/DesktopHeader'
import MobileHeader from '../components/layout/MobileHeader'
import Sidebar from '../components/layout/Sidebar'
import Footer from '../components/layout/Footer'
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { addHeroCarousel, deleteHeroCarousel, updateHeroCarousel } from "../functions/heroCarousel";

const HeroCarousel = () => {
  const dispatch = useDispatch()
  const items = useSelector(state => state.hero)

  const emptyForm = {
    image: "",
    preview: "",
    name: { en: "", hi: "" },
    quote: { en: "", hi: "" }
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
    const file = e.target.files[0];
    if (!file) return;
    setForm((prev) => ({
      ...prev,
      image: file,
      preview: URL.createObjectURL(file),
    }));
  };

  const handleSave = async () => {
    if(!form.image) return toast.error("Please select an image");
    if(!form.name.en && !form.name.hi) return toast.error("Please enter name");
    if(!form.quote.en && !form.quote.hi) return toast.error("Please enter quote");
    if (editIndex !== null) {
      const formData = new FormData();
      formData.append("image", form.image);
      formData.append("name", JSON.stringify(form.name));
      formData.append("quote", JSON.stringify(form.quote));
      try {
        await dispatch(updateHeroCarousel(editIndex, formData))
      } catch (error) {
        toast.error(error.response.data.msg || "Failed to update hero carousel");
      } finally {
        setShowModal(false)
        setForm(emptyForm)
      }
    } else {
      const formData = new FormData();
      formData.append("image", form.image);
      formData.append("name", JSON.stringify(form.name));
      formData.append("quote", JSON.stringify(form.quote));
      try {
        await dispatch(addHeroCarousel(formData))
      } catch (error) {
        toast.error(error.response.data.msg || "Failed to add hero carousel");
      } finally {
        setShowModal(false)
        setForm(emptyForm)
      }
    }
  }

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteHeroCarousel(id))
    } catch (error) {
      toast.error(error.response.data.msg || "Failed to delete hero carousel");
    }
  }

  return (
    <div className='min-h-dvh flex bg-amber-100'>
      <div className='h-dvh sticky top-0 w-64 overflow-hidden max-md:hidden'>
        <Sidebar />
      </div>
      <div className='flex-1'>
        <div className='max-md:hidden'>
          <DesktopHeader heading={"Hero Carousel"} />
        </div>
        <div className='md:hidden'>
          <MobileHeader heading={"Hero Carousel"} />
        </div>
        <div className='min-h-[92.5dvh] p-4'>
          <div className='md:flex gap-4 justify-between items-center'>
            <div>
              <h1 className='text-xl font-bold'>Carousel Slides</h1>
              <span className='text-amber-700'>
                Manage the homepage hero image rotation.
              </span>
            </div>
            <button onClick={openAdd}
              className='cursor-pointer flex gap-2 items-center bg-amber-700 text-white px-3 py-2 rounded-lg hover:bg-amber-800 transition'>
              <FaPlus />
              <span>Add New Slide</span>
            </button>
          </div>
          <div className='mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {items.map((item) => (
              <div key={item._id} className='bg-white rounded-4xl shadow-xl overflow-hidden'>
                <div className='h-48 w-full overflow-hidden'>
                  <img src={import.meta.env.VITE_UPLOADS + item.image} className='w-full h-full object-fill' />
                </div>
                <div className='p-4 space-y-1'>
                  <h2 className='font-bold text-lg'>{item.name.en}</h2>
                  <h3 className='text-sm text-gray-600'>{item.name.hi}</h3>
                  <p className='text-sm italic'>"{item.quote.en}"</p>
                  <p className='text-sm text-gray-600 italic'>"{item.quote.hi}"</p>
                  <div className='flex gap-3 pt-2'>
                    <button onClick={() => openEdit(items.indexOf(item))} className='text-blue-600'>
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(item._id)} className='text-red-600'>
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Empty state */}
            {items.length === 0 && (
            <div className='mt-12 text-center text-gray-500'>
              <p className='text-lg'>No slides yet.</p>
              <p className='text-sm'>Click "Add New Slide" to add your first slide.</p>
            </div>
          )}
        </div>
        <Footer />
      </div>
      {showModal && (
        <div className='fixed inset-0 overflow-y-auto bg-black/40 flex items-center justify-center p-4'>
          <div className='bg-white rounded-4xl p-6 w-full max-w-lg space-y-2 max-h-[90vh] overflow-y-auto hide-scrollbar'>
            <h2 className='font-bold text-lg'>
              {editIndex !== null ? "Edit Slide" : "Add Slide"}
            </h2>
            <input
              type="file"
              accept="image/*"
              className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none'
              onChange={handleImageChange}
            />
            {form.preview && (
              <img src={form.preview} className='h-40 w-full object-cover rounded-2xl' />
            )}
            <input
              placeholder='Name (English)'
              className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none'
              value={form.name.en}
              onChange={(e) =>
                setForm({ ...form, name: { ...form.name, en: e.target.value } })
              }
            />
            <input
              placeholder='Name (Hindi)'
              className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none'
              value={form.name.hi}
              onChange={(e) =>
                setForm({ ...form, name: { ...form.name, hi: e.target.value } })
              }
            />
            <textarea
              placeholder='Quote (English)'
              className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none'
              value={form.quote.en}
              rows={4}
              onChange={(e) =>
                setForm({ ...form, quote: { ...form.quote, en: e.target.value } })
              }
            />
            <textarea
              placeholder='Quote (Hindi)'
              className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none'
              value={form.quote.hi}
              rows={4}
              onChange={(e) =>
                setForm({ ...form, quote: { ...form.quote, hi: e.target.value } })
              }
            />
            <div className='flex justify-end gap-3'>
              <button onClick={() => setShowModal(false)} className='px-3 py-2 border rounded-2xl cursor-pointer hover:bg-gray-200 transition'>
                Cancel
              </button>
              <button onClick={handleSave}
                className='cursor-pointer bg-amber-700 text-white px-3 py-2 rounded-2xl hover:bg-amber-800 transition active:scale-90'>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default HeroCarousel