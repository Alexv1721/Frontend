import { createSlice } from "@reduxjs/toolkit";


const initialState={
    val:''
}
export const searchslice=createSlice({
    name:'search',
    initialState,
    reducers:{
        setsearch:(state,action)=>{
state.val=action.payload
        }
        
    }
})
export default searchslice.reducer
export const {setsearch}=searchslice.actions