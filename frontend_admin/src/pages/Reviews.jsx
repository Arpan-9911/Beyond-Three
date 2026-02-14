import React, { useState } from 'react'
import DesktopHeader from '../components/layout/DesktopHeader'
import MobileHeader from '../components/layout/MobileHeader'
import Sidebar from '../components/layout/Sidebar'
import Footer from '../components/layout/Footer'
import { FaPlus, FaEdit, FaTrash, FaStar, FaRegStar, FaCheck, FaTimes, FaVideo, FaQuoteLeft, FaUser } from 'react-icons/fa'

const Reviews = () => {
  const [activeTab, setActiveTab] = useState('admin')

  // --- Admin Reviews ---
  const [adminReviews, setAdminReviews] = useState([
    {
      type: 'text',
      name: { en: 'Rahul Sharma', hi: 'राहुल शर्मा' },
      rating: 5,
      review: { en: 'Beyond Three has transformed my life with their wellness programs.', hi: 'Beyond Three ने अपने वेलनेस कार्यक्रमों से मेरा जीवन बदल दिया है।' },
      image: '',
      videoUrl: '',
      caption: { en: '', hi: '' }
    },
    {
      type: 'video',
      name: { en: 'Priya Patel', hi: 'प्रिया पटेल' },
      rating: 4,
      review: { en: '', hi: '' },
      image: '',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      caption: { en: 'My journey with Beyond Three', hi: 'Beyond Three के साथ मेरी यात्रा' }
    },
  ])

  const [showReviewModal, setShowReviewModal] = useState(false)
  const [editReviewIndex, setEditReviewIndex] = useState(null)
  const emptyReviewForm = {
    type: 'text',
    name: { en: '', hi: '' },
    rating: 5,
    review: { en: '', hi: '' },
    image: '',
    imagePreview: '',
    videoUrl: '',
    caption: { en: '', hi: '' }
  }
  const [reviewForm, setReviewForm] = useState(emptyReviewForm)

  // --- User/Pending Reviews ---
  const [userReviews, setUserReviews] = useState([
    {
      id: 1,
      name: 'Amit Kumar',
      email: 'amit@example.com',
      rating: 4,
      review: 'Great programs and very helpful staff. I have been attending their events for over a year now.',
      date: '2026-02-10',
      status: 'pending'
    },
    {
      id: 2,
      name: 'Sneha Gupta',
      email: 'sneha@gmail.com',
      rating: 5,
      review: 'The meditation sessions are life-changing. Highly recommend Beyond Three to everyone seeking inner peace.',
      date: '2026-02-12',
      status: 'pending'
    },
    {
      id: 3,
      name: 'Vikram Singh',
      email: 'vikram@email.com',
      rating: 3,
      review: 'Good initiative but needs more events in my city.',
      date: '2026-02-13',
      status: 'pending'
    },
  ])

  // --- Admin Review Handlers ---
  const openAddReview = () => {
    setReviewForm(emptyReviewForm)
    setEditReviewIndex(null)
    setShowReviewModal(true)
  }

  const openEditReview = (index) => {
    setReviewForm({ ...adminReviews[index], imagePreview: adminReviews[index].image })
    setEditReviewIndex(index)
    setShowReviewModal(true)
  }

  const handleReviewImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setReviewForm(prev => ({ ...prev, image: file, imagePreview: URL.createObjectURL(file) }))
  }

  const handleSaveReview = () => {
    if (!reviewForm.name.en.trim()) return
    const reviewToSave = { ...reviewForm }
    if (reviewToSave.imagePreview && typeof reviewToSave.image !== 'string') {
      reviewToSave.image = reviewToSave.imagePreview
    }
    delete reviewToSave.imagePreview

    if (editReviewIndex !== null) {
      const updated = [...adminReviews]
      updated[editReviewIndex] = reviewToSave
      setAdminReviews(updated)
    } else {
      setAdminReviews([...adminReviews, reviewToSave])
    }
    setShowReviewModal(false)
  }

  const handleDeleteReview = (index) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return
    setAdminReviews(adminReviews.filter((_, i) => i !== index))
  }

  // --- User Review Handlers ---
  const handleAcceptReview = (id) => {
    setUserReviews(userReviews.map(r => r.id === id ? { ...r, status: 'accepted' } : r))
  }

  const handleRejectReview = (id) => {
    if (!window.confirm('Are you sure you want to reject this review?')) return
    setUserReviews(userReviews.filter(r => r.id !== id))
  }

  // --- Star Renderer ---
  const renderStars = (rating, interactive = false, onChange = null) => {
    return (
      <div className='flex gap-1'>
        {[1, 2, 3, 4, 5].map(star => (
          <button key={star}
            type='button'
            onClick={interactive ? () => onChange(star) : undefined}
            className={`${interactive ? 'cursor-pointer' : 'cursor-default'}`}>
            {star <= rating
              ? <FaStar className='text-amber-500' size={interactive ? 20 : 14} />
              : <FaRegStar className='text-amber-500' size={interactive ? 20 : 14} />}
          </button>
        ))}
      </div>
    )
  }

  const modalInputClass = 'w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none'

  const pendingReviews = userReviews.filter(r => r.status === 'pending')
  const acceptedReviews = userReviews.filter(r => r.status === 'accepted')

  return (
    <div className='min-h-dvh flex bg-amber-100'>
      <div className='h-dvh sticky top-0 w-64 overflow-hidden max-md:hidden'>
        <Sidebar />
      </div>
      <div className='flex-1'>
        <div className='max-md:hidden'>
          <DesktopHeader heading={"Reviews"} />
        </div>
        <div className='md:hidden'>
          <MobileHeader heading={"Reviews"} />
        </div>
        <div className='min-h-[92.5dvh] p-4'>

          {/* Header */}
          <div className='md:flex gap-4 justify-between items-center mb-6'>
            <div>
              <h1 className='text-xl font-bold'>Reviews Management</h1>
              <span className='text-amber-700'>Manage reviews from admin and moderate user submissions.</span>
            </div>
          </div>

          {/* Tabs */}
          <div className='flex gap-2 mb-6'>
            <button
              onClick={() => setActiveTab('admin')}
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition cursor-pointer ${activeTab === 'admin'
                ? 'bg-amber-700 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-amber-50'
                }`}>
              Admin Reviews ({adminReviews.length})
            </button>
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition cursor-pointer ${activeTab === 'pending'
                ? 'bg-amber-700 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-amber-50'
                }`}>
              User Reviews
              {pendingReviews.length > 0 && (
                <span className='ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full'>
                  {pendingReviews.length}
                </span>
              )}
            </button>
          </div>

          {/* Admin Reviews Tab */}
          {activeTab === 'admin' && (
            <div>
              <div className='flex justify-end mb-4'>
                <button onClick={openAddReview}
                  className='cursor-pointer flex gap-2 items-center bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition'>
                  <FaPlus />
                  <span>Add Review</span>
                </button>
              </div>
              <div className='space-y-4'>
                {adminReviews.map((review, index) => (
                  <div key={index} className='bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition'>
                    <div className='flex gap-4 p-4 max-sm:flex-col'>
                      {/* Left: Avatar or Video */}
                      <div className='w-32 min-w-32 max-sm:w-full flex-shrink-0'>
                        {review.type === 'video' ? (
                          <div className='w-full h-24 max-sm:h-40 rounded-2xl overflow-hidden bg-gray-200'>
                            <iframe src={review.videoUrl} className='w-full h-full' frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                          </div>
                        ) : (
                          <div className='w-20 h-20 rounded-full overflow-hidden bg-amber-100 flex items-center justify-center mx-auto'>
                            {review.image
                              ? <img src={review.image} className='w-full h-full object-cover' alt={review.name.en} />
                              : <FaUser className='text-amber-400' size={28} />
                            }
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className='flex-1 min-w-0'>
                        <div className='flex items-start justify-between gap-2'>
                          <div>
                            <div className='flex items-center gap-2'>
                              <h3 className='font-bold text-gray-800'>{review.name.en}</h3>
                              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${review.type === 'video'
                                ? 'text-purple-700 border-purple-200 bg-purple-50'
                                : 'text-blue-700 border-blue-200 bg-blue-50'
                                }`}>
                                {review.type === 'video' ? <><FaVideo className='inline mr-1' size={10} />VIDEO</> : <><FaQuoteLeft className='inline mr-1' size={10} />TEXT</>}
                              </span>
                            </div>
                            <p className='text-sm text-gray-500'>{review.name.hi}</p>
                            {renderStars(review.rating)}
                          </div>
                          <div className='flex gap-3 shrink-0'>
                            <button onClick={() => openEditReview(index)} className='text-gray-400 hover:text-blue-600 cursor-pointer'>
                              <FaEdit size={16} />
                            </button>
                            <button onClick={() => handleDeleteReview(index)} className='text-gray-400 hover:text-red-600 cursor-pointer'>
                              <FaTrash size={16} />
                            </button>
                          </div>
                        </div>
                        {review.type === 'text' && (
                          <>
                            <p className='text-gray-600 text-sm mt-2'>{review.review.en}</p>
                            <p className='text-gray-500 text-xs mt-1'>{review.review.hi}</p>
                          </>
                        )}
                        {review.type === 'video' && (
                          <>
                            <p className='text-gray-600 text-sm mt-2'>{review.caption.en}</p>
                            <p className='text-gray-500 text-xs mt-1'>{review.caption.hi}</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {adminReviews.length === 0 && (
                  <div className='text-center text-gray-400 py-12'>
                    <FaQuoteLeft size={40} className='mx-auto text-gray-300 mb-4' />
                    <p className='text-lg'>No admin reviews yet.</p>
                    <p className='text-sm'>Click "Add Review" to create your first review.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* User Reviews Tab */}
          {activeTab === 'pending' && (
            <div className='space-y-6'>
              {/* Pending Section */}
              {pendingReviews.length > 0 && (
                <div>
                  <h2 className='font-bold text-lg mb-3 text-gray-800'>Pending Reviews</h2>
                  <div className='space-y-3'>
                    {pendingReviews.map((review) => (
                      <div key={review.id} className='bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition'>
                        <div className='flex items-start gap-4 max-sm:flex-col'>
                          <div className='w-12 h-12 rounded-full overflow-hidden bg-yellow-100 flex items-center justify-center flex-shrink-0'>
                            <FaUser className='text-yellow-500' size={20} />
                          </div>
                          <div className='flex-1 min-w-0'>
                            <div className='flex items-start justify-between gap-2 max-sm:flex-col'>
                              <div>
                                <div className='flex items-center gap-2'>
                                  <h3 className='font-semibold text-gray-800'>{review.name}</h3>
                                  <span className='bg-yellow-100 text-yellow-700 text-[10px] font-semibold px-2 py-0.5 rounded-md border border-yellow-200'>
                                    PENDING
                                  </span>
                                </div>
                                <p className='text-xs text-gray-400'>{review.email} • {review.date}</p>
                                {renderStars(review.rating)}
                              </div>
                              <div className='flex gap-2 shrink-0'>
                                <button onClick={() => handleAcceptReview(review.id)}
                                  className='cursor-pointer flex gap-1.5 items-center bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition text-sm'>
                                  <FaCheck size={12} />
                                  <span>Accept</span>
                                </button>
                                <button onClick={() => handleRejectReview(review.id)}
                                  className='cursor-pointer flex gap-1.5 items-center bg-red-600 text-white px-3 py-1.5 rounded-lg hover:bg-red-700 transition text-sm'>
                                  <FaTimes size={12} />
                                  <span>Reject</span>
                                </button>
                              </div>
                            </div>
                            <p className='text-gray-600 text-sm mt-2'>{review.review}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Accepted Section */}
              {acceptedReviews.length > 0 && (
                <div>
                  <h2 className='font-bold text-lg mb-3 text-gray-800'>Accepted Reviews</h2>
                  <div className='space-y-3'>
                    {acceptedReviews.map((review) => (
                      <div key={review.id} className='bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition opacity-75'>
                        <div className='flex items-start gap-4 max-sm:flex-col'>
                          <div className='w-12 h-12 rounded-full overflow-hidden bg-green-100 flex items-center justify-center flex-shrink-0'>
                            <FaUser className='text-green-500' size={20} />
                          </div>
                          <div className='flex-1 min-w-0'>
                            <div className='flex items-center gap-2'>
                              <h3 className='font-semibold text-gray-800'>{review.name}</h3>
                              <span className='bg-green-100 text-green-700 text-[10px] font-semibold px-2 py-0.5 rounded-md border border-green-200'>
                                ACCEPTED
                              </span>
                            </div>
                            <p className='text-xs text-gray-400'>{review.email} • {review.date}</p>
                            {renderStars(review.rating)}
                            <p className='text-gray-600 text-sm mt-2'>{review.review}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {pendingReviews.length === 0 && acceptedReviews.length === 0 && (
                <div className='text-center text-gray-400 py-12'>
                  <FaUser size={40} className='mx-auto text-gray-300 mb-4' />
                  <p className='text-lg'>No user reviews yet.</p>
                  <p className='text-sm'>User reviews from the website will appear here for moderation.</p>
                </div>
              )}
            </div>
          )}
        </div>
        <Footer />
      </div>

      {/* Add/Edit Review Modal */}
      {showReviewModal && (
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-4xl p-6 w-full max-w-lg space-y-3 max-h-[90vh] overflow-y-auto hide-scrollbar'>
            <h2 className='font-bold text-lg'>
              {editReviewIndex !== null ? "Edit Review" : "Add Review"}
            </h2>

            {/* Type Toggle */}
            <div>
              <label className='text-sm text-gray-600 mb-2 block'>Review Type</label>
              <div className='flex gap-2'>
                <button
                  type='button'
                  onClick={() => setReviewForm({ ...reviewForm, type: 'text' })}
                  className={`cursor-pointer flex-1 py-2.5 rounded-xl font-semibold text-sm transition ${reviewForm.type === 'text'
                    ? 'bg-amber-700 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}>
                  <FaQuoteLeft className='inline mr-2' size={12} />
                  Text Review
                </button>
                <button
                  type='button'
                  onClick={() => setReviewForm({ ...reviewForm, type: 'video' })}
                  className={`cursor-pointer flex-1 py-2.5 rounded-xl font-semibold text-sm transition ${reviewForm.type === 'video'
                    ? 'bg-amber-700 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}>
                  <FaVideo className='inline mr-2' size={12} />
                  Video Review
                </button>
              </div>
            </div>

            {/* Reviewer Image */}
            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Reviewer Photo</label>
              <input type="file" accept="image/*" className={modalInputClass} onChange={handleReviewImageChange} />
            </div>
            {reviewForm.imagePreview && (
              <img src={reviewForm.imagePreview} className='h-20 w-20 object-cover rounded-full mx-auto' alt="Preview" />
            )}

            {/* Name Fields */}
            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Reviewer Name (English)</label>
              <input placeholder='Enter name' className={modalInputClass}
                value={reviewForm.name.en}
                onChange={(e) => setReviewForm({ ...reviewForm, name: { ...reviewForm.name, en: e.target.value } })} />
            </div>
            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Reviewer Name (Hindi)</label>
              <input placeholder='नाम दर्ज करें' className={modalInputClass}
                value={reviewForm.name.hi}
                onChange={(e) => setReviewForm({ ...reviewForm, name: { ...reviewForm.name, hi: e.target.value } })} />
            </div>

            {/* Rating */}
            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Rating</label>
              {renderStars(reviewForm.rating, true, (star) => setReviewForm({ ...reviewForm, rating: star }))}
            </div>

            {/* Text Review Fields */}
            {reviewForm.type === 'text' && (
              <>
                <div>
                  <label className='text-sm text-gray-600 mb-1 block'>Review (English)</label>
                  <textarea rows={3} placeholder='Enter review text'
                    className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none resize-none'
                    value={reviewForm.review.en}
                    onChange={(e) => setReviewForm({ ...reviewForm, review: { ...reviewForm.review, en: e.target.value } })} />
                </div>
                <div>
                  <label className='text-sm text-gray-600 mb-1 block'>Review (Hindi)</label>
                  <textarea rows={3} placeholder='समीक्षा दर्ज करें'
                    className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none resize-none'
                    value={reviewForm.review.hi}
                    onChange={(e) => setReviewForm({ ...reviewForm, review: { ...reviewForm.review, hi: e.target.value } })} />
                </div>
              </>
            )}

            {/* Video Review Fields */}
            {reviewForm.type === 'video' && (
              <>
                <div>
                  <label className='text-sm text-gray-600 mb-1 block'>Video URL (YouTube Embed)</label>
                  <input placeholder='https://www.youtube.com/embed/...' className={modalInputClass}
                    value={reviewForm.videoUrl}
                    onChange={(e) => setReviewForm({ ...reviewForm, videoUrl: e.target.value })} />
                </div>
                {reviewForm.videoUrl && (
                  <div className='rounded-2xl overflow-hidden'>
                    <iframe src={reviewForm.videoUrl} className='w-full h-48' frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                  </div>
                )}
                <div>
                  <label className='text-sm text-gray-600 mb-1 block'>Caption (English)</label>
                  <input placeholder='Enter video caption' className={modalInputClass}
                    value={reviewForm.caption.en}
                    onChange={(e) => setReviewForm({ ...reviewForm, caption: { ...reviewForm.caption, en: e.target.value } })} />
                </div>
                <div>
                  <label className='text-sm text-gray-600 mb-1 block'>Caption (Hindi)</label>
                  <input placeholder='वीडियो कैप्शन दर्ज करें' className={modalInputClass}
                    value={reviewForm.caption.hi}
                    onChange={(e) => setReviewForm({ ...reviewForm, caption: { ...reviewForm.caption, hi: e.target.value } })} />
                </div>
              </>
            )}

            {/* Action Buttons */}
            <div className='flex justify-end gap-3 pt-2'>
              <button onClick={() => setShowReviewModal(false)} className='px-4 py-2 border rounded-2xl cursor-pointer hover:bg-gray-200 transition'>
                Cancel
              </button>
              <button onClick={handleSaveReview}
                className='cursor-pointer bg-amber-700 text-white px-4 py-2 rounded-2xl hover:bg-amber-800 transition active:scale-95'>
                {editReviewIndex !== null ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Reviews