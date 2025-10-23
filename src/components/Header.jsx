import React, { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import UsernameHeader from './CoffeeShopOutput/UsernameHeader'
import LogoutButton from './LogoutButton'
import IconImage from '../assets/pictures/website-logo-transparent.png'

const Header = () => {
  

  return (
    <header className='sticky top-0 z-50 bg-white/30 backdrop-blur-sm'>
        <div className="px-10 py-3 flex items-center justify-between">
          
          <div className='flex items-center justify-center '>
            <p className='mr-10 '>{<LogoutButton/>}</p>
            <p>{<UsernameHeader/>}</p>
          </div>
          <div className='flex items-center justify-center'>
            <Link to="/" 
              className="h-10 text-xl text-[#4A2D1A]] font-semibold border-3 rounded-full px-2
              hover:font-bold hover:text-red-400"
              >FindMyCoffee</Link>
              <img 
                src={IconImage}
                className='ml-4 h-16'
              >
              </img>
            </div>

          <nav className="flex gap-6">
            <NavLink 
              to="/about" 
              className={({ isActive }) =>
                `hover:underline ${isActive ? "font-semibold underline" : ""}`
              }
              >About
            </NavLink>
            <NavLink 
              to="/features" 
              className={({isActive}) =>
                `hover:underline ${isActive ? "font-semibold underline" : ""}`
              }
              >Features
            </NavLink>
            <NavLink 
              to="/login" 
              className={({isActive}) => 
                `hover:underline ${isActive ? "font-semibold underline" : ""}`
              }
              >Sign In
            </NavLink>
            <NavLink
              to="/register"
              className={({isActive}) => 
                `hover:underline ${isActive ? "font-semibold underline" : ""}`
              }
            >Sign Up</NavLink>
          </nav>
          
        </div>
      </header>
  )
}

export default Header