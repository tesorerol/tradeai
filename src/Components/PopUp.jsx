import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { Link, NavLink } from 'react-router-dom'

const PopUp = ({togglePopup}) => {
  return (
    <div className='modal-header modal-popup'>
        <div className='container-popup aparecer'>
            <h2>Migration in process, changelog:</h2>
            <p>Whitelist self service</p>
            <p>Multideposit same wallet UX push</p>
            <p>Token gating</p>
            <p>ETA 6 hrs</p>
            <AiOutlineClose className='close-icon' onClick={togglePopup} size={"25px"} color={"#FAFAFA"}/>
        </div>
      
    </div>
  )
}

export default PopUp
