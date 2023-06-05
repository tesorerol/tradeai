import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { Link, NavLink } from 'react-router-dom'

const PopUp = ({togglePopup}) => {
  return (
    <div className='modal-header'>
        <div className='container-popup aparecer'>
            <h2 className='tag-new'>High volatility week </h2>
            <h3>Weekly public yields increased</h3>
            <p>Ref: BTC 30-Day Volatility index</p>
            <Link onClick={togglePopup} to={"/earn-strategies/0x818F3eE1E66773165f1B4e1b815c57a275E6e807"}>
                <button className='btn2'>Visit now</button>
            </Link>
            <AiOutlineClose className='close-icon' onClick={togglePopup} size={"25px"} color={"#FAFAFA"}/>
        </div>
      
    </div>
  )
}

export default PopUp
