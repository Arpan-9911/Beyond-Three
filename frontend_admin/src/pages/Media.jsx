import React, { useState } from 'react'
import DesktopHeader from '../components/layout/DesktopHeader'
import MobileHeader from '../components/layout/MobileHeader'
import Sidebar from '../components/layout/Sidebar'
import Footer from '../components/layout/Footer'
import { FaPlus, FaTrash, FaImage, FaVideo, FaPlay } from 'react-icons/fa'

const Media = () => {

  const [items, setItems] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ file: "", type: "image", title: "" })

  const openAdd = () => {
    setForm({ file: "", type: "image", title: "" })
    setShowModal(true)
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const preview = URL.createObjectURL(file)
    const isVideo = file.type.startsWith('video/')
    setForm({ ...form, file: preview, type: isVideo ? 'video' : 'image' })
  }

  const handleSave = () => {
    if (form.file) {
      setItems([...items, { ...form, id: Date.now() }])
    }
    setShowModal(false)
  }

  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id))
  }

  const images = items.filter(item => item.type === 'image')
  const videos = items.filter(item => item.type === 'video')

  return (
    <div className='min-h-dvh flex bg-amber-100'>
      <div className='h-dvh sticky top-0 w-64 overflow-hidden max-md:hidden'>
        <Sidebar />
      </div>
      <div className='flex-1'>
        <div className='max-md:hidden'>
          <DesktopHeader heading={"Media Library"} />
        </div>
        <div className='md:hidden'>
          <MobileHeader heading={"Media Library"} />
        </div>
        <div className='min-h-[92.5dvh] p-4'>
          <div className='md:flex gap-4 justify-between items-center'>
            <div>
              <h1 className='text-xl font-bold'>Media Library</h1>
              <span className='text-amber-700'>
                Upload and manage images and videos for your website.
              </span>
            </div>
            <button onClick={openAdd}
              className='cursor-pointer flex gap-2 items-center bg-amber-700 text-white px-3 py-2 rounded-lg hover:bg-amber-800 transition max-md:mt-3'>
              <FaPlus />
              <span>Upload Media</span>
            </button>
          </div>

          {/* Images Section */}
          <div className='mt-6'>
            <h2 className='text-lg font-bold flex items-center gap-2 mb-4'>
              <FaImage className='text-amber-600' /> Images ({images.length})
            </h2>
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
              {images.map((item) => (
                <div key={item.id} className='relative group rounded-xl overflow-hidden shadow-lg bg-white'>
                  <img src={item.file} className='w-full h-32 object-cover' alt={item.title || 'Image'} />
                  <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center'>
                    <button onClick={() => handleDelete(item.id)}
                      className='bg-red-500 text-white p-2 rounded-full hover:bg-red-600 cursor-pointer'>
                      <FaTrash size={14} />
                    </button>
                  </div>
                  {item.title && (
                    <p className='p-2 text-xs text-gray-600 truncate'>{item.title}</p>
                  )}
                </div>
              ))}
            </div>
            {images.length === 0 && (
              <p className='text-gray-400 text-sm'>No images uploaded yet.</p>
            )}
          </div>

          {/* Videos Section */}
          <div className='mt-8'>
            <h2 className='text-lg font-bold flex items-center gap-2 mb-4'>
              <FaVideo className='text-amber-600' /> Videos ({videos.length})
            </h2>
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
              {videos.map((item) => (
                <div key={item.id} className='relative group rounded-xl overflow-hidden shadow-lg bg-white'>
                  <div className='relative h-32 bg-gray-900'>
                    <video src={item.file} className='w-full h-full object-cover' />
                    <div className='absolute inset-0 flex items-center justify-center'>
                      <FaPlay className='text-white text-2xl opacity-70' />
                    </div>
                  </div>
                  <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center'>
                    <button onClick={() => handleDelete(item.id)}
                      className='bg-red-500 text-white p-2 rounded-full hover:bg-red-600 cursor-pointer'>
                      <FaTrash size={14} />
                    </button>
                  </div>
                  {item.title && (
                    <p className='p-2 text-xs text-gray-600 truncate'>{item.title}</p>
                  )}
                </div>
              ))}
            </div>
            {videos.length === 0 && (
              <p className='text-gray-400 text-sm'>No videos uploaded yet.</p>
            )}
          </div>
        </div>
        <Footer />
      </div>

      {/* Upload Modal */}
      {showModal && (
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-4xl p-6 w-full max-w-md space-y-4'>
            <h2 className='font-bold text-lg'>Upload Media</h2>

            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Select File (Image or Video)</label>
              <input type="file" accept="image/*,video/*"
                className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none'
                onChange={handleFileChange} />
            </div>

            {form.file && form.type === 'image' && (
              <img src={form.file} className='h-40 w-full object-cover rounded-2xl' alt="Preview" />
            )}
            {form.file && form.type === 'video' && (
              <video src={form.file} className='h-40 w-full object-cover rounded-2xl' controls />
            )}

            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Title (Optional)</label>
              <input placeholder='Enter file title'
                className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none'
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>

            <div className='flex justify-end gap-3 pt-2'>
              <button onClick={() => setShowModal(false)} className='px-4 py-2 border rounded-2xl cursor-pointer hover:bg-gray-200 transition'>
                Cancel
              </button>
              <button onClick={handleSave}
                className='cursor-pointer bg-amber-700 text-white px-4 py-2 rounded-2xl hover:bg-amber-800 transition active:scale-95'>
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Media