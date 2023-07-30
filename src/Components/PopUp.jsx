import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { Link, NavLink } from 'react-router-dom'

const PopUp = ({togglePopup}) => {
  return (
    <div className='modal-header modal-popup'>
        <div className='container-popup aparecer'>
            <h2>Fomc Pool update</h2>
            <p>All users claim at the same time Monday am EST.</p>
            {/*<Link to="/earn-strategies/0x6E3138381633830dB1b29e30C912a2CC62d35B04" className='btn2' onClick={togglePopup}>Go Now</Link>*/}
            <AiOutlineClose className='close-icon' onClick={togglePopup} size={"25px"} color={"#FAFAFA"}/>
        </div>
      
    </div>
  )
}

export default PopUp
