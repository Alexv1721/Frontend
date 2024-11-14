import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
const initialState={
    status:'idle',
    err:'',
    userdetail:{_id:'',emai:'' ,password:'',role:'',username:''}
}
export const fetchproduct=createAsyncThunk('user/user',async()=>{
    localStorage.getItem('token')
    const res=await axios.get('http://localhost:5000/user/user',
        {headers:{Authorization:localStorage.getItem('token')}}
    )

    return res.data.data
})


export const user=createSlice(
    {  name:'user',
        initialState,
reducers:{
    clearUser:(state,payload)=>{
state.status='idle'
state.userdetail={_id:'',emai:'' ,password:'',role:'',username:''}
    }
},
        extraReducers:(builder)=>{
            builder.addCase(fetchproduct.pending,(state,action)=>{
state.status='loading'
            })
            .addCase(fetchproduct.rejected,(state,action)=>{
                state.err='Failed'
                console.log(action.error.message);
                
                            }).addCase(fetchproduct.fulfilled,(state,action)=>{
                                state.userdetail=action.payload
                                state.status='success'
                            })
        }
    }
)
export default user.reducer
export const {clearUser}=user.actions

