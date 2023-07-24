import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    pools: [],
    wlPools : [],
    loading: false,
    error: null,
}

export const fetchPools = createAsyncThunk('pool/fetchPools', async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (err) {
      return err.message;
    }
  });

export const fetchWlPools = createAsyncThunk('pool/fetchWlPools', async (url) => {
  try {
    const response = await axios.get(url);
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
    builder.addCase(fetchPools.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchPools.fulfilled, (state, action) => {
      state.loading = false;
      state.pools = action.payload;
      state.error = null;
    });
    builder.addCase(fetchPools.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchWlPools.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchWlPools.fulfilled, (state, action) => {
      state.loading = false;
      const pool =  state.pools.filter(pool=> action.payload.includes(pool.Contract) || pool.Parent === "weekly" && pool.Visible === true) 
      state.wlPools = pool;
      state.error = null;
    });
    builder.addCase(fetchWlPools.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  }
  
})

export const selectAllPools = (state) => state.pool.pools
export const selectWlPools = (state) => state.pool.wlPools
export const stateLoading = (state) => state.pool.loading
export const stateError = (state) => state.pool.error

export const {} = poolSlice.actions

export default poolSlice.reducer