import React from 'react'

{/* Button for Type and Rate on feature page. The user presses to choose an option*/}
const FeatureButton = (props) => {
  
  return (
    <button type="button" onClick={props.onClick}
      className="cursor-pointer mr-2 font-bold border-2 border-amber-500 bg-amber-700 border-b-gray-700 rounded-md px-2 py-1 
                  ring-2 ring-amber-800 ring-offset-2 animate-bounce focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-950">
      <span className='text-white text-shadow-sm text-shadow-yellow-950 animate-bounce line-clamp-1 w-max'>{props.name}</span>
    </button>
  )
}

export default FeatureButton
