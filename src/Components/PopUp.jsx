import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { Link, NavLink } from 'react-router-dom'

const PopUp = ({togglePopup}) => {
  return (
    <div className='modal-header modal-popup'>
        <div className='container-popup aparecer'>
            <h2>High volatility expected</h2>
            <p>Yields adjusted</p>
            <Link to="/earn-strategies/0xcD787272FA8Bc355B9fDAB2fDEc6369502100616" className='btn2' onClick={togglePopup}>Go Now</Link>
            <AiOutlineClose className='close-icon' onClick={togglePopup} size={"25px"} color={"#FAFAFA"}/>
        </div>
      
    </div>
  )
}

export default PopUp
