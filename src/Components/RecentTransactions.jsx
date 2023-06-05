import React, { useContext } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { BsCheck2All } from 'react-icons/bs'
import { addTransaction, cleanData } from '../reducers/transactionsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { WalletContext } from '../Providers/WallectConnect'

const RecentTransactions = ({toggleModal}) => {
    const ammount = 500
    const pool = "PUBLIC"
    // const address = "0x25de2Df9341fFc0F9f639D8410B5868953D2C635"
    const {data} = useSelector((state)=> state.transactions)
    const transactions = data
    const dispatch = useDispatch()
    const { address } = useContext(WalletContext)

  return (
    <div className='container-modal-transactions modal-header'>
        
        <div className='container-transactions'>

        <div className='your-wallet'>
            <h3>Your Wallet</h3>
            <p>{address}</p>
        </div>
        <div className='recent-transactions'>
            <p>Recent Transactions</p>
            <p className='clear-transactions' onClick={()=>dispatch(cleanData())}>Clear all</p>
        </div>
        <div className='container-list-transactions'>
            <ul className='list-transactions'>                
                {
                transactions.length != 0
                ? transactions.map(trans => (
                    <li className='transaction'>
                        <BsCheck2All size={"24px"} color={"#9ed0ed"}/> 
                        <p>
                            {trans.type} <span>{trans.ammount} {trans.token}</span> to {trans.pool}. 
                            <a href={trans.scan} target='_blank'>View scan</a>
                        </p>
                    </li>
                    ))
                : <p className='clean-transactions-text'>No recent transactions</p>
                }
                
                
            </ul>
        </div>
        
        <AiOutlineClose className='close-icon' onClick={toggleModal} size={"25px"} color={"#FAFAFA"}/>
        </div>
      
    </div>
  )
}

export default RecentTransactions
