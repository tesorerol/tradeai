import React, { useContext, useEffect, useState } from 'react'
import data from "../../Data/strategies.json"
import { Link } from 'react-router-dom'
import cardPlatinum from "../../assets/market/card-platinum.jpg"
import cardDiamond from "../../assets/market/card-diamond.jpg"
import cardGold from "../../assets/market/card-gold.jpg"
import { WalletContext } from '../../Providers/WallectConnect'
import SlotAbi from "../../artifacts/slots/abi.json"
import {ethers} from "ethers"

const Market = () => {
    const [percentBar,setPercentBar] = useState("50")
    const [SlotLeft,setSlotLeft] = useState([])
    
    const { Provider, address } = useContext(WalletContext)
    const EarnContract = "0x836AaF1A00eaDEe459d64636222ac80Ee27c673D"
    let contractConsult = new ethers.Contract(EarnContract, SlotAbi, Provider)

    const [percentPlatinum,setPercentPlatinum]=useState("0")
    const [percentDiamond,setPercentDiamond]=useState("0")
    const [percentGold,setPercentGold]=useState("0")
    const [slotsRemainingPlatinum,setSlotsRemainingPlatinum]=useState(null)
    const [slotsRemainingDiamond,setSlotsRemainingDiamond]=useState(null)
    const [slotsRemainingGold,setSlotsRemainingGold]=useState(0)

    async function getSlotLefts(data) {
        for (const item of data) {
            const { type, scid } = item;
            let totalGold = 0
            let totalDiamond = 0
            let totalPlatinum = 0
            
            await contractConsult.getAllDaySlots(scid).then(async (r) => {
              if (type === 'platinum') {
                for(let i = 0; i < r.length; i++){
                    const slotPlatinum = r[i].toString()
                    const number = parseInt(slotPlatinum)
                    
                    totalPlatinum+=number
                    setSlotsRemainingPlatinum(5000-totalPlatinum)
                    setPercentPlatinum((5000-totalPlatinum)*100 / 5000)
                }
              } else if (type === 'diamond') {
                for(let i = 0; i < r.length; i++){
                    const slotDiamond = r[i].toString()
                    const number = parseInt(slotDiamond)
                    
                    totalDiamond+=number
                    setSlotsRemainingDiamond(5000-totalDiamond)
                    setPercentDiamond((5000-totalDiamond)*100 / 5000)
                }
              } else if (type === 'gold') {
                for(let i = 0; i < r.length; i++){
                    const slotGold = r[i].toString()
                    const number = parseInt(slotGold)
                    
                    totalGold+=number
                    setSlotsRemainingGold(5000-totalGold)
                    setPercentGold((5000-totalGold)*100 / 5000)
                }
              }
            });
          }
    }

    useEffect(()=>{
        getSlotLefts(data)
                
    },[data])

    

  return (
    <div className='container-market'>
        <div className='container-cards-market'>
        {
            data.map((item,i)=>(
                <div className='item-market' key={i}>
                    
                    <p className='item-market-type'>{item.id}</p>
                    <h2 className={`${item.type === "gold" ? "text-gold" : item.type === "platinum" ? "text-platinum" : item.type === "diamond" ? "text-diamond" : ""}`}>{item.name}</h2>
                    <p>Interval: {item.interval}</p>
                    <p>Margin per slot: {item.max}</p>
                    {/* <p>Price: ${item.weeklyCost}</p> */}

                    <div className='container-progress-market'>
                    <div className='text-remaining'>
                        <p>PROGRESS</p>
                        <span>{item.type==="gold"? slotsRemainingGold : item.type === "platinum" ? slotsRemainingPlatinum : slotsRemainingDiamond}/5000</span>
                    </div>
                    <div className='progress-bar-market'>
                        <div className={`bar-market ${item.type === "gold" ? "background-gold" : item.type === "platinum" ? "background-platinum" : item.type === "diamond" ? "background-diamond" : ""}`} style={{ width: `${item.type==="gold"? percentGold : item.type === "platinum" ? percentPlatinum : percentDiamond}%` }}></div>
                    </div>
                    </div>
                    <Link to={`/market/${item.id}`}>
                    <button className='button2'>View Details</button>
                    </Link> 
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
