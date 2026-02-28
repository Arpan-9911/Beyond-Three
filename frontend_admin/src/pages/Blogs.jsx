import React, { useState } from 'react'
import DesktopHeader from '../components/layout/DesktopHeader'
import MobileHeader from '../components/layout/MobileHeader'
import Sidebar from '../components/layout/Sidebar'
import Footer from '../components/layout/Footer'
import { FaPlus, FaEdit, FaTrash, FaFolder, FaUser, FaCalendar } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { deleteBlog, addBlog, updateBlog, toggleStatus } from '../functions/blogs'
import RichTextEditor from "../components/editor/RichTextEditor";

const Blogs = () => {
  const dispatch = useDispatch()
  /* ---------------- STATUS SIDEBAR ---------------- */
  const statuses = [
    { id: "approved", name: "Approved" },
    { id: "pending", name: "Pending" },
    { id: "rejected", name: "Rejected" }
  ]
  const [activeStatus, setActiveStatus] = useState("approved")

  /* ---------------- BLOG STATE ---------------- */
  const blogs = useSelector(state => state.blogs)
  const emptyBlogForm = {
    image: "",
    preview: "",
    title: { en: "", hi: "" },
    content: { en: "", hi: "" },
    author: "",
    date: "",
    status: "approved"
  }

  const [blogForm, setBlogForm] = useState(emptyBlogForm)
  const [showBlogModal, setShowBlogModal] = useState(false)
  const [editIndex, setEditIndex] = useState(null)

  /* ---------------- HANDLERS ---------------- */
  const openAddBlog = () => {
    setBlogForm({
      ...emptyBlogForm,
      date: new Date().toISOString().split('T')[0],
      status: "approved"
    })
    setEditIndex(null)
    setShowBlogModal(true)
  }

  const openEditBlog = (index) => {
    const blog = blogs[index]
    setBlogForm({
      image: "",
      preview: import.meta.env.VITE_UPLOADS + blog.image,
      title: { en: blog.title.en, hi: blog.title.hi },
      content: { en: blog.content.en, hi: blog.content.hi },
      author: blog.author,
      date: blog.date.split('T')[0],
      status: blog.status
    })
    setEditIndex(blog._id)
    setShowBlogModal(true)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setBlogForm(prev => ({
      ...prev,
      image: file,
      preview: URL.createObjectURL(file)
    }))
  }

  const handleSaveBlog = async () => {
    if(!blogForm.title.en && !blogForm.title.hi) return toast.error("Either english or hindi title is required");
    if(!blogForm.content.en && !blogForm.content.hi) return toast.error("Either english or hindi content is required");
    if(!blogForm.author) return toast.error("Author is required");
    if(!blogForm.date) return toast.error("Date is required");
    if(!blogForm.image && !editIndex) return toast.error("Image is required");
    const formData = new FormData()
    formData.append("author", blogForm.author)
    formData.append("date", blogForm.date)
    formData.append("status", blogForm.status)
    formData.append("image", blogForm.image)
    formData.append("title", JSON.stringify(blogForm.title))
    formData.append("content", JSON.stringify(blogForm.content))
    try{
      if (editIndex) await dispatch(updateBlog(editIndex, formData))
      else await dispatch(addBlog(formData))
    } catch (err) {
      toast.error(err.response?.data?.msg || "Something went wrong")
    } finally {
      setShowBlogModal(false)
    }
  }

  const handleDeleteBlog = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) return;
    try {
      await dispatch(deleteBlog(id))
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to delete blog post")
    }
  }

  /* ---------------- HELPERS ---------------- */
  const truncateText = (text, limit = 120) => {
    if (!text) return ""
    return text.length > limit ? text.substring(0, limit) + "..." : text
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  }
  const currentBlogs = blogs.filter(b => b.status === activeStatus)
  /* ---------------- UI ---------------- */
  return (
    <div className='min-h-dvh flex bg-amber-100'>
      {/* SIDEBAR */}
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
          <div className='flex gap-6 max-lg:flex-col'>
            {/* STATUS SIDEBAR */}
            <div className='lg:w-64 shrink-0'>
              <div className='mb-4'>
                <h2 className='text-amber-700 font-semibold uppercase tracking-wide text-sm'>
                  Blog Status
                </h2>
              </div>
              <div className='space-y-2'>
                {statuses.map((status) => (
                  <button
                    key={status.id}
                    onClick={() => setActiveStatus(status.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition cursor-pointer ${
                      activeStatus === status.id
                        ? 'bg-amber-600 text-white shadow-lg'
                        : 'bg-white hover:bg-amber-50 text-gray-700'
                    }`}
                  >
                    <FaFolder size={18} />
                    <span className='font-medium'>{status.name}</span>

                    {activeStatus === status.id && (
                      <span className='ml-auto w-2 h-2 bg-white rounded-full'></span>
                    )}
                  </button>
                ))}
              </div>
            </div>
            {/* MAIN CONTENT */}
            <div className='flex-1'>
              <div className='flex flex-wrap gap-4 justify-between items-center mb-6'>
                <h1 className='text-2xl font-bold text-gray-800 capitalize'>
                  {activeStatus} Blogs
                </h1>
                <button
                  onClick={openAddBlog}
                  className='cursor-pointer flex gap-2 items-center bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition'
                >
                  <FaPlus />
                  <span>Add Blog</span>
                </button>
              </div>
              {/* BLOG LIST */}
              <div className='space-y-4'>
                {currentBlogs.map((blog, index) => (
                  <div key={index} className='bg-white rounded-4xl shadow-lg overflow-hidden hover:shadow-xl transition'>
                    <div className='flex gap-4 p-4 max-sm:flex-col'>
                      {/* IMAGE */}
                      <div className='w-40 h-28 min-w-40 max-sm:w-full max-sm:h-40 rounded-2xl overflow-hidden'>
                        <img
                          src={import.meta.env.VITE_UPLOADS + blog.image}
                          className='w-full h-full object-cover'
                          alt=''
                        />
                      </div>
                      {/* CONTENT */}
                      <div className='flex-1 min-w-0'>
                        <div className='flex items-start justify-between gap-2'>
                          <div>
                            <h2 className='font-bold text-gray-800'>{blog.title.en}</h2>
                            <h2 className='font-bold text-gray-800'>{blog.title.hi}</h2>
                          </div>
                          <div className='flex gap-3 shrink-0'>
                            <button
                              onClick={() => openEditBlog(index)}
                              className='text-gray-400 hover:text-blue-600 cursor-pointer'
                            >
                              <FaEdit size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteBlog(blog._id)}
                              className='text-gray-400 hover:text-red-600 cursor-pointer'
                            >
                              <FaTrash size={16} />
                            </button>
                          </div>
                        </div>
                        <div
                          className="prose prose-sm leading-tight mt-1 max-w-none text-gray-700
                                    prose-p:m-0
                                    prose-ul:m-0
                                    prose-ol:m-0
                                    prose-li:m-0
                                    prose-headings:m-0"
                          dangerouslySetInnerHTML={{
                            __html: truncateText(blog.content.en) || "",
                          }}
                        />
                        <div
                          className="prose prose-sm leading-tight mt-1 max-w-none text-gray-700
                                    prose-p:m-0
                                    prose-ul:m-0
                                    prose-ol:m-0
                                    prose-li:m-0
                                    prose-headings:m-0"
                          dangerouslySetInnerHTML={{
                            __html: truncateText(blog.content.hi) || "",
                          }}
                        />
                        <div className='flex gap-4 mt-2 text-xs text-gray-500'>
                          {blog.author && (
                            <div className='flex items-center gap-1'>
                              <FaUser size={10} />
                              {blog.author}
                            </div>
                          )}
                          <div className='flex items-center gap-1'>
                            <FaCalendar size={10} />
                            {formatDate(blog.date)}
                          </div>
                        </div>
                        <div className='flex gap-2 mt-3'>
                          <span className={`px-2 py-1 text-xs rounded-full ${blog.status === "approved" ? "bg-green-100 text-green-800" : blog.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}>
                            {blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}
                          </span>
                          {/* Option to change the status - Approve or Reject */}
                          {blog.status !== "approved" && (
                            <button onClick={() => dispatch(toggleStatus(blog._id, "approved"))} className='text-green-600 hover:text-green-800 text-xs cursor-pointer'>
                              Approve
                            </button>
                          )}
                          {blog.status !== "rejected" && (
                            <button onClick={() => dispatch(toggleStatus(blog._id, "rejected"))} className='text-red-600 hover:text-red-800 text-xs cursor-pointer'>
                              Reject
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {currentBlogs.length === 0 && (
                <div className='mt-12 text-center text-gray-500'>
                  <FaFolder size={48} className='mx-auto text-gray-300 mb-4' />
                  <p className='text-lg'>No blogs in this section.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>

      {/* BLOG MODAL */}
      {showBlogModal && (
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-4xl p-6 w-full max-w-lg space-y-3 max-h-[90dvh] overflow-y-auto hide-scrollbar'>
            <h2 className='font-bold text-lg'>
              {editIndex !== null ? "Edit Blog" : "Add Blog"}
            </h2>
            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Blog Image</label>
              <input type="file" accept="image/*"
                className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none'
                onChange={handleImageChange}
              />
            </div>
            {blogForm.preview && (
              <img src={blogForm.preview} className='h-40 w-full object-cover rounded-2xl' alt="Preview" />
            )}
            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Author</label>
              <input
                placeholder='Author'
                className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none'
                value={blogForm.author}
                onChange={(e) =>
                  setBlogForm({ ...blogForm, author: e.target.value })
                }
              />
            </div>
            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Date</label>
              <input
                type='date'
                className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none'
                value={blogForm.date}
                onChange={(e) =>
                  setBlogForm({ ...blogForm, date: e.target.value })
                }
              />
            </div>
            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Title English</label>
              <input
                placeholder='Title English'
                className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none'
                value={blogForm.title.en}
                onChange={(e) =>
                  setBlogForm({ ...blogForm, title: { ...blogForm.title, en: e.target.value } })
                }
              />
            </div>
            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Title Hindi</label>
              <input
                placeholder='Title Hindi'
                className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none'
                value={blogForm.title.hi}
                onChange={(e) =>
                  setBlogForm({ ...blogForm, title: { ...blogForm.title, hi: e.target.value } })
                }
              />
            </div>
            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Content English</label>
              <RichTextEditor
                value={blogForm.content.en}
                onChange={(html) =>
                  setBlogForm({
                    ...blogForm,
                    content: { ...blogForm.content, en: html },
                  })
                }
              />
            </div>
            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Content Hindi</label>
              <RichTextEditor
                value={blogForm.content.hi}
                onChange={(html) =>
                  setBlogForm({
                    ...blogForm,
                    content: { ...blogForm.content, hi: html },
                  })
                }
              />
            </div>
            <div className='flex justify-end gap-3 pt-2'>
              <button onClick={() => setShowBlogModal(false)}
                className='px-4 py-2 border rounded-2xl'>
                Cancel
              </button>
              <button onClick={handleSaveBlog}
                className='bg-amber-700 text-white px-4 py-2 rounded-2xl'>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Blogs
