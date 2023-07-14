import React, { useState } from 'react'
import {IoIosArrowDown} from "react-icons/io"
import data from "../Data/ejm.json"
import { NavLink } from 'react-router-dom'

const NewMenu = ({removeAct}) => {
    const [isHovered,setIsHovered] = useState(null)

  return (
    <div className='new-menu'>
        <div className='new-menu-cont ' onMouseEnter={()=>setIsHovered("public")} onMouseLeave={()=>setIsHovered(null)}>
            <h2 className={`${isHovered === "public" ? "color-act" : ""}`} >PUBLIC <IoIosArrowDown size={"20px"} color='#fff'/> </h2>
            {
                isHovered === "public" &&
                <div className='new-menu-drop'>
                    {
                        data.map((item,i)=>(
                            item.parent === "weekly" && item.visible === "true" &&
                            <NavLink className='new-menu-drop-item' to={`/earn-strategies/${item.address}`} onClick={removeAct}>{item.namePool}</NavLink>
                        ))
                    }

                </div>
            }
        </div>
        <div className='new-menu-cont' onMouseEnter={()=>setIsHovered("pass")} onMouseLeave={()=>setIsHovered(null)}>
            <h2 className={`${isHovered === "pass" ? "color-act" : ""}`}>EARN PASS <IoIosArrowDown size={"20px"} color='#fff'/></h2>
            {
                isHovered === "pass" &&
                <div className='new-menu-drop'>
                    {
                        data.map((item,i)=>(
                            item.parent === "pass" && item.visible === "true" &&
                            <NavLink className='new-menu-drop-item' to={`/earn-strategies/${item.address}`} onClick={removeAct}>{item.namePool}</NavLink>
                        ))
                    }

                </div>
            }
        </div>
        
        <div className='new-menu-cont ' onMouseEnter={()=>setIsHovered("partners")} onMouseLeave={()=>setIsHovered(null)}>
            <h2 className={`${isHovered === "partners" ? "color-act" : ""}`}>PARTNERS  <IoIosArrowDown size={"20px"} color='#fff'/></h2>
            {
                isHovered === "partners" &&
                <div className='new-menu-drop'>
                    {
                        data.map((item,i)=>(
                            item.parent === "private" && item.visible === "true" &&
                            <NavLink className='new-menu-drop-item' to={`/earn-strategies/${item.address}`} onClick={removeAct}>{item.namePool}</NavLink>
                        ))
                    }

                </div>
            }
        </div>
        <div className='new-menu-cont ' onMouseEnter={()=>setIsHovered("claim")} onMouseLeave={()=>setIsHovered(null)}>
            <h2 className={`${isHovered === "claim" ? "color-act" : ""}`}>CLAIM ONLY  <IoIosArrowDown size={"20px"} color='#fff'/></h2>
            {
                isHovered === "claim" &&
                <div className='new-menu-drop'>
                    {
                        data.map((item,i)=>(
                            item.parent === "claim" && item.visible === "true" &&
                            <NavLink className='new-menu-drop-item' to={`/earn-strategies/${item.address}`} onClick={removeAct}>{item.namePool}</NavLink>
                        ))
                    }

                </div>
            }
        </div>
        
    </div>
  )
}

export default NewMenu
