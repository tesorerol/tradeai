import React, { useRef } from 'react'
import logo from "../assets/logo/logo-benft.png"
import MenuNav from './MenuNav';
import Comunity from './Comunity';
import MenuNav2 from './MenuNav2';

const Menu = () => {
    const refActive = useRef()
    const addActive = () =>{
        refActive.current.classList.add("active")
    }
    const removeActive = () =>{
        refActive.current.classList.remove("active")
    }

    
  return (
    <div className='menu'>
        <div className='logo'>
            <img className='logo-menu' src={logo} alt="logo-benft" />
        </div>
        {/* <MenuNav removeAct={removeActive} addAct={addActive} refActive={refActive}/> */}
        <MenuNav2 removeAct={removeActive} addAct={addActive} refActive={refActive}/>
        <Comunity />
        
    </div>
  )
}

export default Menu
