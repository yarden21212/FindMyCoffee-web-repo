import {useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const UsernameHeader = () => {

  //TODO: Instead of NavLink I want it to open options and show the options of the current account
  return(
    <NavLink to="/">
    <button className='bg-white border-3 rounded-full h-15 w-15 flex items-center justify-center overflow-hidden cursor-pointer hover:bg-amber-50 active:bg-neutral-100 '>  
      <div className='text-sm overflow-hidden font-bold animate-pulse'> 
        {localStorage.getItem("username").charAt(0).toUpperCase()}
      </div>
    </button>
  </NavLink>
  );
}


export default UsernameHeader;

