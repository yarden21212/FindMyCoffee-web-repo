import React, { useState } from 'react'
import Header from '../components/Header'
import IconImage from '../assets/pictures/website-logo-transparent.png'
import axios from 'axios'

const BecomeBusinessPage = () => {

  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // const business = {phoneNumber, email, termsAccepted};
    
    becomeBusinessHttpCall();
    // console.log(business);
  }

  const becomeBusinessHttpCall = async() => {
    try {
  const res = await axios.post("/api/business/RegisterAsBusiness", {
    Phone: phoneNumber,
    ContactEmail: email,
    AcceptBusinessTerms: termsAccepted,
  });
  console.log(res.data);
} catch (err) {
  console.error("POST failed:",
    err.response?.status,
    err.response?.data || err.message
  );
}
  }

  
  return (
    <div className=''>
      <header className='bg-white'>
        <Header />
      </header>

      <div className='bg-amber-100 h-fit'>
        <div className='flex place-content-center justify-center pt-12'>
          <div className=' bg-amber-700 w-200 h-130 border-8 border-amber-950 rounded-2xl p-4 '>
          <h1 className=''>  
            <div className='text-xl text-white'>
              <p className=''>Become a <strong>Business!</strong></p>
              <p>Turn your <strong>FindMyCoffee</strong> account into a business profile so customers can find you.</p>
              <p>Fill your personal information so we can contact you:</p>


              <form  onSubmit={handleSubmit} noValidate className='mt-10'>
                <div>
                  <label 
                    htmlFor="first_name" 
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number
                  </label>
                  <input 
                    type="text" 
                    id="first_name" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="+972501234567" 
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required 
                  />
                </div>

                <div>
                    <label
                      htmlFor="last_name" 
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Business Email
                    </label>
                    <input 
                      type="text" 
                      id="last_name" 
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                      placeholder="Business@gmail.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                    />
                </div>

                <div 
                  className="flex items-center">
                  <input 
                    id="link-radio" 
                    type="radio" value="" 
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="link-radio" 
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Accept Business Terms
                    <a 
                      href="#" className="text-blue-600 dark:text-blue-500 hover:underline">link inside
                    </a>.
                  </label>
                </div>

                
              <div className='flex place-content-center justify-center mt-5'>
                <button className='bg-amber-800 border-5 border-amber-950 h-15 w-80 rounded-2xl  font-bold cursor-pointer mb-10 relative inline 
                  hover:bg-amber-700
                active:bg-amber-600 active:text-black'>Become Business! 
                 <img src={IconImage} className='h-13 absolute bottom-5 right-0 cursor-pointer hover:animate-pulse'/>
                </button>
              </div>
              

              </form>
              
    



              <p className='text-lg text-black underline'><strong>Privacy note:</strong> </p>
              <p className='text-sm text-white'>We only use this information to verify your business and display it to customers. </p>
              <p className='text-sm text-white'>You can update or remove it at any time.</p>
            </div>
            </h1>
        </div>
        </div>
      </div>
    </div>
  )
}

export default BecomeBusinessPage