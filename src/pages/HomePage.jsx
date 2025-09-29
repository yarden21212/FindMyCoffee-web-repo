import React from 'react'
import background from "../assets/pictures/coffee-main-background.png"
import { Link, NavLink, Outlet } from 'react-router-dom'
import Header from "../components/Header";

const HomePage = () => { 
  return (
    <>
      {/* Let a picture to be the background. Styled it as necessary */}
      <div 
        className='min-h-screen bg-cover bg-center'  style={{ backgroundImage: `url(${background})` }}
      >
      <Header/>

      <main className="max-w-xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-semibold text-white">Welcome to FindMyCoffee</h1>
        <p className="mt-2 text-gray-700 text-white">Discover and share the best coffee spots.</p>

        <div className='mt-6 flex flex-wrap items-center gap-3'>
          <Link 
            to="/features"
            className='inline-block rounder-xl px-4 py-2 bg-black/80 text-white hover:bg-black transition'
          />

          <Link />
        </div>
      </main>
    </div>
    </>
  )
  
}

export default HomePage

