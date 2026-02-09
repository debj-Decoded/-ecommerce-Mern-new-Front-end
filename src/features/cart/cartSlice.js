import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AddToCart, fetchItemsByUserid, UpdateItem, DeleteItem, ResetCart } from './cartAPI';

const initialState = {
  value: 0,
  status: 'idle',
  items: [],
};

export const AddToCartAsync = createAsyncThunk(
  'cart/AddToCart',
  async (item) => {
    const response = await AddToCart(item);
    return response.data;
  }
);
export const fetchItemsByUseridAsync = createAsyncThunk(
  'cart/fetchItemsByUserid',
  async () => {
    // async (userId) => {
    const response = await fetchItemsByUserid();
    // const response = await fetchItemsByUserid(userId);
    return response.data;
  }
);
export const UpdateItemAsync = createAsyncThunk(
  'cart/UpdateItem',
  async (update) => {
    const response = await UpdateItem(update);
    return response.data;
  }
);
export const DeleteItemAsync = createAsyncThunk(
  'cart/DeleteItem',
  async (item) => {
    const response = await DeleteItem(item);

    // old return response.data;
    return response;
  }
);
export const ResetCartAsync = createAsyncThunk(
  'cart/ResetCart',
  async (UserId) => {
    const response = await ResetCart(UserId);
    return response.data;
  }
);


export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(AddToCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
        console.log("s")
        console.log(action.payload)
        console.log('a')
      })
      .addCase(fetchItemsByUseridAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItemsByUseridAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(UpdateItemAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(UpdateItemAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(item => item.id === action.payload.id)
        state.items[index] = action.payload;
      })
      .addCase(DeleteItemAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(DeleteItemAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // old method deleted the last item only const index=state.items.findIndex(item=>item.id===action.payload.id)
        // state.items.splice(index,1);
        state.items = state.items.filter(item => item.id !== action.payload.id);




      })
      .addCase(ResetCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(ResetCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = []
      });
  },
});

// export const { increment } = counterSlice.actions;

export const selectItems = (state) => state.cart.items;


export default cartSlice.reducer;
