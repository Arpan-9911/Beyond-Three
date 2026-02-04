import React, { useState } from 'react'
import DesktopHeader from '../components/layout/DesktopHeader'
import MobileHeader from '../components/layout/MobileHeader'
import Sidebar from '../components/layout/Sidebar'
import Footer from '../components/layout/Footer'
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'

const News = () => {

  const [items, setItems] = useState([])

  const emptyForm = {
    image: "",
    title: { en: "", hi: "" },
    content: { en: "", hi: "" },
    date: ""
  }

  const [showModal, setShowModal] = useState(false)
  const [editIndex, setEditIndex] = useState(null)
  const [form, setForm] = useState(emptyForm)

  const openAdd = () => {
    setForm({ ...emptyForm, date: new Date().toISOString().split('T')[0] })
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

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase()
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
          <DesktopHeader heading={"News & Updates"} />
        </div>
        <div className='md:hidden'>
          <MobileHeader heading={"News & Updates"} />
        </div>
        <div className='min-h-[92.5dvh] p-4'>
          <div className='md:flex gap-4 justify-between items-center'>
            <div>
              <h1 className='text-xl font-bold'>News Details</h1>
              <span className='text-amber-700'>
                Post recent news and institutional announcements.
              </span>
            </div>
            <button onClick={openAdd}
              className='cursor-pointer flex gap-2 items-center bg-amber-700 text-white px-3 py-2 rounded-lg hover:bg-amber-800 transition max-md:mt-3'>
              <FaPlus />
              <span>Create News Post</span>
            </button>
          </div>

          {/* News Cards Grid */}
          <div className='mt-6 grid sm:grid-cols-2 xl:grid-cols-3 gap-6'>
            {items.map((item, index) => (
              <div key={index} className='bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition'>
                <div className='flex gap-4 p-4'>
                  {/* Image Thumbnail */}
                  <div className='w-28 h-24 min-w-28 rounded-xl overflow-hidden'>
                    <img src={item.image} className='w-full h-full object-cover' alt={item.title.en} />
                  </div>
                  {/* Content */}
                  <div className='flex-1 min-w-0'>
                    <div className='flex items-start justify-between gap-2'>
                      <h2 className='font-bold text-gray-800 truncate' title={item.title.en}>
                        {item.title.en.length > 20 ? item.title.en.substring(0, 20) + "..." : item.title.en}
                      </h2>
                      <div className='flex gap-2 flex-shrink-0'>
                        <button onClick={() => openEdit(index)} className='text-blue-600 hover:text-blue-800 cursor-pointer'>
                          <FaEdit size={14} />
                        </button>
                        <button onClick={() => handleDelete(index)} className='text-red-600 hover:text-red-800 cursor-pointer'>
                          <FaTrash size={14} />
                        </button>
                      </div>
                    </div>
                    <p className='text-amber-600 text-xs font-medium mt-1'>
                      {formatDate(item.date)}
                    </p>
                    <p className='text-gray-600 text-sm mt-2 line-clamp-3'>
                      {truncateText(item.content.en)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {items.length === 0 && (
            <div className='mt-12 text-center text-gray-500'>
              <p className='text-lg'>No news posts yet.</p>
              <p className='text-sm'>Click "Create News Post" to add your first news article.</p>
            </div>
          )}
        </div>
        <Footer />
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-4xl p-6 w-full max-w-lg space-y-3 max-h-[90vh] overflow-y-auto'>
            <h2 className='font-bold text-lg'>
              {editIndex !== null ? "Edit News Post" : "Create News Post"}
            </h2>

            {/* Image Upload */}
            <div>
              <label className='text-sm text-gray-600 mb-1 block'>News Image</label>
              <input
                type="file"
                accept="image/*"
                className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none'
                onChange={handleImageChange}
              />
            </div>
            {form.image && (
              <img src={form.image} className='h-40 w-full object-cover rounded-2xl' alt="Preview" />
            )}

            {/* Date */}
            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Date</label>
              <input
                type="date"
                className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none'
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </div>

            {/* Title English */}
            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Title (English)</label>
              <input
                placeholder='Enter news title in English'
                className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none'
                value={form.title.en}
                onChange={(e) =>
                  setForm({ ...form, title: { ...form.title, en: e.target.value } })
                }
              />
            </div>

            {/* Title Hindi */}
            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Title (Hindi)</label>
              <input
                placeholder='समाचार शीर्षक हिंदी में दर्ज करें'
                className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none'
                value={form.title.hi}
                onChange={(e) =>
                  setForm({ ...form, title: { ...form.title, hi: e.target.value } })
                }
              />
            </div>

            {/* Content English */}
            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Content (English)</label>
              <textarea
                placeholder='Enter news content in English'
                className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none resize-none'
                value={form.content.en}
                rows={4}
                onChange={(e) =>
                  setForm({ ...form, content: { ...form.content, en: e.target.value } })
                }
              />
            </div>

            {/* Content Hindi */}
            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Content (Hindi)</label>
              <textarea
                placeholder='समाचार सामग्री हिंदी में दर्ज करें'
                className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none resize-none'
                value={form.content.hi}
                rows={4}
                onChange={(e) =>
                  setForm({ ...form, content: { ...form.content, hi: e.target.value } })
                }
              />
            </div>

            {/* Action Buttons */}
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

export default News