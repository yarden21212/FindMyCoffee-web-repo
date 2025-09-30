import React from 'react'

const FeatureButton = ({ name }) => {
  return (
    <div className="cursor-pointer mr-2 font-bold border-2 border-amber-500 bg-amber-700 border-b-gray-700 rounded-md px-2 py-1 
                  ring-2 ring-amber-800 ring-offset-2 animate-bounce">
      <p className='text-white text-shadow-sm text-shadow-yellow-950 animate-bounce'>{name}</p>
    </div>
  )
}

export default FeatureButton