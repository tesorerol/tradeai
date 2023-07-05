import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import gold from "../../assets/market/bg-gold.jpg"
import diamond from "../../assets/market/bg-diamond.jpg"
import platinum from "../../assets/market/bg-platinum.jpg"
import { BsQuestionSquare } from 'react-icons/bs'
import {Approve , Allowance} from "../../Helpers"
import { WalletContext } from '../../Providers/WallectConnect'
import Swal from 'sweetalert2'
import { ethers } from 'ethers'
import Loader from '../../Components/Loading'


const DetailsMarket = ({pair,interval, max, id,maxCount,weeklyCost,leverage,type,name,description,description2,description3}) => {

    const { Provider, address } = useContext(WalletContext)
    const EarnContract = ""
    let USDT = '0x55d398326f99059fF775485246999027B3197955'

    const [Loading, setLoading] = useState(false)
    const [Aprove, setAprove] = useState(true)
    
    const [valueInput, setValue] = useState('');
    const [selectedOption, setSelectedOption] = useState(1);
    const [descriptionActive,setDescription] = useState(1)
    const [isHovered,setIsHovered] = useState("")


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
                </div>
                <div className='head-info'>
                    <div className='head-info-details'>
                        <h2 className={`${type === "gold" ? "text-gold" : type === "platinum" ? "text-platinum" : type === "diamond" ? "text-diamond" : ""}`}>{name}</h2>
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
                            <label htmlFor="number">Weeks to Rent:</label>
                            <select name='weekly' className='input-select' value={selectedOption} onChange={handleChangeSelect}>
                                {/* <option value="">1-4</option> */}
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
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
                  
                ) : ( <button className='button2'>BUY</button>)
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
                              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas architecto reiciendis dicta</p>
                            </div>
                        }
                    </div>
                    <div className='table-item'>
                        <h3>Weeks to Rent <span>({valueInput*weeklyCost} x {selectedOption})</span> <BsQuestionSquare onMouseEnter={()=>{setIsHovered(2)}} onMouseLeave={()=>{setIsHovered("")}} size={'20px'} color="#245a78" /></h3>
                        <p>${weeklyRent}</p>
                        {
                            isHovered === 2 && 
                            <div className='table-tooltip tooltip-2 aparecer'>
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas architecto reiciendis dicta</p>
                            </div>
                        }
                    </div>
                    <div className='table-item'>
                        <h3>Trade Size Limit <BsQuestionSquare onMouseEnter={()=>{setIsHovered(3)}} onMouseLeave={()=>{setIsHovered("")}} size={'20px'} color="#245a78" /></h3>
                        <p>${tradeSize}</p>
                        {
                            isHovered === 3 && 
                            <div className='table-tooltip aparecer'>
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas architecto reiciendis dicta </p>
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
                        <p>Supported Cexs Binance, Bybit and Kucoin.</p>
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
            
                <div className='container-body-table'>
                    <h3>Slots</h3>
                    <table className='body-table'>
                        <tbody>
                        <tr>
                            <td>Week 1</td>
                            <td>500</td>
                        </tr>
                        <tr>
                            <td>Week 2</td>
                            <td>500</td>
                        </tr>
                        <tr>
                            <td>Week 3</td>
                            <td>500</td>
                        </tr>
                        <tr>
                            <td>Week 4</td>
                            <td>500</td>
                        </tr>
                        <tr>
                            <td>Week 5</td>
                            <td>500</td>
                        </tr>
                        <tr>
                            <td>Week 6</td>
                            <td>500</td>
                        </tr>
                        <tr>
                            <td>Week 7</td>
                            <td>500</td>
                        </tr>
                        <tr>
                            <td>Week 8</td>
                            <td>500</td>
                        </tr>
                        <tr>
                            <td>Week 9</td>
                            <td>500</td>
                        </tr>
                        <tr>
                            <td>Week 10</td>
                            <td>500</td>
                        </tr>
                        
                        </tbody>
                    </table>
                </div>
                <div className='container-body-table'>
                    <h3>Slots</h3>
                    <table className='body-table'>
                    <tbody>
                        <tr>
                            <td>Week 1</td>
                            <td>500</td>
                        </tr>
                        <tr>
                            <td>Week 2</td>
                            <td>500</td>
                        </tr>
                        <tr>
                            <td>Week 3</td>
                            <td>500</td>
                        </tr>
                        <tr>
                            <td>Week 4</td>
                            <td>500</td>
                        </tr>
                        <tr>
                            <td>Week 5</td>
                            <td>500</td>
                        </tr>
                        <tr>
                            <td>Week 6</td>
                            <td>500</td>
                        </tr>
                        <tr>
                            <td>Week 7</td>
                            <td>500</td>
                        </tr>
                        <tr>
                            <td>Week 8</td>
                            <td>500</td>
                        </tr>
                        <tr>
                            <td>Week 9</td>
                            <td>500</td>
                        </tr>
                        <tr>
                            <td>Week 10</td>
                            <td>500</td>
                        </tr>
                        
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    </div>
  )
}

export default DetailsMarket
