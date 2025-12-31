import React, { useState } from 'react'
import Header from '../components/Header'
import IconImage from '../assets/pictures/website-logo-transparent.png'
import axios from 'axios'
import SpinnerLoader from '../components/SpinnerLoader'
import SuccessMessage from '../components/SuccessMessage'

const BecomeBusinessPage = () => {

  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [succeeded, setSucceeded] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    
    becomeBusinessHttpCall();
  }
  
  const becomeBusinessHttpCall = async() => {
    {/* First terms need to be marked in order to become a business */}
    if(termsAccepted){
      try{
        const res = await axios.post("/api/business/RegisterAsBusiness", {
        Phone: phoneNumber,
        ContactEmail: email,
        AcceptBusinessTerms: termsAccepted,
        });
        console.log(res.data);
        setSucceeded(true);
        setLoading(false);

      }catch (err) {
        console.error("POST failed:",
          err.response?.status,
          err.response?.data || err.message
        );
        setSucceeded(false);
        setLoading(false);
      }
    }
    else{
      setSucceeded(false);
      setLoading(false);
    }
  }

  
  return (
    <div className=''>
      <header className='bg-white'>
        <Header />
      </header>
    
      <div className='bg-amber-100 min-h-screen'>
        <div data-role="card-layout" className='grid place-items-center justify-items-center pt-12'>
          <div data-role="spinner" className=''>{loading == true && <SpinnerLoader />}</div>
          <div data-role="card-design" className=' bg-amber-700 w-200 h-130 border-8 border-amber-950 rounded-2xl p-4 '>
          <h1 className=''>  
            <div className='text-xl text-white'>
              <p className=''>Become a <strong>Business!</strong></p>
              <p>Turn your <strong>FindMyCoffee</strong> account into a business profile so customers can find you.</p>
              <p>Fill your personal information so we can contact you:</p>

              {/* Handles the "become a business" registration */}
              <form  onSubmit={handleSubmit} noValidate className='mt-10'>

                {/* Phone number input component */}
                <div>
                  <label 
                    htmlFor="first_name" 
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number: <strong className='text-yellow-400 animate-pulse'> (Add country code. Example: 0501234567 → +972501234567)</strong>
                  </label>
                  <input 
                    type="text" 
                    id="phone_number" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="+972501234567" 
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required 
                  />
                </div>

                {/* Business email input component */}
                <div>
                    <label
                      htmlFor="business_mail" 
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

                {/* Business email input component */}
                <div 
                  className="flex items-center">
                  <input 
                    id="link-radio" 
                    type="radio" value="" 
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={() => setTermsAccepted(true)}
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
            {/* A message for the user to approve the upgrade in role or rejection when failed. */}
            {succeeded !== null && (
              <SuccessMessage
              isSucceeded={succeeded}
              message={
                succeeded
                  ? "Successfully Became A Business!"
                  : "Failed To Become A Business"
              }
            />
            )}
        </div>
        </div>
      </div>
    </div>
  )
}

export default BecomeBusinessPage