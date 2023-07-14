import React, { useState } from 'react'
import {IoIosArrowDown} from "react-icons/io"
import data from "../Data/ejm.json"
import { NavLink } from 'react-router-dom'

const NewMenuMobile = ({closeMenu}) => {
    const [menuActive, setMenuActive] = useState(null)

  return (
    <div className='new-menu'>
        <div className='new-menu-cont ' onClick={()=>setMenuActive("public")}>
            <h2 className={`${menuActive === "public" ? "color-act" : ""}`} >PUBLIC <IoIosArrowDown size={"20px"} color='#fff'/> </h2>
            {
                menuActive === "public" &&
                <div className='new-menu-drop-mobile'>
                    {
                        data.map((item,i)=>(
                            item.parent === "weekly" && item.visible === "true" &&
                            <NavLink className='new-menu-drop-item' to={`/earn-strategies/${item.address}`} onClick={closeMenu}>{item.namePool}</NavLink>
                        ))
                    }

                </div>
            }
        </div>
        <div className='new-menu-cont' onClick={()=>setMenuActive("pass")} >
            <h2 className={`${menuActive === "pass" ? "color-act" : ""}`}>EARN PASS <IoIosArrowDown size={"20px"} color='#fff'/></h2>
            {
                menuActive === "pass" &&
                <div className='new-menu-drop-mobile'>
                    {
                        data.map((item,i)=>(
                            item.parent === "pass" && item.visible === "true" &&
                            <NavLink className='new-menu-drop-item' to={`/earn-strategies/${item.address}`} onClick={closeMenu}>{item.namePool}</NavLink>
                        ))
                    }

                </div>
            }
        </div>
        
        <div className='new-menu-cont ' onClick={()=>setMenuActive("partners")} >
            <h2 className={`${menuActive === "partners" ? "color-act" : ""}`}>PARTNERS  <IoIosArrowDown size={"20px"} color='#fff'/></h2>
            {
                menuActive === "partners" &&
                <div className='new-menu-drop-mobile'>
                    {
                        data.map((item,i)=>(
                            item.parent === "private" && item.visible === "true" &&
                            <NavLink className='new-menu-drop-item' to={`/earn-strategies/${item.address}`} onClick={closeMenu}>{item.namePool}</NavLink>
                        ))
                    }

                </div>
            }
        </div>
        <div className='new-menu-cont ' onClick={()=>setMenuActive("claim")} >
            <h2 className={`${menuActive === "claim" ? "color-act" : ""}`}>CLAIM ONLY  <IoIosArrowDown size={"20px"} color='#fff'/></h2>
            {
                menuActive === "claim" &&
                <div className='new-menu-drop-mobile'>
                    {
                        data.map((item,i)=>(
                            item.parent === "claim" && item.visible === "true" &&
                            <NavLink className='new-menu-drop-item' to={`/earn-strategies/${item.address}`} onClick={closeMenu}>{item.namePool}</NavLink>
                        ))
                    }

                </div>
            }
        </div>
        
    </div>
  )
}

export default NewMenuMobile
