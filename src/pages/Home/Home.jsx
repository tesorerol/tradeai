import React, { useEffect } from 'react'
import PoolAvailable from '../../Components/PoolAvailable'
import data from "../../Data/contracts.json"
import AbiPrivate from '../../artifacts/contracts/EarnPrivate.sol/EARNPRIVATE.json'
import AbiPublic from '../../artifacts/contracts/Earn.sol/BeNFTEARN.json'
import AbiPass from '../../artifacts/contracts/EarnPass.sol/BeNFTEARNPASS.json'
import poolsImg from "../../assets/pools-head.png"
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { fetchWallets, selectAllPools } from '../../reducers/poolSlice'

const Home = () => {
  
  // const pools = useSelector(selectAllPools)
   
  
  return (
    <div className='container-home-pools'>
        <div className='header-pools-img'>
          <img src={poolsImg} alt="" />
        </div>
        <div className='container-pools'>
          {
            data.map((item,i)=>(
              item.visible === "true" && 
              <PoolAvailable strategy={item.risk} whitelist={item.whitelist} duration={item.type} name={item.namePool} EarnContract={item.address} Abi={item.AbiType==="pass"?AbiPass:item.AbiType==="public"?AbiPublic:AbiPrivate} AbiType={item.AbiType} size={item.size}/>
              
            ))
          }
          
        </div>
    </div>
  )
}

export default Home
