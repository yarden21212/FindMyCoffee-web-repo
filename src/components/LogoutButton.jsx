import { NavLink } from 'react-router-dom'
import { useAuth } from "../context/AuthProvider"

const LogoutButton = () => {
  const { clearUser } = useAuth(); // access clearUser function from AuthProvider

  const handleLogout = () => {
      // <UsernameHeader/>
      clearUser();
  };

  return (
    <NavLink to='/login'>
      <div>
        <button 
          onClick={handleLogout}
          className='cursor-pointer
           hover:text-white hover:underline'
        >
          Logout</button> 
      </div>
    </NavLink>
  )
}

export default LogoutButton