import React, { useRef } from 'react'
import logo from "../assets/logo/logo-w-b.png"
import {AiOutlineClose} from "react-icons/ai";
import Comunity from './Comunity';
import MenuNav2 from './MenuNav2';
import NewMenu from './NewMenu';
import NewMenuMobile from './NewMenuMobile';

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
            <img className='logo-menu' src={logo} alt="logo-benft" />
            <AiOutlineClose onClick={closeMenu} color='#256fe2' size={"30px"}/>
        </div>
        <MenuNav2 removeAct={closeMenu} addAct={closeMenu} refActive={refActive}/>
        {/* <NewMenuMobile closeMenu={closeMenu}/> */}

        {/* <Comunity /> */}

    </div>
  )
}

export default MenuMobile
