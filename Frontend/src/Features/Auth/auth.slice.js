import { createSlice } from "@reduxjs/toolkit";



export const authSlice=createSlice({
    name:"Auth",
    initialState:{
        user:null,
        loading:true,
        error:null
    },
    reducers:{
        setUser:(state,action)=>{
            state.user=action.payload
        },
        setError:(state,action)=>{
            state.error=action.payload
        },
        setLoading:(state,action)=>{
            state.loading=action.payload
        }
    }
})


export const {setUser,setError,setLoading}=authSlice.actions

export default authSlice.reducer