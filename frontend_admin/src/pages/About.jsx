import React, { useState } from 'react'
import DesktopHeader from '../components/layout/DesktopHeader'
import MobileHeader from '../components/layout/MobileHeader'
import Sidebar from '../components/layout/Sidebar'
import Footer from '../components/layout/Footer'
import { FaSave, FaPlus, FaTrash, FaEdit } from 'react-icons/fa'

const About = () => {

  const [formData, setFormData] = useState({
    heroImage: '',
    title: { en: 'About Beyond Three', hi: 'बियॉन्ड थ्री के बारे में' },
    subtitle: { en: 'Transforming Lives Through Wellness', hi: 'वेलनेस के माध्यम से जीवन बदलना' },
    mission: {
      en: 'Our mission is to empower individuals to live healthy, anxiety-free, and fulfilling lives through holistic wellness practices.',
      hi: 'हमारा मिशन व्यक्तियों को समग्र वेलनेस प्रथाओं के माध्यम से स्वस्थ, चिंता-मुक्त और संतोषजनक जीवन जीने के लिए सशक्त बनाना है।'
    },
    vision: {
      en: 'A world where everyone has access to tools and techniques for mental peace and physical wellness.',
      hi: 'एक ऐसी दुनिया जहां सभी को मानसिक शांति और शारीरिक कल्याण के लिए उपकरण और तकनीकों तक पहुंच हो।'
    },
    story: {
      en: '',
      hi: ''
    }
  })

  const [teamMembers, setTeamMembers] = useState([])
  const [showTeamModal, setShowTeamModal] = useState(false)
  const [editTeamIndex, setEditTeamIndex] = useState(null)
  const [teamForm, setTeamForm] = useState({
    image: '',
    name: { en: '', hi: '' },
    role: { en: '', hi: '' },
    bio: { en: '', hi: '' }
  })

  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleHeroImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setFormData({ ...formData, heroImage: URL.createObjectURL(file) })
  }

  const openAddTeam = () => {
    setTeamForm({ image: '', name: { en: '', hi: '' }, role: { en: '', hi: '' }, bio: { en: '', hi: '' } })
    setEditTeamIndex(null)
    setShowTeamModal(true)
  }

  const openEditTeam = (index) => {
    setTeamForm(teamMembers[index])
    setEditTeamIndex(index)
    setShowTeamModal(true)
  }

  const handleTeamImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setTeamForm({ ...teamForm, image: URL.createObjectURL(file) })
  }

  const handleSaveTeam = () => {
    if (editTeamIndex !== null) {
      const updated = [...teamMembers]
      updated[editTeamIndex] = teamForm
      setTeamMembers(updated)
    } else {
      setTeamMembers([...teamMembers, teamForm])
    }
    setShowTeamModal(false)
  }

  const handleDeleteTeam = (index) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== index))
  }

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
          <div className='md:flex gap-4 justify-between items-center'>
            <div>
              <h1 className='text-xl font-bold'>About Page Content</h1>
              <span className='text-amber-700'>
                Manage your organization's about page content.
              </span>
            </div>
            <button onClick={handleSave}
              className='cursor-pointer flex gap-2 items-center bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition max-md:mt-3'>
              <FaSave />
              <span>{saved ? 'Saved!' : 'Save Changes'}</span>
            </button>
          </div>

          <div className='mt-6 space-y-6'>
            {/* Hero Section */}
            <div className='bg-white rounded-2xl shadow-lg p-6 space-y-4'>
              <h2 className='font-bold text-lg border-b pb-2'>Hero Section</h2>

              <div>
                <label className='text-sm text-gray-600 mb-1 block'>Hero Image</label>
                <input type="file" accept="image/*"
                  className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none'
                  onChange={handleHeroImageChange} />
              </div>
              {formData.heroImage && (
                <img src={formData.heroImage} className='h-40 w-full object-cover rounded-xl' alt="Hero Preview" />
              )}

              <div className='grid md:grid-cols-2 gap-4'>
                <div>
                  <label className='text-sm text-gray-600 mb-1 block'>Title (English)</label>
                  <input
                    className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none'
                    value={formData.title.en}
                    onChange={(e) => setFormData({ ...formData, title: { ...formData.title, en: e.target.value } })} />
                </div>
                <div>
                  <label className='text-sm text-gray-600 mb-1 block'>Title (Hindi)</label>
                  <input
                    className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none'
                    value={formData.title.hi}
                    onChange={(e) => setFormData({ ...formData, title: { ...formData.title, hi: e.target.value } })} />
                </div>
              </div>

              <div className='grid md:grid-cols-2 gap-4'>
                <div>
                  <label className='text-sm text-gray-600 mb-1 block'>Subtitle (English)</label>
                  <input
                    className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none'
                    value={formData.subtitle.en}
                    onChange={(e) => setFormData({ ...formData, subtitle: { ...formData.subtitle, en: e.target.value } })} />
                </div>
                <div>
                  <label className='text-sm text-gray-600 mb-1 block'>Subtitle (Hindi)</label>
                  <input
                    className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none'
                    value={formData.subtitle.hi}
                    onChange={(e) => setFormData({ ...formData, subtitle: { ...formData.subtitle, hi: e.target.value } })} />
                </div>
              </div>
            </div>

            {/* Mission & Vision */}
            <div className='bg-white rounded-2xl shadow-lg p-6 space-y-4'>
              <h2 className='font-bold text-lg border-b pb-2'>Mission & Vision</h2>

              <div>
                <label className='text-sm text-gray-600 mb-1 block'>Mission (English)</label>
                <textarea rows={3}
                  className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none resize-none'
                  value={formData.mission.en}
                  onChange={(e) => setFormData({ ...formData, mission: { ...formData.mission, en: e.target.value } })} />
              </div>
              <div>
                <label className='text-sm text-gray-600 mb-1 block'>Mission (Hindi)</label>
                <textarea rows={3}
                  className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none resize-none'
                  value={formData.mission.hi}
                  onChange={(e) => setFormData({ ...formData, mission: { ...formData.mission, hi: e.target.value } })} />
              </div>
              <div>
                <label className='text-sm text-gray-600 mb-1 block'>Vision (English)</label>
                <textarea rows={3}
                  className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none resize-none'
                  value={formData.vision.en}
                  onChange={(e) => setFormData({ ...formData, vision: { ...formData.vision, en: e.target.value } })} />
              </div>
              <div>
                <label className='text-sm text-gray-600 mb-1 block'>Vision (Hindi)</label>
                <textarea rows={3}
                  className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none resize-none'
                  value={formData.vision.hi}
                  onChange={(e) => setFormData({ ...formData, vision: { ...formData.vision, hi: e.target.value } })} />
              </div>
            </div>

            {/* Team Members */}
            <div className='bg-white rounded-2xl shadow-lg p-6'>
              <div className='flex justify-between items-center border-b pb-2 mb-4'>
                <h2 className='font-bold text-lg'>Team Members</h2>
                <button onClick={openAddTeam}
                  className='cursor-pointer flex gap-2 items-center bg-amber-700 text-white px-3 py-1.5 rounded-lg hover:bg-amber-800 transition text-sm'>
                  <FaPlus size={12} />
                  <span>Add Member</span>
                </button>
              </div>

              <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                {teamMembers.map((member, index) => (
                  <div key={index} className='bg-gray-50 rounded-xl p-4 flex gap-3'>
                    <div className='w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex-shrink-0'>
                      {member.image && <img src={member.image} className='w-full h-full object-cover' alt={member.name.en} />}
                    </div>
                    <div className='flex-1 min-w-0'>
                      <h3 className='font-semibold truncate'>{member.name.en}</h3>
                      <p className='text-sm text-amber-700'>{member.role.en}</p>
                      <div className='flex gap-2 mt-2'>
                        <button onClick={() => openEditTeam(index)} className='text-blue-600 cursor-pointer'>
                          <FaEdit size={14} />
                        </button>
                        <button onClick={() => handleDeleteTeam(index)} className='text-red-600 cursor-pointer'>
                          <FaTrash size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {teamMembers.length === 0 && (
                <p className='text-gray-400 text-sm text-center py-4'>No team members added yet.</p>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>

      {/* Team Member Modal */}
      {showTeamModal && (
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-4xl p-6 w-full max-w-md space-y-3 max-h-[90vh] overflow-y-auto'>
            <h2 className='font-bold text-lg'>
              {editTeamIndex !== null ? "Edit Team Member" : "Add Team Member"}
            </h2>

            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Photo</label>
              <input type="file" accept="image/*"
                className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none'
                onChange={handleTeamImageChange} />
            </div>
            {teamForm.image && (
              <img src={teamForm.image} className='h-24 w-24 object-cover rounded-full mx-auto' alt="Preview" />
            )}

            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Name (English)</label>
              <input placeholder='Enter name'
                className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none'
                value={teamForm.name.en}
                onChange={(e) => setTeamForm({ ...teamForm, name: { ...teamForm.name, en: e.target.value } })} />
            </div>

            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Name (Hindi)</label>
              <input placeholder='नाम दर्ज करें'
                className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none'
                value={teamForm.name.hi}
                onChange={(e) => setTeamForm({ ...teamForm, name: { ...teamForm.name, hi: e.target.value } })} />
            </div>

            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Role (English)</label>
              <input placeholder='e.g., Founder, Director'
                className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none'
                value={teamForm.role.en}
                onChange={(e) => setTeamForm({ ...teamForm, role: { ...teamForm.role, en: e.target.value } })} />
            </div>

            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Role (Hindi)</label>
              <input placeholder='जैसे, संस्थापक, निदेशक'
                className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none'
                value={teamForm.role.hi}
                onChange={(e) => setTeamForm({ ...teamForm, role: { ...teamForm.role, hi: e.target.value } })} />
            </div>

            <div className='flex justify-end gap-3 pt-2'>
              <button onClick={() => setShowTeamModal(false)} className='px-4 py-2 border rounded-2xl cursor-pointer hover:bg-gray-200 transition'>
                Cancel
              </button>
              <button onClick={handleSaveTeam}
                className='cursor-pointer bg-amber-700 text-white px-4 py-2 rounded-2xl hover:bg-amber-800 transition active:scale-95'>
                {editTeamIndex !== null ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default About