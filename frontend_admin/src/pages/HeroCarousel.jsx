import React from 'react'
import DesktopHeader from '../components/layout/DesktopHeader'
import MobileHeader from '../components/layout/MobileHeader'
import Sidebar from '../components/layout/Sidebar'
import Footer from '../components/layout/Footer'

const HeroCarousel = () => {
  return (
    <div className='min-h-dvh flex bg-amber-100'>
      <div className='h-dvh sticky top-0 w-64 overflow-hidden max-md:hidden'>
        <Sidebar />
      </div>
      <div className='flex-1'>
        <div className='max-md:hidden'><DesktopHeader heading={"Hero Carousel"} /></div>
        <div className='md:hidden'><MobileHeader heading={"Hero Carousel"} /></div>
        <div className='min-h-[92.5dvh] p-4'>
          Hero Carousel
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default HeroCarousel