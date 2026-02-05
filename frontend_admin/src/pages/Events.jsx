import React, { useState } from 'react'
import DesktopHeader from '../components/layout/DesktopHeader'
import MobileHeader from '../components/layout/MobileHeader'
import Sidebar from '../components/layout/Sidebar'
import Footer from '../components/layout/Footer'
import { FaPlus, FaEdit, FaTrash, FaCalendarAlt, FaMapMarkerAlt, FaClock } from 'react-icons/fa'

const Events = () => {

  const [items, setItems] = useState([])

  const emptyForm = {
    image: "",
    title: { en: "", hi: "" },
    description: { en: "", hi: "" },
    date: "",
    time: "",
    location: { en: "", hi: "" },
    status: "upcoming"
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
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
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
          <DesktopHeader heading={"Events"} />
        </div>
        <div className='md:hidden'>
          <MobileHeader heading={"Events"} />
        </div>
        <div className='min-h-[92.5dvh] p-4'>
          <div className='md:flex gap-4 justify-between items-center'>
            <div>
              <h1 className='text-xl font-bold'>Event Management</h1>
              <span className='text-amber-700'>
                Manage upcoming and past events for your organization.
              </span>
            </div>
            <button onClick={openAdd}
              className='cursor-pointer flex gap-2 items-center bg-amber-700 text-white px-3 py-2 rounded-lg hover:bg-amber-800 transition max-md:mt-3'>
              <FaPlus />
              <span>Create Event</span>
            </button>
          </div>

          {/* Events Grid */}
          <div className='mt-6 grid sm:grid-cols-2 xl:grid-cols-3 gap-6'>
            {items.map((item, index) => (
              <div key={index} className='bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition'>
                <div className='h-40 w-full overflow-hidden relative'>
                  <img src={item.image} className='w-full h-full object-cover' alt={item.title.en} />
                  <span className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full ${item.status === 'upcoming' ? 'bg-green-500 text-white' :
                      item.status === 'ongoing' ? 'bg-amber-500 text-white' : 'bg-gray-500 text-white'
                    }`}>
                    {item.status.toUpperCase()}
                  </span>
                </div>
                <div className='p-4'>
                  <div className='flex items-start justify-between gap-2'>
                    <h2 className='font-bold text-lg text-gray-800'>{item.title.en}</h2>
                    <div className='flex gap-2 flex-shrink-0'>
                      <button onClick={() => openEdit(index)} className='text-blue-600 hover:text-blue-800 cursor-pointer'>
                        <FaEdit size={14} />
                      </button>
                      <button onClick={() => handleDelete(index)} className='text-red-600 hover:text-red-800 cursor-pointer'>
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </div>
                  <p className='text-gray-600 text-sm mt-2 line-clamp-2'>
                    {truncateText(item.description.en)}
                  </p>
                  <div className='mt-3 space-y-1 text-sm text-gray-500'>
                    <div className='flex items-center gap-2'>
                      <FaCalendarAlt size={12} className='text-amber-600' />
                      <span>{formatDate(item.date)}</span>
                    </div>
                    {item.time && (
                      <div className='flex items-center gap-2'>
                        <FaClock size={12} className='text-amber-600' />
                        <span>{item.time}</span>
                      </div>
                    )}
                    {item.location.en && (
                      <div className='flex items-center gap-2'>
                        <FaMapMarkerAlt size={12} className='text-amber-600' />
                        <span>{item.location.en}</span>
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
              <FaCalendarAlt size={48} className='mx-auto text-gray-300 mb-4' />
              <p className='text-lg'>No events created yet.</p>
              <p className='text-sm'>Click "Create Event" to add your first event.</p>
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
              {editIndex !== null ? "Edit Event" : "Create Event"}
            </h2>

            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Event Image</label>
              <input type="file" accept="image/*"
                className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none'
                onChange={handleImageChange} />
            </div>
            {form.image && (
              <img src={form.image} className='h-40 w-full object-cover rounded-2xl' alt="Preview" />
            )}

            <div className='grid grid-cols-2 gap-3'>
              <div>
                <label className='text-sm text-gray-600 mb-1 block'>Date</label>
                <input type="date"
                  className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none'
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })} />
              </div>
              <div>
                <label className='text-sm text-gray-600 mb-1 block'>Time</label>
                <input type="time"
                  className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none'
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })} />
              </div>
            </div>

            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Status</label>
              <select
                className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none'
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}>
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Title (English)</label>
              <input placeholder='Enter event title in English'
                className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none'
                value={form.title.en}
                onChange={(e) => setForm({ ...form, title: { ...form.title, en: e.target.value } })} />
            </div>

            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Title (Hindi)</label>
              <input placeholder='इवेंट शीर्षक हिंदी में दर्ज करें'
                className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none'
                value={form.title.hi}
                onChange={(e) => setForm({ ...form, title: { ...form.title, hi: e.target.value } })} />
            </div>

            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Location (English)</label>
              <input placeholder='Enter event location'
                className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none'
                value={form.location.en}
                onChange={(e) => setForm({ ...form, location: { ...form.location, en: e.target.value } })} />
            </div>

            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Location (Hindi)</label>
              <input placeholder='इवेंट स्थान हिंदी में दर्ज करें'
                className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none'
                value={form.location.hi}
                onChange={(e) => setForm({ ...form, location: { ...form.location, hi: e.target.value } })} />
            </div>

            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Description (English)</label>
              <textarea placeholder='Enter event description in English'
                className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none resize-none'
                value={form.description.en} rows={3}
                onChange={(e) => setForm({ ...form, description: { ...form.description, en: e.target.value } })} />
            </div>

            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Description (Hindi)</label>
              <textarea placeholder='इवेंट विवरण हिंदी में दर्ज करें'
                className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none resize-none'
                value={form.description.hi} rows={3}
                onChange={(e) => setForm({ ...form, description: { ...form.description, hi: e.target.value } })} />
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

export default Events