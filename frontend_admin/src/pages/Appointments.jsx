import React, { useState } from 'react'
import DesktopHeader from '../components/layout/DesktopHeader'
import MobileHeader from '../components/layout/MobileHeader'
import Sidebar from '../components/layout/Sidebar'
import Footer from '../components/layout/Footer'
import { FaPlus, FaEdit, FaTrash, FaCalendarCheck, FaUser, FaPhone, FaClock, FaCheck, FaTimes, FaEye } from 'react-icons/fa'

const Appointments = () => {

  const [appointments, setAppointments] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [editIndex, setEditIndex] = useState(null)
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')

  const emptyForm = {
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    service: '',
    notes: '',
    status: 'pending'
  }

  const [form, setForm] = useState(emptyForm)

  const services = [
    'Yoga Session',
    'Meditation Class',
    'Wellness Consultation',
    'Therapy Session',
    'Health Checkup',
    'Counseling',
    'Other'
  ]

  const openAdd = () => {
    setForm({ ...emptyForm, date: new Date().toISOString().split('T')[0] })
    setEditIndex(null)
    setShowModal(true)
  }

  const openEdit = (index) => {
    setForm(appointments[index])
    setEditIndex(index)
    setShowModal(true)
  }

  const viewDetails = (appointment) => {
    setSelectedAppointment(appointment)
    setShowDetailModal(true)
  }

  const handleSave = () => {
    if (editIndex !== null) {
      const updated = [...appointments]
      updated[editIndex] = form
      setAppointments(updated)
    } else {
      setAppointments([...appointments, { ...form, id: Date.now() }])
    }
    setShowModal(false)
  }

  const handleDelete = (index) => {
    setAppointments(appointments.filter((_, i) => i !== index))
  }

  const updateStatus = (index, status) => {
    const updated = [...appointments]
    updated[index] = { ...updated[index], status }
    setAppointments(updated)
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-700 border-green-300'
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-300'
      case 'completed': return 'bg-blue-100 text-blue-700 border-blue-300'
      default: return 'bg-yellow-100 text-yellow-700 border-yellow-300'
    }
  }

  const filteredAppointments = filterStatus === 'all'
    ? appointments
    : appointments.filter(a => a.status === filterStatus)

  const statusCounts = {
    all: appointments.length,
    pending: appointments.filter(a => a.status === 'pending').length,
    confirmed: appointments.filter(a => a.status === 'confirmed').length,
    completed: appointments.filter(a => a.status === 'completed').length,
    cancelled: appointments.filter(a => a.status === 'cancelled').length
  }

  return (
    <div className='min-h-dvh flex bg-amber-100'>
      <div className='h-dvh sticky top-0 w-64 overflow-hidden max-md:hidden'>
        <Sidebar />
      </div>
      <div className='flex-1'>
        <div className='max-md:hidden'>
          <DesktopHeader heading={"Appointments"} />
        </div>
        <div className='md:hidden'>
          <MobileHeader heading={"Appointments"} />
        </div>
        <div className='min-h-[92.5dvh] p-4'>
          <div className='md:flex gap-4 justify-between items-center'>
            <div>
              <h1 className='text-xl font-bold'>Appointment Management</h1>
              <span className='text-amber-700'>
                Manage and track all appointments.
              </span>
            </div>
            <button onClick={openAdd}
              className='cursor-pointer flex gap-2 items-center bg-amber-700 text-white px-3 py-2 rounded-lg hover:bg-amber-800 transition max-md:mt-3'>
              <FaPlus />
              <span>New Appointment</span>
            </button>
          </div>

          {/* Status Filter Tabs */}
          <div className='flex flex-wrap gap-2 mt-6'>
            {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg font-medium transition cursor-pointer capitalize ${filterStatus === status ? 'bg-amber-700 text-white' : 'bg-white hover:bg-amber-50'
                  }`}>
                {status} ({statusCounts[status]})
              </button>
            ))}
          </div>

          {/* Appointments Table */}
          <div className='mt-6 bg-white rounded-2xl shadow-lg overflow-hidden'>
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead className='bg-amber-50 border-b'>
                  <tr>
                    <th className='text-left p-4 font-semibold text-gray-700'>Client</th>
                    <th className='text-left p-4 font-semibold text-gray-700'>Service</th>
                    <th className='text-left p-4 font-semibold text-gray-700'>Date & Time</th>
                    <th className='text-left p-4 font-semibold text-gray-700'>Status</th>
                    <th className='text-left p-4 font-semibold text-gray-700'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.map((appointment, index) => (
                    <tr key={appointment.id || index} className='border-b hover:bg-gray-50'>
                      <td className='p-4'>
                        <div className='flex items-center gap-3'>
                          <div className='w-10 h-10 rounded-full bg-amber-200 flex items-center justify-center'>
                            <FaUser className='text-amber-700' />
                          </div>
                          <div>
                            <p className='font-medium'>{appointment.name}</p>
                            <p className='text-sm text-gray-500'>{appointment.phone}</p>
                          </div>
                        </div>
                      </td>
                      <td className='p-4'>
                        <span className='text-gray-700'>{appointment.service}</span>
                      </td>
                      <td className='p-4'>
                        <div className='flex items-center gap-2'>
                          <FaCalendarCheck className='text-amber-600' size={14} />
                          <div>
                            <p className='text-sm'>{formatDate(appointment.date)}</p>
                            <p className='text-xs text-gray-500 flex items-center gap-1'>
                              <FaClock size={10} /> {appointment.time}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className='p-4'>
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full border capitalize ${getStatusColor(appointment.status)}`}>
                          {appointment.status}
                        </span>
                      </td>
                      <td className='p-4'>
                        <div className='flex gap-2'>
                          <button onClick={() => viewDetails(appointment)}
                            className='text-blue-600 hover:text-blue-800 cursor-pointer' title='View'>
                            <FaEye size={16} />
                          </button>
                          <button onClick={() => openEdit(index)}
                            className='text-gray-600 hover:text-gray-800 cursor-pointer' title='Edit'>
                            <FaEdit size={16} />
                          </button>
                          {appointment.status === 'pending' && (
                            <>
                              <button onClick={() => updateStatus(index, 'confirmed')}
                                className='text-green-600 hover:text-green-800 cursor-pointer' title='Confirm'>
                                <FaCheck size={16} />
                              </button>
                              <button onClick={() => updateStatus(index, 'cancelled')}
                                className='text-red-600 hover:text-red-800 cursor-pointer' title='Cancel'>
                                <FaTimes size={16} />
                              </button>
                            </>
                          )}
                          <button onClick={() => handleDelete(index)}
                            className='text-red-600 hover:text-red-800 cursor-pointer' title='Delete'>
                            <FaTrash size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredAppointments.length === 0 && (
              <div className='p-8 text-center text-gray-500'>
                <FaCalendarCheck size={48} className='mx-auto text-gray-300 mb-4' />
                <p className='text-lg'>No appointments found.</p>
                <p className='text-sm'>Click "New Appointment" to schedule one.</p>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-4xl p-6 w-full max-w-lg space-y-3 max-h-[90vh] overflow-y-auto'>
            <h2 className='font-bold text-lg'>
              {editIndex !== null ? "Edit Appointment" : "New Appointment"}
            </h2>

            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Client Name</label>
              <input placeholder='Enter client name'
                className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none'
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>

            <div className='grid grid-cols-2 gap-3'>
              <div>
                <label className='text-sm text-gray-600 mb-1 block'>Email</label>
                <input type="email" placeholder='Email address'
                  className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none'
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div>
                <label className='text-sm text-gray-600 mb-1 block'>Phone</label>
                <input type="tel" placeholder='Phone number'
                  className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none'
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>
            </div>

            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Service</label>
              <select
                className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none'
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}>
                <option value="">Select a service</option>
                {services.map((service) => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
            </div>

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
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Notes</label>
              <textarea placeholder='Any additional notes...'
                className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none resize-none'
                value={form.notes} rows={3}
                onChange={(e) => setForm({ ...form, notes: e.target.value })} />
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

      {/* View Details Modal */}
      {showDetailModal && selectedAppointment && (
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-4xl p-6 w-full max-w-md space-y-4'>
            <h2 className='font-bold text-lg'>Appointment Details</h2>

            <div className='space-y-3'>
              <div className='flex items-center gap-3 p-3 bg-amber-50 rounded-xl'>
                <div className='w-12 h-12 rounded-full bg-amber-200 flex items-center justify-center'>
                  <FaUser className='text-amber-700' />
                </div>
                <div>
                  <p className='font-semibold'>{selectedAppointment.name}</p>
                  <span className={`px-2 py-0.5 text-xs font-semibold rounded-full border capitalize ${getStatusColor(selectedAppointment.status)}`}>
                    {selectedAppointment.status}
                  </span>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-3'>
                <div>
                  <label className='text-xs text-gray-500'>Email</label>
                  <p className='font-medium text-sm'>{selectedAppointment.email || '-'}</p>
                </div>
                <div>
                  <label className='text-xs text-gray-500'>Phone</label>
                  <p className='font-medium text-sm'>{selectedAppointment.phone}</p>
                </div>
              </div>

              <div>
                <label className='text-xs text-gray-500'>Service</label>
                <p className='font-medium'>{selectedAppointment.service}</p>
              </div>

              <div className='grid grid-cols-2 gap-3'>
                <div>
                  <label className='text-xs text-gray-500'>Date</label>
                  <p className='font-medium text-sm'>{formatDate(selectedAppointment.date)}</p>
                </div>
                <div>
                  <label className='text-xs text-gray-500'>Time</label>
                  <p className='font-medium text-sm'>{selectedAppointment.time}</p>
                </div>
              </div>

              {selectedAppointment.notes && (
                <div>
                  <label className='text-xs text-gray-500'>Notes</label>
                  <p className='font-medium text-sm'>{selectedAppointment.notes}</p>
                </div>
              )}
            </div>

            <div className='flex justify-end gap-3 pt-2'>
              <button onClick={() => setShowDetailModal(false)} className='px-4 py-2 border rounded-2xl cursor-pointer hover:bg-gray-200 transition'>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Appointments