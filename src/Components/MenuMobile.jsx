import React, { useRef } from 'react'
import logo from "../assets/logo/elysium.png"
import {AiOutlineClose} from "react-icons/ai";
import Comunity from './Comunity';
import MenuNav2 from './MenuNav2';

const MenuMobile = ({closeMenu}) => {

    const refActive = useRef()
    const addActive = () =>{
        refActive.current.classList.add("active")
    }
    const removeActive = () =>{
        refActive.current.classList.remove("active")
    }

  return (
    <div className='menu-mobile'>
        <div className='logo'>
            <img className='logo-menu' src={logo} alt="logo-elysium" />
            <AiOutlineClose onClick={closeMenu} color='#256fe2' size={"30px"}/>
        </div>
        <MenuNav2 removeAct={closeMenu} addAct={closeMenu} refActive={refActive}/>

        {/* <Comunity /> */}

    </div>
  )
}

export default MenuMobile
