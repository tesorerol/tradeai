import React, { useContext, useState, useRef, useEffect } from 'react'
import { WalletContext } from '../Providers/WallectConnect'
import ERC20 from '../artifacts/contracts/USDT.sol/TetherToken.json'
import Swal from 'sweetalert2'
import { ethers } from 'ethers'
import { Allowance, MModeTimer } from '../Helpers'
import { NavLink } from 'react-router-dom'


const PoolAvailable = ({strategy,name,duration,yieldF,EarnContract,Abi,AbiType,whitelist,size}) => {
const size7days = "5000000"
const current7days = "4701591"
const [percentage, setPercentage] = useState(null)
const { Provider, address, isAllowed } = useContext(WalletContext)
  let USDT = '0x55d398326f99059fF775485246999027B3197955'
  const [Recolect, setRecolect] = useState('0')
  const [UserInfo, setUserInfo] = useState({
    Amount: 0,
    Earn: 0,
  })
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

        {
          if(size){
              const percent = (parseFloat(Math.floor((current7days) / parseFloat(size7days) * 100)))
              console.log(percent)
              setPercentage(percent)
          }else{
              const percent = (parseFloat(Math.floor((ethers.utils.formatEther(total)) / parseFloat(ethers.utils.formatEther(limit)) * 100)))
              setPercentage(percent)
          }
      }

        // const percent = (parseFloat(Math.floor((ethers.utils.formatEther(total)) / parseFloat(ethers.utils.formatEther(limit)) * 100)))
        // setPercentage(percent)
        
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
    contract.balanceUser(address).then((r) => {
      setUserInfo({
        Amount: ethers.utils.formatEther(r.Amount),
        Earn: ethers.utils.formatEther(r.Earn),
      })
      setFinishTime(MModeTimer(r.finishTime.toString()))
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

  function Witdraw() {
    let signer = Provider.getSigner()
    setLoading(true)
    let contract2 = new ethers.Contract(EarnContract, Abi.abi, signer)
    if (AbiType == 'pass') {
      contract2
        .Claim()
        .then((r) => {
          GetBusdBalance();
          setUserInfo({
            Amount: 0,
            Earn: 0,
          })
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
    } else if (AbiType == 'public') {
      contract2
        .EarnClaim()
        .then((r) => {
          r.wait().then((r) => {
            GetBusdBalance();
            setUserInfo({
              Amount: 0,
              Earn: 0,
            })
            setLoading(false)
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
    } else {
      contract2
        .EarnDeposit()
        .then((r) => {
          GetBusdBalance();
          setUserInfo({
            Amount: 0,
            Earn: 0,
          })
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
            <div className='pools-available'>
                {/* <p>{strategy}</p> */}
                <h2>{name}</h2>
                <p>Duration: <span>{duration}</span></p>
                <p>Yield: <span>{percentOfContract != 0 ? percentOfContract+"%" : "Undetermined"}</span></p>
                <div className='container-progress-market'>
                    <div className='text-remaining'>
                        <p>PROGRESS</p>
                        <span>{percentage}%</span>
                    </div>
                    <div className='progress-bar-market'>
                        <div className={`bar-market bar-home-pools`} style={{ width: `${percentage}%` }}></div>
                    </div>
                </div>
                {isAllowed && whitelist === true && <NavLink to={`/earn-strategies/wl/${EarnContract}`}><button className='button2'>Go to Pool</button></NavLink>}
                {!whitelist && <NavLink to={`/earn-strategies/${EarnContract}`}><button className='button2'>Go to Pool</button></NavLink>}
            </div>
  )
}

export default PoolAvailable
