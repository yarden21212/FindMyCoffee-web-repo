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
          
          {/* Animation with the first letter of the current's logged username abosorbed from the authenticatino cookie*/}
          <div className='flex items-center justify-center '>

            {user != null ? (<div className='mr-10 '>{<LogoutButton/>}</div>)
            : null}
            <div>{<UsernameHeader/>}</div>
          </div>
          
          {/* Website icon, send back to the main page*/}
          <div className='grid place-items-centernter justify-items-center ml-40'>
            <img src={IconImage} className='h-8 absolute top-1 ml-32 cursor-pointer hover:animate-pulse '/>
            <Link to="/" 
              className="h-10 text-xl text-[#4A2D1A]] font-semibold border-3 rounded-full px-2
              hover:font-bold hover:text-red-400"
              >FindMyCoffee 
            </Link>
          </div>
      
          <nav className="flex gap-6">

            {/* Become a Business button*/}
            {user && (
              <div>
                <NavLink 
                to="/becomeBusiness" 
                className={({ isActive }) =>
                  `hover:underline ${isActive ? "font-semibold underline" : ""}`
                }
                >Become a Business!
              </NavLink>
              
              </div>
              )
            }
          {/* TODO: Needs to be fixed! only if the user is already a business then this link can be seen! */}
            {/* Add a coffeeshop button*/}
          {user && (
            <NavLink 
              to="/createCoffeeshop" 
              className={({ isActive }) =>
                `hover:underline ${isActive ? "font-semibold underline" : ""}` 
              }
              >Add a coffeeshop!
            </NavLink>
          )}
          
            {/* About button*/}
            <NavLink 
              to="/about" 
              className={({ isActive }) =>
                `hover:underline ${isActive ? "font-semibold underline" : ""}`
              }
              >About
            </NavLink>

            {/* Features button*/}
            <NavLink 
              to="/features" 
              className={({isActive}) =>
                `hover:underline ${isActive ? "font-semibold underline" : ""}`
              }
              >Features
            </NavLink>

            {/* Sign In button*/}
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

            {/* Sign Up button*/}
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