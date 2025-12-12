import React from 'react'

{/* Component to create a message. Green for success, red for failure */}
const SuccessMessage = ({isSucceeded, message}) => {
  if (isSucceeded === null || isSucceeded === undefined) return null;

  return (
    isSucceeded == true ? 
    (<div className='bg-green-200 text-black border-3 rounded-md h-10 flex items-center justify-center font-bold m-10'>
      <div>{message}</div>
    </div>)
    : isSucceeded == false ? 
    (<div className='bg-red-200 text-black border-3 rounded-md h-10 flex items-center justify-center font-bold m-10'>
      {message}
    </div>)
    :null
  )
}

export default SuccessMessage