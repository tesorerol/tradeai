import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import data from "../Data/contracts.json"

const MenuNav2 = ({removeAct, addAct, refActive}) => {

  return (
    <div className='menu-nav'>
            {
              data.map((item,i)=>(
                item.visible === "true" &&
                <NavLink key={i} className='button-nav' to={`/earn-strategies/${item.address}`} onClick={removeAct}>{item.namePool}</NavLink>

              ))
            }
    </div>
  )
}

export default MenuNav2
