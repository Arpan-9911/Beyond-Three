import React from 'react'

const DesktopHeader = ({ heading }) => {
  return (
    <div className='p-4 bg-white border-b border-gray-300 font-bold'>
      {heading}
    </div>
  )
}

export default DesktopHeader