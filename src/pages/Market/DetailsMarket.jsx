import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import gold from "../../assets/market/bg-gold.jpg"
import diamond from "../../assets/market/bg-diamond.jpg"
import platinum from "../../assets/market/bg-platinum.jpg"
import gm from "../../assets/market/gmj.png"
import { BsQuestionSquare } from 'react-icons/bs'
import {Approve , Allowance} from "../../Helpers"
import { WalletContext } from '../../Providers/WallectConnect'
import SlotAbi from '../../artifacts/slots/abi.json'
import Swal from 'sweetalert2'
import { ethers } from 'ethers'
import Loader from '../../Components/Loading'
import TablePeriod from '../../Components/TablePeriod'

const InputsToPrint=({amount})=>{
  let array=[];
  for (let i = 1; i <=amount; i++) {
   array.push(<option key={i} value={i}>{i}</option>);
  }
  return array;
}


const DetailsMarket = ({scid,pair,interval, max, id,maxCount,weeklyCost,leverage,type,name,description,description2,description3,period,typePeriod}) => {

    const { Provider, address } = useContext(WalletContext)
    const EarnContract = "0x836AaF1A00eaDEe459d64636222ac80Ee27c673D"
    let USDT = '0x55d398326f99059fF775485246999027B3197955'
    let contractConsult = new ethers.Contract(EarnContract, SlotAbi, Provider)
    const [Loading, setLoading] = useState(false)
    const [Aprove, setAprove] = useState(true)
    
    const [valueInput, setValue] = useState('');
    const [selectedOption, setSelectedOption] = useState(1);
    const [descriptionActive,setDescription] = useState(1)
    const [isHovered,setIsHovered] = useState("")
    const [SlotLeft,setSlotLeft] = useState([])
    const [UserPurchase,setUserPurchase] = useState([])

    useEffect(() => {
        getSlotLefts()
        GetPucharse()
        
        if (address) {
          Allowance(Provider, address, EarnContract, USDT).then((r) => {
            if (parseInt(ethers.utils.formatEther(r)) >= 1000000) {
              setAprove(false)
            } else {
              setAprove(true)
            }
          })
        }
      }, [address, EarnContract])

  

    const handleChange = (e) => {
        let inputValue = e.target.value;
        
        if (!isNaN(inputValue)) {
       
        inputValue = parseInt(inputValue);
        
        if (inputValue >= 1 && inputValue <= maxCount) {
            setValue(inputValue);
        }
        }
    };
    const handleChangeSelect = (e) => {
        setSelectedOption(e.target.value);
    };

    async function BuySlot() {
        if(valueInput<=0){
            Swal.fire({
                icon: 'error',
                title: "You must put a number greater than 0 in max count",
              })
              return
        }
        let signer = Provider.getSigner()
        setLoading(true)
        let contract2 = new ethers.Contract(EarnContract, SlotAbi, signer)
        contract2
          .BuySlot(valueInput,scid,selectedOption)
          .then(async (r) => {
            r.wait()
              .then((r) => {
                setLoading(false)
              })
              .catch((e) => {
                console.log(e)
              })
          })
          .catch((e) => {
            setLoading(false)
            const errorMessage = e.error.data.message
            Swal.fire({
              icon: 'error',
              title: errorMessage,
            })
          })
      }


      async function GetPucharse() {
        contractConsult
          .getAllUserPurchases(address)
          .then(async (r) => {
            setUserPurchase(r);
          })
      }


      async function getSlotLefts() {
        
        contractConsult
          .getAllDaySlots(scid)
          .then(async (r) => {
            setSlotLeft(r);
          })
      }

    const formatMax = max.replace("$", "").replace(",", "");
    const formatMaxInt = parseInt(formatMax);

    const amount = valueInput * weeklyCost;
    const weeklyRent = amount * selectedOption;
    const tradeSize = formatMaxInt * valueInput;
    
  return (
    <div className='container-details-market'>
        {Loading && <Loader />}
        <div className='container-details'>
            <div className='container-details-head'>
                <div className='head-img'>
                    {type === "gold" && <img src={gold} alt="titanium TradeAI" />}
                    {type === "platinum" && <img src={platinum} alt="platinium TradeAI" />} 
                    {type === "diamond" && <img src={diamond} alt="diamond TradeAI" />}
                    {type === "gm" && <img src={gm} alt="diamond TradeAI" />}
                </div>
                <div className='head-info'>
                    <div className='head-info-details'>
                        <h2 className={`t-${type}`}>{name}</h2>
                        <span>{id}</span>
                        <p>Interval: {interval}</p>
                        <p>Max Margin per slot: {max}</p>
                        <p>Price per Slot: ${weeklyCost}</p>
                        <p>Leverage: {leverage}</p>
                        
                    </div>
                    <div className='div-inputs'>
                        <div className='container-input'>
                            <label htmlFor="number">Max Count:</label>
                            <input type="number"
                                    placeholder= {`1 - ${maxCount} `}
                                    min="1"
                                    max={maxCount}
                                    name='number'
                                    value={valueInput}
                                    onChange={handleChange}
                                    className='input-number' />
                        </div>
                        <div className='container-input'>
                            <label htmlFor="number">{typePeriod} to Rent:</label>
                            <select name='weekly' className='input-select' value={selectedOption} onChange={handleChangeSelect}>
                                <InputsToPrint amount={period} />
                            </select>
                        </div>

                    </div>

                    {Aprove ? (
                  <button className='button2' onClick={() => {
                    setLoading(true)
                    Approve(Provider, EarnContract, USDT)
                      .then((r) => {
                        Allowance(Provider, address, EarnContract, USDT).then(
                          (r) => {
                            if (
                              parseInt(ethers.utils.formatEther(r)) >= 1000000
                            ) {
                              setAprove(false)
                              Swal.fire({
                                icon: 'success',
                                title: 'Tokens Approve',
                                showConfirmButton: true,
                              })
                            } else {
                              setAprove(true)
                              Swal.fire({
                                icon: 'error',
                                title: 'you need approve more than 0 or use max default',
                                showConfirmButton: true,
                              })
                            }
                            setLoading(false)
                          },
                        )
                      })
                      .catch((r) => setLoading(false))
                  }}>
                    <span className='button-content'>Approve</span>
                  </button>
                  
                ) : ( <button className='button2' onClick={()=>BuySlot()}>BUY</button>)
                }
            
                </div>
                <div className='head-table'>
                    <h2>Transaction Details</h2>
                    <div className='table-item'>
                        <h3>Amount <span>({valueInput} x {weeklyCost})</span> <BsQuestionSquare onMouseEnter={()=>{setIsHovered(1)}} onMouseLeave={()=>{setIsHovered("")}} size={'20px'} color="#245a78" /></h3>
                        <p>${amount}</p>
                        {
                            isHovered === 1 && 
                            <div className='table-tooltip aparecer'>
                              <p></p>
                            </div>
                        }
                    </div>
                    <div className='table-item'>
                        <h3>{typePeriod} to Rent <span>({valueInput*weeklyCost} x {selectedOption})</span> <BsQuestionSquare onMouseEnter={()=>{setIsHovered(2)}} onMouseLeave={()=>{setIsHovered("")}} size={'20px'} color="#245a78" /></h3>
                        <p>${weeklyRent}</p>
                        {
                            isHovered === 2 && 
                            <div className='table-tooltip tooltip-2 aparecer'>
                                <p></p>
                            </div>
                        }
                    </div>
                    <div className='table-item'>
                        <h3>Trade Size Limit <BsQuestionSquare onMouseEnter={()=>{setIsHovered(3)}} onMouseLeave={()=>{setIsHovered("")}} size={'20px'} color="#245a78" /></h3>
                        <p>${tradeSize}</p>
                        {
                            isHovered === 3 && 
                            <div className='table-tooltip aparecer'>
                                <p> </p>
                            </div>
                        }
                    </div>
                    {/* <div className='table-item'>
                        <h3></h3>
                        <p></p>
                    </div> */}

                </div>
            </div>
            <div className='container-body'>
                <div className='container-details-body'>
                    <div className='container-details-body-head'>
                        <div>
                            <h2 onClick={()=>setDescription(1)} className={`h2-description ${descriptionActive===1 ? "active-description" : ""}`}>Description</h2>
                        </div>
                        <div>
                            <h2 onClick={()=>setDescription(2)} className={`${descriptionActive===2 ? "active-description" : ""}`}>How to</h2>
                        </div>
                    </div>
                    {descriptionActive === 1 && 
                    <div className='aparecer'>
                        <p>{description}</p>
                        <p>{description2}</p>
                        <p>{description3}</p> 
                        <p>Supported Cexs: All</p>
                    </div>}
                    {
                        descriptionActive === 2 &&
                        <div className='aparecer'>
                            <p>Pre-sale of the strategies is first come-first served model. Portal to use them live on August 1 .</p>
                            <p>Strategies connect via API to the users exchange to place the trades automatically.</p>
                            <p>Documentation on usage and training will be provided on TradeAIs Discord.</p>
                        </div>
                    }
                </div>
                <TablePeriod tittle={"Remaining Slots"} period={period} typePeriod={typePeriod} data={SlotLeft}/>
                <TablePeriod tittle={"Your Slots"} period={period} typePeriod={typePeriod} data={UserPurchase}/>

            </div>
        </div>
    </div>
  )
}

export default DetailsMarket
