import React, { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import UsernameHeader from './CoffeeShopOutput/UsernameHeader'
import LogoutButton from './LogoutButton'
import { useAuth } from '../context/AuthProvider'
import IconImage from '../assets/pictures/website-logo-transparent.png'


const Header = () => {
  const {user} = useAuth();

  return (
    <header className='sticky top-0 z-50 bg-white/30 backdrop-blur-sm'>
        <div className="px-10 py-3 flex items-center justify-between">
          
          <div className='flex items-center justify-center '>
            {user != null ? (<p className='mr-10 '>{<LogoutButton/>}</p>)
            : null}
            <p>{<UsernameHeader/>}</p>
          </div>
          <div className='grid place-items-centernter justify-items-center'>
            <img src={IconImage} className='h-8 absolute top-1 ml-32 cursor-pointer hover:animate-pulse '/>
            <Link to="/" 
              className="h-10 text-xl text-[#4A2D1A]] font-semibold border-3 rounded-full px-2
              hover:font-bold hover:text-red-400"
              >FindMyCoffee 
            </Link>
          </div>

          <nav className="flex gap-6">
            <NavLink 
              to="/becomeBusiness" 
              className={({ isActive }) =>
                `hover:underline ${isActive ? "font-semibold underline" : ""}`
              }
              >Become a Business!
            </NavLink>
            <NavLink 
              to="/createCoffeeshop" 
              className={({ isActive }) =>
                `hover:underline ${isActive ? "font-semibold underline" : ""}`
              }
              >Add a coffeeshop!
            </NavLink>
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
            {user == null ? (
              <NavLink 
              to="/login" 
              className={({isActive}) => 
                `hover:underline ${isActive ? "font-semibold underline" : ""}`
              }
              >Sign In
            </NavLink>
            )
            : null}
            {user == null ? (
              <NavLink
              to="/register"
              className={({isActive}) => 
                `hover:underline ${isActive ? "font-semibold underline" : ""}`
              }
            >Sign Up</NavLink>
            )
            : null}
            
          </nav>
          
        </div>
      </header>
  )
}

export default Header