import React from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'

const Header = () => {
  return (
    <header className='sticky top-0 z-50 bg-white/30 backdrop-blur-sm'>
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold">FindMyCoffee</Link>

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