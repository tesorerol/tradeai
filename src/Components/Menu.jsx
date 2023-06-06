import React, { useRef } from 'react'
import logo from "../assets/logo/trade-ai-w-h.png"
import logo2 from "../assets/logo/trade-ai-black-h.png"
import logo3 from "../assets/logo/trade-ai-color.png"
import logo4 from "../assets/logo/logo-w-b.png"
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
            <img className='logo-menu' src={logo4} alt="logo-benft" />
        </div>
        <MenuNav2 addAct={addActive} refActive={refActive}/>
        {/* <Comunity /> */}
        
    </div>
  )
}

export default Menu
