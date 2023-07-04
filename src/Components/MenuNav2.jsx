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

    const [isOpen,setIsOpen] = useState({
        earn: false,
        weekly: false,
        monthly: false,
        private: false,
        vispx: false,
        claim: false,
    })


    const toggleEarn = (id)=>{
        const nEarn = {...isOpen}
        if(id=="earn"){
            nEarn.earn = !nEarn.earn
            nEarn.weekly = false
            nEarn.monthly = false
            nEarn.private = false
            nEarn.vispx = false
            nEarn.claim = false
            setIsOpen(nEarn)
        }else if(id=="weekly"){
            nEarn.weekly = !nEarn.weekly
            nEarn.monthly = false
            nEarn.private = false
            nEarn.vispx = false
            nEarn.claim = false
            setIsOpen(nEarn)
        }else if(id=="monthly"){
            nEarn.monthly = !nEarn.monthly
            nEarn.weekly = false
            nEarn.private = false
            nEarn.vispx = false
            nEarn.claim = false
            setIsOpen(nEarn)
        }else if(id=="private"){
            nEarn.private = !nEarn.private
            nEarn.weekly = false
            nEarn.monthly = false
            nEarn.vispx = false
            nEarn.claim = false
            setIsOpen(nEarn)
        }else if(id=="vispx"){
            nEarn.vispx = !nEarn.vispx
            nEarn.weekly = false
            nEarn.monthly = false
            nEarn.private = false
            nEarn.claim = false
            setIsOpen(nEarn)
        }else if(id=="claim"){
            nEarn.claim = !nEarn.claim
            nEarn.weekly = false
            nEarn.monthly = false
            nEarn.private = false
            nEarn.vispx = false
            setIsOpen(nEarn)
        }
    }

  return (
    <div className='menu-nav'>
            
            <NavLink className='button-nav' to="/earn-strategies/0x95E257Ba297E705B968c605BbDb5937a0CF95334" onClick={removeAct}> Anarkey</NavLink>
            {/* <NavLink className='button-nav' to="/market" onClick={removeAct}> Market</NavLink> */}
            
    </div>
  )
}

export default MenuNav2
