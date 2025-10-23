import React from 'react'
import background from "../assets/pictures/coffee-main-background.png"
import { Link, NavLink, Outlet } from 'react-router-dom'
import Header from "../components/Header";

const HomePage = () => { 
  return (
    <>
      {/* Let a picture to be the background. Styled it as necessary */}
      <div 
        className='min-h-screen bg-contain bg-center'  style={{ backgroundImage: `url(${background})` }}
      >
      <Header/>

      <main className="max-w-xl mx-auto px-4 py-10 grid place-items-center">
        <h1 className="text-3xl font-semibold text-white">Welcome to FindMyCoffee</h1>
        <p className="mt-2 text-white">Discover and share the best coffee spots.</p>


      </main>
    </div>
    </>
  )
  
}

export default HomePage

