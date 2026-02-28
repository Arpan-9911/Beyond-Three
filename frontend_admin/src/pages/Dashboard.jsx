import React from 'react'
import Sidebar from '../components/layout/Sidebar'
import Footer from '../components/layout/Footer'
import DesktopHeader from '../components/layout/DesktopHeader'
import MobileHeader from '../components/layout/MobileHeader'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  FaProjectDiagram, FaCalendarCheck, FaBlog, FaCalendarAlt,
  FaRoute, FaPhotoVideo, FaAddressBook, FaImages, FaArrowRight,
  FaUserPlus, FaInfoCircle
} from 'react-icons/fa'

const Dashboard = () => {
  const navigate = useNavigate()
  const projects = useSelector(state => state.projects)
  const events = useSelector(state => state.events)
  const blogs = useSelector(state => state.blogs)
  const news = useSelector(state => state.news)
  const tours = useSelector(state => state.tours)
  const media = useSelector(state => state.media)
  const admin = useSelector(state => state.auth)

  const stats = [
    { label: 'News', count: news?.length || 0, icon: <FaCalendarAlt />, color: 'from-yellow-400 to-orange-500', link: '/news' },
    { label: 'Events', count: events?.length || 0, icon: <FaCalendarCheck />, color: 'from-amber-500 to-orange-600', link: '/events' },
    { label: 'Projects', count: projects?.length || 0, icon: <FaProjectDiagram />, color: 'from-yellow-500 to-amber-600', link: '/projects' },
    { label: 'Blogs', count: blogs?.length || 0, icon: <FaBlog />, color: 'from-orange-500 to-red-500', link: '/blogs' },
    { label: 'Tours', count: tours?.length || 0, icon: <FaRoute />, color: 'from-amber-400 to-yellow-500', link: '/tours' },
    { label: 'Media', count: media?.length || 0, icon: <FaPhotoVideo />, color: 'from-yellow-400 to-amber-500', link: '/media' },
  ]

  const quickActions = [
    { label: 'Hero Carousel', icon: <FaImages />, link: '/hero-carousel' },
    { label: 'News & Updates', icon: <FaCalendarAlt />, link: '/news' },
    { label: 'Events', icon: <FaCalendarCheck />, link: '/events' },
    { label: 'Projects', icon: <FaProjectDiagram />, link: '/projects' },
    { label: 'Blogs', icon: <FaBlog />, link: '/blogs' },
    { label: 'Tours', icon: <FaRoute />, link: '/tours' },
    { label: 'Media Library', icon: <FaPhotoVideo />, link: '/media' },
    { label: 'Reviews', icon: <FaAddressBook />, link: '/reviews' },
    { label: 'About Us', icon: <FaInfoCircle />, link: '/about-us' },
    { label: 'Join Requests', icon: <FaUserPlus />, link: '/join-us' },
  ]

  return (
    <div className='min-h-dvh flex bg-amber-100'>
      <div className='h-dvh sticky top-0 w-64 overflow-hidden max-md:hidden'>
        <Sidebar />
      </div>
      <div className='flex-1'>
        <div className='max-md:hidden'><DesktopHeader heading={"Dashboard"} /></div>
        <div className='md:hidden'><MobileHeader heading={"Dashboard"} /></div>
        <div className='min-h-[92.5dvh] p-4'>

          {/* Welcome Banner */}
          <div className='bg-linear-to-r from-amber-700 to-amber-900 rounded-2xl p-6 mb-6 text-white shadow-lg'>
            <h1 className='text-2xl font-bold'>Welcome back{admin?.name ? `, ${admin.name}` : ''}! 👋</h1>
            <p className='text-amber-200 mt-1 text-sm'>Here's an overview of your Beyond Three admin panel.</p>
          </div>

          {/* Stats Grid */}
          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-6'>
            {stats.map((stat, i) => (
              <div key={i}
                onClick={() => navigate(stat.link)}
                className='bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition cursor-pointer group'>
                <div className={`w-10 h-10 rounded-xl bg-linear-to-br ${stat.color} flex items-center justify-center text-white text-lg mb-3 group-hover:scale-110 transition`}>
                  {stat.icon}
                </div>
                <p className='text-2xl font-bold text-gray-800'>{stat.count}</p>
                <p className='text-sm text-gray-500'>{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className='bg-white rounded-2xl shadow-lg p-6'>
            <h2 className='font-bold text-lg border-b pb-2 mb-4'>Quick Actions</h2>
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3'>
              {quickActions.map((action, i) => (
                <button key={i}
                  onClick={() => navigate(action.link)}
                  className='cursor-pointer flex items-center gap-3 px-4 py-3 rounded-xl bg-amber-50 hover:bg-amber-100 transition text-left group'>
                  <span className='text-amber-700 text-lg'>{action.icon}</span>
                  <span className='text-sm font-medium text-gray-700 flex-1'>{action.label}</span>
                  <FaArrowRight className='text-gray-300 group-hover:text-amber-700 transition text-xs' />
                </button>
              ))}
            </div>
          </div>

        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Dashboard