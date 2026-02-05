import React, { useState } from 'react'
import DesktopHeader from '../components/layout/DesktopHeader'
import MobileHeader from '../components/layout/MobileHeader'
import Sidebar from '../components/layout/Sidebar'
import Footer from '../components/layout/Footer'
import { FaUser, FaEnvelope, FaPhone, FaCheck, FaTimes, FaEye } from 'react-icons/fa'

const Join = () => {

  // Tabs: volunteer, member
  const [activeTab, setActiveTab] = useState('volunteer')

  // Sample requests (in real app, these would come from API)
  const [volunteers, setVolunteers] = useState([])
  const [members, setMembers] = useState([])

  const [showModal, setShowModal] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState(null)

  const viewRequest = (request) => {
    setSelectedRequest(request)
    setShowModal(true)
  }

  const approveRequest = (id, type) => {
    if (type === 'volunteer') {
      setVolunteers(volunteers.map(v => v.id === id ? { ...v, status: 'approved' } : v))
    } else {
      setMembers(members.map(m => m.id === id ? { ...m, status: 'approved' } : m))
    }
  }

  const rejectRequest = (id, type) => {
    if (type === 'volunteer') {
      setVolunteers(volunteers.map(v => v.id === id ? { ...v, status: 'rejected' } : v))
    } else {
      setMembers(members.map(m => m.id === id ? { ...m, status: 'rejected' } : m))
    }
  }

  const currentRequests = activeTab === 'volunteer' ? volunteers : members

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-700 border-green-300'
      case 'rejected': return 'bg-red-100 text-red-700 border-red-300'
      default: return 'bg-yellow-100 text-yellow-700 border-yellow-300'
    }
  }

  return (
    <div className='min-h-dvh flex bg-amber-100'>
      <div className='h-dvh sticky top-0 w-64 overflow-hidden max-md:hidden'>
        <Sidebar />
      </div>
      <div className='flex-1'>
        <div className='max-md:hidden'>
          <DesktopHeader heading={"Join Us Requests"} />
        </div>
        <div className='md:hidden'>
          <MobileHeader heading={"Join Us Requests"} />
        </div>
        <div className='min-h-[92.5dvh] p-4'>
          <div className='md:flex gap-4 justify-between items-center'>
            <div>
              <h1 className='text-xl font-bold'>Join Us Requests</h1>
              <span className='text-amber-700'>
                Manage volunteer and member registration requests.
              </span>
            </div>
          </div>

          {/* Tabs */}
          <div className='flex gap-2 mt-6'>
            <button
              onClick={() => setActiveTab('volunteer')}
              className={`px-4 py-2 rounded-lg font-medium transition cursor-pointer ${activeTab === 'volunteer' ? 'bg-amber-700 text-white' : 'bg-white hover:bg-amber-50'
                }`}>
              Volunteers ({volunteers.length})
            </button>
            <button
              onClick={() => setActiveTab('member')}
              className={`px-4 py-2 rounded-lg font-medium transition cursor-pointer ${activeTab === 'member' ? 'bg-amber-700 text-white' : 'bg-white hover:bg-amber-50'
                }`}>
              Members ({members.length})
            </button>
          </div>

          {/* Requests Table */}
          <div className='mt-6 bg-white rounded-2xl shadow-lg overflow-hidden'>
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead className='bg-amber-50 border-b'>
                  <tr>
                    <th className='text-left p-4 font-semibold text-gray-700'>Name</th>
                    <th className='text-left p-4 font-semibold text-gray-700'>Email</th>
                    <th className='text-left p-4 font-semibold text-gray-700'>Phone</th>
                    <th className='text-left p-4 font-semibold text-gray-700'>Date</th>
                    <th className='text-left p-4 font-semibold text-gray-700'>Status</th>
                    <th className='text-left p-4 font-semibold text-gray-700'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRequests.map((request) => (
                    <tr key={request.id} className='border-b hover:bg-gray-50'>
                      <td className='p-4'>
                        <div className='flex items-center gap-2'>
                          <FaUser className='text-amber-600' />
                          <span>{request.name}</span>
                        </div>
                      </td>
                      <td className='p-4'>
                        <div className='flex items-center gap-2'>
                          <FaEnvelope className='text-gray-400' size={12} />
                          <span className='text-sm'>{request.email}</span>
                        </div>
                      </td>
                      <td className='p-4'>
                        <div className='flex items-center gap-2'>
                          <FaPhone className='text-gray-400' size={12} />
                          <span className='text-sm'>{request.phone}</span>
                        </div>
                      </td>
                      <td className='p-4 text-sm text-gray-600'>{request.date}</td>
                      <td className='p-4'>
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(request.status)}`}>
                          {request.status?.toUpperCase() || 'PENDING'}
                        </span>
                      </td>
                      <td className='p-4'>
                        <div className='flex gap-2'>
                          <button onClick={() => viewRequest(request)}
                            className='text-blue-600 hover:text-blue-800 cursor-pointer' title='View'>
                            <FaEye size={16} />
                          </button>
                          {request.status === 'pending' && (
                            <>
                              <button onClick={() => approveRequest(request.id, activeTab)}
                                className='text-green-600 hover:text-green-800 cursor-pointer' title='Approve'>
                                <FaCheck size={16} />
                              </button>
                              <button onClick={() => rejectRequest(request.id, activeTab)}
                                className='text-red-600 hover:text-red-800 cursor-pointer' title='Reject'>
                                <FaTimes size={16} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {currentRequests.length === 0 && (
              <div className='p-8 text-center text-gray-500'>
                <p>No {activeTab} requests yet.</p>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>

      {/* View Details Modal */}
      {showModal && selectedRequest && (
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-4xl p-6 w-full max-w-md space-y-4'>
            <h2 className='font-bold text-lg'>Request Details</h2>

            <div className='space-y-3'>
              <div>
                <label className='text-sm text-gray-500'>Name</label>
                <p className='font-medium'>{selectedRequest.name}</p>
              </div>
              <div>
                <label className='text-sm text-gray-500'>Email</label>
                <p className='font-medium'>{selectedRequest.email}</p>
              </div>
              <div>
                <label className='text-sm text-gray-500'>Phone</label>
                <p className='font-medium'>{selectedRequest.phone}</p>
              </div>
              <div>
                <label className='text-sm text-gray-500'>Date</label>
                <p className='font-medium'>{selectedRequest.date}</p>
              </div>
              {selectedRequest.message && (
                <div>
                  <label className='text-sm text-gray-500'>Message</label>
                  <p className='font-medium'>{selectedRequest.message}</p>
                </div>
              )}
              <div>
                <label className='text-sm text-gray-500'>Status</label>
                <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(selectedRequest.status)}`}>
                  {selectedRequest.status?.toUpperCase() || 'PENDING'}
                </span>
              </div>
            </div>

            <div className='flex justify-end gap-3 pt-2'>
              <button onClick={() => setShowModal(false)} className='px-4 py-2 border rounded-2xl cursor-pointer hover:bg-gray-200 transition'>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Join