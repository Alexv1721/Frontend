import { createSlice } from "@reduxjs/toolkit";
const initialState={
    uname:'Alex'
    ,
    password:'alex'
    ,session:0
}
export const login=createSlice({
    name:'log',
    initialState
    ,reducers:{
userlogin:(state,action)=>{
    state.session=50
},
logout:(state,action)=>{
state.session=0
}
    }
})
export const {userlogin,logout}=login.actions
export default login.reducer