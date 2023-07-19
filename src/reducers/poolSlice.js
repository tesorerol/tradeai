import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit'
import axios from 'axios';
const walletUrl = ""

const initialState = {
    pools: [],
    loading: false,
    error: null,
}

export const fetchWallets = createAsyncThunk('pool/fetchWallets', async () => {
    try {
      const response = await axios.get("");
      return response.data;
    } catch (err) {
      return err.message;
    }
  });


export const poolSlice = createSlice({
  name: 'pool',
  initialState,
  reducers: {   

  },
  extraReducers: (builder) => {
    builder.addCase(fetchWallets.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchWallets.fulfilled, (state, action) => {
      state.loading = false;
      state.pools = action.payload;
      state.error = null;
    });
    builder.addCase(fetchWallets.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  }
  
})

export const selectAllPools = (state) => state.pool.pools
export const stateLoading = (state) => state.pool.loading
export const stateError = (state) => state.pool.error

export const {} = poolSlice.actions

export default poolSlice.reducer