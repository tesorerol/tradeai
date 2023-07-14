import React from 'react'
import logo4 from "../assets/logo/logo-w-b.png"
import MenuNav2 from './MenuNav2'
import NewMenu from './NewMenu'

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='logo'>
            <img className='logo-menu' src={logo4} alt="logo Trade AI" />
      </div>
      <MenuNav2 />
      {/* <NewMenu /> */}
    </div>
  )
}

export default Navbar
