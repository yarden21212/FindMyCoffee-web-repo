import React from 'react'

const FeatureButton = (props) => {
  

  
  return (
    <div 
      onClick={() => {
        props.onClick()
      }}
      className="cursor-pointer mr-2 font-bold border-2 border-amber-500 bg-amber-700 border-b-gray-700 rounded-md px-2 py-1 
                  ring-2 ring-amber-800 ring-offset-2 animate-bounce">
      <p className='text-white text-shadow-sm text-shadow-yellow-950 animate-bounce line-clamp-1 w-max'>{props.name}</p>
    </div>
  )
}

export default FeatureButton