import React, { useState } from 'react'
import DesktopHeader from '../components/layout/DesktopHeader'
import MobileHeader from '../components/layout/MobileHeader'
import Sidebar from '../components/layout/Sidebar'
import Footer from '../components/layout/Footer'
import { FaSave, FaUser, FaEnvelope, FaPhone, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'

const Profile = () => {

  const [formData, setFormData] = useState({
    avatar: '',
    name: 'Administrator',
    email: 'admin@beyondthree.org',
    phone: '+91 9876543210',
    role: 'Main Admin'
  })

  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  })

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  })

  const [saved, setSaved] = useState(false)
  const [passwordChanged, setPasswordChanged] = useState(false)

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setFormData({ ...formData, avatar: URL.createObjectURL(file) })
  }

  const handleSaveProfile = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleChangePassword = () => {
    if (passwordData.new !== passwordData.confirm) {
      alert('New passwords do not match!')
      return
    }
    if (passwordData.new.length < 6) {
      alert('Password must be at least 6 characters!')
      return
    }
    setPasswordChanged(true)
    setPasswordData({ current: '', new: '', confirm: '' })
    setTimeout(() => setPasswordChanged(false), 3000)
  }

  const togglePassword = (field) => {
    setShowPasswords({ ...showPasswords, [field]: !showPasswords[field] })
  }

  return (
    <div className='min-h-dvh flex bg-amber-100'>
      <div className='h-dvh sticky top-0 w-64 overflow-hidden max-md:hidden'>
        <Sidebar />
      </div>
      <div className='flex-1'>
        <div className='max-md:hidden'>
          <DesktopHeader heading={"Profile"} />
        </div>
        <div className='md:hidden'>
          <MobileHeader heading={"Profile"} />
        </div>
        <div className='min-h-[92.5dvh] p-4'>
          <div>
            <h1 className='text-xl font-bold'>Admin Profile</h1>
            <span className='text-amber-700'>
              Manage your account settings and security.
            </span>
          </div>

          <div className='mt-6 grid lg:grid-cols-2 gap-6'>
            {/* Profile Information */}
            <div className='bg-white rounded-2xl shadow-lg p-6 space-y-4'>
              <div className='flex justify-between items-center border-b pb-2'>
                <h2 className='font-bold text-lg'>Profile Information</h2>
                <button onClick={handleSaveProfile}
                  className='cursor-pointer flex gap-2 items-center bg-amber-700 text-white px-3 py-1.5 rounded-lg hover:bg-amber-800 transition text-sm'>
                  <FaSave size={12} />
                  <span>{saved ? 'Saved!' : 'Save'}</span>
                </button>
              </div>

              {/* Avatar */}
              <div className='flex items-center gap-4'>
                <div className='w-20 h-20 rounded-full overflow-hidden bg-amber-200 flex items-center justify-center'>
                  {formData.avatar ? (
                    <img src={formData.avatar} className='w-full h-full object-cover' alt="Avatar" />
                  ) : (
                    <FaUser size={32} className='text-amber-700' />
                  )}
                </div>
                <div>
                  <label className='cursor-pointer bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg text-sm transition'>
                    Change Photo
                    <input type="file" accept="image/*" className='hidden' onChange={handleAvatarChange} />
                  </label>
                </div>
              </div>

              <div>
                <label className='text-sm text-gray-600 mb-1 flex items-center gap-2'>
                  <FaUser className='text-amber-600' /> Full Name
                </label>
                <input
                  className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none'
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </div>

              <div>
                <label className='text-sm text-gray-600 mb-1 flex items-center gap-2'>
                  <FaEnvelope className='text-amber-600' /> Email Address
                </label>
                <input type="email"
                  className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none'
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              </div>

              <div>
                <label className='text-sm text-gray-600 mb-1 flex items-center gap-2'>
                  <FaPhone className='text-amber-600' /> Phone Number
                </label>
                <input type="tel"
                  className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none'
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
              </div>

              <div>
                <label className='text-sm text-gray-600 mb-1 block'>Role</label>
                <input disabled
                  className='w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-xl text-gray-500'
                  value={formData.role} />
              </div>
            </div>

            {/* Change Password */}
            <div className='bg-white rounded-2xl shadow-lg p-6 space-y-4'>
              <div className='flex justify-between items-center border-b pb-2'>
                <h2 className='font-bold text-lg'>Change Password</h2>
              </div>

              <div>
                <label className='text-sm text-gray-600 mb-1 flex items-center gap-2'>
                  <FaLock className='text-amber-600' /> Current Password
                </label>
                <div className='relative'>
                  <input
                    type={showPasswords.current ? 'text' : 'password'}
                    placeholder='Enter current password'
                    className='w-full px-3 py-2 pr-10 bg-gray-50 border border-yellow-400 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none'
                    value={passwordData.current}
                    onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })} />
                  <button onClick={() => togglePassword('current')}
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer'>
                    {showPasswords.current ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div>
                <label className='text-sm text-gray-600 mb-1 flex items-center gap-2'>
                  <FaLock className='text-amber-600' /> New Password
                </label>
                <div className='relative'>
                  <input
                    type={showPasswords.new ? 'text' : 'password'}
                    placeholder='Enter new password'
                    className='w-full px-3 py-2 pr-10 bg-gray-50 border border-yellow-400 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none'
                    value={passwordData.new}
                    onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })} />
                  <button onClick={() => togglePassword('new')}
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer'>
                    {showPasswords.new ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div>
                <label className='text-sm text-gray-600 mb-1 flex items-center gap-2'>
                  <FaLock className='text-amber-600' /> Confirm New Password
                </label>
                <div className='relative'>
                  <input
                    type={showPasswords.confirm ? 'text' : 'password'}
                    placeholder='Confirm new password'
                    className='w-full px-3 py-2 pr-10 bg-gray-50 border border-yellow-400 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none'
                    value={passwordData.confirm}
                    onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })} />
                  <button onClick={() => togglePassword('confirm')}
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer'>
                    {showPasswords.confirm ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <button onClick={handleChangePassword}
                className='w-full cursor-pointer bg-amber-700 text-white py-2 rounded-xl hover:bg-amber-800 transition'>
                {passwordChanged ? 'Password Changed!' : 'Change Password'}
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Profile