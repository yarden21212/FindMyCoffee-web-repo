import React from 'react'
//import background from "../assets/pictures/coffee-main-background.png"
import background from "../assets/pictures/FindMyCoffee-Background.png"
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

      <main className="max-w-xl mx-auto px-4  grid place-items-center font-serif min-w-screen">
        <div className='bg-amber-100 border-black border-2 grid place-items-center rounded-md pr-2 pl-2'>
          <h1 className="text-3xl font-semibold text-black ">Welcome to FindMyCoffee</h1>
          <p className="mt-2 text-black">Discover and share the best coffee spots.</p> 
        </div>


      </main>
    </div>
    </>
  )
  
}

export default HomePage

