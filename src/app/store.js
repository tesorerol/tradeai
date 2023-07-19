import { configureStore } from '@reduxjs/toolkit'

import contractReducer from "../reducers/contractSlice"
import transactionsReducer from "../reducers/transactionsSlice"
import poolReducer from "../reducers/poolSlice"
import authMiddleware from '../middleware/authMiddleware'

export const store = configureStore({
  reducer: {
    contract: contractReducer,
    pool: poolReducer,
    transactions: transactionsReducer
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware)
})

