import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { redirect } from "react-router-dom";
const initialState = {
    orders: [],
    price: 0,
    err: ''
    , status: 'idle'
}

export const fetchorder = createAsyncThunk('order/fetchorder', async () => {
    const res = await axios.get('http://localhost:5000/order/orders')
    return res.data
})

export const order = createSlice(
    {
        name: 'order',
        initialState
        , reducers: {
            placeorder: (state, action) => {
                const k = action.payload
                state.orders = state.orders.concat(k)
            },
            setprice: (state, action) => {
                state.price = action.payload
            }

        }
        , extraReducers: (builder) => {
            builder.addCase(fetchorder.pending, (state, action) => {
                state.status = 'Loading'


            }).addCase(fetchorder.rejected, (state, action) => {
                state.status = 'Failed'
                state.err = action.error.message


            })
                .addCase(fetchorder.fulfilled, (state, action) => {
                    state.status = 'Success'
                    state.orders = action.payload


                })

        }
    }


)
export default order.reducer
export const { placeorder, setprice } = order.actions