import React from 'react'
import logo4 from "../assets/logo/elysium.png"
import MenuNav2 from './MenuNav2'

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='logo'>
            <img className='logo-menu' src={logo4} alt="logo Elysium" />
      </div>
      <MenuNav2 />
    </div>
  )
}

export default Navbar
