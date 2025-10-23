import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import UsernameHeader from './CoffeeShopOutput/UsernameHeader';

const LogoutButton = () => {

  const logout = ((nameParam, applyEffectParam) => {
      <UsernameHeader name = {nameParam} applyEffect = {applyEffectParam}/>
  });

  return (
    <NavLink to='/login'>
      <div>
        <button 
          onClick={() => {
            localStorage.setItem('username', ' ');
            logout(localStorage.getItem("username"), true);
          }}
          className='cursor-pointer
           hover:text-white hover:underline'
        >
          Logout</button> 
      </div>
    </NavLink>
  )
}

export default LogoutButton