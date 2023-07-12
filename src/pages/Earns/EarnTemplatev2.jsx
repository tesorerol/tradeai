import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaUserAlt } from 'react-icons/fa'
import Button2 from '../../Components/Button2'
import usdt from '../../assets/icons/usdt.png'
import { BsQuestionSquare } from 'react-icons/bs'
import { ethers } from 'ethers'
import { WalletContext } from '../../Providers/WallectConnect'
import ERC20 from '../../artifacts/contracts/USDT.sol/TetherToken.json'
import { Allowance, Approve, MModeTimer,MModeTimer2, formatMoney, formatMoney2 } from '../../Helpers'
import Swal from 'sweetalert2'
import Loader from '../../Components/Loading'
import ProgressBar from '../../Components/ProgressBar'

const EarnTemplatev2 = (props) => {
  const [percentage, setPercentage] = useState(null)

  const { EarnContract, namePool, strategy, risk, token, type, AbiType,Abi,claim,desposit,unique } = props
  const { Provider, address } = useContext(WalletContext)
  let USDT = '0x55d398326f99059fF775485246999027B3197955'
  const [Recolect, setRecolect] = useState('0')
  const [UserInfo, setUserInfo] = useState([])
  const [Aprove, setAprove] = useState(true)
  const [Amount, setAmount] = useState('0')
  const [getMaxUser, setgetMaxUser] = useState('0')
  const [AmountAprove, setAmountAprove] = useState('0')
  const [Tx, setTx] = useState(false)
  const [UsdtBalance, setUsdtBalance] = useState('0')
  const [UsdtBalanceContract, setUsdtBalanceContract] = useState('0')
  const [FinishTime, setFinishTime] = useState('0')
  const [mintAmount, setmintAmount] = useState('0')
  const [maxAmount, setmaxAmount] = useState('0')
  const [limitAmount, setlimitAmount] = useState('0')
  const [percentOfContract, setpercentOfContract] = useState('0')
  const [Loading, setLoading] = useState(false)
  let contract = new ethers.Contract(EarnContract, Abi.abi, Provider)
  let intervalid
  const bar = useRef()
  useEffect(() => {
    TotalRecolect()
    MaxAmount()
    MinAmount()
    PercentOfContract()
    GetUsdtBalanceContracts()
    if (address) {
      GetUserInfo()
      Intermitente()
      GetBusdBalance()
      if(AbiType == 'pass'){
        getMaxAmount()
        }
      Allowance(Provider, address, EarnContract, USDT).then((r) => {
        if (parseInt(ethers.utils.formatEther(r)) >= 1000000) {
          setAmountAprove(ethers.utils.formatEther(r))
          setAprove(false)
        } else {
          setAprove(true)
        }
      })
    }
    return () => {
      clearInterval(intervalid)
      setpercentOfContract("0");
    }
  }, [address, EarnContract])

  function getMaxAmount() {
    contract.getMaxPerUser(address).then((r) => {
      setgetMaxUser(ethers.utils.formatEther(r))
    })
  }
  function TotalRecolect() {
    contract.recolect().then((total) => {
      contract.limit().then((limit) => {
        setlimitAmount(ethers.utils.formatEther(limit))
        setRecolect(ethers.utils.formatEther(total))
        // bar.current.style.width = `${
        //   (parseFloat(ethers.utils.formatEther(total)) /
        //     parseFloat(ethers.utils.formatEther(limit))) *
        //   100
        // }%`

        const percent = (parseFloat(Math.floor((ethers.utils.formatEther(total)) / parseFloat(ethers.utils.formatEther(limit)) * 100)))
        setPercentage(percent)
        
        // bar.current.style.width = (parseFloat(ethers.utils.formatEther(total)) / parseFloat(ethers.utils.formatEther(limit))) * 100
      })
    })
  }

  function MinAmount() {
    contract.MinAmount().then((r) => setmintAmount(ethers.utils.formatEther(r)))
  }

  function MinAmount() {
    contract.MinAmount().then((r) => setmintAmount(ethers.utils.formatEther(r)))
  }

  function PercentOfContract() {
    contract.PercentEarn().then((r) => setpercentOfContract(r.toString()))
  }

  function MaxAmount() {
    contract.MaxAmount().then((r) => setmaxAmount(ethers.utils.formatEther(r)))
  }

  function GetUserInfo() {
    let data =[];
    contract.depositCount(address).then(async (count) => {
        for (let index = 0; index < count.toString(); index++) {
          let capital=await contract.balanceUser(address,index).then(r=>r.Amount.toString());
          let newArray = []
          for (let deposits = 0; deposits < 3; deposits++) {
            await contract.depositEarnings(address,index,deposits).then((r) => {
              newArray.push({
                  Amount:ethers.utils.formatEther(capital),
                  Earn: ethers.utils.formatEther(r.Earn),
                  Time:MModeTimer2(r.finishTime.toString()),
                  Period:r.period.toString(),
                  finish: r.finished
              })
            })
          }
        data.push(newArray);
        }
        setUserInfo(data)
    })



  }
  function Intermitente() {
    intervalid = setInterval(() => {
      GetUserInfo()
    }, 1000)
  }

  async function Deposit() {
    let signer = Provider.getSigner()
    setLoading(true)
    let contract2 = new ethers.Contract(EarnContract, Abi.abi, signer)
    let amunt = ethers.utils.parseEther(Amount)
    contract2
      .Deposit(amunt)
      .then(async (r) => {
        setTx(r.hash)
        r.wait()
          .then((r) => {
            TotalRecolect()
            GetUserInfo()
            setLoading(false)
            setAmount('0')
            GetBusdBalance()
            setTx(false)
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

  function Witdraw(depositID,period) {
    let signer = Provider.getSigner()
    setLoading(true)
    let contract2 = new ethers.Contract(EarnContract, Abi.abi, signer)
      contract2
        .EarnDeposit(depositID,period)
        .then((r) => {
          GetBusdBalance();
          setLoading(false)
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

  function GetBusdBalance() {
    let signer = Provider.getSigner()
    let contract2 = new ethers.Contract(USDT, ERC20.abi, signer)
    contract2
      .balanceOf(address)
      .then((r) => setUsdtBalance(ethers.utils.formatEther(r)))
  }

  function GetUsdtBalanceContracts() {
    let contract2 = new ethers.Contract(USDT, ERC20.abi, Provider)
    contract2
      .balanceOf(EarnContract)
      .then((r) => setUsdtBalanceContract(ethers.utils.formatEther(r)))
  }

  return (
    <div className="earn-strategies">
      {Loading && <Loader />}
      <div className='earn-strategies-ai'>
        <div className='earn-strategies-ai-tittle'>
            <p>{namePool}</p>
            <h3>
              {type} Yield: {unique?"Surprise ": `${percentOfContract} %` }
            </h3>
        </div>
        <div className='earn-strategies-ai-info'>
              <div className='info-left'>
                <div className='info-left-1'>
                  <ul>
                    <li>
                      <p>Strategy: <span>{strategy}</span></p>
                    </li>
                    <li>
                      <div className='risk-token'>
                        <p className='risk-token-token'>Token: <span>{token}</span></p>
                        <div className="strategies-txt-risk">
                          <p>
                            Risk: <span>{risk}</span>
                          </p>
                          <div className="question-icon">
                            <BsQuestionSquare size={'20px'} color="#245a78" />
                            <p className="info-risk">
                            Low leverage trading (2x to 5x){' '}
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  
                    <li className='address-header'>
                      <p>
                      Address:{' '}
                        <span>
                          <a
                            href={`https://bscscan.com/address/${EarnContract}`}
                            target="_blank"
                          >
                            {EarnContract}
                          </a>
                        </span>
                        </p>
                    </li>
                    <li>
                      <p>
                        SC Balance: {" "}
                        <span>{formatMoney(UsdtBalanceContract, 'USDT', 2, '.', ',')}</span>
                      </p>
                    </li>
                  </ul>
                </div>
                
              </div>
              <div className='info-middle'>
                <ProgressBar percentage={percentage} size={100} />
              </div>
              <div className='info-right'>
                  <div className='info-right-1'>
                    <ul>
                      <li>
                        <p>Pool size:</p>
                        <p><span className='span-pool-size'> {formatMoney(limitAmount, 'USDT', 2, '.', ',')}</span></p>
                      </li>
                      <li>
                        <p>Current Deposit:</p>
                        <p>{formatMoney(Recolect, 'USDT', 2, '.', ',')}</p>
                      </li>
                      
                    </ul>
                  </div>
                  <div className='info-right-2'>
                    <ul>
                      <li>
                        <p>Min entry:</p>
                        <p>
                          <span >{formatMoney(mintAmount, 'USDT', 2, '.', ',')}</span>
                        </p>
                      </li>
                      <li>
                        <p>Max entry:</p>
                        <p>
                          <span className='span-pool-size'>
                          {' '}
                          {getMaxUser > 0
                            ? formatMoney(getMaxUser, 'USDT', 2, '.', ',')
                            : formatMoney(maxAmount, 'USDT', 2, '.', ',')}
                          </span>
                        </p>
                      </li>
                    </ul>
                  </div>
              </div>
        </div>
        <div className='earn-strategies-ai-details strategies-details-v2'>
          <div className='earn-strategies-ai-details-deposit details-deposit-v2'>
            <h2>Deposit</h2>
            <div className="approve">
                {
                  !Aprove &&
                  (
                    <p className="amount-approved approved-v2">
                      Amount approved for use:{' '}
                      <span>
                        {formatMoney(AmountAprove, 'USDT', 2, '.', ',')}
                      </span>
                    </p>
                  )
                }
                
              </div>
              <div className="details-staked">
                <div className="details-staked-input">
                  <div className="input-button">
                    <div className="div-input-deposit">
                      <input
                        className="input-deposit input-deposit-v2"
                        placeholder="0.0"
                        type="number"
                        value={Amount}
                        onChange={(e) => {
                          setAmount(e.target.value)
                        }}
                      />
                      <div className="input-usdt">
                        <img
                          className="input-icon"
                          src={usdt}
                          alt="Logo de USDT"
                        />
                        <p>USDT</p>
                      </div>
                      <div className="balance-input">
                        <p>
                          Balance:{' '}
                          <span>
                            {formatMoney(UsdtBalance, '', 2, '.', ',')}
                          </span>
                        </p>
                        <button
                          className="max-input"
                          onClick={() =>
                            setAmount(
                              formatMoney(UsdtBalance, '', 2, '.', ',').trim(),
                            )
                          }
                        >
                          MAX
                        </button>
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
                  
                ) : (<button disabled={!desposit?true:false} className="button2" onClick={() => desposit?Deposit():console.log()}>
                {desposit?"Deposit":"Deposit disabled"}
                </button>
                )}
                  </div>
                </div>
              </div>
            
          </div>
          <div className='container-tables-v2'>
            {claim &&
            UserInfo.map((dp,i)=>
            <div className='earn-strategies-ai-details-details ai-details-v2'>
            <h2>Deposit {i+1}</h2>
            {dp.map((r,index)=>
              <>
                
           
                <div className="progress-section-details-staked details-staked-v2">
                <div className="table-staked table-staked-v2">
                
                  <div className="table-row ">
                    <div >
                      <h3 className={` `}>Days:</h3>
                    </div>
                    <p className="table-number">
                      {r.Period} days
                    </p>
                  </div>
                  
                  <div className="table-row ">
                    <div >
                      <h3 className={` `}>Your stake:</h3>
                    </div>
                    <p className="table-number">
                      {formatMoney(r.Amount, 'USDT')}
                    </p>
                  </div>
                  <div className="table-row ">
                    <div >
                      <h3 className={` `}>Yield:</h3>
                    </div>
                    <p className="table-number">
                      {index===2?20:13}% yield
                    </p>
                  </div>
                  <div className="table-row ">
                    <div >
                      <h3 className={` `}>Pending Earn:</h3>
                    </div>
                    <p className="table-number">
                      
                      {formatMoney(
                        parseFloat(r.Earn) ,
                        'USDT',
                      )}
                    </p>
                  </div>
                  <div className="table-row  ">
                    <div >
                      <h3 className={` `}>Total payout:</h3>
                    </div>
                    <p className="table-number">
                      {index===2
                      ? formatMoney(parseFloat(r.Earn)+parseFloat(r.Amount), 'USDT')
                      : formatMoney(r.Earn, 'USDT')}
                    </p>
                  </div>
                  <div className="table-row  ">
                    <div >
                      <h3 className={` `}>Timer: </h3>
                    </div>
                    <p className="table-number button-claim-v2" onClick={() => (r.Time && !r.finish ? console.log() : Witdraw(i,index))}>
                      {r.Time ? (
                        <span className='button-content'>{r.Time}</span>
                      ) : r.finish
                      ? <span className='button-content'>Claimed</span>
                      : (
                        <span className='button-content'>
                          <i className="fa-solid fa-lock mr-1"></i>
                          {'Claim'}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                {/* {
                  claim &&
                  <button
                    className="button2 btn-claim"
                    onClick={() => (r.Time ? console.log() : Witdraw(index))}
                  >
                    {r.Time ? (
                      <span className='button-content'>{r.Time}</span>
                    ) : (
                      <span className='button-content'>
                        <i className="fa-solid fa-lock mr-1"></i>
                        {'Claim'}
                      </span>
                    )}
                  </button>
                } */}
              </div>

              
              </>)}
              </div>)
            }
          </div>

        </div>
        

      </div>
      
      {/* <div className="section-top">
        <div
          className="strategies hidden"
          data-aos="fade-right"
          data-aos-delay="100"
          data-aos-duration="1000"
        >
          <div className="strategies-txt">
            <p>{namePool}</p>
            <h3>
              {type} Yield: {unique?"Surprise ": `${percentOfContract} %` }
            </h3>
          </div>
          <div className="strategies-txt-details">
            <h4>
              Strategy type: <span>{strategy}</span>
            </h4>
            <div className="strategies-txt-risk">
              <h4>
                Risk: <span>{risk}</span>
              </h4>
              <div className="question-icon">
                <BsQuestionSquare size={'20px'} color="#245a78" />
                <p className="info-risk">
                Low leverage trading (2x to 5x){' '}
                </p>
              </div>
            </div>
            <h4 className="pool-size">
              Pool size:{' '}
              <span> {formatMoney(limitAmount, 'USDT', 2, '.', ',')}</span>
            </h4>
            <h4>
              Min entry:{' '}
              <span>{formatMoney(mintAmount, 'USDT', 2, '.', ',')}</span>
            </h4>
            <h4>
              Max entry:{' '}
              <span>
                {' '}
                {getMaxUser > 0
                  ? formatMoney(getMaxUser, 'USDT', 2, '.', ',')
                  : formatMoney(maxAmount, 'USDT', 2, '.', ',')}
              </span>
            </h4>
            <h4>
              Token: <span>{token}</span>
            </h4>
            <h4 className="pool-address">
              Address:{' '}
              <span>
                <a
                  href={`https://bscscan.com/address/${EarnContract}`}
                  target="_blank"
                >
                  {EarnContract}
                </a>
              </span>
            </h4>
            <h4>
              SC Balance:{' '}
              <span>
                {formatMoney(UsdtBalanceContract, 'USDT', 2, '.', ',')}
              </span>
            </h4>
          </div>
        </div>
        <div
          className="progress-section"
          data-aos="fade-left"
          data-aos-delay="100"
          data-aos-duration="1000"
        >
          <h3 className='hidden'>
            <FaUserAlt size={'20px'} /> Progress in Pool
          </h3>
          <div className="progress-section-details">
            <div className="progress-section-details-bar">
              <div className="progress-bar">
                <div ref={bar} className="bar"></div>
                <p className="min">0</p>
                <p className="bar-detail">
                  {formatMoney(Recolect, '', 2, '.', ',')}
                </p>
                <p className="max">
                  {formatMoney(limitAmount, '', 2, '.', ',')}
                </p>
              </div>
              <div className="approve">
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
                  
                ) : (
                  <p className="amount-approved">
                    Amount approved for use:{' '}
                    <span>
                      {formatMoney(AmountAprove, 'USDT', 2, '.', ',')}
                    </span>
                  </p>
                )}
              </div>

              <div className="details-staked">
                <div className="details-staked-input">
                  <div className="input-button">
                    <div className="div-input-deposit">
                      <input
                        className="input-deposit"
                        placeholder="0.0"
                        type="number"
                        value={Amount}
                        onChange={(e) => {
                          setAmount(e.target.value)
                        }}
                      />
                      <div className="input-usdt">
                        <img
                          className="input-icon"
                          src={usdt}
                          alt="Logo de USDT"
                        />
                        <p>USDT</p>
                      </div>
                      <div className="balance-input">
                        <p>
                          Balance:{' '}
                          <span>
                            {formatMoney(UsdtBalance, '', 2, '.', ',')}
                          </span>
                        </p>
                        <button
                          className="max-input"
                          onClick={() =>
                            setAmount(
                              formatMoney(UsdtBalance, '', 2, '.', ',').trim(),
                            )
                          }
                        >
                          MAX
                        </button>
                      </div>
                    </div>
                    <button disabled={!desposit?true:false} className="button2" onClick={() => desposit?Deposit():console.log()}>
                      {desposit? <span className='button-content'>Deposit</span> : <span className='button-content'>Deposit</span>}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {UserInfo.Amount > 0 && claim &&(
              <div className="progress-section-details-staked">
                <div className="table-staked">
                  <div className="table-row row1">
                    <div>
                      <h3>Your stake:</h3>
                    </div>
                    <p className="table-number">
                      {formatMoney(UserInfo.Amount, 'USDT')}
                    </p>
                  </div>
                  <div className="table-row row1">
                    <div>
                      <h3>Pending Earn:</h3>
                    </div>
                    <p className="table-number">
                      {unique
                      ? "Surprise"
                      :formatMoney(
                        parseFloat(UserInfo.Earn) - parseFloat(UserInfo.Amount),
                        'USDT',
                      )}
                    </p>
                  </div>
                  <div className="table-row ">
                    <div>
                      <h3>Total payout:</h3>
                    </div>
                    <p className="table-number">
                      {unique
                      ? "Surprise"
                      :formatMoney(UserInfo.Earn, 'USDT')}
                    </p>
                  </div>
                </div>

                <button
                  className="button2 btn-claim"
                  onClick={() => (FinishTime ? console.log() : Witdraw())}
                >
                  {FinishTime ? (
                    <span className='button-content'>{FinishTime}</span>
                  ) : (
                    <span className='button-content'>
                      <i className="fa-solid fa-lock mr-1"></i>
                      {'Claim'}
                    </span>
                  )}
                </button>
              </div>
            )}
          
          </div>
        </div>
      </div> */}
      {/* <Table /> */}
    </div>
  )
}

export default EarnTemplatev2