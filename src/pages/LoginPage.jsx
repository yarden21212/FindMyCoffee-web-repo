import { useState } from "react";
import axios from "axios";
import React from 'react'
import ImgLeft from "../assets/pictures/coffee-stands.png"
import { createBrowserRouter } from "react-router";
import HomePage from "./HomePage";

const LoginPage = () => {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  

  const handleSumbit = async (event) => {
    event.preventDefault();
    if(submitting) return;

    setError('');
    setSuccess('');

    if(!userName || !password){
      setError('Please fill in all fields')
    }

    const loginAttempt = {
      UserName: userName,
      Password: password 
    }

    try{
      setSubmitting(true);

      console.log("Password is:" + password);
      console.log("userName is:" + userName);

      const res = await axios.post("/api/User/Login/loginUser", loginAttempt);

      if(res?.status === 200 || res?.status === 201){
        setSuccess('User exists, you will be moved to the main page');

        setPassword('');
        setUserName('');
      }
      else{
        setError('Unexpected server response.');
      }
    }
    catch(err){
      // Better visibility for what actually failed
      console.error('Register error details:', {
        code: err?.code,
        message: err?.message,
        status: err?.response?.status,
        data: err?.response?.data,
      });

      const apiMsg =
        err?.response?.data?.message ??
        (typeof err?.response?.data === 'string' ? err.response.data : null) ??
        (err?.code === 'ERR_NETWORK'
          ? 'Cannot reach the API (proxy/certificate or server down).'
          : null);

      setError(apiMsg || 'Error registering user');
    }
    finally{
      setSubmitting(false);
    }

  }

  return (
    <div className="min-h-screen bg-zinc-100 flex items-center justify-center p-4">
      {/* External part */}
      <div className="w-full max-w-4xl bg-white rounded-2xl">
        
        {/* Card */}
        <form onSubmit={handleSumbit} noValidate class="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden flex flex-row border-3 border-blue-400">

            {/* Left */}
            <div class="basis-3/16 bg-blue-200 border-r-4 border-blue-400 mr-2">
              <img src={ImgLeft} className="w-full h-full object-cover"></img>
            </div>

            {/* Center */}
            <div class="basis-10/16 mt-5">
              
              <div className="flex items-center justify-center">
                <p className="mb-10 font-bold">Login to your account</p>
              </div>

              {error ? (
                <div className="flex">
                  <div
                    className="bg-red-100 text-red-500 font-bold w-full boder-2 border-red-100 mb-10 rounded-md mr-2"
                  >{error}</div>
                </div>) 
                :success ? (
                  <div className="flex">
                    <div
                      className="bg-green-100 text-green-500 font-bold w-full border-2 border-green-100 mb-10 rounded-md mr-2"
                    >{success}</div>
                  </div>)
                : null
              }
              
              {/* Username */}
                <div className="flex mr-2 mb-5">
                  <label htmlFor="login">Username: </label>
                  <input 
                    id="login"
                    type="text"
                    placeholder="e.g. Guy"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full text-sm border-2 border-gray-300 shadow-lg rounded-md ml-2 mb-2 px-3"
                  />
                </div>

                {/* Password */}
                <div className="flex mr-2 mb-5">
                  <label htmlFor="password">Password: </label>
                  <input 
                    id="password"
                    type="password"
                    placeholder="Type your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full text-sm border-2 border-gray-300 shadow-lg rounded-md ml-2 mb-2 px-3"
                  />
                </div>  

                <div className="flex items-center justify-center">
                  <button className="bg-blue-300 border-3 border-blue-500 rounded-md w-35 h-10 mb-5 cursor-pointer
                    hover:border-blue-200
                    hover:border-3
                    hover:bg-blue-100
                  ">Login</button>
                </div>

                <p className="text-sm text-gray-400 mb-5">FindMyCoffee</p>

            </div>
            {/* Right */}
            <div class="basis-3/16 bg-blue-200 border-l-4 border-blue-400">
              <img src={ImgLeft} className="w-full h-full object-cover"></img>
            </div>

        </form>   
      </div>
    </div>
  )

}

export default LoginPage