import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import EarnTemplate from './EarnTemplate'
import NotFound from '../../Components/NotFound'
import { useSelector } from 'react-redux'
import Loading from '../../Components/Loading'
import Pools from '../../Data/contracts.json';
import AbiPrivate from '../../artifacts/contracts/EarnPrivate.sol/EARNPRIVATE.json'
import AbiPublic from '../../artifacts/contracts/Earn.sol/BeNFTEARN.json'
import AbiPass from '../../artifacts/contracts/EarnPass.sol/BeNFTEARNPASS.json'
const EarnDinamic = () => {

    const {data} = useSelector((state)=> state.contract)

    const dataContract = data
    const {address} = useParams()
    
    // useEffect(()=>{
    //   if(dataContract !== ""){
    //     const pool =  dataContract.filter(pool=> pool.name == name)
    //     setDataPool(pool)
    //     return
    //   }
    // },[dataContract])

    // useEffect(()=>{
    //   if(dataContract !== ""){
    //     const pool =  dataContract.filter(pool=> pool.name == name)
    //     setDataPool(pool)
    //     return
    //   }
    // },[name])

    const pool =  Pools.filter(pool=> pool.address == address)

  return (
    <>
      {/* {dataContract == "" ? <Loading/> :  */}
      <>
        {pool == "" ? <NotFound/> : <EarnTemplate Abi={pool[0].AbiType==="pass"?AbiPass:pool[0].AbiType==="public"?AbiPublic:AbiPrivate} AbiType={pool[0].AbiType} claim={pool[0].claim} desposit={pool[0].desposit} unique={pool[0].unique} type={pool[0].type} strategy={pool[0].strategy} EarnContract={pool[0].address} namePool={pool[0].namePool}  risk={pool[0].risk} token={pool[0].token}/>}
      </>
      {/* } */}
    </>
  )
}

export default EarnDinamic
