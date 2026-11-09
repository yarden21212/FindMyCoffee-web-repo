import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import UsernameHeader from './CoffeeShopOutput/UsernameHeader'
import LogoutButton from './LogoutButton'
import { useAuth } from '../context/AuthProvider'
import IconImage from '../assets/pictures/website-logo-transparent.png'

const Header = () => {
  const { user } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const linkClass = ({ isActive }) =>
    `rounded-md px-3 py-2 hover:bg-amber-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-800 ${isActive ? 'font-semibold underline underline-offset-4' : ''}`

  return (
    <header dir="ltr" className="sticky top-0 z-50 border-b border-amber-900/15 bg-[#fffaf0]/95 text-[#4a2d1a] backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3 sm:px-6">
        <Link to="/" onClick={() => setMenuOpen(false)} className="inline-flex shrink-0 items-center gap-2 rounded-full border-2 border-[#4a2d1a] px-3 py-1 text-lg font-semibold focus-visible:outline-2 focus-visible:outline-offset-4">
          <img src={IconImage} alt="" className="h-8 w-8 object-contain" />
          <span>FindMyCoffee</span>
        </Link>
        <button type="button" 
          aria-expanded={menuOpen} 
          aria-controls="primary-navigation" 
          onClick={() => setMenuOpen(!menuOpen)} 
          className="ml-auto rounded-md border border-amber-900/30 px-3 py-2 focus-visible:outline-2 focus-visible:outline-offset-2 lg:hidden"
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
        <nav 
          id="primary-navigation" 
          aria-label="Main navigation" 
          className={`${menuOpen ? 'flex' : 'hidden'} 
            w-full flex-col gap-1 
            lg:flex lg:w-auto lg:flex-1 
            lg:flex-row lg:flex-wrap lg:items-center`}
        >
          <NavLink to="/about" className={linkClass} onClick={() => setMenuOpen(false)}>About</NavLink>
          <NavLink to="/features" className={linkClass} onClick={() => setMenuOpen(false)}>Features</NavLink>
          {user ? (
            <>
              <NavLink to="/becomeBusiness" className={linkClass} onClick={() => setMenuOpen(false)}>Become a Business!</NavLink>
              <NavLink to="/createCoffeeshop" className={linkClass} onClick={() => setMenuOpen(false)}>Add a coffeeshop!</NavLink>
              <div className="flex items-center gap-3 px-3 py-2 lg:ml-auto"><UsernameHeader /><LogoutButton /></div>
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkClass} onClick={() => setMenuOpen(false)}>Sign In</NavLink>
              <NavLink to="/register" className={linkClass} onClick={() => setMenuOpen(false)}>Sign Up</NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
