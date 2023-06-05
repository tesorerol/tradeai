import { configureStore } from '@reduxjs/toolkit'

import contractReducer from "../reducers/contractSlice"
import transactionsReducer from "../reducers/transactionsSlice"

export const store = configureStore({
  reducer: {
    contract: contractReducer,
    transactions: transactionsReducer
  },
})

