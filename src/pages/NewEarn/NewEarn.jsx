
import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaUserAlt } from 'react-icons/fa'
import Button2 from '../../Components/Button2'
import Table from '../../Components/Table'
import usdt from '../../assets/icons/usdt.png'
import { BsQuestionSquare } from 'react-icons/bs'
import { ethers } from 'ethers'
import { WalletContext } from '../../Providers/WallectConnect'
import ERC20 from '../../artifacts/contracts/USDT.sol/TetherToken.json'
import { Allowance, Approve, MModeTimer, formatMoney } from '../../Helpers'
import Swal from 'sweetalert2'
import Loader from '../../Components/Loading'
import Abi from '../../artifacts/contracts/BenftPassV2.sol/BENFTPASS2.json'
const NewEarn = () => {

  const EarnContract = "0x491Bc3631422688859D17d9Ef3C8Fde2e9522c3c"
  const namePool = "Gen2 Presale"
  const token = "USDT"

  const { Provider, address } = useContext(WalletContext)

  let USDT = '0x55d398326f99059fF775485246999027B3197955'
  const [Recolect, setRecolect] = useState('0')
  const [UserInfo, setUserInfo] = useState(0)
  const [Aprove, setAprove] = useState(true)
  const [TotalLeft, setTotalLeft] = useState('0')
  const [getMaxUser, setgetMaxUser] = useState('0')
  const [AmountAprove, setAmountAprove] = useState('0')
  const [Tx, setTx] = useState(false)
  const [UsdtBalance, setUsdtBalance] = useState('0')
  const [UsdtBalanceContract, setUsdtBalanceContract] = useState('0')
  const [FinishTime, setFinishTime] = useState('0')
  const [mintAmount, setmintAmount] = useState('0')
  const [maxAmount, setmaxAmount] = useState('0')
  const [limitAmount, setlimitAmount] = useState('0')
  const [Price, setPrice] = useState('0')
  const [Loading, setLoading] = useState(false)
  let contract = new ethers.Contract(EarnContract, Abi.abi, Provider)
  const [amountCounter,setAmountCounter] = useState(1)
  const bar = useRef()


  useEffect(() => {
    TotalRecolect()
    MaxAmount()
    MinAmount()
    GetPrice()
    getTotalLeft()
    //GetUsdtBalanceContracts()
    if (address) {
      GetUserInfo()
      //Intermitente()
      //GetBusdBalance()
      Allowance(Provider, address, EarnContract, USDT).then((r) => {
        if (parseInt(ethers.utils.formatEther(r)) >= 1000000) {
          setAmountAprove(ethers.utils.formatEther(r))
          setAprove(false)
        } else {
          setAprove(true)
        }
      })
    }
  }, [address, EarnContract])

  function getMaxAmount() {
    contract.getMaxPerUser(address).then((r) => {
      setgetMaxUser(ethers.utils.formatEther(r))
    })
  }
  function TotalRecolect() {
    contract.TotalLeft().then((total) => {
      contract.limit().then((limit) => {
        setlimitAmount(limit.toString())
        setRecolect(total.toString())
        bar.current.style.width = `${
          (parseFloat(total.toString()) /
            parseFloat(limit.toString())) *
          100
        }%`
        // bar.current.style.width = (parseFloat(ethers.utils.formatEther(total)) / parseFloat(ethers.utils.formatEther(limit))) * 100
      })
    })
  }

  function MinAmount() {
    contract.MinAmount().then((r) => setmintAmount(r.toString()))
  }

  function MaxAmount() {
    contract.MaxAmount().then((r) => setmaxAmount(r.toString()))
  }
  function GetPrice() {
    contract.Price().then((r) => setPrice(ethers.utils.formatEther(r)))
  }
  function getTotalLeft() {
    contract.TotalLeft().then((r) => setTotalLeft(r.toString()))
  }

  function GetUserInfo() {
    contract.balanceUser(address).then((r) => {
      setUserInfo(r.toString())
    })
  }

  const incrementCounter = ()=>{
    if(amountCounter!==30){
        setAmountCounter(amountCounter+1)
    }
  }

  const decrementCounter = ()=>{
    if(amountCounter!==1){
        setAmountCounter(amountCounter-1)
    }
  }

  const counterMax = ()=>{
    setAmountCounter(30)
  }

  async function Deposit() {
    let signer = Provider.getSigner()
    setLoading(true)
    let contract2 = new ethers.Contract(EarnContract, Abi.abi, signer)
    contract2
      .Deposit(amountCounter)
      .then(async (r) => {
        setTx(r.hash)
        r.wait()
          .then((r) => {
            TotalRecolect()
            GetUserInfo()
            getTotalLeft()
            setLoading(false)
            setAmountCounter(1)
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

  return (
    <div className="earn-strategies">
      {Loading && <Loader />}
      <div className="section-top">
        <div
          className="strategies"
          data-aos="fade-right"
          data-aos-delay="100"
          data-aos-duration="1000"
        >
          <div className="strategies-txt">
            <p>{namePool}</p> 
          </div>
          <div className="strategies-txt-details">
          <h4>
              Price NFT:{' '}
              <span>
                {' '}
                {formatMoney(Price, 'USDT', 2, '.', ',')}
              </span>
            </h4>
            <h4 className="pool-size">
            Commited NFT :{' '}
              <span> {TotalLeft}/{limitAmount}</span>
            </h4>
            <h4>
              Min Buy NFT:{' '}
              <span>{mintAmount}</span>
            </h4>
            <h4>
              Max Buy NFT:{' '}
              <span>
                {' '}
                {maxAmount}
              </span>
            </h4>
            <h4>
              Your NFT Balance:{' '}
              <span>
                {UserInfo}
              </span>
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
          </div>
        </div>
        <div
          className="progress-section"
          data-aos="fade-left"
          data-aos-delay="100"
          data-aos-duration="1000"
        >
          <h3>
            <FaUserAlt size={'20px'} /> NFT Count
          </h3>
          <div className="progress-section-details">
            <div className="progress-section-details-bar progress-section-details-bar-2 ">
              <div className="progress-bar">
                <div ref={bar} className="bar"></div>
                <p className="min">0</p>
                <p className="bar-detail">
                  {Recolect}
                </p>
                <p className="max">
                  {limitAmount}
                </p>
              </div>
              <div className="approve">
                {Aprove ? (
                  <Button2
                    fnct={() => {
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
                    }}
                    txt="Approve"
                  />
                ) : (
                  <p className="amount-approved">
                    Amount approved for use:{' '}
                    <span>
                      {formatMoney(AmountAprove, 'USDT', 2, '.', ',')}
                    </span>
                  </p>
                )}
              </div>

              <div className="details-new-staked">
                <div className='details-new-staked-counter'>
                    <button className='btn2' onClick={decrementCounter}> - </button>
                    <p>{amountCounter}</p>
                    <button className='btn2' onClick={incrementCounter}> + </button>
                    <button className='button-max btn2' onClick={counterMax}>MAX</button>
                </div>
                <button onClick={()=>Deposit()} className='btn2'>Deposit</button>
              </div>
            </div>
                      
          </div>
        </div>
      </div>
      {/* <Table /> */}
    </div>
  )
}

export default NewEarn
