import React, { useState } from "react"
import Header from '../components/Header'
import downArrowIcon from '../assets/down-arrow.svg'

const FeaturesPage = () => {
  const [isOpen, setIsOpen] = useState(false);

   const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  

  return (
    <div id='top-layer' className='border-y-indigo-100 min-h-screen' >

      <div id='header-color' className='bg-amber-950 shadow-2xl'>
        <Header></Header>
      </div>

      <div className='h-screen flex items-center justify-center '>
        <div className='w-200 border-2 border-b-amber-950 rounded-2xl h-30  grid grid-cols-10 items-center gap-10'>

          <div id='left-input-side' className='col-span-7 flex items-center justify-center ml-7'>
            <input placeholder='Enter a name' className='px-5 border border-gray-900 w-full rounded-2xl'></input>
          </div>

          <div id='dropDownButton' className='w-full h-full border-l-2 col-span-3 flex items-center justify-center'>


            <div
              id="options-pointer-image-label" 
              className='border-2 border-gray-300 w-40 px-2 py-1 rounded font-bold cursor-pointer flex justify-between relative bg-white shadow-sm'
              onClick={toggleDropdown}
            >
              <div 
                id="options"
                className='text-[14px]'
                >Options
              </div>

              <div
                id="pointer-image" 
                className='flex items-center justify-center'
              >
                <img src={downArrowIcon} className='w-3 ml-1'/>
              </div>

              {isOpen && (
                <div 
                  className="border border-gray-200 rounded-md bg-white absolute top-[40px] w-[400px] shadow-md"
                >
                  <div className="cursor-pointer hover:bg-gray-200 px-4 p-4">Find By Type</div>
                  <div className="cursor-pointer hover:bg-gray-200 px-4 p-4">Find By Name</div>
                  <div className="cursor-pointer hover:bg-gray-200 px-4 p-4">Find By Distance</div>
                  <div className="cursor-pointer hover:bg-gray-200 px-4 p-4">Find By Rate</div>
                </div>
              )}
              
            </div>


    
              
          </div>
          
        </div>

      </div>


    </div>
  )
}

export default FeaturesPage