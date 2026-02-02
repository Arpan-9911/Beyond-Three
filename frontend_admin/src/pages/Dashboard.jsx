import React from 'react'
import Sidebar from '../components/layout/Sidebar'
import Footer from '../components/layout/Footer'
import DesktopHeader from '../components/layout/DesktopHeader'
import MobileHeader from '../components/layout/MobileHeader'

const Dashboard = () => {
  return (
    <div className='min-h-dvh flex bg-amber-100'>
      <div className='h-dvh sticky top-0 w-64 overflow-hidden max-md:hidden'>
        <Sidebar />
      </div>
      <div className='flex-1'>
        <div className='max-md:hidden'><DesktopHeader heading={"Dashboard"} /></div>
        <div className='md:hidden'><MobileHeader heading={"Dashboard"} /></div>
        <div className='min-h-[92.5dvh] p-4'>
          Dashboard
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Dashboard