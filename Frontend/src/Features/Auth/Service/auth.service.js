import axios from 'axios'

const api=axios.create({
    baseURL:'http://localhost:3000',
    withCredentials:true
})


export const register=async({userName,email,password})=>{
    const response=await api.post('/api/auth/register',{
        userName,email,password
    })
    return response.data
}


export const login=async({email,password})=>{
    const response=await api.post('/api/auth/login',{
        email,password
    })
    return response.data
}


export const getMe=async()=>{
    const response=await api.get('/api/auth/me');
    return response.data

}