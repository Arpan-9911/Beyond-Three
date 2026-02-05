import React, { useState } from 'react'
import DesktopHeader from '../components/layout/DesktopHeader'
import MobileHeader from '../components/layout/MobileHeader'
import Sidebar from '../components/layout/Sidebar'
import Footer from '../components/layout/Footer'
import { FaSave, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa'

const Contact = () => {

  const [formData, setFormData] = useState({
    phone: '+91 9876543210',
    whatsapp: '+91 9876543210',
    email: 'hello@beyondthree.org',
    address: {
      en: '123, Main Street, City Name, State - 123456',
      hi: '123, मुख्य सड़क, शहर का नाम, राज्य - 123456'
    },
    mapEmbed: '',
    social: {
      facebook: '',
      twitter: '',
      instagram: '',
      youtube: ''
    },
    officeHours: {
      en: 'Monday - Saturday: 9:00 AM - 6:00 PM',
      hi: 'सोमवार - शनिवार: सुबह 9:00 - शाम 6:00'
    }
  })

  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    // In real app, this would save to backend
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className='min-h-dvh flex bg-amber-100'>
      <div className='h-dvh sticky top-0 w-64 overflow-hidden max-md:hidden'>
        <Sidebar />
      </div>
      <div className='flex-1'>
        <div className='max-md:hidden'>
          <DesktopHeader heading={"Contact Settings"} />
        </div>
        <div className='md:hidden'>
          <MobileHeader heading={"Contact Settings"} />
        </div>
        <div className='min-h-[92.5dvh] p-4'>
          <div className='md:flex gap-4 justify-between items-center'>
            <div>
              <h1 className='text-xl font-bold'>Contact Information</h1>
              <span className='text-amber-700'>
                Manage your organization's contact details.
              </span>
            </div>
            <button onClick={handleSave}
              className='cursor-pointer flex gap-2 items-center bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition max-md:mt-3'>
              <FaSave />
              <span>{saved ? 'Saved!' : 'Save Changes'}</span>
            </button>
          </div>

          <div className='mt-6 grid lg:grid-cols-2 gap-6'>
            {/* Contact Details */}
            <div className='bg-white rounded-2xl shadow-lg p-6 space-y-4'>
              <h2 className='font-bold text-lg border-b pb-2'>Contact Details</h2>

              <div>
                <label className='text-sm text-gray-600 mb-1 flex items-center gap-2'>
                  <FaPhone className='text-amber-600' /> Phone Number
                </label>
                <input
                  className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none'
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
              </div>

              <div>
                <label className='text-sm text-gray-600 mb-1 flex items-center gap-2'>
                  <FaWhatsapp className='text-green-600' /> WhatsApp Number
                </label>
                <input
                  className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none'
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })} />
              </div>

              <div>
                <label className='text-sm text-gray-600 mb-1 flex items-center gap-2'>
                  <FaEnvelope className='text-amber-600' /> Email Address
                </label>
                <input
                  className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none'
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              </div>

              <div>
                <label className='text-sm text-gray-600 mb-1 flex items-center gap-2'>
                  <FaMapMarkerAlt className='text-amber-600' /> Address (English)
                </label>
                <textarea rows={2}
                  className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none resize-none'
                  value={formData.address.en}
                  onChange={(e) => setFormData({ ...formData, address: { ...formData.address, en: e.target.value } })} />
              </div>

              <div>
                <label className='text-sm text-gray-600 mb-1 flex items-center gap-2'>
                  <FaMapMarkerAlt className='text-amber-600' /> Address (Hindi)
                </label>
                <textarea rows={2}
                  className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none resize-none'
                  value={formData.address.hi}
                  onChange={(e) => setFormData({ ...formData, address: { ...formData.address, hi: e.target.value } })} />
              </div>

              <div>
                <label className='text-sm text-gray-600 mb-1 block'>Office Hours (English)</label>
                <input
                  className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none'
                  value={formData.officeHours.en}
                  onChange={(e) => setFormData({ ...formData, officeHours: { ...formData.officeHours, en: e.target.value } })} />
              </div>

              <div>
                <label className='text-sm text-gray-600 mb-1 block'>Office Hours (Hindi)</label>
                <input
                  className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none'
                  value={formData.officeHours.hi}
                  onChange={(e) => setFormData({ ...formData, officeHours: { ...formData.officeHours, hi: e.target.value } })} />
              </div>
            </div>

            {/* Social Media & Map */}
            <div className='space-y-6'>
              <div className='bg-white rounded-2xl shadow-lg p-6 space-y-4'>
                <h2 className='font-bold text-lg border-b pb-2'>Social Media Links</h2>

                <div>
                  <label className='text-sm text-gray-600 mb-1 flex items-center gap-2'>
                    <FaFacebook className='text-blue-600' /> Facebook
                  </label>
                  <input placeholder='https://facebook.com/...'
                    className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none'
                    value={formData.social.facebook}
                    onChange={(e) => setFormData({ ...formData, social: { ...formData.social, facebook: e.target.value } })} />
                </div>

                <div>
                  <label className='text-sm text-gray-600 mb-1 flex items-center gap-2'>
                    <FaTwitter className='text-sky-500' /> Twitter
                  </label>
                  <input placeholder='https://twitter.com/...'
                    className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none'
                    value={formData.social.twitter}
                    onChange={(e) => setFormData({ ...formData, social: { ...formData.social, twitter: e.target.value } })} />
                </div>

                <div>
                  <label className='text-sm text-gray-600 mb-1 flex items-center gap-2'>
                    <FaInstagram className='text-pink-600' /> Instagram
                  </label>
                  <input placeholder='https://instagram.com/...'
                    className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none'
                    value={formData.social.instagram}
                    onChange={(e) => setFormData({ ...formData, social: { ...formData.social, instagram: e.target.value } })} />
                </div>

                <div>
                  <label className='text-sm text-gray-600 mb-1 flex items-center gap-2'>
                    <FaYoutube className='text-red-600' /> YouTube
                  </label>
                  <input placeholder='https://youtube.com/...'
                    className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none'
                    value={formData.social.youtube}
                    onChange={(e) => setFormData({ ...formData, social: { ...formData.social, youtube: e.target.value } })} />
                </div>
              </div>

              <div className='bg-white rounded-2xl shadow-lg p-6 space-y-4'>
                <h2 className='font-bold text-lg border-b pb-2'>Map Embed</h2>
                <div>
                  <label className='text-sm text-gray-600 mb-1 block'>Google Maps Embed URL</label>
                  <textarea rows={3} placeholder='Paste Google Maps embed iframe src URL here'
                    className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none resize-none'
                    value={formData.mapEmbed}
                    onChange={(e) => setFormData({ ...formData, mapEmbed: e.target.value })} />
                </div>
                {formData.mapEmbed && (
                  <div className='rounded-xl overflow-hidden h-40'>
                    <iframe src={formData.mapEmbed} className='w-full h-full' allowFullScreen loading="lazy" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Contact