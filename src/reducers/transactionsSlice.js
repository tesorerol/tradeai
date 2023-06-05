import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalTransactions: 0,
  data: [{
    type: "Deposit",
    ammount: "10000",
    token: "USDT",
    pool:"Public",
    scan: "https://etherscan.io/block/17145353"
  }]
}

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
   addTransaction: (state,action)=>{
    state.data = [...state.data,action.payload]
    state.totalTransactions =+1
   },
   cleanData: (state)=>{
    state.data = []
    state.totalTransactions = 0
   }
  },
  
})


export const { addTransaction, cleanData} = transactionsSlice.actions

export default transactionsSlice.reducer