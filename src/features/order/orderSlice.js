import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder, fetchAllOrders, EditOrder, fetchOrderById } from './orderAPI';


const initialState = {
  orders: [],
  status: 'idle',
  currentOrders:null,
  totalOrders:0,
  selectedOrder:null
};
  
export const createOrderAsync = createAsyncThunk(
  'order/createOrder',
  async (order) => {
    const response = await createOrder(order);
    return response.data;
  }
);
export const fetchAllOrdersAsync = createAsyncThunk(
  'order/fetchAllOrders',
  async ({pagination,sort}) => {
    const response = await fetchAllOrders(pagination,sort);
    return response.data;
  }
);

//newapi
export const fetchOrderByIdAsync = createAsyncThunk(
  'order/fetchOrderById',
  async (id) => {
    const response = await fetchOrderById(id);
    return response.data;
  }
);
export const EditOrderAsync = createAsyncThunk(
  'order/EditOrder',
  async (order) => {
    const response = await EditOrder(order);
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
 
  reducers: {
    resetOrder: (state) => {
       state.currentOrders = null;
    },
    
     
  },
    extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push(action.payload);
        state.currentOrders=action.payload;
        
      }) 
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders=action.payload.orders;
        state.totalOrders=action.payload.totalOrders;
        
      }) 
      .addCase(fetchOrderByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrderByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedOrder=action.payload;
        
      })
      .addCase(EditOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(EditOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index=state.orders.findIndex(order=>order.id===action.payload.id)
        state.orders[index]=action.payload;
      });
  },
});

export const { resetOrder } = orderSlice.actions;
export const currentOrder = (state) => state.order.currentOrders;
export const selectOrder = (state) => state.order.orders;
export const selectTotalOrder = (state) => state.order.totalOrders;
export const selectSelectedOrder = (state) => state.order.selectedOrder;
   

export default orderSlice.reducer;
