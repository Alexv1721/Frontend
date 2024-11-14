import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    carts: [],
    count: 0,
    status: 'idle',
    errors: ''
};

export const fetchcart = createAsyncThunk('cart/fetchcart', async () => {
   console.log('cart',localStorage.getItem('token'));

   
    const res = await axios.get('http://localhost:5000/cart/carts',
        {headers:{Authorization:localStorage.getItem('token')}}
    );
    console.log(res);
    return res.data;
});


export const carts = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addcart: (state, action) => {
            const k = action.payload;
            state.carts = state.carts.concat(k);
            state.count += 1;
        },
        removecart: (state, action) => {
            const k = state.carts.filter((item) => item._id !== action.payload);
            state.carts = k;
            state.count -= 1;
        },
        emtycart: (state) => {
            state.carts = [];
            state.count = 0;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchcart.pending, (state) => {
            state.status = 'loading';
        })
            .addCase(fetchcart.rejected, (state, action) => {
                state.errors = action.error.message;
                state.status = 'failed';
            })
            .addCase(fetchcart.fulfilled, (state, action) => {
                state.carts = action.payload;
                state.count = state.carts.length
                state.status = 'Success';
                state.errors = '';
            })

    }
});

export default carts.reducer;

export const { addcart, removecart, emtycart } = carts.actions;
