import React from 'react'
import data from "../../Data/strategies.json"
import { Link } from 'react-router-dom'
import cardPlatinum from "../../assets/market/card-platinum.jpg"
import cardDiamond from "../../assets/market/card-diamond.jpg"
import cardGold from "../../assets/market/card-gold.jpg"

const Market = () => {
    console.log(data)
  return (
    <div className='container-market'>
        <div className='container-cards-market'>
        {
            data.map((item,i)=>(
                <div className='item-market'>
                    
                    <p className='item-market-type'>{item.id}</p>
                    <h2 className={`${item.type === "gold" ? "text-gold" : item.type === "platinum" ? "text-platinum" : item.type === "diamond" ? "text-diamond" : ""}`}>{item.name}</h2>
                    <p>Interval: {item.interval}</p>
                    <p>Margin per slot: {item.max}</p>
                    {/* <p>Price: ${item.weeklyCost}</p> */}
                    {/* <Link to={`/market/${item.id}`}> */}
                    <button className='button2'>Soon</button>
                    {/* </Link> */}
                    {item.type === "gold" && <img className='card-bg' src={cardGold} alt="" />} 
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
