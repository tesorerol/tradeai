import React from 'react'
import data from "../../Data/strategies.json"
import CardMarket from '../../Components/CardMarket'

const Market = () => {

  return (
    <div className='container-market'>
        <div className='container-cards-market'>
        { 
            data.map((item,i)=>(
                <CardMarket key={i} scid={item.scid} id={item.id} interval={item.interval} name={item.name} type={item.type} max={item.max} period={item.period} maxCount={item.maxCount} />
            ))
        }
        </div>
      
    </div>
  )
}

export default Market
