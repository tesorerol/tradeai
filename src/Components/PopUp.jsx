import React from 'react'
import popUpImg from "../../src/assets/pop-up.png"
import { Link } from 'react-router-dom'

const PopUp = ({setModalPopUp}) => {
  return (
    <div className='container-modal-pop-up aparecer'>
        <div className='pop-up'>
            <Link to="/" onClick={()=>{setModalPopUp(false)}}>
            <img src={popUpImg} alt="TradeAI Strategies LiveNOW" />
            </Link>
        </div>
    </div>
  )
}

export default PopUp
