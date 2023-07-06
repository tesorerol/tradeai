import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  platinum: "",
  diamond: "",
  gold: ""
}

export const contractSlice = createSlice({
  name: 'contract',
  initialState,
  reducers: {
   addDataContracts: (state,action)=>{
    if(action.payload.type === "platinum"){
      state.platinum = action.payload.slots
    } else if(action.payload.type === "diamond"){
      state.diamond = action.payload.slots
    } else if(action.payload.type === "gold"){
      state.gold = action.payload.slots
    }
   },
   
  },
  
})


export const { addDataContracts, loadData} = contractSlice.actions

export default contractSlice.reducer