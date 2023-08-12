import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { Link, NavLink } from 'react-router-dom'

const PopUp = ({togglePopup}) => {
  return (
    <div className='modal-header modal-popup'>
        <div className='container-popup aparecer'>
        <h2>Migration in progress</h2>
            <p>ETA Monday 06:00 AM UTC +0</p>
            <p>Announcement on TradeAI Discord</p>
            {/* <Link to="/earn-strategies/0x248a640d608Affea54f8D18278D3322926c84d6A" className='btn2' onClick={togglePopup}>Go Now</Link> */}
            <a href="https://discord.com/channels/1121159444949123112/1121173568965836902/1139701002975588387" className='button2' target='_blank'>Go Now</a>
            <AiOutlineClose className='close-icon' onClick={togglePopup} size={"25px"} color={"#FAFAFA"}/>
        </div>
      
    </div>
  )
}

export default PopUp
