import { NavLink } from 'react-router-dom';
import { useAuth } from "../../context/AuthProvider.jsx";

const UsernameHeader = () => {
  const { user } = useAuth();
  const letter = user?.username?.charAt(0)?.toUpperCase() || null;
  if (!letter) return null;

  return(
    <NavLink to="/">
    <button className='bg-white border-3 rounded-full h-15 w-15 flex items-center justify-center overflow-hidden cursor-pointer hover:bg-amber-50 active:bg-neutral-100 '>  
      <div className='text-sm overflow-hidden font-bold animate-pulse'> 
        {letter}
      </div>
    </button>
  </NavLink>
  );
}


export default UsernameHeader;

