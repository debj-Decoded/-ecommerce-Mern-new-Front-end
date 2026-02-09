import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UpdateUser, fLoginUserOrder,fLoginUser } from './userAPI';

 

const initialState = {
  userOrders: [],
  status: 'idle',
  userInfo:null
};
  
export const fLoginUserOrderAsync = createAsyncThunk(
  'user/fLoginUserOrder',
  async (id) => {
    const response = await fLoginUserOrder(id);  
    return response.data;
  }
);
export const fLoginUserAsync = createAsyncThunk(
  'user/fLoginUser',
  async () => {
  // async (id) => {
    const response = await fLoginUser();  
    // const response = await fLoginUser(id);  
    return response.data;
  }
);

export const UpdateUserAsync = createAsyncThunk(
  'user/UpdateUser',
  async (update) => {
    const response = await UpdateUser(update);
    return response.data;
  }
);          

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      
      state.value += 1;
    },
    
     
  },
    extraReducers: (builder) => {
    builder
      .addCase(fLoginUserOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fLoginUserOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo.orders = action.payload;
      }) 
      .addCase(UpdateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(UpdateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      }) 
      .addCase(fLoginUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fLoginUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      });
      
  },
});
 
export const selectUserOrders = (state) => state.user.userInfo.orders;
// export const selectUserOrders = (state) => state.user.userOrders;
export const selectUserInfo = (state) => state.user.userInfo;
export const selectUserorderStatus = (state) => state.user.status;
   

export default userSlice.reducer;
