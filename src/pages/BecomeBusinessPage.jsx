import React, { useRef, useState } from 'react'
import Header from '../components/Header'
import IconImage from '../assets/pictures/website-logo-transparent.png'
import axios from 'axios'
import SpinnerLoader from '../components/SpinnerLoader'
import SuccessMessage from '../components/SuccessMessage'

const BecomeBusinessPage = () => {
  const termsDialogRef = useRef(null);

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
      <dialog
        ref={termsDialogRef}
        aria-labelledby="business-terms-title"
        className="fixed inset-0 m-auto max-h-[85dvh] w-[calc(100%_-_2rem)] max-w-lg overflow-y-auto rounded-2xl border-2 border-amber-950 bg-amber-50 p-5 text-amber-950 shadow-xl backdrop:bg-black/50 sm:p-8"
      >
        <h2 id="business-terms-title" className="mb-4 text-2xl font-bold">Business profile guidelines</h2>
        <ul className="list-disc space-y-3 pl-5 leading-relaxed">
          <li>Provide accurate business and contact information.</li>
          <li>Only add coffee shops you own or are authorized to represent.</li>
          <li>Don’t submit misleading, offensive, or duplicate listings.</li>
          <li>Keep your business details up to date.</li>
          <li>Your business contact details may be shown to customers.</li>
        </ul>
        <p className="mt-5">By accepting, you confirm that you’ve read these guidelines.</p>
        <button
          type="button"
          autoFocus
          onClick={() => termsDialogRef.current?.close()}
          className="mt-6 rounded-xl border-2 border-amber-950 bg-amber-900 px-5 py-2 font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          Close
        </button>
      </dialog>
    
      <div className='bg-amber-100 min-h-screen'>
        <div data-role="card-layout" className='mx-auto grid w-full max-w-4xl place-items-center px-4 py-8 sm:px-6 sm:py-12'>
          <div data-role="spinner" className=''>{loading == true && <SpinnerLoader />}</div>
          <div data-role="card-design" className=' bg-amber-700 w-full max-w-3xl border-4 sm:border-8 border-amber-950 rounded-2xl p-4 sm:p-6 '>
          <h1 className=''>  
            <div className='text-base sm:text-xl text-white'>
              <p className=''>Become a <strong>Business!</strong></p>
              <p>Turn your <strong>FindMyCoffee</strong> account into a business profile so customers can find you.</p>
              <p>Fill your personal information so we can contact you:</p>

              {/* Handles the "become a business" registration */}
              <form  onSubmit={handleSubmit} noValidate className='mt-6 space-y-4'>

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
                  className="flex flex-wrap items-center gap-y-2">
                  <input
                    id="business-terms"
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="h-5 w-5 shrink-0 accent-amber-950"
                  />
                  <label htmlFor="business-terms" className="ms-2 text-sm font-medium text-white">
                    Accept business terms
                  </label>
                  <button
                    type="button"
                    onClick={() => termsDialogRef.current?.showModal()}
                    className="ml-2 rounded text-sm font-semibold text-blue-800 underline underline-offset-2 motion-safe:animate-pulse focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    View business terms
                  </button>
                </div>

                
              <div className='flex place-content-center justify-center mt-5'>
                <button className='bg-amber-800 border-5 border-amber-950 min-h-15 w-full max-w-80 rounded-2xl  font-bold cursor-pointer mb-10 relative inline 
                  hover:bg-amber-700
                active:bg-amber-600 active:text-black'>Become Business! 
                 <img src={IconImage} className='hidden sm:block h-10 absolute bottom-3 right-0 cursor-pointer hover:animate-pulse'/>
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
