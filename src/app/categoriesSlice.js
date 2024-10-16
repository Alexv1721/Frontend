import { createAsyncThunk } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
const initialState={
    status:'idle',
    err:'',
    categories:[]
}

export const fetchcat=createAsyncThunk('catagories/fetchcat',async()=>{
    const res=await axios.get('https://fakestoreapi.com/products/categories')
    return res.data
})

export const cat=createSlice(
    {
        name:'catagories',
initialState
,
reducers:{

},
extraReducers:(builders)=>{
    builders.addCase(fetchcat.fulfilled,(state,action)=>{
state.status='Success'
state.categories=action.payload
    })
    .addCase(fetchcat.pending,(state,action)=>{
        state.status='loading'
        
            })
        .addCase(fetchcat.rejected,(state,action)=>{
            state.err=action.error.message
                })
}
    }
)

export default cat.reducer

