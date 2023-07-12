import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaMoneyBillWaveAlt } from 'react-icons/fa';
import {GiTwoCoins} from "react-icons/gi"
import { HiHome } from 'react-icons/hi';
import { MdHowToVote, MdCollections } from 'react-icons/md';
import {AiOutlineArrowDown} from "react-icons/ai";
import {IoIosArrowDown} from "react-icons/io";
import {BsArrowBarRight, BsArrowRightShort,BsArrowRight} from "react-icons/bs"
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
            {/* <NavLink className='button-nav' to="/market" onClick={removeAct}> Market</NavLink> */}
            
    </div>
  )
}

export default MenuNav2
