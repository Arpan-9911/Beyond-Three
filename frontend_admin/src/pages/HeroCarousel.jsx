import React, { useState } from 'react'
import DesktopHeader from '../components/layout/DesktopHeader'
import MobileHeader from '../components/layout/MobileHeader'
import Sidebar from '../components/layout/Sidebar'
import Footer from '../components/layout/Footer'
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'

const HeroCarousel = () => {

  const [items, setItems] = useState([])

  const emptyForm = {
    image: "",
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
    setEditIndex(index)
    setShowModal(true)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const preview = URL.createObjectURL(file)
    setForm({ ...form, image: preview })
  }

  const handleSave = () => {
    if (editIndex !== null) {
      const updated = [...items]
      updated[editIndex] = form
      setItems(updated)
    } else {
      setItems([...items, form])
    }
    setShowModal(false)
  }

  const handleDelete = (index) => {
    setItems(items.filter((_, i) => i !== index))
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
            {items.map((item, index) => (
              <div key={index} className='bg-white rounded-4xl shadow-xl overflow-hidden'>
                <div className='h-48 w-full overflow-hidden'>
                  <img src={item.image} className='w-full h-full object-fill' />
                </div>
                <div className='p-4 space-y-1'>
                  <h2 className='font-bold text-lg'>{item.name.en}</h2>
                  <h3 className='text-sm text-gray-600'>{item.name.hi}</h3>
                  <p className='text-sm italic'>"{item.quote.en}"</p>
                  <p className='text-sm text-gray-600 italic'>"{item.quote.hi}"</p>
                  <div className='flex gap-3 pt-2'>
                    <button onClick={() => openEdit(index)} className='text-blue-600'>
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(index)} className='text-red-600'>
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
      {showModal && (
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center p-4'>
          <div className='bg-white rounded-4xl p-6 w-full max-w-lg space-y-2'>
            <h2 className='font-bold text-lg'>
              {editIndex !== null ? "Edit Slide" : "Add Slide"}
            </h2>
            <input
              type="file"
              accept="image/*"
              className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none'
              onChange={handleImageChange}
            />
            {form.image && (
              <img src={form.image} className='h-40 w-full object-cover rounded-2xl' />
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