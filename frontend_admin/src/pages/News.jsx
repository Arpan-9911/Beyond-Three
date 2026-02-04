import React from 'react'
import Sidebar from '../components/layout/Sidebar'
import DesktopHeader from '../components/layout/DesktopHeader'
import MobileHeader from '../components/layout/MobileHeader'
import Footer from '../components/layout/Footer'

const News = () => {
  return (
    <div className='min-h-dvh flex bg-amber-100'>
      <div className='h-dvh sticky top-0 w-64 overflow-hidden max-md:hidden'>
        <Sidebar />
      </div>
      <div className='flex-1'>
        <div className='max-md:hidden'><DesktopHeader heading={"News & Updates"} /></div>
        <div className='md:hidden'><MobileHeader heading={"News & Updates"} /></div>
        <div className='min-h-[92.5dvh] p-4'>
          News & Updates
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default News