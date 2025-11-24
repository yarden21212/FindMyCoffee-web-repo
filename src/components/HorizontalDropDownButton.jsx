import React from 'react'


const HorizontalDropDownButton = ({options, handleChildData , groupNumber}) => {

  return (
    <div className='absolute mt-10 flex gap-1'>
      {options.map((element, index) => (
        
        <label
          className="bg-yellow-600 text-sm font-bold border-2 border-black rounded-md p-1 cursor-pointer hover:bg-amber-400 active:bg-amber-600"
          htmlFor={`dropdown-radio-${index}${groupNumber}`}
          key={index}
        >
          {element}
          <input
            type="radio"
            className="sr-only"
            id={`dropdown-radio-${index}${groupNumber}`}
            name={`dropdown-group-${groupNumber}`}
            value={element}
            onClick={() => {handleChildData(element)}}
          />
        </label>
      ))}
    </div>
  )
}

export default HorizontalDropDownButton


          