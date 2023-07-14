import React from 'react'
import PoolAvailable from '../../Components/PoolAvailable'
import data from "../../Data/contracts.json"
import AbiPrivate from '../../artifacts/contracts/EarnPrivate.sol/EARNPRIVATE.json'
import AbiPublic from '../../artifacts/contracts/Earn.sol/BeNFTEARN.json'
import AbiPass from '../../artifacts/contracts/EarnPass.sol/BeNFTEARNPASS.json'



const Home = () => {
    
  return (
    <div className='container-home-pools'>
        <div className='container-pools'>
          {
            data.map((item,i)=>(
              item.visible === "true" && 
              <PoolAvailable strategy={item.risk} whitelist={item.whitelist} duration={item.type} name={item.namePool} EarnContract={item.address} Abi={item.AbiType==="pass"?AbiPass:item.AbiType==="public"?AbiPublic:AbiPrivate} AbiType={item.AbiType} />
              
            ))
          }
          
        </div>
    </div>
  )
}

export default Home
