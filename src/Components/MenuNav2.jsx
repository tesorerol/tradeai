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
            
            <NavLink className='button-nav' to="/earn-strategies/0x9b8a82B85034df40EfE34c4087c36D41fc559914" onClick={removeAct}>Treehouse</NavLink>
            {/* <NavLink className='button-nav' to="/market" onClick={removeAct}> Market</NavLink> */}
            
    </div>
  )
}

export default MenuNav2
