import React, { useContext, useEffect, useState } from 'react'
import cardPlatinum from "../assets/market/card-platinum.jpg"
import cardDiamond from "../assets/market/card-diamond.jpg"
import cardGold from "../assets/market/card-gold.jpg"
import cardGM from "../assets/market/bg-gmjp.png"
import {ethers} from "ethers"
import { WalletContext } from '../Providers/WallectConnect'
import { Link } from 'react-router-dom'
import SlotAbi from "../artifacts/slots/abi.json"

const CardMarket = ({scid,id,interval,name,type,max,period,maxCount}) => {
    const { Provider, address } = useContext(WalletContext)
    const EarnContract = "0x836AaF1A00eaDEe459d64636222ac80Ee27c673D"
    let contractConsult = new ethers.Contract(EarnContract, SlotAbi, Provider)

    const [SlotLeft,setSlotLeft] = useState([])
    const [percent,setPercent]=useState("0")
    const [slotsRemaining,setSlotsRemaining]=useState(null)
    const totalCount = period * maxCount

    async function getSlotLefts() {
        let totalSlots = 0

        contractConsult
          .getAllDaySlots(scid)
          .then(async (r) => {
            for(let i = 0; i < r.length; i++){
                const slots = r[i].toString()
                const number = parseInt(slots)
                totalSlots+=number
                console.log(totalSlots)
                setSlotsRemaining(totalCount-totalSlots)
                setPercent((totalCount-totalSlots)*100 / totalCount)
            }      
            setSlotLeft(r);
          })
      }

    useEffect(()=>{
        getSlotLefts()
    },[])

  return (
    <div className='item-market'>               
        <p className='item-market-type'>{id}</p>
        <h2 className={`t-${type}`}>{name}</h2>
        <p>Interval: {interval}</p>
        <p>Margin per slot: {max}</p>
        <div className='container-progress-market'>
        <div className='text-remaining'>
            <p>PROGRESS</p>
            <span>{slotsRemaining}/{totalCount}</span>
        </div>
        <div className='progress-bar-market'>
            <div className={`bar-market b-${type}`} style={{ width: `${percent}%` }}></div>
        </div>
        </div>
        <Link to={`/market/${id}`}>
        <button className='button2'>View Details</button>
        </Link> 
        {type === "gold" && <img className='card-bg' src={cardGold} alt="Strategies TradeAi" />} 
        {type === "diamond" && <img className='card-bg' src={cardDiamond} alt="Strategies TradeAi" />} 
        {type === "platinum" && <img className='card-bg' src={cardPlatinum} alt="Strategies TradeAi" />}
        {type === "gm" && <img className='card-bg' src={cardGM} alt="Strategies TradeAi" />} 
    </div>
  )
}

export default CardMarket
