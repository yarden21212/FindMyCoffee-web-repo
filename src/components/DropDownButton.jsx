import React from 'react'

const DropDownButton = ({array}) => {

  return (
    <div className='border-black border-2 absolute left-40'>
      <ul >
        {array.map((element, index) => (
          <li className="bg-yellow-600 font-bold border-2 border-black rounded-md mb-1 p-1 cursor-pointer
                           " key={index}>{element}</li>
        ))}
      </ul>
    </div>
  )
}

export default DropDownButton


          