import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
const initialState={
    status:'idle',
    err:'',
    products:[]
}
export const fetchproduct=createAsyncThunk('products/fetchproduct',async()=>{
    const res=await axios.get('http://localhost:5000/products/allproducts')
    return res.data
})
export const pro=createSlice(
    {  name:'pro',
        initialState,
        reducers:{
productfilter:(state,action)=>{
    state.products=state.products
const s=state.products.filter((item)=>{
    if(item.category==action.payload){
return item
    }

})
state.products=s
}
        }
        ,extraReducers:(builder)=>{
            builder.addCase(fetchproduct.pending,(state,action)=>{
state.status='loading'
            })
            .addCase(fetchproduct.rejected,(state,action)=>{
                state.err='Failed'
                            }).addCase(fetchproduct.fulfilled,(state,action)=>{
                                state.products=action.payload
                                state.status='success'
                            })
        }
    }
)

export default pro.reducer
export const {productfilter}=pro.actions
