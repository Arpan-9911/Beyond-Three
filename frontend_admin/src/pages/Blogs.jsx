import React, { useState } from 'react'
import DesktopHeader from '../components/layout/DesktopHeader'
import MobileHeader from '../components/layout/MobileHeader'
import Sidebar from '../components/layout/Sidebar'
import Footer from '../components/layout/Footer'
import { FaPlus, FaEdit, FaTrash, FaUser, FaCalendar } from 'react-icons/fa'

const Blogs = () => {

  const [items, setItems] = useState([])

  const emptyForm = {
    image: "",
    title: { en: "", hi: "" },
    content: { en: "", hi: "" },
    author: "",
    date: "",
    tags: ""
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
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  }

  const truncateText = (text, limit = 120) => {
    return text.length > limit ? text.substring(0, limit) + "..." : text
  }

  return (
    <div className='min-h-dvh flex bg-amber-100'>
      <div className='h-dvh sticky top-0 w-64 overflow-hidden max-md:hidden'>
        <Sidebar />
      </div>
      <div className='flex-1'>
        <div className='max-md:hidden'>
          <DesktopHeader heading={"Blogs"} />
        </div>
        <div className='md:hidden'>
          <MobileHeader heading={"Blogs"} />
        </div>
        <div className='min-h-[92.5dvh] p-4'>
          <div className='md:flex gap-4 justify-between items-center'>
            <div>
              <h1 className='text-xl font-bold'>Blog Posts</h1>
              <span className='text-amber-700'>
                Create and manage blog articles for your website.
              </span>
            </div>
            <button onClick={openAdd}
              className='cursor-pointer flex gap-2 items-center bg-amber-700 text-white px-3 py-2 rounded-lg hover:bg-amber-800 transition max-md:mt-3'>
              <FaPlus />
              <span>Create Blog Post</span>
            </button>
          </div>

          {/* Blogs Grid */}
          <div className='mt-6 grid sm:grid-cols-2 xl:grid-cols-3 gap-6'>
            {items.map((item, index) => (
              <div key={index} className='bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition'>
                <div className='h-44 w-full overflow-hidden'>
                  <img src={item.image} className='w-full h-full object-cover' alt={item.title.en} />
                </div>
                <div className='p-4'>
                  <div className='flex items-start justify-between gap-2'>
                    <h2 className='font-bold text-lg text-gray-800 line-clamp-2'>{item.title.en}</h2>
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
                    {truncateText(item.content.en)}
                  </p>
                  <div className='mt-3 flex items-center gap-4 text-xs text-gray-500'>
                    {item.author && (
                      <div className='flex items-center gap-1'>
                        <FaUser size={10} className='text-amber-600' />
                        <span>{item.author}</span>
                      </div>
                    )}
                    <div className='flex items-center gap-1'>
                      <FaCalendar size={10} className='text-amber-600' />
                      <span>{formatDate(item.date)}</span>
                    </div>
                  </div>
                  {item.tags && (
                    <div className='mt-2 flex flex-wrap gap-1'>
                      {item.tags.split(',').map((tag, i) => (
                        <span key={i} className='px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full'>
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {items.length === 0 && (
            <div className='mt-12 text-center text-gray-500'>
              <p className='text-lg'>No blog posts yet.</p>
              <p className='text-sm'>Click "Create Blog Post" to write your first article.</p>
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
              {editIndex !== null ? "Edit Blog Post" : "Create Blog Post"}
            </h2>

            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Cover Image</label>
              <input type="file" accept="image/*"
                className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none'
                onChange={handleImageChange} />
            </div>
            {form.image && (
              <img src={form.image} className='h-40 w-full object-cover rounded-2xl' alt="Preview" />
            )}

            <div className='grid grid-cols-2 gap-3'>
              <div>
                <label className='text-sm text-gray-600 mb-1 block'>Author</label>
                <input placeholder='Author name'
                  className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none'
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })} />
              </div>
              <div>
                <label className='text-sm text-gray-600 mb-1 block'>Date</label>
                <input type="date"
                  className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none'
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })} />
              </div>
            </div>

            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Title (English)</label>
              <input placeholder='Enter blog title in English'
                className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none'
                value={form.title.en}
                onChange={(e) => setForm({ ...form, title: { ...form.title, en: e.target.value } })} />
            </div>

            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Title (Hindi)</label>
              <input placeholder='ब्लॉग शीर्षक हिंदी में दर्ज करें'
                className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none'
                value={form.title.hi}
                onChange={(e) => setForm({ ...form, title: { ...form.title, hi: e.target.value } })} />
            </div>

            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Content (English)</label>
              <textarea placeholder='Write your blog content in English'
                className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none resize-none'
                value={form.content.en} rows={5}
                onChange={(e) => setForm({ ...form, content: { ...form.content, en: e.target.value } })} />
            </div>

            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Content (Hindi)</label>
              <textarea placeholder='ब्लॉग सामग्री हिंदी में लिखें'
                className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none resize-none'
                value={form.content.hi} rows={5}
                onChange={(e) => setForm({ ...form, content: { ...form.content, hi: e.target.value } })} />
            </div>

            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Tags (comma separated)</label>
              <input placeholder='health, wellness, yoga'
                className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none'
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })} />
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

export default Blogs