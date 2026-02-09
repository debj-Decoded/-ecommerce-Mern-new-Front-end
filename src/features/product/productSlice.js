import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProducts,fetchProductByFilter,fetchProductByCategory,
  fetchProductByBrand,fetchProductById, CreateProduct, EditProduct,
  } from './productAPI';


const initialState = {
  products: [],
  category: [],
  brand: [],
  status: 'idle',
  totalItems:0,
  selectProduct:null
};

export const fetchAllProductsAsync = createAsyncThunk(
  'product/fetchProduct',
  async () => {
    const response = await fetchAllProducts();
    return response.data;
  }
);

export const fetchProductByFilterAsync = createAsyncThunk(
  'product/fetchProductByFilter',
  async ({filter,sort,pagination,search}) => {
    const response = await fetchProductByFilter(filter,sort,pagination,search);  
    return response.data;
  }
);
export const fetchProductByCategoryAsync = createAsyncThunk(
  'product/fetchProductByCategory',
  async () => {
    const response = await fetchProductByCategory();  
    return response.data;
  }
);
export const fetchProductByBrandAsync = createAsyncThunk(
  'product/fetchProductByBrand',
  async () => {
    const response = await fetchProductByBrand();  
    return response.data;
  }
);
export const fetchProductByIdAsync = createAsyncThunk(
  'product/fetchProductById',
  async (id) => {
    const response = await fetchProductById(id);  
    return response.data;
  }
);
export const CreateProductAsync = createAsyncThunk(
  'product/CreateProduct',
  async (product) => {
    const response = await CreateProduct(product);  
    console.log(product)
    return response.data;
  }
);
export const EditProductAsync = createAsyncThunk(
  'product/EditProduct',
  async (product) => {
    const response = await EditProduct(product);  
    return response.data;
  }
);


export const productSlice = createSlice({
  name: 'counter',
  initialState,

  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },


  extraReducers: (builder) => {
    builder
    //fetch all products
    .addCase(fetchAllProductsAsync.rejected, (state, action) => {
      state.status = 'idle';
      state.status = 'try again';
    })
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
       
      
      .addCase(fetchProductByFilterAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByFilterAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;

      })
      .addCase(fetchProductByCategoryAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByCategoryAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.category = action.payload;
      }) 
      .addCase(fetchProductByBrandAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByBrandAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.brand = action.payload;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectProduct = action.payload;
      })
      .addCase(fetchProductByIdAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.selectProduct = true;
      })
      .addCase(CreateProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(CreateProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(EditProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(EditProductAsync.fulfilled, (state, action) => {
        const index=state.products.findIndex(product=>product.id===action.payload.id)
        state.products[index]=action.payload;
      })
      
  },
});

export const { increment } = productSlice.actions;

export const selectAllProducts= (state) => state.product.products;// produc from store
export const selectAllProductsStats= (state) => state.product.status;// produc from store
export const selectTotalItems= (state) => state.product.totalItems;//produc from store
export const selectCategory= (state) => state.product.category;//produc from store
export const selectBrand= (state) => state.product.brand;//produc from store
export const selectProductById= (state) => state.product.selectProduct;//produc from store


export default productSlice.reducer;
