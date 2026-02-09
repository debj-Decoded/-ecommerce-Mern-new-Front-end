import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CheckAuth, CreateUser ,LoginUser, LogoutUser} from './authAPI';
import { UpdateUser } from '../user/userAPI';

 

const initialState = {
  loggedInUserToken:null,
  // userDetail:null,
  status: 'idle',
  error:null,
  userChecked:false
};
  
export const CreateUserAsync = createAsyncThunk(
  'user/CreateUser',
  async (userData) => {
    const response = await CreateUser(userData);
    return response.data;
  }
);
export const LoginUserAsync = createAsyncThunk( 
  'user/LoginUser',
  async (LoginInfo,{rejectWithValue}) => {
    try {
      const response = await LoginUser(LoginInfo);
      return response.data;      
    } catch (error) {
      console.log(error)
      return rejectWithValue(error)
    }
  }
);
export const checkAuthAsync = createAsyncThunk(
  'user/CheckAuth',
  // 'user/CheckUser',
  async () => {
    try {
      const response = await CheckAuth();
      return response.data;      
    } catch (error) {
      console.log(error)
      
    }
  }
);
// export const UpdateUserAsync = createAsyncThunk(
//   'cart/UpdateUser',
//   async (item) => {
//     const response = await UpdateUser(item);
//     return response.data;
//   }
// );  
  export const LogoutUserAsync = createAsyncThunk(
  'cart/LogoutUser',
  async (item) => {
    const response = await LogoutUser(item);
    return response.data;
  }
);                                        

export const counterSlice = createSlice({
  name: 'auth',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
    extraReducers: (builder) => {
    builder
      .addCase(CreateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(CreateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
      })
      .addCase(LoginUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(LoginUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })
      .addCase(LoginUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
      })
      // .addCase(UpdateUserAsync.pending, (state) => {
      //   state.status = 'loading';
      // })
      // .addCase(UpdateUserAsync.fulfilled, (state, action) => {
      //   state.status = 'idle';
      //   state.userDetail=action.payload;
      // })
       .addCase(LogoutUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(LogoutUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken=null;
      })
      .addCase(checkAuthAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken=action.payload;
        state.userChecked=true;
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.userChecked=true;
      });
  },
});

export const { increment } = counterSlice.actions;

export const selectLoggedIn=(state)=>state.auth.loggedInUserToken
// export const selectLoggedIn=(state)=>state.auth.userDetail
export const selectError=(state)=>state.auth.error;
export const selectUserChecked=(state)=>state.auth.userChecked;
export default counterSlice.reducer;
