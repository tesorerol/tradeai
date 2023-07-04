import React from 'react'
import data from "../../Data/strategies.json"
import { Link } from 'react-router-dom'
import cardPlatinum from "../../assets/market/card-platinum.png"
import cardDiamond from "../../assets/market/card-diamond.png"
import cardTitanium from "../../assets/market/card-titanium.png"

const Market = () => {
    console.log(data)
  return (
    <div className='container-market'>
        <div className='container-cards-market'>
        {
            data.map((item,i)=>(
                <div className='item-market'>
                    <img src="" alt="" />
                    <p className='item-market-type'><span>{item.type}</span> / {item.id}</p>
                    <h2>{item.pair}</h2>
                    <p>Interval: {item.interval}</p>
                    <p>Margin per slot: {item.max}</p>
                    <Link to={`/market/${item.id}`}>
                    <button className='button2'>Details</button>
                    </Link>
                    {item.type === "titanium" && <img className='card-bg' src={cardTitanium} alt="" />} 
                    {item.type === "diamond" && <img className='card-bg' src={cardDiamond} alt="" />} 
                    {item.type === "platinum" && <img className='card-bg' src={cardPlatinum} alt="" />} 
                </div>
            ))
        }
        </div>
      
    </div>
  )
}

export default Market
