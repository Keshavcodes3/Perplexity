import axios from "axios";
import { BASEURL } from "../../API/ApiStore";
const API=axios.create({
    baseURL:`${BASEURL}/api/conversations`,
    withCredentials:true
})

export const startChat=async(message)=>{
    const response=await API.post('/',{
        message
    })
    return response.data
}


export const takeFollowUp=async({conversationId,message})=>{
    const response=await API.post(`/sendMessage/${conversationId}`,{message})
    return response.data
}


export const deleteConversation=async(conversationId)=>{
    const response=await API.delete(`/delete/${conversationId}`)
    return response.data
}


export const getAllConversations=async()=>{
    const response=await API.get('/all')
    return response.data
}

export const getAllMessages=async({conversationId})=>{
    const response=await API.get(`/${conversationId}`)
    return response.data
}