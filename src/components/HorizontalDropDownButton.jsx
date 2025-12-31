import React from 'react'


const HorizontalDropDownButton = ({options, handleChildData , groupNumber}) => {

  {/* Drop-down button for  choosing a type and price-level when a business user adds a new shop to the website */}
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
/*--------------------This is better implementation, it's react controlled implementation. Mine is bad, it is HTML DOM I need to learn this way----------------------*/

// import React from 'react'

// const HorizontalDropDownButton = ({ options, selectedValue, onChange, groupNumber }) => {

//   return (
//     <div className='absolute mt-10 flex gap-1'>
//       {options.map((element, index) => (
//         <label
//           className="bg-yellow-600 text-sm font-bold border-2 border-black rounded-md p-1 cursor-pointer hover:bg-amber-400 active:bg-amber-600"
//           htmlFor={`dropdown-radio-${index}${groupNumber}`}
//           key={index}
//         >
//           {element}
//           <input
//             type="radio"
//             className="sr-only"
//             id={`dropdown-radio-${index}${groupNumber}`}
//             name={`dropdown-group-${groupNumber}`}
//             value={element}
//             checked={selectedValue === element}      {/* ✅ controlled */}
//             onChange={() => onChange(element)}       {/* ✅ notify parent */}
//           />
//         </label>
//       ))}
//     </div>
//   )
// }

// export default HorizontalDropDownButton
