import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaMoneyBillWaveAlt } from 'react-icons/fa';
import {GiTwoCoins} from "react-icons/gi"
import { HiHome } from 'react-icons/hi';
import { MdHowToVote, MdCollections } from 'react-icons/md';
import {AiOutlineArrowDown} from "react-icons/ai";
import {IoIosArrowDown} from "react-icons/io";
import {BsArrowBarRight, BsArrowRightShort,BsArrowRight} from "react-icons/bs"
import data from "../Data/contracts.json"
import { WalletContext } from '../Providers/WallectConnect';

const MenuNav2 = ({removeAct, addAct, refActive}) => {

    const {isAllowed,setIsAllowed} = useContext(WalletContext);

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
            
            {
                isAllowed && <NavLink className='button-nav' to="/earn-strategies/0x95E257Ba297E705B968c605BbDb5937a0CF95334" onClick={removeAct}> Anarkey</NavLink>
            }
            <NavLink className='button-nav' to="/market" onClick={removeAct}> Market</NavLink>
            <NavLink className='button-nav' to="/earn-strategies/0x94E057dee3C7d6f98734e8b56a5a79397e9A082c" onClick={removeAct}> TradeAI TAS</NavLink>
            
    </div>
  )
}

export default MenuNav2
