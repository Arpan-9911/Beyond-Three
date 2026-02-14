import React, { useState } from 'react'
import DesktopHeader from '../components/layout/DesktopHeader'
import MobileHeader from '../components/layout/MobileHeader'
import Sidebar from '../components/layout/Sidebar'
import Footer from '../components/layout/Footer'
import { FaSave, FaPlus, FaTrash, FaEdit, FaFolder, FaFileAlt, FaQuestionCircle } from 'react-icons/fa'

const defaultCategories = [
  { _id: '1', name: { en: 'Founder', hi: 'संस्थापक' } },
  { _id: '2', name: { en: 'Who We Are', hi: 'हमारे बारे में' } },
  { _id: '3', name: { en: 'Mission & Vision', hi: 'मिशन और दृष्टिकोण' } },
  { _id: '4', name: { en: 'Legal Documents', hi: 'कानूनी दस्तावेज़' } },
  { _id: '5', name: { en: 'FAQs', hi: 'सामान्य प्रश्न' } },
]

const About = () => {
  const [categories, setCategories] = useState(defaultCategories)
  const [activeCategory, setActiveCategory] = useState('1')
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [categoryForm, setCategoryForm] = useState({ name: { en: '', hi: '' } })

  // --- Founder State ---
  const [founderData, setFounderData] = useState({
    image: '',
    imagePreview: '',
    name: { en: 'Swami Ji', hi: 'स्वामी जी' },
    title: { en: 'Founder of Beyond Three', hi: 'Beyond Three के संस्थापक' },
    description: {
      en: 'Swami Ji founded Beyond Three with a vision to uplift society through spiritual wisdom, social responsibility, and sustainable development.',
      hi: 'स्वामी जी ने Beyond Three की स्थापना समाज को आध्यात्मिक ज्ञान, सामाजिक जिम्मेदारी और सतत विकास के माध्यम से सशक्त बनाने के उद्देश्य से की।'
    }
  })

  // --- Who We Are State ---
  const [whoWeAreData, setWhoWeAreData] = useState({
    description: {
      en: 'Beyond Three is a social and spiritual initiative dedicated to the holistic development of individuals and communities.',
      hi: 'Beyond Three एक सामाजिक और आध्यात्मिक पहल है, जो व्यक्तियों और समुदायों के समग्र विकास के लिए समर्पित है।'
    }
  })

  // --- Mission & Vision State ---
  const [missionVisionData, setMissionVisionData] = useState({
    mission: {
      en: 'Our mission is to empower individuals and communities through education, awareness, and ethical values.',
      hi: 'हमारा मिशन शिक्षा, जागरूकता और नैतिक मूल्यों के माध्यम से व्यक्तियों और समुदायों को सशक्त बनाना है।'
    },
    vision: {
      en: 'Our vision is to build a harmonious society where tradition and modern innovation coexist.',
      hi: 'हमारी दृष्टि एक ऐसे सामंजस्यपूर्ण समाज का निर्माण करना है जहाँ परंपरा और आधुनिक नवाचार साथ-साथ आगे बढ़ें।'
    }
  })

  // --- Legal Documents State ---
  const [documents, setDocuments] = useState([
    { title: { en: 'Trust Registration Certificate', hi: 'ट्रस्ट पंजीकरण प्रमाण पत्र' }, file: null },
    { title: { en: 'PAN Card', hi: 'पैन कार्ड' }, file: null },
    { title: { en: '12A Certificate', hi: '12A प्रमाण पत्र' }, file: null },
    { title: { en: '80G Certificate', hi: '80G प्रमाण पत्र' }, file: null },
  ])
  const [showDocModal, setShowDocModal] = useState(false)
  const [editDocIndex, setEditDocIndex] = useState(null)
  const [docForm, setDocForm] = useState({ title: { en: '', hi: '' }, file: null })

  // --- FAQs State ---
  const [faqs, setFaqs] = useState([
    {
      question: { en: 'What is Beyond Three?', hi: 'Beyond Three क्या है?' },
      answer: { en: 'Beyond Three is a social and spiritual initiative focused on community development.', hi: 'Beyond Three एक सामाजिक और आध्यात्मिक पहल है।' }
    },
    {
      question: { en: 'How can I join Beyond Three?', hi: 'मैं Beyond Three से कैसे जुड़ सकता हूँ?' },
      answer: { en: 'You can join by participating in our programs, volunteering, or collaborating with us.', hi: 'आप हमारे कार्यक्रमों में भाग लेकर, स्वयंसेवा करके या सहयोग करके जुड़ सकते हैं।' }
    },
  ])
  const [showFaqModal, setShowFaqModal] = useState(false)
  const [editFaqIndex, setEditFaqIndex] = useState(null)
  const [faqForm, setFaqForm] = useState({ question: { en: '', hi: '' }, answer: { en: '', hi: '' } })

  const [saved, setSaved] = useState(false)

  // --- Category Handlers ---
  const handleSaveCategory = () => {
    if (!categoryForm.name.en.trim() || !categoryForm.name.hi.trim()) return
    const newCat = { _id: Date.now().toString(), name: { ...categoryForm.name } }
    setCategories([...categories, newCat])
    setShowCategoryModal(false)
    setCategoryForm({ name: { en: '', hi: '' } })
  }

  const handleDeleteCategory = (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return
    setCategories(categories.filter(c => c._id !== id))
    if (activeCategory === id && categories.length > 1) {
      setActiveCategory(categories.find(c => c._id !== id)?._id || '')
    }
  }

  // --- Founder Handlers ---
  const handleFounderImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setFounderData({ ...founderData, image: file, imagePreview: URL.createObjectURL(file) })
  }

  // --- Document Handlers ---
  const openAddDoc = () => {
    setDocForm({ title: { en: '', hi: '' }, file: null })
    setEditDocIndex(null)
    setShowDocModal(true)
  }
  const openEditDoc = (index) => {
    setDocForm(documents[index])
    setEditDocIndex(index)
    setShowDocModal(true)
  }
  const handleSaveDoc = () => {
    if (!docForm.title.en.trim()) return
    if (editDocIndex !== null) {
      const updated = [...documents]
      updated[editDocIndex] = docForm
      setDocuments(updated)
    } else {
      setDocuments([...documents, docForm])
    }
    setShowDocModal(false)
  }
  const handleDeleteDoc = (index) => {
    if (!window.confirm('Delete this document?')) return
    setDocuments(documents.filter((_, i) => i !== index))
  }

  // --- FAQ Handlers ---
  const openAddFaq = () => {
    setFaqForm({ question: { en: '', hi: '' }, answer: { en: '', hi: '' } })
    setEditFaqIndex(null)
    setShowFaqModal(true)
  }
  const openEditFaq = (index) => {
    setFaqForm(faqs[index])
    setEditFaqIndex(index)
    setShowFaqModal(true)
  }
  const handleSaveFaq = () => {
    if (!faqForm.question.en.trim()) return
    if (editFaqIndex !== null) {
      const updated = [...faqs]
      updated[editFaqIndex] = faqForm
      setFaqs(updated)
    } else {
      setFaqs([...faqs, faqForm])
    }
    setShowFaqModal(false)
  }
  const handleDeleteFaq = (index) => {
    if (!window.confirm('Delete this FAQ?')) return
    setFaqs(faqs.filter((_, i) => i !== index))
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const inputClass = 'w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none'
  const textareaClass = 'w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none resize-none'
  const modalInputClass = 'w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none'

  // --- Render Content for Active Category ---
  const renderContent = () => {
    switch (activeCategory) {
      case '1': return renderFounder()
      case '2': return renderWhoWeAre()
      case '3': return renderMissionVision()
      case '4': return renderLegalDocuments()
      case '5': return renderFaqs()
      default: return renderCustomCategory()
    }
  }

  const renderFounder = () => (
    <div className='bg-white rounded-2xl shadow-lg p-6 space-y-4'>
      <div className='flex justify-between items-center border-b pb-2'>
        <h2 className='font-bold text-lg'>Founder Details</h2>
        <button onClick={handleSave}
          className='cursor-pointer flex gap-2 items-center bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition text-sm'>
          <FaSave size={14} />
          <span>{saved ? 'Saved!' : 'Save'}</span>
        </button>
      </div>

      <div>
        <label className='text-sm text-gray-600 mb-1 block'>Founder Image</label>
        <input type="file" accept="image/*" className={inputClass} onChange={handleFounderImageChange} />
      </div>
      {founderData.imagePreview && (
        <img src={founderData.imagePreview} className='h-40 w-full object-cover rounded-xl' alt="Preview" />
      )}

      <div className='grid md:grid-cols-2 gap-4'>
        <div>
          <label className='text-sm text-gray-600 mb-1 block'>Name (English)</label>
          <input className={inputClass} value={founderData.name.en}
            onChange={(e) => setFounderData({ ...founderData, name: { ...founderData.name, en: e.target.value } })} />
        </div>
        <div>
          <label className='text-sm text-gray-600 mb-1 block'>Name (Hindi)</label>
          <input className={inputClass} value={founderData.name.hi}
            onChange={(e) => setFounderData({ ...founderData, name: { ...founderData.name, hi: e.target.value } })} />
        </div>
      </div>

      <div className='grid md:grid-cols-2 gap-4'>
        <div>
          <label className='text-sm text-gray-600 mb-1 block'>Title (English)</label>
          <input className={inputClass} value={founderData.title.en}
            onChange={(e) => setFounderData({ ...founderData, title: { ...founderData.title, en: e.target.value } })} />
        </div>
        <div>
          <label className='text-sm text-gray-600 mb-1 block'>Title (Hindi)</label>
          <input className={inputClass} value={founderData.title.hi}
            onChange={(e) => setFounderData({ ...founderData, title: { ...founderData.title, hi: e.target.value } })} />
        </div>
      </div>

      <div>
        <label className='text-sm text-gray-600 mb-1 block'>Description (English)</label>
        <textarea rows={4} className={textareaClass} value={founderData.description.en}
          onChange={(e) => setFounderData({ ...founderData, description: { ...founderData.description, en: e.target.value } })} />
      </div>
      <div>
        <label className='text-sm text-gray-600 mb-1 block'>Description (Hindi)</label>
        <textarea rows={4} className={textareaClass} value={founderData.description.hi}
          onChange={(e) => setFounderData({ ...founderData, description: { ...founderData.description, hi: e.target.value } })} />
      </div>
    </div>
  )

  const renderWhoWeAre = () => (
    <div className='bg-white rounded-2xl shadow-lg p-6 space-y-4'>
      <div className='flex justify-between items-center border-b pb-2'>
        <h2 className='font-bold text-lg'>Who We Are</h2>
        <button onClick={handleSave}
          className='cursor-pointer flex gap-2 items-center bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition text-sm'>
          <FaSave size={14} />
          <span>{saved ? 'Saved!' : 'Save'}</span>
        </button>
      </div>
      <div>
        <label className='text-sm text-gray-600 mb-1 block'>Description (English)</label>
        <textarea rows={5} className={textareaClass} value={whoWeAreData.description.en}
          onChange={(e) => setWhoWeAreData({ ...whoWeAreData, description: { ...whoWeAreData.description, en: e.target.value } })} />
      </div>
      <div>
        <label className='text-sm text-gray-600 mb-1 block'>Description (Hindi)</label>
        <textarea rows={5} className={textareaClass} value={whoWeAreData.description.hi}
          onChange={(e) => setWhoWeAreData({ ...whoWeAreData, description: { ...whoWeAreData.description, hi: e.target.value } })} />
      </div>
    </div>
  )

  const renderMissionVision = () => (
    <div className='bg-white rounded-2xl shadow-lg p-6 space-y-4'>
      <div className='flex justify-between items-center border-b pb-2'>
        <h2 className='font-bold text-lg'>Mission & Vision</h2>
        <button onClick={handleSave}
          className='cursor-pointer flex gap-2 items-center bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition text-sm'>
          <FaSave size={14} />
          <span>{saved ? 'Saved!' : 'Save'}</span>
        </button>
      </div>
      <div>
        <label className='text-sm text-gray-600 mb-1 block'>Mission (English)</label>
        <textarea rows={4} className={textareaClass} value={missionVisionData.mission.en}
          onChange={(e) => setMissionVisionData({ ...missionVisionData, mission: { ...missionVisionData.mission, en: e.target.value } })} />
      </div>
      <div>
        <label className='text-sm text-gray-600 mb-1 block'>Mission (Hindi)</label>
        <textarea rows={4} className={textareaClass} value={missionVisionData.mission.hi}
          onChange={(e) => setMissionVisionData({ ...missionVisionData, mission: { ...missionVisionData.mission, hi: e.target.value } })} />
      </div>
      <div>
        <label className='text-sm text-gray-600 mb-1 block'>Vision (English)</label>
        <textarea rows={4} className={textareaClass} value={missionVisionData.vision.en}
          onChange={(e) => setMissionVisionData({ ...missionVisionData, vision: { ...missionVisionData.vision, en: e.target.value } })} />
      </div>
      <div>
        <label className='text-sm text-gray-600 mb-1 block'>Vision (Hindi)</label>
        <textarea rows={4} className={textareaClass} value={missionVisionData.vision.hi}
          onChange={(e) => setMissionVisionData({ ...missionVisionData, vision: { ...missionVisionData.vision, hi: e.target.value } })} />
      </div>
    </div>
  )

  const renderLegalDocuments = () => (
    <div className='bg-white rounded-2xl shadow-lg p-6'>
      <div className='flex justify-between items-center border-b pb-2 mb-4'>
        <h2 className='font-bold text-lg'>Legal Documents</h2>
        <button onClick={openAddDoc}
          className='cursor-pointer flex gap-2 items-center bg-amber-700 text-white px-3 py-1.5 rounded-lg hover:bg-amber-800 transition text-sm'>
          <FaPlus size={12} />
          <span>Add Document</span>
        </button>
      </div>
      <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {documents.map((doc, index) => (
          <div key={index} className='bg-gray-50 rounded-xl p-4 flex gap-3 items-start'>
            <div className='bg-amber-100 text-amber-700 p-2.5 rounded-full flex-shrink-0'>
              <FaFileAlt size={18} />
            </div>
            <div className='flex-1 min-w-0'>
              <h3 className='font-semibold text-sm truncate'>{doc.title.en}</h3>
              <p className='text-xs text-gray-500 truncate'>{doc.title.hi}</p>
              <div className='flex gap-2 mt-2'>
                <button onClick={() => openEditDoc(index)} className='text-blue-600 cursor-pointer'><FaEdit size={14} /></button>
                <button onClick={() => handleDeleteDoc(index)} className='text-red-600 cursor-pointer'><FaTrash size={14} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {documents.length === 0 && (
        <p className='text-gray-400 text-sm text-center py-4'>No documents added yet.</p>
      )}
    </div>
  )

  const renderFaqs = () => (
    <div className='bg-white rounded-2xl shadow-lg p-6'>
      <div className='flex justify-between items-center border-b pb-2 mb-4'>
        <h2 className='font-bold text-lg'>FAQs</h2>
        <button onClick={openAddFaq}
          className='cursor-pointer flex gap-2 items-center bg-amber-700 text-white px-3 py-1.5 rounded-lg hover:bg-amber-800 transition text-sm'>
          <FaPlus size={12} />
          <span>Add FAQ</span>
        </button>
      </div>
      <div className='space-y-3'>
        {faqs.map((faq, index) => (
          <div key={index} className='bg-gray-50 rounded-xl p-4'>
            <div className='flex items-start justify-between gap-2'>
              <div className='flex gap-2 items-start flex-1 min-w-0'>
                <FaQuestionCircle className='text-amber-600 mt-1 flex-shrink-0' />
                <div className='min-w-0'>
                  <h3 className='font-semibold text-sm'>{faq.question.en}</h3>
                  <p className='text-xs text-gray-500'>{faq.question.hi}</p>
                  <p className='text-sm text-gray-600 mt-1'>{faq.answer.en}</p>
                </div>
              </div>
              <div className='flex gap-2 shrink-0'>
                <button onClick={() => openEditFaq(index)} className='text-blue-600 cursor-pointer'><FaEdit size={14} /></button>
                <button onClick={() => handleDeleteFaq(index)} className='text-red-600 cursor-pointer'><FaTrash size={14} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {faqs.length === 0 && (
        <p className='text-gray-400 text-sm text-center py-4'>No FAQs added yet.</p>
      )}
    </div>
  )

  const renderCustomCategory = () => {
    const cat = categories.find(c => c._id === activeCategory)
    return (
      <div className='bg-white rounded-2xl shadow-lg p-6 space-y-4'>
        <div className='flex justify-between items-center border-b pb-2'>
          <h2 className='font-bold text-lg'>{cat?.name.en || 'Custom Section'}</h2>
          <button onClick={handleSave}
            className='cursor-pointer flex gap-2 items-center bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition text-sm'>
            <FaSave size={14} />
            <span>{saved ? 'Saved!' : 'Save'}</span>
          </button>
        </div>
        <p className='text-gray-400 text-sm text-center py-8'>
          This is a custom category. Content management will be available after backend integration.
        </p>
      </div>
    )
  }

  const currentCategory = categories.find(c => c._id === activeCategory)

  return (
    <div className='min-h-dvh flex bg-amber-100'>
      <div className='h-dvh sticky top-0 w-64 overflow-hidden max-md:hidden'>
        <Sidebar />
      </div>
      <div className='flex-1'>
        <div className='max-md:hidden'>
          <DesktopHeader heading={"About Us"} />
        </div>
        <div className='md:hidden'>
          <MobileHeader heading={"About Us"} />
        </div>
        <div className='min-h-[92.5dvh] p-4'>
          <div className='flex gap-6 max-lg:flex-col'>

            {/* Categories Sidebar */}
            <div className='lg:w-64 shrink-0'>
              <div className='flex items-center justify-between mb-4'>
                <h2 className='text-amber-700 font-semibold uppercase tracking-wide text-sm'>Sections</h2>
                <button onClick={() => { setCategoryForm({ name: { en: '', hi: '' } }); setShowCategoryModal(true) }}
                  className='text-amber-700 hover:text-amber-800 cursor-pointer'>
                  <FaPlus size={14} />
                </button>
              </div>
              <div className='space-y-2'>
                {categories.map((cat) => (
                  <button
                    key={cat._id}
                    onClick={() => setActiveCategory(cat._id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition cursor-pointer ${activeCategory === cat._id
                      ? 'bg-amber-600 text-white shadow-lg'
                      : 'bg-white hover:bg-amber-50 text-gray-700'
                      }`}
                  >
                    <FaFolder size={18} />
                    <div className='flex flex-col text-xs text-left'>
                      <span className='font-medium'>{cat.name.en}</span>
                      <span className='font-medium'>{cat.name.hi}</span>
                    </div>
                    <div className='ml-auto flex items-center gap-2'>
                      {activeCategory === cat._id && (
                        <span className='w-2 h-2 bg-white rounded-full'></span>
                      )}
                      {!['1', '2', '3', '4', '5'].includes(cat._id) && (
                        <FaTrash size={14}
                          onClick={(e) => { e.stopPropagation(); handleDeleteCategory(cat._id) }} />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className='flex-1'>
              <div className='flex flex-wrap gap-4 justify-between items-center mb-6'>
                <h1 className='text-2xl font-bold text-gray-800'>
                  {currentCategory?.name.en || 'About'}
                </h1>
              </div>
              {renderContent()}
            </div>
          </div>
        </div>
        <Footer />
      </div>

      {/* Category Modal */}
      {showCategoryModal && (
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-4xl p-6 w-full max-w-md space-y-3'>
            <h2 className='font-bold text-lg'>Add Section</h2>
            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Name (English)</label>
              <input placeholder='Enter section name in English' className={modalInputClass}
                value={categoryForm.name.en}
                onChange={(e) => setCategoryForm({ ...categoryForm, name: { ...categoryForm.name, en: e.target.value } })} />
            </div>
            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Name (Hindi)</label>
              <input placeholder='सेक्शन का नाम हिंदी में दर्ज करें' className={modalInputClass}
                value={categoryForm.name.hi}
                onChange={(e) => setCategoryForm({ ...categoryForm, name: { ...categoryForm.name, hi: e.target.value } })} />
            </div>
            <div className='flex justify-end gap-3 pt-2'>
              <button onClick={() => setShowCategoryModal(false)} className='px-4 py-2 border rounded-2xl cursor-pointer hover:bg-gray-200 transition'>
                Cancel
              </button>
              <button onClick={handleSaveCategory}
                className='cursor-pointer bg-amber-700 text-white px-4 py-2 rounded-2xl hover:bg-amber-800 transition active:scale-95'>
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Document Modal */}
      {showDocModal && (
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-4xl p-6 w-full max-w-md space-y-3'>
            <h2 className='font-bold text-lg'>{editDocIndex !== null ? 'Edit Document' : 'Add Document'}</h2>
            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Title (English)</label>
              <input placeholder='Enter document title' className={modalInputClass}
                value={docForm.title.en}
                onChange={(e) => setDocForm({ ...docForm, title: { ...docForm.title, en: e.target.value } })} />
            </div>
            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Title (Hindi)</label>
              <input placeholder='दस्तावेज़ शीर्षक दर्ज करें' className={modalInputClass}
                value={docForm.title.hi}
                onChange={(e) => setDocForm({ ...docForm, title: { ...docForm.title, hi: e.target.value } })} />
            </div>
            <div>
              <label className='text-sm text-gray-600 mb-1 block'>PDF File</label>
              <input type="file" accept=".pdf" className={modalInputClass}
                onChange={(e) => setDocForm({ ...docForm, file: e.target.files[0] || null })} />
            </div>
            <div className='flex justify-end gap-3 pt-2'>
              <button onClick={() => setShowDocModal(false)} className='px-4 py-2 border rounded-2xl cursor-pointer hover:bg-gray-200 transition'>
                Cancel
              </button>
              <button onClick={handleSaveDoc}
                className='cursor-pointer bg-amber-700 text-white px-4 py-2 rounded-2xl hover:bg-amber-800 transition active:scale-95'>
                {editDocIndex !== null ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FAQ Modal */}
      {showFaqModal && (
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-4xl p-6 w-full max-w-md space-y-3 max-h-[90vh] overflow-y-auto'>
            <h2 className='font-bold text-lg'>{editFaqIndex !== null ? 'Edit FAQ' : 'Add FAQ'}</h2>
            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Question (English)</label>
              <input placeholder='Enter question' className={modalInputClass}
                value={faqForm.question.en}
                onChange={(e) => setFaqForm({ ...faqForm, question: { ...faqForm.question, en: e.target.value } })} />
            </div>
            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Question (Hindi)</label>
              <input placeholder='प्रश्न दर्ज करें' className={modalInputClass}
                value={faqForm.question.hi}
                onChange={(e) => setFaqForm({ ...faqForm, question: { ...faqForm.question, hi: e.target.value } })} />
            </div>
            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Answer (English)</label>
              <textarea rows={3} placeholder='Enter answer'
                className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none resize-none'
                value={faqForm.answer.en}
                onChange={(e) => setFaqForm({ ...faqForm, answer: { ...faqForm.answer, en: e.target.value } })} />
            </div>
            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Answer (Hindi)</label>
              <textarea rows={3} placeholder='उत्तर दर्ज करें'
                className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none resize-none'
                value={faqForm.answer.hi}
                onChange={(e) => setFaqForm({ ...faqForm, answer: { ...faqForm.answer, hi: e.target.value } })} />
            </div>
            <div className='flex justify-end gap-3 pt-2'>
              <button onClick={() => setShowFaqModal(false)} className='px-4 py-2 border rounded-2xl cursor-pointer hover:bg-gray-200 transition'>
                Cancel
              </button>
              <button onClick={handleSaveFaq}
                className='cursor-pointer bg-amber-700 text-white px-4 py-2 rounded-2xl hover:bg-amber-800 transition active:scale-95'>
                {editFaqIndex !== null ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default About